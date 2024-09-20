import BannerCard from "@components/common/banner-card";
import Carousel from "@components/ui/carousel/carousel";
import { SwiperSlide } from "swiper/react";
import { useWindowSize } from "@utils/use-window-size";
import { ROUTES } from "@utils/routes";
import { useSsrCompatible } from "@utils/use-ssr-compatible";

const breakpoints = {
  "1025": {
    slidesPerView: 3,
    spaceBetween: 28,
  },
  "768": {
    slidesPerView: 3,
    spaceBetween: 20,
  },
  "480": {
    slidesPerView: 2,
    spaceBetween: 12,
  },
  "0": {
    slidesPerView: 1,
    spaceBetween: 12,
  },
};

interface BannerProps {
  className?: string;
  limit?: number;
  data?: any;
}

export interface BannerData  {
  id : number;
  name : string;
  target_url: string;
  created_date: string;
  content: string;
  image_path: string;
}

export interface Banner {
  id: number;
  title: string;
  slug: string;
  image: {
    mobile:{
      url: string 
      width: number;
      height:number;
    },
    desktop:{
      url: string
      width: number;
      height:number;
    },
  },
  type: string;
}

const SaleBannerGrid: React.FC<BannerProps> = ({
  className = "mb-12 lg:mb-14 xl:mb-16 lg:pb-1 xl:pb-0",
  limit = 3,
  data,
}) => {
  const { width } = useSsrCompatible(useWindowSize(), { width: 0, height: 0 });
  const salebannerdata = data?.data?.result;

  const banner =
    salebannerdata &&
    salebannerdata.map((bannerdata:BannerData) => {
      return {
        id: bannerdata.id,
        title: bannerdata.name,
        slug: bannerdata.target_url,

        image: {
          mobile: {
            url: `${process.env.NEXT_PUBLIC_IMG_URL}${bannerdata.image_path}`,
            width: 690,
            height: 400,
          },
          desktop: {
            url: `${process.env.NEXT_PUBLIC_IMG_URL}${bannerdata.image_path}`,
            width: 1920,
            height: 1450,
          },
        },
        type: "large",
      };
    });

  return (
    <div className={`${className}`}>
      {width < 768 ? (
        <div>
          <Carousel
            breakpoints={breakpoints}
            prevActivateId="prev"
            nextActivateId="next"
          >
            {banner?.slice(0, limit).map((banner: Banner) => (
              <SwiperSlide key={banner.id}>
                <BannerCard
                  banner={banner}
                  href={`${ROUTES.PRODUCT}`}
                  className="h-full"
                  effectActive={true}
                />
              </SwiperSlide>
            ))}
          </Carousel>
        </div>
      ) : (
        <div className="mb-12 md:mb-14 xl:mb-16 px-2.5 grid grid-cols-3 gap-2 md:gap-2.5 max-w-[1920px] mx-auto">
       
          {banner?.slice(0, limit).map((banner: Banner) => (
            <BannerCard
              key={banner.id}
              banner={banner}
              href={`${ROUTES.PRODUCT}`}
              className={banner.type === "large" ? "" : ""}
              effectActive={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SaleBannerGrid;
