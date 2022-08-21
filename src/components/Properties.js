import React, { useEffect } from 'react';
import { Box, Flex, Link, Text } from "@chakra-ui/react";
import PropertyCard from "./PropertyCard"
import SkeletonCard from "./Skeleton"
import { TbHomeOff } from "react-icons/tb"

const Properties = ({currentAccount, properties, loading, reload, setReload, vault, processing}) => {
	const conv = (x) => {
		let y = x._hex
		return parseInt(y.toString(), 16) 
	}

	const vaultCheck = (id) => {
		let vaultProp = vault.filter(x => conv(x.propertyId) === conv(id));
		return vaultProp.length === 0 ?  false  : true ;
	}

	useEffect(()=> {
		console.log(vault)
	},[vault])

    return (
       <Box>
       {loading || processing ? <Flex w="95%" mx="auto" justify="space-around" py={10} direction={{base:"column", md:"row"}}>
       		<SkeletonCard/>
       		<SkeletonCard/>
       		<SkeletonCard/>
       	</Flex> :
       	<Flex flexWrap='wrap' w="95%" mx="auto" justify="space-around" py={10} direction={{base:"column", md:"row"}}>
			{properties && properties.length === 0 ? 
				<Box mx="auto" my="auto" textAlign="center" w="100%">
					<TbHomeOff style={{fontSize:"200px", fill:"blue.400", strokeWidth:1, margin:"auto"}}/>
					<Text fontSize="14px" mt={3} >Sorry, no listing found. <Link href="/#/list-property">List a property</Link></Text>
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
					inVault = {vaultCheck(property.id)}
       			/>
       		))}
       	</Flex>
       	}
       </Box> 
    );
};

export default Properties;
