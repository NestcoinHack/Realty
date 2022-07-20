import {
  Box,
  Text,
  Image,
  Flex,
  Input,
  Button,
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ethers } from "ethers";
import contractAddress from "../contracts/vault_address.json";

import abi from "../contracts/vault_abi.json";
const VaultCard = ({
  price,
  amountSaved,
  id,
  propertyImage,
  propertyName,
  description,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [depositAmount, setDepositAmount] = useState(null);

  const deposit = async (e) => {
    e.preventDefault();
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
        setDepositAmount("");
      } else {
        console.log("ethereum object does not exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log("id", id);

  return (
    <Box>
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
        <Button onClick={onOpen} mb="20" colorScheme="blue">
          Deposit
        </Button>

        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Deposit </ModalHeader>
            <ModalCloseButton />
            <form onSubmit={deposit}>
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
                <Button type="submit" colorScheme="blue" mr={3}>
                  Submit
                </Button>
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
