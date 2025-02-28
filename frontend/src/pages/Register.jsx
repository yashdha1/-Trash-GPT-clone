import React from 'react'
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
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useUserStore } from "../store/user";

const Register = () => {
  const [ newUser, setNewUser ] = useState({
    username : "",
    email : "",
    password : "",
  });
  const{ createUser } = useUserStore();
  const toast = useToast() 
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const registerHandler = async ()=>{
    const { success, message } = await createUser(newUser);
    const displayMessage = message && message.trim() !== "" ? message : "Fill all the fields...";
    toast({
        title: success ? "Success" : "Error",
        description: displayMessage ,
        status: success ? "success" : "error", 
        duration: 3000,
        isClosable: true,
      });
      navigate('/login')
      console.log(displayMessage, success) 
      console.log(newUser)
  };

  return (
    <Container maxWidth={Container.md} display="flex" alignItems="center" justifyContent="center" minH="100vh">
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
                signup today!!
              </Heading>
              <VStack spacing={6}>
                <Input
                  placeholder="UserName"
                  name="username"
                  type="String"
                  onChange={handleInputChange}
                />
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
                onClick = { registerHandler } 
                w='max'
                >
                    SignUp </Button>  
              </VStack>
            </Box>
          </VStack>
        </Container>
  )
}

export default Register;
