import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  Flex
} from '@chakra-ui/react'

export default function MintModal({isOpen, mint, onClose, loading}) {

  return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
          <Flex>Mint your property as an NFT</Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>You must mint your property for it to be publically visible</Text>
          </ModalBody>

          <ModalFooter>
            <Button bg='blue.400' onClick={mint} isLoading={loading}>Mint</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}