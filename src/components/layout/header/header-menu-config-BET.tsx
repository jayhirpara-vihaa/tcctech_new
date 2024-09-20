import Link from "@components/ui/link";
import classNames from "classnames";
import { useTranslation } from "next-i18next";
import { useContext } from "react";
import { CompanyInfoContext } from "@contexts/company_info/company_info";

interface MenuProps {
  data: any;
  className?: string;
}

const HeaderMenu: React.FC<MenuProps> = ({ data, className }) => {
  const { t } = useTranslation("menu");
  const { companyInfo } = useContext(CompanyInfoContext);

  return (
    <nav className={classNames(`headerMenu flex w-full relative`, className)}>
      {data?.map((item: any) => (
        <div
          className={`group cursor-pointer py-7 ${
            item.subMenu ? "relative" : ""
          } `}
          key={item.id}
        >
          <Link
            href={""}
            className={
              `AvenirRegular uppercase relative inline-flex items-center px-3 py-0 pt-0 text-sm xl:text-base text-headerTextColor xl:px-4 hover:text-[${
                companyInfo && companyInfo.web_secondary_color
              }] ` +
              `${
                t(item.label) === "ENGAGEMENT RINGS"
                  ? `text-[${companyInfo && companyInfo.web_secondary_color}]`
                  : ""
              }`
            }
          >
            {t(item.label)}

            {(item?.columns || item.subMenu) && (
              <span className="text-xs mt-1 xl:mt-0.5 w-4 flex justify-end capitalize"></span>
            )}
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default HeaderMenu;
