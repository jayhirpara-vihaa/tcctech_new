import { useForm } from "react-hook-form";
import { useCheckoutMutation } from "@framework/checkout/use-checkout";
import Router from "next/router";
import { ROUTES } from "@utils/routes";
import Image from "next/image";
import "react-dropdown/style.css";
import { motion } from "framer-motion";
import { fadeInOut } from "@utils/motion/fade-in-out";
import Link from "@components/ui/link";
import { useContext } from "react";
import { CompanyInfoContext } from "@contexts/company_info/company_info";
import { CURRENCY } from "@utils/constants";
interface CheckoutInputType {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  save: boolean;
  note: string;
}

const CheckoutItem: React.FC<{ cartData: any }> = ({ cartData }) => {
  const { mutate: updateUser } = useCheckoutMutation();
  const { companyInfo } = useContext(CompanyInfoContext);

  const imageUrl = process.env.NEXT_PUBLIC_IMG_URL;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutInputType>();
  function onSubmit(input: CheckoutInputType) {
    updateUser(input);
    Router.push(ROUTES.ORDER);
  }
  // useCartList;
  return (
    <>
      {cartData &&
        cartData.map((item: any) => {
          return (
            <motion.div
              key={item.id}
              layout
              initial="from"
              animate="to"
              exit="from"
              variants={fadeInOut(0.25)}
              className={`px-4 md:px-7 group w-full h-auto flex justify-start items-center bg-white py-4 mb-4 md:py-7 border-b border-gray-500 relative`}
            >
              <div className="relative flex w-16 h-16 rounded-md overflow-hidden flex-shrink-0 cursor-pointer me-4">
                <Image
                  src={`${imageUrl}${item.product_image}`}
                  width={64}
                  height={64}
                  loading="eager"
                  alt={"Product Image"}
                  className=" object-cover"
                />
              </div>

              <div className="flex flex-col w-full overflow-hidden">
                <Link
                  href={`${ROUTES.PRODUCT}/slug?id=${item.id}`}
                  className={`truncate text-[${companyInfo.web_secondary_color}] mb-1.5 `}
                >
                  {item.product_title}
                </Link>
                <div className="flex items-end justify-between">
                  <span></span>
                  <span
                    className={`font-semibold text-sm md:text-base text-[${companyInfo.web_secondary_color}] leading-5`}
                  >
                    {CURRENCY}
                    {parseFloat(item.product_price).toFixed(2)}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
    </>
  );
};

export default CheckoutItem;
