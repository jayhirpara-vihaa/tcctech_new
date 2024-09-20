import { useCart } from "@contexts/cart/cart.context";
import CheckoutItem from "@components/checkout/checkout-card-item";
import { CartCardFooterItem } from "../cart-page/cart-checkout-footer";
import { useTranslation } from "next-i18next";
import Button from "@components/ui/button";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import { CART_TOTAL, CURRENCY } from "@utils/constants";
import Cookies from "js-cookie";
import { useContext } from "react";
import { CheakOutContext } from "@contexts/cheakout/order_cheakout";
import { CompanyInfoContext } from "@contexts/company_info/company_info";

const CheckoutCard: React.FC = () => {
  const { items, isEmpty } = useCart();
  const { t } = useTranslation("common");
  const { totalWithoutTax } = useContext(CheakOutContext);

  const { taxListItems } = useContext(CompanyInfoContext);

  const cartTotal = totalWithoutTax;
  const subTotal = cartTotal;
  const taxOnTotalAmount = (subTotal * 15) / 100;

  let productTaxAmount: any
  let productTax: any
  let allTax = []
  let taxRateData = []
  for (const taxData of taxListItems) {
    productTax = taxData.rate / 100
    productTaxAmount = totalWithoutTax * productTax
    taxRateData.push({ id: taxData.id, rate: taxData.rate, name: taxData.name, price: `${CURRENCY}${parseFloat(productTaxAmount.toFixed(2))}` })
    allTax.push(parseFloat(productTaxAmount.toFixed(2)))
  }

  const sumTotal = allTax.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  const estimetedTotal = sumTotal + subTotal;

  const checkoutFooter = [
    {
      id: 0,
      rate: null,
      name: "Sub Total",
      price: `${CURRENCY}${subTotal.toFixed(2)}`
    },
    // {
    //   id: 1,
    //   name: t("text-shipping-cost"),
    //   price: "TBD",
    // },
    {
      id: 1,
      rate: null,
      name: t("text-cart-discount"),
      price: `NONE`,
    },
    // {
    //   id: 2,
    //   rate: null,
    //   name: t("text-tax"),
    //   price: `${CURRENCY}${taxOnTotalAmount.toFixed(2)}`
    // },

  ];



  const allTaxIncludArray = [...checkoutFooter, ...taxRateData, {
    id: 3,
    rate: null,
    name: t("text-estimated-total"),
    price: `${CURRENCY}${estimetedTotal.toFixed(2)}`
  }]


  return (
    <div className="pt-12 md:pt-0 2xl:ps-4 border border-gray-500 p-5">
      {/* <div className="mt-1 flex shadow-sm">
                <div className="relative flex flex-grow items-stretch focus-within:z-10">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="block w-full border rounded-none border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Promo Code"
                    />
                </div>
                <Button
                    type="button"
                    className="relative -ml-px inline-flex items-center space-x-2 border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                    <span>SUBMIT</span>
                </Button>
            </div> */}
      {!isEmpty &&
        items.map((item) => <CheckoutItem item={item} key={item.id} />)}
      {allTaxIncludArray.map((item: any) => (
        <CartCardFooterItem item={item} key={item.id} />
      ))}
      <Link href={ROUTES.CHECKOUT}>
        <div className="flex justify-center mt-3">
          <Button
            type="button"
            className="relative text-white -ml-px items-center space-x-2 border px-4 py-2 text-sm font-medium w-[30%] h-[3rem] hover:w-[31%] hover:h-[3.2rem]"
          // disabled={subTotal === 0}
          >
            <span className="text-white">CHECKOUT</span>
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default CheckoutCard;
