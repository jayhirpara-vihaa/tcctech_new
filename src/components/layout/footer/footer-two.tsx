import Widgets from "./widgets";
import Copyright from "./copyright";
import { footerContemporary } from "./data";
// const { widgets, payment } = footerContemporary
import {
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoFacebook,
  IoLogoYoutube,
  IoLogoLinkedin,
} from "react-icons/io5";
import { siteSettings } from "@settings/site-settings";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { IoMdContacts } from "react-icons/io";
import { ROUTES } from "@utils/routes";
import { useContext } from "react";
import { CompanyInfoContext } from "@contexts/company_info/company_info";

const FooterTwo: React.FC = () => {
  const { companyInfo } = useContext(CompanyInfoContext);

  const footerData = {
    widgets: [
      {
        id: 0,
        isCompanyIntroduction: true,
        description: companyInfo?.sort_about,
        lists: [],
      },
      {
        id: 1,
        widgetTitle: "widget-title-social",
        lists: [
          {
            id: 1,
            title: "link-instagram",
            path: companyInfo?.insta_link,
            icon: (
              <IoLogoInstagram
                color={companyInfo && companyInfo.web_secondary_color}
              />
            ),
          },
          {
            id: 2,
            title: "link-twitter",
            path: companyInfo?.twitter_link,
            icon: (
              <IoLogoTwitter
                color={companyInfo && companyInfo.web_secondary_color}
              />
            ),
          },
          {
            id: 3,
            title: "link-facebook",
            path: companyInfo?.facebook_link,
            icon: (
              <IoLogoFacebook
                color={companyInfo && companyInfo.web_secondary_color}
              />
            ),
          },
          {
            id: 4,
            title: "link-youtube",
            path: companyInfo?.youtube_link,
            icon: (
              <IoLogoYoutube
                color={companyInfo && companyInfo.web_secondary_color}
              />
            ),
          },
          {
            id: 5,
            title: "LinkedIn",
            path: companyInfo?.linkdln_link,
            icon: (
              <IoLogoLinkedin
                color={companyInfo && companyInfo.web_secondary_color}
              />
            ),
          },
        ],
      },
      {
        id: 2,
        widgetTitle: "widget-title-about",
        lists: [
          {
            id: 1,
            title: "link-support-center",
            path: "/contact-us",
          },
          {
            id: 2,
            title: "link-customer-support",
            path: "/contact-us",
          },
          {
            id: 3,
            title: "link-about-us",
            path: "/nungu-love-stories",
          },
        ],
      },
      {
        id: 3,
        widgetTitle: "widget-title-our-information",
        lists: [
          {
            id: 1,
            title: "link-privacy",
            path: "/content/privacy",
          },
          {
            id: 2,
            title: "link-terms",
            path: "/content/terms",
          },
          {
            id: 3,
            title: "link-faq",
            path: "/content/faq",
          },
          {
            id: 4,
            title: "link-site-map",
            path: "/site-map",
          },
        ],
      },
      {
        id: 4,
        widgetTitle: "widget-title-contact",
        lists: [
          {
            id: 1,
            title: "link-contact-us",
            path: "/contact-us",
            icon: (
              <IoMdContacts
                color={companyInfo && companyInfo?.web_secondary_color}
              />
            ),
          },
          {
            id: 2,
            title: companyInfo?.company_email,
            icon: (
              <MdEmail
                color={companyInfo && companyInfo?.web_secondary_color}
              />
            ),
            path: `mailto:${companyInfo && companyInfo?.company_email}`,
          },

          {
            id: 4,
            title: `Call Us:${companyInfo && companyInfo?.company_phone}`,
            icon: (
              <MdPhone
                color={companyInfo && companyInfo?.web_secondary_color}
              />
            ),
            path: `tel:${companyInfo && companyInfo?.company_phone}`,
          },
          {
            id: 5,
            title:
              "Orchid Plaza Premises,C-202, 2nd floor,Near Movie Time Cinema,RT Road,Dahisar East 400068.",
            icon: (
              <MdLocationOn
                color={companyInfo && companyInfo?.web_secondary_color}
              />
            ),
            path: `https://goo.gl/maps/RhDJARAGsSQyoxYg7`,
          },
        ],
      },
    ],
    payment: [
      {
        id: 1,
        path: "/",
        image: "/assets/images/payment/mastercard.svg",
        name: "payment-master-card",
        width: 34,
        height: 20,
      },
      {
        id: 2,
        path: "/",
        image: "/assets/images/payment/Yocoicon.svg",
        name: "payment-visa",
        width: 50,
        height: 20,
      },
      // {
      //   id: 3,
      //   path: "/",
      //   image: "/assets/images/payment/paypal.svg",
      //   name: "payment-paypal",
      //   width: 76,
      //   height: 20,
      // },
      // {
      //   id: 4,
      //   path: "/",
      //   image: "/assets/images/payment/jcb.svg",
      //   name: "payment-jcb",
      //   width: 26,
      //   height: 20,
      // },
      {
        id: 3,
        path: "/",
        image: "/assets/images/payment/visa.svg",
        name: "payment-visa",
        width: 39,
        height: 20,
      },
      {
        id: 4,
        path: "/",
        image: "/assets/images/payment/skrill.svg",
        name: "payment-skrill",
        width: 39,
        height: 20,
      },
    ],
  };

  return (
    <footer className="bg-footerColor">
      <Widgets widgets={footerData?.widgets} variant="contemporary" />
      <Copyright payment={footerData?.payment} variant="contemporary" />
    </footer>
  );
};
export default FooterTwo;
