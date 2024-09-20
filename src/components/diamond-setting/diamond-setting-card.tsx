import cn from "classnames";
import Image from "next/image";
import type { ChangeEvent, FC, MouseEvent } from "react";
import { useEffect } from "react";
import { DiamondSettingContext } from "../../contexts/diamond_setting/diamond-setting-context";
import { useState } from "react";
import { Settings } from "@framework/types";
import { useContext } from "react";

interface SettingProps {
  setting: Settings;
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
    | "setting"
    | "circle";
  imgWidth?: number | string;
  imgHeight?: number | string;
  imgLoading?: "eager" | "lazy";
  hidesettingDescription?: boolean;
  showCategory?: boolean;
  showRating?: boolean;
  bgTransparent?: boolean;
  bgGray?: boolean;
  demoVariant?: "ancient";
  disableBorderRadius?: boolean;
}

const settingCard: FC<SettingProps> = ({
  setting,
  className = "",
  imageContentClassName = "",
  variant = "list",
  imgWidth = 300,
  imgHeight = 300,
  imgLoading,
  bgTransparent = false,
  bgGray = false,
  disableBorderRadius = false,
}) => {
  type InputEvent = MouseEvent<HTMLImageElement, MouseEvent>;

  // const { openModal, setModalView, setModalData } = useUI();
  const [isHoveringImg, setIsHoveringImg] = useState(false);
  // const { FirstValue, SecondValue, MinPrice, MaxPrice } = useContext(DiamondSettingContext);

  const handleImageOver = () => {
    setIsHoveringImg(true);
  };

  const handleImageOut = () => {
    setIsHoveringImg(false);
  };

  function showImage() {
    return (
      <Image
        src={
          isHoveringImg ? setting?.image?.thumbnail : setting?.image?.original
        }
        width={variant === "setting" ? 220 : imgWidth}
        height={variant === "setting" ? 250 : imgHeight}
        loading={imgLoading}
        onMouseOver={handleImageOver}
        onMouseOut={handleImageOut}
        quality={100}
        alt={"setting Image"}
      />
    );
  }

  // if (setting?.carats < SecondValue && setting?.carats > FirstValue) {

  // }

  return (
    <div
      className={cn(
        `group box-border overflow-hidden flex  ${
          !disableBorderRadius && "rounded-md"
        } cursor-pointer ${
          variant === "setting" ? "border border-[#FFC200] py-5 px-5" : ""
        }`,
        {
          "pb-2 lg:pb-3 flex-col items-start transition duration-200 ease-in-out transform hover:-translate-y-1 md:hover:-translate-y-1.5 hover:shadow-setting":
            variant === "gridModern" ||
            variant === "gridModernWide" ||
            variant === "setting" ||
            variant === "gridTrendy",
          "pb-2 lg:pb-3 flex-col items-start transition duration-200 ease-in-out transform":
            variant === "grid",
          " bg-white":
            (variant === "grid" && !bgGray) ||
            (variant === "setting" && !bgGray) ||
            (variant === "gridModern" && !bgGray) ||
            (variant === "gridModernWide" && !bgGray) ||
            (variant === "gridTrendy" && !bgGray) ||
            (variant === "gridSlim" && !bgGray),
          "bg-gray-200": variant === "list" || bgGray,
          "md:pb-1 flex-col items-start": variant === "gridSlim",
          "items-center border border-gray-100 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-listsetting":
            variant === "listSmall",
          "flex-row items-center transition-transform ease-linear pe-2 lg:pe-3 2xl:pe-4":
            variant === "list",
          "bg-transparent": variant === "grid" && bgTransparent === true,
        },
        className
      )}
      role="button"
    >
      <div
        className={cn(
          "flex",
          {
            "mb-3 md:mb-3.5 pb-0": variant === "gridSlim",
            "flex-shrink-0 w-32 sm:w-44 md:w-36 lg:w-44":
              variant === "listSmall",
            "mb-3 md:mb-3.5 relative":
              variant === "gridModern" ||
              variant === "gridModernWide" ||
              variant === "gridTrendy" ||
              variant === "grid",
          },
          imageContentClassName
        )}
      >
        {showImage()}
      </div>

      <div className="my-5 text-slate-500 setting-font">
        ${setting?.sale_price}
      </div>
      <div className="grid grid-cols-2 gap-6 justify-center">
        <div className="font-medium setting-font">
          {setting?.carats}
          <p className="font-normal text-slate-500 setting-font">Carat</p>
        </div>
        <div className="font-medium setting-font">
          {setting?.color}
          <p className="font-normal text-slate-500 setting-font">Color</p>
        </div>
        <div className="font-medium setting-font">
          {setting?.clarity}
          <p className="font-normal text-slate-500 setting-font">Clarity</p>
        </div>
        <div className="font-medium setting-font">
          {setting?.cut}
          <p className="font-normal text-slate-500 setting-font">Cut</p>
        </div>
      </div>
    </div>
  );
};

export default settingCard;
