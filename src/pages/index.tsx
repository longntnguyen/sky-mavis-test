import type { NextPage } from "next";
import { Image, Box, Text, Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AssetContext, IAssetUseContext } from "@/providers/assets";

const defaultData = {
  quantity: 0,
  quantityVND: 0,
  name: "USD",
  imgUrl: "img/usd.png",
};

const LoginPage: NextPage = () => {
  const { assetsData } = useContext<IAssetUseContext>(AssetContext);
  const staticAsset =
    assetsData.find((assetItem) => assetItem.name === "USD") ?? defaultData;
  const router = useRouter();

  return (
    <Flex mt="24px" flexWrap="wrap" padding="0px 14px">
      <Box bgImage={`url("img/ronin-bg.png")`} w={336}>
        <Flex justifyContent="space-between">
          <Flex
            fontSize="12px"
            bg="#F7F9FC!important"
            p="6px"
            alignItems="center"
            gap="5px"
            fontWeight="bold"
            borderRadius="8px"
          >
            <Image w="8px" h="8px" src="img/ping.png" alt="ping" />
            <Text>Ronin Wallet</Text>
          </Flex>
          <Button p="6px">
            <Image
              w="24px"
              h="24px"
              src="img/person-fill.png"
              alt="person-fill"
            />
          </Button>
        </Flex>
        <Flex
          mt="20px"
          bg="linear-gradient(256.28deg, #1C94F4 0%, #1273EA 100%)"
          borderRadius="16px"
          p="20px"
          color="white"
          flexWrap="wrap"
        >
          <Flex
            w="full"
            alignItems="center"
            justifyContent="space-between"
            pb="2"
            borderBottom="1px solid #68b8f8"
          >
            <Flex gap="6px">
              <Text>My Wallet</Text>
              <Text color="#8DC9F9">(7300 3777 3888 3334)</Text>
            </Flex>
            <Image w="16px" h="16px" src="img/copy-icon.png" alt="copy" />
          </Flex>
          <Flex w="full" justifyContent="space-between" mt="12px">
            <Box>
              <Text as="h1" fontSize="32px" fontWeight="bold">
                {staticAsset?.quantity.toLocaleString()}{" "}
                {staticAsset?.name.toLocaleString()}
              </Text>
              <Text color="#8DC9F9">
                {(
                  staticAsset?.quantity * staticAsset?.quantityVND
                ).toLocaleString()}{" "}
                VND{" "}
              </Text>
            </Box>
            <Image
              mt="28px"
              w="40px"
              h="40px"
              src="img/ronin-white.png"
              alt="ronin-white"
            />
          </Flex>
        </Flex>
        <Flex
          w="full"
          alignItems="center"
          gap="24px"
          justifyContent="center"
          mt="28px"
        >
          <Box cursor="pointer" opacity={0.5}>
            <Button w="48px" h="48px" p="2px" boxShadow="none!important">
              <Image
                w="30px"
                h="30px"
                src="img/credit-card-fill.png"
                alt="credit-card-fill"
              />
            </Button>
            <Text textAlign="center" fontSize="12px" fontWeight="bold">
              Deposit
            </Text>
          </Box>
          <Box cursor="pointer" onClick={() => router.push("send-asset")}>
            <Button w="48px" h="48px" p="2px" boxShadow="none!important">
              <Image w="24px" h="24px" src="img/send.png" alt="send" />
            </Button>
            <Text textAlign="center" fontSize="12px" fontWeight="bold">
              Send
            </Text>
          </Box>
          <Box cursor="pointer" opacity={0.5}>
            <Button w="48px" h="48px" p="2px" boxShadow="none!important">
              <Image w="32px" h="32px" src="img/repeat.png" alt="repeat" />
            </Button>
            <Text textAlign="center" fontSize="12px" fontWeight="bold">
              Swap
            </Text>
          </Box>
        </Flex>
        <Text mt="10px" fontWeight="bold" fontSize="16px">
          Assets
        </Text>
        {assetsData?.map((assetItem) => {
          return assetItem.name === "USD" ? (
            <></>
          ) : (
            <Flex
              key={assetItem.name}
              mt="10px"
              p="16px 20px"
              alignItems="center"
              gap="16px"
              bg="#F7F9FC"
              borderRadius="8px"
              cursor="pointer"
              _hover={{
                bg: "#edf1f7",
              }}
            >
              <Image
                w="32px"
                h="32px"
                src={assetItem.imgUrl}
                alt={assetItem.imgUrl}
              />
              <Box>
                <Text fontWeight="bold" fontSize="16px">
                  {assetItem.quantity.toLocaleString()} {assetItem.name}
                </Text>
                <Text>
                  {(
                    assetItem.quantity * assetItem.quantityVND
                  ).toLocaleString()}{" "}
                  VND
                </Text>
              </Box>
            </Flex>
          );
        })}
      </Box>
    </Flex>
  );
};

export default LoginPage;
