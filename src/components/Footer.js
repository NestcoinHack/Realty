import { Center, Text } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <Center bg="blue.400" py="4" color="white" fontWeight="bold">
      Made with{" "}
      <Text as="span" px="1" color="purple.500">
        {" "}
        love{" "}
      </Text>{" "}
      from us
    </Center>
  );
};

export default Footer;
