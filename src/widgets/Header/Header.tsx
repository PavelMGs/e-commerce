"use client";
import { LuShoppingCart, LuSearch, LuMenu } from "react-icons/lu";
import { useState } from "react";
import Link from "next/link";
import {
  Box,
  Container,
  Flex,
  Text,
  IconButton,
  Input,
  Badge,
} from "@chakra-ui/react";
import { ColorModeButton } from "@/app/config/colorMode";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Box
      as="header"
      bg="bg.primary"
      borderBottom="1px"
      borderColor="border.primary"
      position="sticky"
      top={0}
      zIndex={50}
      boxShadow="sm"
    >
      <Container maxW="container.xl" px={4}>
        <Flex align="center" justify="space-between" h={16}>
          {/* Logo */}
          <Link href="/" passHref>
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color="accent.hover"
              _hover={{ textDecoration: "none" }}
            >
              TechStore
            </Text>
          </Link>

          {/* Desktop Navigation */}
          <Flex gap={8} display={{ base: "none", md: "flex" }}>
            <Link href="/category/smartphones" passHref>
              <Text
                color="text.secondary"
                _hover={{
                  color: "accent.hover",
                  textDecoration: "none",
                }}
                transition="colors 0.2s"
              >
                Smartphones
              </Text>
            </Link>
            <Link href="/category/laptops" passHref>
              <Text
                color="text.secondary"
                _hover={{
                  color: "accent.hover",
                  textDecoration: "none",
                }}
                transition="colors 0.2s"
              >
                Laptops
              </Text>
            </Link>
            <Link href="/category/tablets" passHref>
              <Text
                color="text.secondary"
                _hover={{
                  color: "accent.hover",
                  textDecoration: "none",
                }}
                transition="colors 0.2s"
              >
                Tablets
              </Text>
            </Link>
          </Flex>

          {/* Search Bar */}
          <Box
            flex={1}
            maxW="md"
            mx={8}
            display={{ base: "none", md: "block" }}
          >
            <Box position="relative">
              <Box
                position="absolute"
                left={3}
                top="50%"
                transform="translateY(-50%)"
                zIndex={1}
                pointerEvents="none"
              >
                <LuSearch color="gray.400" size={16} />
              </Box>
              <Input
                pl={10}
                pr={4}
                placeholder="Search products..."
                borderRadius="md"
                _focus={{
                  borderColor: "accent.hover",
                  boxShadow: `0 0 0 1px accent.hover`,
                }}
              />
            </Box>
          </Box>

          {/* Cart and Menu */}
          <Flex gap={4}>
            {/* Cart Button */}
            <Box position="relative">
              <IconButton
                aria-label="Shopping cart"
                variant="ghost"
                _hover={{ bg: "bg.hover" }}
              >
                <LuShoppingCart size={20} />
              </IconButton>
              <Badge
                colorScheme="blue"
                variant="solid"
                borderRadius="full"
                position="absolute"
                top="-8px"
                right="-8px"
                minW="20px"
                h="20px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="xs"
              >
                0
              </Badge>
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              aria-label="Toggle menu"
              variant="ghost"
              display={{ base: "flex", md: "none" }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              _hover={{ bg: "bg.hover" }}
            >
              <LuMenu size={20} />
            </IconButton>
            <ColorModeButton />
          </Flex>
        </Flex>

        {/* Mobile Navigation */}
        <Box
          overflow="hidden"
          maxHeight={isMenuOpen ? "400px" : "0"}
          transition="max-height 0.3s ease"
        >
          <Box
            pb={4}
            borderTop="1px"
            borderColor="border.primary"
            display={{ base: "block", md: "none" }}
          >
            <Flex gap={4} align="stretch" pt={4}>
              {/* Mobile Search */}
              <Box position="relative">
                <Box
                  position="absolute"
                  left={3}
                  top="50%"
                  transform="translateY(-50%)"
                  zIndex={1}
                  pointerEvents="none"
                >
                  <LuSearch color="gray.400" size={16} />
                </Box>
                <Input
                  pl={10}
                  pr={4}
                  placeholder="Search products..."
                  borderRadius="md"
                  _focus={{
                    borderColor: "accent.hover",
                    boxShadow: `0 0 0 1px accent.hover`,
                  }}
                />
              </Box>

              {/* Mobile Navigation Links */}
              <Link href="/category/smartphones" passHref>
                <Text
                  color="text.secondary"
                  py={2}
                  _hover={{
                    color: "accent.hover",
                    textDecoration: "none",
                  }}
                  transition="colors 0.2s"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Smartphones
                </Text>
              </Link>
              <Link href="/category/laptops" passHref>
                <Text
                  color="text.secondary"
                  py={2}
                  _hover={{
                    color: "accent.hover",
                    textDecoration: "none",
                  }}
                  transition="colors 0.2s"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Laptops
                </Text>
              </Link>
              <Link href="/category/tablets" passHref>
                <Text
                  color="text.secondary"
                  py={2}
                  _hover={{
                    color: "accent.hover",
                    textDecoration: "none",
                  }}
                  transition="colors 0.2s"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tablets
                </Text>
              </Link>
            </Flex>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
