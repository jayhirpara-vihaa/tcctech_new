import { values } from "lodash";
import React, { createContext, useState } from "react";

export const ProductDetailsContext = createContext({
  listedProduct: "",
  hoverMetal: "Gold",
  selectedMetal: "",
  caratValue: "",
  selectedCaratId: "",
  hoverToneName: "",
  selectedToneName: "",
  ringRotatingImages: [],
  showTones: true,
  ringSize: "",
  productId: 1,
  product: [],
  ringValue: "",
  metalId: 1,
  enquiryImage: "",
  diamondShape: "",
  updateHoverMetal: (value: string) => { },
  updateSelectedMetal: (value: string) => { },
  updateListedProduct: (vlaue: string) => { },
  updateCaratValue: (value: string) => { },
  updateSelectedCaratId: (value: string) => { },
  updateSelectedToneName: (value: string) => { },
  updateHoverToneName: (value: string) => { },
  updateRingRotatingImages: (value: string[]) => { },
  updateShowTones: (value: boolean) => { },
  updateProductId: (value: number) => { },
  updateProduct: (value: any) => { },
  updateRingSize: (value: string) => { },
  updateRingValue: (value: string) => { },
  updateMetalId: (value: number) => { },
  updateEnquiryImage: (value: any) => { },
  updateDiamondShape: (value: string) => { },
});

function ProductDetailsProvider({ children }: any) {
  const [listedProduct, setListedProduct] = useState("");
  const [hoverMetal, setHoverMetal] = useState("");
  const [selectedMetal, setSelectedMetal] = useState("Gold");
  const [caratValue, setCaratValue] = useState("");
  const [selectedCaratId, setSelectedCaratId] = useState();
  const [hoverToneName, setHoverToneName] = useState("");
  const [selectedToneName, setSelectedToneName] = useState("");
  const [ringRotatingImages, setRingRotatingImages] = useState([]);
  const [showTones, setShowTones] = useState(true);
  const [ringValue, setRingValue] = useState("");
  const [ringSize, setRingSize] = useState("");
  const [diamondShape, setDiamondShape] = useState("");
  const [productId, setProductId] = useState(1);
  const [product, setProduct] = useState({});
  const [metalId, setMetalId] = useState(1);
  const [enquiryImage, setEnquiryImage] = useState("");

  const updateListedProduct = (value: string) => {
    setListedProduct(value);
  };
  const updateSelectedMetal = (value: string) => {
    setSelectedMetal(value);
  };
  const updateHoverMetal = (value: string) => {
    setHoverMetal(value);
  };
  const updateCaratValue = (value: string) => {
    setCaratValue(value);
  };
  const updateSelectedCaratId = (value: string) => {
    setSelectedCaratId(value);
  };
  const updateSelectedToneName = (value: string) => {
    setSelectedToneName(value);
  };
  const updateHoverToneName = (value: string) => {
    setHoverToneName(value);
  };
  const updateRingRotatingImages = (value: string[]) => {
    setRingRotatingImages(value);
  };
  const updateShowTones = (value: boolean) => {
    setShowTones(value);
  };
  const updateProductId = (value: number) => {
    setProductId(value);
  };
  const updateProduct = (value: any) => {
    setProduct(value);
  };
  const updateRingSize = (value: string) => {
    setRingSize(value);
  };
  const updateRingValue = (value: string) => {
    setRingValue(value);
  };
  const updateMetalId = (value: number) => {
    setMetalId(value);
  };
  const updateEnquiryImage = (value: any) => {
    setEnquiryImage(value);
  };
  const updateDiamondShape = (value: string) => {
    setDiamondShape(value);
  };

  return (
    <ProductDetailsContext.Provider
      value={{
        listedProduct,
        hoverMetal,
        selectedMetal,
        caratValue,
        selectedCaratId,
        hoverToneName,
        selectedToneName,
        ringRotatingImages,
        showTones,
        ringSize,
        product,
        productId,
        ringValue,
        metalId,
        diamondShape,
        enquiryImage,
        updateHoverMetal,
        updateSelectedMetal,
        updateListedProduct,
        updateCaratValue,
        updateSelectedCaratId,
        updateSelectedToneName,
        updateHoverToneName,
        updateRingRotatingImages,
        updateShowTones,
        updateRingSize,
        updateProductId,
        updateProduct,
        updateRingValue,
        updateMetalId,
        updateDiamondShape,
        updateEnquiryImage,
      }}
    >
      {children}
    </ProductDetailsContext.Provider>
  );
}

export default ProductDetailsProvider;
