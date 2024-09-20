import Layout from "@components/layout/layout-three";
import Link from "@components/ui/link";
import Video from "@components/video/video";
import { BlogsData } from "@framework/types";
import DocumentMeta from "react-document-meta";
import { Image } from "antd";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useBlogsDetailMutation } from "src/framework/Blog/get-blog-detail";
import { useBlogsDetailsQuery } from "src/framework/Blog/get-blog-details";
import { ROUTES } from "@utils/routes";
import { Banner } from "@containers/sale-banner-grid";
import BannerCard from "@components/common/banner-card";
import moment from "moment";

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
  slug: "/",
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
export default function OurStoriesDetails() {
  const {
    query: { slug },
  } = useRouter();
  const { data: ListData } = useBlogsDetailsQuery();
  const { data: BlogsData, mutate: fetchsBlogsDetail } =
    useBlogsDetailMutation();
  const [meta, setMeta] = useState({});
  // const [banner, setbanner] = useState({} as Banner);
  // const filteredData = BlogsData?.data.filter(
  //   (items: BlogsData) => `${items.slug}` === router?.query?.slug
  // );
  const ImgUrl = process.env.NEXT_PUBLIC_IMG_URL;

  useEffect(() => {
    fetchsBlogsDetail({
      slug: `${slug}`,
    });
  }, []);
  useEffect(() => {
    const meta = {
      title: BlogsData?.data?.meta_title,
      description: BlogsData?.data?.meta_description,
      meta: {
        charset: "utf-8",
        name: {
          keywords: BlogsData?.data?.meta_keywords,
        },
      },
    };
    setMeta(meta);

    // setbanner({
    //   id: 1,
    //   title: "We picked every item with care you must try",
    //   slug: "winter-collection",
    //   image: {
    //     mobile: {
    //       url: `${ImgUrl}${BlogsData?.data?.banner_image_path}`,
    //       width: 900,
    //       height: 340,
    //     },
    //     desktop: {
    //       url: `${ImgUrl}${BlogsData?.data?.banner_image_path}`,
    //       width: 2560,
    //       height: 300,
    //     },
    //   },
    //   type: "",
    // });
  }, [BlogsData]);

  return (
    <DocumentMeta {...meta}>
      <div>
        <div className="w-full relative mt-24 lg:mt-36 xl:mt-0">
          <BannerCard
            banner={banner}
            href={`${ROUTES.OURSTORY}`}
            variant={"rounded"}
          />
          <div className="blog-text absolute top-[50%] right-[50%] text-white">
            Blog
          </div>
        </div>
        <div className="px-4 md:px-8 2xl:px-16 max-sm:mt-16  xl:mt-0 py-10  2xl:max-w-screen-2xl xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-full">
          <div>
            <div className="w-[50%] h-[full]">
              <img
                className="bg-gray-300 object-cover w-full"
                src={`${ImgUrl}${BlogsData?.data?.image_path}`}
                alt={"Blog_Image"}
              />
            </div>
            <div className="cursor-pointer">
              <h5 className="blog-title-text mb-2 mt-5 text-2xl font-bold tracking-tight text-gray-900  cursor-pointer hover:text-headerSecondaryTextColor">
                {BlogsData?.data?.name}
              </h5>
            </div>

            <div className="md:flex md:space-x-7 mt-4 ">
              <div>
                <Image
                  height={20}
                  width={20}
                  src={"/assets/svgicon/user.png"}
                />
                <span className="align-top"> {BlogsData?.data?.author}</span>
              </div>
              <div>
                <Image
                  height={20}
                  width={20}
                  src={"/assets/svgicon/calendar.png"}
                />
                <span className="align-top">
                  {" "}
                  {moment(BlogsData?.data?.publish_date).format("MM/DD/YY")}
                </span>
              </div>
            </div>

            <div
              key={BlogsData?.data.id}
              className="max-w-full lg:w-4/5 flex  mt-12"
            >
              {
                <div
                  dangerouslySetInnerHTML={{
                    __html: BlogsData?.data?.description,
                  }}
                />
              }
            </div>
          </div>
          <div className=" max-sm:mt-8 md:w-full lg:w-2/5 md:ms-7 lg:ms-10 xl:ms-14 flex flex-col h-full -mt-1.5">
            <div className="bg-[#F8F8F8] border-l-2 border-orange-400 h-16 w-50 mb-5 sm:mt-8 md:mt-2 flex items-center">
              <div className="pl-5 inline-block  align-middle TCC-h1-tag">
                Recent Article
              </div>
            </div>
            <div>
              {ListData?.data.map((item: BlogsData) => {
                return (
                  <div className="flex">
                    <div className="w-1/5">
                      <Image
                        height={24}
                        width={47}
                        src={`${ImgUrl}${item.image_path}`}
                        alt={"Blog_Image"}
                        className="bg-gray-300 Tcc-recent-Images"
                      />
                    </div>
                    <Link href={`${ROUTES.OURSTORY}/${item.slug}`}>
                      <div className="md:pl-4 sm:pl-8 text-semibold hover:text-orange-300 hover:cursor-pointer">
                        {item.title}
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
            {/* categories */}
            {/* <div className="bg-[#F8F8F8] border-l-2 border-orange-400 h-16 w-50 mb-5 flex items-center mt-12">
              <div className="pl-5 inline-block align-middle TCC-h1-tag">
                Categories
              </div>
            </div> */}
            {/* <div className="pl-5">
              {categories.map((item) => {
                return (
                  <div className="my-2 TCC-medium-text hover:text-orange-300  hover:cursor-pointer">
                    {item}
                  </div>
                );
              })}
            </div> */}
          </div>
        </div>
      </div>
    </DocumentMeta>
  );
}
