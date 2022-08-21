import { Box, Text,  Grid, Flex, Link } from '@chakra-ui/react'
import React from 'react'
import { TbKeyOff } from 'react-icons/tb';
import VaultCard from './VaultCard';
import SkeletonCard from './Skeleton';

const Save = ({vault, processing, properties, reload, setReload}) => {

  const conv = (x) => {
		let y = x._hex
		return parseInt(y.toString(), 16) 
	}

    return(
        <Box>
          {console.log(vault)}
          {/* {console.log(conv(vault[0]?.amountSaved))} */}
           <Text
            fontSize={{ base: "25px", lg: "30px" }}
            color="blue.400"
            fontWeight="bold"
            my='10'
            textAlign='center'
          >
            Your savings vault!
           
          </Text>
          {processing ? <Flex w="95%" mx="auto" justify="space-around" py={10} direction={{base:"column", md:"row"}}>
       		<SkeletonCard/>
       		<SkeletonCard/>
       		<SkeletonCard/>
       	</Flex> :
          vault.length === 0 ? (<Box mx="auto" my="auto" textAlign="center" w="100%">
					<TbKeyOff style={{fontSize:"200px", strokeWidth:1 , margin:"auto"}}/>
					<Text fontSize="14px" mt={3} >Sorry, your vault is empty. <Link href="/#/properties">View all properties</Link></Text>
				</Box>) :
          <Grid templateColumns={{base:'repeat(1, 1fr)', md:'repeat(2,1fr)', lg:'repeat(3, 1fr)'}} gap={6}>
           { vault && vault.map((item, index) => (
            <VaultCard 
            key={index}
            price={conv(item.price)}
            amountSaved = {conv(item.amountSaved)}
            id = {item.propertyId}
            tokenSymbol={item.tokenSymbol}
            reload={reload}
            setReload={setReload}  
            properties={properties}  
            />
            ))}

            </Grid>
            }

        </Box>
    )
}

export default Save