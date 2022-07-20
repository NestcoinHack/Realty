// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

struct Transaction {
    address owner;
    uint256 amount;
    uint256 date;
}

struct PropertyToSaveFor {
    address owner;
    uint256 tokenId;
    address tokenAddress;
    uint256 propertyPrice;
    uint256 amountSaved;
    Transaction[] history;
    uint256 transactionCount;
}

struct Vaults {
    mapping(address => uint256) ownerSavingsCount;
    mapping(address => mapping(uint256 => PropertyToSaveFor)) ownersSavings;
}

contract SavingVault {
    event addedPropertyToVault(address, uint256);
    event deposit(uint256 amount);
    event withdrawal(address owner, uint256 amount);

    Vaults private vault;

    modifier savingPlanExists(uint256 _id, address _owner) {
        require(
            _id <= vault.ownerSavingsCount[_owner],
            "Saving plan does not exist"
        );
        _;
    }

    function addProperty(
        uint256 _tokenId,
        uint256 _propertyPrice,
        address _tokenAddress
    ) public {
        uint256 count = vault.ownerSavingsCount[msg.sender]++;
        PropertyToSaveFor storage myVault = vault.ownersSavings[msg.sender][
            count
        ];
        myVault.owner = msg.sender;
        myVault.tokenId = _tokenId;
        myVault.propertyPrice = _propertyPrice;
        myVault.tokenAddress = _tokenAddress;
        emit addedPropertyToVault(msg.sender, _tokenId);
    }

    function allOwnerSavings()
        public
        view
        returns (PropertyToSaveFor[] memory)
    {
        uint256 count = vault.ownerSavingsCount[msg.sender];
        PropertyToSaveFor[] memory mySavings = new PropertyToSaveFor[](count);
        for (uint256 i = 0; i < count; i++) {
            mySavings[i] = vault.ownersSavings[msg.sender][i];
        }
        return mySavings;
    }

    function Deposit(uint256 _savingId, uint256 _amount)
        public
        savingPlanExists(_savingId, msg.sender)
        returns (PropertyToSaveFor memory)
    {
        PropertyToSaveFor storage updateSavings = vault.ownersSavings[
            msg.sender
        ][_savingId];
        require(
            updateSavings.amountSaved  <=
                updateSavings.propertyPrice,
            "savings is complete already"
        );
        require(
            _userBalance(updateSavings.tokenAddress) >= _amount,
            "Insufficent Balance"
        );
        require(
            IERC20(updateSavings.tokenAddress).transferFrom(
                msg.sender,
                address(this),
                _amount
            ),
          "Transfer disabbled"
        );
        Transaction memory newTransaction = Transaction(
            msg.sender,
            _amount,
            block.timestamp
        );
        updateSavings.amountSaved += _amount;
        updateSavings.history.push(newTransaction);
        updateSavings.transactionCount++;
        emit deposit(_amount);
        return updateSavings;
    }

    function WithdrawSavings(uint256 _savingId)
        public
        savingPlanExists(_savingId, msg.sender)
    {
        PropertyToSaveFor storage updateSavings = vault.ownersSavings[
            msg.sender
        ][_savingId];
        require(
            updateSavings.amountSaved == updateSavings.propertyPrice,
            "Can't purchase saving's incomplete"
        );
        require(
            _contractBalance(updateSavings.tokenAddress) >=
                updateSavings.amountSaved,
            "Insufficent Balance in  contract"
        );
        require(
            IERC20(updateSavings.tokenAddress).transfer(
                msg.sender,
                updateSavings.amountSaved
            ),
            "Error Transfering Asset"
        );
        emit withdrawal(msg.sender, updateSavings.amountSaved);
    }

    function _userBalance(address _tokenAddress) public view returns (uint256) {
        return IERC20(_tokenAddress).balanceOf(msg.sender);
    }

    function _contractBalance(address _tokenAddress)
        public
        view
        returns (uint256)
    {
        return IERC20(_tokenAddress).balanceOf(address(this));
    }
}
