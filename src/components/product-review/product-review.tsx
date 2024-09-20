import React, { useContext, useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import Button from "@components/ui/button";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";
import Text from "@components/ui/text";
import Carousel from "@components/ui/carousel/carousel";
import { useTranslation } from "next-i18next";
import { useUI } from "@contexts/ui.context";
import {
  listProductReviewMutation,
  reviewListData,
} from "@framework/product/review/list-product-review";
import { useRouter } from "next/router";
import { ProductDetailsContext } from "@contexts/productDetails/product-Details-Context";
import moment from "moment";

const image = [
  "/assets/TCCimage/Review/reviews-1.png",
  "/assets/TCCimage/Review/reviews-2.png",
  "/assets/TCCimage/Review/reviews-3.png",
  "/assets/TCCimage/Review/reviews-4.png",
  "/assets/TCCimage/Review/reviews-5.png",
  "/assets/TCCimage/Review/reviews-6.png",
];

const review = [
  {
    id: "1",
    date: "12-02-2023",
    name: "Sophie's fiancé",
    review: "My fiancee absolutely loves it!",
    discription:
      "Everything about the ring is perfect. It is the exact size she wanted and looks even more beautiful than we imagined. All of our friends are wowed when they look at it.",
  },
  {
    id: "2",
    name: "Sophie's fiancé",
    date: "12-02-2023",
    review: "My fiancee absolutely loves it!",
    discription:
      "Everything about the ring is perfect. It is the exact size she wanted and looks even more beautiful than we imagined. All of our friends are wowed when they look at it.",
  },
  {
    id: "3",
    name: "Sophie's fiancé",
    date: "12-02-2023",
    review: "My fiancee absolutely loves it!",
    discription:
      "Everything about the ring is perfect. It is the exact size she wanted and looks even more beautiful than we imagined. All of our friends are wowed when they look at it.",
  },
  {
    id: "4",
    date: "12-02-2023",
    name: "Sophie's fiancé",
    review: "My fiancee absolutely loves it!",
    discription:
      "Everything about the ring is perfect. It is the exact size she wanted and looks even more beautiful than we imagined. All of our friends are wowed when they look at it.",
  },
];

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

const ProductReview = () => {
  const { setModalView, openModal, closeModal } = useUI();
  const [reviewButton, setReviewButton] = useState(false);
  const [reviewImage, setReviewImage] = useState([]);
  const { product } = useContext(ProductDetailsContext);
  const productId = product?.id;

  const { data: listReview, mutate: listProductReview } =
    listProductReviewMutation();
  const { isAuthorized } = useUI();

  const imgUrl = process.env.NEXT_PUBLIC_IMG_URL;

  useEffect(() => {
    if (productId && productId !== null) {
      listProductReview({
        product_id: Number(productId),
      });
    }
  }, [productId]);

  function handleReviewPopup() {
    setModalView("REVIEW");
    return openModal();
  }

  const { t } = useTranslation("common");
  useEffect(() => {
    if (isAuthorized) {
      setReviewButton(true);
    } else {
      setReviewButton(false);
    }
  }, [isAuthorized]);

  useEffect(() => {
    listReview?.data?.map((item: any) => {
      setReviewImage(
        item.product_images.length > 0 && item?.product_images[0]?.image_path
      );
    });
  }, [listReview]);
  return (
    <>
      <div
        className={`flex items-center justify-center mt-2 pb-0.5 mb-2 md:mb-5 lg:mb-6 2xl:mb-7 3xl:mb-8`}
      >
        <Text className="Tcc-text-our-Jewelry-Section">
          {t("text-item-review")}
        </Text>
      </div>
      <div className="bg-[#F5ECD2] px-4 md:px-8 2xl:px-16">
        <div className="flex justify-between">
          <div className="w-[30%] my-3">
            <h1 className="TCC-h1-tag">Reviews</h1>
            <div>
              <span className="flex flex-col">
                <ReactStars
                  count={5}
                  size={25}
                  color="#c6c6c6"
                  activeColor="#DBB961"
                  edit={false}
                  value={listReview && listReview?.data?.length}
                />
              </span>
            </div>
            <div>{listReview && listReview?.data?.length} Reviews</div>

            {reviewButton && (
              <div className="mt-2">
                <Button
                  className="w-[40%] h-[3rem] hover:w-[41%] hover:h-[3.2rem]"
                  onClick={handleReviewPopup}
                  variant="flat"
                >
                  <span>WRITE A REVIEW</span>
                </Button>
              </div>
            )}
          </div>
          <div className="w-[70%] my-3">
            {reviewImage?.length > 0 && (
              <Carousel
                breakpoints={flashSaleCarouselBreakpoint}
                buttonSize="small"
                buttonGroupClassName=""
                className="-mx-0 md:-mx-2.5 xl:-mx-0"
                nextActivateId="Setting-Style-slider-next"
                prevActivateId="Setting-Style-slider-prev"
                prevButtonClasses={`start-10 md:start-12 xl:start-12 2xl:start-16`}
                nextButtonClasses={`end-10 md:end-12 xl:end-12 2xl:end-16`}
              >
                {reviewImage?.map((item: any, index: number) => {
                  return (
                    <SwiperSlide key={`product-gallery-${index}`}>
                      <span className="mx-2">
                        <Image
                          src={`${imgUrl}${item}`}
                          width={144}
                          height={150}
                          loading="eager"
                          alt={"Product Image"}
                          className="bg-gray-300 object-cover"
                        />
                      </span>
                    </SwiperSlide>
                  );
                })}
              </Carousel>
            )}
          </div>
        </div>

        <div className="review">
          <h1 className="border-b border-slate-400 TCC-h1-tag">Review</h1>
          {listReview?.data?.map((item: any) => {
            return (
              <div
                key={item.id}
                className="border-b border-slate-400 mt-10 mb-3  w-full"
              >
                <div>
                  <div className="flex justify-between">
                    <div className="TCC-medium-text font-semibold">
                      {item.reviewer_name}
                    </div>
                    <div>{moment(item.modified_date).format("MM/DD/YY")}</div>
                  </div>
                  <div>
                    <span className="flex flex-col">
                      <ReactStars
                        count={5}
                        size={35}
                        value={item.rating}
                        color="#DBB961"
                      />
                    </span>
                  </div>
                  <div className="TCC-small-text">{item.your_rating}</div>
                  <div className="TCC-small-text mt-1 mb-3">{item.comment}</div>
                </div>
                <div className="w-[70%] my-3">
                  {/* {item.product_images.map((item: any, index: number) => {
                    return (
                      <SwiperSlide key={`product-gallery-${index}`}>
                        <span className="mx-2 flex justify-center">
                          <Image
                            src={`${imgUrl}${item.image_path}`}
                            width={144}
                            height={150}
                            loading="eager"
                            alt={"Product Image"}
                            className="bg-gray-300 object-cover"
                          />
                        </span>
                      </SwiperSlide>
                    );
                  })} */}
                </div>
              </div>
            );
          })}
        </div>

        {/* <div className="flex justify-center">
          <button
            type="button"
            className="my-7 inline-flex items-center  border border-orange-400 bg-[#F5ECD2] px-6 py-3 text-base font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Load More
          </button>
        </div> */}
      </div>
    </>
  );
};

export default ProductReview;
