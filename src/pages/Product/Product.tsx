"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Badge,
  Flex,
  Icon,
  Tabs,
  Grid,
  Card,
  createListCollection,
  Select,
  Portal,
  HStack,
  VStack,
  Stack,
} from "@chakra-ui/react";
import {
  LuShoppingCart,
  LuHeart,
  LuShare2,
  LuTruck,
  LuShield,
  LuRefreshCw,
  LuStar,
  LuChevronRight,
} from "react-icons/lu";
import Link from "next/link";
import { mockProducts } from "@/entities/product/mock";
import ProductCard from "@/shared/ui/ProductCard/ProductCard";

const Product = () => {
  const { productId } = useParams<{ productId: string }>() || {};
  const [quantity, setQuantity] = useState(["1"]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const product = useMemo(
    () => mockProducts.find((p) => p.id === productId),
    [productId]
  );

  const relatedProducts = useMemo(
    () =>
      mockProducts
        .filter((p) => p.category === product?.category && p.id !== productId)
        .slice(0, 4),
    [product, productId]
  );

  const quantityOptions = useMemo(
    () =>
      createListCollection({
        items: Array.from({ length: 10 }, (_, i) => ({
          label: String(i + 1),
          value: String(i + 1),
        })),
      }),
    []
  );

  if (!product) {
    return (
      <Container maxW="container.xl" py={{ base: 8, md: 16 }}>
        <Flex direction="column" align="center" justify="center" minH="50vh">
          <Heading size={{ base: "md", md: "lg" }} mb={4} textAlign="center">
            Product Not Found
          </Heading>
          <Text color="text.secondary" mb={8} textAlign="center">
            The product you're looking for doesn't exist.
          </Text>
          <Link href="/">
            <Button colorScheme="blue">Back to Home</Button>
          </Link>
        </Flex>
      </Container>
    );
  }

  const images = [product.image, product.image, product.image, product.image];

  return (
    <Box minH="100vh" bg="bg.secondary">
      {/* Breadcrumb */}
      <Box bg="bg.primary" borderBottom="1px" borderColor="border.primary">
        <Container maxW="container.xl" py={{ base: 2, md: 3 }}>
          <Flex
            align="center"
            gap={{ base: 1, md: 2 }}
            color="text.secondary"
            fontSize={{ base: "xs", md: "sm" }}
            overflowX="auto"
            whiteSpace="nowrap"
          >
            <Link href="/">
              <Text _hover={{ color: "accent.hover" }}>Home</Text>
            </Link>
            <Icon as={LuChevronRight} boxSize={{ base: 3, md: 4 }} />
            <Link href={`/category/${product.category?.toLowerCase()}`}>
              <Text _hover={{ color: "accent.hover" }}>{product.category}</Text>
            </Link>
            <Icon as={LuChevronRight} boxSize={{ base: 3, md: 4 }} />
            <Text color="fg" truncate maxW={{ base: "150px", md: "none" }}>
              {product.name}
            </Text>
          </Flex>
        </Container>
      </Box>

      {/* Main Product Section */}
      <Container maxW="container.xl" py={{ base: 4, md: 8 }}>
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          gap={{ base: 4, md: 8 }}
        >
          {/* Product Images */}
          <Box>
            <Card.Root bg="bg.primary">
              <Card.Body p={{ base: 4, md: 8 }}>
                <Box
                  h={{ base: "250px", sm: "300px", md: "400px" }}
                  bg="bg.secondary"
                  borderRadius="lg"
                  mb={4}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text color="text.secondary">Product Image</Text>
                </Box>
                <Grid
                  templateColumns={{
                    base: "repeat(4, 1fr)",
                    sm: "repeat(4, 1fr)",
                  }}
                  gap={{ base: 1, md: 2 }}
                >
                  {images.map((img, index) => (
                    <Box
                      key={index}
                      h={{ base: "60px", sm: "70px", md: "80px" }}
                      bg="bg.secondary"
                      borderRadius="md"
                      cursor="pointer"
                      border="2px solid"
                      borderColor={
                        selectedImage === index ? "accent.hover" : "transparent"
                      }
                      onClick={() => setSelectedImage(index)}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      _hover={{
                        borderColor:
                          selectedImage === index
                            ? "accent.hover"
                            : "border.primary",
                      }}
                    >
                      <Text
                        fontSize={{ base: "2xs", md: "xs" }}
                        color="text.secondary"
                      >
                        {index + 1}
                      </Text>
                    </Box>
                  ))}
                </Grid>
              </Card.Body>
            </Card.Root>
          </Box>

          {/* Product Info */}
          <Box>
            <VStack align="stretch" gap={{ base: 4, md: 6 }}>
              {/* Title and Price */}
              <Box>
                {product.brand && (
                  <Text
                    fontSize={{ base: "xs", md: "sm" }}
                    color="text.secondary"
                    textTransform="uppercase"
                    mb={2}
                  >
                    {product.brand}
                  </Text>
                )}
                <Heading size={{ base: "lg", md: "xl" }} mb={3}>
                  {product.name}
                </Heading>

                <Flex
                  align="center"
                  gap={{ base: 2, md: 4 }}
                  mb={4}
                  wrap="wrap"
                >
                  <HStack>
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        as={LuStar}
                        boxSize={{ base: 4, md: 5 }}
                        fill={i < Math.floor(product.rating) ? "gold" : "none"}
                        color={
                          i < Math.floor(product.rating) ? "gold" : "gray.400"
                        }
                      />
                    ))}
                  </HStack>
                  <Text
                    fontSize={{ base: "xs", md: "sm" }}
                    color="text.secondary"
                  >
                    {product.rating} out of 5
                  </Text>
                </Flex>

                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={{ base: "flex-start", sm: "baseline" }}
                  gap={{ base: 2, md: 3 }}
                  mb={4}
                >
                  <Text
                    fontSize={{ base: "2xl", md: "3xl" }}
                    fontWeight="bold"
                    color="blue.600"
                  >
                    ${product.price}
                  </Text>
                  <Text
                    fontSize={{ base: "md", md: "lg" }}
                    color="text.secondary"
                    textDecoration="line-through"
                  >
                    ${Math.round(product.price * 1.2)}
                  </Text>
                  <Badge colorScheme="green" size={{ base: "md", md: "lg" }}>
                    Save 20%
                  </Badge>
                </Stack>

                {product.description && (
                  <Text
                    color="text.secondary"
                    mb={4}
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    {product.description}
                  </Text>
                )}
              </Box>

              {/* Stock Status */}
              <Box>
                {product.inStock ? (
                  <Badge
                    colorScheme="green"
                    size={{ base: "md", md: "lg" }}
                    mb={4}
                  >
                    ✓ In Stock
                  </Badge>
                ) : (
                  <Badge
                    colorScheme="red"
                    size={{ base: "md", md: "lg" }}
                    mb={4}
                  >
                    Out of Stock
                  </Badge>
                )}
              </Box>

              {/* Quantity and Actions */}
              <Stack direction="column" gap={3}>
                <Flex gap={3} align="center">
                  <Box>
                    <Text
                      fontSize={{ base: "xs", md: "sm" }}
                      mb={2}
                      fontWeight="medium"
                    >
                      Quantity:
                    </Text>
                    <Select.Root
                      collection={quantityOptions}
                      size={{ base: "sm", md: "md" }}
                      width={{ base: "80px", md: "100px" }}
                      value={quantity}
                      onValueChange={(details) => setQuantity(details.value)}
                      disabled={!product.inStock}
                    >
                      <Select.HiddenSelect />
                      <Select.Control>
                        <Select.Trigger>
                          <Select.ValueText />
                          <Select.Indicator />
                        </Select.Trigger>
                      </Select.Control>
                      <Portal>
                        <Select.Positioner>
                          <Select.Content>
                            {quantityOptions.items.map((option) => (
                              <Select.Item item={option} key={option.value}>
                                {option.label}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Portal>
                    </Select.Root>
                  </Box>

                  <Button
                    colorScheme="blue"
                    size={{ base: "md", md: "lg" }}
                    flex={1}
                    disabled={!product.inStock}
                  >
                    <Icon as={LuShoppingCart} mr={2} />
                    <Text display={{ base: "none", sm: "inline" }}>
                      Add to Cart
                    </Text>
                    <Text display={{ base: "inline", sm: "none" }}>Add</Text>
                  </Button>
                </Flex>

                <Flex gap={2}>
                  <Button
                    variant="outline"
                    size={{ base: "md", md: "lg" }}
                    onClick={() => setIsFavorite(!isFavorite)}
                    colorScheme={isFavorite ? "red" : "gray"}
                    flex={1}
                  >
                    <Icon
                      as={LuHeart}
                      fill={isFavorite ? "currentColor" : "none"}
                      mr={{ base: 0, sm: 2 }}
                    />
                    <Text display={{ base: "none", sm: "inline" }}>
                      {isFavorite ? "Saved" : "Save"}
                    </Text>
                  </Button>

                  <Button
                    variant="outline"
                    size={{ base: "md", md: "lg" }}
                    flex={1}
                  >
                    <Icon as={LuShare2} mr={{ base: 0, sm: 2 }} />
                    <Text display={{ base: "none", sm: "inline" }}>Share</Text>
                  </Button>
                </Flex>
              </Stack>

              {/* Features */}
              <Grid
                templateColumns={{ base: "1fr", sm: "repeat(3, 1fr)" }}
                gap={{ base: 3, md: 4 }}
              >
                <Flex align="center" gap={3}>
                  <Icon
                    as={LuTruck}
                    boxSize={{ base: 5, md: 5 }}
                    color="blue.600"
                  />
                  <Box>
                    <Text
                      fontSize={{ base: "xs", md: "sm" }}
                      fontWeight="medium"
                    >
                      Free Delivery
                    </Text>
                    <Text
                      fontSize={{ base: "2xs", md: "xs" }}
                      color="text.secondary"
                    >
                      2-3 business days
                    </Text>
                  </Box>
                </Flex>
                <Flex align="center" gap={3}>
                  <Icon
                    as={LuShield}
                    boxSize={{ base: 5, md: 5 }}
                    color="blue.600"
                  />
                  <Box>
                    <Text
                      fontSize={{ base: "xs", md: "sm" }}
                      fontWeight="medium"
                    >
                      2 Year Warranty
                    </Text>
                    <Text
                      fontSize={{ base: "2xs", md: "xs" }}
                      color="text.secondary"
                    >
                      Extended protection
                    </Text>
                  </Box>
                </Flex>
                <Flex align="center" gap={3}>
                  <Icon
                    as={LuRefreshCw}
                    boxSize={{ base: 5, md: 5 }}
                    color="blue.600"
                  />
                  <Box>
                    <Text
                      fontSize={{ base: "xs", md: "sm" }}
                      fontWeight="medium"
                    >
                      30-Day Returns
                    </Text>
                    <Text
                      fontSize={{ base: "2xs", md: "xs" }}
                      color="text.secondary"
                    >
                      Easy returns
                    </Text>
                  </Box>
                </Flex>
              </Grid>
            </VStack>
          </Box>
        </Grid>

        {/* Product Details Tabs */}
        <Card.Root bg="bg.primary" mt={{ base: 6, md: 8 }}>
          <Card.Body p={0}>
            <Tabs.Root defaultValue="specs">
              <Box overflowX="auto">
                <Tabs.List>
                  <Tabs.Trigger
                    value="specs"
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    Specifications
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="description"
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    Description
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="reviews"
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    Reviews
                  </Tabs.Trigger>
                </Tabs.List>
              </Box>

              <Box p={{ base: 4, md: 6 }}>
                <Tabs.Content value="specs">
                  {product.specs && (
                    <Stack gap={4} direction="column">
                      {Object.entries(product.specs).map(([key, value]) => (
                        <Flex
                          key={key}
                          justify="space-between"
                          py={2}
                          borderBottom="1px"
                          borderColor="border.primary"
                          flexDirection={{ base: "column", sm: "row" }}
                          gap={{ base: 1, sm: 0 }}
                        >
                          <Text
                            fontWeight="medium"
                            textTransform="capitalize"
                            fontSize={{ base: "sm", md: "md" }}
                          >
                            {key.replace(/([A-Z])/g, " $1").trim()}:
                          </Text>
                          <Text
                            color="text.secondary"
                            fontSize={{ base: "sm", md: "md" }}
                            textAlign={{ base: "left", sm: "right" }}
                          >
                            {value}
                          </Text>
                        </Flex>
                      ))}
                    </Stack>
                  )}
                </Tabs.Content>

                <Tabs.Content value="description">
                  <VStack align="stretch" gap={4}>
                    <Text fontSize={{ base: "sm", md: "md" }}>
                      {product.description}
                    </Text>
                    <Text
                      color="text.secondary"
                      fontSize={{ base: "sm", md: "md" }}
                    >
                      Experience cutting-edge technology with the {product.name}
                      . This device combines premium design with powerful
                      performance to deliver an exceptional user experience.
                      Whether you're a professional or an enthusiast, this
                      product offers the features and reliability you need.
                    </Text>
                    <Box>
                      <Heading size={{ base: "sm", md: "md" }} mb={3}>
                        Key Features
                      </Heading>
                      <VStack align="stretch" gap={2}>
                        <Text fontSize={{ base: "sm", md: "md" }}>
                          • Premium build quality and design
                        </Text>
                        <Text fontSize={{ base: "sm", md: "md" }}>
                          • Industry-leading performance
                        </Text>
                        <Text fontSize={{ base: "sm", md: "md" }}>
                          • Extended battery life
                        </Text>
                        <Text fontSize={{ base: "sm", md: "md" }}>
                          • Advanced security features
                        </Text>
                        <Text fontSize={{ base: "sm", md: "md" }}>
                          • Comprehensive warranty coverage
                        </Text>
                      </VStack>
                    </Box>
                  </VStack>
                </Tabs.Content>

                <Tabs.Content value="reviews">
                  <VStack align="stretch" gap={4}>
                    <Flex
                      justify="space-between"
                      align={{ base: "flex-start", sm: "center" }}
                      direction={{ base: "column", sm: "row" }}
                      gap={{ base: 2, sm: 0 }}
                    >
                      <Heading size={{ base: "sm", md: "md" }}>
                        Customer Reviews
                      </Heading>
                      <Button size={{ base: "xs", md: "sm" }} variant="outline">
                        Write a Review
                      </Button>
                    </Flex>
                    <Text
                      color="text.secondary"
                      fontSize={{ base: "sm", md: "md" }}
                    >
                      No reviews yet. Be the first to review this product!
                    </Text>
                  </VStack>
                </Tabs.Content>
              </Box>
            </Tabs.Root>
          </Card.Body>
        </Card.Root>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <Box mt={{ base: 8, md: 12 }}>
            <Heading size={{ base: "md", md: "lg" }} mb={{ base: 4, md: 6 }}>
              Related Products
            </Heading>
            <Grid
              templateColumns={{
                base: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)",
              }}
              gap={{ base: 4, md: 6 }}
            >
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Product;
