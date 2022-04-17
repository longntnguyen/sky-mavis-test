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
  Badge,
  useDisclosure,
  FormControl,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import AssetModal from "@/components/AssetModal";
import NotifyModal from "@/components/NotifyModal";
import { useRouter } from "next/router";
import { AssetContext, IAsset, IAssetUseContext } from "@/providers/assets";
import { useFormik } from "formik";
import * as yup from "yup";

interface IForm {
  from: string;
  to: string;
  amount: number | string;
  asset: string;
}

const SendAsset: NextPage = () => {
  const router = useRouter();
  const modaAssetlDcs = useDisclosure();
  const modalNotifyDcs = useDisclosure();
  const {
    onChangeAssetsData,
    onChangeAssetSelected,
    assetSelected,
    assetsData,
  } = useContext<IAssetUseContext>(AssetContext);
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      amount: yup
        .number()
        .required("Required")
        .max(assetSelected.quantity)
        .min(0),
      to: yup.string().required("Required").min(10),
    }),
    initialValues: {
      to: "",
      amount: "",
      from: "",
      asset: assetSelected.name,
    },
    onSubmit: (value: IForm) => {
      let newAssetItem = {
        ...assetSelected,
        quantity: assetSelected.quantity - +value.amount,
      };
      const newData: IAsset[] = assetsData.map((assetItem) => {
        return assetItem.name === assetSelected.name ? newAssetItem : assetItem;
      });
      onChangeAssetSelected(newAssetItem);
      onChangeAssetsData(newData);
      modalNotifyDcs.onToggle();
      formik.resetForm();
    },
  });

  const backHomePage = () => {
    router.push("/");
  };

  return (
    <Flex padding="0px 14px" flexDir="column">
      <AssetModal
        isOpen={modaAssetlDcs.isOpen}
        onClose={() => modaAssetlDcs.onToggle()}
        onChangeAssetSelected={(data) => onChangeAssetSelected(data)}
      />
      <NotifyModal
        isOpen={modalNotifyDcs.isOpen}
        onClose={() => modalNotifyDcs.onToggle()}
      />
      <Flex
        w="full"
        h="56px"
        alignItems="center"
        boxShadow=" 0px 4px 12px #F7F9FC;"
      >
        <Button
          bg="none"
          boxShadow="none!important"
          p="10px"
          position="absolute"
          onClick={backHomePage}
        >
          <Image w="24px" h="24px" src="img/chevron-left.png" alt="repeat" />
        </Button>
        <Text fontSize="14px" textAlign="center" fontWeight="bold" w="full">
          Send Assets
        </Text>
      </Flex>
      <form onSubmit={formik.handleSubmit}>
        <Flex
          w="full"
          h="534px"
          flexDir="column"
          mt="24px"
          gap="20px"
          flex=" 1 1 0%"
        >
          <Box w="full">
            <Text
              mb="8px"
              ml={2}
              as="span"
              fontWeight="bold"
              fontSize="10px"
              textTransform="uppercase"
              color="#57627B"
            >
              Form
            </Text>
            <Flex
              bg="#edf1f7"
              gap="10px"
              p="10px 16px"
              borderRadius="8px"
              cursor="not-allowed"
            >
              <Text color="#8f9bb3" fontWeight="bold" fontSize="14px">
                My Wallet
              </Text>
              <Text color="#8f9bb3" fontSize="14px">
                (7300...3334)
              </Text>
            </Flex>
          </Box>
          <FormControl
            w="full"
            isInvalid={!!formik.errors.to && formik.submitCount > 0}
          >
            <Text
              mb="8px"
              ml={2}
              as="span"
              fontWeight="bold"
              fontSize="10px"
              textTransform="uppercase"
              color="#57627B"
            >
              To
            </Text>
            <Input
              onChange={formik.handleChange}
              value={formik.values.to}
              name="to"
              p="10px 16px"
              border="0px solid"
              boxShadow=" 0 0 0 1px #c5cee0 inset,0 0 0 2px transparent;"
            />
            {formik.errors.to && formik.submitCount > 0 && (
              <Text color="red.400">{formik.errors.to}</Text>
            )}
          </FormControl>
          <Box w="full">
            <Text
              mb="8px"
              ml={2}
              as="span"
              fontWeight="bold"
              fontSize="10px"
              textTransform="uppercase"
              color="#57627B"
            >
              Asset
            </Text>
            <Flex
              border="1px solid #C5CEE0"
              gap="10px"
              p="10px 16px"
              borderRadius="8px"
              cursor="text"
              justifyContent="space-between"
              onClick={modaAssetlDcs.onToggle}
            >
              <Flex gap="10px">
                <Image
                  w="24px"
                  h="24px"
                  src={assetSelected.imgUrl}
                  alt="repeat"
                />
                <Text fontSize="16px" fontWeight="normal">
                  {assetSelected.name}
                </Text>
              </Flex>
              <Image w="24px" h="24px" src="img/layers.png" alt="repeat" />
            </Flex>
          </Box>
          <FormControl
            w="full"
            isInvalid={!!formik.errors.amount && formik.submitCount > 0}
          >
            <Flex justifyContent="space-between">
              <Text
                mb="8px"
                ml={2}
                as="span"
                fontWeight="bold"
                fontSize="10px"
                textTransform="uppercase"
                color="#57627B"
              >
                Amount
              </Text>
              <Text
                mb="8px"
                ml={2}
                as="span"
                fontWeight="bold"
                fontSize="10px"
                textTransform="uppercase"
                mr="10px"
              >
                Available: {assetSelected.quantity.toLocaleString()}{" "}
                {assetSelected.name}
              </Text>
            </Flex>
            <InputGroup>
              <Input
                value={formik.values.amount}
                name="amount"
                type="number"
                p="10px 16px"
                pr="55px"
                border="0px solid"
                boxShadow=" 0 0 0 1px #c5cee0 inset,0 0 0 2px transparent;"
                onChange={formik.handleChange}
              />
              <InputRightElement
                cursor="pointer"
                mr="12px"
                onClick={() =>
                  formik.setFieldValue("amount", assetSelected.quantity)
                }
              >
                <Badge borderRadius="10px" p="6px">
                  Max
                </Badge>
              </InputRightElement>
            </InputGroup>
            {formik.errors.amount && formik.submitCount > 0 && (
              <Text color="red.400">{formik.errors.amount}</Text>
            )}
          </FormControl>
          <Flex w="full" mt="auto">
            <Button w="50%" color="#1273ea" mr="8px" onClick={backHomePage}>
              Cancel
            </Button>
            <Button
              type="submit"
              w="50%"
              color="white"
              bgImage="linear-gradient(256.28deg, #1c94f4 0%, #1273ea 100%);"
              _hover={{
                bgImage:
                  "linear-gradient( 76.28deg, #1c94f4 0%, #1273ea 100% )",
              }}
              _active={{
                bgImage:
                  "linear-gradient(256.28deg, #1c94f4 0%, #1273ea 100%);",
              }}
            >
              Next
            </Button>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
};

export default SendAsset;
