import React, { useState, useEffect } from "react";
import CartIcon from "@components/icons/tcc-cart-icon";
import { useCart } from "@contexts/cart/cart.context";
import { useUI } from "@contexts/ui.context";
import { siteSettings } from "@settings/site-settings";

export default function CartButton() {
  const { openCart } = useUI();
  const { totalItems }: any = useCart();
  function handleCartOpen() {
    return openCart();
  }

  return (
    <button
      className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none transform"
      onClick={handleCartOpen}
      aria-label="cart-button"
    >
      {totalItems === "0" ? (
        <>
          <CartIcon color="black" className="" />
          <span className="cart-counter-badge flex items-center justify-center bg-heading text-white absolute -top-2.5 xl:-top-3 -right-3 -end-2.5 xl:-end-3 rounded-full font-bold">
            {totalItems}
          </span>
        </>
      ) : (
        <>
          <CartIcon color="black" className="" />
        </>
      )}
    </button>
  );
}
