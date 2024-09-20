import React, { useState, useEffect, useContext } from "react";

import Button from "@components/ui/button";
import { useRouter } from "next/router";
import { useWindowSize } from "@utils/use-window-size";
import Carousel from "@components/ui/carousel/carousel";
import { SwiperSlide } from "swiper/react";
import ProductMetaReview from "@components/product/product-meta-review";
import { useSsrCompatible } from "@utils/use-ssr-compatible";
import MetalColor from "../Product_Details/Metal_Tone";
import Phone from "../icons/Phone";
import Email from "../icons/Email";
import ReactStars from "react-rating-stars-component";
import HandColorChange from "./hand_color_change";
import Cookies from "js-cookie";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useUI } from "@contexts/ui.context";
import RotatingImage from "../360_Image_component/360-image";
import { useProductDescriptionQuery } from "@framework/product/get-product-description";
import { ProductDetailsContext } from "@contexts/productDetails/product-Details-Context";
import {
  FilterDataType,
  ProductDetailImage,
  ProductDetailPMO,
  ProductImageType,
} from "@framework/types";
import CaratMetal from "@components/Product_Details/CaratMetal";
import { useFilterQuery } from "@framework/main_filters/main-filters";
import Video from "@components/video/video";
import { CURRENCY } from "@utils/constants";
import { useAddWishListMutation } from "@framework/product/wishlist/add-wishlist-product";
import { getUserDetails } from "@store/authorization";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { useDeleteWishListMutation } from "@framework/product/wishlist/delete-wishlist-product";
import { ROUTES } from "@utils/routes";
import { useAddToCart } from "@framework/cart/addToCart";
import { CompanyInfoContext } from "@contexts/company_info/company_info";
import DocumentMeta from "react-document-meta";
import FallbackSpinner from "@components/spinner";
import { toast } from "react-toastify";

const productGalleryCarouselResponsive = {
  "768": {
    slidesPerView: 2,
  },
  "0": {
    slidesPerView: 1,
  },
};
const ProductSingleDetails: React.FC = () => {
  const { query: { slug } } = useRouter();
  const router = useRouter();
  console.log(router);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
  }, []);

  const { setModalView, openModal } = useUI();

  function handleReviewPopup() {
    setModalView("INQUIRY");
    return openModal();
  }

  const userData = getUserDetails();
  const userID = userData?.id_app_user;

  const { isAuthorized } = useUI();
  const [payload, setPayload] = useState({ slug: slug });
  const [authPayload, setAuthPayload] = useState({
    user_id: userID,
    slug: slug,
  });

  const {
    data: productDescriptionData,
    isLoading: productDescriptionDataLoading,
  } = useProductDescriptionQuery(isAuthorized ? authPayload : payload);

  const { data: filterData } = useFilterQuery();
  const { data: addToCartData, mutate: addToCart } = useAddToCart();
  const productData = productDescriptionData?.data?.data?.products;
  const DiamondData =
    productDescriptionData?.data?.data?.center_diamond_details[0];
  const productId = productData && productData.id;
  const { width } = useSsrCompatible(useWindowSize(), { width: 0, height: 0 });
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const [shareClick, setShareClick] = useState(false);
  const [productDataByKarat, setProductDataByKarat] = useState<
    ProductDetailPMO[]
  >([]);
  const [productPrizeByKarat, setProductPrizeByKarat] = useState();
  const [size, setSize] = useState<any[]>();
  const [presentTone, setPresentTone] = useState<any[]>([]);
  const [selectedTone, setSelectedTone] = useState<FilterDataType[]>();
  const [setting, setSetting] = useState(true);
  const [productImages, setproductImages] = useState([]);
  const [ringImages, setRingImages] = useState([]);
  const [ringVideo, setRingVideo] = useState([]);
  const [isInWishlist, setIsInWishList] = useState<boolean>();
  const [meta, setMeta] = useState({});
  const [isLoading, setLoading] = useState(true);
  // const [addToCartCookieData, setAddToCartCookieData] = useState<any>([]);
  console.log("productData", productData);

  const { updateCartTotalItems, updateWishTotalItems, companyInfo } =
    useContext(CompanyInfoContext);

  const {
    data: addWishlistData,
    mutate: addWishList,
    isLoading: addWishLoading,
  } = useAddWishListMutation();

  const {
    data: deleteDataResponse,
    mutate: deteleWishList,
    isLoading: deleteWishLoading,
  } = useDeleteWishListMutation();

  useEffect(() => {
    if (addToCartData && addToCartData.data) {
      updateCartTotalItems(addToCartData?.data);
    }
  }, [addToCartData]);

  const {
    hoverMetal,
    selectedMetal,
    selectedCaratId,
    caratValue,
    selectedToneName,
    ringRotatingImages,
    showTones,
    ringSize,
    ringValue,
    updateSelectedMetal,
    updateSelectedToneName,
    updateRingRotatingImages,
    updateShowTones,
    updateProduct,
    updateRingSize,
    updateRingValue,
    updateEnquiryImage,
    updateDiamondShape,
  } = useContext(ProductDetailsContext);

  const imageUrl = process.env.NEXT_PUBLIC_IMG_URL;

  useEffect(() => {
    if (isAuthorized) {
      setAuthPayload({
        slug: slug,
        user_id: userID,
      });
    } else {
      setPayload({
        slug: slug,
      });
    }
  }, [slug]);

  useEffect(() => {
    let productMetalByKarat = [];
    if (selectedCaratId) {
      if (selectedCaratId.indexOf("M_") >= 0) {
        //Selected Metal
        const filterCaratId = selectedCaratId.replace("M_", "");
        productMetalByKarat = productData?.PMO?.filter(
          (item: ProductDetailPMO) => {
            return (
              item.id_karat === null &&
              parseInt(`${item.id_metal}`) === parseInt(filterCaratId)
            );
          }
        );
        setProductDataByKarat(productMetalByKarat);
      } else {
        //Selected Karat
        const filterCaratId = selectedCaratId.replace("K_", "");
        productMetalByKarat = productData?.PMO?.filter(
          (item: ProductDetailPMO) => {
            return (
              item.id_karat !== null &&
              parseInt(`${item.id_karat}`) === parseInt(filterCaratId)
            );
          }
        );
        setProductDataByKarat(productMetalByKarat);
      }
    }

    setProductPrizeByKarat(
      productMetalByKarat?.length > 0
        ? productMetalByKarat[0]?.Price?.toFixed(2)
        : ""
    );
    const displayToneList =
      productMetalByKarat?.length > 0
        ? productMetalByKarat[0]?.metal_tone
        : "" || [];
    setPresentTone(displayToneList);
    //===================Show Hide Tones================================//

    if (displayToneList.length > 0) {
      updateShowTones(true);
    } else {
      updateShowTones(false);
    }
  }, [selectedCaratId]);

  useEffect(() => {
    const productMetalData = filterData?.data?.metalToneData;
    const tones =
      productMetalData?.filter((tone: FilterDataType) => {
        if (presentTone?.indexOf(parseInt(`${tone.id}`)) >= 0) return tone;
      }) || [];

    setSelectedTone(tones);
    updateSelectedMetal(`${tones?.length > 0 ? tones[0].id : ""}`);
    updateSelectedToneName(`${tones?.length > 0 ? tones[0].name : ""}`);
  }, [selectedCaratId, productDataByKarat]);

  useEffect(() => {
    let displayTone = selectedMetal;
    if (hoverMetal != "") {
      displayTone = hoverMetal;
    } else {
      if (selectedMetal != "") {
        displayTone = selectedMetal;
      }
    }
    // if (displayTone != "") {

    //   );
    if (!productDataByKarat) return;
    const productImagesData = productData?.product_images?.filter(
      (item: any) => {
        return productDataByKarat[0]?.id_karat === null
          ? item.metal_tone_sort_code === "WG"
          : parseInt(item.id_metal_tone) === parseInt(displayTone);
      }
    );
    setproductImages(productImagesData);

    // }
  }, [selectedMetal, hoverMetal, productData, selectedCaratId]);

  //==================== filterImage by Image_Type ===================//

  useEffect(() => {
    const image = productImages?.filter((type: any) => {
      return type.image_type === ProductImageType.RingImage;
    });
    setRingImages(image);
    updateEnquiryImage(image);

    const ringVideoarr = productImages?.filter((type: any) => {
      return type.image_type === ProductImageType.RingVideo;
    });
    setRingVideo(ringVideoarr);

    const RotatingImage = productImages?.filter((type: any) => {
      return type.image_type === ProductImageType.RotatingImage;
    });
    updateRingRotatingImages(RotatingImage);
  }, [productImages]);

  useEffect(() => {
    // if (productImages && productImages.length !== 0) {
    // }
    setLoading(false);
  }, [productImages]);

  useEffect(() => {
    updateRingSize(`${productDescriptionData?.data?.data?.size[0]?.size}`);
    updateRingValue(`${productDescriptionData?.data?.data?.size[0]?.id}`);
    updateProduct(productDescriptionData?.data?.data?.products);
    updateDiamondShape(
      productDescriptionData?.data?.data?.center_diamond_details[0]?.shape
    );
    if (productData && productData?.is_wishlist === "1") {
      setIsInWishList(true);
    } else {
      setIsInWishList(false);
    }
  }, [productDescriptionData, deleteDataResponse, productData]);
  useEffect(() => {
    setSize(
      productDescriptionData &&
      productDescriptionData?.data?.data?.size?.map((item: any) => ({
        value: `${item?.id}`,
        label: `${item?.size}`,
      }))
    );

    const tags = productDescriptionData?.data?.data?.tages.map((tag: any) => {
      return tag.name;
    });

    const meta = {
      title: productData?.name,
      description: productData?.sort_description,
      meta: {
        charset: "utf-8",
        name: {
          keywords: tags,
        },
      },
    };
    setMeta(meta);
  }, [productDescriptionData]);

  useEffect(() => {
    updateWishTotalItems(addWishlistData?.data?.wish_list_count);
  }, [addWishlistData]);

  useEffect(() => {
    updateWishTotalItems(deleteDataResponse?.data);
  }, [deleteDataResponse]);

  // if (productDescriptionDataLoading) return <p>Loading...</p>;
  if (productDescriptionDataLoading)
    return (
      <p>
        <FallbackSpinner />
      </p>
    );
  // setTimeout(() => {
  //   setLoading(false);
  // }, 2000);

  const handleAddToCart = () => {
    console.log("ringValue", ringValue && ringValue != "undefined" ? ringValue : null);

    if (isAuthorized) {
      addToCart({
        user_id: userID,
        product_id: productId as string,
        SKU: productData.sku,
        size: ringValue && ringValue != "undefined" ? ringValue : null,
        length: null,
        metal_id: productDataByKarat[0]?.id_metal as unknown as string,
        karat_id: productDataByKarat[0]?.id_karat as unknown as string,
        metal_tone_id: selectedMetal,
      });
    } else {
      const guestCartItem: any = Cookies.get("GUEST_CART_ITEMS");
      const guestCartCookieItem = guestCartItem && JSON.parse(guestCartItem);

      const addToCartCookieData: any[] = [];
      addToCartCookieData.push({
        user_id: userID,
        product_id: productId as string,
        SKU: productData.sku,
        size: ringValue && ringValue != "undefined" ? ringValue : null,
        length: null,
        metal_id: productDataByKarat[0]?.id_metal as unknown as string,
        karat_id: productDataByKarat[0]?.id_karat as unknown as string,
        metal_tone_id: selectedMetal,
      });

      if (guestCartCookieItem === undefined) {
        const finalCartCookieArr: any = [];
        finalCartCookieArr.push(...addToCartCookieData);
        Cookies.set("GUEST_CART_ITEMS", JSON.stringify(finalCartCookieArr));
      } else {
        const findCommonCartItem = guestCartCookieItem.filter((t: any) => {
          return t.SKU === productData.sku;
        });
        if (findCommonCartItem.length !== 0) {
          toast.error("Product is already in cart");
        } else {
          const finalCartCookieArr: any = [];
          finalCartCookieArr.push(
            ...guestCartCookieItem,
            ...addToCartCookieData
          );
          Cookies.set("GUEST_CART_ITEMS", JSON.stringify(finalCartCookieArr));
        }
      }
    }
  };
  const handleRingSize = (e: any) => {
    updateRingSize(e.label);
    updateRingValue(e.value);
  };

  //:::::::::::::::::::::::::::::::: wishList ::::::::::::::::::::::::::::::::::://

  const handleWishClick = () => {
    addWishList({
      user_id: userID as number,
      product_id: productId as number,
    });
    if (!isAuthorized) {
      router.push(`${ROUTES.LOGIN}`);
    } else {
      setIsInWishList(true);
    }
  };

  const handleRemoveWish = () => {
    deteleWishList({
      user_id: userID as number,
      product_id: productId as number,
    });
    setIsInWishList(false);
  };

  return (
    <>
      {isLoading ? (
        <FallbackSpinner />
      ) : (
        <DocumentMeta {...meta}>
          <div className="block lg:grid grid-cols-9 gap-x-10 xl:gap-x-14 pt-7 pb-10 lg:pb-14 2xl:pb-20 px-4 md:px-8 2xl:px-16 TCC-main-component">
            {width < 1025 ? (
              <Carousel
                pagination={{
                  clickable: true,
                }}
                breakpoints={productGalleryCarouselResponsive}
                className="product-gallery"
                buttonGroupClassName="hidden"
              >
                {ringVideo &&
                  ringVideo.length > 0 &&
                  ringVideo?.map((item: ProductDetailImage, index) => {
                    return (
                      <div
                        key={index}
                        className="col-span-1 transition duration-150 ease-in hover:opacity-90"
                      >
                        <Video src={`${imageUrl}${item.image_path}`} />
                      </div>
                    );
                  })}
                {ringImages &&
                  ringImages.length > 0 &&
                  ringImages?.map((item: ProductDetailImage, index: number) => (
                    <SwiperSlide key={`product-gallery-key-${index}`}>
                      <div className="col-span-1 transition duration-150 ease-in hover:opacity-90">
                        <img
                          key={index}
                          src={`${imageUrl}${item.image_path}`}
                          alt={`${item?.image_type}--${index}`}
                          className="object-cover w-full"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
              </Carousel>
            ) : (
              <div className="col-span-5 grid grid-cols-2 gap-2.5 TCC-image-component px-4 md:px-8 2xl:px-16">
                {ringVideo &&
                  ringVideo.length > 0 &&
                  ringVideo?.map((item: ProductDetailImage, index) => {
                    return (
                      <div
                        key={index}
                        className="col-span-1 transition duration-150 ease-in hover:opacity-90"
                      >
                        <Video src={`${imageUrl}${item.image_path}`} />
                      </div>
                    );
                  })}
                {ringImages &&
                  ringImages.length > 0 &&
                  ringImages?.map((item: ProductDetailImage, index: number) => {
                    return (
                      <div
                        key={index}
                        className="col-span-1 transition duration-150 ease-in hover:opacity-90"
                      >
                        <img
                          src={`${imageUrl}${item.image_path}`}
                          alt={`${item?.image_type}--${index}`}
                          className="object-cover w-full"
                        />
                      </div>
                    );
                  })}

                {size && size!.length !== 0 && <HandColorChange />}
                {ringRotatingImages && ringRotatingImages?.length > 0 && (
                  <RotatingImage
                    imgData={ringRotatingImages}
                    productData={productData}
                  />
                )}
              </div>
            )}
            {/*  Name  */}
            <div
              className="col-span-4 pt-8 lg:pt-0 TCC-dis-component"
              id="right"
            >
              <div className="pb-7">
                <div className="flex">
                  <h2
                    className={`cursor-pointer hover:text-black mb-3.5 TCC-product-detail-heading`}
                  >
                    {productData?.name}
                  </h2>
                  <span
                    className="mt-3 mx-3 cursor-pointer"
                    onClick={() => setShareClick(!shareClick)}
                  >
                    <img
                      src={"/assets/TCCimage/share-icon.png"}
                      alt={`share`}
                      className="object-cover w-6 h-6"
                    />
                  </span>
                </div>
                <div>
                  <h2 className="text-bold mb-3.5 ">{productData?.sku}</h2>
                </div>
                {shareClick && (
                  <div className="gap-5">
                    <EmailShareButton
                      className="mx-2"
                      url={window.location.href}
                    >
                      <EmailIcon size={32} round={true} />
                    </EmailShareButton>
                    <FacebookShareButton
                      className="mx-2"
                      url={window.location.href}
                    >
                      <FacebookIcon size={32} round={true} />
                    </FacebookShareButton>
                    <WhatsappShareButton
                      className="mx-2"
                      url={window.location.href}
                    >
                      <WhatsappIcon size={32} round={true} />
                    </WhatsappShareButton>
                  </div>
                )}
                <div className="flex grid-cols-4">
                  <span className="flex flex-col">
                    <ReactStars
                      count={5}
                      size={25}
                      value={productData?.rating?.toFixed(1)}
                      color="#c6c6c6"
                      activeColor="#DBB961"
                      isHalf={true}
                      edit={false}
                    />
                  </span>
                  <span className="flex flex-col ml-2">
                    {" "}
                    {productData?.rating?.toFixed(1)}
                  </span>
                </div>

                {/* {/ Discription /} */}
                <p className="text-body TCC-product-detail-discription w-2/3">
                  {productData?.sort_description}
                </p>
                <div>
                  {/*  Diamond Images  */}
                  {/*  <DiamondShape product={product!} />  */}
                </div>
                <div className="w-2/4 my-8">
                  <label htmlFor="customRange3" className="form-label">
                    <span className="TCC-product-text-diamond-shape  ">
                      Metal :{" "}
                    </span>
                    <span className="uppercase"> {caratValue} </span>{" "}
                    {showTones ? <span>Gold</span> : ""}
                  </label>

                  <div className="carat-metal flex w-full">
                    <CaratMetal data={productDescriptionData?.data?.data} />
                  </div>
                </div>
                {showTones ? (
                  <div>
                    <MetalColor product={selectedTone} />
                  </div>
                ) : (
                  <></>
                )}

                <div className="flex items-center mt-5">
                  <div
                    className={`text-[${companyInfo.web_secondary_color}] font-bold text-base md:text-xl lg:text-2xl 2xl:text-4xl pe-2 md:pe-0 lg:pe-2 2xl:pe-0`}
                  >
                    <span className="TCC-product-text-diamond-price font-semibold">
                      Price* : {CURRENCY}
                      {productPrizeByKarat}
                    </span>
                  </div>

                  {/* {discount && (
              <span className="line-through font-segoe text-gray-400 text-sm md:text-base lg:text-lg xl:text-xl ps-2">
                {basePrice}
              </span>
            )} */}
                </div>
              </div>
              {size && size.length !== 0 && (
                <div className="mb-5 w-2/4">
                  <span className="TCC-product-text-diamond-shape ">
                    Select Ring Size
                  </span>
                  <Dropdown
                    onChange={(e) => handleRingSize(e)}
                    className="w-2/4 mt-3"
                    options={size! || []}
                    value={`${ringSize}`}
                  />
                </div>
              )}
              {/*  Show Setting Component  */}

              {setting && (
                <div className="bg-[#F8F8F8] w-30 mb-5 rounded-2xl">
                  <p className="p-5 mt-3 TCC-diamond-setting-title">
                    The total diamond carat weight of your ring is{" "}
                    {productData &&
                      Number(productData?.total_diamond_weight).toFixed(2)}{" "}
                    ct.
                  </p>
                  <div className="p-5 flex">
                    <div className="">
                      <img
                        src={"/assets/TCCimage/ring-setting.png"}
                        alt={"ring-setting"}
                        className="object-cover w-30 "
                      />
                    </div>
                    <div className="mt-2 mx-3">
                      <span className="TCC-diamond-setting-text">
                        {`${caratValue} ${showTones ? selectedToneName : ""}  ${productData?.name
                          }`}
                      </span>
                      {/*  <div className="TCC-diamond-setting-text">$1150</div>  */}
                    </div>
                  </div>
                  <div className="p-5 flex">
                    <div>
                      <img
                        src={"/assets/TCCimage/diamond-setting.png"}
                        alt={"ring-setting"}
                        className="object-cover w-30"
                      />
                    </div>
                    <div className="mt-2 mx-3">
                      <div className="TCC-diamond-setting-text">
                        {`${Number(DiamondData?.weight)?.toFixed(2)} Carat ${DiamondData?.shape
                          } ${DiamondData?.diamond}`}
                      </div>
                      <div className="TCC-diamond-setting-text">
                        {`${DiamondData?.diamond_cut} • ${DiamondData?.diamond_color} • ${DiamondData?.diamond_clarity} clarity`}
                      </div>
                      {/*  <div className="TCC-diamond-setting-text">$750</div>  */}
                    </div>
                  </div>
                </div>
              )}

              {/*  Add to Cart Button  */}
              <div className="flex felx-cols mb-12 items-center">
                <Button
                  onClick={handleAddToCart}
                  variant="slim"
                  className={`relative w-1/3 md:w-1/3 bg-bgColor hover:bg-bgColor hover:w-[34%]`}
                  loading={addToCartLoader}
                >
                  <span className="py-2 3xl:px-8">ADD TO BAG</span>
                </Button>
                <div className="pl-4 cursor-pointer">
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
              </div>

              <div className="bg-[#F8F8F8] h-20 w-50 mb-5 flex justify-between">
                <div
                  className="flex justify-between items-center mx-5 cursor-pointer"
                  onClick={handleReviewPopup}
                >
                  <span>
                    <Email />
                  </span>
                  <span className="mx-2">Enquire Now</span>
                </div>
                <div className="flex justify-between items-center mx-5 cursor-pointer">
                  <span>
                    <Phone />
                  </span>
                  <span className="mx-2">+27 11 681 0209</span>
                </div>
              </div>
              <ProductMetaReview
                data={productData}
                selectedCaratSize={caratValue}
                diamondData={DiamondData}
                ringSize={ringSize}
              />
            </div>
          </div>
        </DocumentMeta>
      )}
    </>
  );
};

export default ProductSingleDetails;
