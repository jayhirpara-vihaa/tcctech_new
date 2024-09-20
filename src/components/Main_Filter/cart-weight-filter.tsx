import React, { useContext } from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { DiamondSettingContext } from "@contexts/diamond_setting/diamond-setting-context";
import { MdCached } from "react-icons/md";

export const CartWeightFilter = ({ data }: any) => {
  const { t } = useTranslation("common");

  const Shop_By_Style = data?.data?.settingStyleData;
  const ImageUrl = process.env.NEXT_PUBLIC_IMG_URL;
  const { hoverStyle, selectedStyle, updateHoverStyle, updateSelectedStyle } =
    useContext(DiamondSettingContext);
  return (
    <div>
      <div>
        <span
          className="float-right tooltip z-10"
          onClick={() => {
            updateSelectedStyle("");
          }}
        >
          <MdCached size={20} />
          <span className="resettooltiptext hidden transition-all duration-100 ease-in-out cursor-pointer lg:font-normal lg:block xl:text-base ">
            reset
          </span>
        </span>
      </div>

      <div className="flex mt-10">
        <span className="flex gap-x-5 justify-center mx-auto ">
          {Shop_By_Style?.map((item: any) => {
            return (
              <>
                <div
                  key={item.id}
                  className="TCC-filter-image-name justify-center mx-auto flex-col"
                >
                  <div
                    className={`mx-auto  border-2 border-white rounded-full h-20 w-20 p-0.5 ${
                      `${hoverStyle}` === `${item?.id}` ||
                      `${selectedStyle}` === `${item?.id}`
                        ? "border-2 border-headerSecondaryTextColor rounded-full h-20 w-20 p-0.5 "
                        : ""
                    }`}
                  >
                    <Image
                      id={`${item.id}`}
                      src={`${ImageUrl}${item?.image_path}`}
                      width={70}
                      height={70}
                      alt={item?.name}
                      onMouseOver={(e: any) => updateHoverStyle(e?.target?.id)}
                      onMouseOut={() => updateHoverStyle(0)}
                      onClick={(e: any) => {
                        updateSelectedStyle(e?.target?.id);
                      }}
                      className="rounded-full bg-gray-400 "
                    />
                  </div>
                  <div className="text-center">{item?.name}</div>
                </div>
              </>
            );
          })}
        </span>
      </div>
    </div>
  );
};
