import type { NextPage } from "next";
import {
  Text,
  Button,
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";
import { FC } from "react";

interface INotiifyModal {
  isOpen: boolean;
  onClose: () => void;
}

const NotiifyModal: FC<INotiifyModal> = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Successfully sent</ModalHeader>
          <ModalBody>
            <Text>
              Your <b>EUR</b> has been sent!
            </Text>
            <Text>Thank you for using our service</Text>
            <Button
              w="full"
              bg="#2F80ED!important"
              color="white"
              mt="24px"
              onClick={onClose}
            >
              OK
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NotiifyModal;
