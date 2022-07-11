import { Box } from '@chakra-ui/react'
import React from 'react'
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Content from "../components/Content";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <Box>
        <Box
         
        >
          <Navbar />
          <Hero />
          <Content />
        </Box>
        <Footer />
      </Box>
    )
}

export default Home;