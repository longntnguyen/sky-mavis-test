import type { AppProps } from "next/app";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { AssetProvider } from "@/providers/assets";
import { useEffect } from "react";
import { authenticate } from "@/utils/authenticate";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const isVerify = authenticate();
    if (!isVerify) router.push("/login");
    else router.push("/");
  }, []);

  return (
    <ChakraProvider>
      <AssetProvider>
        <Box w={375} m="auto">
          <Component {...pageProps} />
        </Box>
      </AssetProvider>
    </ChakraProvider>
  );
}

export default MyApp;
