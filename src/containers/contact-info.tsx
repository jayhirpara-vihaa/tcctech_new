import { FC, useContext } from "react";
import { IoLocationSharp, IoMail, IoCallSharp } from "react-icons/io5";
import Link from "@components/ui/link";
import { useTranslation } from "next-i18next";
import { siteSettings } from "@settings/site-settings";
import { CompanyInfoContext } from "@contexts/company_info/company_info";
const mapImage = "/assets/images/map-image.jpg";

interface Props {
  image?: HTMLImageElement;
}
const style = {
  height: "300px",
  width: "100%",
  borderWidth: "0px",
};
const ContactInfoBlock: FC<Props> = () => {
  const { t } = useTranslation("common");
  const { companyInfo } = useContext(CompanyInfoContext);
  const data = [
    {
      id: 1,
      slug: "/",
      icon: <IoLocationSharp />,
      name: "text-address",
      description: "text-address-details",
    },
    {
      id: 2,
      slug: "/",
      icon: <IoMail />,
      name: "text-email",
      description: companyInfo?.company_email,
    },
    {
      id: 3,
      slug: "/",
      icon: <IoCallSharp />,
      name: "text-phone",
      description: companyInfo?.company_phone,
    },
  ];
  return (
    <div className="mb-6 lg:border lg:rounded-md border-gray-300 lg:p-7">
      <h4
        className={`text-2xl md:text-lg font-bold text-[${companyInfo.web_secondary_color}] pb-7 md:pb-10 lg:pb-6 -mt-1`}
      >
        {t("text-find-us-here")}
      </h4>
      {data?.map((item: any) => (
        <div key={`contact--key${item.id}`} className="flex pb-7">
          <div className="flex flex-shrink-0 justify-center items-center p-1.5 border rounded-md border-gray-300 w-10 h-10">
            {item.icon}
          </div>
          <div className="flex flex-col ps-3 2xl:ps-4">
            <h5
              className={`text-sm font-bold text-[${companyInfo.web_secondary_color}]`}
            >
              {t(`${item.name}`)}
            </h5>
            <Link href={item.slug} className="text-sm mt-0">
              {t(`${item.description}`)}
            </Link>
          </div>
        </div>
      ))}
      {/* <img src={mapImage} alt={t("text-map")} className="rounded-md" /> */}
      <iframe
        style={style}
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15078.485058632908!2d72.870629!3d19.124264!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9b3b3d29725%3A0xb706283148c8e444!2sThe%20CAD%20Co.!5e0!3m2!1sen!2sus!4v1685344946091!5m2!1sen!2sus"
      ></iframe>
    </div>
  );
};

export default ContactInfoBlock;
