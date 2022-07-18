import React, {useState} from 'react'
import {Box, Input, Text, Button, Center} from '@chakra-ui/react'
import {ethers} from 'ethers'
import abi from "../utils/ListProperty.json";


const ListProperty = () => {
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [location, setLocation] = useState('')
    const [symbol, setSymbol] = useState('')

    const contractAddress = '0x72D46b82d5cF4c6E0EE74f53371757A59f610C28'
    const contractABI = abi.abi;

    const listProperty = async () => {
        try {
          const { ethereum } = window;
          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const PropertyNftContract = new ethers.Contract(
              contractAddress,
              contractABI,
              signer
            );
            let listProperty = await PropertyNftContract.listProperty(name, amount, location, symbol);
                
            await listProperty.wait()
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
    listProperty()
}

    return(
        <Box minH='100vh'>
            <Text
            fontSize={{ base: "25px", md: "38px", lg: "42px" }}
            color="blue.400"
            fontWeight="bold"
            mt='10'
          >
            List your property
          </Text>
          <Box px='20'>
          <form onSubmit={handleSubmit}>
            <Input type='text' placeholder='Name' mt='10' value={name} onChange={e=> setName(e.target.value)} required/>
            <Input type='number' placeholder='Amount' mt='10' value={amount} onChange={e=> setAmount(e.target.value)} required/>
            <Input type='text' placeholder='Location' mt='10' value={location} onChange={e=> setLocation(e.target.value)} required/>
            <Input type='text' placeholder='Symbol' mt='10' value={symbol} onChange={e=> setSymbol(e.target.value)} required/>
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

export default ListProperty