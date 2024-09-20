import Scrollbar from "@components/common/scrollbar";
import { useUI } from "@contexts/ui.context";
import { IoClose } from "react-icons/io5";
import CartItem from "./cart-item";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import cn from "classnames";
import { useTranslation } from "next-i18next";
import { useContext, useEffect, useState } from "react";
import { getUserDetails } from "@store/authorization";
import { useCartList } from "@framework/cart/useCartList";
import Cookies from "js-cookie";
import { CART_TOTAL, CURRENCY } from "@utils/constants";
import { CompanyInfoContext } from "@contexts/company_info/company_info";
import { useGuestCartList } from "@framework/cart/useGuestCartList";
import { useCartConfigProductList } from "@framework/config-product-api/cartListApi";

export default function Cart() {
  const { t } = useTranslation("common");
  const { displayCart, closeCart } = useUI();
  const userID = getUserDetails()?.id_app_user;
  const [cartData, setCartData] = useState<any[]>([]);
  const { companyInfo } = useContext(CompanyInfoContext);
  // const { data: cartListData, mutate: cartList } = useCartList();
  // const { data: guestCartListData, mutate: guestCartList } = useGuestCartList();
  const { data: cartConfigProductData, mutate: cartConfigProductList } = useCartConfigProductList();
  const [configProductData, setConfigProductData] = useState<any[]>([]);
  const guestCartData = Cookies.get("GUEST_CART_ITEMS");

  useEffect(() => {
    if (userID !== undefined) {
      cartConfigProductList({
        user_id: userID,
      });
    }
    // else {
    //   guestCartList({
    //     product_list: JSON.parse(guestCartData!),
    //   });
    // }
  }, [displayCart]);

  useEffect(() => {
    if (cartConfigProductData?.data?.length > 0) {
      setConfigProductData(cartConfigProductData?.data);
    }
  }, [cartConfigProductData]);

  // useEffect(() => {
  //   if (cartListData?.data?.length > 0) {
  //     setCartData(cartListData?.data);
  //   } else {
  //     setCartData(guestCartListData?.data);
  //   }
  // }, [cartListData, guestCartListData]);

  const allPrice = configProductData && configProductData.map((i) => i.product_price);

  let subTotal = 0;

  for (let i = 0; i < allPrice?.length; i++) {
    subTotal += allPrice[i];
  }

  Cookies.set(CART_TOTAL, JSON.stringify(subTotal));

  return (
    <div className="flex flex-col w-full h-full justify-between">
      <div className="w-full flex justify-between items-center relative ps-5 md:ps-7 py-0.5 border-b border-gray-100">
        <h2
          className={`font-bold text-xl md:text-2xl m-0 text-[${companyInfo.web_secondary_color}]`}
        >
          {/* @ts-ignore */}
          {t("text-shopping-cart")}
        </h2>
        <button
          className="flex text-2xl items-center justify-center text-gray-500 px-4 md:px-6 py-6 lg:py-8 focus:outline-none transition-opacity hover:opacity-60"
          onClick={closeCart}
          aria-label="close"
        >
          <IoClose className="text-black mt-1 md:mt-0.5" />
        </button>
      </div>

      <Scrollbar className="cart-scrollbar w-full flex-grow">
        <div className="w-full px-5 md:px-7">
          {configProductData && (
            <CartItem
              configProductData={configProductData}
              webColor={companyInfo.web_secondary_color}
            />
          )}
        </div>
      </Scrollbar>

      <div
        className="flex flex-col px-5 md:px-7 pt-2 pb-5 md:pb-7"
        onClick={closeCart}
      >
        <div style={{ backgroundColor: companyInfo.web_secondary_color }}>
          <Link
            // href={isEmpty === false ? ROUTES.CHECKOUT : "/"}
            href={ROUTES.CARTPAGE}
            className={cn(
              "w-full px-5 py-3 md:py-4 flex items-center justify-center  text-sm sm:text-base text-white focus:outline-none transition duration-300 "
              // {
              //   "cursor-not-allowed bg-gray-400 hover:bg-gray-400": isEmpty,
              // }
            )}
          >
            <span className="w-full pe-5 -mt-0.5 py-0.5">
              {/* @ts-ignore */}
              {t("text-proceed-to-checkout")}
            </span>
            <span className="ms-auto flex-shrink-0 -mt-0.5 py-0.5">
              <span className="border-s border-white pe-5 py-0.5" />
              {CURRENCY}
              {subTotal.toFixed(2)}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

// {!isEmpty ? (
// 	<Scrollbar className="cart-scrollbar w-full flex-grow">
// 	  <div className="w-full px-5 md:px-7">
// 		{items?.map((item) => (
// 		  <CartItem item={item} key={item.id} />
// 		))}
// 	  </div>
// 	</Scrollbar>
//   ) : (
// 	<motion.div
// 	  layout
// 	  initial="from"
// 	  animate="to"
// 	  exit="from"
// 	  variants={fadeInOut(0.25)}
// 	  className="px-5 md:px-7 pt-8 pb-5 flex justify-center flex-col items-center"
// 	>
// 	  <EmptyCart />
// 	  <h3 className="text-lg text-heading font-bold pt-8">
// 		{/* @ts-ignore */}
// 		{t("text-empty-cart")}
// 	  </h3>
// 	</motion.div>
//   )}
