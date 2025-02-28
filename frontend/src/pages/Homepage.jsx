import React, { useState, useEffect, useRef } from 'react';
import { Container, VStack, Heading, Text, Box, Input, Button, Stack, useColorModeValue, IconButton } from "@chakra-ui/react";
import { RepeatIcon } from '@chakra-ui/icons';
import { useChatStore } from "../store/chat";
import { motion } from "framer-motion";

const Homepage = () => {
  const [input, setInput] = useState("");
  const { messages, sendMessage, clearMessages } = useChatStore();
  const chatRef = useRef(null);

  const bg = useColorModeValue("white", "gray.900");
  const textColor = useColorModeValue("gray.800", "white");
  const botBg = useColorModeValue("gray.100", "gray.700");
  const userBg = useColorModeValue("blue.100", "blue.600");

  const scrollToBottom = () => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    await sendMessage(input);
    setInput("");
  };

  const handleRefresh = () => {
    clearMessages();
  };

  return (
    <Container maxW="Container.md" bg={bg} color={textColor} py={12} borderRadius="lg" shadow="xl" minHeight="90vh">
      <Heading textAlign="center" mb={6}>Zephyr AI Chatbot...</Heading>
      <IconButton icon={<RepeatIcon />} onClick={handleRefresh} mb={4} aria-label="Refresh Chat" />
      <Stack spacing={4} h="400px" overflowY="scroll" p={4} border="1px solid" borderRadius="md" ref={chatRef} bg={useColorModeValue("gray.50", "gray.800")}> 
        {messages.map((msg, index) => (
          <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <Box bg={msg.sender === 'user' ? userBg : botBg} p={3} borderRadius="md" alignSelf={msg.sender === 'user' ? 'flex-end' : 'flex-start'}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                <Text>{msg.text}</Text>
              </motion.div>
            </Box>
          </motion.div>
        ))}
      </Stack>
      <Stack direction="row" mt={4}>
        <Input placeholder="Ask something..." value={input} onChange={(e) => setInput(e.target.value)} />
        <Button colorScheme="blue" onClick={handleSend}>Send</Button>
      </Stack>
    </Container>
  );
};

export default Homepage;