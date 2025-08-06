// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;
import "./ERC-20.sol";



contract ERC_20_FACTORY{

    address[] public erc_20_contracts;
    mapping (address owner => address contracts) ownerToContracts;

    constructor(){

    }

    function create_erc_20_contract(string memory _name, string memory _symbol) external {
        if (ownerToContracts[msg.sender] != address(0)){
            revert("you already have a contract");
        }
        CHILD_TOKEN new_erc_20 = new CHILD_TOKEN(_name, _symbol);
        erc_20_contracts.push(address(new_erc_20));
        ownerToContracts[msg.sender] = address(new_erc_20);
    }


    function balanceOf(address _owner) external view returns(uint256){
        if (ownerToContracts[msg.sender] == address(0)){
            revert("you don't have a child contract");
        }
        CHILD_TOKEN child_token = CHILD_TOKEN(ownerToContracts[msg.sender]);
        return child_token.balanceOf(_owner);
    }

    function decimals() external view returns (uint256){
        if (ownerToContracts[msg.sender] == address(0)){
            revert("you don't have a child contract");
        }
        CHILD_TOKEN child_token = CHILD_TOKEN(ownerToContracts[msg.sender]);
        return child_token.decimals();
    }

    function name() external view returns (string memory){
        if (ownerToContracts[msg.sender] == address(0)){
            revert("you don't have a child contract");
        }
        CHILD_TOKEN child_token = CHILD_TOKEN(ownerToContracts[msg.sender]);
        return child_token.name();
    }


    function totalSupply() external view  returns (uint256){
        if (ownerToContracts[msg.sender] == address(0)){
            revert("you don't have a child contract");
        }
        CHILD_TOKEN child_token = CHILD_TOKEN(ownerToContracts[msg.sender]);
        return child_token.totalSupply();
    }

    function symbol() public view returns (string memory){
        if (ownerToContracts[msg.sender] == address(0)){
            revert("you don't have a child contract");
        }
        CHILD_TOKEN child_token = CHILD_TOKEN(ownerToContracts[msg.sender]);
        return child_token.symbol();
    }

    // function transfer(address _to, uint256 _value) external  returns (bool success){
    //     CHILD_TOKEN child_token = CHILD_TOKEN(ownerToContracts[msg.sender]);
    //     child_token.transfer(_to, _value);
    //     return true;
    // }

    // function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){
    //     CHILD_TOKEN child_token = CHILD_TOKEN(ownerToContracts[msg.sender]);
    //     return child_token.transferFrom(_from, _to, _value);
    // }
 
    // function approve(address _spender, uint256 _value) public returns (bool success){
    //     CHILD_TOKEN child_token = CHILD_TOKEN(ownerToContracts[msg.sender]);
    //     child_token.approve(_spender, _value);
    //     return true;
    // }

    // function allowance(address _owner, address _spender) public view returns (uint256){
    //     CHILD_TOKEN child_token = CHILD_TOKEN(ownerToContracts[msg.sender]);
    //     return child_token.allowance(_owner, _spender);        
    // }

    function getContractAddress() external view returns (address){
        if (ownerToContracts[msg.sender] == address(0)){
            revert("you don't have a child contract");
        }
        return ownerToContracts[msg.sender];
    }
}