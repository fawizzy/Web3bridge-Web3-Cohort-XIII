import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("EmployeeManagement", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployEmployeeManagement() {
  
   
    // Contracts are deployed using the first signer/account by default
    const [owner, employee1, employee2 ] = await hre.ethers.getSigners();

    const EmployeeManagement = await hre.ethers.getContractFactory("EmployeeManagement");
    const Factory = await hre.ethers.getContractFactory("Factory");
    const employeeManagement = await EmployeeManagement.deploy();
    const factory = await Factory.deploy();

    return { employeeManagement,factory, owner, employee1, employee2 };
  }

  describe("Employee Management", function () {
    it("Should add the employee", async function () {
      const { employeeManagement, owner, employee1, employee2 } = await loadFixture(deployEmployeeManagement);
      const employeeName = "Ayo";
      const employeeAddress = employee1.address;
      const employeePosition = 0;
      const employeeSalary = 100;
      await employeeManagement.addEmployee(employeeName, employee1.address, employeePosition, employeeSalary)
      expect(await employeeManagement.addEmployee.staticCall(employeeName, employee1.address, employeePosition, employeeSalary)).to.be.true;
      expect((await employeeManagement.getEmployee(employeeAddress)).name).to.be.equal(employeeName);
      expect((await employeeManagement.getEmployee(employeeAddress))._address).to.be.equal(employeeAddress);
      expect((await employeeManagement.getEmployee(employeeAddress)).position).to.be.equal(employeePosition);
      expect((await employeeManagement.getEmployee(employeeAddress)).salary).to.be.equal(employeeSalary);
    });

    it("Should add the employee in the child contract", async function () {
      const { employeeManagement,factory, owner, employee1, employee2 } = await loadFixture(deployEmployeeManagement);
      const employeeName = "Ayo";
      const employeeAddress = employee1.address;
      const employeePosition = 0;
      const employeeSalary = 100;
      await factory.createEmployeeManagementContract();
      await factory.addEmployee(employeeName, employee1.address, employeePosition, employeeSalary)
      expect(await factory.addEmployee.staticCall(employeeName, employee1.address, employeePosition, employeeSalary)).to.be.true;
      expect((await factory.getEmployee(employeeAddress)).name).to.be.equal(employeeName);
      expect((await factory.getEmployee(employeeAddress))._address).to.be.equal(employeeAddress);
      expect((await factory.getEmployee(employeeAddress)).position).to.be.equal(employeePosition);
      expect((await factory.getEmployee(employeeAddress)).salary).to.be.equal(employeeSalary);
    });

    it("Should get employee by address", async function(){
      const { employeeManagement, owner, employee1, employee2 } = await loadFixture(deployEmployeeManagement);
      const employeeName = "Ayo";
      const employeeAddress = employee1.address;
      const employeePosition = 0;
      const employeeSalary = 100;
      await employeeManagement.addEmployee(employeeName, employee1.address, employeePosition, employeeSalary);

      expect((await employeeManagement.getEmployee(employeeAddress))._address).to.be.equal(employeeAddress)
    })

    it("Should get employee by address for child contract", async function(){
      const { factory, owner, employee1, employee2 } = await loadFixture(deployEmployeeManagement);
      const employeeName = "Ayo";
      const employeeAddress = employee1.address;
      const employeePosition = 0;
      const employeeSalary = 100;
      await factory.createEmployeeManagementContract();
      await factory.addEmployee(employeeName, employee1.address, employeePosition, employeeSalary);

      expect((await factory.getEmployee(employeeAddress))._address).to.be.equal(employeeAddress)
    })


    it("Should fund contract", async function () {
      const { factory, owner, employee1, employee2 } = await loadFixture(deployEmployeeManagement);
      const CA  = await factory.getAddress()

      const balance = await hre.ethers.provider.getBalance(owner.address);

      await owner.sendTransaction({
        to: CA,
        value: 100000
      })

      expect( await owner.sendTransaction({
        to: CA,
        value: 100000
      })).to.changeEtherBalance([owner.address, CA],[-100000, 100000])
      
    })

    it("Should fund contract with fundContract function", async function () {
      const { factory, owner, employee1, employee2 } = await loadFixture(deployEmployeeManagement);
      
      await factory.createEmployeeManagementContract()
      const CA  = await factory.getAddress()
      const childAddress = await factory.getContractAddress()
      const funds = 10000;
      let initialChildAddressBalance = await hre.ethers.provider.getBalance(childAddress);

      console.log(CA, childAddress);


      const balance = await hre.ethers.provider.getBalance(owner.address);

      

      await factory.fundContract({value:funds});

      const currentChildBalance = await hre.ethers.provider.getBalance(childAddress);


      
     

      expect(currentChildBalance - initialChildAddressBalance ).to.be.equal(funds)
      
    })



    it("should pay employee", async function () {
      const { employeeManagement, owner, employee1, employee2 } = await loadFixture(deployEmployeeManagement);
      const CA  = await employeeManagement.getAddress();
      await owner.sendTransaction({
        to: CA,
        value: 1000000
      })
      const employeeName = "Ayo";
      const employeeAddress = employee1.address;
      const employeePosition = 0;
      const employeeSalary = 100;
      await employeeManagement.addEmployee(employeeName, employee1.address, employeePosition, employeeSalary)
      
      const employee = await employeeManagement.getEmployee(employeeAddress)

      expect( await employeeManagement.payEmployee(employee1.address)).to.changeEtherBalance([CA,employee1.address],[-employee.salary, employee.salary])

      
      
    })

    

      // expect(await hre.ethers.provider.getBalance(lock.target)).to.equal(
      //   lockedAmount
      // );
    });

    


  // describe("Withdrawals", function () {
  //   describe("Validations", function () {
  //     it("Should revert with the right error if called too soon", async function () {
  //       const { lock } = await loadFixture(deployOneYearLockFixture);

  //       await expect(lock.withdraw()).to.be.revertedWith(
  //         "You can't withdraw yet"
  //       );
  //     });

  //     it("Should revert with the right error if called from another account", async function () {
  //       const { lock, unlockTime, otherAccount } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       // We can increase the time in Hardhat Network
  //       await time.increaseTo(unlockTime);

  //       // We use lock.connect() to send a transaction from another account
  //       await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
  //         "You aren't the owner"
  //       );
  //     });

  //     it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
  //       const { lock, unlockTime } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       // Transactions are sent using the first signer by default
  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw()).not.to.be.reverted;
  //     });
  //   });

  //   // describe("Events", function () {
  //   //   it("Should emit an event on withdrawals", async function () {
  //   //     const { lock, unlockTime, lockedAmount } = await loadFixture(
  //   //       deployOneYearLockFixture
  //   //     );

  //   //     await time.increaseTo(unlockTime);

  //   //     await expect(lock.withdraw())
  //   //       .to.emit(lock, "Withdrawal")
  //   //       .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
  //   //   });
  //   // });

  //   // describe("Transfers", function () {
  //   //   it("Should transfer the funds to the owner", async function () {
  //   //     const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
  //   //       deployOneYearLockFixture
  //   //     );

  //   //     await time.increaseTo(unlockTime);

  //   //     await expect(lock.withdraw()).to.changeEtherBalances(
  //   //       [owner, lock],
  //   //       [lockedAmount, -lockedAmount]
  //   //     );
  //   //   });
  //   // });
  // });
});
