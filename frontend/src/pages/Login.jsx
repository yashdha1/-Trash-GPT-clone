import {
  Box,
  Container,
  Heading,
  Input,
  useColorModeValue,
  VStack,
  Button, 
  useToast
} from "@chakra-ui/react";
import React from 'react'

import { useState } from "react";
import { useUserStore } from "../store/user";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

const Login = () => {
   
  const [ existingUser, setExistingUser ] = useState({
      email : "",
      password : ""
  });
  const { loginUser } = useUserStore();
  const toast = useToast() 
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e) => {
    setExistingUser({ ...existingUser, [e.target.name]: e.target.value });
  };

  const loginHandler = async ()=>{
    const { success, message } = await loginUser(existingUser);
    const displayMessage = message && message.trim() !== "" ? message : "Fill all the fields...";
    toast({
        title: success ? "Success" : "Error",
        description: displayMessage ,
        status: success ? "success" : "error", // Use "success" or "error"
        duration: 3000,
        isClosable: true,
      });
      if (success) {
        login(localStorage.getItem("token"));
        navigate("/");
      }
      console.log(displayMessage, success) 
      console.log(existingUser)
  }; 

  return (
    <Container maxWidth={Container.xl} display="flex" alignItems="center" justifyContent="center" minH="100vh">
      <VStack spacing={8}>
        <Box
          w={"sm"}
          bg={useColorModeValue("white", "gray.700")}
          p={"6"}
          rounded={"lg"}
          shadow={"md"}
          justifyContent={"center"}
        >
          <Heading as={"h1"} size={"2xl"} textAlign={"center"}   mb={8}>
            Log into the Account...
          </Heading>
          <VStack spacing={6}>
            <Input
              placeholder="Email"
              name="email"
              type="String"
              onChange={handleInputChange}
               
            />
            <Input
              placeholder="password"
              name="password"
              type="password"
              onChange={handleInputChange}
            />
            <Button 
            colorScheme='teal'
            onClick = {loginHandler} 
            w='max'
            >
                Login </Button>  
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default Login ;