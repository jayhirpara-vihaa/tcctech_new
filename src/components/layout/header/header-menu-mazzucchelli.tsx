import Link from "@components/ui/link";
import MegaMenu from "@components/ui/mega-menu";
import classNames from "classnames";
import ListMenu from "@components/ui/list-menu";
import { useTranslation } from "next-i18next";
import { siteSettings } from "@settings/site-settings-mazzucchelli";
import {
    CategoryApiData,
    useCategoryDataQuery,
} from "@framework/categorylist/get-all-category-list";
import { useContext } from "react";
import { CompanyInfoContext } from "@contexts/company_info/company_info";

interface MenuProps {
    data: any;
    className?: string;
}

const HeaderMenu: React.FC<MenuProps> = ({ data, className }) => {
    const { t } = useTranslation("menu");
    const Color = siteSettings?.companyInfo?.web_secondary_color;
    const { companyInfo } = useContext(CompanyInfoContext);

    return (
        <nav className={classNames(` flex w-full relative`, className)}>
            {data?.map((item: any) => (
                <div
                    className={`menuItem group  py-7 ${item.subMenu ? "relative" : ""
                        } `}
                    key={item.id}
                >
                    <Link
                        href={item.path}
                        className={
                            `ProximaNova font-medium uppercase relative inline-flex items-center px-3 py-0 pt-0 text-sm xl:text-base xl:px-4 text-white` +
                            `${t(item.label) === "ENGAGEMENT RINGS"
                                ? `text-[${process.env.NEXT_PUBLIC_MAZZCONFIG_TEXT_COLOR}]`
                                : ""
                            }`
                        }
                    >
                        {t(item.label)}
                        {(item?.columns || item.subMenu) && (
                            <span className="text-xs mt-1 xl:mt-0.5 w-4 flex justify-end capitalize">
                                {/* <FaChevronDown className="transition duration-300 ease-in-out transform group-hover:-rotate-180 ml-1" /> */}
                            </span>
                        )}
                    </Link>

                    {/* {item?.columns && Array.isArray(item.columns) && (
            <MegaMenu columns={item.columns} />
          )}

          {item?.subMenu && Array.isArray(item.subMenu) && (
            <div className="absolute invisible bg-megaMenuColor opacity-0 group-hover:visible subMenu shadow-header start-0 group-hover:opacity-100 capitalize">
              <ul className="py-5 text-sm text-body ">
                {item.subMenu.map((menu: any, index: number) => {
                  const dept: number = 1;
                  const menuName: string = `sidebar-menu-${dept}-${index}`;

                  return (
                    <ListMenu
                      dept={dept}
                      data={menu}
                      hasSubMenu={menu.subMenu}
                      menuName={menuName}
                      key={menuName}
                      menuIndex={index}
                    />
                  );
                })}
              </ul>
            </div>
          )} */}
                </div>
            ))}
        </nav>
    );
};

export default HeaderMenu;
