import { ILFlag } from "@components/icons/ILFlag";
import { SAFlag } from "@components/icons/SAFlag";
import { CNFlag } from "@components/icons/CNFlag";
import { USFlag } from "@components/icons/USFlag";
import { DEFlag } from "@components/icons/DEFlag";
import { ESFlag } from "@components/icons/ESFlag";
import Nike from "public/assets/images/brands/megamenu/nike.png";
import Dior from "public/assets/images/brands/megamenu/dior.png";
import Gucci from "public/assets/images/brands/megamenu/gucci.png";
import Gucci1 from "public/assets/images/brands/megamenu/gucci1.png";
import Puma from "public/assets/images/brands/megamenu/puma.png";
import Levis from "public/assets/images/brands/megamenu/levis.png";
import Banner1 from "public/assets/images/banner/megamenu/banner-1.png";
import Banner2 from "public/assets/images/banner/megamenu/banner-2.png";
import { ThunderIcon } from "@components/icons/thunder-icon";
import { WomenIcon } from "@components/icons/women-icon";
import { MenIcon } from "@components/icons/men-icon";
import { WatchIcon } from "@components/icons/watch-icon";
import { WalletIcon } from "@components/icons/wallet-icon";
import { BagIcon } from "@components/icons/bag-icon";
import { JewelryIcon } from "@components/icons/jewelry-icon";
import { SunglassIcon } from "@components/icons/sunglass-icon";
import { SneakerIcon } from "@components/icons/sneaker-icon";
import { onlineImages, companyInfo } from "./site-settings";
import { ROUTES } from "@utils/routes";

export const siteSettingsData = {
  name: "The Cad Co",
  description: "",
  author: {
    name: "The Cad Co",
    websiteUrl: "https://www.thecadco.com/",
    address: "",
  },
  logo: {
    url: "/assets/Photos/logo/Tcc_logo.png", // Change URL For Header Logo
    alt: "The Cad Co",
    href: "/",
    // width: "206px", // Width For Header Logo
    // height: "35px", // Height For Header Logo
    width: "145px",
    height: "65px",
  },
  footerLogo: {
    // url: '/assets/Photos/logo/Nungu_logo.png',
    url: "/assets/Photos/logo/footer_logo.svg",
    alt: "The Cad Co",
    href: "/",
    width: "188px",
    height: "85px",
  },
  homeHeroSlider: {
    mobile: {
      height: 300,
      width: 800,
    },
    desktop: {
      height: 900,
      width: 1920,
    },
  },
  BannerQueenHeroSlider: {
    mobile: {
      height: 200,
      width: 800,
    },
    desktop: {
      height: 950,
      width: 1720,
    },
  },
  BannerLoveStorySlider: {
    mobile: {
      height: 500,
      width: 800,
    },
    desktop: {
      height: 800,
      width: 1820,
    },
  },
  gold: 1,
  silver: 2,
  platinum: 3,
  defaultLanguage: "en",
  currencyCode: "R",
  primaryIconColor: "black", // Change This for Primary Icon Color
  secondaryIconColor: "#dbb961", // Change This for Secondary Icon Color
  mobileIconColor: "black", // Change This for Mobile Navigation Icon Color
  layoutType: "#TCC-lay-3", // Website Layout Type
  headerType: "#TCC-hed-3", // Website Header Type
  footerType: "#TCC-foo-2", // Website Footer Type
  productPage: "#TCC-product-1", // Website ProductPage Type
  site_header: {
    menu: [
      {
        id: 1,
        path: "https://www.zamels.com.au/collections/jewellery",
        label: "JEWELLERY",
        // columns: [
        //   {
        //     id: 2,
        //     columnItems: [
        //       {
        //         id: 1,
        //         path: "/",
        //         label: "menu-shop-by-style",
        //         columnItemItems: [
        //           {
        //             id: 1,
        //             path: "/products/?filter=style&value=accents",
        //             label: "menu-accents",
        //           },
        //           {
        //             id: 2,
        //             path: "/products/?filter=style&value=luxe",
        //             label: "menu-luxe",
        //           },
        //           {
        //             id: 3,
        //             path: "/products/?filter=style&value=hidden-halo",
        //             label: "menu-Halo",
        //           },
        //           {
        //             id: 4,
        //             path: "/products/?filter=style&value=nature-inspired",
        //             label: "menu-inspired",
        //           },
        //           {
        //             id: 5,
        //             path: "/products/?filter=style&value=three-stone",
        //             label: "menu-three-stone",
        //           },
        //           {
        //             id: 6,
        //             path: "/products/?filter=style&value=unique",
        //             label: "menu-unique",
        //           },
        //           {
        //             id: 7,
        //             path: "/products/?filter=style&value=vintage",
        //             label: "menu-vintage",
        //           },
        //           // {
        //           //   id: 8,
        //           //   path: "/products/?filter=style&value=hidden-halo",
        //           //   label: "menu-Halo",
        //           // },
        //         ],
        //       },
        //     ],
        //   },
        //   {
        //     id: 3,
        //     columnItems: [
        //       {
        //         id: 1,
        //         path: "/",
        //         label: "menu-shop-by-metal",
        //         columnItemItems: [
        //           {
        //             id: 1,
        //             path: "/products/?filter=metal&value=Platinum",
        //             label: "menu-Platinum",
        //           },
        //           {
        //             id: 2,
        //             path: "/products/?filter=metal&value=white-gold",
        //             label: "menu-White-Gold",
        //           },
        //           {
        //             id: 3,
        //             path: "/products/?filter=metal&value=yellow-gold",
        //             label: "menu-Yellow-Gold",
        //           },
        //           {
        //             id: 4,
        //             path: "/products/?filter=metal&value=rose-gold",
        //             label: "menu-Rose-Gold",
        //           },
        //         ],
        //       },
        //     ],
        //   },
        //   {
        //     id: 4,
        //     columnItems: [
        //       {
        //         id: 1,
        //         path: "/",
        //         label: "menu-shope-by-shape",
        //         columnItemItems: [
        //           {
        //             id: 1,
        //             path: "products/?filter=shape&value=round",
        //             label: "menu-round",
        //           },
        //           {
        //             id: 2,
        //             path: "products/?filter=shape&value=cushion",
        //             label: "menu-cushion",
        //           },
        //           {
        //             id: 3,
        //             path: "products/?filter=shape&value=emerald",
        //             label: "menu-emerald",
        //           },
        //           {
        //             id: 4,
        //             path: "products/?filter=shape&value=pear",
        //             label: "menu-pear",
        //           },
        //           {
        //             id: 5,
        //             path: "products/?filter=shape&value=radiant",
        //             label: "menu-radiant",
        //           },
        //         ],
        //       },
        //     ],
        //   },
        //   {
        //     id: 5,
        //     columnItems: [
        //       {
        //         id: 1,
        //         path: "/",
        //         label: "menu-jewellery-care",
        //         columnItemItems: [
        //           {
        //             id: 1,
        //             path: `${ROUTES.REVALUATION}`,
        //             label: "menu-re-valuation",
        //           },
        //           {
        //             id: 2,
        //             path: `${ROUTES.LIFETIMESEVICE}`,
        //             label: "menu-life-time-service",
        //           },
        //           {
        //             id: 3,
        //             path: `${ROUTES.JEWELLERYCARE}`,
        //             label: "menu-how-to-clean-your-jewellery",
        //           },
        //         ],
        //       },
        //     ],
        //   },
        //   {
        //     id: 6,
        //     columnItems: [
        //       {
        //         id: 1,
        //         path: "/",
        //         label: "menu-education",
        //         columnItemItems: [
        //           {
        //             id: 1,
        //             path: `${ROUTES.ENGAGEMENTRINGGUIDE}`,
        //             label: "menu-engagement-ring-guide",
        //           },
        //           {
        //             id: 2,
        //             path: `${ROUTES.PRECIOUSMETALGUIDE}`,
        //             label: "menu-precious-metal-guide",
        //           },
        //           // {
        //           //   id: 3,
        //           //   path: `${ROUTES.RINGSIZE}`,
        //           //   label: "menu-find-your-ring-size",
        //           // },
        //           {
        //             id: 3,
        //             path: `/coming-soon`,
        //             label: "menu-find-your-ring-size",
        //           },
        //         ],
        //       },
        //     ],
        //   },
        // ],
      },
      {
        id: 2,
        path: "https://www.zamels.com.au/collections/gold-jewellery",
        label: "GOLD JEWELLERY",
        // columns: [
        //   {
        //     id: 1,
        //     columnItems: [
        //       {
        //         id: 1,
        //         path: "/",
        //         label: "menu-women",
        //         columnItemItems: [
        //           {
        //             id: 1,
        //             path: "/products?filter=women&value=wedding-bands",
        //             label: "menu-wedding-bands",
        //           },
        //           {
        //             id: 2,
        //             path: "/products?filter=women&value=diamond-bands",
        //             label: "menu-diamond-bands",
        //           },
        //           {
        //             id: 3,
        //             path: "/products?filter=women&value=stackable-bands",
        //             label: "menu-stackable-bands",
        //           },
        //         ],
        //       },
        //     ],
        //   },
        //   {
        //     id: 2,
        //     columnItems: [
        //       {
        //         id: 1,
        //         path: "/",
        //         label: "menu-womens-by-metal",
        //         columnItemItems: [
        //           {
        //             id: 1,
        //             path: "/products/?filter=women-metal&value=Platinum",
        //             label: "menu-platinum",
        //           },
        //           {
        //             id: 2,
        //             path: "/products/?filter=women-metal&value=white-gold",
        //             label: "menu-white-gold",
        //           },
        //           {
        //             id: 3,
        //             path: "/products/?filter=women-metal&value=yellow-gold",
        //             label: "menu-yellow-gold",
        //           },
        //           {
        //             id: 4,
        //             path: "/products/?filter=women-metal&value=rose-gold",
        //             label: "menu-rose-gold",
        //           },
        //         ],
        //       },
        //     ],
        //   },
        //   {
        //     id: 3,
        //     columnItems: [
        //       {
        //         id: 1,
        //         path: "/",
        //         label: "menu-men",
        //         columnItemItems: [
        //           {
        //             id: 1,
        //             path: "/products?filter=men&value=wedding-bands",
        //             label: "menu-wedding-bands",
        //           },
        //           {
        //             id: 2,
        //             path: "/products?filter=men&value=diamond-bands",
        //             label: "menu-diamond-bands",
        //           },
        //           {
        //             id: 3,
        //             path: "/products?filter=men&value=matte-finish",
        //             label: "menu-matte-finish",
        //           },
        //           {
        //             id: 4,
        //             path: "/products?filter=men&value=polish-finish",
        //             label: "menu-polish-finish",
        //           },
        //           {
        //             id: 5,
        //             path: "/products?filter=men&value=textured-rings",
        //             label: "menu-textured-rings",
        //           },
        //         ],
        //       },
        //     ],
        //   },
        //   {
        //     id: 4,
        //     columnItems: [
        //       {
        //         id: 1,
        //         path: "/",
        //         label: "menu-mens-by-metal",
        //         columnItemItems: [
        //           {
        //             id: 1,
        //             path: "/products/?filter=men-metal&value=platinum",
        //             label: "menu-platinum",
        //           },
        //           {
        //             id: 2,
        //             path: "/products/?filter=men-metal&value=white-gold",
        //             label: "menu-white-gold",
        //           },
        //           {
        //             id: 3,
        //             path: "/products/?filter=men-metal&value=yellow-gold",
        //             label: "menu-yellow-gold",
        //           },
        //           {
        //             id: 4,
        //             path: "/products/?filter=men-metal&value=rose-gold",
        //             label: "menu-rose-gold",
        //           },
        //         ],
        //       },
        //     ],
        //   },
        //   {
        //     id: 5,
        //     columnItems: [
        //       {
        //         id: 1,
        //         path: "/",
        //         label: "menu-jewellery-care",
        //         columnItemItems: [
        //           {
        //             id: 1,
        //             path: `${ROUTES.REVALUATION}`,
        //             label: "menu-re-valuation",
        //           },
        //           {
        //             id: 2,
        //             path: `${ROUTES.LIFETIMESEVICE}`,
        //             label: "menu-life-time-service",
        //           },
        //           {
        //             id: 3,
        //             path: `${ROUTES.JEWELLERYCARE}`,
        //             label: "menu-how-to-clean-your-jewellery",
        //           },
        //         ],
        //       },
        //     ],
        //   },
        // ],
      },
      {
        id: 3,
        path: "https://www.zamels.com.au/collections/silver-jewellery",
        label: "SILVER JEWELLERY",
        // subMenu: [
        //   {
        //     id: 1,
        //     path: "/products/?filter=lifestyle&value=lifestyle-pendants-necklaces",
        //     label: "menu-lifestyle-pendants-necklaces",
        //   },
        //   {
        //     id: 2,
        //     path: "/products/?filter=lifestyle&value=lifestyle-bracelets-bangles",
        //     label: "menu-lifestyle-bracelets-bangles",
        //   },
        //   {
        //     id: 3,
        //     path: "/products/?filter=lifestyle&value=lifestyle-rings-signets",
        //     label: "menu-lifestyle-rings-signets",
        //   },
        //   {
        //     id: 4,
        //     path: "/products/?filter=lifestyle&value=lifestyle-earrings",
        //     label: "menu-lifestyle-earrings",
        //   },
        //   {
        //     id: 5,
        //     path: "/products/?filter=lifestyle&value=lifestyle-body-chain",
        //     label: "menu-lifestyle-body-chain",
        //   },
        //   {
        //     id: 6,
        //     path: "/products/?filter=lifestyle&value=lifestyle-anklets",
        //     label: "menu-lifestyle-anklets",
        //   },
        // ],
      },
      {
        id: 4,
        path: "https://www.zamels.com.au/collections/watches",
        label: "WATCHES",
        // subMenu: [
        //   {
        //     id: 1,
        //     path: "/products?filter=men&value=textured-rings",
        //     label: "menu-gents-pendants-necklaces",
        //   },
        //   {
        //     id: 2,
        //     path: "/products?filter=men&value=gents-bracelets-bangles",
        //     label: "menu-gents-bracelets-bangles",
        //   },
        //   {
        //     id: 3,
        //     path: "/products?filter=men&value=textured-rings",
        //     label: "menu-gents-rings-signets",
        //   },
        //   {
        //     id: 4,
        //     path: "/products?filter=men&value=textured-rings",
        //     label: "menu-gents-lapelpins",
        //   },
        //   {
        //     id: 5,
        //     path: "/products?filter=men&value=textured-rings",
        //     label: "menu-gents-earrings",
        //   },
        //   {
        //     id: 6,
        //     path: "/products?filter=men&value=textured-rings",
        //     label: "menu-gents-cufflinks",
        //   },
        //   {
        //     id: 7,
        //     path: "/products?filter=men&value=textured-rings",
        //     label: "menu-gents-anklets",
        //   },
        // ],
      },
      {
        id: 5,
        path: "https://www.zamels.com.au/collections/our-brands",
        label: "BRANDS",
        subMenu: [
          {
            id: 1,
            path: "/coming-soon",
            label: "menu-infinity-set",
          },
          {
            id: 2,
            path: "/coming-soon",
            label: "menu-marquise-kiss-bracelet&ring-set",
          },
          {
            id: 3,
            path: "/coming-soon",
            label: "marquise-kiss-Rring&earring-set",
          },
          {
            id: 4,
            path: "/coming-soon",
            label: "menu-vintage-set",
          },
        ],
      },
      {
        id: 6,
        path: "https://www.zamels.com.au/collections/online-exclusive",
        label: "ONLINE EXCLUSIVES"
      },
      {
        id: 7,
        path: "https://www.zamels.com.au/collections/gifts",
        label: "GIFTS"
      },
      {
        id: 8,
        path: "https://www.zamels.com.au/collections/best-sellers",
        label: "BEST SELLERS"
      },
      {
        id: 9,
        path: "https://www.zamels.com.au/collections/sale",
        label: "SALE"
      },
      {
        id: 10,
        path: "https://www.zamels.com.au/collections/sale#",
        label: "EDUCATION"
      }
    ],

    mobileMenu: [
      {
        id: 1,
        path: "/products/?menu-engagement-rings",
        label: "menu-engagement-rings",
        columns: [
          {
            id: 2,
            columnItems: [
              {
                id: 1,
                path: "/",
                label: "menu-shop-by-style",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/products/?filter=style&value=accents",
                    label: "menu-accents",
                  },
                  {
                    id: 2,
                    path: "/products/?filter=style&value=luxe",
                    label: "menu-luxe",
                  },
                  {
                    id: 3,
                    path: "/products/?filter=style&value=hidden-halo",
                    label: "menu-Halo",
                  },
                  {
                    id: 4,
                    path: "/products/?filter=style&value=nature-inspired",
                    label: "menu-inspired",
                  },
                  {
                    id: 5,
                    path: "/products/?filter=style&value=three-stone",
                    label: "menu-three-stone",
                  },
                  {
                    id: 6,
                    path: "/products/?filter=style&value=unique",
                    label: "menu-unique",
                  },
                  {
                    id: 7,
                    path: "/products/?filter=style&value=vintage",
                    label: "menu-vintage",
                  },
                  {
                    id: 8,
                    path: "/products/?filter=style&value=hidden-halo",
                    label: "menu-Halo",
                  },
                ],
              },
            ],
          },
          {
            id: 3,
            columnItems: [
              {
                id: 1,
                path: "/",
                label: "menu-shop-by-metal",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/products/?filter=metal&value=Platinum",
                    label: "menu-Platinum",
                  },
                  {
                    id: 2,
                    path: "/products/?filter=metal&value=white-gold",
                    label: "menu-White-Gold",
                  },
                  {
                    id: 3,
                    path: "/products/?filter=metal&value=yellow-gold",
                    label: "menu-Yellow-Gold",
                  },
                  {
                    id: 4,
                    path: "/products/?filter=metal&value=rose-gold",
                    label: "menu-Rose-Gold",
                  },
                ],
              },
            ],
          },
          {
            id: 4,
            columnItems: [
              {
                id: 1,
                path: "/",
                label: "menu-shope-by-shape",
                columnItemItems: [
                  {
                    id: 1,
                    path: "products/?filter=shape&value=round",
                    label: "menu-round",
                  },
                  {
                    id: 2,
                    path: "products/?filter=shape&value=cushion",
                    label: "menu-cushion",
                  },
                  {
                    id: 3,
                    path: "products/?filter=shape&value=emerald",
                    label: "menu-emerald",
                  },
                  {
                    id: 4,
                    path: "products/?filter=shape&value=pear",
                    label: "menu-pear",
                  },
                  {
                    id: 5,
                    path: "products/?filter=shape&value=radiant",
                    label: "menu-radiant",
                  },
                ],
              },
            ],
          },
          {
            id: 5,
            columnItems: [
              {
                id: 1,
                path: "/",
                label: "menu-jewellery-care",
                columnItemItems: [
                  {
                    id: 1,
                    path: `${ROUTES.REVALUATION}`,
                    label: "menu-re-valuation",
                  },
                  {
                    id: 2,
                    path: `${ROUTES.LIFETIMESEVICE}`,
                    label: "menu-life-time-service",
                  },
                  {
                    id: 3,
                    path: `${ROUTES.JEWELLERYCARE}`,
                    label: "menu-how-to-clean-your-jewellery",
                  },
                ],
              },
            ],
          },
          {
            id: 6,
            columnItems: [
              {
                id: 1,
                path: "/",
                label: "menu-education",
                columnItemItems: [
                  {
                    id: 1,
                    path: `${ROUTES.ENGAGEMENTRINGGUIDE}`,
                    label: "menu-engagement-ring-guide",
                  },
                  {
                    id: 2,
                    path: `${ROUTES.PRECIOUSMETALGUIDE}`,
                    label: "menu-precious-metal-guide",
                  },
                  {
                    id: 3,
                    path: `/coming-soon`,
                    label: "menu-find-your-ring-size",
                  },
                  // {
                  //   id: 3,
                  //   path: `${ROUTES.RINGSIZE}`,
                  //   label: "menu-find-your-ring-size",
                  // },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 2,
        path: "/products",
        label: "menu-wedding-ring",
        columns: [
          {
            id: 1,
            columnItems: [
              {
                id: 1,
                path: "/",
                label: "menu-women",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/products?filter=women&value=wedding-bands",
                    label: "menu-wedding-bands",
                  },
                  {
                    id: 2,
                    path: "/products?filter=women&value=diamond-bands",
                    label: "menu-diamond-bands",
                  },
                  {
                    id: 3,
                    path: "/products?filter=women&value=stackable-bands",
                    label: "menu-stackable-bands",
                  },
                ],
              },
            ],
          },
          {
            id: 2,
            columnItems: [
              {
                id: 1,
                path: "/",
                label: "menu-womens-by-metal",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/products/?filter=women-metal&value=Platinum",
                    label: "menu-platinum",
                  },
                  {
                    id: 2,
                    path: "/products/?filter=women-metal&value=white-gold",
                    label: "menu-white-gold",
                  },
                  {
                    id: 3,
                    path: "/products/?filter=women-metal&value=yellow-gold",
                    label: "menu-yellow-gold",
                  },
                  {
                    id: 4,
                    path: "/products/?filter=women-metal&value=rose-gold",
                    label: "menu-rose-gold",
                  },
                ],
              },
            ],
          },
          {
            id: 3,
            columnItems: [
              {
                id: 1,
                path: "/",
                label: "menu-men",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/products?filter=men&value=wedding-bands",
                    label: "menu-wedding-bands",
                  },
                  {
                    id: 2,
                    path: "/products?filter=men&value=diamond-bands",
                    label: "menu-diamond-bands",
                  },
                  {
                    id: 3,
                    path: "/products?filter=men&value=diamond-bands",
                    label: "menu-diamond-bands",
                  },
                  {
                    id: 4,
                    path: "/products?filter=men&value=matte-finish",
                    label: "menu-matte-finish",
                  },
                  {
                    id: 5,
                    path: "/products?filter=men&value=polish-finish",
                    label: "menu-polish-finish",
                  },
                  {
                    id: 6,
                    path: "/products?filter=men&value=textured-rings",
                    label: "menu-textured-rings",
                  },
                ],
              },
            ],
          },
          {
            id: 4,
            columnItems: [
              {
                id: 1,
                path: "/",
                label: "menu-mens-by-metal",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/products/?filter=men-metal&value=platinum",
                    label: "menu-platinum",
                  },
                  {
                    id: 2,
                    path: "/products/?filter=men-metal&value=white-gold",
                    label: "menu-white-gold",
                  },
                  {
                    id: 3,
                    path: "/products/?filter=men-metal&value=yellow-gold",
                    label: "menu-yellow-gold",
                  },
                  {
                    id: 4,
                    path: "/products/?filter=men-metal&value=rose-gold",
                    label: "menu-rose-gold",
                  },
                ],
              },
            ],
          },
          {
            id: 5,
            columnItems: [
              {
                id: 1,
                path: "/",
                label: "menu-jewellery-care",
                columnItemItems: [
                  {
                    id: 1,
                    path: `${ROUTES.REVALUATION}`,
                    label: "menu-re-valuation",
                  },
                  {
                    id: 2,
                    path: `${ROUTES.LIFETIMESEVICE}`,
                    label: "menu-life-time-service",
                  },
                  {
                    id: 3,
                    path: `${ROUTES.JEWELLERYCARE}`,
                    label: "menu-how-to-clean-your-jewellery",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 3,
        path: "/products",
        label: "menu-lifestyle-jewellery",
        subMenu: [
          {
            id: 1,
            path: "/products/?filter=lifestyle&value=lifestyle-pendants-necklaces",
            label: "menu-lifestyle-pendants-necklaces",
          },
          {
            id: 2,
            path: "/products/?filter=lifestyle&value=lifestyle-bracelets-bangles",
            label: "menu-lifestyle-bracelets-bangles",
          },
          {
            id: 3,
            path: "/products/?filter=lifestyle&value=lifestyle-rings-signets",
            label: "menu-lifestyle-rings-signets",
          },
          {
            id: 4,
            path: "/products/?filter=lifestyle&value=lifestyle-earrings",
            label: "menu-lifestyle-earrings",
          },
          {
            id: 5,
            path: "/products/?filter=lifestyle&value=lifestyle-body-chain",
            label: "menu-lifestyle-body-chain",
          },
          {
            id: 6,
            path: "/products/?filter=lifestyle&value=lifestyle-anklets",
            label: "menu-lifestyle-anklets",
          },
        ],
      },
      {
        id: 4,
        path: "/products",
        label: "gents-jewellery",
        subMenu: [
          {
            id: 1,
            path: "/products?filter=men&value=textured-rings",
            label: "menu-gents-pendants-necklaces",
          },
          {
            id: 2,
            path: "/products?filter=men&value=gents-bracelets-bangles",
            label: "menu-gents-bracelets-bangles",
          },
          {
            id: 3,
            path: "/products?filter=men&value=textured-rings",
            label: "menu-gents-rings-signets",
          },
          {
            id: 4,
            path: "/products?filter=men&value=textured-rings",
            label: "menu-gents-lapelpins",
          },
          {
            id: 5,
            path: "/products?filter=men&value=textured-rings",
            label: "menu-gents-earrings",
          },
          {
            id: 6,
            path: "/products?filter=men&value=textured-rings",
            label: "menu-gents-cufflinks",
          },
          {
            id: 7,
            path: "/products?filter=men&value=textured-rings",
            label: "menu-gents-anklets",
          },
        ],
      },
      {
        id: 5,
        path: "/",
        label: "gift-sets",
        subMenu: [
          {
            id: 1,
            path: "/coming-soon",
            label: "menu-infinity-set",
          },
          {
            id: 2,
            path: "/coming-soon",
            label: "menu-marquise-kiss-bracelet&ring-set",
          },
          {
            id: 3,
            path: "/coming-soon",
            label: "marquise-kiss-Rring&earring-set",
          },
          {
            id: 4,
            path: "/coming-soon",
            label: "menu-vintage-set",
          },
        ],
      },
      // {
      //   id: 6,
      //   path: "/create-3d-render",
      //   label: "3D Configurator",
      // },
    ],

    languageMenu: [
      {
        id: "ar",
        name: "عربى - AR",
        value: "ar",
        icon: <SAFlag width="20px" height="15px" />,
      },
      {
        id: "zh",
        name: "中国人 - ZH",
        value: "zh",
        icon: <CNFlag width="20px" height="15px" />,
      },
      {
        id: "en",
        name: "English - EN",
        value: "en",
        icon: <USFlag width="20px" height="15px" />,
      },
      {
        id: "de",
        name: "Deutsch - DE",
        value: "de",
        icon: <DEFlag width="20px" height="15px" />,
      },
      {
        id: "he",
        name: "rעברית - HE",
        value: "he",
        icon: <ILFlag width="20px" height="15px" />,
      },
      {
        id: "es",
        name: "Español - ES",
        value: "es",
        icon: <ESFlag width="20px" height="15px" />,
      },
    ],

    categoryMenu: [
      {
        id: 1,
        path: "/",
        label: "menu-womens-fashion",
        icon: <WomenIcon />,
        columns: [
          {
            id: 1,
            columnItems: [
              {
                id: 1,
                path: "/?q=engagement-ring",
                label: "menu-top-wear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/",
                    label: "menu-t-shirt",
                  },
                  {
                    id: 2,
                    path: "/",
                    label: "menu-casual-shirts",
                  },
                  {
                    id: 3,
                    path: "/",
                    label: "menu-formal-shirts",
                  },
                  {
                    id: 4,
                    path: "/",
                    label: "menu-blazwers-coats",
                  },
                  {
                    id: 5,
                    path: "/",
                    label: "menu-suits",
                  },
                  {
                    id: 6,
                    path: "/",
                    label: "menu-jackets",
                  },
                ],
              },
              {
                id: 2,
                path: "/?q=belt-scarves",
                label: "menu-belt-scarves",
              },
              {
                id: 3,
                path: "/?q=watches-wearables",
                label: "menu-watches-wearables",
              },
            ],
          },
          {
            id: 2,
            columnItems: [
              {
                id: 1,
                path: "/?q=western-wear",
                label: "menu-western-wear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/?q=dresses",
                    label: "menu-dresses",
                  },
                  {
                    id: 2,
                    path: "/?q=jumpsuits",
                    label: "menu-jumpsuits",
                  },
                  {
                    id: 3,
                    path: "/?q=tops-t-shirt",
                    label: "menu-tops-shirts",
                  },
                  {
                    id: 4,
                    path: "/?q=shorts-skirts",
                    label: "menu-shorts-skirts",
                  },
                  {
                    id: 5,
                    path: "/?q=shurgs",
                    label: "menu-shurgs",
                  },
                  {
                    id: 6,
                    path: "/?q=blazers",
                    label: "menu-blazers",
                  },
                ],
              },
              {
                id: 2,
                path: "/?q=plus-size",
                label: "menu-plus-size",
              },
              {
                id: 3,
                path: "/?q=sunglasses-frames",
                label: "menu-sunglasses-frames",
              },
            ],
          },
          {
            id: 3,
            columnItems: [
              {
                id: 1,
                path: "/?q=footwear",
                label: "menu-footwear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/?q=flats",
                    label: "menu-flats",
                  },
                  {
                    id: 2,
                    path: "/?q=casual-shoes",
                    label: "menu-casual-shoes",
                  },
                  {
                    id: 3,
                    path: "/?q=heels",
                    label: "menu-heels",
                  },
                  {
                    id: 4,
                    path: "/?q=boots",
                    label: "menu-boots",
                  },
                ],
              },
              {
                id: 2,
                path: "/?q=sports-active-wear",
                label: "menu-sports-active-wear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/?q=clothing",
                    label: "menu-clothing",
                  },
                  {
                    id: 2,
                    path: "/?q=footwear",
                    label: "menu-footwear",
                  },
                  {
                    id: 3,
                    path: "/?q=sports-accessories",
                    label: "menu-sports-accessories",
                  },
                ],
              },
            ],
          },
        ],
        brands: [
          {
            id: 1,
            path: "/?q=nike",
            label: "nike",
            icon: Nike,
          },
          {
            id: 2,
            path: "/?q=dior",
            label: "dior",
            icon: Dior,
          },
          {
            id: 3,
            path: "/?q=gucci",
            label: "gucci",
            icon: Gucci,
          },
          {
            id: 4,
            path: "/?q=gucci1",
            label: "gucci1",
            icon: Gucci1,
          },
          {
            id: 5,
            path: "/?q=puma",
            label: "puma",
            icon: Puma,
          },
          {
            id: 6,
            path: "/?q=levis",
            label: "levis",
            icon: Levis,
          },
        ],
        banners: [
          {
            id: 1,
            path: "/?q=winter",
            label: "winter",
            image: Banner1,
          },
          {
            id: 2,
            path: "/?q=summer",
            label: "summer",
            image: Banner2,
          },
        ],
      },
      {
        id: 2,
        path: "/",
        label: "menu-mens-fashion",
        icon: <MenIcon />,
        columns: [
          {
            id: 1,
            columnItems: [
              {
                id: 1,
                path: "/?q=engagement-ring",
                label: "menu-top-wear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/?q=t-shit-shirtrt",
                    label: "menu-t-shirt",
                  },
                  {
                    id: 2,
                    path: "/?q=casual-shirts",
                    label: "menu-casual-shirts",
                  },
                  {
                    id: 3,
                    path: "/?q=formal-shirts",
                    label: "menu-formal-shirts",
                  },
                  {
                    id: 4,
                    path: "/?q=blazwers-coats",
                    label: "menu-blazwers-coats",
                  },
                  {
                    id: 5,
                    path: "/?q=suits",
                    label: "menu-suits",
                  },
                  {
                    id: 6,
                    path: "/?q=jackets",
                    label: "menu-jackets",
                  },
                ],
              },
              {
                id: 2,
                path: "/?q=belt-scarves",
                label: "menu-belt-scarves",
              },
              {
                id: 3,
                path: "/?q=watches-wearables",
                label: "menu-watches-wearables",
              },
            ],
          },
          {
            id: 2,
            columnItems: [
              {
                id: 1,
                path: "/?q=western-wear",
                label: "menu-western-wear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/?q=dresses",
                    label: "menu-dresses",
                  },
                  {
                    id: 2,
                    path: "/?q=jumpsuits",
                    label: "menu-jumpsuits",
                  },
                  {
                    id: 3,
                    path: "/?q=tops-t-shirt",
                    label: "menu-tops-shirts",
                  },
                  {
                    id: 4,
                    path: "/?q=shorts-skirts",
                    label: "menu-shorts-skirts",
                  },
                  {
                    id: 5,
                    path: "/?q=shurgs",
                    label: "menu-shurgs",
                  },
                  {
                    id: 6,
                    path: "/?q=blazers",
                    label: "menu-blazers",
                  },
                ],
              },
              {
                id: 2,
                path: "/?q=plus-size",
                label: "menu-plus-size",
              },
              {
                id: 3,
                path: "/?q=sunglasses-frames",
                label: "menu-sunglasses-frames",
              },
            ],
          },
          {
            id: 3,
            columnItems: [
              {
                id: 1,
                path: "/?q=footwear",
                label: "menu-footwear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/?q=flats",
                    label: "menu-flats",
                  },
                  {
                    id: 2,
                    path: "/?q=casual-shoes",
                    label: "menu-casual-shoes",
                  },
                  {
                    id: 3,
                    path: "/?q=heels",
                    label: "menu-heels",
                  },
                  {
                    id: 4,
                    path: "/?q=boots",
                    label: "menu-boots",
                  },
                ],
              },
              {
                id: 2,
                path: "/?q=sports-active-wear",
                label: "menu-sports-active-wear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/?q=clothing",
                    label: "menu-clothing",
                  },
                  {
                    id: 2,
                    path: "/?q=footwear",
                    label: "menu-footwear",
                  },
                  {
                    id: 3,
                    path: "/?q=sports-accessories",
                    label: "menu-sports-accessories",
                  },
                ],
              },
            ],
          },
        ],
        brands: [
          {
            id: 1,
            path: "/?q=nike",
            label: "nike",
            icon: Nike,
          },
          {
            id: 2,
            path: "/?q=dior",
            label: "dior",
            icon: Dior,
          },
          {
            id: 3,
            path: "/?q=gucci",
            label: "gucci",
            icon: Gucci,
          },
          {
            id: 4,
            path: "/?q=gucci1",
            label: "gucci1",
            icon: Gucci1,
          },
          {
            id: 5,
            path: "/?q=puma",
            label: "puma",
            icon: Puma,
          },
          {
            id: 6,
            path: "/?q=levis",
            label: "levis",
            icon: Levis,
          },
        ],
        banners: [
          {
            id: 1,
            path: "/?q=winter",
            label: "winter",
            image: Banner1,
          },
          {
            id: 2,
            path: "/?q=summer",
            label: "summer",
            image: Banner2,
          },
        ],
      },
      {
        id: 3,
        path: "/",
        label: "menu-watches",
        icon: <WatchIcon />,
        columns: [
          {
            id: 1,
            columnItems: [
              {
                id: 1,
                path: "/?q=engagement-ring",
                label: "menu-top-wear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/?q=t-shit-shirtrt",
                    label: "menu-t-shirt",
                  },
                  {
                    id: 2,
                    path: "/?q=casual-shirts",
                    label: "menu-casual-shirts",
                  },
                  {
                    id: 3,
                    path: "/?q=formal-shirts",
                    label: "menu-formal-shirts",
                  },
                  {
                    id: 4,
                    path: "/?q=blazwers-coats",
                    label: "menu-blazwers-coats",
                  },
                  {
                    id: 5,
                    path: "/?q=suits",
                    label: "menu-suits",
                  },
                  {
                    id: 6,
                    path: "/?q=jackets",
                    label: "menu-jackets",
                  },
                ],
              },
              {
                id: 2,
                path: "/?q=belt-scarves",
                label: "menu-belt-scarves",
              },
              {
                id: 3,
                path: "/?q=watches-wearables",
                label: "menu-watches-wearables",
              },
            ],
          },
          {
            id: 2,
            columnItems: [
              {
                id: 1,
                path: "/?q=western-wear",
                label: "menu-western-wear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/?q=dresses",
                    label: "menu-dresses",
                  },
                  {
                    id: 2,
                    path: "/?q=jumpsuits",
                    label: "menu-jumpsuits",
                  },
                  {
                    id: 3,
                    path: "/?q=tops-t-shirt",
                    label: "menu-tops-shirts",
                  },
                  {
                    id: 4,
                    path: "/?q=shorts-skirts",
                    label: "menu-shorts-skirts",
                  },
                  {
                    id: 5,
                    path: "/?q=shurgs",
                    label: "menu-shurgs",
                  },
                  {
                    id: 6,
                    path: "/?q=blazers",
                    label: "menu-blazers",
                  },
                ],
              },
              {
                id: 2,
                path: "/?q=plus-size",
                label: "menu-plus-size",
              },
              {
                id: 3,
                path: "/?q=sunglasses-frames",
                label: "menu-sunglasses-frames",
              },
            ],
          },
          {
            id: 3,
            columnItems: [
              {
                id: 1,
                path: "/?q=footwear",
                label: "menu-footwear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/?q=flats",
                    label: "menu-flats",
                  },
                  {
                    id: 2,
                    path: "/?q=casual-shoes",
                    label: "menu-casual-shoes",
                  },
                  {
                    id: 3,
                    path: "/?q=heels",
                    label: "menu-heels",
                  },
                  {
                    id: 4,
                    path: "/?q=boots",
                    label: "menu-boots",
                  },
                ],
              },
              {
                id: 2,
                path: "/?q=sports-active-wear",
                label: "menu-sports-active-wear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/?q=clothing",
                    label: "menu-clothing",
                  },
                  {
                    id: 2,
                    path: "/?q=footwear",
                    label: "menu-footwear",
                  },
                  {
                    id: 3,
                    path: "/?q=sports-accessories",
                    label: "menu-sports-accessories",
                  },
                ],
              },
            ],
          },
        ],
        brands: [
          {
            id: 1,
            path: "/?q=nike",
            label: "nike",
            icon: Nike,
          },
          {
            id: 2,
            path: "/?q=dior",
            label: "dior",
            icon: Dior,
          },
          {
            id: 3,
            path: "/?q=gucci",
            label: "gucci",
            icon: Gucci,
          },
          {
            id: 4,
            path: "/?q=gucci1",
            label: "gucci1",
            icon: Gucci1,
          },
          {
            id: 5,
            path: "/?q=puma",
            label: "puma",
            icon: Puma,
          },
          {
            id: 6,
            path: "/?q=levis",
            label: "levis",
            icon: Levis,
          },
        ],
        banners: [
          {
            id: 1,
            path: "/?q=winter",
            label: "winter",
            image: Banner1,
          },
          {
            id: 2,
            path: "/?q=summer",
            label: "summer",
            image: Banner2,
          },
        ],
      },
      {
        id: 4,
        path: "/",
        label: "menu-wallets",
        icon: <WalletIcon />,
        columns: [
          {
            id: 1,
            columnItems: [
              {
                id: 1,
                path: "/?q=engagement-ring",
                label: "menu-top-wear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/?q=t-shit-shirtrt",
                    label: "menu-t-shirt",
                  },
                  {
                    id: 2,
                    path: "/?q=casual-shirts",
                    label: "menu-casual-shirts",
                  },
                  {
                    id: 3,
                    path: "/?q=formal-shirts",
                    label: "menu-formal-shirts",
                  },
                  {
                    id: 4,
                    path: "/?q=blazwers-coats",
                    label: "menu-blazwers-coats",
                  },
                  {
                    id: 5,
                    path: "/?q=suits",
                    label: "menu-suits",
                  },
                  {
                    id: 6,
                    path: "/?q=jackets",
                    label: "menu-jackets",
                  },
                ],
              },
              {
                id: 2,
                path: "/?q=belt-scarves",
                label: "menu-belt-scarves",
              },
              {
                id: 3,
                path: "/?q=watches-wearables",
                label: "menu-watches-wearables",
              },
            ],
          },
          {
            id: 2,
            columnItems: [
              {
                id: 1,
                path: "/?q=western-wear",
                label: "menu-western-wear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/?q=dresses",
                    label: "menu-dresses",
                  },
                  {
                    id: 2,
                    path: "/?q=jumpsuits",
                    label: "menu-jumpsuits",
                  },
                  {
                    id: 3,
                    path: "/?q=tops-t-shirt",
                    label: "menu-tops-shirts",
                  },
                  {
                    id: 4,
                    path: "/?q=shorts-skirts",
                    label: "menu-shorts-skirts",
                  },
                  {
                    id: 5,
                    path: "/?q=shurgs",
                    label: "menu-shurgs",
                  },
                  {
                    id: 6,
                    path: "/?q=blazers",
                    label: "menu-blazers",
                  },
                ],
              },
              {
                id: 2,
                path: "/?q=plus-size",
                label: "menu-plus-size",
              },
              {
                id: 3,
                path: "/?q=sunglasses-frames",
                label: "menu-sunglasses-frames",
              },
            ],
          },
          {
            id: 3,
            columnItems: [
              {
                id: 1,
                path: "/?q=footwear",
                label: "menu-footwear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/?q=flats",
                    label: "menu-flats",
                  },
                  {
                    id: 2,
                    path: "/?q=casual-shoes",
                    label: "menu-casual-shoes",
                  },
                  {
                    id: 3,
                    path: "/?q=heels",
                    label: "menu-heels",
                  },
                  {
                    id: 4,
                    path: "/?q=boots",
                    label: "menu-boots",
                  },
                ],
              },
              {
                id: 2,
                path: "/?q=sports-active-wear",
                label: "menu-sports-active-wear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/?q=clothing",
                    label: "menu-clothing",
                  },
                  {
                    id: 2,
                    path: "/?q=footwear",
                    label: "menu-footwear",
                  },
                  {
                    id: 3,
                    path: "/?q=sports-accessories",
                    label: "menu-sports-accessories",
                  },
                ],
              },
            ],
          },
        ],
        brands: [
          {
            id: 1,
            path: "/?q=nike",
            label: "nike",
            icon: Nike,
          },
          {
            id: 2,
            path: "/?q=dior",
            label: "dior",
            icon: Dior,
          },
          {
            id: 3,
            path: "/?q=gucci",
            label: "gucci",
            icon: Gucci,
          },
          {
            id: 4,
            path: "/?q=gucci1",
            label: "gucci1",
            icon: Gucci1,
          },
          {
            id: 5,
            path: "/?q=puma",
            label: "puma",
            icon: Puma,
          },
          {
            id: 6,
            path: "/?q=levis",
            label: "levis",
            icon: Levis,
          },
        ],
        banners: [
          {
            id: 1,
            path: "/?q=winter",
            label: "winter",
            image: Banner1,
          },
          {
            id: 2,
            path: "/?q=summer",
            label: "summer",
            image: Banner2,
          },
        ],
      },
      {
        id: 5,
        path: "/",
        label: "menu-bags",
        icon: <BagIcon />,
        columns: [
          {
            id: 1,
            columnItems: [
              {
                id: 1,
                path: "/?q=engagement-ring",
                label: "menu-top-wear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/?q=t-shit-shirtrt",
                    label: "menu-t-shirt",
                  },
                  {
                    id: 2,
                    path: "/?q=casual-shirts",
                    label: "menu-casual-shirts",
                  },
                  {
                    id: 3,
                    path: "/?q=formal-shirts",
                    label: "menu-formal-shirts",
                  },
                  {
                    id: 4,
                    path: "/?q=blazwers-coats",
                    label: "menu-blazwers-coats",
                  },
                  {
                    id: 5,
                    path: "/?q=suits",
                    label: "menu-suits",
                  },
                  {
                    id: 6,
                    path: "/?q=jackets",
                    label: "menu-jackets",
                  },
                ],
              },
              {
                id: 2,
                path: "/?q=belt-scarves",
                label: "menu-belt-scarves",
              },
              {
                id: 3,
                path: "/?q=watches-wearables",
                label: "menu-watches-wearables",
              },
            ],
          },
          {
            id: 2,
            columnItems: [
              {
                id: 1,
                path: "/?q=western-wear",
                label: "menu-western-wear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/?q=dresses",
                    label: "menu-dresses",
                  },
                  {
                    id: 2,
                    path: "/?q=jumpsuits",
                    label: "menu-jumpsuits",
                  },
                  {
                    id: 3,
                    path: "/?q=tops-t-shirt",
                    label: "menu-tops-shirts",
                  },
                  {
                    id: 4,
                    path: "/?q=shorts-skirts",
                    label: "menu-shorts-skirts",
                  },
                  {
                    id: 5,
                    path: "/?q=shurgs",
                    label: "menu-shurgs",
                  },
                  {
                    id: 6,
                    path: "/?q=blazers",
                    label: "menu-blazers",
                  },
                ],
              },
              {
                id: 2,
                path: "/?q=plus-size",
                label: "menu-plus-size",
              },
              {
                id: 3,
                path: "/?q=sunglasses-frames",
                label: "menu-sunglasses-frames",
              },
            ],
          },
          {
            id: 3,
            columnItems: [
              {
                id: 1,
                path: "/?q=footwear",
                label: "menu-footwear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/?q=flats",
                    label: "menu-flats",
                  },
                  {
                    id: 2,
                    path: "/?q=casual-shoes",
                    label: "menu-casual-shoes",
                  },
                  {
                    id: 3,
                    path: "/?q=heels",
                    label: "menu-heels",
                  },
                  {
                    id: 4,
                    path: "/?q=boots",
                    label: "menu-boots",
                  },
                ],
              },
              {
                id: 2,
                path: "/?q=sports-active-wear",
                label: "menu-sports-active-wear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/?q=clothing",
                    label: "menu-clothing",
                  },
                  {
                    id: 2,
                    path: "/?q=footwear",
                    label: "menu-footwear",
                  },
                  {
                    id: 3,
                    path: "/?q=sports-accessories",
                    label: "menu-sports-accessories",
                  },
                ],
              },
            ],
          },
        ],
        brands: [
          {
            id: 1,
            path: "/?q=nike",
            label: "nike",
            icon: Nike,
          },
          {
            id: 2,
            path: "/?q=dior",
            label: "dior",
            icon: Dior,
          },
          {
            id: 3,
            path: "/?q=gucci",
            label: "gucci",
            icon: Gucci,
          },
          {
            id: 4,
            path: "/?q=gucci1",
            label: "gucci1",
            icon: Gucci1,
          },
          {
            id: 5,
            path: "/?q=puma",
            label: "puma",
            icon: Puma,
          },
          {
            id: 6,
            path: "/?q=levis",
            label: "levis",
            icon: Levis,
          },
        ],
        banners: [
          {
            id: 1,
            path: "/?q=winter",
            label: "winter",
            image: Banner1,
          },
          {
            id: 2,
            path: "/?q=summer",
            label: "summer",
            image: Banner2,
          },
        ],
      },
      {
        id: 6,
        path: "/",
        label: "menu-jewelry",
        icon: <JewelryIcon />,
        columns: [
          {
            id: 1,
            columnItems: [
              {
                id: 1,
                path: "/?q=engagement-ring",
                label: "menu-top-wear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/?q=t-shit-shirtrt",
                    label: "menu-t-shirt",
                  },
                  {
                    id: 2,
                    path: "/?q=casual-shirts",
                    label: "menu-casual-shirts",
                  },
                  {
                    id: 3,
                    path: "/?q=formal-shirts",
                    label: "menu-formal-shirts",
                  },
                  {
                    id: 4,
                    path: "/?q=blazwers-coats",
                    label: "menu-blazwers-coats",
                  },
                  {
                    id: 5,
                    path: "/?q=suits",
                    label: "menu-suits",
                  },
                  {
                    id: 6,
                    path: "/?q=jackets",
                    label: "menu-jackets",
                  },
                ],
              },
              {
                id: 2,
                path: "/?q=belt-scarves",
                label: "menu-belt-scarves",
              },
              {
                id: 3,
                path: "/?q=watches-wearables",
                label: "menu-watches-wearables",
              },
            ],
          },
          {
            id: 2,
            columnItems: [
              {
                id: 1,
                path: "/?q=western-wear",
                label: "menu-western-wear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/?q=dresses",
                    label: "menu-dresses",
                  },
                  {
                    id: 2,
                    path: "/?q=jumpsuits",
                    label: "menu-jumpsuits",
                  },
                  {
                    id: 3,
                    path: "/?q=tops-t-shirt",
                    label: "menu-tops-shirts",
                  },
                  {
                    id: 4,
                    path: "/?q=shorts-skirts",
                    label: "menu-shorts-skirts",
                  },
                  {
                    id: 5,
                    path: "/?q=shurgs",
                    label: "menu-shurgs",
                  },
                  {
                    id: 6,
                    path: "/?q=blazers",
                    label: "menu-blazers",
                  },
                ],
              },
              {
                id: 2,
                path: "/?q=plus-size",
                label: "menu-plus-size",
              },
              {
                id: 3,
                path: "/?q=sunglasses-frames",
                label: "menu-sunglasses-frames",
              },
            ],
          },
          {
            id: 3,
            columnItems: [
              {
                id: 1,
                path: "/?q=footwear",
                label: "menu-footwear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/?q=flats",
                    label: "menu-flats",
                  },
                  {
                    id: 2,
                    path: "/?q=casual-shoes",
                    label: "menu-casual-shoes",
                  },
                  {
                    id: 3,
                    path: "/?q=heels",
                    label: "menu-heels",
                  },
                  {
                    id: 4,
                    path: "/?q=boots",
                    label: "menu-boots",
                  },
                ],
              },
              {
                id: 2,
                path: "/?q=sports-active-wear",
                label: "menu-sports-active-wear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/?q=clothing",
                    label: "menu-clothing",
                  },
                  {
                    id: 2,
                    path: "/?q=footwear",
                    label: "menu-footwear",
                  },
                  {
                    id: 3,
                    path: "/?q=sports-accessories",
                    label: "menu-sports-accessories",
                  },
                ],
              },
            ],
          },
        ],
        brands: [
          {
            id: 1,
            path: "/?q=nike",
            label: "nike",
            icon: Nike,
          },
          {
            id: 2,
            path: "/?q=dior",
            label: "dior",
            icon: Dior,
          },
          {
            id: 3,
            path: "/?q=gucci",
            label: "gucci",
            icon: Gucci,
          },
          {
            id: 4,
            path: "/?q=gucci1",
            label: "gucci1",
            icon: Gucci1,
          },
          {
            id: 5,
            path: "/?q=puma",
            label: "puma",
            icon: Puma,
          },
          {
            id: 6,
            path: "/?q=levis",
            label: "levis",
            icon: Levis,
          },
        ],
        banners: [
          {
            id: 1,
            path: "/?q=winter",
            label: "winter",
            image: Banner1,
          },
          {
            id: 2,
            path: "/?q=summer",
            label: "summer",
            image: Banner2,
          },
        ],
      },
      {
        id: 7,
        path: "/",
        label: "menu-sunglasses",
        icon: <SunglassIcon />,
        columns: [
          {
            id: 1,
            columnItems: [
              {
                id: 1,
                path: "/?q=engagement-ring",
                label: "menu-top-wear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/?q=t-shit-shirtrt",
                    label: "menu-t-shirt",
                  },
                  {
                    id: 2,
                    path: "/?q=casual-shirts",
                    label: "menu-casual-shirts",
                  },
                  {
                    id: 3,
                    path: "/?q=formal-shirts",
                    label: "menu-formal-shirts",
                  },
                  {
                    id: 4,
                    path: "/?q=blazwers-coats",
                    label: "menu-blazwers-coats",
                  },
                  {
                    id: 5,
                    path: "/?q=suits",
                    label: "menu-suits",
                  },
                  {
                    id: 6,
                    path: "/?q=jackets",
                    label: "menu-jackets",
                  },
                ],
              },
              {
                id: 2,
                path: "/?q=belt-scarves",
                label: "menu-belt-scarves",
              },
              {
                id: 3,
                path: "/?q=watches-wearables",
                label: "menu-watches-wearables",
              },
            ],
          },
          {
            id: 2,
            columnItems: [
              {
                id: 1,
                path: "/?q=western-wear",
                label: "menu-western-wear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/?q=dresses",
                    label: "menu-dresses",
                  },
                  {
                    id: 2,
                    path: "/?q=jumpsuits",
                    label: "menu-jumpsuits",
                  },
                  {
                    id: 3,
                    path: "/?q=tops-t-shirt",
                    label: "menu-tops-shirts",
                  },
                  {
                    id: 4,
                    path: "/?q=shorts-skirts",
                    label: "menu-shorts-skirts",
                  },
                  {
                    id: 5,
                    path: "/?q=shurgs",
                    label: "menu-shurgs",
                  },
                  {
                    id: 6,
                    path: "/?q=blazers",
                    label: "menu-blazers",
                  },
                ],
              },
              {
                id: 2,
                path: "/?q=plus-size",
                label: "menu-plus-size",
              },
              {
                id: 3,
                path: "/?q=sunglasses-frames",
                label: "menu-sunglasses-frames",
              },
            ],
          },
          {
            id: 3,
            columnItems: [
              {
                id: 1,
                path: "/?q=footwear",
                label: "menu-footwear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/?q=flats",
                    label: "menu-flats",
                  },
                  {
                    id: 2,
                    path: "/?q=casual-shoes",
                    label: "menu-casual-shoes",
                  },
                  {
                    id: 3,
                    path: "/?q=heels",
                    label: "menu-heels",
                  },
                  {
                    id: 4,
                    path: "/?q=boots",
                    label: "menu-boots",
                  },
                ],
              },
              {
                id: 2,
                path: "/?q=sports-active-wear",
                label: "menu-sports-active-wear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/?q=clothing",
                    label: "menu-clothing",
                  },
                  {
                    id: 2,
                    path: "/?q=footwear",
                    label: "menu-footwear",
                  },
                  {
                    id: 3,
                    path: "/?q=sports-accessories",
                    label: "menu-sports-accessories",
                  },
                ],
              },
            ],
          },
        ],
        brands: [
          {
            id: 1,
            path: "/?q=nike",
            label: "nike",
            icon: Nike,
          },
          {
            id: 2,
            path: "/?q=dior",
            label: "dior",
            icon: Dior,
          },
          {
            id: 3,
            path: "/?q=gucci",
            label: "gucci",
            icon: Gucci,
          },
          {
            id: 4,
            path: "/?q=gucci1",
            label: "gucci1",
            icon: Gucci1,
          },
          {
            id: 5,
            path: "/?q=puma",
            label: "puma",
            icon: Puma,
          },
          {
            id: 6,
            path: "/?q=levis",
            label: "levis",
            icon: Levis,
          },
        ],
        banners: [
          {
            id: 1,
            path: "/?q=winter",
            label: "winter",
            image: Banner1,
          },
          {
            id: 2,
            path: "/?q=summer",
            label: "summer",
            image: Banner2,
          },
        ],
      },
      {
        id: 8,
        path: "/",
        label: "menu-sneakers",
        icon: <SneakerIcon />,
        columns: [
          {
            id: 1,
            columnItems: [
              {
                id: 1,
                path: "/?q=engagement-ring",
                label: "menu-top-wear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/?q=t-shit-shirtrt",
                    label: "menu-t-shirt",
                  },
                  {
                    id: 2,
                    path: "/?q=casual-shirts",
                    label: "menu-casual-shirts",
                  },
                  {
                    id: 3,
                    path: "/?q=formal-shirts",
                    label: "menu-formal-shirts",
                  },
                  {
                    id: 4,
                    path: "/?q=blazwers-coats",
                    label: "menu-blazwers-coats",
                  },
                  {
                    id: 5,
                    path: "/?q=suits",
                    label: "menu-suits",
                  },
                  {
                    id: 6,
                    path: "/?q=jackets",
                    label: "menu-jackets",
                  },
                ],
              },
              {
                id: 2,
                path: "/?q=belt-scarves",
                label: "menu-belt-scarves",
              },
              {
                id: 3,
                path: "/?q=watches-wearables",
                label: "menu-watches-wearables",
              },
            ],
          },
          {
            id: 2,
            columnItems: [
              {
                id: 1,
                path: "/?q=western-wear",
                label: "menu-western-wear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/?q=dresses",
                    label: "menu-dresses",
                  },
                  {
                    id: 2,
                    path: "/?q=jumpsuits",
                    label: "menu-jumpsuits",
                  },
                  {
                    id: 3,
                    path: "/?q=tops-t-shirt",
                    label: "menu-tops-shirts",
                  },
                  {
                    id: 4,
                    path: "/?q=shorts-skirts",
                    label: "menu-shorts-skirts",
                  },
                  {
                    id: 5,
                    path: "/?q=shurgs",
                    label: "menu-shurgs",
                  },
                  {
                    id: 6,
                    path: "/?q=blazers",
                    label: "menu-blazers",
                  },
                ],
              },
              {
                id: 2,
                path: "/?q=plus-size",
                label: "menu-plus-size",
              },
              {
                id: 3,
                path: "/?q=sunglasses-frames",
                label: "menu-sunglasses-frames",
              },
            ],
          },
          {
            id: 3,
            columnItems: [
              {
                id: 1,
                path: "/?q=footwear",
                label: "menu-footwear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/?q=flats",
                    label: "menu-flats",
                  },
                  {
                    id: 2,
                    path: "/?q=casual-shoes",
                    label: "menu-casual-shoes",
                  },
                  {
                    id: 3,
                    path: "/?q=heels",
                    label: "menu-heels",
                  },
                  {
                    id: 4,
                    path: "/?q=boots",
                    label: "menu-boots",
                  },
                ],
              },
              {
                id: 2,
                path: "/?q=sports-active-wear",
                label: "menu-sports-active-wear",
                columnItemItems: [
                  {
                    id: 1,
                    path: "/?q=clothing",
                    label: "menu-clothing",
                  },
                  {
                    id: 2,
                    path: "/?q=footwear",
                    label: "menu-footwear",
                  },
                  {
                    id: 3,
                    path: "/?q=sports-accessories",
                    label: "menu-sports-accessories",
                  },
                ],
              },
            ],
          },
        ],
        brands: [
          {
            id: 1,
            path: "/?q=nike",
            label: "nike",
            icon: Nike,
          },
          {
            id: 2,
            path: "/?q=dior",
            label: "dior",
            icon: Dior,
          },
          {
            id: 3,
            path: "/?q=gucci",
            label: "gucci",
            icon: Gucci,
          },
          {
            id: 4,
            path: "/?q=gucci1",
            label: "gucci1",
            icon: Gucci1,
          },
          {
            id: 5,
            path: "/?q=puma",
            label: "puma",
            icon: Puma,
          },
          {
            id: 6,
            path: "/?q=levis",
            label: "levis",
            icon: Levis,
          },
        ],
        banners: [
          {
            id: 1,
            path: "/?q=winter",
            label: "winter",
            image: Banner1,
          },
          {
            id: 2,
            path: "/?q=summer",
            label: "summer",
            image: Banner2,
          },
        ],
      },
    ],

    pagesMenu: [
      {
        id: 1,
        path: "/",
        label: "menu-deals-today",
        icon: <ThunderIcon className="w-3 h-auto" />,
      },
      {
        id: 2,
        path: "/",
        label: "menu-offers",
      },
      {
        id: 3,
        path: "/faq",
        label: "menu-faq",
      },
      {
        id: 4,
        path: "/contact-us",
        label: "menu-contact",
      },
    ],
  },
  images: {} as onlineImages,
  companyInfo: {} as companyInfo,
};
