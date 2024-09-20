import Container from '@components/ui/container';
import Layout from '@components/layout/layout-three';
import { ShopFilters } from '@components/shop/filters';
import StickyBox from 'react-sticky-box';
import { ProductGrid } from '@components/diamond-setting/diamond-setting-grid';
import SearchTopBar from '@components/shop/top-bar';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';

export default function Shop() {
  const { t } = useTranslation('common');

  return (
    <>
      
      {/* <ShopDiscount /> */}
      <Container>
        <div className={`flex pt-8 pb-16 lg:pb-20`}>
          <div className="flex-shrink-0 pe-24 hidden lg:block w-105">
            <StickyBox offsetTop={50} offsetBottom={20}>
              {/* <div className="pb-7">
                <BreadcrumbItems separator="/">
                  <ActiveLink href={'/'} activeClassName="font-semibold text-heading">
                    <a>{t('breadcrumb-home')}</a>
                  </ActiveLink>
                  <ActiveLink href={ROUTES.SEARCH} activeClassName="font-semibold text-heading">
                    <a className="capitalize">{t('breadcrumb-search')}</a>
                  </ActiveLink>
                </BreadcrumbItems>
              </div> */}
              <ShopFilters />
            </StickyBox>
          </div>

          <div className="w-full lg:-ms-10">
            <SearchTopBar/>
            <ProductGrid className='px-4 md:px-8 2xl:px-16' />
          </div>
        </div>
        {/* <Subscription /> */}

      </Container>
    </>
  );
}

Shop.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'forms', 'menu', 'footer'])),
    },
  };
};
