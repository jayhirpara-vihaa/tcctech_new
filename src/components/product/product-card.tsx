import cn from "classnames";
import Image from "next/image";
import { FC, useEffect, useContext } from "react";
import { useState } from "react";
import usePrice from "@framework/product/use-price";
import ProductWishIcon from "@components/icons/product-wish-icon";
import RatingDisplay from "@components/common/rating-display";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import { DiamondSettingContext } from "@contexts/diamond_setting/diamond-setting-context";
import { FilterDataType } from "@framework/types";
import { SwiperSlide } from "swiper/react";
import Carousel from "@components/ui/carousel/carousel";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { useDeleteWishListMutation } from "@framework/product/wishlist/delete-wishlist-product";
import { useAddWishListMutation } from "@framework/product/wishlist/add-wishlist-product";
import { useUI } from "@contexts/ui.context";
import { useRouter } from "next/router";
import { getUserDetails } from "@store/authorization";
import { CompanyInfoContext } from "@contexts/company_info/company_info";
import { CURRENCY } from "@utils/constants";

interface ProductProps {
  // product: Product;
  product?: any;
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
  productType?: string;
}

const ProductCard: FC<ProductProps> = ({
  product,
  className = "",
  contactClassName = "",
  imageContentClassName = "",
  variant = "",
  imgWidth = 300,
  imgHeight = 300,
  imgLoading,
  hideProductDescription = false,
  showCategory = false,
  showRating = false,
  bgTransparent = false,
  bgGray = false,
  demoVariant,
  disableBorderRadius = false,
  productType = "",
}) => {
  const defaultImage = "/assets/Productdefaultimage/finel-unscreen.gif";
  // const { openModal, setModalView, setModalData } = useUI();
  const router = useRouter();
  const {
    data: addWishListData,
    mutate: addWishList,
    isLoading: addWishLoading,
  } = useAddWishListMutation();

  const {
    data: deleteDataResponse,
    mutate: deteleWishList,
    isLoading: deleteWishLoading,
  } = useDeleteWishListMutation();
  const [isInWishlist, setIsInWishList] = useState(false);
  const { isAuthorized } = useUI();
  const [hoverColor, setHoverColor] = useState("");
  const [displayImagePath, setDisplayImagePath] = useState(defaultImage);
  const [productListImages, setProductListImages] = useState([]);
  const [isHoveringImg, setIsHoveringImg] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedTitle, setSelectedTitle] = useState(product?.name);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedToneIds, setSelectedToneIds] = useState<FilterDataType[]>([]);
  const [selectedTone, setSelectedTone] = useState<any[]>();
  const { mainFilterData } = useContext(DiamondSettingContext);
  const { updateWishTotalItems, companyInfo } = useContext(CompanyInfoContext);

  const imageUrl = process.env.NEXT_PUBLIC_IMG_URL;

  useEffect(() => {
    const productMetalData = mainFilterData?.metalToneData;
    const availableTones = product?.PMO;
    const arrTones = [];
    let arrTonesID: number[] = [];
    const goldTones = availableTones.filter(
      (t: any) => parseInt(t.id_metal) === 1
    );
    if (goldTones.length > 0) {
      const objTone = {
        id_metal: goldTones[0].id_metal,
        metal_tone: goldTones[0].metal_tone,
        Price: goldTones[0].Price,
      };
      arrTonesID = [...arrTonesID, ...goldTones[0].metal_tone];
      arrTones.push(objTone);
    }

    const silverTones = availableTones.filter(
      (t: any) => parseInt(t.id_metal) === 2
    );

    if (silverTones.length > 0) {
      const objTone = {
        id_metal: silverTones[0].id_metal,
        metal_tone: silverTones[0].metal_tone,
        Price: silverTones[0].Price,
      };
      arrTonesID = [...arrTonesID, ...silverTones[0].metal_tone];
      arrTones.push(objTone);
    }

    const platinumTones = availableTones.filter(
      (t: any) => parseInt(t.id_metal) === 3
    );

    if (platinumTones.length > 0) {
      const objTone = {
        id_metal: platinumTones[0].id_metal,
        metal_tone: platinumTones[0].metal_tone,
        Price: platinumTones[0].Price,
      };
      arrTonesID = [...arrTonesID, ...platinumTones[0].metal_tone];
      arrTones.push(objTone);
    }

    const presentTone = arrTonesID.filter((x, i, a) => a.indexOf(x) == i);
    const intTones = presentTone.map((t: any) => {
      return parseInt(t);
    });

    const tones =
      productMetalData?.filter((tone: any) => {
        if (intTones.indexOf(parseInt(tone.id)) >= 0) return tone;
      }) || [];

    setSelectedToneIds(tones);
    setSelectedTone(arrTones);
    setSelectedColor(`${tones?.length! > 0 ? tones[0].id! : ""}`);
  }, [mainFilterData]);

  useEffect(() => {
    if (productType === "trending" || productType === "featured") {
      setSelectedPrice(product.PMO?.length > 0 ? product.PMO[0].Price : "");
      setDisplayImagePath(
        product.product_images.length > 0
          ? `${imageUrl}${product.product_images[0]?.image_path}`
          : defaultImage
      );
    } else {
      let displayTone = "";
      if (hoverColor != "") {
        displayTone = hoverColor;
      } else {
        if (selectedColor != "") {
          displayTone = selectedColor;
        }
      }
      if (displayTone != "") {
        const objTone =
          selectedTone?.filter((item: any) => {
            return (item.metal_tone as number[]).includes(
              parseInt(displayTone)
            );
          }) || [];

        setSelectedPrice(objTone?.length > 0 ? objTone[0].Price : "");

        displayTone;
        const productImage = product?.product_images?.filter((item: any) => {
          return parseInt(item.id_metal_tone) === parseInt(displayTone);
        });
        setDisplayImagePath(`${imageUrl}${productImage?.image_path}`);
        setProductListImages(
          product?.product_images.length < 0 || productImage.length === 0
            ? [defaultImage]
            : productImage
        );
      }
    }
  }, [selectedColor, hoverColor]);

  //:::::::::::::::::::::::::::::::::::::: wishlist ::::::::::::::::::::::::::::::::::::::::://

  const userData = getUserDetails();
  const userID = userData?.id_app_user;
  const handleWishClick = () => {
    addWishList({
      user_id: Number(userID),
      product_id: Number(product.id),
    });

    if (!isAuthorized) {
      router.push(`${ROUTES.LOGIN}`);
    } else {
      setIsInWishList(true);
    }
  };

  const handleRemoveWish = () => {
    deteleWishList({
      user_id: Number(userID),
      product_id: Number(product.id),
    });
    setIsInWishList(false);
  };

  useEffect(() => {
    updateWishTotalItems(addWishListData?.data?.wish_list_count);
  }, [addWishListData, product]);

  useEffect(() => {
    updateWishTotalItems(deleteDataResponse?.data);
  }, [deleteDataResponse, product]);

  useEffect(() => {
    if (product?.is_wishlist === "1") {
      setIsInWishList(true);
    } else {
      setIsInWishList(false);
    }
  }, [product]);

  const { basePrice, discount } = usePrice({
    amount: product.sale_price ? product.sale_price : product.price,
    baseAmount: product.price,
    currencyCode: "R",
  });

  function handlePopupView() { }

  const handleImageOver = () => {
    setIsHoveringImg(true);
  };

  const handleImageOut = () => {
    setIsHoveringImg(false);
  };
  function showImage() {
    if (variant === "grid") {
      return (
        <div id={product.id}>
          <Carousel
            key={product.id}
            breakpoints={{}}
            autoplay={true}
            buttonSize="small"
            buttonGroupClassName=""
            className="product-list"
            pagination={{
              clickable: true,
            }}
            nextActivateId={`Setting-Style-slider-next-${product.id}`}
            prevActivateId={`Setting-Style-slider-prev-${product.id}`}
            prevButtonClasses={`start-5 md:start-5 xl:start-5 2xl:start-5`}
            nextButtonClasses={`end-5 md:end-5 xl:end-5 2xl:end-5`}
          >
            <span className="flex gap-x-5 justify-center mx-auto ">
              {productListImages &&
                productListImages.length > 0 &&
                productListImages?.map((item: any, index) => {
                  return (
                    <>
                      <SwiperSlide
                        className="carouselItem"
                        key={`product-list-key-${product.id}-${index}`}
                      >
                        <div className="col-span-1 transition duration-150 ease-in hover:opacity-90">
                          <Image
                            key={index}
                            onClick={handlePopupView}
                            src={
                              product?.product_images.length > 0
                                ? `${imageUrl}${item.image_path}`
                                : defaultImage
                            }
                            width={demoVariant === "ancient" ? 352 : imgWidth}
                            height={demoVariant === "ancient" ? 452 : imgHeight}
                            loading={imgLoading}
                            onMouseOver={handleImageOver}
                            onMouseOut={handleImageOut}
                            quality={100}
                            alt={product?.name || "Product Image"}
                            className={cn(
                              `object-cover ${!disableBorderRadius && "rounded-s-md"
                              }`,
                              {
                                "w-full transition duration-200 ease-in":
                                  variant === "grid" ||
                                  variant === "gridModern" ||
                                  variant === "gridModernWide" ||
                                  variant === "gridTrendy",
                              }
                            )}
                          />
                        </div>
                      </SwiperSlide>
                    </>
                  );
                })}
            </span>
          </Carousel>
        </div>
      );
    } else {
      return (
        <div id={product.id}>
          <Image
            src={displayImagePath}
            width={demoVariant === "ancient" ? 352 : imgWidth}
            height={demoVariant === "ancient" ? 452 : imgHeight}
            loading={imgLoading}
            onMouseOver={handleImageOver}
            onMouseOut={handleImageOut}
            quality={100}
            alt={product?.name || "Product Image"}
            className={cn(
              `object-cover ${!disableBorderRadius && "rounded-s-md"}`,
              {
                "w-full transition duration-200 ease-in":
                  variant === "grid" ||
                  variant === "gridModern" ||
                  variant === "gridModernWide" ||
                  variant === "gridTrendy",
                "rounded-md group-hover:rounded-b-none":
                  (variant === "grid" && !disableBorderRadius) ||
                  (variant === "gridModern" && !disableBorderRadius) ||
                  (variant === "gridModernWide" && !disableBorderRadius) ||
                  (variant === "gridTrendy" && !disableBorderRadius),
                "rounded-md transition duration-150 ease-linear transform group-hover:scale-105":
                  variant === "gridSlim",
                "rounded-s-md transition duration-200 ease-linear transform group-hover:scale-105":
                  variant === "list",
              }
            )}
          />
        </div>
      );
    }
  }

  return (
    <div
      key={product.id}
      className={cn(
        `group box-border overflow-hidden flex  ${!disableBorderRadius && "rounded-md"
        } cursor-pointer`,
        {
          "pe-0 pb-2 lg:pb-3 flex-col items-start transition duration-200 ease-in-out transform hover:-translate-y-1 md:hover:-translate-y-1.5 hover:shadow-product":
            variant === "gridModern" ||
            variant === "gridModernWide" ||
            variant === "gridTrendy",
          "pe-0 pb-2 lg:pb-3 flex-col items-start transition duration-200 ease-in-out transform border border-inherit":
            variant === "grid",
          " bg-white":
            (variant === "grid" && !bgGray) ||
            (variant === "gridModern" && !bgGray) ||
            (variant === "gridModernWide" && !bgGray) ||
            (variant === "gridTrendy" && !bgGray) ||
            (variant === "gridSlim" && !bgGray),
          "bg-gray-200": variant === "list" || bgGray,
          "pe-0 md:pb-1 flex-col items-start": variant === "gridSlim",
          "items-center border border-gray-100 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-listProduct":
            variant === "listSmall",
          "flex-row items-center transition-transform ease-linear pe-2 lg:pe-3 2xl:pe-4":
            variant === "list",
          "bg-transparent": variant === "grid" && bgTransparent === true,
        },
        className
      )}
      role="button"
      // title={product?.name}
      onClick={handlePopupView}
    >
      {variant === "grid" && (
        <div className="absolute end-3 sm:end-1 top-2 space-y-3 w-[22px] sm:w-[25px] lg:w-[35px] cursor-pointer z-10">
          {/* <ProductWishIcon className="w-full opacity-80 rounded-md" /> */}
          {isInWishlist ? (
            <div onClick={handleRemoveWish}>
              <MdOutlineFavorite
                size={25}
                color="red"
                style={{ pointerEvents: "none" }}
              />
            </div>
          ) : (
            <div onClick={handleWishClick}>
              <MdOutlineFavoriteBorder
                size={25}
                style={{ pointerEvents: "none" }}
              />
            </div>
          )}
        </div>
      )}
      <div
        className={cn(
          "flex",
          {
            // "mb-3 md:mb-3.5": variant === "grid",
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
        <Link
          href={`${ROUTES.PRODUCT}/${product.slug}`}
          as={`products/slug/`}
          className="truncate w-full text-sm text-heading mb-1.5"
        >
          {showImage()}
        </Link>

        {/* discount */}
        <div className="absolute top-3.5 md:top-5 3xl:top-7 start-3.5 md:start-5 3xl:start-7 flex flex-col gap-y-1 items-start">
          {discount &&
            (variant === "gridModernWide" ||
              variant === "gridModern" ||
              variant === "gridTrendy" ||
              variant === "grid") && (
              <span className="bg-heading text-white text-10px md:text-xs leading-5 rounded-md inline-block px-1 sm:px-1.5 xl:px-2 py-0.5 sm:py-1">
                <p>
                  <span className="sm:hidden">-</span>
                  {discount} <span className="hidden sm:inline">OFF</span>
                </p>
              </span>
            )}

          {/* {product?.isNewArrival &&
              (variant === "gridModernWide" ||
                variant === "gridModern" ||
                variant === "gridTrendy" ||
                variant === "grid") && (
                <span className="bg-orange-300 text-white text-10px md:text-xs leading-5 rounded-md inline-block px-1.5 sm:px-1.5 xl:px-2 py-0.5 sm:py-1">
                  <p>
                  New <span className="hidden sm:inline">Arrival</span>
                </p>
                  <div className="flex">
                    <svg
                      className="w-2 h-2 sm:w-4 sm:h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span className="mx-1 text-white truncate">4.5</span>
                  </div>
                </span>
              )} */}
        </div>

        {variant === "gridModernWide" && (
          <div className="absolute end-2 sm:end-3 top- space-y-1 w-[32px] sm:w-[42px] lg:w-[52px]">
            {/* <ProductViewIcon className="transition ease-in duration-300 sm:opacity-0 group-hover:opacity-100 delay-100 w-full bg-white rounded-md" /> */}
            {isInWishlist ? (
              <div onClick={handleRemoveWish}>
                <MdOutlineFavorite
                  size={25}
                  color="red"
                  style={{ pointerEvents: "none" }}
                />
              </div>
            ) : (
              <div onClick={handleWishClick}>
                <MdOutlineFavoriteBorder
                  size={25}
                  style={{ pointerEvents: "none" }}
                />
              </div>
            )}
            {/* <ProductCompareIcon className="transition ease-in duration-300 sm:opacity-0 group-hover:opacity-100 delay-300 w-full bg-white rounded-md" /> */}
          </div>
        )}
      </div>
      <div
        className={cn(
          "w-full overflow-hidden p-2",
          {
            // "md:px-2.5 xl:px-4": variant === "grid",

            "px-2 md:px-4 xl:px-6 h-full flex flex-col":
              variant === "gridModern" ||
              variant === "gridModernWide" ||
              variant === "gridTrendy" ||
              variant === "grid",

            "ps-0": variant === "gridSlim",
            "px-4 lg:px-5 2xl:px-4": variant === "listSmall",
          },
          contactClassName
        )}
      >
        {/* {(variant === "gridModern" ||
          variant === "gridModernWide" ||
          variant === "gridTrendy" ||
          variant === "grid") && (
            <div className="py-4 flex items-center gap-x-1">
              {product.quantity === 0 && (
                <span className="text-xs sm:text-sm leading-5 ps-3 font-semibold text-[#EF4444]">
                  Out of stock
                </span>
              )}
              <div></div>
            </div>
          )} */}
        {/* space-y-1 md:space-x-2.5 lg:space-x-2.5 xl:space-x-2.5 2xl:space-x-2.5  */}
        {!!(showCategory || showRating) && (
          <div className="flex flex-col md:flex-row md:items-center lg:flex-row xl:flex-row 2xl:flex-row  mb-0.5 items-start">
            {!!showCategory && (
              <h3
                className={cn(
                  "font-semibold text-sm mb-1 md:mb-0 me-2 md:me-3",
                  {
                    "text-white": bgTransparent,
                    "text-black/70": !bgTransparent,
                  }
                )}
              >
                Category
              </h3>
            )}
            {!!showRating && <RatingDisplay rating={2.5} />}
          </div>
        )}

        {/* Card Metal Tone */}
        {selectedToneIds?.length > 0 && variant === "grid" && (
          <div className="flex justify-center mb-3 inset-x-0 gap-3">
            {selectedToneIds?.map((value: any) => {
              return (
                <span
                  className={`border-2 rounded-full h-7 w-7 ${`${hoverColor}` === `${value?.id}` ||
                    `${selectedColor}` === `${value?.id}`
                    ? `border-headerSecondaryTextColor`
                    : ""
                    }`}
                >
                  <Image
                    id={`${value.id}`}
                    src={`${imageUrl}${value.image_path}`}
                    alt={value?.name}
                    width={20}
                    height={20}
                    loading={imgLoading}
                    onMouseOver={(e: any) => setHoverColor(e?.target?.id)}
                    onMouseOut={() => setHoverColor("")}
                    onClick={(e: any) => setSelectedColor(e?.target?.id)}
                    quality={100}
                    className={cn(
                      ` object-cover mr-3 ${!disableBorderRadius && "rounded-s-md "
                      }`,
                      {
                        "w-full transition duration-200 ease-in ":
                          variant === "grid",
                        "rounded-md group-hover:rounded-b-none metal-tone-imgdiv":
                          variant === "grid" && !disableBorderRadius,
                      }
                    )}
                  />
                </span>
              );
            })}
          </div>
        )}
        {/* Product Title, Price */}
        <Link
          href={{
            pathname: `${ROUTES.PRODUCT}/${product.slug}`,
          }}
          as={`products/slug/`}
          className="truncate w-full text-sm  mb-1.5"
        >
          <h2
            className={cn("mx-3 mb-1", {
              "font-bold": demoVariant === "ancient",
              " text-xs sm:text-sm md:text-base flex items-center justify-center hover:text-headerSecondaryTextColor":
                variant === "gridModern" ||
                variant === "gridModernWide" ||
                variant === "gridTrendy" ||
                variant === "grid",
              "md:mb-1.5 text-sm sm:text-base md:text-sm lg:text-base xl:text-lg":
                variant === "gridSlim",
              "text-sm sm:text-base md:mb-1.5 pb-0": variant === "listSmall",
              "text-sm sm:text-base md:text-sm lg:text-base xl:text-lg md:mb-1.5":
                variant === "list",
              "text-white": bgTransparent,
              "text-heading": !bgTransparent,
            })}
          >
            {variant === "grid" ? (
              <span
                className={`text-[${companyInfo && companyInfo.web_secondary_color
                  }] hover:text-[#DB901F]`}
              >
                {selectedTitle}
              </span>
            ) : (
              <span
                className={`text-[${companyInfo && companyInfo.web_secondary_color
                  }] hover:text-[#DB901F]`}
              >
                {selectedTitle}
              </span>
            )}
          </h2>
        </Link>

        {!hideProductDescription &&
          product?.description &&
          variant !== "grid" && (
            <p className="text-body text-xs lg:text-sm leading-normal xl:leading-relaxed max-w-[100%] truncate">
              {product?.sort_description}
            </p>
          )}
        <div
          className={`font-semibold text-sm mt-1.5 space-s-2 sm:text-xl md:text-base lg:text-xl md:mt-2.5 2xl:mt-3
          ${variant === "gridModern" ||
              variant === "gridModernWide" ||
              variant === "gridTrendy" ||
              variant === "grid"
              ? "flex flex-col-reverse !space-s-0 !mt-auto"
              : ""
            } ${bgTransparent ? "text-white" : "text-heading"}`}
        >
          <span className="text-lg flex justify-center text-black">
            {variant === "grid" ? (
              <span>{`${CURRENCY}${parseFloat(selectedPrice)?.toFixed(
                2
              )}`}</span>
            ) : (
              <span>{`${CURRENCY}${parseFloat(selectedPrice)?.toFixed(
                2
              )}`}</span>
            )}
          </span>
          {discount && (
            <del
              className={`sm:text-base font-normal ${bgTransparent ? "text-white/70" : "text-gray-800 "
                }`}
            >
              {(basePrice as unknown as number)?.toFixed(2)}
            </del>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
