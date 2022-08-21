import React, { useState } from "react";
import {
  Box,
  Badge,
  Image,
  Text,
  Flex,
  Button,
  useDisclosure,
  useToast,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import contractAddress from "../contracts/contract_address.json";
import tokenAddress from "../contracts/token_address.json";
import abi from "../contracts/abi.json";
import tokenAbi from "../contracts/token_abi.json";
import { ethers } from "ethers";
import ApproveModal from "./ApproveModal";
import { useNavigate } from "react-router-dom";
import vaultContractAddress from "../contracts/realtyVault_address.json";
import vaultAbi from "../contracts/realtyVault_abi.json";

const PropertyCard = ({
  src,
  location,
  propertyName,
  description,
  price,
  id,
  address,
  currentAccount,
  buyer,
  reload, 
  setReload,
  inVault
}) => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [purchase, setPurchase] = useState(false);
  const [ processing, setProcessing ] = useState(false);
  const toast = useToast();

  const conv = (x) => {
    let y = x._hex;
    return parseInt(y.toString(), 16);
  };

  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  const approve = async () => {
    setLoading(true);
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
        let approval = await TokenContract.approve(
          contractAddress.contractAddress,
          price
        );

        await approval.wait();
        toast({
          title: "Great!",
          description: "You can now purchase this property",
          status: "success",
          duration: 1500,
          variant: "subtle",
          isClosable: true,
        });
        setLoading(false);
        onCloseModal();
        purchaseProperty();
      } else {
        console.log("ethereum object does not exist!");
        setLoading(false);
        onCloseModal();
        toast({
          title: "Oppps!",
          description: "You need to connect your metamask wallet",
          status: "info",
          duration: 3000,
          variant: "subtle",
          isClosable: true,
        });
      }
    } catch (r) {
      console.log(r);
      let x = r.toString().split("}")[0].split("{")[1].replace(',"data":', "")
      x = JSON.parse(`{${x}}`)
      setLoading(false);
      onCloseModal();
      toast({
        title: "Oppps!",
        description: x.message,
        status: "error",
        duration: 3000,
        variant: "subtle",
        isClosable: true,
      });
    }
  };

  const purchaseProperty = async () => {
    setPurchase(true);
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
        let payment = await PropertyNftContract.payForProperty(id, "TUSDT");
        await payment.wait();
        toast({
          title: "Great!",
          description: "You have bought this property",
          status: "success",
          duration: 1500,
          variant: "subtle",
          isClosable: true,
        });
        setReload(!reload)
        setPurchase(false);
      } else {
        console.log("ethereum object does not exist!");
        setPurchase(false);
        toast({
          title: "Oppps!",
          description: "You need to connect your metamask wallet",
          status: "info",
          duration: 3000,
          variant: "subtle",
          isClosable: true,
        });
      }
    } catch (r) {
      console.log(r);
      setPurchase(false);
      let x = r.toString().split("}")[0].split("{")[1].replace(',"data":', "")
      x = JSON.parse(`{${x}}`)
      toast({
        title: "Oppps!",
        description: x.message,
        status: "error",
        duration: 3000,
        variant: "subtle",
        isClosable: true,
      });
    }
  };

  const handleSave = async () => {
    setProcessing(true);
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const vaultContract = new ethers.Contract(
          vaultContractAddress.contractAddress,
          vaultAbi,
          signer
        );

        let vaultTxn = await vaultContract.addToMyVault(
          id,
          price,
          "TUSDT",
          tokenAddress.contractAddress
        );
        await vaultTxn.wait();
        setProcessing(false);
        toast({
          title: "Great!",
          description: "You have added this property to your vault",
          status: "success",
          duration: 1500,
          variant: "subtle",
          isClosable: true,
        });
        setReload(!reload);
        
      } else {
        console.log("ethereum object does not exist!");
        setProcessing(false);
        toast({
          title: "Oppps!",
          description: "You need to connect your metamask wallet",
          status: "info",
          duration: 3000,
          variant: "subtle",
          isClosable: true,
        });
      }
    } catch (r) {
      console.log(r);
      setProcessing(false);
      let x = r.toString().split("}")[0].split("{")[1].replace(',"data":', "")
      x = JSON.parse(`{${x}}`)
      toast({
        title: "Oppps!",
        description: x.message,
        status: "error",
        duration: 3000,
        variant: "subtle",
        isClosable: true,
      });
    }
    
  };


  return (
    <Box
      w={{ base: "100%", md: "40%", lg: "30%" }}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      id={id}
      mb={3}
    >
      <Image
        src={src}
        alt="property-img"
        h="200px"
        w="100%"
        objectFit="cover"
      />
      <Box p="6">
        <Box display="flex" alignItems="baseline" mb={3}>
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            property at {location}
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
          color="blue.400"
          mb={2}
        >
          {propertyName}
        </Box>

        <Box mb={2}>{(conv(price)) / (10 ** 18)} TUSDT</Box>

        <Box mb={2}>
          <Text>{description}</Text>
        </Box>
        {address.toLowerCase() === currentAccount ? (
          <Alert status="info" fontSize="12px" mb={2}>
            <AlertIcon />
            Property listed by you
          </Alert>
        ) : null}
        {inVault ? (
          <Alert status="info" fontSize="12px" mb={2}>
            <AlertIcon />
            Property has been added to your vault
          </Alert>
        ) : null}
        {buyer.toLowerCase() === currentAccount ? (
          <Alert status="success" fontSize="12px" mb={2}>
            <AlertIcon />
            Property purchased by you
          </Alert>
        ) : null}
        {buyer !== "0x000000000000000000000000000000000000dEaD" &&
        buyer.toLowerCase() !== currentAccount ? (
          <Alert status="success" fontSize="12px" mb={2}>
            <AlertIcon />
            Property has been bought
          </Alert>
        ) : null}
        {inVault ? <Button
              variant="outline"
              colorScheme="blue"
              size="md" 
              w="100%"
              onClick={() => navigate("/vault")}
              my={2}
            >
              View in vault
            </Button> : null}
        {address.toLowerCase() !== currentAccount &&
        buyer.toLowerCase() !== currentAccount &&
        buyer === "0x000000000000000000000000000000000000dEaD" &&
        !inVault ? (
          <Flex
            direction={{ base: "row", md: "column" }}
            justifyContent={{ base: "space-between", md: "center" }}
          >
            <Button
              variant="outline"
              colorScheme="blue"
              size={{ base: "sm", md: "md" }}
              w={{ base: "auto", md: "100%" }}
              onClick={onOpenModal}
              isLoading={purchase}
              mb={2}
            >
              Purchase
            </Button>
            <Button
              variant="outline"
              onClick={handleSave}
              size={{ base: "sm", md: "md" }}
              w={{ base: "auto", md: "100%" }}
              colorScheme="green"
              mb={2}
              isLoading={processing}
            >
              Save to buy
            </Button>
          </Flex>
        ) : null}
      </Box>
      <ApproveModal
        isOpen={isOpenModal}
        onClose={onCloseModal}
        approve={approve}
        loading={loading}
      />
    </Box>
  );
};

export default PropertyCard;
