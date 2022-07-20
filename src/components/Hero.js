import React from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";

import hero from "../assets/hero.jpg";
const Hero = () => {
  return (
    <Box mt="10">
      <Flex alignItems="center" flexDirection={{ base: "column", lg: "row" }}>
        <Box
          mr={{ base: "0", lg: "6" }}
          w={{ base: "100%", lg: "50%" }}
          order={{ base: "2", lg: "1" }}
          mt={{ base: "6", lg: "0" }}
          textAlign={{ base: "center", lg: "left" }}
        >
          <Text
            fontSize={{ base: "25px", md: "38px", lg: "42px" }}
            color="blue.400"
            fontWeight="bold"
          >
            Helping you find the property of your dreams on the blockchain.
          </Text>
          <Text mt="4">
            Creating quality urban lifestyles,building stronger communities
          </Text>
        </Box>

        <Box w={{ base: "100%", lg: "50%" }} order={{ base: "1", lg: "2" }}>
          <Image
            src={hero}
            alt="hero"
            borderTopRightRadius="30%"
            borderBottomLeftRadius="30%"
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default Hero;
