import React,{ useState, useEffect} from 'react';
import { useNavigate }  from "react-router"
import { MdGeneratingTokens, MdOutlineSendToMobile } from 'react-icons/md';
import { SiJsonwebtokens } from 'react-icons/si';
import { Flex, Box, Heading} from "@chakra-ui/react"
import tokenAddress from "../contracts/token_address.json"
import tokenAbi from "../contracts/token_abi.json"
import {ethers} from 'ethers'

const 	AdminOverview = ({currentAccount}) => {
	const navigate = useNavigate()

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
        <Heading fontSize="25px" fontWeight="700" color="blue.400" mt={10}>TUSDT Balance: {balance} USDT</Heading>
        
        <Flex wrap="wrap" py={10} justifyContent="space-around">	

        	<Box
                mb="10"
                w={{ base: "100%", md: "40%" }}
                bgColor="white"
                p="10"
                mr={{base:"0",md:"8"}}
                borderTopRightRadius="10%"
                borderBottomLeftRadius="10%"
                onClick={()=> navigate("/admin/send-token")}
                textAlign="center"
              >
              	<MdOutlineSendToMobile style={{fontSize:"70px", color:"green", margin:"auto"}}/>
                <Box mt="5" justifyContent="space-between" fontSize="20px">
                  Send Tokens
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
                onClick={()=> navigate("/admin/set-payment-token")}
                textAlign="center"
                border="1px solid green"
              >
              	<SiJsonwebtokens style={{fontSize:"70px", color:"green", margin:"auto"}}/>
                <Box mt="5" justifyContent="space-between" fontSize="20px">
                  Set payment token
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
                onClick={()=> navigate("/admin/set-payment-token")}
                textAlign="center"
              >
              	<MdGeneratingTokens style={{fontSize:"70px", color:"green", margin:"auto"}}/>
                <Box mt="5" justifyContent="space-between" fontSize="20px">
                  Mint tokens
                </Box>
             </Box>
             
        </Flex>	
        </>
    );
};

export default 	AdminOverview;
