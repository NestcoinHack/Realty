pragma solidity ^0.8.4;
// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ProperyNFT is ERC721, ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("PropFT", "PRP") {}

    function mintNFT(address buyer, string memory _tokenURI)  public returns (uint256) {
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();
        _safeMint(buyer, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);

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
}