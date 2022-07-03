import React from "react";
import Navbar from "./components/Navbar";
import { Box } from "@chakra-ui/react";
import Hero from "./components/Hero";
import Content from "./components/Content";
import Footer from "./components/Footer";

function App() {
  return (
    <Box>
      <Box
        px={{ base: "6", md: "16" }}
        fontFamily="'Poppins', sans-serif"
        bgColor="#FAFAFA"
      >
        <Navbar />
        <Hero />
        <Content />
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
