"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Grid,
  Flex,
  Icon
} from "@chakra-ui/react";
import { LuArrowRight, LuSmartphone, LuLaptop, LuTablet } from "react-icons/lu";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useColorModeValue } from "@/app/config/colorMode";
import { Product } from "@/entities/product";
import ProductCard from "@/shared/ui/ProductCard/ProductCard";
import { mockProducts } from "@/entities/product/mock";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    setFeaturedProducts(mockProducts);
  }, []);

  const heroBg = useColorModeValue(
    "linear(to-br, blue.50, white, purple.50)",
    "linear(to-br, blue.900, gray.900, purple.900)"
  );

  const sectionBg = useColorModeValue("white", "gray.900");
  const featuredBg = useColorModeValue("gray.50", "gray.800");

  return (
    <Box minH="100vh">
      {/* Hero Section */}
      <Box bgGradient={heroBg} py={20}>
        <Container maxW="container.xl" px={4}>
          <Box textAlign="center" maxW="4xl" mx="auto">
            <Heading
              fontSize={{ base: "4xl", md: "6xl" }}
              fontWeight="bold"
              bgGradient="linear(to-r, blue.600, blue.400)"
              bgClip="text"
              lineHeight="shorter"
              mb={6}
            >
              Latest Tech at Your Fingertips
            </Heading>
            <Text fontSize="xl" color="gray.600" maxW="2xl" mx="auto" mb={8}>
              Discover premium smartphones, powerful laptops, and versatile
              tablets. All the technology you need, delivered with exceptional
              service.
            </Text>
            <Flex
              direction={{ base: "column", sm: "row" }}
              gap={4}
              justify="center"
            >
              <Link href="/category/smartphones">
                <Button size="lg" colorScheme="blue">
                  Shop Now <Icon as={LuArrowRight} ml={2} />
                </Button>
              </Link>
              <Link href="#featured">
                <Button size="lg" variant="outline" colorScheme="blue">
                  View Featured Products
                </Button>
              </Link>
            </Flex>
          </Box>
        </Container>
      </Box>

      {/* Categories Section */}
      <Box py={16} bg={sectionBg}>
        <Container maxW="container.xl" px={4}>
          <Box textAlign="center" mb={12}>
            <Heading size="xl" mb={4}>
              Shop by Category
            </Heading>
            <Text color="gray.600" maxW="2xl" mx="auto">
              Find the perfect device for your needs from our carefully curated
              selection
            </Text>
          </Box>

          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8}>
            {[
              {
                href: "/category/smartphones",
                icon: LuSmartphone,
                title: "Smartphones",
                description:
                  "Latest flagship phones with cutting-edge features",
                linkText: "Browse Smartphones →",
              },
              {
                href: "/category/laptops",
                icon: LuLaptop,
                title: "Laptops",
                description: "Powerful computers for work and entertainment",
                linkText: "Browse Laptops →",
              },
              {
                href: "/category/tablets",
                icon: LuTablet,
                title: "Tablets",
                description:
                  "Versatile devices for creativity and productivity",
                linkText: "Browse Tablets →",
              },
            ].map((category, index) => (
              <Link key={index} href={category.href}>
                <Box
                  bg="bg.primary"
                  borderColor="border.primary"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  _hover={{
                    shadow: "xl",
                    transform: "translateY(-2px)",
                    transition: "all 0.3s ease",
                  }}
                  transition="all 0.3s ease"
                  cursor="pointer"
                  role="group"
                  w="full"
                  h="full"
                >
                  <Box p={8} textAlign="center">
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      gap={4}
                    >
                      <Box
                        bg="blue.50"
                        _dark={{ bg: "blue.900" }}
                        borderRadius="full"
                        w={16}
                        h={16}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        _groupHover={{
                          bg: "blue.100",
                          _dark: { bg: "blue.800" },
                          transition: "all 0.3s ease",
                        }}
                        transition="all 0.3s ease"
                      >
                        <Icon as={category.icon} w={8} h={8} color="blue.600" />
                      </Box>
                      <Heading size="lg">{category.title}</Heading>
                      <Text color="gray.600" mb={4}>
                        {category.description}
                      </Text>
                      <Text
                        color="blue.600"
                        fontWeight="medium"
                        _groupHover={{ textDecoration: "underline" }}
                      >
                        {category.linkText}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Link>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Featured Products */}
      <Box id="featured" py={16} bg={featuredBg}>
        <Container maxW="container.xl" px={4}>
          <Box textAlign="center" mb={12}>
            <Heading size="xl" mb={4}>
              Featured Products
            </Heading>
            <Text color="gray.600" maxW="2xl" mx="auto">
              Discover our handpicked selection of the best tech products
            </Text>
          </Box>

          <Grid
            templateColumns={{
              base: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={6}
          >
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Grid>

          <Box textAlign="center" mt={12}>
            <Link href="/category/smartphones">
              <Button size="lg" variant="outline" colorScheme="blue">
                View All Products <Icon as={LuArrowRight} ml={2} />
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
