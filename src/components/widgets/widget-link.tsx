import { FC, useContext } from "react";
import Link from "@components/ui/link";
import { useTranslation } from "next-i18next";
import Logo from "../../components/ui/footerLogo";
import { siteSettings } from "@settings/site-settings";
import { CompanyInfoContext } from "@contexts/company_info/company_info";

interface Props {
  className?: string;
  data: {
    widgetTitle?: string;
    lists: {
      id: string;
      path?: string;
      title: string;
      icon?: any;
    }[];
    logo?: any;
    description?: string;
    isCompanyIntroduction?: boolean;
  };
  variant?: "contemporary";
}

const WidgetLink: FC<Props> = ({ className, data }) => {
  const { widgetTitle, lists } = data;
  const { description } = data;
  const { t } = useTranslation("footer");
  const { logoImages, companyInfo } = useContext(CompanyInfoContext);

  return (
    <div
      className={`${className} ${data?.isCompanyIntroduction && "col-span-2"}`}
    >
      {!data?.isCompanyIntroduction ? (
        <>
          <h4 className=" text-sm md:text-base xl:text-lg font-semibold mb-5 2xl:mb-6 3xl:mb-7 text-white pt-5">
            {t(`${widgetTitle}`)}
          </h4>
          <ul className="text-xs lg:text-sm text-body flex flex-col space-y-3 lg:space-y-2.5">
            {lists.map((list) => (
              <li
                key={`widget-list--key${list.id}`}
                className="flex items-baseline"
              >
                {list.icon && (
                  <span className="me-3 relative top-0.5 lg:top-1 text-sm lg:text-base fill-white ">
                    {list.icon}
                  </span>
                )}
                <Link
                  href={list.path ? list.path : "#!"}
                  className={`transition-colors duration-200 text-white leading-6  hover:text-[${
                    companyInfo && companyInfo.web_secondary_color
                  }]`}
                >
                  {t(`${list.title}`)}
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="me-4 flex flex-col space-y-7 lg:space-y-7.5 mt-5">
          <Logo logoImage={logoImages && logoImages.lightImage} />
          <p className="text-sm font-normal text-heading leading-6 max-w-[334px]">
            {description}
          </p>
          {/* <ul className='text-xs lg:text-sm text-body flex items-center space-x-3 lg:space-x-3.5'>
            {lists.map((list) => (
              <li
                key={`widget-list--key${list.id}`}
                className='flex items-baseline'
              >
                {list.icon && (
                  <span className='me-3 relative top-0.5 lg:top-1 text-sm lg:text-base'>
                    {list.icon}
                  </span>
                )}
              </li>
            ))}
          </ul> */}
        </div>
      )}
    </div>
  );
};

export default WidgetLink;
