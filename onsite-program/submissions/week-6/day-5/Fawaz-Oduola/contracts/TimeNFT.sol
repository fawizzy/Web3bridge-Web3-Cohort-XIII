// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";


contract TimeNFT is ERC721URIStorage {
    uint256 private _tokenIds;

    constructor() ERC721("TIME", "TIME") {}

    function mint(
        address owner
    ) public returns (uint256) {
        uint256 newItemId = _tokenIds;
        
        
        _mint(owner, newItemId);

        _tokenIds++;
        return newItemId;
    }

    function tokenURI(uint256 _tokenId) public view override returns(string memory) {
        uint256 currentTime = block.timestamp;
        uint256 hours_ = (currentTime / 3600) % 24;
        uint256 minutes_ = (currentTime / 60) % 60;
        uint256 seconds_ = currentTime % 60;

        string memory hh = hours_ < 10
            ? string(abi.encodePacked("0", Strings.toString(hours_)))
            : Strings.toString(hours_);
        string memory mm = minutes_ < 10
            ? string(abi.encodePacked("0", Strings.toString(minutes_)))
            : Strings.toString(minutes_);
        string memory ss = seconds_ < 10
            ? string(abi.encodePacked("0", Strings.toString(seconds_)))
            : Strings.toString(seconds_);
        
        string memory timeStr = string(abi.encodePacked(hh, ":", mm, ":", ss));

        string memory svg = string(
            abi.encodePacked(
                "<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200'>",
                "<rect width='100%' height='100%' fill='black'/>",
                "<text x='50%' y='50%' fill='white' font-size='24' text-anchor='middle'>",
                timeStr,
                "</text></svg>"
            )
        );
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "Time NFT #',
                        Strings.toString(_tokenId),
                        '", "description": "On-chain SVG showing block.timestamp", "image": "data:image/svg+xml;base64,',
                        Base64.encode(bytes(svg)),
                        '"}'
                    )
                )
            )
        );
         string memory tokenURI_ = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        return tokenURI_;
    }

    function getCurrentTime() public view returns (string memory) {
        uint256 currentTime = block.timestamp;
        uint256 hours_ = (currentTime / 3600) % 24;
        uint256 minutes_ = (currentTime / 60) % 60;
        uint256 seconds_ = currentTime % 60;

        string memory hh = hours_ < 10
            ? string(abi.encodePacked("0", Strings.toString(hours_)))
            : Strings.toString(hours_);
        string memory mm = minutes_ < 10
            ? string(abi.encodePacked("0", Strings.toString(minutes_)))
            : Strings.toString(minutes_);
        string memory ss = seconds_ < 10
            ? string(abi.encodePacked("0", Strings.toString(seconds_)))
            : Strings.toString(seconds_);

        return string(abi.encodePacked(hh, ":", mm, ":", ss));
    }

    function getSVG() public view returns (string memory) {
        string memory timeStr = getCurrentTime();
        return string(
            abi.encodePacked(
                "<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200'>",
                "<rect width='100%' height='100%' fill='black'/>",
                "<text x='50%' y='50%' fill='white' font-size='24' text-anchor='middle'>",
                timeStr,
                "</text></svg>"
            )
        );
    }
}
