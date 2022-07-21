import { Box, Text,  Grid } from '@chakra-ui/react'
import React, {useEffect, useState} from 'react'
import {ethers} from 'ethers'
import contractAddress from "../contracts/vault_address.json"
import abi from "../contracts/vault_abi.json";
import VaultCard from './VaultCard';


const Save = () => {
  let propertyImage =   window.localStorage.getItem('image')
  let propertyName =   window.localStorage.getItem('property name')
  let id =   window.localStorage.getItem('id')
  let price =   window.localStorage.getItem('price')
  let description =   window.localStorage.getItem('description')

  const [depositAmount, setDepositAmount] = useState(null)
  const [vaultSavings, setVaultSavings] = useState([])
  const [reload, setReload] = useState(false)
  const [tokenAdd, setTokenAdd] = useState('')
  const [tokenId, setTokenId]= useState(null)


  const allSavings = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const vaultContract = new ethers.Contract(
          contractAddress.contractAddress,
          abi.abi,
          signer
        );
          let vaultTxn = await vaultContract.allOwnerSavings()
          setVaultSavings(vaultTxn)
          console.log('vault txn', vaultTxn)
      } else {
        console.log("ethereum object does not exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const conv = (x) => {
		let y = x._hex
		return parseInt(y.toString(), 16) 
	}

useEffect(() => {
allSavings()
}, [reload])


    return(
        <Box>
           <Text
            fontSize={{ base: "25px", lg: "30px" }}
            color="blue.400"
            fontWeight="bold"
            my='10'
            textAlign='center'
          >
            Your savings vault!
           
          </Text>
          {vaultSavings.length === 0 ?<Text></Text>:
          <Grid templateColumns={{base:'repeat(1, 1fr)', md:'repeat(2,1fr)', lg:'repeat(3, 1fr)'}} gap={6}>
           { vaultSavings.map((item, index) => (
            <VaultCard 
            price={conv(item.propertyPrice)}
            amountSaved = {conv(item.amountSaved)}
            id = {index}
            propertyImage = {propertyImage}
            propertyName={propertyName}
            description = {description}
            reload={reload}
            setReload={setReload}
            
            />
            ))}

            </Grid>
            }

        </Box>
    )
}

export default Save