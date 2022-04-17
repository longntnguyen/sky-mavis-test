import {
  Image,
  Box,
  Text,
  Flex,
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { FC, useContext } from "react";
import { AssetContext, IAsset, IAssetUseContext } from "@/providers/assets";

interface IAssetModal {
  isOpen: boolean;
  onChangeAssetSelected: (data: IAsset) => void;
  onClose: () => void;
}

const AssetModal: FC<IAssetModal> = ({
  isOpen,
  onClose,
  onChangeAssetSelected,
}) => {
  const { assetsData } = useContext<IAssetUseContext>(AssetContext);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent h="560px">
          <ModalHeader textAlign="center" borderBottom="1px solid #C5CEE0">
            Assets
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {assetsData?.map((assetItem) => (
              <Flex
                key={assetItem.name}
                onClick={() => {
                  onChangeAssetSelected(assetItem);
                  onClose();
                }}
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
                <Image w="32px" h="32px" src={assetItem.imgUrl} alt="repeat" />
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
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AssetModal;
