import React from "react";
import BannerCard from "@components/common/banner-card";
import Carousel from "@components/ui/carousel/carousel";
import { SwiperSlide } from "swiper/react";
import { ROUTES } from "@utils/routes";

export const BannerQueenLovestory = () => {
  const SliderData = [
    {
      id: 1,
      title: "LoveStoryBanner",
      slug: "LoveStoryBanner",
      image: {
        mobile: {
          url: "/assets/images/NunguLoveStory/Group 185.png",
          width: 450,
          height: 180,
        },
        desktop: {
          url: "/assets/images/NunguLoveStory/Group 185.png",
          width: 1440,
          height: 770,
        },
      },
      type: "small",
    },
  ];
  const breakpoints = {
    "0": {
      slidesPerView: 2,
    },
  };

  return (
    <div
      className={`mb-12 md:mb-14 xl:mb-16 mx-auto max-w-[1920px] overflow-hidden`}
    >
      <div className="-mx-32 sm:-mx-44 lg:-mx-60 xl:-mx-72 2xl:-mx-80">
        <Carousel
          breakpoints={breakpoints}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 4000,
          }}
          pagination={{
            clickable: true,
          }}
          paginationVariant="circle"
          buttonGroupClassName="hidden"
        >
          {SliderData.map((banner: any) => (
            <SwiperSlide
              key={`banner--key${banner.id}`}
              className="px-1.5 md:px-2.5 xl:px-3.5"
            >
              <BannerCard
                banner={banner}
                effectActive={true}
                href={`${ROUTES.NUNGU_LOVE_STORY}`}
              />
            </SwiperSlide>
          ))}
        </Carousel>
      </div>
    </div>
  );
};
