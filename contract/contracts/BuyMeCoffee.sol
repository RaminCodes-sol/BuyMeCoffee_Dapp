// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;




contract BuyMeCoffee {
    address payable public owner;

    struct PatronStruct {
        string name;
        string message;
        uint256 time;
        address from;
    }

    PatronStruct[] public patrons;

    event CoffeeBought(address _patronAddress, uint256 _amount, uint256 _time);

    constructor() {
        owner = payable(msg.sender);
    }
    
    // Buy Coffee   
    function buyCoffee (string calldata _name, string calldata _message) public payable {
        require(msg.value > 0, "Please pay more than 0");
        
        PatronStruct memory newPatron = PatronStruct({
            name: _name,
            message: _message,
            time: block.timestamp,
            from: msg.sender
        });

        patrons.push(newPatron);

        (bool success, ) = owner.call{value: msg.value}("");
        require(success, "Transfering Failed");

        emit CoffeeBought(msg.sender, msg.value, block.timestamp);
    }

    // Get Patrons
    function getPatrons () public view returns (PatronStruct[] memory) {
        return patrons;
    }
}
