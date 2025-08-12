"use client"

import { ChakraProvider as ProviderBase } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "@/app/config/colorMode"
import system from "@/app/config/theme"

const ChakraProvider = (props: ColorModeProviderProps) => {
  return (
    <ProviderBase value={system}>
      <ColorModeProvider {...props} />
    </ProviderBase>
  );
}

export default ChakraProvider
