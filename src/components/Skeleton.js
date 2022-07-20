import React from 'react';
import { Skeleton, SkeletonText, Box } from "@chakra-ui/react";

const 	SkeletonCard = () => {
    return (
    	<Box w={{ base: "100%", md: "40%", lg: "30%" }} borderWidth='1px' borderRadius='lg' overflow='hidden' mb={3}>
        	<Skeleton width="100%" height="200px" />
		      <Box p={6}>
		        <SkeletonText mt="4" noOfLines={1} spacing="4" w="100px" />
		        <SkeletonText mt="4" noOfLines={1} spacing="4" w="150px"/>
		        <SkeletonText mt="4" noOfLines={2} spacing="4" mb={3}/>
		       </Box>
		 </Box>
    )
};

export default 	SkeletonCard;
