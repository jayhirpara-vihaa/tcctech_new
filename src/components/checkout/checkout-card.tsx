import CheckoutItem from "@components/checkout/checkout-card-item";
import { CheckoutCardFooterItem } from "./checkout-card-footer-item";
import { useTranslation } from "next-i18next";
import { useCartList } from "@framework/cart/useCartList";
import { getUserDetails } from "@store/authorization";
import { useContext, useEffect, useState } from "react";
import { CheakOutContext } from "@contexts/cheakout/order_cheakout";
import { CompanyInfoContext } from "@contexts/company_info/company_info";
import Cookies from "js-cookie";
import { CART_TOTAL, CURRENCY } from "@utils/constants";
import { useGuestCartList } from "@framework/cart/useGuestCartList";
import { useCartConfigProductList } from "@framework/config-product-api/cartListApi";

const CheckoutCard: React.FC = () => {
  const userData = getUserDetails();
  const userID = userData?.id_app_user;
  // const { data: cartListData, mutate: cartList } = useCartList();
  const { data: cartConfigProductData, mutate: cartConfigProductList } = useCartConfigProductList();
  const { data: guestCartListData, mutate: guestCartList } = useGuestCartList();
  const guestCartData = Cookies.get("GUEST_CART_ITEMS");

  const [cartData, setCartData] = useState<any[]>([]);
  const { updateSubTotalItems, updateTotalTaxItems, totalWithoutTax } =
    useContext(CheakOutContext);
  const { companyInfo } = useContext(CompanyInfoContext);
  const { taxListItems } = useContext(CompanyInfoContext);


  const cartTotal = totalWithoutTax;
  const subTotal = cartTotal;
  const taxOnTotalAmount = (subTotal * 15) / 100;
  // const estimetedTotal = taxOnTotalAmount + subTotal;

  let productTaxAmount: any;
  let productTax: any;
  let allTax = [];
  let taxRateData = [];
  for (const taxData of taxListItems) {
    productTax = taxData.rate / 100;
    productTaxAmount = parseFloat(subTotal.toFixed(2)) * productTax;

    taxRateData.push({
      id: taxData.id,
      rate: taxData.rate,
      name: taxData.name,
      price: `${CURRENCY}${parseFloat(productTaxAmount)}`,
    });
    allTax.push(parseFloat(productTaxAmount));
  }

  const sumTotal = allTax.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  const estimetedTotal = sumTotal + parseFloat(subTotal.toFixed(2));

  useEffect(() => {
    if (userID !== undefined) {
      cartConfigProductList({
        user_id: userID,
      });
    } else {
      guestCartList({
        product_list: JSON.parse(guestCartData!),
      });
    }
  }, []);

  useEffect(() => {
    if (cartConfigProductData?.data?.length) {
      setCartData(cartConfigProductData?.data);
    } else {
      setCartData(guestCartListData?.data);
    }
  }, [cartConfigProductData, guestCartListData]);

  const { t } = useTranslation("common");

  const checkoutFooter = [
    {
      id: 0,
      rate: null,
      name: "Sub Total",
      price: `${CURRENCY}${subTotal.toFixed(2)}`,
    },
    {
      id: 1,
      rate: null,
      name: t("text-cart-discount"),
      price: `NONE`,
    },
  ];

  const allTaxIncludArray = [
    ...checkoutFooter,
    ...taxRateData,
    {
      id: 3,
      rate: null,
      name: t("text-estimated-total"),
      price: `${CURRENCY}${estimetedTotal.toFixed(2)}`,
    },
  ];

  useEffect(() => {
    updateSubTotalItems(estimetedTotal);
    updateTotalTaxItems(sumTotal);
  }, [estimetedTotal]);
  return (
    <div className="pt-12 md:pt-0 2xl:ps-4 lg:border lg:border-gray-400 p-3 px-4 md:px-8 2xl:px-16 py-14">
      <h2
        className={`text-lg md:text-xl xl:text-2xl font-bold text-[${companyInfo.web_primary_color}] mb-6 xl:mb-8 TCC-order-summary-text mt-3`}
      >
        {t("text-order-summary")}
      </h2>
      <div
        className={`flex p-4 rounded-md mt-6 md:mt-7 xl:mt-9 bg-gray-150 text-sm font-semibold text-[${companyInfo.web_primary_color}]`}
      >
        <span>{t("text-product")}</span>
        <span
          className={`ms-auto flex-shrink-0 text-[${companyInfo.web_secondary_color}]`}
        >
          {t("text-sub-total")}
        </span>
      </div>
      <CheckoutItem cartData={cartData} />
      {allTaxIncludArray.map((item: any) => (
        <CheckoutCardFooterItem item={item} />
      ))}
    </div>
  );
};

export default CheckoutCard;
