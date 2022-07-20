# REALTY
Realty is a proof of concept solution for crypto-based real estate purchase/payments with stablecoins. It builds on the idea of having another option for asset listing, investment, saving and payments in the real-estate ecosystem.

## Contract Flow
- listProperty : to submit an asset for listing 
- approval : this should be done right before listProperty to give allowance to the Realty contract to transfer 0.5 of the stablecoin to Realty as a listing fee.
- minfNFT : to mint an NFT for the submitted property and thereby publiclly listing the asset for viewing and purchase by everyone.
- payForProperty : to pay for a particular property and have it's NFT transferred to you.


Try run locally :
```shell
  git clone https://github.com/NestcoinHack/Realty.git
  run npm install
  
  or
  
  yarn install
  
  npm run start
  
  or
  
  yarn run start
```
To test contract
```shell
npx hardhat node
npx hardhat compile
npx hardhat test

```
