import React from 'react'
import {Box, Button, Flex, Image, Heading, useToast} from '@chakra-ui/react'
import {ethers} from 'ethers'
import contractAddress from "../contracts/contract_address.json"
import abi from "../contracts/abi.json";
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import Input from './Input';
import { BsHouseDoor } from "react-icons/bs";
import { GiToken } from "react-icons/gi"
import SellImg from "../assets/svg/sell-house.svg"
import Logo from "../assets/svg/1.svg";


const Admin = () => {

    //validation schema for input fields
    const validationSchema = yup.object().shape({
        address: yup
          .string()
          .min(3, "Must be at least 3 characters")
          .required("Address of recipient is required"),
        amount: yup
          .number()
          .min(0, "Amount must be more than 0")
          .required("Amount is required"),
    });

    const toast = useToast()
   
    return (
        <Flex
            w={{ base: '100%', md: '90%', lg: '80%' }}
            mx="auto"
            mt={{ base: '80px', md: '100px' }}
            fontSize="14px"
            mb={{ base: 0, md: 10 }}
            boxShadow={{ base: 'none', md: '0px 1px 14px rgba(0, 0, 0, 0.1)' }}
            borderRadius="10px"
            direction={{ base: 'column', md: 'row' }}
        >
            <Box
                w={{ base: '100%', md: '50%' }}
                bg="#edf2f7"
                borderTopLeftRadius={{ base: '0px', md: '10px' }}
                borderBottomLeftRadius={{ base: '0px', md: '10px' }}
            >
                <Image w={{ base: '70%', md: '100%' }} h="100%" src={SellImg} />
            </Box>
            <Box
                w={{ base: '100%', md: '50%' }}
                bg="white"
                p={5}
                borderTopRightRadius={{ base: '0px', md: '10px' }}
                borderBottomRightRadius={{ base: '0px', md: '10px' }}
            >
                <Formik
                    initialValues={{
                        address:"",
                        amount:0,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={ async (values, { setSubmitting, resetForm }) => {  
                        console.log(values)
                        try {
                          const { ethereum } = window;
                          if (ethereum) {
                            const provider = new ethers.providers.Web3Provider(ethereum);
                            const signer = provider.getSigner();
                            const PropertyNftContract = new ethers.Contract(
                              contractAddress.contractAddress,
                              abi.abi,
                              signer
                            );
                            let send = await PropertyNftContract.transfer(values.address, values.amount * (10 ** 18));
                                
                            await send.wait();
                            toast({
                              title:"Great!",
                              description:"You've sent some tokens successfully",
                              status:"success",
                              duration:1500,
                              variant:"subtle",
                              isClosable:true,
                            })
                            
                          } else {
                            console.log("ethereum object does not exist!");
                          }
                        } catch (error) {
                          console.log(error);
                        }
                
                    }}
                >
                    {({ errors, isSubmitting, setFieldValue }) => (
                        <Form>
                            <Heading fontWeight="700" fontSize="25px" mb={5} color="blue.400" display="flex">
                                Send tokens to a <Image src={Logo} alt="logo" h="40px" w="auto" mx={2} mt="-2px"/> user
                            </Heading>
                            <Box textAlign="left">
                                <Input
                                  label="Recipient Address"
                                  name="address"
                                  id="address"
                                  type="text"
                                  placeholder="Enter address"
                                  children={<BsHouseDoor color="gray.300" />}
                                />

                                <Input
                                  label="Amount to send"
                                  name="amount"
                                  id="amount"
                                  type="number"
                                  placeholder="Enter amount"
                                  children={<GiToken color="gray.300" />}
                                />

                
                                <Button 
                                    bg="blue.400" 
                                    color="white"
                                    isLoading={isSubmitting}
                                    isDisabled={Object.keys(errors).length > 0  ? true : false}
                                    type="submit" 
                                    w="100%"
                                    mb={3} mt={5}
                                >
                                    {' '}
                                    Send tokens
                                </Button>

                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Flex>
    )
}

export default Admin