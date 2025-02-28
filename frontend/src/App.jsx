// import React from 'react';
// import { Box, Container, ChakraProvider, extendTheme } from '@chakra-ui/react';
// import { Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Register from './pages/Register';
// import Homepage from './pages/Homepage';
// import Login from './pages/Login';
// import { AuthProvider, useAuth } from './context/AuthContext';

// const theme = extendTheme({
//   config: {
//     initialColorMode: 'light',
//     useSystemColorMode: false,
//   },
// });

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated } = useAuth();

//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }
//   return children;
// };

// function App() {
//   return (
//     <ChakraProvider theme={theme}>
//       <Box minH={'100vh'} bg={'gray.100'}>
//         <Navbar />
//         <Container maxW={'6xl'} pt={20}>
//           <Routes>
//             <Route path="/" element={<Homepage />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//           </Routes>
//         </Container>
//       </Box>
//     </ChakraProvider>
//   );
// }

// export default App;

import React from "react";
import { Box, Container, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import { AuthProvider, useAuth } from "./context/AuthContext";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <Box minH={"100vh"} bg={"gray.100"}>
          <Navbar />
          <Container maxW={"6xl"} pt={20}>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Homepage />
                  </ProtectedRoute>
                }
              />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Container>
        </Box>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
