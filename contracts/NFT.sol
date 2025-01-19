//  SPDX-License-Identifier:MIT

pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {
    uint public tokenCount;

    constructor() ERC721("DApp NFT", "DAPP") {}

    function mint(string memory _tokenURI) external returns (uint) {
        tokenCount++;
        _safeMint(msg.sender, tokenCount);
        _setTokenURI(tokenCount, _tokenURI);
        return (tokenCount);
    }
}
