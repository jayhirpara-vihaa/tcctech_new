import React, { useRef } from 'react';
import SearchIcon from '@components/icons/search-icon';
import { siteSettings } from '@settings/site-settings';
import HeaderMenu from '@components/layout/header/header-menu';
import Logo from '@components/ui/logo';
import { useUI } from '@contexts/ui.context';
import { ROUTES } from '@utils/routes';
import { addActiveScroll } from '@utils/add-active-scroll';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import LanguageSwitcher from '@components/ui/language-switcher';
import Link from "@components/ui/link";


const AuthMenu = dynamic(() => import('./auth-menu'), { ssr: false });
const CartButton = dynamic(() => import('@components/cart/cart-button'), {
  ssr: false,
});

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const { site_header } = siteSettings;
const Header: React.FC = () => {
  const { openSearch,isAuthorized } = useUI();
  const { t } = useTranslation('common');
  const siteHeaderRef = useRef() as DivElementRef;
  addActiveScroll(siteHeaderRef);


  return (
    <header id="siteHeader" ref={siteHeaderRef} className="w-full h-16 sm:h-20 lg:h-24 relative z-20">
      <div className="innerSticky text-gray-700 body-font fixed bg-headerBackgroundColor w-full h-16 sm:h-20 lg:h-24 z-20 px-4 md:px-8 lg:px-6 transition duration-200 ease-in-out">
        {/* Fisrt Component with Icon of Contact us*/}
        <div>

        </div>
        {/* Second Component with Logo And Mega Menu and Cart Button*/}
        <div className="flex items-center justify-center mx-auto max-w-[1920px] h-full w-full">
          <Logo />

          <HeaderMenu data={site_header.menu} className="hidden lg:flex md:ms-6 xl:ms-10" />

          {/* <div className="flex-shrink-0 ms-auto lg:me-5 xl:me-8 2xl:me-10">
            <LanguageSwitcher />
          </div> */}
          <div className="hidden lg:flex justify-end items-center space-s-6 lg:space-s-5 xl:space-s-8 2xl:space-s-10 ms-auto flex-shrink-0">
            <button
              className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none transform"
              onClick={openSearch}
              aria-label="search-button"
            >
              <SearchIcon className='' width="w-full" height="h-full" color={siteSettings.companyInfo.web_primary_color} />
            </button>
            <div className="-mt-0.5 flex-shrink-0">
              <span className="hidden  text-xs font-semibold transition-all duration-100 ease-in-out cursor-pointer lg:font-normal lg:block xl:text-base">
                {/* {t('REGISTER / LOGIN')} */}
                {isAuthorized === false ? (<div>
                  <Link href={`${ROUTES.ACCOUNT}`} className="truncate text-sm text-heading mb-1.5 -mt-1">
                    <button type="button" className={`inline-block px-6 py-2 border-0 border-gray-200 text-headerTextColor font-normal text-xs uppercase rounded-full hover:bg-orange-300  focus:outline-none focus:ring-0 transition duration-150 ease-in-out`}>Hi, john...</button>
                  </Link>
                </div>) :
                  (<AuthMenu
                    isAuthorized={isAuthorized}
                    href={ROUTES.LOGIN}
                    className={`flex-shrink-0 text-headerSecondaryTextColor hidden text-sm xl:text-base lg:flex focus:outline-none  gap-x-3`}
                    btnProps={{
                      children: (
                        "Register / Login"
                      ),
                    }}
                  />)}
              </span>
              {/* <AuthMenu
                isAuthorized={isAuthorized}
                href={ROUTES.ACCOUNT}
                className="text-sm xl:text-base text-heading font-semibold"
                btnProps={{
                  className: 'text-sm xl:text-base text-heading font-semibold focus:outline-none',
                  // @ts-ignore
                  children: t('text-sign-in'),
                  onClick: handleLogin,
                }}
              >
                {t('text-account')}
              </AuthMenu> */}
            </div>
            <CartButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
