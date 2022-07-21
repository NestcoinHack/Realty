# REALTY - [Visit Realty](https://realty-app.netlify.app)
Realty is a proof of concept solution for crypto-based real estate purchase/payments with stablecoins. It builds on the idea of having another option for asset listing, investment, saving and payments in the real-estate ecosystem aside fiat currency.

## Project track 
 - Creator Track 
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
- Connect Metamask
- Visit [Featured Properties](https://realty-app.netlify.app/properties) from the navbar to see the available assets that have been listed.
- Click [`List Property`](https://realty-app.netlify.app/list-property) on the navbar to list asset.
- DM [us](https://twitter.com/adedotxn) with your address for [TUSDT](https://mumbai.polygonscan.com/address/0x4A80319043e4f56562212C10Ad86cDe28083cB10) needed to test listing on the dapp.
- Approve realty to list your asset for your price
- Fill the listing form and List your asset
- Mint an NFT for the asset right after you've submitted the asset for listing.
- Check [`Featured Properties`](https://realty-app.netlify.app/properties) to view your publicly listed asset.
- Click deposit, to deposit token amount into user's savings account.
- Start Savings, creates a saving account for a user. Permits property saving listing.


## Tools Used
- Solidity 
- Hardhat
- Openzeppelin contracts — ERC721.sol, ERC721URIStorage.sol, IERC20.sol
- JavaScript 
- React js.
- Ethers.js
- Polygon (mumbai) chain
- Chakra UI

## Deployments
- Live Site : [Realty](https://realty-app.netlify.app)
- Contract address : [Realty on polygon scan](https://mumbai.polygonscan.com/address/0xfb5D1FB4D944AED05938fDD906D8A855187Fb6a5)
- Verified Contract : [Realty contract on polygon scan](https://mumbai.polygonscan.com/address/0xfb5D1FB4D944AED05938fDD906D8A855187Fb6a5#codePS)



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

