import {
  Box,
  Text,
  Image,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ethers } from "ethers";
import contractAddress from "../contracts/vault_address.json";

import abi from "../contracts/vault_abi.json";
import tokenAddress from "../contracts/token_address.json"
import tokenAbi from "../contracts/token_abi.json"
import { useNavigate } from "react-router-dom";


const VaultCard = ({
  price,
  amountSaved,
  id,
  propertyImage,
  propertyName,
  description,
  reload,
  setReload
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [depositAmount, setDepositAmount] = useState(null);
  const [isDeposit, setIsDeposit] = useState(false)
  const [isWithdrawing, setIsWithdrawing] = useState(false)
  const [withdrawCompleted, setWithdrawCompleted] = useState('')
  const toast = useToast()
  let navigate = useNavigate();

  const deposit = async (e) => { 
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

        let vaultTxn = await vaultContract.Deposit(
          id,
          depositAmount
          // { gasLimit: 300000, value: ethers.utils.parseEther(depositAmount) }
        );
        await vaultTxn.wait();
        console.log("vault txn", vaultTxn);
        toast({
          title:"Successful!",
          description:"Amount successfully added to savings vault",
          status:"success",
          duration:3000,
          variant:"subtle",
          isClosable:true,
        })
        setReload(!reload)
        setDepositAmount(null);
        onClose()
        setIsDeposit(false)
      } else {
        console.log("ethereum object does not exist!");
        setIsDeposit(false)
        setDepositAmount(null);
        onClose()

      }
    } catch (error) {
      console.log(error);
      setIsDeposit(false)
      setDepositAmount(null);
      onClose()

    }
  };

  console.log("id", id);

  const withdraw = async (e) => {
    e.preventDefault();
    setIsWithdrawing(true)
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
        let vaultTxn = await vaultContract.WithdrawSavings( id );
        toast({
          title:"Successful!",
          description:"Amount successfully withdrawn from savings vault",
          status:"success",
          duration:3000,
          variant:"subtle",
          isClosable:true,
        })
        setReload(!reload)
        setIsWithdrawing(false)
        setWithdrawCompleted('Withdrawal successful')
        navigate('/properties')
                  
      } else {
        console.log("ethereum object does not exist!");
        setIsWithdrawing(false)

      }
    } catch (error) {
      console.log(error);
      setIsWithdrawing(false)

    }
  };


  const approve = async (e) => {
    e.preventDefault();
    setIsDeposit(true)
    console.log("here")
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TokenContract = new ethers.Contract(
          tokenAddress.contractAddress,
          tokenAbi.abi,
          signer
        );
        let approval = await TokenContract.approve(contractAddress.contractAddress, depositAmount );
            
        await approval.wait();
        toast({
          title:"Great!",
          description:"Process is approved. Please confirm to deposit amount",
          status:"info",
          duration:3000,
          variant:"subtle",
          isClosable:true,
        })
        deposit()
         
      } else {
        console.log("ethereum object does not exist!");
        onClose()
        setDepositAmount(null)
        setIsDeposit(false)
      }
    } catch (error) {
      console.log(error);
      onClose()
      setDepositAmount(null)
      setIsDeposit(false)
    }
};
  return (
    <Box mb={3}>
      <Box key={id}>
        <Image src={propertyImage} />
        <Text
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
          color="blue.400"
          my={2}
        >
          {propertyName}
        </Text>
        <Text color="gray">
          You have deposited{" "}
          <Text as="span" color="blue.400">
            {" "}
            {amountSaved}
          </Text>{" "}
          out of {price} TUSDT
        </Text>
        <Text> {description}</Text>
        {/* <Button colorScheme='blue' onClick={withdraw}>withdraw</Button> */}
        {price === amountSaved ? 
        withdrawCompleted === '' ? 
        isWithdrawing === false ?
        <Button colorScheme='blue' onClick={withdraw}>withdraw</Button> : 
        <Button colorScheme='blue' isLoading loadingText='Withdrawing' onClick={withdraw}>withdraw</Button> :
        <Text color='green'>Withdrawal Completed</Text>   
        : 
        isDeposit === false ?  
        <Button onClick={onOpen} mb="20" colorScheme="blue">
          Deposit
        </Button> : <Button onClick={onOpen} isLoading
    loadingText='Depositing' mb="20" colorScheme="blue">
          Deposit
        </Button>}
        

        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Deposit </ModalHeader>
            <ModalCloseButton />
            <form onSubmit={approve}>
              <ModalBody pb={6}>
                <Input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="Enter amount to deposit"
                  required
                  mt="6"
                  mb="4"
                />
              </ModalBody>

              <ModalFooter>
                {isDeposit === false ?
                 <Button type="submit" colorScheme="blue" mr={3}>
                 Approve and deposit
               </Button>:
                <Button type="submit" isLoading
                loadingText='Submitting'  colorScheme="blue" mr={3}>
                Submit
              </Button>
              }
               
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default VaultCard;
