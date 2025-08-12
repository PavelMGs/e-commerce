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
      <Container maxW="container.xl" py={16}>
        <Flex direction="column" align="center" justify="center" minH="50vh">
          <Heading size="lg" mb={4}>
            Product Not Found
          </Heading>
          <Text color="text.secondary" mb={8}>
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
        <Container maxW="container.xl" py={3}>
          <Flex align="center" gap={2} color="text.secondary" fontSize="sm">
            <Link href="/">
              <Text _hover={{ color: "accent.hover" }}>Home</Text>
            </Link>
            <Icon as={LuChevronRight} boxSize={4} />
            <Link href={`/category/${product.category?.toLowerCase()}`}>
              <Text _hover={{ color: "accent.hover" }}>{product.category}</Text>
            </Link>
            <Icon as={LuChevronRight} boxSize={4} />
            <Text color="fg">{product.name}</Text>
          </Flex>
        </Container>
      </Box>

      {/* Main Product Section */}
      <Container maxW="container.xl" py={8}>
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>
          {/* Product Images */}
          <Box>
            <Card.Root bg="bg.primary">
              <Card.Body p={8}>
                <Box
                  h="400px"
                  bg="bg.secondary"
                  borderRadius="lg"
                  mb={4}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text color="text.secondary">Product Image</Text>
                </Box>
                <Grid templateColumns="repeat(4, 1fr)" gap={2}>
                  {images.map((img, index) => (
                    <Box
                      key={index}
                      h="80px"
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
                      <Text fontSize="xs" color="text.secondary">
                        Image {index + 1}
                      </Text>
                    </Box>
                  ))}
                </Grid>
              </Card.Body>
            </Card.Root>
          </Box>

          {/* Product Info */}
          <Box>
            <VStack align="stretch" gap={6}>
              {/* Title and Price */}
              <Box>
                {product.brand && (
                  <Text
                    fontSize="sm"
                    color="text.secondary"
                    textTransform="uppercase"
                    mb={2}
                  >
                    {product.brand}
                  </Text>
                )}
                <Heading size="xl" mb={3}>
                  {product.name}
                </Heading>

                <Flex align="center" gap={4} mb={4}>
                  <HStack>
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        as={LuStar}
                        boxSize={5}
                        fill={i < Math.floor(product.rating) ? "gold" : "none"}
                        color={
                          i < Math.floor(product.rating) ? "gold" : "gray.400"
                        }
                      />
                    ))}
                  </HStack>
                  <Text fontSize="sm" color="text.secondary">
                    {product.rating} out of 5
                  </Text>
                </Flex>

                <Flex align="baseline" gap={3} mb={4}>
                  <Text fontSize="3xl" fontWeight="bold" color="blue.600">
                    ${product.price}
                  </Text>
                  <Text
                    fontSize="lg"
                    color="text.secondary"
                    textDecoration="line-through"
                  >
                    ${Math.round(product.price * 1.2)}
                  </Text>
                  <Badge colorScheme="green" size="lg">
                    Save 20%
                  </Badge>
                </Flex>

                {product.description && (
                  <Text color="text.secondary" mb={4}>
                    {product.description}
                  </Text>
                )}
              </Box>

              {/* Stock Status */}
              <Box>
                {product.inStock ? (
                  <Badge colorScheme="green" size="lg" mb={4}>
                    ✓ In Stock
                  </Badge>
                ) : (
                  <Badge colorScheme="red" size="lg" mb={4}>
                    Out of Stock
                  </Badge>
                )}
              </Box>

              {/* Quantity and Actions */}
              <Flex gap={4} align="center">
                <Box>
                  <Text fontSize="sm" mb={2} fontWeight="medium">
                    Quantity:
                  </Text>
                  <Select.Root
                    collection={quantityOptions}
                    size="md"
                    width="100px"
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
                  size="lg"
                  flex={1}
                  disabled={!product.inStock}
                >
                  <Icon as={LuShoppingCart} mr={2} />
                  Add to Cart
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsFavorite(!isFavorite)}
                  colorScheme={isFavorite ? "red" : "gray"}
                >
                  <Icon
                    as={LuHeart}
                    fill={isFavorite ? "currentColor" : "none"}
                  />
                </Button>

                <Button variant="outline" size="lg">
                  <LuShare2 />
                </Button>
              </Flex>

              {/* Features */}
              <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                <Flex align="center" gap={3}>
                  <Icon as={LuTruck} boxSize={5} color="blue.600" />
                  <Box>
                    <Text fontSize="sm" fontWeight="medium">
                      Free Delivery
                    </Text>
                    <Text fontSize="xs" color="text.secondary">
                      2-3 business days
                    </Text>
                  </Box>
                </Flex>
                <Flex align="center" gap={3}>
                  <Icon as={LuShield} boxSize={5} color="blue.600" />
                  <Box>
                    <Text fontSize="sm" fontWeight="medium">
                      2 Year Warranty
                    </Text>
                    <Text fontSize="xs" color="text.secondary">
                      Extended protection
                    </Text>
                  </Box>
                </Flex>
                <Flex align="center" gap={3}>
                  <Icon as={LuRefreshCw} boxSize={5} color="blue.600" />
                  <Box>
                    <Text fontSize="sm" fontWeight="medium">
                      30-Day Returns
                    </Text>
                    <Text fontSize="xs" color="text.secondary">
                      Easy returns
                    </Text>
                  </Box>
                </Flex>
              </Grid>
            </VStack>
          </Box>
        </Grid>

        {/* Product Details Tabs */}
        <Card.Root bg="bg.primary" mt={8}>
          <Card.Body p={0}>
            <Tabs.Root defaultValue="specs">
              <Tabs.List>
                <Tabs.Trigger value="specs">Specifications</Tabs.Trigger>
                <Tabs.Trigger value="description">Description</Tabs.Trigger>
                <Tabs.Trigger value="reviews">Reviews</Tabs.Trigger>
              </Tabs.List>

              <Box p={6}>
                <Tabs.Content value="specs">
                  {product.specs && (
                    <Grid
                      templateColumns={{ base: "1fr", md: "1fr 1fr" }}
                      gap={4}
                    >
                      {Object.entries(product.specs).map(([key, value]) => (
                        <Flex
                          key={key}
                          justify="space-between"
                          py={2}
                          borderBottom="1px"
                          borderColor="border.primary"
                        >
                          <Text fontWeight="medium" textTransform="capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}:
                          </Text>
                          <Text color="text.secondary">{value}</Text>
                        </Flex>
                      ))}
                    </Grid>
                  )}
                </Tabs.Content>

                <Tabs.Content value="description">
                  <VStack align="stretch" gap={4}>
                    <Text>{product.description}</Text>
                    <Text color="text.secondary">
                      Experience cutting-edge technology with the {product.name}
                      . This device combines premium design with powerful
                      performance to deliver an exceptional user experience.
                      Whether you're a professional or an enthusiast, this
                      product offers the features and reliability you need.
                    </Text>
                    <Box>
                      <Heading size="md" mb={3}>
                        Key Features
                      </Heading>
                      <VStack align="stretch" gap={2}>
                        <Text>• Premium build quality and design</Text>
                        <Text>• Industry-leading performance</Text>
                        <Text>• Extended battery life</Text>
                        <Text>• Advanced security features</Text>
                        <Text>• Comprehensive warranty coverage</Text>
                      </VStack>
                    </Box>
                  </VStack>
                </Tabs.Content>

                <Tabs.Content value="reviews">
                  <VStack align="stretch" gap={4}>
                    <Flex justify="space-between" align="center">
                      <Heading size="md">Customer Reviews</Heading>
                      <Button size="sm" variant="outline">
                        Write a Review
                      </Button>
                    </Flex>
                    <Text color="text.secondary">
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
          <Box mt={12}>
            <Heading size="lg" mb={6}>
              Related Products
            </Heading>
            <Grid
              templateColumns={{
                base: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)",
              }}
              gap={6}
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
