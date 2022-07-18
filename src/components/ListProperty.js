import React, {useState} from 'react'
import {Box, Button, Flex, Image, Heading, Text} from '@chakra-ui/react'
import {ethers} from 'ethers'
import abi from "../utils/ListProperty.json";
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import Input, { Select, TextArea } from './Input';
import { BsHouseDoor } from "react-icons/bs";
import { GoLocation } from "react-icons/go"
import { GiToken } from "react-icons/gi"
import SellImg from "../assets/svg/sell-house.svg"
import { ImageUpload } from "react-ipfs-uploader"



const ListProperty = () => {
//     const [name, setName] = useState('')
//     const [amount, setAmount] = useState('')
//     const [location, setLocation] = useState('')
//     const [symbol, setSymbol] = useState('')

//     const contractAddress = '0x72D46b82d5cF4c6E0EE74f53371757A59f610C28'
//     const contractABI = abi.abi;

//     const listProperty = async () => {
//         try {
//           const { ethereum } = window;
//           if (ethereum) {
//             const provider = new ethers.providers.Web3Provider(ethereum);
//             const signer = provider.getSigner();
//             const PropertyNftContract = new ethers.Contract(
//               contractAddress,
//               contractABI,
//               signer
//             );
//             let listProperty = await PropertyNftContract.listProperty(name, amount, location, symbol);
                
//             await listProperty.wait()
//                 console.log('property listed')
//           } else {
//             console.log("ethereum object does not exist!");
//           }
//         } catch (error) {
//           console.log(error);
//         }
//       };
// const handleSubmit = (e) => {
//     e.preventDefault();
//     listProperty()
// }
    //validation schema for input fields
    const validationSchema = yup.object().shape({
        name: yup
          .string()
          .min(3, "Must be at least 3 characters")
          .required("Property name is required"),
        description: yup
          .string()
          .min(3, "Must be at least 3 characters")
          .max(500, "Must be at less than 500 characters")
          .required("Description is required"),
        location: yup
          .string()
          .min(3, "Must be at least 3 characters")
          .required("Location is required"),
        amount: yup
          .number()
          .min(0, "Price must be more than 0")
          .required("Price is required"),
        symbol: yup
          .string()
          .min(3, "Must be at least 3 characters")
          .required("Token type is required"),
    });

    const [imageUrl, setImageUrl] = useState("")

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
                {!imageUrl ? <>
                    <Text mb={2} fontWeight="700">Upload property picture</Text>
                    <ImageUpload setUrl={setImageUrl}/>
                </> :

                <Formik
                    initialValues={{
                        name:'',
                        description:'',
                        location:'',
                        amount:0,
                        token:'',
                        imageUrl: imageUrl
                    }}
                    validationSchema={validationSchema}
                    onSubmit={ (values, { setSubmitting, resetForm }) => {  
                        console.log(values)
                    }}
                >
                    {({ errors, isSubmitting, setFieldValue }) => (
                        <Form>
                            <Heading fontWeight="700" fontSize="25px" mb={5} color="blue.400">
                                Become a Realty Agent
                            </Heading>
                            <Box textAlign="left">
                                <Input
                                  label="Property name"
                                  name="name"
                                  id="name"
                                  type="text"
                                  placeholder="Property name"
                                  children={<BsHouseDoor color="gray.300" />}
                                />

                                <TextArea
                                  label="Description"
                                  name="description"
                                  id="description"
                                  type="text"
                                  placeholder="Description"
                                />

                                <Input
                                  label="Location"
                                  name="location"
                                  id="location"
                                  type="text"
                                  placeholder="Location"
                                  children={<GoLocation color="gray.300" />}
                                />

                                <Input
                                  label="Price"
                                  name="amount"
                                  id="amount"
                                  type="number"
                                  placeholder="Price"
                                  children={<GiToken color="gray.300" />}
                                />

                                <Select label="Token type" name="symbol" id="symbol">
                                    <option value="">Select Token type</option>
                                    <option value="TUSDT">TUSDT</option>
                                    <option value="USDT" disabled>USDT</option>
                                    <option value="DAI" disabled>DAI</option>
                                 </Select>
                                
                                <Button 
                                    bg="blue.400" 
                                    color="white"
                                    isLoading={isSubmitting}
                                    isDisabled={Object.keys(errors).length > 0 || imageUrl === "" ? true : false}
                                    type="submit"
                                    w="100%" 
                                    mb={3}
                                    mt={5}
                                >
                                    {' '}
                                    List Property
                                </Button>

                            </Box>
                        </Form>
                    )}
                </Formik>
                }
            </Box>
        </Flex>
    )
}

export default ListProperty