import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
  Text,
  Button,
  Flex
} from '@chakra-ui/react'
import Logo from "../assets/svg/1.svg";

export default function ApproveModal({isOpen, approve, onClose, loading}) {

  return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
          <Flex>Approve <Image src={Logo} alt="logo" h="40px" w="auto" mx={2} mt="-5px"/> contract ? </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>You need to approve our contract to spend on your behalf</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose}>
              No, Cancel
            </Button>
            <Button variant='outline' colorScheme='blue.400' onClick={approve} isLoading={loading}>Approve</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}