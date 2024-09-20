import cn from "classnames";
import Image from "next/image";
import { FC, useEffect } from "react";
import { useState } from "react";
import RatingDisplay from "@components/common/rating-display";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import { CURRENCY } from "@utils/constants";

const imageData = [
    {
        "id": 1,
        "name": "Jan",
        "image": "/assets/images/config_image/center-diamond/diamond.png"
    },

]
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

const ZamlesBirthstoneProductCard: FC<ProductProps> = ({
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
    const webConfigBgColor = process.env.NEXT_PUBLIC_ZAMLES_BG_COLOR;
    const [hoverColor, setHoverColor] = useState("");
    const [displayImagePath, setDisplayImagePath] = useState(defaultImage);
    const [productListImages, setProductListImages] = useState([]);
    const [isHoveringImg, setIsHoveringImg] = useState(false);
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedTitle, setSelectedTitle] = useState(product?.name);
    const [selectedPrice, setSelectedPrice] = useState("");
    const [selectedTone, setSelectedTone] = useState<any[]>();

    const imageUrl = process.env.NEXT_PUBLIC_IMG_URL;
    useEffect(() => {
        setSelectedPrice(product.birthstone_PMO?.length > 0 ? product.birthstone_PMO[0].Price : "");
    }, [])

    useEffect(() => {
        if (productType === "trending" || productType === "featured") {
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
                    imageData.length < 0 || productImage.length === 0
                        ? [defaultImage]
                        : productImage
                );
            }
        }
    }, [selectedColor, hoverColor]);

    //:::::::::::::::::::::::::::::::::::::: wishlist ::::::::::::::::::::::::::::::::::::::::://

    function s() { }

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
                    {product.image_path == null || product.image_path == undefined ?
                        <Image
                            onClick={s}
                            src="/assets/images/products/image-zamels.png"
                            width={demoVariant === "ancient" ? 352 : imgWidth}
                            height={demoVariant === "ancient" ? 452 : imgHeight}
                            loading={imgLoading}
                            onMouseOver={handleImageOver}
                            onMouseOut={handleImageOut}
                            quality={100}
                            alt={product?.name || "Product Image"}
                            className={cn(
                                `object-cover ${!disableBorderRadius && "rounded"
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
                        :
                        <Image
                            onClick={s}
                            src={`${imageUrl}${product.image_path}`}
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
                    }

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
                    "pe-0 pb-2 lg:pb-3 flex-col items-center transition duration-200 ease-in-out transform hover:-translate-y-1 md:hover:-translate-y-1.5 hover:shadow-product":
                        variant === "gridModern" ||
                        variant === "gridModernWide" ||
                        variant === "gridTrendy",
                    "pe-0 pb-2 lg:pb-3 flex-col items-center transition duration-200 ease-in-out transform border border-inherit":
                        variant === "grid",
                    " bg-white":
                        (variant === "grid" && !bgGray) ||
                        (variant === "gridModern" && !bgGray) ||
                        (variant === "gridModernWide" && !bgGray) ||
                        (variant === "gridTrendy" && !bgGray) ||
                        (variant === "gridSlim" && !bgGray),
                    "bg-gray-200": variant === "list" || bgGray,
                    "pe-0 md:pb-1 flex-col items-center": variant === "gridSlim",
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
            onClick={s}
        >

            <div
                className={cn(
                    "flex",
                    {
                        // "mb-3 md:mb-3.5": variant === "grid",
                        "mb-3 md:mb-2.5 pb-0": variant === "gridSlim",
                        "flex-shrink-0 w-32 sm:w-44 md:w-36 lg:w-44":
                            variant === "listSmall",
                        "mb-3 md:mb-2.5 relative":
                            variant === "gridModern" ||
                            variant === "gridModernWide" ||
                            variant === "gridTrendy" ||
                            variant === "grid",
                    },
                    imageContentClassName
                )}
            >
                <Link
                    href={`${ROUTES.ZamlesBIRTHSTONEPRICING}/${product.slug}`}
                    as={`birthstoneproducts/slug/`}
                    className="truncate w-full text-sm text-heading mb-1.5"
                >
                    {showImage()}
                </Link>

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

                {/* Product Title, Price */}
                <Link
                    href={{
                        pathname: `${ROUTES.ZamlesBIRTHSTONEPRICING}/${product.slug}`,
                    }}
                    className="w-full text-sm mb-1.5"
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
                                className={`text-black truncate feijoa-bold tracking-[1px] leading-[1.2] TCC-product-text-diamond-shape`}
                            >
                                {selectedTitle}
                            </span>
                        ) : (
                            <span
                                className={`text-[${webConfigBgColor}] leading-5 hover:text-[#DB901F] truncate`}
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
                    <span className={`text-lg flex justify-center text-[${webConfigBgColor}] font-bold`}>
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

                </div>
            </div>
        </div>
    );
};

export default ZamlesBirthstoneProductCard;
