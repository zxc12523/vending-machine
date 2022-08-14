pragma solidity ^0.8.11;

contract VendingMachine {
    address public owner;

    mapping(address => uint256) public donutBalances;

    constructor() {
        owner = msg.sender;
        donutBalances[address(this)] = 100;
    }

    function getVendingMachineBalance() public view returns (uint256) {
        return donutBalances[address(this)];
    }

    function restock(uint256 amount) public {
        require(msg.sender == owner, "Only owner can restock");
        donutBalances[address(this)] += amount;
    }

    function purchase(uint256 amount) public payable {
        require(
            msg.value >= amount * 2 ether,
            "You must have at least 2 ETH to purchase dount"
        );
        require(
            donutBalances[address(this)] >= amount,
            "Not enough dounts in stock to complete this purchase"
        );
        donutBalances[address(this)] -= amount;
        donutBalances[msg.sender] += amount;
    }
}
