import ChakraProvider from "./chakraProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};

export default Providers;
