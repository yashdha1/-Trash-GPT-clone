import {
  Box,
  Heading,
  VStack,
  HStack,
  Button,
  IconButton,
  Image,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  Input,
  ModalFooter,
} from "@chakra-ui/react";

import React from "react";
import { useProductState } from "../../store/product.js";
import { useState } from "react"; 


// takes in product prop
const ProductCard = ({ product }) => {
//   const toast = useToast();
  };

  return (
    <Box
      transition="all 0.3s"
      overflow="hidden"
      p={"6"}
      rounded={"lg"}
      border={"thick"}
      shadow={"lg"}
      justifyContent={"center"}
      _hover={{ transform: "translateY(-5px)", shadow: "x1" }}
    >
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontSize="x1" fontWeight="bold" color={textColor} mb={4}>
          ${product.price}
        </Text>
        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handelDeleteProduct(product._id)}
            colorScheme="red"
          />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Update Product! </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
                { console.log(updatedProduct) }
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>{
                    handleUpdateProduct({...updatedProduct, name: e.target.value}) 
                }}
              />
              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) =>{
                    handleUpdateProduct({...updatedProduct, price: e.target.value}) 
                }}
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>{
                    handleUpdateProduct({...updatedProduct, image: e.target.value})
                }}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => updateProduct(product._id, updatedProduct)}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
