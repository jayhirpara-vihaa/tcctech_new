import React, { useState, useEffect, useContext } from "react";
import CartIcon from "@components/icons/tcc-cart-icon";
import { useCart } from "@contexts/cart/cart.context";
import { useUI } from "@contexts/ui.context";
import { siteSettings } from "@settings/site-settings";
import { CompanyInfoContext } from "@contexts/company_info/company_info";

export default function CartButton({ cartCount }: any) {
  const { openCart } = useUI();
  function handleCartOpen() {
    return openCart();
  }
  //   const [totalItems, setTotalItems] = useState("");
  const { cartTotalItems, updateCartTotalItems, companyInfo } =
    useContext(CompanyInfoContext);

  useEffect(() => {
    updateCartTotalItems(`${cartCount}`);
  }, [cartCount]);

  return (
    <button
      className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none transform"
      onClick={handleCartOpen}
      aria-label="cart-button"
    >
      {cartTotalItems > "0" ? (
        <>
          <CartIcon color={companyInfo.web_primary_color} />
          <span
            style={{ backgroundColor: `${companyInfo.web_secondary_color}` }}
            className={`cart-counter-badge flex items-center justify-center text-white absolute -top-2.5 xl:-top-3 -right-3 -end-2.5 xl:-end-3 rounded-full font-bold`}
          >
            {cartTotalItems}
          </span>
        </>
      ) : (
        <>
          <CartIcon color={companyInfo?.web_primary_color} />
        </>
      )}
    </button>
  );
}
