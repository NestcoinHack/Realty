import React from 'react';
import { Box, Badge, Image, Text, Flex, Button} from "@chakra-ui/react";

const PropertyCard = ({src, location,propertyName,description, price})=> {

  return (
    <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Image src={src} alt="property-img" h="200px" w="100%" objectFit="cover"/>

      <Box p='6'>

        <Box display='flex' alignItems='baseline' mb={3}>
          <Badge borderRadius='full' px='2' colorScheme='teal' >
            New
          </Badge>
          <Box
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'
          >
            property at {location}
          </Box>
        </Box>

        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          noOfLines={1}
          color="blue.400"
          mb={2}
        >
          {propertyName}
        </Box>

        <Box mb={2}>
          {price} TUSDT
        </Box>

        <Box mb={2}>
        	<Text>
        		{description}
        	</Text>
        </Box>
        <Flex justify="space-between">	
        	<Button variant="outline" size="sm" colorScheme="blue.400">Purchase</Button>
        	<Button variant="outline" size="sm" colorScheme="green">Save to buy</Button>	
        </Flex>	
      </Box>
    </Box>
  )
}

export default PropertyCard
