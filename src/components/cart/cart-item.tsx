import Link from "@components/ui/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInOut } from "@utils/motion/fade-in-out";
import { IoIosCloseCircle } from "react-icons/io";

import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { CURRENCY } from "@utils/constants";

const CartItem: React.FC<any> = ({ configProductData, webColor }) => {
  const { t } = useTranslation("common");

  const imageUrl = process.env.NEXT_PUBLIC_IMG_URL;

  return (
    <>
      {configProductData.length > 0 &&
        configProductData.map((item: any) => {
          return (
            <motion.div
              key={item.id}
              layout
              initial="from"
              animate="to"
              exit="from"
              variants={fadeInOut(0.25)}
              className={`group w-full h-auto flex justify-start items-center bg-white py-4 md:py-7 border-b border-gray-100 relative last:border-b-0`}
              title={item?.name}
            >
              <div className="relative flex w-24 md:w-28 h-24 md:h-28 rounded-md overflow-hidden bg-gray-200 flex-shrink-0 cursor-pointer me-4">
                <Image
                  src={`${imageUrl}${item?.product_image}`}
                  width={112}
                  height={112}
                  loading="eager"
                  alt={(item.nam && item.name) || "Product Image"}
                  className="object-cover"
                />
                {/* <div
                  id={item?.id}
                  className="absolute top-0 start-0 h-full w-full bg-black bg-opacity-30 md:bg-opacity-0 flex justify-center items-center transition duration-200 ease-in-out md:group-hover:bg-opacity-30"
                  // onClick={(e: any) => handleDeleteProduct(e)}
                  role="button"
                >
                  <IoIosCloseCircle
                    id={item?.id}
                    className="relative text-white text-2xl transform md:scale-0 md:opacity-0 transition duration-300 ease-in-out md:group-hover:scale-100 md:group-hover:opacity-100"
                  />
                </div> */}
              </div>

              <div className="flex flex-col w-full overflow-hidden">
                <Link
                  href={`${ROUTES.PRODUCT}`}
                  className="truncate text-sm text-black-100 TCC-h1-tag mb-1.5 -mt-1"
                >
                  {item?.name}
                </Link>
                {/* @ts-ignore */}
                <span className="text-sm text-gray-400 mb-2.5">
                  {t("text-unit-price")} : {CURRENCY}
                  {item.product_price !== null &&
                    (item.product_price).toFixed(2)}{" "}
                  | Ring Size : {item?.size} | <br />
                  metalTone : {item.Metal_tone} | karat:
                  {item.product_karat}
                </span>

                <div className="flex items-end justify-between">
                  {/* <Counter
              quantity={item.quantity}
              onIncrement={() => addItemToCart(item, 1)}
              onDecrement={() => removeItemFromCart(item.id)}
              variant="dark"
            /> */}
                  <span className="font-semibold text-sm md:text-base text-heading leading-5 TCC-product-text-diamond-price font-semibold">
                    {CURRENCY}
                    {item.product_price !== null &&
                      (item.product_price).toFixed(2)}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
    </>
  );
};

export default CartItem;
