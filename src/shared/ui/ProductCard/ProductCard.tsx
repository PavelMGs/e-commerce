"use client";

import {
  Box,
  Heading,
  Text,
  Button,
  Icon,
  Image
} from "@chakra-ui/react";
import { LuArrowRight } from "react-icons/lu";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  inStock: boolean;
}

const ProductCard = ({ product }: { product: Product }) => {

  return (
    <Box
      bg="bg.primary"
      borderColor="border.primary"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      _hover={{
        transform: "translateY(-4px)",
        shadow: "xl",
        transition: "all 0.3s ease",
      }}
      transition="all 0.3s ease"
      cursor="pointer"
    >
      <Box p={6} display="flex" flexDirection="column">
        <Image
          min-h="200px"
          bg="bg.secondary"
          borderRadius="md"
          mb={4}
          alt="Product Image"
          src={product.image}
        />
        <Heading size="md" mb={2}>
          {product.name}
        </Heading>
        <Text color="gray.600" mb={3}>
          {product.category}
        </Text>
        <Text fontSize="xl" fontWeight="bold" color="blue.600" mb={3}>
          ${product.price}
        </Text>
        <Button colorScheme="blue" size="sm" w="full">
          View Details <Icon as={LuArrowRight} ml={2} />
        </Button>
      </Box>
    </Box>
  );
};

export default ProductCard;
