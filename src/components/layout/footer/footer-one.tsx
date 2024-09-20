import Widgets from "./widgets";
import Copyright from "./copyright";
import { footer } from "./data";
import {
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoFacebook,
  IoLogoYoutube,
  IoLogoLinkedin,
} from "react-icons/io5";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { useContext } from "react";
import { CompanyInfoContext } from "@contexts/company_info/company_info";

const Footer: React.FC = () => {
  const { companyInfo } = useContext(CompanyInfoContext);

  const footer = {
    widgets: [
      {
        id: 1,
        widgetTitle: "widget-title-social",
        lists: [
          {
            id: 1,
            title: "link-instagram",
            path: companyInfo.insta_link,
            icon: <IoLogoInstagram />,
          },
          {
            id: 2,
            title: "link-twitter",
            path: companyInfo.twitter_link,
            icon: <IoLogoTwitter />,
          },
          {
            id: 3,
            title: "link-facebook",
            path: companyInfo.facebook_link,
            icon: <IoLogoFacebook />,
          },
          {
            id: 4,
            title: "link-youtube",
            path: companyInfo.youtube_link,
            icon: <IoLogoYoutube />,
          },
          {
            id: 4,
            title: "LinkedIn",
            path: companyInfo.linkdln_link,
            icon: <IoLogoLinkedin />,
          },
        ],
      },
      {
        id: 2,
        widgetTitle: "widget-title-contact",
        lists: [
          {
            id: 1,
            title: "link-contact-us",
            path: "/contact-us",
          },
          {
            id: 2,
            title: companyInfo.company_email,
            icon: <MdEmail />,
            path: `mailto:${companyInfo.company_email}`,
          },
          {
            id: 3,
            title: "link-email-two",
            path: "/",
          },
          {
            id: 4,
            title: "link-phone",
            path: "/",
          },
          {
            id: 5,
            title:
              "Orchid Plaza Premises,C-202, 2nd floor,Near Movie Time Cinema,RT Road,Dahisar East 400068",
            icon: <MdLocationOn />,
            path: `https://goo.gl/maps/RhDJARAGsSQyoxYg7`,
          },
        ],
      },
      {
        id: 3,
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
          {
            id: 4,
            title: "link-copyright",
            path: "/",
          },
        ],
      },
      {
        id: 4,
        widgetTitle: "widget-title-customer-care",
        lists: [
          {
            id: 1,
            title: "link-faq",
            path: "/content/faq",
          },
          {
            id: 2,
            title: "link-shipping",
            path: "/",
          },
          {
            id: 3,
            title: "link-exchanges",
            path: "/",
          },
        ],
      },
      {
        id: 5,
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
            title: "link-return-policy",
            path: "/content/return-policy",
          },
          {
            id: 4,
            title: "link-faq",
            path: "/content/faq",
          },
          {
            id: 5,
            title: "link-site-map",
            path: "/site-map",
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
        image: "/assets/images/payment/visa.svg",
        name: "payment-visa",
        width: 50,
        height: 20,
      },
      {
        id: 3,
        path: "/",
        image: "/assets/images/payment/paypal.svg",
        name: "payment-paypal",
        width: 76,
        height: 20,
      },
      {
        id: 4,
        path: "/",
        image: "/assets/images/payment/jcb.svg",
        name: "payment-jcb",
        width: 26,
        height: 20,
      },
      {
        id: 5,
        path: "/",
        image: "/assets/images/payment/skrill.svg",
        name: "payment-skrill",
        width: 39,
        height: 20,
      },
    ],
  };

  return (
    <footer className="border-b-4 border-heading  bg-footerColor mt-9 md:mt-11 lg:mt-16 3xl:mt-20 pt-2.5 lg:pt-0 2xl:pt-2">
      <Widgets widgets={footer.widgets} />
      <Copyright payment={footer.payment} />
    </footer>
  );
};
export default Footer;
