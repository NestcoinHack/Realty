// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Vault{
    using SafeERC20 for IERC20;
    
    //property struct
    struct property{
        uint256 propertyId;
        uint256 price;
        uint256 amountSaved;
        string tokenSymbol;
        address tokenAddress;
    }

    // contract events
    event Deposit(address _depositor, uint256 _amount, uint256 _id);
    event Withdrawal(address _withdrawer, uint256 _amount, uint256 _id);
    event AddToVault(address _user, uint256 _id);
    event RemoveFromVault(address _user, uint256 _id);

    mapping(address => property[]) public allVaults;

    property[] public userVault = allVaults[msg.sender];

    address owner;

    modifier onlyOwner {
        require( msg.sender == owner, "Only owner can call this function.");
        _;
    }

    constructor(){
        //set deployer as owner
        owner = msg.sender;
    }

    function getUserVault(address _addr) public view returns (property[] memory){
        return allVaults[_addr];
    }

    function addToMyVault(uint256 _id, uint256 _price, string memory _symbol, address _addr) public returns (bool){    
        // check if the property is in your vault
        require(checkIfPropertyExists(msg.sender, _id) == false , "You already have this property in your vault");
        //add to vault
        userVault.push(property({
            propertyId: _id,
            price: _price,
            amountSaved: 0,
            tokenSymbol: _symbol,
            tokenAddress: _addr
        }));
        allVaults[msg.sender] = userVault;
        emit AddToVault(msg.sender, _id);
        return true;
    }

    function removeFromMyVault(uint256 _id) public {
        // check if the property is in your vault
        require(checkIfPropertyExists(msg.sender, _id) == true , "You do not have this property in your vault");
        //check that amount saved is 0 or has been withdrawn
        require(getPropertyById(msg.sender, _id).amountSaved == 0, "You need to withdraw your tokens first");
        //remove from vault
       for (uint i = 0; i < userVault.length; ++i) {
           if (userVault[i].propertyId == _id) {
               // sets the last element in the position of the item to e deleted
              userVault[i] = userVault[userVault.length - 1]; 
           }
       }
       // deletes the last item since it has been replicated in position i
       userVault.pop();
       allVaults[msg.sender] = userVault;
       emit RemoveFromVault(msg.sender, _id);     
    }

    function depositToProperty(uint256 _id, uint256 _amount) public returns (bool){
        // calculating amount required to meet target
        uint256 bal = getPropertyById(msg.sender,_id).price - getPropertyById(msg.sender, _id).amountSaved;
        // token address of property
        address _addr = getPropertyById(msg.sender, _id).tokenAddress;
        // check that the property is in your vault
        require(checkIfPropertyExists(msg.sender, _id) == true , "You do not have this property in your vault");
        // check that amount is more than 0 and less than balance
        require(_amount > 0, "Amount must be greater than 0");
        require(_amount <= bal , "Amount is greater than the property price");
        // check that user has enough tokens to send
        require(IERC20(_addr).balanceOf(msg.sender) >= bal, "Insufficient Funds");
        // transfer tokens from user to this contract
        IERC20(_addr).safeTransferFrom(msg.sender, address(this), _amount);

        // incrementing the amount saved of the property
        for (uint i = 0; i < userVault.length; ++i) {
           if (userVault[i].propertyId == _id) {
             userVault[i].amountSaved = getPropertyById(msg.sender, _id).amountSaved + _amount;
             allVaults[msg.sender] = userVault;
           }
       }
       emit Deposit(msg.sender,_amount, _id);
        return true;
    }

    function withdrawTokens(uint256 _id) public returns (bool){
        // amount saved
        uint256 amount = getPropertyById(msg.sender, _id).amountSaved;
        // token address of property
        address _addr = getPropertyById(msg.sender,_id).tokenAddress;
        // check that the property is in your vault
        require(checkIfPropertyExists(msg.sender, _id) == true , "You do not have this property in your vault");
        // check that amount saved is more than 0
        require(amount > 0, "You have no saved tokens for this property");
        //check that the contract token balance is up to the amount to be sent
        require(IERC20(_addr).balanceOf(address(this)) >= amount, "Insufficient Funds in contract");
        //withdraw tokens
         IERC20(_addr).safeTransfer(msg.sender, amount);

         // updating the amount saved of the property
        for (uint i = 0; i < userVault.length; ++i) {
           if (userVault[i].propertyId == _id) {
             userVault[i].amountSaved = 0;
             allVaults[msg.sender] = userVault;
           }
       }
       emit Withdrawal(msg.sender, amount, _id);
        return true;   
    }

    function checkIfPropertyExists(address _userAddr, uint256 _id) internal view returns (bool){
        property[] memory sampleVault = allVaults[_userAddr];
        for (uint i = 0; i < sampleVault.length; ++i) {
           if (sampleVault[i].propertyId == _id) {
              return true;
           }
       }
       return false;
    }

    function getPropertyById(address _userAddr, uint256 _id)internal view returns (property memory){
        property[] memory sampleVault = allVaults[_userAddr];
        property memory singleProperty;
        for (uint i = 0; i < sampleVault.length; ++i) {
           if (sampleVault[i].propertyId == _id) {
              singleProperty = sampleVault[i];
           }
       }
       return singleProperty;
    }

    function getContractTokenBalance(address _tokenAddr) internal view returns (uint256){
        return IERC20(_tokenAddr).balanceOf(address(this));
    }

    function withdrawContractTokens(address _tokenAddr)public onlyOwner{
        uint256 bal = getContractTokenBalance(_tokenAddr);
        //check that balance is more than 0
        require(bal > 0 , "You do not have this token");
        //withdraw tokens
         IERC20(_tokenAddr).safeTransfer(owner,bal);
    }
}