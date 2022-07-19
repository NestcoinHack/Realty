import React, {useState} from 'react'
import {Box, Input, Text, Button, Center} from '@chakra-ui/react'
import {ethers} from 'ethers'
import contractAddr from '../contracts/contract_address.json'
import abi from '../contracts/abi.json'

const SetPaymentToken = () => {
    const [symbol, setSymbol] = useState('')
    const [tokenAddress, setTokenAddress] = useState('')

    const contractABI = abi.abi;

    const setPaymentToken = async () => {
        try {
          const { ethereum } = window;
          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const PropertyNftContract = new ethers.Contract(
              contractAddr.contractAddress,
              contractABI,
              signer
            );
            let paymentToken = await PropertyNftContract.setPaymentToken(symbol, tokenAddress);
                
            await paymentToken.wait()
            console.log('property listed')
          } else {
            console.log("ethereum object does not exist!");
          }
        } catch (error) {
          console.log(error);
        }
    };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        setPaymentToken()
    }

    return(
        <Box minH='100vh'>
            <Text
            fontSize={{ base: "25px", md: "38px", lg: "42px" }}
            color="blue.400"
            fontWeight="bold"
            mt='10'
        >
            Set your desired payment token
            </Text>
            <Box px='20'>
                <form onSubmit={handleSubmit}>
                    <Input type='text' placeholder='Symbol' mt='10' value={symbol} onChange={e=> setSymbol(e.target.value)} required/>
                    <Input type='text' placeholder='Token Address' mt='10' value={tokenAddress} onChange={e=> setTokenAddress(e.target.value)} required/>
                    <Center>
                        <Button colorScheme="blue" mt="10" type='submit'>
                            Submit
                        </Button>
                    </Center>
                </form>
            </Box>
        </Box>
    )
}
export default SetPaymentToken