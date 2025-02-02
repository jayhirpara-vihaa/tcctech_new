import React, { useContext } from "react";
import Link from "@components/ui/link";
import { useTranslation } from "next-i18next";
import { CompanyInfoContext } from "@contexts/company_info/company_info";

interface MenuItem {
  id: number | string;
  path: string;
  label: string;
  columnItemItems?: MenuItem[];
}
type MegaMenuProps = {
  columns: {
    id: number | string;
    columnItems: MenuItem[];
  }[];
};

const MegaMenu: React.FC<MegaMenuProps> = ({ columns }) => {
  const { t } = useTranslation("menu");
  const { companyInfo } = useContext(CompanyInfoContext);
  return (
    <div className="absolute bg-megaMenuColor megaMenu shadow-header -start-28 xl:start-0">
      <div className="grid grid-cols-5">
        {columns?.map((column) => (
          <ul className="pt-6 pb-7 2xl:pb-8 2xl:pt-7" key={column.id}>
            {column?.columnItems?.map((columnItem) => (
              <React.Fragment key={columnItem.id}>
                <li className="mb-1.5">
                  <Link
                    href={columnItem.path}
                    className={`capitalize block text-sm py-1.5 text-[${
                      companyInfo && companyInfo.web_secondary_color
                    }] font-semibold px-5 xl:px-8 2xl:px-10  hover:bg-gray-300`}
                  >
                    {t(columnItem.label)}
                  </Link>
                </li>
                {columnItem?.columnItemItems?.map((item: any) => (
                  <li
                    key={item.id}
                    className={
                      columnItem?.columnItemItems?.length === item.id
                        ? "border-b border-gray-300 pb-3.5 mb-3"
                        : ""
                    }
                  >
                    <Link
                      href={item.path}
                      className={`capitalize text-body text-sm block py-1.5 px-5 xl:px-8 2xl:px-10 hover:text-[${
                        companyInfo && companyInfo.web_secondary_color
                      }] hover:bg-gray-300`}
                    >
                      {t(item.label)}
                    </Link>
                  </li>
                ))}
              </React.Fragment>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default MegaMenu;
