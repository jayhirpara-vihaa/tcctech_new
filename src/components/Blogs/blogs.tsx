import React, { useEffect, useState } from "react";
import Image from "next/image";
import BannerCard from "@components/common/banner-card";
import { ROUTES } from "@utils/routes";
import Button from "@components/ui/button";
import { useTranslation } from "next-i18next";
import Container from "@components/ui/container";
import { useRouter } from "next/router";
import { useBlogsDetailsQuery } from "src/framework/Blog/get-blog-details";
import { BlogsData } from "@framework/types";
import moment from "moment";
import Link from "@components/ui/link";
import { Banner } from "@containers/sale-banner-grid";

const image = [
  {
    id: "1",
    article: "Very classy jewelry collection for women",
    image: "/assets/Blog/blog-1-image.png",
  },
  {
    id: "2",
    article: "Sparkling stone that attracts men & women",
    image: "/assets/Blog/blog-2-image.png",
  },
  {
    id: "3",
    article: "Golden jewelry beyond the boundaries",
    image: "/assets/Blog/blog-3-image.png",
  },
];

const categories = [
  "Aliquam",
  "Architecto",
  "Corporis",
  "Laboriosam",
  "Minima",
  "Molestiae",
  "Voluptatem",
];
const banner = {
  id: 1,
  title: "We picked every item with care you must try",
  slug: "winter-collection",
  image: {
    mobile: {
      url: "/assets/images/Blog.png",
      width: 900,
      height: 340,
    },
    desktop: {
      url: "/assets/images/Blog.png",
      width: 2560,
      height: 300,
    },
  },
  type: "",
};

export default function OurStories() {
  const { t } = useTranslation();
  const baseImgUrl = process.env.NEXT_PUBLIC_IMG_URL;
  const { data: BlogsData } = useBlogsDetailsQuery();
  const router = useRouter();
  // const [banner, setbanner] = useState({} as Banner);

  const ImgUrl = process.env.NEXT_PUBLIC_IMG_URL;

  // useEffect(() => {
  //   setbanner({
  //     id: 1,
  //     title: "We picked every item with care you must try",
  //     slug: "winter-collection",
  //     image: {
  //       mobile: {
  //         url: `${ImgUrl}${BlogsData?.data?.banner_image_path}`,
  //         width: 900,
  //         height: 340,
  //       },
  //       desktop: {
  //         url: `${ImgUrl}${BlogsData?.data?.banner_image_path}`,
  //         width: 2560,
  //         height: 300,
  //       },
  //     },
  //     type: "",
  //   });
  // }, [BlogsData]);

  return (
    <div>
      {/* <div className="w-full relative mt-24 lg:mt-36 xl:mt-0">
        <BannerCard
          banner={banner}
          href={`${ROUTES.OURSTORY}`}
          variant={"rounded"}
        />
        <div className="blog-text absolute top-[50%] right-[50%] text-white">
          Blog
        </div>
      </div> */}
      <Container>
        <div className="px-4 md:px-8 2xl:px-16 py-14 xl:py-20 2xl:max-w-screen-2xl xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-full border-solid border-black">
          <div className="md:w-full lg:w-4/5 flex  h-full flex-col -mt-1.5">
            <div className="grid grid-cols-1 md:grid md:grid-cols-2 gap-7">
              {BlogsData?.data?.map((item: BlogsData) => {
                return (
                  <div
                    key={item.id}
                    className="max-w-full bg-white border border-gray-100 hover:drop-shadow-md bg-white rounded-lg shadow"
                  >
                    <div>
                      <Image
                        height={300}
                        width={600}
                        src={`${baseImgUrl}${item.image_path}`}
                        alt={item.title}
                        quality={100}
                        className="bg-gray-300 object-cover border rounded-t-lg"
                      />
                      <div className="p-5 flex">
                        <div>
                          <Image
                            height={20}
                            width={20}
                            src={"/assets/svgicon/user.png"}
                          />
                          <span className="align-top">{item.author}</span>
                        </div>
                        <div className="pl-4">
                          <Image
                            height={20}
                            width={20}
                            src={"/assets/svgicon/calendar.png"}
                          />
                          <span className="align-top pl-2">
                            {moment(item.publish_date).format("D MMM, YYYY")}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 cursor-pointer">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900  cursor-pointer hover:text-headerSecondaryTextColor">
                        {item.title}
                      </h5>
                      <Link
                        href={`${item.slug}`}
                        className="truncate w-full text-sm text-heading mb-1.5"
                      >
                        <Button
                          key={item.id}
                          value={item.slug}
                          className="w-full md:w-auto mt-3 "
                        >
                          {" "}
                          LISTEN HERE
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Recent Article */}
          <div className="md:w-full lg:w-1/5 md:ms-7 lg:ms-10 xl:ms-14 flex flex-col h-full max-md:mt-12">
            <div className="bg-[#F8F8F8] border-l-2 border-[#DBB961] h-16 w-50 mb-5 flex items-center">
              <div className="pl-5 inline-block align-middle TCC-h1-tag">
                Recent Article
              </div>
            </div>
            <div>
              {BlogsData?.data?.map((item: any) => {
                return (
                  <div className="flex gap-1">
                    <div className="w-1/5 mb-2">
                      <Image
                        height={24}
                        width={47}
                        src={`${baseImgUrl}${item.image_path}`}
                        alt={"Blog_Image"}
                      />
                    </div>
                    {/* <Link href={`${ROUTES.OURSTORY}/${item.slug}`}> */}
                    <div className="w-4/5 truncate hover:text-orange-300 hover:cursor-pointer">
                      {item.title}
                    </div>
                    {/* </Link> */}
                  </div>
                );
              })}
            </div>
            {/* categories */}
            {/* <div className="bg-[#F8F8F8] border-l-2 border-[#DBB961] h-16 w-50 mb-5 flex items-center mt-12">
              <div className="pl-5 inline-block align-middle TCC-h1-tag">
                Categories
              </div>
            </div>
            <div className="pl-5">
              {categories.map((item) => {
                return (
                  <div className="my-2 TCC-medium-text hover:text-orange-300  hover:cursor-pointer">
                    {item}
                  </div>
                );
              })}
            </div> */}
          </div>
          {/*  */}
        </div>
      </Container>
    </div>
  );
}
