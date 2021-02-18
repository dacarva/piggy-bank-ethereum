pragma solidity ^0.5.0;

contract PiggyBank {
    string public name;
    address payable public owner;

    modifier isOwner() {
        require(msg.sender == owner);
        _;
    }

    event FundsDeposited(address indexed from, uint256 value);

    event FundsWithdrawed(uint256 value);

    constructor() public {
        name = 'Ethereum based Piggy Bank';
        owner = msg.sender;
    }

    //Transfer funds to piggy bank
    function deposit() public payable {
        emit FundsDeposited(msg.sender, msg.value);
    }

    // Withdraw the balance only for the owner
    function withdraw() public isOwner {
        owner.transfer(address(this).balance);
        emit FundsWithdrawed(address(this).balance);
    }

    function sentToOwner() public payable {
        owner.transfer(msg.value);
        emit FundsWithdrawed(msg.value);
    }
}
