import React,{ useState, useEffect } from 'react';
import { Box, Flex } from "@chakra-ui/react";
import contractAddress from "../contracts/contract_address.json"
import abi from "../contracts/abi.json";
import {ethers} from 'ethers'
import PropertyCard from "./PropertyCard"
import SkeletonCard from "./Skeleton"

const Properties = ({currentAccount}) => {
	const [ properties, setProperties] = useState([])
	const [ loading, setLoading] = useState(false)

	const conv = (x) => {
		let y = x._hex
		return parseInt(y.toString(), 16) 
	}

	const parseArray = (arr) => {
		let newArr = []
		for(var i=0; i<arr[0].length; i++){
			newArr.push({
				name: arr[0][i],
				address: arr[1][i],
				amount: arr[2][i],
				id: arr[3][i],
				location: arr[4][i],
				description:arr[5][i],
				buyer:arr[6][i],
				url: arr[7][i],

			})
		}
		return newArr;
	}

	const fetchProperties = async () => {
		setLoading(true)
        try {
          const { ethereum } = window;
          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const PropertyNftContract = new ethers.Contract(
              contractAddress.contractAddress,
              abi.abi,
              signer
            );
            let allProperties = await PropertyNftContract.getAllProperties()
                
           	setProperties(parseArray(allProperties))
           	setLoading(false)
          } else {
            console.log("ethereum object does not exist!");
          }
        } catch (error) {
          console.log(error);
        }
    };

    useEffect(()=> {
    	fetchProperties()
    },[currentAccount])
    return (
       <Box minH="95vh">
       {loading ? <Flex w="95%" mx="auto" justify="space-around" py={10} direction={{base:"column", md:"row"}}>
       		<SkeletonCard/>
       		<SkeletonCard/>
       		<SkeletonCard/>
       	</Flex> :
       	<Flex flexWrap='wrap' w="95%" mx="auto" justify="space-around" py={10} direction={{base:"column", md:"row"}}>
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
       			/>
       		))}
       	</Flex>
       	}
       </Box> 
    );
};

export default Properties;
