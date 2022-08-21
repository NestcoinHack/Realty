# REALTY - [Visit Realty](https://realty-93t6v.spheron.app/#)
Realty is a proof of concept solution for crypto-based real estate purchase/payments with stablecoins. It builds on the idea of having another option for asset listing, investment, saving and payments in the real-estate ecosystem aside fiat currency.

## Project track 
 - NFT and Defi Track 
    - Stablecoins can be used for asset payments and listing, current support is only our test coin — [TUSDT](https://mumbai.polygonscan.com/address/0x4A80319043e4f56562212C10Ad86cDe28083cB10) which you can request for from any team member. Further development of the project for mainstream usage will involve mainnet stablecoins like USDT, DAI etc.

    - NFTs are used for verifying listed assets authenticity on Realty and also as proof of ownership of an asset within Realty.

## Project Video Demo

https://user-images.githubusercontent.com/74747245/180320632-fa6b2b1f-28d4-43be-b094-fb28c5dd98c7.mp4




## Contract Flow
- listProperty : to submit an asset for listing 
- approval : this should be done right before listProperty to give allowance to the Realty contract to transfer 0.5 of the stablecoin to Realty as a listing fee.
- minfNFT : to mint an NFT for the submitted property and thereby publiclly listing the asset for viewing and purchase by everyone.
- payForProperty : to pay for a particular property and have it's NFT transferred to you.
- addPropertyToSavingVault : Unable to pay upfront, add listed property to savings vault for instalmental savings.
- Deposit: sends a given amount of token to the contract. Tokens gets accumulated in order to amount to product price.
- Withdrawal: occurs once total savings equals product price. User withdrawals property price into wallet address for property purchase.

## Using the dApp
- Connect Metamask(on Mumbai testnet)
- Visit [Featured Properties](https://realty-93t6v.spheron.app/#/properties) from the navbar to see the available assets that have been listed.
- Click [`List Property`](https://realty-93t6v.spheron.app/#/list-property) on the navbar to list asset.
- DM [us](https://twitter.com/adedotxn) with your address for [TUSDT](https://mumbai.polygonscan.com/address/0x4A80319043e4f56562212C10Ad86cDe28083cB10) needed to test listing on the dapp.
- Approve realty to list your asset for your price
- Fill the listing form and List your asset
- Mint an NFT for the asset right after you've submitted the asset for listing.
- Check [`Featured Properties`](https://realty-93t6v.spheron.app/#/properties) to view your publicly listed asset.
- Click on Save to buy to add a listing to your savings vault. 
- Click deposit, to deposit token amount into user vault.
- Click on withdraw to withdraw all tokens saved on a particular listing.
- Click on remove from vault to remove a listing from your vault, you can only remove a listing from vault after withdrawing all the tokens saved on it.


## Tools Used
- Solidity 
- Hardhat
- Openzeppelin contracts — ERC721.sol, ERC721URIStorage.sol, IERC20.sol
- JavaScript 
- React js.
- Ethers.js
- Polygon (mumbai) chain
- Chakra UI
- IPFS via Web3.Storage
- Spheron

## Deployments
- Live Site on Spheron: [Realty](https://realty-93t6v.spheron.app/#)

- Contract address : [Realty on polygon scan](https://mumbai.polygonscan.com/address/0x5f3744423Df56F7B203d3bd57e27Afb6fbf53093)
- Verified Contract : [Realty contract on polygon scan](https://mumbai.polygonscan.com/address/0x5f3744423Df56F7B203d3bd57e27Afb6fbf53093#code)
- Contract address : [RealtyVault on polygon scan](https://mumbai.polygonscan.com/address/0xd05e082331373bb6420d97bf7ea832fbe545c882)
-Verified Contract : [RealtyVault on polygon scan](https://mumbai.polygonscan.com/address/0xD05E082331373BB6420D97Bf7Ea832fBe545c882#code)


To run locally :
```shell
  git clone https://github.com/NestcoinHack/Realty.git
```
```shell
  npm install
  npm start
```
or
```shell  
  yarn install
  yarn start
```
To test contract
```shell
npx hardhat node
npx hardhat compile
npx hardhat test

```

