import React, { useRef } from 'react';
import { ROUTES } from "@utils/routes";
import { addActiveScroll } from '@utils/add-active-scroll';
import { useTranslation } from 'next-i18next';
import Home from "../../icons/home-color-icon";
import Ourstories from "../../icons/our-stories";
import AboutUs from "../../icons/about-us";
import Location from "../../icons/location-icon";
import Contact from "../../icons/contact-icon";
import Link from "@components/ui/link";

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
export default function Header() {
    const { t } = useTranslation();
    const siteHeaderRef = useRef() as DivElementRef;
    addActiveScroll(siteHeaderRef);

    return (
        <>
            <div className={`fixed z-20 content-center w-full h-16 text-gray-700 transition duration-200 ease-in-out bg-headerBackgroundColor innerSticky body-font sm:h-20 lg:h-36 xl:h-40 ps-4 md:ps-0 lg:ps-6 pe-4 lg:pe-6 px-4 md:px-8 2xl:px-16`}>
                {/* First Component */}
                <div className="flex pt-2 justify-between space-x-6 mx-auto max-w-[1920px]">
                    <div className='flex justify-start'>
                        <Link href={`${ROUTES.HOME}`} className="truncate text-sm text-heading mb-1.5 -mt-1">
                            <div className="hidden lg:flex md:gap-x-2 align-center max-w-[1920px]">
                                <Home />
                                <span className={`hidden pr-4 pt-0.5 text-[8px] text-headerTextColor font-semibold transition-all duration-100 ease-in-out cursor-pointer lg:font-normal lg:block xl:text-base`}>
                                    {t('Home')}
                                </span>
                            </div>
                        </Link>
                        <Link href={`${ROUTES.OURSTORY}`} className={`truncate text-sm text-headerTextColor mb-1.5 -mt-1`}>
                            <div className="hidden lg:flex md:gap-x-2 align-center">
                                <Ourstories />
                                <span className={`hidden pr-4 pt-0.5 text-[8px] font-semibold transition-all duration-100 ease-in-out cursor-pointer lg:font-normal lg:block xl:text-base text-headerTextColor`}>
                                    {t('Our Stories')}
                                </span>
                            </div>
                        </Link>
                        <Link href={`${ROUTES.CONTACT}`} className={`truncate text-sm text-headerTextColor mb-1.5 -mt-1`}>
                            <div className="hidden lg:flex md:gap-x-2 align-center">
                                <AboutUs />
                                <span className={`hidden pr-4 pt-0.5 text-[8px] font-semibold transition-all duration-100 ease-in-out cursor-pointer lg:font-normal lg:block xl:text-base text-headerTextColor`}>
                                    {t('About Us')}
                                </span>
                            </div>
                        </Link>
                    </div>
                    <div className='flex justify-end'>
                        <Link href={`${ROUTES.CONTACT}`} className={`truncate text-sm text-headerTextColor mb-1.5 -mt-1`}>
                            <div className="hidden lg:flex md:gap-x-2 align-center">
                                <Location />
                                <span className={`hidden pr-4 pt-0.5 text-[8px] font-semibold transition-all duration-100 ease-in-out cursor-pointer lg:font-normal lg:block xl:text-base text-headerTextColor`}>
                                    {t('Location')}
                                </span>
                            </div>
                        </Link>
                        <Link href={`${ROUTES.CONTACT}`} className={`truncate text-sm text-headerTextColor mb-1.5 -mt-1`}>
                            <div className="hidden lg:flex md:gap-x-2 align-center">
                                <Contact />
                                <span className={`hidden pr-4 pt-0.5 text-[8px] font-semibold transition-all duration-100 ease-in-out cursor-pointer lg:font-normal lg:block xl:text-base text-headerTextColor`}>
                                    {t('Contact')}
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
