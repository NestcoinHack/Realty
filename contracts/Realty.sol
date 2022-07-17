pragma solidity ^0.8.7;
// SPDX-License-Identifier: MIT


import { RealtyNFT} from "./RealtyNFT.sol";


contract Realty is RealtyNFT{

    function getMyListedProperties() public view returns(
        string[] memory, 
        address[] memory, 
        uint256[] memory, 
        uint256[] memory, 
        uint[] memory,
        string[] memory, 
        string[] memory,
        address[] memory
        ) {
            
        string[] memory names = new string[](allListedPerAddress[msg.sender].length);
        address[] memory addresses = new address[](allListedPerAddress[msg.sender].length);
        uint256[] memory amount = new uint256[](allListedPerAddress[msg.sender].length);
        uint256[] memory timestamps = new uint256[](allListedPerAddress[msg.sender].length);
        uint[] memory IDs = new uint256[](allListedPerAddress[msg.sender].length);
        string[] memory locations = new string[](allListedPerAddress[msg.sender].length);
        string[] memory descriptions = new string[](allListedPerAddress[msg.sender].length);
        address[] memory buyers = new address[](allListedPerAddress[msg.sender].length);


        for(uint i = 0; i < allListedPerAddress[msg.sender].length; ++i ){
            ListedProps memory allProps = allListedPerAddress[msg.sender][i];
            names[i] = allProps.name;
            addresses[i] = allProps._lister;
            amount[i] = allProps._amount;
            timestamps[i] = allProps._time;
            IDs[i] = allProps._id;
            locations[i] = allProps._location;
            descriptions[i] = allProps.description;
            buyers[i] = allProps._buyer;
        }
        return (names,addresses, amount,timestamps,IDs,locations, descriptions, buyers);
    }

    function getMyPurchasedProperties() public view returns(
        string[] memory, 
        address[] memory, 
        uint256[] memory, 
        uint256[] memory,
        uint[] memory,
        string[] memory,
        string[] memory,
        address[] memory
        ) {
            
        string[] memory names = new string[](allBoughtPerAddress[msg.sender].length);
        address[] memory ogLister = new address[](allBoughtPerAddress[msg.sender].length);
        uint256[] memory amount = new uint256[](allBoughtPerAddress[msg.sender].length);
        uint256[] memory timeBought = new uint256[](allBoughtPerAddress[msg.sender].length);
        uint[] memory IDs = new uint256[](allBoughtPerAddress[msg.sender].length);
        string[] memory locations = new string[](allBoughtPerAddress[msg.sender].length);
        string[] memory descriptions = new string[](allBoughtPerAddress[msg.sender].length);
        address[] memory newOwner = new address[](allBoughtPerAddress[msg.sender].length);

        for(uint i = 0; i < allBoughtPerAddress[msg.sender].length; ++i ){
            BoughtProps memory allProps = allBoughtPerAddress[msg.sender][i];
            names[i] = allProps.name;
            ogLister[i] = allProps.originalLister;
            amount[i] = allProps._amount;
            timeBought[i] = allProps.purchaseTime;
            IDs[i] = allProps._id;
            locations[i] = allProps._location;
            descriptions[i] = allProps.description;
            newOwner[i] = allProps.newOwner;
        }
        return (names,ogLister, amount,timeBought,  IDs, locations, descriptions,newOwner);
    }




    function getAllProperties() public view returns(
        string[] memory, 
        address[] memory, 
        uint256[] memory, 
        uint256[] memory, 
        uint[] memory,
         string[] memory, 
        string[] memory,
        address[] memory
        ) {

        string[] memory names = new string[](allListedProperties.length);
        address[] memory addresses = new address[](allListedProperties.length);
        uint256[] memory amount = new uint256[](allListedProperties.length);
        uint256[] memory timestamps = new uint256[](allListedProperties.length);
        uint[] memory IDs = new uint256[](allListedProperties.length);
        string[] memory locations = new string[](allListedProperties.length);
        string[] memory descriptions = new string[](allListedProperties.length);
        address[] memory buyers = new address[](allListedProperties.length);


        for(uint i = 0; i < allListedProperties.length; ++i ){
            ListedProps memory allProps = allListedProperties[i];
            names[i] = allProps.name;
            addresses[i] = allProps._lister;
            amount[i] = allProps._amount;
            timestamps[i] = allProps._time;
            IDs[i] = allProps._id;
            buyers[i] = allProps._buyer;
        }
        return (names,addresses, amount,timestamps,IDs,locations,descriptions,buyers); 
    }   
}