"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  createListCollection,
  Portal,
  Select,
  Slider,
  Flex,
  IconButton,
  HStack,
  Grid,
  Card,
  Field,
  Drawer,
} from "@chakra-ui/react";
import { LuFilter, LuGrid3X3, LuList } from "react-icons/lu";
import ProductCard from "@/shared/ui/ProductCard/ProductCard";
import { mockProducts } from "@/entities/product/mock";

const Category = () => {
  const { category } = useParams<{ category: string }>() || {};
  const [sortBy, setSortBy] = useState(["name"]);
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const sortersCollection = useMemo(
    () =>
      createListCollection({
        items: [
          { label: "Name", value: "name" },
          { label: "Price: Low to High", value: "price-low" },
          { label: "Price: High to Low", value: "price-high" },
          { label: "Highest Rated", value: "rating" },
        ],
      }),
    []
  );

  const products = useMemo(() => {
    let filteredProducts = [...mockProducts];

    if (category) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category?.toLowerCase() === category.toLowerCase()
      );
    }

    filteredProducts = filteredProducts.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    return filteredProducts.sort((a, b) => {
      switch (sortBy[0]) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [category, priceRange, sortBy]);

  const categoryTitle = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "Products";

  return (
    <Box minH="100vh" bg="bg.secondary">
      <Container maxW="container.xl" px={4} py={8}>
        <Flex
          direction={{ base: "column", lg: "row" }}
          align={{ base: "start", lg: "center" }}
          justify="space-between"
          mb={8}
        >
          <Box mb={{ base: 4, lg: 0 }}>
            <Heading size="lg" mb={2}>
              {categoryTitle}
            </Heading>
            <Text color="text.secondary">
              Showing {products.length} products
            </Text>
          </Box>

          <Flex align="center" gap={4} mt={{ base: 4, lg: 0 }}>
            <HStack bg="bg.hover" borderRadius="lg" p={1}>
              <IconButton
                size="sm"
                variant={viewMode === "grid" ? "solid" : "ghost"}
                colorPalette={viewMode === "grid" ? "blue" : "gray"}
                onClick={() => setViewMode("grid")}
              >
                <LuGrid3X3 />
              </IconButton>
              <IconButton
                size="sm"
                variant={viewMode === "list" ? "solid" : "ghost"}
                colorPalette={viewMode === "list" ? "blue" : "gray"}
                onClick={() => setViewMode("list")}
              >
                <LuList />
              </IconButton>
            </HStack>

            <Select.Root
              collection={sortersCollection}
              size="sm"
              width="200px"
              value={sortBy}
              onValueChange={(details) => setSortBy(details.value)}
            >
              <Select.HiddenSelect />
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Sort by" />
                  <Select.Indicator />
                </Select.Trigger>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {sortersCollection.items.map((sorter) => (
                      <Select.Item item={sorter} key={sorter.value}>
                        {sorter.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>

            <Box display={{ base: "block", lg: "none" }}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDrawerOpen(true)}
              >
                <LuFilter />
                Filters
              </Button>
            </Box>
          </Flex>
        </Flex>

        <Flex direction={{ base: "column", lg: "row" }} gap={8}>
          <Box display={{ base: "none", lg: "block" }} w="256px">
            <FilterContent
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
          </Box>

          <Box flex={1}>
            {products.length === 0 ? (
              <Flex justify="center" py={12}>
                <Text color="text.secondary" fontSize="lg">
                  No products found matching your criteria.
                </Text>
              </Flex>
            ) : (
              <Grid
                templateColumns={
                  viewMode === "grid"
                    ? {
                        base: "1fr",
                        sm: "repeat(2, 1fr)",
                        xl: "repeat(3, 1fr)",
                      }
                    : "1fr"
                }
                gap={6}
              >
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </Grid>
            )}
          </Box>
        </Flex>
      </Container>

      <Drawer.Root
        open={drawerOpen}
        placement="start"
        onOpenChange={(e) => setDrawerOpen(e.open)}
      >
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Filters</Drawer.Title>
              <Drawer.CloseTrigger />
            </Drawer.Header>
            <Drawer.Body>
              <FilterContent
                priceRange={priceRange}
                setPriceRange={setPriceRange}
              />
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </Box>
  );
};

const FilterContent = ({
  priceRange,
  setPriceRange,
}: {
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
}) => (
  <Card.Root bg="bg.primary">
    <Card.Body p={6}>
      <Heading size="md" mb={4}>
        Filters
      </Heading>

      <Box spaceY={4}>
        <Field.Root>
          <Field.Label fontSize="sm" fontWeight="medium">
            Price Range
          </Field.Label>
          <Box mt={2} mb={4} width="full">
            <Slider.Root
              value={priceRange}
              onValueChange={(e) => setPriceRange(e.value)}
              min={0}
              max={3000}
              step={50}
            >
              <Slider.Control>
                <Slider.Track>
                  <Slider.Range />
                </Slider.Track>
                <Slider.Thumbs />
              </Slider.Control>
            </Slider.Root>
          </Box>
          <Flex width="1/3" marginLeft="auto" marginRight="auto">
            <Text fontSize="sm" color="text.secondary">
              ${priceRange[0]}-${priceRange[1]}
            </Text>
          </Flex>
        </Field.Root>
      </Box>
    </Card.Body>
  </Card.Root>
);

export default Category;
