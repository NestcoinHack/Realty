# REALTY

## Contract Flow
- listProperty -- to submit an asset for listing 
- approval -- this is done right before listProperty to give allowance to Realty to transfer 0.5 of the stablecoin to Realty as a listing fee.
- minfNFT -- to mint an NFT for the submitted property and thereby publically list the asset for viewing by everyone and puchasing
-- payForProperty -- to pay for a particular property and have it's NFT transferred to you.


Try run locally :
```shell
  git clone https://github.com/NestcoinHack/Realty.git
  npm run start
```
To test contract
```shell
npx hardhat node
npx hardhat compile
npx hardhat test

```
