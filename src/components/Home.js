import { Box } from '@chakra-ui/react'
import React from 'react'
import Hero from "../components/Hero";
import Content from "../components/Content";

const Home = () => {
    return (
        <Box>
          <Hero />
          <Content />
        </Box>
    )
}

export default Home;