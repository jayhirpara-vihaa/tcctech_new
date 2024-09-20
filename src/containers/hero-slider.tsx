import BannerCard from "@components/common/banner-card";
import Carousel from "@components/ui/carousel/carousel";

import { ROUTES } from "@utils/routes";
import { SwiperSlide } from "swiper/react";
import { useUI } from "@contexts/ui.context";
import { BannerList, desktop, mobile } from "@framework/types";
import { Banner } from "./sale-banner-grid";
import cn from "classnames";

interface Props {
  data: BannerList;
  className?: string;
  buttonGroupClassName?: string;
  variant?: "box" | "fullWidth";
  variantRounded?: "rounded" | "default";
  prevNextButtons?: "none" | "";
  typedata?: "static";
  mobile: mobile;
  desktop: desktop;
}
//  2xl:mb-[75px]
const HeroSlider: React.FC<Props> = ({
  variant = "box",
  className = "mb-12 md:mb-14 xl:mb-[60px]",
  variantRounded = "rounded",
  buttonGroupClassName = "",
  data,
  typedata,
  mobile,
  desktop,
  prevNextButtons = "",
}) => {
  const sliderBanner = data?.data?.result;
  const { setModalView, openModal } = useUI();
  function handleAppoitmentPopup() {
    setModalView("APPOINTMENT");
    return openModal();
  }

  const banner =
    sliderBanner &&
    sliderBanner.map((bannerdata) => {
      return {
        id: bannerdata.id,
        title: bannerdata.name,
        slug: bannerdata.name,
        image: {
          mobile: {
            url:
              typedata === "static"
                ? bannerdata.image_path
                : `${process.env.NEXT_PUBLIC_IMG_URL}${bannerdata.image_path}`,
            width: mobile?.width,
            height: mobile?.height,
          },
          desktop: {
            url:
              typedata === "static"
                ? bannerdata.image_path
                : `${process.env.NEXT_PUBLIC_IMG_URL}${bannerdata.image_path}`,
            width: desktop.width,
            height: desktop.height,
          },
        },
        type: "large",
      };
    });
  return (
    <div
      className={cn(
        "relative mb-5 md:mb-8",
        {
          "mx-auto max-w-[1920px]": variant === "fullWidth",
        },
        className
      )}
    >
      <Carousel
        autoplay={{
          delay: 5000,
        }}
        className={`mx-0 ${
          variant === "fullWidth" ? "carousel-full-width" : ""
        }`}
        paginationPosition="left"
        prevButtonClasses={`start-6 md:start-8 xl:start-12 2xl:start-16 ${
          prevNextButtons === "none" && "hidden"
        }`}
        nextButtonClasses={`end-6 md:end-8 xl:end-12 2xl:end-16 ${
          prevNextButtons === "none" && "hidden"
        }`}
        buttonGroupClassName={buttonGroupClassName}
        nextActivateId="hero-slider-next"
        prevActivateId="hero-slider-prev"
        pagination={{
          clickable: true,
        }}
      >
        {banner?.map((banner: Banner) => (
          <SwiperSlide
            className="carouselItem"
            key={`banner--key-${banner.id}`}
          >
            <BannerCard
              key={banner.id}
              banner={banner}
              href={`${ROUTES.PRODUCT}`}
              className={banner.type === "large" ? "" : ""}
              effectActive={true}
              variant={variantRounded}
            />

            {/* {!typedata && (
              <div
                className="hidden md:block bg-white"
                onClick={handleAppoitmentPopup}
              >
                <button className="TCC-make-an-appointment" />
                <span className="font-semibold TCC-make-an-appointment-text">
                  Make An Appointment
                </span>
              </div>
            )} */}
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroSlider;
