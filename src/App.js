import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ListProperty from "./components/ListProperty";
import { Box, useToast } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SetPaymentToken from "./components/SetPaymentToken";
import Admin from "./components/Admin"
import Properties from "./components/Properties"

function App() {
  const toast = useToast()
  const [currentAccount, setCurrentAccount] = useState("");

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
        toast({
          title:"Successful!",
          description:"Connected to " + account,
          status:"success",
          duration:1500,
          variant:"subtle",
          isClosable:true,
        })
        console.log("account ", account);
        setCurrentAccount(account);
      } else {
        toast({
          title:"Oppps!",
          description:"You need to connect your metamask wallet",
          status:"info",
          duration:1500,
          variant:"subtle",
          isClosable:true,
        })
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

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <Box
      px={{ base: "6", md: "16" }}
      fontFamily="'Poppins', sans-serif"
      bgColor="#FAFAFA"
    >
      <BrowserRouter>
        <Navbar currentAccount={currentAccount} connectWallet={connectWallet} disconnectWallet={disconnectWallet}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="set-payment-token" element={<SetPaymentToken />} />
          <Route path="list-property" element={<ListProperty />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/properties" element={<Properties currentAccount={currentAccount}/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Box>
  );
}

export default App;
