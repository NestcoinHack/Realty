pragma solidity ^0.8.7;
// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PropertyNFT is ERC721, ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct ListingProps {
        string name;
        address _lister;
        uint256 _amount;
        uint256 _time;
    }
    struct ListedProps {
        string name;
        address _lister;
        uint256 _amount;
        uint256 _time;
        uint256 _id;
    }
    ListingProps _listingprops;
    ListedProps _listedprops;

    mapping(address => uint256) public propertyID;
    mapping(address => ListingProps) public listings;
    mapping(address => ListedProps) public listed;
    mapping(address => mapping(string => bool)) isListed;

    constructor() ERC721("PropFT", "PRP") {}

    function listProperty(string calldata name, address _lister, uint256 _amount) public returns(bool) {
        listings[_lister] = ListingProps(name, _lister, _amount, block.timestamp);
        isListed[_lister][name] = true;
        return true;
    }

    function mintNFT(address buyer, string memory _tokenURI, string memory _name)  public returns (uint256) {
        require(isListed[buyer][_name], "Property has not been listed");
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();
        _safeMint(buyer, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);
        propertyID[buyer] = newTokenId;
        listed[buyer] = ListedProps(listings[buyer].name,listings[buyer]._lister,listings[buyer]._amount,listings[buyer]._time, propertyID[buyer] );

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


    function getPropertyByLister(address _of) public view returns(string memory) {
        return listed[_of].name;
    }
}