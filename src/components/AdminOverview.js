import React from 'react';
import { useNavigate }  from "react-router"
import { MdGeneratingTokens, MdOutlineSendToMobile } from 'react-icons/md';
import { SiJsonwebtokens } from 'react-icons/si';
import { Flex, Box, Text} from "@chakra-ui/react"

const 	AdminOverview = () => {
	const navigate = useNavigate()

    return (
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
    );
};

export default 	AdminOverview;
