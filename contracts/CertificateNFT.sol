// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CertificateNFT is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    mapping(uint256 => bool) public revokedCertificates;

    event CertificateMinted(address indexed student, uint256 indexed tokenId, string tokenURI);
    event CertificateRevoked(uint256 indexed tokenId);

    constructor() ERC721("Certificate", "CERT") Ownable(msg.sender) {}

    function mintCertificate(address student, string memory uri) public onlyOwner returns (uint256) {
        require(student != address(0), "Invalid student address");
        require(bytes(uri).length > 0, "Token URI cannot be empty");

        uint256 tokenId = _nextTokenId++;
        _safeMint(student, tokenId);
        _setTokenURI(tokenId, uri);

        emit CertificateMinted(student, tokenId, uri);

        return tokenId;
    }

    function revokeCertificate(uint256 tokenId) public onlyOwner {
        require(_ownerOf(tokenId) != address(0), "Certificate does not exist");
        require(!revokedCertificates[tokenId], "Certificate already revoked");

        revokedCertificates[tokenId] = true;

        emit CertificateRevoked(tokenId);
    }

    function isRevoked(uint256 tokenId) public view returns (bool) {
        return revokedCertificates[tokenId];
    }

    function getCertificatesByOwner(address owner) public view returns (uint256[] memory) {
        uint256 balance = balanceOf(owner);
        uint256[] memory tokenIds = new uint256[](balance);
        uint256 counter = 0;

        for (uint256 i = 0; i < _nextTokenId; i++) {
            if (_ownerOf(i) == owner) {
                tokenIds[counter] = i;
                counter++;
            }
        }

        return tokenIds;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
