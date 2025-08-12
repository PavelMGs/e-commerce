"use client";

import {
  Box,
  Heading,
  Text,
  Button,
  Icon,
  Image,
  Badge,
  Flex,
} from "@chakra-ui/react";
import { LuArrowRight, LuStar } from "react-icons/lu";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  inStock: boolean;
  brand?: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link href={`/product/${product.id}`}>
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
        h="full"
      >
        <Box p={6} display="flex" flexDirection="column" h="full">
          <Box position="relative">
            <Image
              minH="200px"
              bg="bg.secondary"
              borderRadius="md"
              mb={4}
              alt={product.name}
              src={product.image}
            />
            {!product.inStock && (
              <Badge
                position="absolute"
                top={2}
                right={2}
                colorScheme="red"
                size="sm"
              >
                Out of Stock
              </Badge>
            )}
          </Box>

          {product.brand && (
            <Text
              fontSize="xs"
              color="text.secondary"
              textTransform="uppercase"
              mb={1}
            >
              {product.brand}
            </Text>
          )}

          <Heading size="md" mb={2}>
            {product.name}
          </Heading>

          <Text color="gray.600" mb={2} fontSize="sm">
            {product.category}
          </Text>

          <Flex align="center" gap={2} mb={3}>
            <Flex>
              {[...Array(5)].map((_, i) => (
                <Icon
                  key={i}
                  as={LuStar}
                  boxSize={3}
                  fill={i < Math.floor(product.rating) ? "gold" : "none"}
                  color={i < Math.floor(product.rating) ? "gold" : "gray.400"}
                />
              ))}
            </Flex>
            <Text fontSize="xs" color="text.secondary">
              ({product.rating})
            </Text>
          </Flex>

          <Text fontSize="xl" fontWeight="bold" color="blue.600" mb={3}>
            ${product.price}
          </Text>

          <Button
            colorScheme="blue"
            size="sm"
            w="full"
            mt="auto"
            disabled={!product.inStock}
          >
            View Details <Icon as={LuArrowRight} ml={2} />
          </Button>
        </Box>
      </Box>
    </Link>
  );
};

export default ProductCard;
