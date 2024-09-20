import Image from "next/image";
import { FC, MouseEvent, useContext, useEffect } from "react";
import { useState } from "react";

import { FilterDataType, Product } from "@framework/types";
import { ProductDetailsContext } from "@contexts/productDetails/product-Details-Context";

interface ProductProps {
  product: FilterDataType[] | undefined;
  className?: string;
  contactClassName?: string;
  imageContentClassName?: string;
  variant?:
    | "grid"
    | "gridSlim"
    | "list"
    | "listSmall"
    | "gridModern"
    | "gridModernWide"
    | "gridTrendy"
    | "rounded"
    | "circle";
  imgWidth?: number | string;
  imgHeight?: number | string;
  imgLoading?: "eager" | "lazy";
  hideProductDescription?: boolean;
  showCategory?: boolean;
  showRating?: boolean;
  bgTransparent?: boolean;
  bgGray?: boolean;
  demoVariant?: "ancient";
  disableBorderRadius?: boolean;
}

const ProductCard: FC<ProductProps> = ({ product }) => {
  type InputEvent = MouseEvent<HTMLImageElement, MouseEvent>;

  const {
    hoverMetal,
    selectedMetal,
    hoverToneName,
    selectedToneName,
    updateSelectedMetal,
    updateHoverMetal,
    updateSelectedToneName,
    updateHoverToneName,
  } = useContext(ProductDetailsContext);

  const imageUrl = process.env.NEXT_PUBLIC_IMG_URL;

  // useEffect(() => {
  //   if(product?.length >= 0){
  //     updateSelectedMetal(`${product[0]?.name}`)
  //   }
  // },[product])

  const handleHoverMetal = (e: any) => {
    updateHoverMetal(e.target.id);
    updateHoverToneName(e.target.alt);
  };

  const handleOutHoverMetal = () => {
    updateHoverMetal("");
    updateHoverToneName("");
  };

  const handleSelectedMetal = (e: any) => {
    updateSelectedMetal(e.target.id);
    updateSelectedToneName(e.target.alt);
  };

  return (
    <div>
      <div>
        <span className="TCC-product-text-diamond-shape">Metal Tone:</span>
        <span> {hoverMetal === "" ? selectedToneName : hoverToneName}</span>
        {/* <span>{toneName}</span> */}
        <div className="flex mt-3 gap-3 cursor-pointer">
          {product?.map((value: any) => {
            return (
              <span
                key={`tone-${value.id}`}
                className={`border-2 rounded-full h-7 w-7 ${
                  `${hoverMetal}` === `${value?.id}` ||
                  `${selectedMetal}` === `${value?.id}`
                    ? "border-headerSecondaryTextColor"
                    : ""
                }`}
              >
                <Image
                  id={`${value.id}`}
                  src={`${imageUrl}${value.image_path}`}
                  alt={value?.name}
                  width={24}
                  height={24}
                  onMouseOver={handleHoverMetal}
                  onMouseOut={handleOutHoverMetal}
                  onClick={handleSelectedMetal}
                  quality={100}
                  className="metal-tone-imgdiv w-full transition duration-200 ease-in"
                />
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
