import React, { useEffect, useContext } from "react";
import WishIcon from "@components/icons/wish-icon";
import { CompanyInfoContext } from "@contexts/company_info/company_info";

export default function WishButton({ wishCount }: any) {
  const { wishTotalItems, updateWishTotalItems, companyInfo } =
    useContext(CompanyInfoContext);

  useEffect(() => {
    updateWishTotalItems(`${wishCount}`);
  }, [wishCount]);

  return (
    <>
      {wishTotalItems > "0" ? (
        <>
          <WishIcon
            height="22"
            width="22"
            color={companyInfo && companyInfo?.web_primary_color}
          />
          <span
            style={{
              backgroundColor: `${
                companyInfo && companyInfo.web_secondary_color
              }`,
            }}
            className="cart-counter-badge flex items-center justify-center bg-heading text-white absolute -top-2.5 xl:-top-3 -right-3 -end-2.5 xl:-end-3 rounded-full font-bold"
          >
            {wishTotalItems}
            {/* {wishCount} */}
          </span>
        </>
      ) : (
        <>
          <WishIcon color={companyInfo && companyInfo.web_primary_color} />
        </>
      )}
    </>
  );
  // </button>
}
