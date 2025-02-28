
import { Button, Container, Flex, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext"; 

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    // <Container maxW="100%" bg={useColorModeValue('white', 'gray.800')} boxShadow="lg" py={4} px={8}>
    //   <Flex justifyContent="space-between" alignItems="center">
    //     <Text fontSize="3xl" fontWeight="bold" bgGradient="linear(to-l, teal.400, teal.600)" bgClip="text">
    //       <Link to="/">Chat GPT Clone</Link>
    //     </Text>
    //     <Flex gap={4}>
    //       <Button as={Link} to="/login" colorScheme="teal" variant="outline">Login</Button>
    //       <Button as={Link} to="/register" colorScheme="teal">Sign Up</Button>
    //       <Button onClick={toggleColorMode} >{colorMode === 'light' ? '🌙 Dark' : '☀️ Light'}</Button>
    //     </Flex>
    //   </Flex>
    // </Container>
    <Container maxW="100%" bg={useColorModeValue('white', 'gray.800')} boxShadow="lg" py={4} px={8}>
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="3xl" fontWeight="bold" bgGradient="linear(to-l, teal.400, teal.600)" bgClip="text">
          <Link to="/">Chat GPT Clone</Link>
        </Text>
        <Flex gap={4}>
          {!isAuthenticated ? (
            <>
              <Button as={Link} to="/login" colorScheme="teal" variant="outline">
                Login
              </Button>
              <Button as={Link} to="/register" colorScheme="teal">
                Sign Up
              </Button>
            </>
          ) : (
            <Button onClick={logout} colorScheme="red">
              SignIn
            </Button>
          )}
          <Button onClick={toggleColorMode}>{colorMode === 'light' ? '🌙 Dark' : '☀️ Light'}</Button>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Navbar;