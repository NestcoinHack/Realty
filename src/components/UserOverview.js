import React,{ useState, useEffect } from 'react';
import { useNavigate }  from "react-router"
import {  MdHomeWork } from 'react-icons/md';
import { SiHomebridge } from 'react-icons/si';
import { Flex, Box, Heading, Text} from "@chakra-ui/react"
import { RiHomeHeartFill } from 'react-icons/ri';
import { FcHome, FcKey } from 'react-icons/fc';
import tokenAddress from "../contracts/token_address.json"
import tokenAbi from "../contracts/token_abi.json"
import {ethers} from 'ethers'

const   UserOverview = ({currentAccount}) => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0)
  const conv = (x) => {
    let y = x._hex;
    return parseInt(y.toString(), 16);
  };

  const getBalance = async() => {
    try {
          const { ethereum } = window;
          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const tokenContract = new ethers.Contract(
              tokenAddress.contractAddress,
              tokenAbi.abi,
              signer
            );
            let bal = await tokenContract.balanceOf(currentAccount)
            setBalance(conv(bal)/(10 ** 18))
                
          } else {
            console.log("ethereum object does not exist!");
          }
        } catch (error) {
          console.log(error);
        }
  }

  useEffect(()=> {
      getBalance()
  },[currentAccount])

    return (
      <>
        <Heading fontSize="25px" fontWeight="700" color="blue.400" mt={10}>TUSDT Balance: {balance} TUSDT</Heading>
        <Flex wrap="wrap" py={10} justifyContent="space-around">  

          <Box
                mb="10"
                w={{ base: "100%", md: "40%" }}
                bgColor="white"
                p="10"
                mr={{base:"0",md:"8"}}
                borderTopRightRadius="10%"
                borderBottomLeftRadius="10%"
                onClick={()=> navigate("/list-property")}
                textAlign="center"
                cursor="pointer"
              >
                <MdHomeWork style={{fontSize:"70px", color:"green", margin:"auto"}}/>
                <Box mt="5"  fontSize="20px">
                  List Property
                  <Text fontSize="14px" mt={3}>Go ahead to list your property and mint for it to be publically visible</Text>
                </Box>
             </Box>

             <Box
                mb="10"
                w={{ base: "100%", md: "40%" }}
                bgColor="white"
                p="10"
                mr={{base:"0",md:"8"}}
                borderTopRightRadius="10%"
                borderBottomLeftRadius="10%"
                onClick={()=> navigate("/properties/on-sale")}
                textAlign="center"
                border="1px solid green"
                cursor="pointer"
              >
                <RiHomeHeartFill style={{fontSize:"70px", color:"green", margin:"auto"}}/>
                <Box mt="5"  fontSize="20px">
                  See featured properties on sale
                  <Text fontSize="14px" mt={3}>View all listings that are currently on sale on Realty</Text>
                </Box>
             </Box>

             <Box
                mb="10"
                w={{ base: "100%", md: "40%" }}
                bgColor="white"
                p="10"
                mr={{base:"0",md:"8"}}
                borderTopRightRadius="10%"
                borderBottomLeftRadius="10%"
                onClick={()=> navigate("/properties/my-listings")}
                textAlign="center"
                cursor="pointer"
              >
                <SiHomebridge style={{fontSize:"70px", color:"green", margin:"auto"}}/>
                <Box mt="5" fontSize="20px">
                  See my listings
                  <Text fontSize="14px" mt={3}>View your property listings that are not yet sold</Text>  
                </Box>
             </Box>

             <Box
                mb="10"
                w={{ base: "100%", md: "40%" }}
                bgColor="white"
                p="10"
                mr={{base:"0",md:"8"}}
                borderTopRightRadius="10%"
                borderBottomLeftRadius="10%"
                onClick={()=> navigate("/properties")}
                textAlign="center"
                border="1px solid green"
                cursor="pointer"
              >
                <FcHome style={{fontSize:"70px", color:"green", margin:"auto"}}/>
                <Box mt="5" fontSize="20px">
                  See all listings on Realty
                </Box>
             </Box>


<Box
                mb="10"
                w={{ base: "100%", md: "40%" }}
                bgColor="white"
                p="10"
                mr={{base:"0",md:"8"}}
                borderTopRightRadius="10%"
                borderBottomLeftRadius="10%"
                onClick={()=> navigate("/vault")}
                textAlign="center"
                cursor="pointer"
              >
                <FcKey style={{fontSize:"70px", color:"green", margin:"auto"}}/>
                <Box mt="5"  fontSize="20px">
                 View savings vault
                 <Text fontSize="14px" mt={3}>View the properties that you are saving up for</Text> 
                </Box>
             </Box>
             
        </Flex> 
      </>
    );
};

export default  UserOverview;
