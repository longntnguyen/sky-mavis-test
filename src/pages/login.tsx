import type { NextPage } from "next";
import {
  Image,
  Box,
  Text,
  InputGroup,
  InputRightElement,
  Input,
  Button,
  Flex,
  FormControl,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useRouter } from "next/router";

const LoginPage: NextPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSumitted, setIsSumitted] = useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleOnSubmit = () => {
    if (password.length > 5) {
      setIsSumitted(false);
      localStorage.setItem("isVerify", "true");
      router.push("/");
    } else setIsSumitted(true);
  };

  return (
    <Flex mt={62} flexWrap="wrap">
      <Box bgImage={`url("img/ronin-bg.png")`} w={336} h={205} m="0px 20px">
        <Image w={160} m="auto" src="img/ronin-logo.png" alt="logo" />
      </Box>
      <Text
        w="full"
        as="h2"
        fontSize="32px"
        fontWeight="bold"
        textAlign="center"
      >
        Ronin Wallet
      </Text>
      <Text w="full" as="p" fontSize="14px" textAlign="center">
        Your Digital Passport
      </Text>

      <Box w="full" m="20px">
        <Text
          mb="8px"
          ml={2}
          as="span"
          fontWeight="bold"
          fontSize="10px"
          textTransform="uppercase"
        >
          Enter password
        </Text>
        <FormControl isInvalid={password.length <= 5 && isSumitted}>
          <InputGroup>
            <Input
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Type your password"
              type={showPassword ? "text" : "password"}
            />
            <InputRightElement
              cursor="pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <ViewOffIcon color="#231F20" />
              ) : (
                <ViewIcon color="#231F20" />
              )}
            </InputRightElement>
          </InputGroup>
          {password.length <= 5 && isSumitted && (
            <Text color="red.400">Password length must greater than 5</Text>
          )}
        </FormControl>
      </Box>
      <Button
        bg="linear-gradient(256.28deg, #1C94F4 0%, #1273EA 100%)"
        m="10px auto"
        borderRadius="8px"
        color="white"
        _hover={{
          bg: "linear-gradient(256.28deg, #1C94F4 0%, #1273EA 100%)",
        }}
        _active={{
          bg: "linear-gradient(256.28deg, #1C94F4 0%, #1273EA 100%)",
        }}
        onClick={handleOnSubmit}
      >
        Unlock
      </Button>
    </Flex>
  );
};

export default LoginPage;
