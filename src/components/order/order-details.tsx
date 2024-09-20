import {
  useOrderDescriptionMutation,
  useOrderDescriptionQuery,
  useOrderQuery,
} from "@framework/order/get-order";
import usePrice from "@framework/product/use-price";
import { OrderItem } from "@framework/types";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import TrackingComponent from "../../pages/my-account/orders/tracking";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInOut } from "@utils/motion/fade-in-out";
import Link from "@components/ui/link";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { CURRENCY } from "@utils/constants";
import { CompanyInfoContext } from "@contexts/company_info/company_info";
import FallbackSpinner from "@components/spinner";
import { useConfigOrderDescriptionMutation } from "@framework/config-product-api/order-detail-api";

const OrderItemCard = ({ product }: { product: OrderItem }) => {
  const { price: itemTotal } = usePrice({
    amount: product.price * product.quantity,
    currencyCode: "USD",
  });
  return (
    <tr
      className="border-b font-normal border-gray-300 last:border-b-0"
      key={product.id}
    >
      <td className="p-4">
        {product.name} * {product.quantity}
      </td>
      <td className="p-4">{itemTotal}</td>
    </tr>
  );
};

const OrderDetails: React.FC<{ className?: string }> = ({
  className = "pt-10 lg:pt-12",
}) => {
  const { t } = useTranslation("common");
  const [payload, setPayload] = useState({});
  const imageUrl = process.env.NEXT_PUBLIC_IMG_URL;
  const { companyInfo } = useContext(CompanyInfoContext);

  const paymentMethod: any = {
    2: { title: "Cash On Delivery" },
    1: { title: "YOCO" },
  };
  const {
    query: { order_number },
  } = useRouter();

  // const {
  //   data,
  //   isLoading,
  //   mutate: fetchOrderDescription,
  // } = useOrderDescriptionMutation();

  const { data, isLoading, mutate: fetchConfigOrderDescription } = useConfigOrderDescriptionMutation();
  useEffect(() => {
    fetchConfigOrderDescription({
      order_number: order_number,
    });
  }, [order_number]);

  if (isLoading)
    return (
      <p>
        <FallbackSpinner />
      </p>
    );

  console.log(data);
  return (
    <div className={className}>
      {/* <div className="flex justify-center mb-5">
				<TrackingComponent />
			</div> */}

      <h2
        className={`text-lg md:text-xl xl:text-2xl font-bold text-[${companyInfo.web_secondary_color}] mb-6 xl:mb-8`}
      >
        {t("text-order-details")}:
      </h2>
      {data &&
        data?.data?.data?.order?.map((order: any) => {
          return (
            <motion.div
              layout
              initial="from"
              animate="to"
              exit="from"
              variants={fadeInOut(0.25)}
              className={`px-4 md:px-7 group w-full h-auto flex justify-start items-center bg-white py-4 mb-4 md:py-7 border border-gray-500 relative`}
            >
              <div className="relative flex w-24 md:w-36 h-24 md:h-36 rounded-md overflow-hidden flex-shrink-0 cursor-pointer me-4">
                <Image
                  src={`${imageUrl}${order.product.product_images[0].image_path}`}
                  width={112}
                  height={112}
                  loading="eager"
                  alt={"Product Image"}
                  className=" object-cover"
                />
              </div>
              <div className="flex flex-col w-full overflow-hidden">
                {" "}
                <Link
                  href={`/products/${order.product.slug}`}
                  className={`truncate TCC-h1-tag text-[${companyInfo.web_secondary_color}] mb-1.5 `}
                >
                  {order.product_name}
                </Link>
                {/* @ts-ignore */}
                <span className="text-sm text-gray-400 mb-2.5">
                  {order.product_size !== null &&
                    `Size: ${order.product_size} |`}{" "}
                  {order.product_length !== null &&
                    `length: ${order.product_length} |`}
                  Metal Tone : {order.Metal_tone} | karat: {order.Karat}KT
                </span>
                <div className="flex items-end justify-between">
                  {/* <Counter
						quantity={1}
						onIncrement={() => ""}
						onDecrement={() => ""}
						variant="dark"
					  /> */}
                  <span
                    className={`font-semibold text-sm md:text-base text-[${companyInfo.web_secondary_color}] leading-5`}
                  >
                    {CURRENCY}
                    {parseFloat(order.product_price).toFixed(2)}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}

      <table className={`w-full  font-semibold text-sm lg:text-base`}>
        {/* <thead>
					<tr>
						<th className="bg-gray-150 p-4 text-start first:rounded-ts-md w-1/2">
							{t("text-product")}
						</th>
						<th className="bg-gray-150 p-4 text-start last:rounded-te-md w-1/2">
							{t("text-total")}
						</th>
					</tr>
				</thead>
				<tbody>
					{order?.products.map((product, index) => (
						<OrderItemCard key={index} product={product} />
					))}
				</tbody> */}
        <tfoot>
          <tr className="odd:bg-gray-150">
            <td className="p-4 italic">{t("text-order-number")}:</td>
            <td className={`p-4 text-[${companyInfo.web_secondary_color}]`}>
              {data?.data?.data?.order_number}
            </td>
          </tr>
          <tr className="odd:bg-gray-150">
            <td className="p-4 italic">{t("text-date")}:</td>
            <td className={`p-4 text-[${companyInfo.web_secondary_color}]`}>
              {moment(data?.data?.data?.order_date).format("DD/MM/YY")}
            </td>
          </tr>
          <tr className="odd:bg-gray-150">
            <td className="p-4 italic">{t("text-sub-total")}:</td>
            <td className={`p-4 text-[${companyInfo.web_secondary_color}]`}>
              {CURRENCY}
              {data?.data?.data?.sub_total}
            </td>
          </tr>
          <tr className="odd:bg-gray-150">
            <td className="p-4 italic">{t("text-shipping")}:</td>
            <td className={`p-4 text-[${companyInfo.web_secondary_color}]`}>
              {CURRENCY}
              {data?.data?.data?.shipping_cost == null
                ? "00"
                : data?.data?.data?.shipping_cost}
              {/* <span className="text-[13px] font-normal ps-1.5 inline-block">
								via Flat rate
							</span> */}
            </td>
          </tr>
          <tr className="odd:bg-gray-150">
            <td className="p-4 italic">{t("text-payment-method")}:</td>
            <td className={`p-4 text-[${companyInfo.web_secondary_color}]`}>
              {paymentMethod[data?.data?.data?.payment_method]?.title}
            </td>
          </tr>
          <tr className="odd:bg-gray-150">
            <td className="p-4 italic">{t("text-total")}:</td>
            <td className={`p-4 text-[${companyInfo.web_secondary_color}]`}>
              {CURRENCY}
              {data?.data?.data.order_total}
            </td>
          </tr>
          <tr className="odd:bg-gray-150">
            <td className="p-4 italic">{t("text-note")}:</td>
            <td className={`p-4 text-[${companyInfo.web_secondary_color}]`}>
              {data?.data?.data?.order_note}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default OrderDetails;
