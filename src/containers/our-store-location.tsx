import React, { useContext } from "react";
import SectionHeader from "@components/common/theProcess-section-header";
import { MdEmail, MdPhone } from "react-icons/md";
import { siteSettings } from "@settings/site-settings";
import Button from "@components/ui/button";
import Map from "@components/map/map";
import Link from "next/link";
import { CompanyInfoContext } from "@contexts/company_info/company_info";

export const OurStore = () => {
  const image = "/assets/images/Location/google_map.png";
  const style = {
    height: "300px",
    width: "100%",
    borderWidth: "0px",
  };
  return (
    <div className=" max-xl:py-24 max-lg:py-4 px-4 md:px-20 2xl:px-96">
      <div>
        <SectionHeader
          topVarient={false}
          sectionHeading="Our Location"
          className="mt-20 pb-0.5 sm:mb-1.5 "
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 py-10">
        <div className="p-4">
          <div className="mb-5 2xl:mb-6 3xl:mb-7">
            <h4 className="nungu-location-nd-text md:text-base xl:text-lg font-semibold">
              THE CAD CO.
            </h4>
          </div>
          <div className="mb-5 2xl:mb-6 3xl:mb-7">
            <h1 className="md:text-base nungu-location-address-text xl:text-lg ">
              Orchid Plaza Premises,C-202, 2nd floor,Near Movie Time Cinema,RT Road,Dahisar East 400068
            </h1>
          </div>
          {/* <div className="mb-5 2xl:mb-6 3xl:mb-7">
            <span className=" font-bold">
              <MdEmail
                size={20}
                color={siteSettings?.companyInfo?.web_secondary_color}
              />{" "}
              info@nungu-diamonds.co.za
            </span>
            <span className="md:text-base nungu-location-address-text xl:text-lg "></span>
          </div>
          <div className="mb-5 2xl:mb-6 3xl:mb-7">
            <span className="font-bold">
              <MdPhone
                size={20}
                color={siteSettings?.companyInfo?.web_secondary_color}
              />
            </span>
            <h1 className="md:text-base nungu-location-address-text xl:text-lg ">
              <span>+27 11 681 0209</span> <span> +27 83 278 0738</span>
            </h1>
          </div> */}
          {/* <div className="mb-5 2xl:mb-6 3xl:mb-7">
            <a
              className="md:text-base xl:text-lg text-[#dbb961] border-b border-[#dbb961]"
              
            >
              
            </a>
          </div> */}
          <Link
            href="https://goo.gl/maps/RhDJARAGsSQyoxYg7"
            passHref
          >
            <a target="_blank" rel="noopener noreferrer">
              <div>
                <Button className="w-[30%] h-[3rem] hover:w-[26%] hover:h-[3.2rem]">
                  VIEW ON MAP
                </Button>
              </div>
            </a>
          </Link>
        </div>

        <div className="w-full h-[250px] md:h-full">
          {/* <img className="w-full" src={image} alt={"item"} />
           */}
          {/* <Map /> */}
          <iframe
            style={style}
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15078.485058632908!2d72.870629!3d19.124264!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9b3b3d29725%3A0xb706283148c8e444!2sThe%20CAD%20Co.!5e0!3m2!1sen!2sus!4v1685344946091!5m2!1sen!2sus"
          ></iframe>
        </div>
      </div>
    </div>
  );
};
