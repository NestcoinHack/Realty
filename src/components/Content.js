import React from "react";
import { Box, Flex, Text, Image, Center, Link, Button } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

import addressMark from "../assets/address mark.png";
import secureData from "../assets/secure data.png";
import smartHouse from "../assets/Smart house.png";
import estate from "../assets/estate-1.jpg";
import propertyOne from "../assets/property-1.jpg";
import propertyTwo from "../assets/property-2.jpg";

const Content = () => {
  return (
    <Box mt="20">
      <Box textAlign="center">
        <Text
          fontSize={{ base: "25px", md: "38px", lg: "42px" }}
          color="blue.400"
          fontWeight="bold"
        >
          How it works.
        </Text>
        <Text mt="4">This is how our product works</Text>
      </Box>
      <Flex
        alignItems="center"
        mt="10"
        justifyContent="space-between"
        flexDirection={{ base: "column", lg: "row" }}
      >
        <Box
          _hover={{ boxShadow: "xl" }}
          cursor="pointer"
          rounded="md"
          textAlign="center"
          bgColor="white"
          px="8"
          py="16"
          mr={{ base: "0", lg: "8" }}
          mb="10"
        >
          <Center>
            <Image src={addressMark} alt="address mark" />
          </Center>
          <Text fontSize="20px" mt="14" mb="5" fontWeight="bold">
            Find Home
          </Text>
          <Text>
            Check out our featured properties at various locations all listed on the blockcahin{" "}
          </Text>
        </Box>
        <Box
          _hover={{ boxShadow: "xl" }}
          cursor="pointer"
          rounded="md"
          textAlign="center"
          bgColor="white"
          px="8"
          py="16"
          mr={{ base: "0", lg: "8" }}
          mb="10"
        >
          <Center>
            <Image src={smartHouse} alt="smart house" />
          </Center>
          <Text fontSize="20px" mt="10" mb="5" fontWeight="bold">
            Make payments{" "}
          </Text>
          <Text>
            Our estates comes with good network,portable water , 24hrs light and
            round the clock security.{" "}
          </Text>
        </Box>
        <Box
          _hover={{ boxShadow: "xl" }}
          cursor="pointer"
          rounded="md"
          textAlign="center"
          bgColor="white"
          px="8"
          py="16"
          mb="10"
        >
          <Center>
            <Image src={secureData} alt="secure data" />
          </Center>
          <Text fontSize="20px" mt="10" mb="5" fontWeight="bold">
            Make it Official{" "}
          </Text>
          <Text>
            We have been in business for a couple of weeks, have a minted NFT
            anytime you purchase a house from us!{" "}
          </Text>
        </Box>
      </Flex>

      <Flex
        mt="20"
        alignItems="center"
        flexDirection={{ base: "column", lg: "row" }}
        pb="20"
      >
        <Box w={{ base: "100%", lg: "50%" }} mr={{ base: "0", lg: "16" }}>
          <Image
            src={estate}
            alt="estate"
            borderTopRightRadius="30%"
            borderBottomLeftRadius="30%"
          />
        </Box>

        <Box w={{ base: "100%", lg: "50%" }} mt={{ base: "10", lg: "0" }}>
          <Text
            fontSize={{ base: "25px", md: "38px", lg: "42px" }}
            mb="3"
            color="blue.400"
            fontWeight="bold"
          >
            Why you should choose us
          </Text>
          <Text mb="5">
            Creating quality urban lifestyles, building stronger communities on the blockchain
          </Text>
          <Flex
            mt="5"
            justifyContent="space-between"
            flexDirection={{ base: "column", lg: "row" }}
            w={{ base: "100%", lg: "70%" }}
          >
            <Box>
              <Text mb="5">
                <CheckCircleIcon color="blue.400" /> World class
              </Text>
              <Text mb="5">
                <CheckCircleIcon color="blue.400" /> Trusted
              </Text>
            </Box>

            <Box>
              <Text mb="5">
                <CheckCircleIcon color="blue.400" /> Affordable
              </Text>
              <Text mb="5">
                <CheckCircleIcon color="blue.400" /> Amenities
              </Text>
            </Box>
          </Flex>
        </Box>
      </Flex>

      <Box>
        <Box textAlign="center" pb="10">
          <Text
            fontSize={{ base: "25px", md: "38px", lg: "42px" }}
            color="blue.400"
            fontWeight="bold"
          >
            Our featured properties
          </Text>
          <Text mt="4">
            One of our biggest product to be featured and that has sold out the
            most.
          </Text>
          <Box textAlign="right">
            <Link href="/properties" _hover={{ textDecoration: "none" }}>
              <Button colorScheme="blue" mt="6">
                View more
              </Button>
            </Link>
          </Box>
          <Box mt="10">
            <Flex flexDirection={{ base: "column", lg: "row" }}>
              <Box
                mb="10"
                w={{ base: "100%", lg: "50%" }}
                bgColor="white"
                p="10"
                mr="8"
                borderTopRightRadius="10%"
                borderBottomLeftRadius="10%"
              >
                <Image
                  src={propertyOne}
                  alt="featured property 1"
                  borderTopRightRadius="30%"
                  borderBottomLeftRadius="30%"
                />
                <Flex mt="5" justifyContent="space-between">
                  <Box>
                    <Text fontSize="20px" fontWeight="bold" mb="5">
                      The Palace
                    </Text>

                    <Text>Lekki, Phase II</Text>
                  </Box>
                  <Box>
                    <Text mb="5">Duplex</Text>
                    <Text color="blue.400" fontWeight="bold">
                      2,000 TUSDT
                    </Text>
                  </Box>
                </Flex>
              </Box>
              <Box
                mb="10"
                w={{ base: "100%", lg: "50%" }}
                bgColor="white"
                p="10"
                mr="8"
                borderTopRightRadius="10%"
                borderBottomLeftRadius="10%"
              >
                <Image
                  src={propertyTwo}
                  alt="featured property "
                  borderTopRightRadius="30%"
                  borderBottomLeftRadius="30%"
                />
                <Flex mt="5" justifyContent="space-between">
                  <Box>
                    <Text fontSize="20px" fontWeight="bold" mb="5">
                      IVY RORY
                    </Text>

                    <Text>Lekki, Phase II</Text>
                  </Box>
                  <Box>
                    <Text mb="5">Duplex</Text>
                    <Text color="blue.400" fontWeight="bold">
                      2,000 TUSDT
                    </Text>
                  </Box>
                </Flex>
              </Box>

              <Box
                mb="10"
                w={{ base: "100%", lg: "50%" }}
                bgColor="white"
                p="10"
                mr="8"
                borderTopRightRadius="10%"
                borderBottomLeftRadius="10%"
              >
                <Image
                  src={propertyOne}
                  alt="featured property 1"
                  borderTopRightRadius="30%"
                  borderBottomLeftRadius="30%"
                />
                <Flex mt="5" justifyContent="space-between">
                  <Box>
                    <Text fontSize="20px" fontWeight="bold" mb="5">
                      REXONA
                    </Text>

                    <Text>Lekki, Phase II</Text>
                  </Box>
                  <Box>
                    <Text mb="5">Duplex</Text>
                    <Text color="blue.400" fontWeight="bold">
                      2,000 TUSDT
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Content;
