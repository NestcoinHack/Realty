import React from 'react';
import { Box, Flex, Link, Text } from "@chakra-ui/react";
import PropertyCard from "./PropertyCard"
import SkeletonCard from "./Skeleton"
import { TbHomeOff } from "react-icons/tb"

const Properties = ({currentAccount, properties, loading, reload, setReload}) => {
	const conv = (x) => {
		let y = x._hex
		return parseInt(y.toString(), 16) 
	}

    return (
       <Box minH="95vh">
       {loading ? <Flex w="95%" mx="auto" justify="space-around" py={10} direction={{base:"column", md:"row"}}>
       		<SkeletonCard/>
       		<SkeletonCard/>
       		<SkeletonCard/>
       	</Flex> :
       	<Flex flexWrap='wrap' w="95%" mx="auto" justify="space-around" py={10} direction={{base:"column", md:"row"}}>
			{properties && properties.length === 0 ? 
				<Box mx="auto" my="auto" textAlign="center" w="100%">
					<TbHomeOff style={{fontSize:"200px", color:"blue.400", margin:"auto"}}/>
					<Text fontSize="14px" mt={3} >Sorry, no listing found. <Link href="/list-property">List a property</Link></Text>
				</Box> : null
			}
       		{properties && properties.map( property => (
       			<PropertyCard
       				id={property.id}
       				key={conv(property.id)}
       				src={property.url}
       				location={property.location}
       				propertyName={property.name}
       				description={property.description}
       				price={property.amount}
       				address ={property.address}
       				currentAccount={currentAccount}
       				buyer={property.buyer}
					reload={reload}
					setReload={setReload}
       			/>
       		))}
       	</Flex>
       	}
       </Box> 
    );
};

export default Properties;
