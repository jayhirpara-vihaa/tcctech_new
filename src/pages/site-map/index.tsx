import type { GetStaticProps } from "next";
import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import { QueryClient, dehydrate } from "react-query";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { fetchsCompanyInfo } from "src/framework/company-info/get-all-company-info";
import Text from "@components/ui/text";

export default function SiteMap() {
  return (
    <>
      <Container className="border-b-2 border[#E6E6E6] ">
        <div
          className={`flex items-center justify-center mt-10 pb-0.5 mb-2 md:mb-5 lg:mb-6 2xl:mb-7 3xl:mb-8`}
        >
          <Text className="Tcc-text-our-Jewelry-Section pb-1.5">Site Map</Text>
        </div>
        <div className="grid grid-cols-4 gap-4 mx-7 my-7">
          <div className="engagement-rings">
            <div className="Engagement-head">
              <h2 className="TCC-product-detail-heading">Engagement Rings</h2>
            </div>
            <div className="Engagement-list">
              <ul className="siteMap_ul">
                <li>
                  <a
                    className="siteMap_a"
                    href="https://nungudiamonds.vercel.app/products?filter=style&value=hidden-halo"
                  >
                    HALO Engagement Rings
                  </a>
                </li>
                <li>
                  <a
                    className="siteMap_a"
                    href="https://nungudiamonds.vercel.app/products?filter=style&value=solitaire"
                  >
                    SOLITAIRE Engagement Rings
                  </a>
                </li>
                <li>
                  <a
                    className="siteMap_a"
                    href="https://nungudiamonds.vercel.app/products?filter=style&value=accents"
                  >
                    ACCENTS Engagement Rings
                  </a>
                </li>
                <li>
                  <a
                    className="siteMap_a"
                    href="https://nungudiamonds.vercel.app/products?filter=style&value=luxe"
                  >
                    LUXE Engagement Rings
                  </a>
                </li>
                <li>
                  <a
                    className="siteMap_a"
                    href="https://nungudiamonds.vercel.app/products?filter=style&value=classic"
                  >
                    CLASSIC Engagement Rings
                  </a>
                </li>
                <li>
                  <a
                    className="siteMap_a"
                    href="https://nungudiamonds.vercel.app/products?filter=style&value=nature-inspired"
                  >
                    INSPIRED Engagement Rings
                  </a>
                </li>
                <li>
                  <a
                    className="siteMap_a"
                    href="https://nungudiamonds.vercel.app/products?filter=style&value=three-stone"
                  >
                    THREE STONE Engagement Rings
                  </a>
                </li>
                <li>
                  <a
                    className="siteMap_a"
                    href="https://nungudiamonds.vercel.app/products?filter=style&value=unique"
                  >
                    UNIQUE Engagement Rings
                  </a>
                </li>
                <li>
                  <a
                    className="siteMap_a"
                    href="https://nungudiamonds.vercel.app/products?filter=style&value=vintage"
                  >
                    VINTAGE Engagement Rings
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="Diamonds">
            <div className="Diamonds-head">
              <h2 className="TCC-product-detail-heading">Diamonds</h2>
            </div>
            <div className="Diamonds-list">
              <ul className="siteMap_ul">
                <li>
                  <a
                    className="siteMap_a"
                    href="https://nungudiamonds.vercel.app/products?filter=shape&value=round"
                  >
                    ROUND Diamonds
                  </a>
                </li>
                <li>
                  <a
                    className="siteMap_a"
                    href="https://nungudiamonds.vercel.app/products?filter=shape&value=oval"
                  >
                    OVAL Diamonds
                  </a>
                </li>
                <li>
                  <a
                    className="siteMap_a"
                    href="https://nungudiamonds.vercel.app/products?filter=shape&value=emerald"
                  >
                    EMERALD Diamonds
                  </a>
                </li>
                <li>
                  <a
                    className="siteMap_a"
                    href="https://nungudiamonds.vercel.app/products?filter=shape&value=pear"
                  >
                    PEAR Diamonds
                  </a>
                </li>
                <li>
                  <a
                    className="siteMap_a"
                    href="https://nungudiamonds.vercel.app/products?filter=shape&value=cushion"
                  >
                    CUSHION Diamonds
                  </a>
                </li>
                <li>
                  <a
                    className="siteMap_a"
                    href="https://nungudiamonds.vercel.app/products?filter=shape&value=marquise"
                  >
                    MARQUISE Diamonds
                  </a>
                </li>
                <li>
                  <a
                    className="siteMap_a"
                    href="https://nungudiamonds.vercel.app/products?filter=shape&value=asscher"
                  >
                    ASSCHER Diamonds
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="WEDDING-RINGS">
            <div className="WEDDING-head">
              <h2 className="TCC-product-detail-heading">WEDDING RINGS</h2>
            </div>
            <div className="WEDDING-list">
              <ul className="siteMap_ul">
                <li>
                  <ul className="siteMap_ul">
                    <h4>WOMEN</h4>
                    <li>
                      <a
                        className="siteMap_a"
                        href="https://nungudiamonds.vercel.app/products?filter=women&value=wedding-bands"
                      >
                        WEDDING BANDS
                      </a>
                    </li>
                    <li>
                      <a
                        className="siteMap_a"
                        href="https://nungudiamonds.vercel.app/products?filter=women&value=diamond-bands"
                      >
                        DIAMOND BANDS
                      </a>
                    </li>
                    <li>
                      <a
                        className="siteMap_a"
                        href="https://nungudiamonds.vercel.app/products?filter=women&value=stackable-bands"
                      >
                        STACKABLE RINGS
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <ul className="siteMap_ul">
                    <h4>MEN</h4>
                    <li>
                      <a
                        className="siteMap_a"
                        href="https://nungudiamonds.vercel.app/products?filter=men&value=wedding-bands"
                      >
                        WEDDING BANDS
                      </a>
                    </li>
                    <li>
                      <a
                        className="siteMap_a"
                        href="https://nungudiamonds.vercel.app/products?filter=men&value=diamond-bands"
                      >
                        DIAMOND BANDS
                      </a>
                    </li>
                    <li>
                      <a className="siteMap_a" href="">
                        GEMSTONE BANDS
                      </a>
                    </li>
                    <li>
                      <a
                        className="siteMap_a"
                        href="https://nungudiamonds.vercel.app/products?filter=men&value=matte-finish"
                      >
                        MATTE FINISH
                      </a>
                    </li>
                    <li>
                      <a
                        className="siteMap_a"
                        href="https://nungudiamonds.vercel.app/products?filter=men&value=polish-finish"
                      >
                        POLISH FINISH
                      </a>
                    </li>
                    <li>
                      <a
                        className="siteMap_a"
                        href="https://nungudiamonds.vercel.app/products?filter=men&value=textured-rings"
                      >
                        TEXTURED RINGS
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <ul className="siteMap_ul">
                    <h4>JEWELLERY CARE</h4>
                    <li>
                      <a
                        className="siteMap_a"
                        href="https://nungudiamonds.vercel.app/re-valuation"
                      >
                        RE-VALUATION
                      </a>
                    </li>
                    <li>
                      <a
                        className="siteMap_a"
                        href="https://nungudiamonds.vercel.app/life-time-service"
                      >
                        LIFE-TIME SERVICE
                      </a>
                    </li>
                    <li>
                      <a
                        className="siteMap_a"
                        href="https://nungudiamonds.vercel.app/jewellery-care"
                      >
                        HOW TO CLEAN YOUR JEWELLERY
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div className="Lifestyle">
            <div className="Lifestyle-head">
              <h2 className="TCC-product-detail-heading">LIFESTYLE JEWELLRY</h2>
            </div>
            <div className="Lifestyle-list">
              <ul className="siteMap_ul">
                <li>
                  <a
                    className="siteMap_a"
                    href="https://nungudiamonds.vercel.app/products?filter=lifestyle&value=lifestyle-pendants-necklaces"
                  >
                    PENDANTS AND NECKLACES
                  </a>
                </li>
                <li>
                  <a
                    className="siteMap_a"
                    href="https://nungudiamonds.vercel.app/products?filter=lifestyle&value=lifestyle-bracelets-bangles"
                  >
                    BRACELETS AND BANGLES
                  </a>
                </li>
                <li>
                  <a
                    className="siteMap_a"
                    href="https://nungudiamonds.vercel.app/products?filter=lifestyle&value=lifestyle-rings-signets"
                  >
                    RINGS AND SIGNETS
                  </a>
                </li>
                <li>
                  <a
                    className="siteMap_a"
                    href="https://nungudiamonds.vercel.app/products?filter=lifestyle&value=lifestyle-earrings"
                  >
                    EARRINGS
                  </a>
                </li>
                <li>
                  <a
                    className="siteMap_a"
                    href="https://nungudiamonds.vercel.app/products?filter=lifestyle&value=lifestyle-body-chain"
                  >
                    BODY CHAIN
                  </a>
                </li>
                <li>
                  <a
                    className="siteMap_a"
                    href="https://nungudiamonds.vercel.app/products?filter=lifestyle&value=lifestyle-anklets"
                  >
                    ANKLETS
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="GENTS">
            <div className="GENTS-head">
              <h2 className="TCC-product-detail-heading">GENTS JEWELLRY</h2>
            </div>
            <div className="GENTS-list">
              <ul className="siteMap_ul">
                <li>
                  <a
                    className="siteMap_a"
                    href="https://nungudiamonds.vercel.app/products?filter=men&value=textured-rings"
                  >
                    PENDANTS AND NECKLACES
                  </a>
                </li>
                <li>
                  <a
                    className="siteMap_a"
                    href="https://nungudiamonds.vercel.app/products?filter=men&value=gents-bracelets-bangles"
                  >
                    BRACELETS AND BANGLES
                  </a>
                </li>
                <li>
                  <a
                    className="siteMap_a"
                    href="https://nungudiamonds.vercel.app/products?filter=men&value=textured-rings"
                  >
                    RINGS AND SIGNETS
                  </a>
                </li>
                <li>
                  <a
                    className="siteMap_a"
                    href="https://nungudiamonds.vercel.app/products?filter=men&value=textured-rings"
                  >
                    LAPEL PINS
                  </a>
                </li>
                <li>
                  <a
                    className="siteMap_a"
                    href="https://nungudiamonds.vercel.app/products?filter=men&value=textured-rings"
                  >
                    EARRINGS
                  </a>
                </li>
                <li>
                  <a
                    className="siteMap_a"
                    href="https://nungudiamonds.vercel.app/products?filter=men&value=textured-rings"
                  >
                    CUFFLINKS
                  </a>
                </li>
                <li>
                  <a
                    className="siteMap_a"
                    href="https://nungudiamonds.vercel.app/products?filter=men&value=textured-rings"
                  >
                    ANKLETS
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="Giftsets">
            <div className="Giftsets-head">
              <h2 className="TCC-product-detail-heading">GIFT SETS</h2>
            </div>
            <div className="Giftsets-list">
              <ul className="siteMap_ul">
                <li>
                  <a className="siteMap_a" href="">
                    Infinity Set
                  </a>
                </li>
                <li>
                  <a className="siteMap_a" href="">
                    Marquise Kiss Bracelet & Ring Set{" "}
                  </a>
                </li>
                <li>
                  <a className="siteMap_a" href="">
                    Marquise Kiss Ring & Earring Set
                  </a>
                </li>
                <li>
                  <a className="siteMap_a" href="">
                    Vintage Set
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="Giftcard">
            <div className="Giftcard-head">
              <h2 className="TCC-product-detail-heading">GIFT CARD</h2>
            </div>
            <div className="Giftcard-list">
              <ul className="siteMap_ul">
                <li>
                  <a className="siteMap_a" href="">
                    Black
                  </a>
                </li>
                <li>
                  <a className="siteMap_a" href="">
                    Platinum
                  </a>
                </li>
                <li>
                  <a className="siteMap_a" href="">
                    Gold
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="Contact">
            <div className="Giftcard-head">
              <h2 className="TCC-product-detail-heading">CUSTOMER SERVICE</h2>
            </div>
            <div className="Giftcard-list">
              <ul className="siteMap_ul">
                <li>
                  <a
                    className="siteMap_a"
                    href="https://nungudiamonds.vercel.app/contact-us"
                  >
                    Support center
                  </a>
                </li>
                <li>
                  <a
                    className="siteMap_a"
                    href="https://nungudiamonds.vercel.app/contact-us"
                  >
                    Customer Support
                  </a>
                </li>
                <li>
                  <a
                    className="siteMap_a"
                    href="https://nungudiamonds.vercel.app/nungu-love-stories"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    className="siteMap_a"
                    href="https://nungudiamonds.vercel.app/privacy"
                  >
                    Privicy Policy
                  </a>
                </li>
                <li>
                  <a
                    className="siteMap_a"
                    href="https://nungudiamonds.vercel.app/terms"
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a
                    className="siteMap_a"
                    href="https://nungudiamonds.vercel.app/faq"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="Contact">
            <div className="Giftcard-head">
              <h2 className="TCC-product-detail-heading">CUSTOMER SERVICE</h2>
            </div>
            <div className="Giftcard-list">
              <ul className="siteMap_ul">
                <li>
                  <a
                    className="siteMap_a"
                    href="https://nungudiamonds.vercel.app/our-stories"
                  >
                    Nungu Story
                  </a>
                </li>
                <li>
                  <a
                    className="siteMap_a"
                    href="https://nungudiamonds.vercel.app/nungu-love-stories"
                  >
                    Nungu Love Story
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

SiteMap.Layout = Layout;
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    API_ENDPOINTS.COMPANYINFORMATION,
    fetchsCompanyInfo
  );

  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: 60,
  };
};
