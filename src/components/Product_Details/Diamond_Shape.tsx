import Image from "next/image";
import type { FC } from "react";
import { useState, useContext, useEffect } from "react";
import { DiamondShapeContext } from "../../contexts/diamond_shape/diamond-shape.context";
import { FilterDataType, Product } from "@framework/types";
import { useFilterQuery } from "@framework/main_filters/main-filters";

interface ProductProps {
  product: Product;
  className?: string;
  contactClassName?: string;
  imageContentClassName?: string;
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

const DiamondShape: FC<ProductProps> = ({ product }) => {
  const [hoverShape, setHoverShape] = useState("");
  const [selectedShape, setSelectedShape] = useState<string>(
    product?.selectedShape ?? ""
  );
  const { updateShape } = useContext(DiamondShapeContext);
  const { data: diamondShape } = useFilterQuery();

  const diamondShapeData = diamondShape?.data?.diamondShapeData;
  const ImageUrl = process.env.NEXT_PUBLIC_IMG_URL;
  useEffect(() => {
    updateShape(selectedShape);
  }, [selectedShape]);

  return (
    <div>
      <div className="mt-10">
        <span className="TCC-product-text-diamond-shape">
          View with Diamond Shape:
        </span>
        <span> {hoverShape === "" ? selectedShape : hoverShape}</span>
        <div className="flex mt-3">
          {diamondShapeData?.map((value: FilterDataType) => {
            return (
              <span
                className={`mr-5 cursor-pointer border-b ${
                  selectedShape === value?.name &&
                  "border-headerSecondaryTextColor"
                }`}
              >
                <Image
                  id={value.id as unknown as string}
                  src={`${ImageUrl}${value.image_path}`}
                  alt={value?.name}
                  width={80}
                  height={80}
                  onMouseOver={(e: any) => setHoverShape(e?.target?.alt)}
                  onMouseOut={() => setHoverShape("")}
                  onClick={(e: any) => setSelectedShape(e?.target?.alt)}
                  quality={100}
                  className="w-full transition duration-200 ease-in"
                />
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DiamondShape;
