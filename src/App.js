import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./components/Home";
import ListProperty from "./components/ListProperty";
import { Box } from '@chakra-ui/react'


function App() {
  return (
    <Box  px={{ base: "6", md: "16" }}
    fontFamily="'Poppins', sans-serif"
    bgColor="#FAFAFA">
 <BrowserRouter>
    <Routes >
    <Route path="/" element={<Home/>} />
    <Route path="list-property" element={<ListProperty />} />
    </Routes>
    </BrowserRouter>
    </Box>
  
  
  );
}

export default App;
