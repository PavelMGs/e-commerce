import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    semanticTokens: {
      colors: {
        bg: {
          primary: {
            value: { base: "{colors.white}", _dark: "{colors.gray.800}" },
          },
          secondary: {
            value: { base: "{colors.gray.100}", _dark: "{colors.gray.900}" },
          },
          hover: {
            value: { base: "{colors.gray.100}", _dark: "{colors.gray.700}" },
          },
        },
        border: {
          primary: {
            value: { base: "{colors.gray.200}", _dark: "{colors.gray.600}" },
          },
        },
        text: {
          secondary: {
            value: { base: "{colors.gray.600}", _dark: "{colors.gray.300}" },
          },
        },
        accent: {
          hover: {
            value: { base: "{colors.blue.500}", _dark: "{colors.blue.300}" },
          },
        },
      },
    },
  },
});

export default createSystem(defaultConfig, config);
