import React from "react";
import Image from "next/image";
import BannerCard from "@components/common/banner-card";
import { ROUTES } from "@utils/routes";
import Button from "@components/ui/button";
import Link from "@components/ui/link";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import Layout from "@components/layout/layout-three";
import Container from "@components/ui/container";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Banner } from "@containers/sale-banner-grid";
import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";
import { useBlogsDetailsQuery } from "src/framework/Blog/get-blog-details";
import { BlogsData } from "@framework/types";
import moment from "moment";
import OurStoriesDetails from "../../components/Blogs/our-story-details";
import OurStories from "@components/Blogs/blogs";

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
const BlogDetails = [
  {
    id: 1,
    image: "/assets/Blog/blog-1-image.png",
    title: "Very classy jewelry collection for women",
    content:
      "Aliquam sem et tortor consequat id porta nibh venenatis cras. Mollis aliquam ut porttitor leo a diam sollicitudin. Venenatis lectus magna fringilla urn",
  },
  {
    id: 2,
    image: "/assets/Blog/blog-2-image.png",
    title: "Very classy jewelry collection for women",
    content:
      "Aliquam sem et tortor consequat id porta nibh venenatis cras. Mollis aliquam ut porttitor leo a diam sollicitudin. Venenatis lectus magna fringilla urn",
  },
  {
    id: 3,
    image: "/assets/Blog/blog-3-image.png",
    title: "Very classy jewelry collection for women",
    content:
      "Aliquam sem et tortor consequat id porta nibh venenatis cras. Mollis aliquam ut porttitor leo a diam sollicitudin. Venenatis lectus magna fringilla urn",
  },
  {
    id: 4,
    image: "/assets/Blog/blog-4-image.png",
    title: "Very classy jewelry collection for women",
    content:
      "Aliquam sem et tortor consequat id porta nibh venenatis cras. Mollis aliquam ut porttitor leo a diam sollicitudin. Venenatis lectus magna fringilla urn",
  },
];

export default function Blogs() {
  return (
    <div>
      <OurStories />
    </div>
  );
}

Blogs.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};
