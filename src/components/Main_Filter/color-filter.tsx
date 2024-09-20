import { useState, useEffect, useContext } from "react";
import Carousel from "@components/ui/carousel/carousel";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import { fetchProducts } from "@framework/product/get-all-products";
import { DiamondSettingContext } from "@contexts/diamond_setting/diamond-setting-context";
import { MdCached } from "react-icons/md";
import { CURRENCY } from "@utils/constants";
import { useRouter } from "next/router";

interface mainProductFilterData {
  id: number;
  name: string;
  slug: string;
  image_path: string;
}
export const ColorFilter = ({ data }: any) => {
  type InputEvent = MouseEvent<HTMLImageElement, MouseEvent>;
  const [queryItem, setQueryItem] = useState({ type: "", value: "0" });

  const Setting_Style = data?.data?.settingStyleData;
  const Diamond_Shape = data?.data?.diamondShapeData;
  const Metal_Color = data?.data?.metalToneData;
  const ImageUrl = process.env.NEXT_PUBLIC_IMG_URL;
  const { query } = useRouter();
  const queryFilter = query.filter;
  const queryValue: any = query.value;
  useEffect(() => {
    if (queryFilter === "style") {
      const queryStyleItem =
        Setting_Style &&
        Setting_Style.filter((t: any) => t.slug === queryValue)[0]?.id;
      setQueryItem({ type: queryFilter, value: queryStyleItem });
    }
    if (queryFilter === "metal") {
      const queryMetalItem =
        Metal_Color &&
        Metal_Color.filter((t: any) => t.slug === queryValue)[0]?.id;
      setQueryItem({ type: queryFilter, value: queryMetalItem });
    }

    if (queryFilter === "shape") {
      const queryShapeItem =
        Diamond_Shape &&
        Diamond_Shape.filter((t: any) => t.slug === queryValue)[0]?.id;
      setQueryItem({ type: queryFilter, value: queryShapeItem });
    }
    if (queryFilter === "women") {
      setQueryItem({ type: queryFilter, value: queryValue });
    }
    if (queryFilter === "women-metal") {
      const queryMetalItem =
        Metal_Color &&
        Metal_Color.filter((t: any) => t.slug === queryValue)[0]?.id;
      setQueryItem({ type: queryFilter, value: queryMetalItem });
    }
    if (queryFilter === "men") {
      setQueryItem({ type: queryFilter, value: queryValue });
    }
    if (queryFilter === "men-metal") {
      const queryMetalItem =
        Metal_Color &&
        Metal_Color.filter((t: any) => t.slug === queryValue)[0]?.id;
      setQueryItem({ type: queryFilter, value: queryMetalItem });
    }
    if (queryFilter === "lifestyle") {
      setQueryItem({ type: queryFilter, value: queryValue });
    }

  }, [queryFilter, queryValue]);
  const {
    value,
    hoverStyle,
    selectedStyle,
    hoverShape,
    selectedShape,
    hoverColor,
    selectedColor,
    MinPrice,
    MaxPrice,
    updateValue,
    updateHoverStyle,
    updateSelectedStyle,
    updateHoverShape,
    updateSelectedShape,
    updateHoverColor,
    updateSelectedColor,
    updateSelectedGender,
    updateSelectedCategory,
  } = useContext(DiamondSettingContext);

  useEffect(() => {
    if (queryItem.type === "style") {
      updateSelectedStyle(Number(queryItem.value!));
      updateSelectedColor(0);
      updateSelectedShape(0);
      updateSelectedGender(0);
      updateSelectedCategory("");
    }
    if (queryItem.type === "metal") {
      updateSelectedColor(Number(queryItem.value!));
      updateSelectedStyle(0);
      updateSelectedShape(0);
      updateSelectedGender(0);
      updateSelectedCategory("");
    }
    if (queryItem.type === "women-metal") {
      updateSelectedColor(Number(queryItem.value!));
      updateSelectedStyle(0);
      updateSelectedShape(0);
      updateSelectedGender(2);
      updateSelectedCategory("");
    }
    if (queryItem.type === "men-metal") {
      updateSelectedColor(Number(queryItem.value!));
      updateSelectedStyle(0);
      updateSelectedShape(0);
      updateSelectedGender(1);
      updateSelectedCategory("");
    }
    if (queryItem.type === "shape") {
      updateSelectedShape(Number(queryItem.value!));
      updateSelectedColor(0);
      updateSelectedStyle(0);
      updateSelectedGender(0);
      updateSelectedCategory("");
    }
    if (queryItem.type === "women") {
      updateSelectedGender(2);
      updateSelectedCategory(queryItem.value!);
      updateSelectedColor(0);
      updateSelectedStyle(0);
      updateSelectedShape(0);
    }
    if (queryItem.type === "men") {
      updateSelectedGender(1);
      updateSelectedCategory(queryItem.value!);
      updateSelectedColor(0);
      updateSelectedStyle(0);
      updateSelectedShape(0);
    }
    if (queryItem.type === "lifestyle") {
      updateSelectedGender(0);
      updateSelectedCategory(queryItem.value!);
      updateSelectedColor(0);
      updateSelectedStyle(0);
      updateSelectedShape(0);
    }
  }, [queryItem]);

  const minDistance = 10;
  const flashSaleCarouselBreakpoint = {
    "1280": {
      slidesPerView: 6,
      spaceBetween: 2,
    },
    "768": {
      slidesPerView: 6,
      spaceBetween: 2,
    },
    "0": {
      slidesPerView: 1,
    },
  };

  function valuetext(value: number) {
    return `${value}°C`;
  }

  function valueLabelFormat(value: any) {
    return `${CURRENCY}${value}`;
  }
  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      updateValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
      valueLabelFormat(Math.min(newValue[0], value[1] - minDistance));
    } else {
      updateValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
      valueLabelFormat(Math.min(newValue[1], value[0] - minDistance));
    }
  };

  return (
    <div className="mt-10  mx-auto">
      <div className="sm:grid sm:grid-cols-1 md:grid md:grid-cols-2 md:gap-x-10 TCC-product-filter">
        <div className="border-solid border border-gray-300 p-5 rounded-md">
          <h2 className="text-center TCC-diamond-setting-text border-b border-blue-300 ">
            Setting Style{" "}
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
          </h2>
          <div className="mt-3">
            <Carousel
              breakpoints={flashSaleCarouselBreakpoint}
              buttonSize="small"
              buttonGroupClassName=""
              className="-mx-0 md:-mx-2.5 xl:-mx-0"
              nextActivateId="Setting-Style-slider-next"
              prevActivateId="Setting-Style-slider-prev"
              // prevButtonClasses={`start-10 md:start-0 xl:start-0 2xl:start-0`}
              // nextButtonClasses={`end-10 md:end-0 xl:end-0 2xl:end-0`}
              prevButtonClasses={`left-5 md:-left-5 xl:-left-5 2xl:-left-5`}
              nextButtonClasses={`right-5 md:-right-5 xl:-right-5 2xl:-right-5`}
            >
              <span className="flex gap-x-5 justify-center mx-auto ">
                {Setting_Style?.map((item: mainProductFilterData) => {
                  return (
                    <>
                      <SwiperSlide
                        className="carouselItem"
                        key={`banner--key-${item?.id}`}
                      >
                        <div
                          key={item.id}
                          className="TCC-filter-image-name group flex text-center flex-col cursor-pointer"
                        >
                          <span
                            className={`mx-auto  border-2 rounded-full h-20 w-20 p-0.5 ${`${hoverStyle}` === `${item?.id}` ||
                              `${selectedStyle}` === `${item?.id}`
                              ? "border-2 border-headerSecondaryTextColor rounded-full h-20 w-20 p-0.5 "
                              : ""
                              }`}
                          >
                            <Image
                              id={`${item?.id}`}
                              src={`${ImageUrl}${item?.image_path}`}
                              width={100}
                              height={100}
                              alt={item?.name}
                              onMouseOver={(e: InputEvent) =>
                                updateHoverStyle(e?.target?.id)
                              }
                              onMouseOut={() => updateHoverStyle(0)}
                              onClick={(e: InputEvent) => {
                                updateSelectedStyle(e?.target?.id);
                              }}
                              className="rounded-full bg-gray-400"
                            />
                          </span>
                          <div>{item?.name}</div>
                        </div>
                      </SwiperSlide>
                    </>
                  );
                })}
              </span>
            </Carousel>
          </div>
        </div>

        <div className="border-solid border border-gray-300 p-5 rounded-md">
          <h2 className="TCC-diamond-setting-text border-b border-blue-300 text-center">
            Diamond Shape
            <span
              className="float-right tooltip z-10"
              onClick={() => {
                updateSelectedShape("");
              }}
            >
              <MdCached size={20} />
              <span className="resettooltiptext hidden transition-all duration-100 ease-in-out cursor-pointer lg:font-normal lg:block xl:text-base ">
                reset
              </span>
            </span>
          </h2>

          <div className="mt-3">
            <Carousel
              breakpoints={flashSaleCarouselBreakpoint}
              buttonSize="small"
              buttonGroupClassName=""
              className=""
              nextActivateId="Diamond-Shape-slider-next"
              prevActivateId="Diamond-Shape-slider-prev"
              prevButtonClasses={`left-5 md:-left-5 xl:-left-5 2xl:-left-5 md:-top-1`}
              nextButtonClasses={`right-5 md:-right-5 xl:-right-5 2xl:-right-5 md:-top-1`}
            >
              <span className="flex gap-x-5 justify-center mx-auto ">
                {Diamond_Shape?.map((item: mainProductFilterData) => {
                  return (
                    <>
                      <SwiperSlide
                        className="carouselItem"
                        key={`banner--key-${item?.id}`}
                      >
                        <div
                          key={`diamondShape-${item.id}`}
                          className="TCC-filter-image-name group flex  text-center flex-col mx-auto cursor-pointer"
                        >
                          <span
                            className={`mx-auto  border-2 rounded-full h-20 w-20 p-0.5 ${`${hoverShape}` === `${item?.id}` ||
                              `${selectedShape}` === `${item?.id}`
                              ? "border-2 border-headerSecondaryTextColor rounded-full h-20 w-20 p-0.5 "
                              : ""
                              }`}
                          >
                            <Image
                              key={item.id}
                              id={`${item?.id}`}
                              src={`${ImageUrl}${item?.image_path}`}
                              width={80}
                              height={80}
                              alt={item?.name}
                              onMouseOver={(e: InputEvent) =>
                                updateHoverShape(e?.target?.id)
                              }
                              onMouseOut={() => updateHoverShape(0)}
                              onClick={(e: InputEvent) =>
                                updateSelectedShape(e?.target?.id)
                              }
                              className="rounded-full bg-gray-400 mx-auto "
                            />
                          </span>
                          <div className="text-center">{item?.name}</div>
                        </div>
                      </SwiperSlide>
                    </>
                  );
                })}
              </span>
            </Carousel>
          </div>
        </div>

        <div className="border-solid border border-gray-300 p-5 rounded-md mt-3">
          <h2 className="TCC-diamond-setting-text border-b border-blue-300 text-center">
            Metal
            <span
              className="float-right tooltip z-10"
              onClick={() => {
                updateSelectedColor("");
              }}
            >
              <MdCached size={20} />
              <span className="resettooltiptext hidden transition-all duration-100 ease-in-out cursor-pointer lg:font-normal lg:block xl:text-base ">
                reset
              </span>
            </span>
          </h2>
          <span className="flex gap-x-2 justify-center mx-auto ">
            {Metal_Color?.map((item: mainProductFilterData) => {
              return (
                <>
                  <div
                    key={`metalColor-${item.id}`}
                    className="TCC-filter-image-name group flex text-center flex-col mt-5 mr-4 "
                  >
                    <span
                      className={`mx-auto rounded-full h-10 w-10 p-0.5
                      ${`${hoverColor}` === `${item?.id}` ||
                          `${selectedColor}` === `${item?.id}`
                          ? "border-2 border-headerSecondaryTextColor rounded-full h-10 w-10 p-0.5 "
                          : ""
                        }
                      `}
                    >
                      <Image
                        key={item.id}
                        id={`${item?.id}`}
                        src={`${ImageUrl}${item?.image_path}`}
                        width={25}
                        height={25}
                        alt={item?.name}
                        onMouseOver={(e: InputEvent) =>
                          updateHoverColor(e?.target?.id)
                        }
                        onMouseOut={() => updateHoverColor(0)}
                        onClick={(e: InputEvent) =>
                          updateSelectedColor(e?.target?.id)
                        }
                        className="rounded-full bg-gray-400 mx-auto cursor-pointer"
                      />
                    </span>
                    <div className="">{item?.name}</div>
                  </div>
                </>
              );
            })}
          </span>
        </div>

        <div className="border-solid border border-gray-300 p-3 rounded-md mt-3">
          <h2 className="TCC-diamond-setting-text border-b border-blue-300 text-center">
            Ring Price ( Setting + Diamond)
            <span
              className="float-right tooltip z-10"
              onClick={() => updateValue([MinPrice, MaxPrice])}
            >
              <MdCached size={20} />
              <span className="resettooltiptext hidden transition-all duration-100 ease-in-out cursor-pointer lg:font-normal lg:block xl:text-base ">
                reset
              </span>
            </span>
          </h2>
          <div className="mt-5">
            <Slider
              getAriaLabel={() => "Minimum distance"}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              valueLabelFormat={valueLabelFormat}
              min={1}
              max={25000}
              disableSwap
            />
            <div className="flex justify-between">
              <Box
                component="span"
                sx={{ p: 1, borderBottom: "1px dashed grey" }}
              >
                {`${CURRENCY}${value[0]}`}
              </Box>
              <Box
                component="span"
                sx={{ p: 1, borderBottom: "1px dashed grey" }}
              >
                {`${CURRENCY}${value[1]}`}
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
