import { useContext, useEffect, useState } from "react";
import Container from "@components/ui/container";
import Layout from "@components/layout/layout-three";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import Text from "@components/ui/text";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Button from "@components/ui/button";
import CheckoutCard from "@components/checkout/checkout-card";
import useScript from "react-script-hook";
import Cookies from "js-cookie";
import { useOrderMutation } from "@framework/checkout/add-order-details";
import { CheakOutContext } from "@contexts/cheakout/order_cheakout";
import { getUserDetails } from "@store/authorization";
import { CART, CARTPRODUCTDETAIL } from "@utils/constants";
import { siteSettings } from "@settings/site-settings";
import { usePaymentMutation } from "@framework/checkout/usePaymentDetail";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useConfigOrderMutation } from "@framework/config-product-api/add-order-api";
import { usePaymentConfigMutation } from "@framework/config-product-api/add-payment-api";
import { useCartConfigProductList } from "@framework/config-product-api/cartListApi";
import { CompanyInfoContext } from "@contexts/company_info/company_info";

declare global {
  interface Window {
    YocoSDK: any;
  }
}

export default function Payment() {
  const userData: any = getUserDetails();
  const UserId = userData.id_app_user;
  const cartProductCookieData: any = Cookies.get(CARTPRODUCTDETAIL)
  // const cartProductCookieData: any = Cookies.get('CART');

  const cartProductData = JSON.parse(cartProductCookieData);
  const guestCartData = Cookies.get("GUEST_CART_ITEMS");
  const [expanded, setExpanded] = useState(false);
  const [chargeToken, setChargeToken] = useState("");
  const [cartProduct, setCartProduct] = useState<any>([]);

  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    if (cartProductData && cartProductData?.length > 0) {
      setCartProduct(cartProductData);
    }
  }, []);

  const {
    shippingAddress,
    billingAddress,
    saveInfoValue,
    shippingValue,
    orderNote,
    useSameBillingAddress,
    subTotal,
    totalTax,
  } = useContext(CheakOutContext);

  // const { data: orderDetails, mutate: addOrder } = useOrderMutation();
  const { data: cartConfigProductData, mutate: cartConfigProductList } = useCartConfigProductList();
  const { data: configOrderDetails, mutate: addConfigOrder } = useConfigOrderMutation();
  // const { data: paymentDetails, mutate: addPayment } = usePaymentMutation();
  const { data: paymentDataDetails, mutate: addPaymentConfig } = usePaymentConfigMutation();
  const { updateCartTotalItems } =
    useContext(CompanyInfoContext);

  useEffect(() => {
    if (paymentDataDetails?.code === 200 || paymentDataDetails?.code === "200") {
      updateCartTotalItems(paymentDataDetails.data.totalCartCount)
      router.push(`my-account/orders/${configOrderDetails?.data?.order_number}`);
      Cookies.remove("GUEST_CART_ITEMS");
    }
  }, [paymentDataDetails]);

  const finalPaymentAmount = (Number(subTotal.toFixed(2)) *
    100) as unknown as string;

  const totalBeforeTax = subTotal - totalTax;

  useEffect(() => {
    if (UserId !== undefined) {
      cartConfigProductList({
        user_id: UserId,
      });
    }
  }, [])

  useEffect(() => {

    if (cartProductData) {

      addConfigOrder({
        user_id: UserId,
        sub_total: totalBeforeTax && totalBeforeTax.toFixed(2),
        order_note: orderNote,
        shipping_method: Number(shippingValue),
        discount: 0,
        shipping_cost: 0,
        total_tax: totalTax && totalTax.toFixed(2),
        order_total: subTotal && subTotal.toFixed(2),
        pickup_store_id: 1,
        payment_method: 1,
        currency_id: 1,
        order_type: Number(shippingValue),
        is_add_address: Number(saveInfoValue),
        order_shipping_address: {
          id: shippingAddress.id === undefined ? 0 : shippingAddress.id,
          full_name: shippingAddress.full_name,
          phone_number: Number(shippingAddress.phone_number),
          house_builing:
            shippingValue === "2" ? shippingAddress.house_building : null,
          area_name: shippingValue === "2" ? shippingAddress.area_name : null,
          pincode: shippingValue === "2" ? Number(shippingAddress.pincode) : null,
          city_id: shippingValue === "2" ? Number(shippingAddress.city_id) : null,
          state_id:
            shippingValue === "2" ? Number(shippingAddress.state_id) : null,
          country_id:
            shippingValue === "2" ? Number(shippingAddress.country_id) : null,
        },
        order_billing_address:
          useSameBillingAddress === true
            ? {
              id: shippingAddress.id === undefined ? 0 : shippingAddress.id,
              full_name: shippingAddress.full_name,
              house_builing: shippingAddress.house_building,
              area_name: shippingAddress.area_name,
              pincode: Number(shippingAddress.pincode),
              city_id: Number(shippingAddress.city_id),
              state_id: Number(shippingAddress.state_id),
              country_id: Number(shippingAddress.country_id),
              phone_number: Number(shippingAddress.phone_number),
            }
            : {
              id: shippingAddress.id === undefined ? 0 : shippingAddress.id,
              full_name: billingAddress.full_name,
              house_builing: billingAddress.house_building,
              area_name: billingAddress.area_name,
              pincode: Number(billingAddress.pincode),
              city_id: Number(billingAddress.city_id),
              state_id: Number(billingAddress.state_id),
              country_id: Number(billingAddress.country_id),
              phone_number: Number(billingAddress.phone_number),
            },
        quantity: 1,
        product_details: cartProductData ? cartProductData.map((item: any) => {
          return {
            product_id: item.product_id,
            is_config: item.is_config,
            quantity: 1,
            sub_total: item.price.toFixed(2),
            product_tax: item.taxOnProduct.toFixed(2),
            discount_amount: 0,
            shipping_cost: 0,
            order_details_json: {
              metal_id: item.metal_id,
              karat_id: item.karat_id,
              metal_tone: item.metal_tone,
              is_band: parseInt(item.is_band),
              size_id: item.size_id,
              length_id: item.length_id,
            },
          };

        }) : [],
      });
    }

  }, []);

  useScript({
    src:
      finalPaymentAmount && siteSettings
        ? "https://js.yoco.com/sdk/v1/yoco-sdk-web.js"
        : null,
    onload: () => {
      // eslint-disable-next-line no-undef
      const yoco = new window.YocoSDK({
        publicKey: "pk_test_c7b6da1aAlJ8Wwk32be4",
      });

      const submitBtn = document.getElementById(
        "checkout-button"
      ) as HTMLButtonElement;
      var checkoutButton = document.querySelector("#checkout-button");
      checkoutButton?.addEventListener("click", function () {
        yoco.showPopup({
          amountInCents: parseInt(finalPaymentAmount),
          currency: "ZAR",
          name: `${siteSettings.name}`,
          description: "Awesome description",
          // displayMethod: "MANUAL",
          callback: function (result: any) {
            if (result.error) {
              const errorMessage = result.error.message;
              toast.error("error occured: " + errorMessage);
            } else {
              setChargeToken(result.id);
            }
          },
        });
      });
    },
  });
  useEffect(() => {
    if (chargeToken !== "" && configOrderDetails) {
      addPaymentConfig({
        order_id: configOrderDetails?.data?.id,
        order_number: configOrderDetails?.data?.order_number,
        amount: configOrderDetails?.data?.order_total,
        token: chargeToken,
      });
    }
  }, [chargeToken, configOrderDetails]);

  return (
    <>
      <div className="flex items-center justify-center mt-10 pb-0.5 mb-2 md:mb-5 lg:mb-6 2xl:mb-7 3xl:mb-8">
        <Text className="Tcc-text-our-Jewelry-Section">
          {t("text-payment")}
        </Text>
      </div>
      <Container>
        <div className="py-14 xl:py-20 px-0 2xl:max-w-screen-2xl xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-full ">
          <div className="md:w-full lg:w-3/5 flex  h-full flex-col -mt-1.5 drop-shadow-md px-4 md:px-8 2xl:px-16">
            <div className="main_card block w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <div className="flex justify-between">
                <div className="TCC-payment-method-text my-3">
                  PAYMENT METHOD
                </div>
                {expanded === true && (
                  <div
                    onClick={() => setExpanded(false)}
                    className="mx-12 mt-5"
                  >
                    Change
                  </div>
                )}
              </div>
              <span className="TCC-payment-method-discription">
                Please select a payment method.
              </span>
              <div
                className="my-5 paypal_card w-full lg:w-3/5 bg-white border border-gray-400 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              // onClick={() => setExpanded(true)}
              >
                <div className="flex">
                  <div className="w-[70%] mx-5 my-3">
                    <div className="TCC-payment-method-name my-3 ">YOCO</div>
                    <span>Pay With your Yoco account, using any card.</span>
                  </div>
                  <div className="w-[30%] place-content-around">
                    <Image
                      width={90}
                      height={50}
                      alt={t("common:text-logo")}
                      src={"/assets/YOCO-LOGO.svg"}
                    />
                  </div>
                </div>

                {/* {expanded && (
                  <div className="accodion border-t border-gray-400 px-4">
                    <div className="mt-7 TCC-payment-method-box-dis">
                      Click below to go to your Yoco account and submit your
                      payment. We’ll bring you back here to review and complete
                      your order.
                    </div>
                  </div>
                )} */}
              </div>
            </div>
          </div>
          <div className="md:w-full lg:w-2/5 md:ms-7 lg:ms-10 xl:ms-14 flex flex-col h-full -mt-1.5">
            <CheckoutCard />
            <div className="my-5">
              <Button
                id="checkout-button"
                // onClick={onSubmit}
                type="button"
                className="w-full space-x-2 px-4 py-2"
              >
                <span>PAY NOW</span>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

Payment.Layout = Layout;
// Payment.authenticate = true;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};
