// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "./interface/employeeManagement.sol";
import "./employeeManagement.sol";

contract Factory is IEmployeeManagement {

    Employee[] public employees;

    address[] public employeeContracts;

    mapping(address owner => address contract_address) ownerToContract;


    receive() external payable { }

    function createFactory()external {
        if(ownerToContract[msg.sender] != address(0)){
            revert("you already own a contract");
        }

        EmployeeManagement employeeManagementContract = new EmployeeManagement();
        employeeContracts.push(address(employeeManagementContract));
        ownerToContract[msg.sender] = address(employeeManagementContract);
    }


    function addEmployee(string memory _name, address _address, EmployeePosition _position, uint256 _salary) external returns(bool){
       EmployeeManagement employeeManagement = EmployeeManagement(payable(ownerToContract[msg.sender]));
       employeeManagement.addEmployee(_name, _address, _position, _salary);
    return true; 
    }


    function payEmployee(address _address) external {
         EmployeeManagement employeeManagement = EmployeeManagement(payable(ownerToContract[msg.sender]));
         employeeManagement.payEmployee(_address);
    }


    function getEmployee(address _address) external  view returns(Employee memory){
        EmployeeManagement employeeManagement = EmployeeManagement(payable(ownerToContract[msg.sender]));
        return employeeManagement.getEmployee(_address);
    }



    function fundContract() external payable {
       EmployeeManagement employeeManagement = EmployeeManagement(payable(ownerToContract[msg.sender]));
       employeeManagement.fundContract();
    }

    

}