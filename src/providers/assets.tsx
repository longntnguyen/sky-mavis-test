import React, { ReactNode, useState } from "react";

export const AssetContext = React.createContext({
  assetsData: [],
  assetSelected: {},
  staticAsset: {},
  onChangeAssetSelected: (data: IAsset) => {},
  onChangeAssetsData: (data: IAsset[]) => {},
} as unknown as IAssetUseContext);

const defaultData: IAsset[] = [
  { name: "USD", quantity: 1000, quantityVND: 23000, imgUrl: "img/usd.png" },
  { name: "EUR", quantity: 50, quantityVND: 24759, imgUrl: "img/euro.png" },
  { name: "YEN", quantity: 10000, quantityVND: 181, imgUrl: "img/yen.png" },
];

export interface IAsset {
  name: string;
  quantity: number;
  quantityVND: number;
  imgUrl: string;
}

interface IAssetProvider {
  children: ReactNode;
}

export interface IAssetUseContext {
  assetsData: IAsset[];
  assetSelected: IAsset;
  onChangeAssetSelected: (data: IAsset) => void;
  onChangeAssetsData: (data: IAsset[]) => void;
}

export const AssetProvider = ({ children }: IAssetProvider) => {
  const [assetsData, setAssetsData] = useState(defaultData);
  const [assetSelected, setAssetSelected] = useState(defaultData[0]);

  const onChangeAssetSelected = (data: IAsset) => {
    setAssetSelected(data);
  };

  const onChangeAssetsData = (data: IAsset[]) => {
    console.log(data);
    setAssetsData([...data]);
  };

  const value: IAssetUseContext = {
    assetsData,
    assetSelected,
    onChangeAssetSelected,
    onChangeAssetsData,
  };

  return (
    <AssetContext.Provider value={value}>{children}</AssetContext.Provider>
  );
};
