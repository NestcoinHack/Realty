pragma solidity ^0.8.7;
// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract Property is ERC721, ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address owner;
    address public constant nullAddress = 0x000000000000000000000000000000000000dEaD;

    event AllProperties(ListedProps[] properties);
    event CurrentUserProperties(ListedProps[] properties);
    event Submitted(bool submitted);
    event Listed(string name, string location, string tokenURL);

    modifier onlyOwner {
        require(
            msg.sender == owner,
            "Only owner can call this function."
        );
        _;
    }

    mapping(string => address) public paymentTokens;
    mapping(string => bool) public _isTokenAcceptable;
    mapping (uint256 => bool ) public _idExists;
    mapping(address => mapping(string => bool)) isListed;
    mapping(address => mapping(string => bool)) hasMinted;
    mapping(address => uint256) public propertyID;
    mapping(address => ListingProps) public listings;
    mapping(address => ListedProps) public listed;
    mapping(address => ListingProps[]) public allListingsPerAddress;
    mapping(uint256 => ListedProps) public _trackListingsWithID;
    mapping(address => ListedProps[]) public allListedPerAddress;
    ListedProps[] public allListedProperties;
    mapping(address => BoughtProps[]) public allBoughtPerAddress;

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
        address _buyer;
    }


    struct BoughtProps {
        string name;
        address originalLister;
        uint256 _amount;
        uint256 _time;
        uint256 purchaseTime;
        string _location;
        uint256 _id;
        address newOwner;
    }

    constructor() ERC721("Props", "PRP") {
        owner = msg.sender;
    }

    function setPaymentTokens(string memory symbol, address tokenAddress) external onlyOwner {
        paymentTokens[symbol] = tokenAddress;
        _isTokenAcceptable[symbol] = true;
    }
    function userBalance(string memory symbol) public view returns(uint256) {
       return IERC20(paymentTokens[symbol]).balanceOf(msg.sender);
    }
    function contractBalance(string memory symbol) public view returns(uint256) {
        return IERC20(paymentTokens[symbol]).balanceOf(address(this));
    }

    function listProperty(string calldata name, uint256 _amount, string calldata _location, string memory symbol) public returns(bool) {
        require(_isTokenAcceptable[symbol] == true, "Payment token isn't accepted");

        IERC20(paymentTokens[symbol]).transferFrom(msg.sender, address(this), 0.5*10**18);
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
        _idExists[newTokenId] = true;

        _trackListingsWithID[propertyID[buyer]] = ListedProps(listings[buyer].name,listings[buyer]._lister,listings[buyer]._amount,listings[buyer]._time,listings[buyer]._location, propertyID[buyer], nullAddress );

        //using the data stored in the struct in the listing propery to populate the array of approved listed property per address
        allListedPerAddress[msg.sender].push(
            ListedProps(
                listings[buyer].name,
                listings[buyer]._lister,
                listings[buyer]._amount,
                listings[buyer]._time,
                listings[buyer]._location, 
                propertyID[buyer],
                nullAddress
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
                propertyID[buyer],
                nullAddress
            )
        );

        hasMinted[msg.sender][_name] = true;
        emit Listed(_name, listings[buyer]._location, _tokenURI);
        return newTokenId;
    }


    function payForProperty(uint256 _id, string memory symbol) public{
        require(_idExists[_id], "Props: Propery does not exist");
        require( _trackListingsWithID[_id]._lister != msg.sender, "Props: Property already belongs to you");
        require( _trackListingsWithID[_id]._buyer != msg.sender, "Props: Property already belongs to you");

        require(IERC20(paymentTokens[symbol]).balanceOf(msg.sender) >=  _trackListingsWithID[_id]._amount, "Insufficient Funds");

        require(IERC20(paymentTokens[symbol]).transferFrom(msg.sender, 
            _trackListingsWithID[_id]._lister,  
            _trackListingsWithID[_id]._amount
        ), "Props : Cannot perform payment");

        //transfer NFT to msg.sender
        _transfer(_trackListingsWithID[_id]._lister, msg.sender, _id);

        _trackListingsWithID[_id]._buyer = msg.sender;

        allBoughtPerAddress[msg.sender].push(
            BoughtProps(
                _trackListingsWithID[_id].name,
                _trackListingsWithID[_id]._lister,
                _trackListingsWithID[_id]._amount,
                _trackListingsWithID[_id]._time,
                block.timestamp,
                _trackListingsWithID[_id]._location, 
                _trackListingsWithID[_id]._id,
                msg.sender
            )
        );

        for(uint256 i = 0; i < allListedPerAddress[_trackListingsWithID[_id]._lister].length; ++i) {
            if(allListedPerAddress[_trackListingsWithID[_id]._lister][i]._id == _id) {
                allListedPerAddress[_trackListingsWithID[_id]._lister][i]._buyer = msg.sender;
            }
        }

        for(uint256 i = 0; i < allListedProperties.length; ++i) {
            if(allListedProperties[i]._id == _id) {
                allListedProperties[i]._buyer = msg.sender;
            }
        }
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


    function getMyListedProperties() public view returns(
        string[] memory, 
        address[] memory, 
        uint256[] memory, 
        uint256[] memory, 
        string[] memory, 
        uint[] memory,
        address[] memory
        ) {
            
        string[] memory names = new string[](allListedPerAddress[msg.sender].length);
        address[] memory addresses = new address[](allListedPerAddress[msg.sender].length);
        uint256[] memory amount = new uint256[](allListedPerAddress[msg.sender].length);
        uint256[] memory timestamps = new uint256[](allListedPerAddress[msg.sender].length);
        string[] memory locations = new string[](allListedPerAddress[msg.sender].length);
        uint[] memory IDs = new uint256[](allListedPerAddress[msg.sender].length);
        address[] memory buyers = new address[](allListedProperties.length);

        for(uint i = 0; i < allListedPerAddress[msg.sender].length; ++i ){
            ListedProps memory allProps = allListedPerAddress[msg.sender][i];
            names[i] = allProps.name;
            addresses[i] = allProps._lister;
            amount[i] = allProps._amount;
            timestamps[i] = allProps._time;
            locations[i] = allProps._location;
            IDs[i] = allProps._id;
            buyers[i] = allProps._buyer;
        }
        return (names,addresses, amount,timestamps, locations, IDs, buyers);
    }

    function getMyPurchasedProperties() public view returns(
        string[] memory, 
        address[] memory, 
        uint256[] memory, 
        uint256[] memory, 
        uint256[] memory,
        string[] memory, 
        uint[] memory,
        address[] memory
        ) {
            
        string[] memory names = new string[](allBoughtPerAddress[msg.sender].length);
        address[] memory ogLister = new address[](allBoughtPerAddress[msg.sender].length);
        uint256[] memory amount = new uint256[](allBoughtPerAddress[msg.sender].length);
        uint256[] memory listingTime = new uint256[](allBoughtPerAddress[msg.sender].length);
        uint256[] memory timeBought = new uint256[](allBoughtPerAddress[msg.sender].length);
        string[] memory locations = new string[](allBoughtPerAddress[msg.sender].length);
        uint[] memory IDs = new uint256[](allBoughtPerAddress[msg.sender].length);
        address[] memory newOwner = new address[](allBoughtPerAddress[msg.sender].length);

        for(uint i = 0; i < allBoughtPerAddress[msg.sender].length; ++i ){
            BoughtProps memory allProps = allBoughtPerAddress[msg.sender][i];
            names[i] = allProps.name;
            ogLister[i] = allProps.originalLister;
            amount[i] = allProps._amount;
            listingTime[i] = allProps._time;
            timeBought[i] = allProps.purchaseTime;
            locations[i] = allProps._location;
            IDs[i] = allProps._id;
            newOwner[i] = allProps.newOwner;
        }
        return (names,ogLister, amount,listingTime,timeBought, locations, IDs,newOwner);
    }


    function getAllProperties() public view returns(
        string[] memory, 
        address[] memory, 
        uint256[] memory, 
        uint256[] memory, 
        string[] memory, 
        uint[] memory,
        address[] memory
        ) {

        string[] memory names = new string[](allListedProperties.length);
        address[] memory addresses = new address[](allListedProperties.length);
        uint256[] memory amount = new uint256[](allListedProperties.length);
        uint256[] memory timestamps = new uint256[](allListedProperties.length);
        string[] memory locations = new string[](allListedProperties.length);
        uint[] memory IDs = new uint256[](allListedProperties.length);
        address[] memory buyers = new address[](allListedProperties.length);


        for(uint i = 0; i < allListedProperties.length; ++i ){
            ListedProps memory allProps = allListedProperties[i];
            names[i] = allProps.name;
            addresses[i] = allProps._lister;
            amount[i] = allProps._amount;
            timestamps[i] = allProps._time;
            locations[i] = allProps._location;
            IDs[i] = allProps._id;
            buyers[i] = allProps._buyer;
        }
        return (names,addresses, amount,timestamps, locations, IDs, buyers); 
    }
}