pragma solidity ^0.8.7;
// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PropertyNFT is ERC721, ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event AllProperties(ListedProps[] _a);
    event Submitted(bool submitted);
    event Listed(string name, string location, string tokenURL);


    struct ListingProps {
        string name;
        address _lister;
        uint256 _amount;
        uint256 _time;
        string _location;
    }
    struct ListedProps {
        string name;
        address _lister;
        uint256 _amount;
        uint256 _time;
        string _location;
        uint256 _id;
    }


    mapping(address => uint256) public propertyID;
    mapping(address => ListingProps) public listings;
    mapping(address => ListingProps[]) public allListingsPerAddress;

    mapping(address => ListedProps) public listed;
    mapping(address => ListedProps[]) public allListedPerAddress;

    ListedProps[] public allListedProperties;

    mapping(address => mapping(string => bool)) isListed;
    mapping(address => mapping(string => bool)) hasMinted;

    constructor() ERC721("PropFT", "PRP") {}

    function listProperty(string calldata name, uint256 _amount, string calldata _location) public returns(bool) {
        isListed[msg.sender][name] = true;

        //storing latest listing to use to update the listed property array;
        listings[msg.sender] = ListingProps(name, msg.sender, _amount, block.timestamp, _location);

        //storing all listings for retrieval just in case
        allListingsPerAddress[msg.sender].push(
            ListingProps(
                name, 
                msg.sender,
                 _amount,
                block.timestamp, 
                _location
            )
        );

        emit Submitted(true);
        return true;

    }

    function mintNFT(string memory _tokenURI, string memory _name)  public returns (uint256) {
        require(isListed[msg.sender][_name], "Property has not been listed");
        require(!hasMinted[msg.sender][_name], "Propery has already been listed");

        address buyer = msg.sender;
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();
        _safeMint(buyer, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);
        propertyID[buyer] = newTokenId;


        listed[buyer] = ListedProps(listings[buyer].name,listings[buyer]._lister,listings[buyer]._amount,listings[buyer]._time,listings[buyer]._location, propertyID[buyer] );

        //using the data stored in the struct in the listing propery to populate the array of approved listed property per address
        allListedPerAddress[msg.sender].push(
            ListedProps(
                listings[buyer].name,
                listings[buyer]._lister,
                listings[buyer]._amount,
                listings[buyer]._time,
                listings[buyer]._location, 
                propertyID[buyer]
            )
        );

        //storing all properties approved as listed since only approved properties can generate NFTs
        allListedProperties.push(
             ListedProps(
                listings[buyer].name,
                listings[buyer]._lister,
                listings[buyer]._amount,
                listings[buyer]._time,
                listings[buyer]._location, 
                propertyID[buyer]
            )
        );

        hasMinted[msg.sender][_name] = true;
        emit Listed(_name, listings[buyer]._location, _tokenURI);
        return newTokenId;
    }

    function tokensMinted() public view returns(uint256) {
        return _tokenIds.current();
    }

    function _burn(uint256 _tokenId) internal override( ERC721URIStorage, ERC721) {
        super._burn(_tokenId);
    }

    function tokenURI(uint256 _tokenId) public view override( ERC721URIStorage, ERC721) returns (string memory) {
        return super.tokenURI(_tokenId);
    }


    function getAllProperties() public view returns(
        string[] memory, 
        address[] memory, 
        uint256[] memory, 
        uint256[] memory, 
        string[] memory, 
        uint[] memory 
        ) {

        string[] memory names = new string[](allListedProperties.length);
        address[] memory addresses = new address[](allListedProperties.length);
        uint256[] memory amount = new uint256[](allListedProperties.length);
        uint256[] memory timestamps = new uint256[](allListedProperties.length);
        string[] memory locations = new string[](allListedProperties.length);
        uint[] memory IDs = new uint256[](allListedProperties.length);

        for(uint i = 0; i < allListedProperties.length; ++i ){
            ListedProps memory allProps = allListedProperties[i];
            names[i] = allProps.name;
            addresses[i] = allProps._lister;
            amount[i] = allProps._amount;
            timestamps[i] = allProps._time;
            locations[i] = allProps._location;
            IDs[i] = allProps._id;
        }
        return (names,addresses, amount,timestamps, locations, IDs);
    }

      // function getAllProperties() public returns(bool done){
    //     ListedProps[] memory allListed = new ListedProps[](allListedProperties.length);
    //     for(uint i = 0; i < allListedProperties.length; ++i ){
    //         ListedProps memory allProps = allListedProperties[i];
    //         allListed[i] = allProps;
    //     }
    //     emit AllProperties(allListed);
    //     return true;
    // }
}