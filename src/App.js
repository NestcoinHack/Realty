import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ListProperty from "./components/ListProperty";
import { Box, useToast } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SetPaymentToken from "./components/SetPaymentToken";
import Admin from "./components/Admin"
import Properties from "./components/Properties"
import Save from "./components/Save";
import AdminOverview from "./components/AdminOverview"
import UserOverview from "./components/UserOverview"
import contractAddress from "./contracts/contract_address.json"
import abi from "./contracts/abi.json";
import vaultContractAddress from "./contracts/realtyVault_address.json";
import vaultAbi from "./contracts/realtyVault_abi.json";
import {ethers} from 'ethers'

function App() {
  const toast = useToast()
  const [currentAccount, setCurrentAccount] = useState("");
  const [ properties, setProperties] = useState([])
  const [ vault, setVault] = useState([])
	const [ loading, setLoading] = useState(false)
  const [ processing, setProcessing] = useState(false)
  const [ reload, setReload] = useState(false)

  const urlLoader = (url) => {
    if(url.slice(0,22) === "https://ipfs.infura.io"){
      return "https://cloudflare-ipfs.com" + url.slice(22);
    } else if(url.slice(0,5) !== "https"){
      return "https://cloudflare-ipfs.com/ipfs/" + url; //cid parser
    } else {
      return url
    }
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
				url: urlLoader(arr[7][i]),

			})
		}
		return newArr;
	}

  const parseVault = (arr) => {
    let newArr = []
    if(arr.length === 0){
      newArr = [];
    } else {  
      for(var i=0; i<arr.length; i++){
        newArr.push({
          propertyId: arr[i].propertyId,
          price: arr[i].price,
          amountSaved: arr[i].amountSaved,
          tokenSymbol: arr[i].tokenSymbol,
          tokenAddress: arr[i].tokenAddress,
        })
      }
    }
      return newArr;
  }

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        toast({
          title:"Opps!",
          description:"You need to install metamask",
          status:"error",
          duration:1500,
          variant:"subtle",
          isClosable:true,
        })
        console.log("you need to install metamask");
      } else {
        console.log("found one", ethereum);
      }
      /*
       * Check if we're authorized to access the user's wallet
       */

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length !== 0) {
        const account = accounts[0];
        // toast({
        //   title:"Successful!",
        //   description:"Connected to " + account,
        //   status:"success",
        //   duration:1500,
        //   variant:"subtle",
        //   isClosable:true,
        // })
        console.log("account ", account);
        setCurrentAccount(account);
      } else {
        // toast({
        //   title:"Oppps!",
        //   description:"You need to connect your metamask wallet",
        //   status:"info",
        //   duration:1500,
        //   variant:"subtle",
        //   isClosable:true,
        // })
        console.log("no authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //connect wallet with button click
  const connectWallet = async () => {
      try {
        const { ethereum } = window;
        if (!ethereum) {
          toast({
            title:"Opps!",
            description:"You need to install metamask",
            status:"error",
            duration:1500,
            variant:"subtle",
            isClosable:true,
          })
          console.log("you need to install metamask");
          return;
        }
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });

        console.log("Connected", accounts[0]);
        toast({
            title:"Successful!",
            description:"Connected to " + accounts[0],
            status:"success",
            duration:1500,
            variant:"subtle",
            isClosable:true,
          })
        setCurrentAccount(accounts[0]);
      } catch (error) {
        console.log(error);
      }
  };

  //diconnect wallet with button click
   const disconnectWallet = () => {
     setCurrentAccount("");
      toast({
        title:"Disconnected",
        description:"You need to connect to your metamask wallet",
        status:"info",
        duration:1500,
        variant:"subtle",
        isClosable:true,
      })
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
            //  console.log(properties)  
           	setLoading(false)
          } else {
            console.log("ethereum object does not exist!");
          }
        } catch (error) {
          console.log(error);
        }
    };

    const fetchVault = async() => {
      setProcessing(true);
      try {
        const { ethereum } = window;
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const vaultContract = new ethers.Contract(
            vaultContractAddress.contractAddress,
            vaultAbi,
            signer
          );
          let allVault = await vaultContract.getUserVault(currentAccount);   
          setVault(parseVault(allVault))
           setProcessing(false)
          //  console.log(vault)
        } else {
          console.log("ethereum object does not exist!");
        }
      } catch (error) {
        console.log(error);
      }

    }

    const unsoldProperties = properties.filter(function(e) {
      //properties that have buyer as this null address means they are not yet sold
      //i also can't buy a property i listed myself
      return e.buyer === "0x000000000000000000000000000000000000dEaD" && (e.address.toLowerCase()) !== currentAccount
    })

    const myListings = properties.filter(function(e) {
      return e.buyer === "0x000000000000000000000000000000000000dEaD" && (e.address.toLowerCase()) === currentAccount
    })

    useEffect(()=> {
      checkIfWalletIsConnected();
    },[])

  useEffect(() => {
    if(currentAccount){
      fetchProperties();
      fetchVault();
    }
  }, [currentAccount, reload]);


  return (
    <Box
      px={{ base: "6", md: "16" }}
      fontFamily="'Poppins', sans-serif"
      bgColor="#FAFAFA"
    >
      <HashRouter>
        <Navbar currentAccount={currentAccount} connectWallet={connectWallet} disconnectWallet={disconnectWallet}/>
        <Box minH="76vh">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/admin/set-payment-token" element={<SetPaymentToken />} />
          <Route path="/list-property" element={<ListProperty reload={reload} setReload={setReload}/>} />
          <Route path="/admin/send-token" element={<Admin />} />
          <Route path="/properties" element={<Properties currentAccount={currentAccount} properties={properties} loading={loading} reload={reload} setReload={setReload} vault={vault}/>} processing={processing}/>
          <Route path="/properties/on-sale" element={<Properties currentAccount={currentAccount} properties={unsoldProperties} loading={loading} reload={reload} setReload={setReload} vault={vault} processing={processing}/>} />
          <Route path="/properties/my-listings" element={<Properties currentAccount={currentAccount} properties={myListings} loading={loading} vault={vault} processing={processing}/>} />
          <Route path="/vault" element={<Save vault={vault} processing={processing} properties={properties} reload={reload} setReload={setReload}/>} />
          <Route path="/admin" element={<AdminOverview currentAccount={currentAccount}/>}/>
          <Route path="/user" element={<UserOverview currentAccount={currentAccount}/>}/>
        </Routes>
        </Box>
        <Footer />
      </HashRouter>
    </Box>
  );
}

export default App;
