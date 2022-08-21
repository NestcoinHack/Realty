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
  Alert,
  AlertIcon,
  Flex,
  useDisclosure,
  useToast,
  Progress
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import contractAddress from "../contracts/realtyVault_address.json";
import abi from "../contracts/realtyVault_abi.json";
import tokenAddress from "../contracts/token_address.json"
import tokenAbi from "../contracts/token_abi.json"

const VaultCard = ({
  price,
  amountSaved,
  id,
  tokenSymbol,
  reload,
  setReload,
  properties
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [depositAmount, setDepositAmount] = useState(null);
  const [isDeposit, setIsDeposit] = useState(false)
  const [isWithdrawing, setIsWithdrawing] = useState(false)
  const [ removing, setRemoving ] = useState(false)
  const [ details, setDetails ] = useState({
    name: "",
    img: ""
  })

  const toast = useToast();

  const conv = (x) => {
		let y = x._hex
		return parseInt(y.toString(), 16) 
	}

  const getPropertyById = (_id) => {
    let prop = properties?.filter(x => conv(x?.id) === conv(_id));
    return prop[0];
  }

  useEffect(()=> {
    if(id){
      setDetails({
        name: getPropertyById(id)?.name,
        img: getPropertyById(id)?.url
      })
    }
  },[properties,id])

  const removeFromVault = async () => {
    setRemoving(true)
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const vaultContract = new ethers.Contract(
          contractAddress.contractAddress,
          abi,
          signer
        );

        let vaultTxn = await vaultContract.removeFromMyVault(id);
        await vaultTxn.wait();
        console.log("vault txn", vaultTxn);
        toast({
          title:"Successful!",
          description:"Property has been successfully removed from vault",
          status:"success",
          duration:3000,
          variant:"subtle",
          isClosable:true,
        })
        setRemoving(false)
        setReload(!reload)
      } else {
        console.log("ethereum object does not exist!");
        toast({
          title:"Opps!",
          description:"Please connect to metamask",
          status:"warning",
          duration:3000,
          variant:"subtle",
          isClosable:true,
        })
        setRemoving(false)
      }
    } catch (r) {
      console.log(r);
      let x = r.toString().split("}")[0].split("{")[1].replace(',"data":', "")
      x = JSON.parse(`{${x}}`)
      toast({
        title:"Error!",
        description:x.message,
        status:"error",
        duration:3000,
        variant:"subtle",
        isClosable:true,
      })
      setRemoving(false)
    }
  }

  const deposit = async (e) => { 
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const vaultContract = new ethers.Contract(
          contractAddress.contractAddress,
          abi,
          signer
        );

        let vaultTxn = await vaultContract.depositToProperty(
          id,
          ethers.utils.parseEther(depositAmount.toString())  
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
    } catch (r) {
      console.log(r);
      let x = r.toString().split("}")[0].split("{")[1].replace(',"data":', "")
      x = JSON.parse(`{${x}}`)
      toast({
        title:"Error!",
        description:x.message,
        status:"error",
        duration:3000,
        variant:"subtle",
        isClosable:true,
      })
      setIsDeposit(false)
      setDepositAmount(null);
      onClose()

    }
  };

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
          abi,
          signer
        );
        const trx =  await vaultContract.withdrawTokens( id );

        await trx.wait();
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
                  
      } else {
        console.log("ethereum object does not exist!");
        setIsWithdrawing(false)

      }
    } catch (r) {
      console.log(r);
      let x = r.toString().split("}")[0].split("{")[1].replace(',"data":', "")
      x = JSON.parse(`{${x}}`)
      toast({
        title:"Error!",
        description:x.message,
        status:"error",
        duration:3000,
        variant:"subtle",
        isClosable:true,
      })
      setIsWithdrawing(false)
    }
  };


  const approve = async (e) => {
    console.log()
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
        let approval = await TokenContract.approve(contractAddress.contractAddress, ethers.utils.parseEther(depositAmount.toString()) );      
        await approval.wait();
        toast({
          title:"Great!",
          description:"Process is approved. Please confirm to deposit amount",
          status:"info",
          duration:3000,
          variant:"subtle",
          isClosable:true,
        })
        await deposit()
         
      } else {
        console.log("ethereum object does not exist!");
        onClose()
        setDepositAmount(null)
        setIsDeposit(false)
      }
    } catch (r) {
      console.log(r);
      let x = r.toString().split("}")[0].split("{")[1].replace(',"data":', "")
      x = JSON.parse(`{${x}}`)
      onClose()
      toast({
        title:"Error!",
        description:x.message,
        status:"error",
        duration:3000,
        variant:"subtle",
        isClosable:true,
      })
      setDepositAmount(null)
      setIsDeposit(false)
    }
};


  return (
    <Box mb={3}>
      <Box key={id} border='1px solid #eee' mb='10' borderRadius='lg'>
        <Image 
          src={details.img} 
          w="100%" 
          // h="auto" 
          h="200px"
          objectFit="cover"
        />
        <Box mx='5' >
        <Text
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
          color="blue.400"
          my={5}
        >
          {details.name}
        </Text>
        <Progress hasStripe colorScheme="green" value={(amountSaved/price) * 100}/>
        <Alert status="info" fontSize="12px" mb={2}>
            <AlertIcon />
            <Text color="gray" fontWeight={700}>
              You have deposited{" "}
              <Text as="span" color="blue.400">
                {" "}
                {amountSaved / (10 ** 18)}
              </Text>{" "}
              out of {price / (10 ** 18)} {tokenSymbol}
            </Text>
        </Alert>
        <Flex
          direction={{ base: "row", md: "column" }}
          justifyContent={{ base: "space-between", md: "center" }}
          my={2}
        >

          <Button
            variant="outline"
            bg="blue"
            color="#fff"
            size={{ base: "sm", md: "md" }}
            w={{ base: "auto", md: "100%" }}
            onClick={onOpen}
            mb={2}
            isLoading={isDeposit}
            disabled={amountSaved === price ? true :false}
          >
            Deposit
          </Button>
          {amountSaved === 0 ? <Button
            variant="outline"
            colorScheme="blue"
            size={{ base: "sm", md: "md" }}
            w={{ base: "auto", md: "100%" }}
            onClick={removeFromVault}
            mb={2}
            isLoading={removing}
          >
            Remove from vault
          </Button> : <Button
            variant="outline"
            colorScheme="blue"
            size={{ base: "sm", md: "md" }}
            w={{ base: "auto", md: "100%" }}
            onClick={withdraw}
            isLoading={isWithdrawing}
            mb={2}
          >
            Withdraw
          </Button>}

        </Flex>
        
        {/* <Button colorScheme='blue' mb='4' onClick={withdraw}>withdraw</Button> */}
        {/* <Text my='5'> {description}</Text> */}
        {/* {price === amountSaved ? withdrawCompleted === '' ? isWithdrawing === false ?<Button colorScheme='blue' mb='4' onClick={withdraw}>withdraw</Button> : <Button mb='4' colorScheme='blue' isLoading
    loadingText='Withdrawing' onClick={withdraw}>withdraw</Button> :<Text mb='4' color='green'>{withdrawCompleted}</Text>   : isDeposit === false ?  <Button mb='4' onClick={onOpen}  colorScheme="blue">
          Deposit
        </Button> : <Button mb='4' onClick={onOpen} isLoading
    loadingText='Depositing'  colorScheme="blue">
          Deposit
        </Button>} */}
        

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
                 <Button 
                  type="submit" 
                  colorScheme="blue" 
                  mr={3}
                  isLoading={isDeposit}
                  loadingText='Submitting'
                >
                 Approve and deposit
               </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
        </Box>
       
      </Box>
    </Box>
  );
};

export default VaultCard;
