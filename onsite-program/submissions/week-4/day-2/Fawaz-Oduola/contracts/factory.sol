// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "./StudentManagementSystem.sol";

contract Factory  {


    address[] public employeeContracts;

    mapping(address owner => address[] contract_address) public ownerToContract;


    receive() external payable { }

    function createEmployeeManagementContract()external {

        StudentManagementSystem studentManagementSystemContract = new StudentManagementSystem();
        employeeContracts.push(address(studentManagementSystemContract));
        ownerToContract[msg.sender].push(address(studentManagementSystemContract));
    }


    // function addEmployee(string memory _name, address _address, EmployeePosition _position, uint256 _salary) external returns(bool){
    //    EmployeeManagement employeeManagement = EmployeeManagement(payable(ownerToContract[msg.sender]));
    //    employeeManagement.addEmployee(_name, _address, _position, _salary);
    // return true; 
    // }


    // function payEmployee(address _address) external {
    //      EmployeeManagement employeeManagement = EmployeeManagement(payable(ownerToContract[msg.sender]));
    //      employeeManagement.payEmployee(_address);
    // }


    // function getEmployee(address _address) external  view returns(Employee memory){
    //     EmployeeManagement employeeManagement = EmployeeManagement(payable(ownerToContract[msg.sender]));
    //     return employeeManagement.getEmployee(_address);
    // }



    // function fundContract() external payable {
    //    EmployeeManagement employeeManagement = EmployeeManagement(payable(ownerToContract[msg.sender]));
    //    employeeManagement.fundContract{value: msg.value}();
    // }

    function getContractAddress() external view returns (address[] memory) {
        return ownerToContract[msg.sender];
    }

    

}