import { motion } from "framer-motion";
import { fadeInTop } from "@utils/motion/fade-in-top";
import Link from "@components/ui/link";
import { useWindowSize } from "@utils/use-window-size";
import { useTranslation } from "next-i18next";
import { useSsrCompatible } from "@utils/use-ssr-compatible";
import { useOrderDataMutation } from "@framework/order/get-all-orders";
import { useContext, useEffect } from "react";
import moment from "moment";
import { getUserDetails } from "@store/authorization";
import { CompanyInfoContext } from "@contexts/company_info/company_info";
import { CURRENCY } from "@utils/constants";
import Button from "@components/ui/button";

const OrdersTable: React.FC = () => {
  const { width } = useSsrCompatible(useWindowSize(), { width: 0, height: 0 });
  const { t } = useTranslation("common");
  const { companyInfo } = useContext(CompanyInfoContext);
  const {
    data,
    mutate: fetchOrderData,
    isLoading,
    error,
  } = useOrderDataMutation();

  const userData = getUserDetails();
  const userID = userData?.id_app_user;

  const orderStatus: any = {
    1: { title: "Pendding", color: "primary" },
    2: { title: "Confirmed", color: "success" },
    3: { title: "Processing", color: "warning" },
    4: { title: "OutOfDeliver", color: "info" },
    5: { title: "Delivered", color: "success" },
    6: { title: "Returned", color: "warning" },
    7: { title: "Failed", color: "error" },
    8: { title: "Canceled", color: "error" },
  };

  useEffect(() => {
    fetchOrderData({
      user_id: userID,
      start_date: undefined,
      end_date: undefined,
      order_status: 0,
      current_page: 1,
    });
  }, []);

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <h2
        className={`text-lg md:text-xl xl:text-2xl font-bold text-[${companyInfo.web_secondary_color}] mb-6 xl:mb-8`}
      >
        {t("text-orders")}
      </h2>
      <motion.div
        layout
        initial="from"
        animate="to"
        exit="from"
        //@ts-ignore
        variants={fadeInTop(0.35)}
        className={`w-full flex flex-col`}
      >
        {width >= 1025 ? (
          <table>
            <thead className="text-sm lg:text-base">
              <tr>
                <th
                  className={`bg-gray-100 p-4 text-[${companyInfo.web_secondary_color}] font-semibold text-start first:rounded-ts-md`}
                >
                  {t("text-order")}
                </th>
                <th
                  className={`bg-gray-100 p-4 text-[${companyInfo.web_secondary_color}] font-semibold text-start lg:text-center`}
                >
                  {t("text-date")}
                </th>
                <th
                  className={`bg-gray-100 p-4 text-[${companyInfo.web_secondary_color}] font-semibold text-start lg:text-center`}
                >
                  {t("text-status")}
                </th>
                <th
                  className={`bg-gray-100 p-4 text-[${companyInfo.web_secondary_color}] font-semibold text-start lg:text-center`}
                >
                  {t("text-total")}
                </th>
                <th
                  className={`bg-gray-100 p-4 text-[${companyInfo.web_secondary_color}] font-semibold text-start lg:text-end last:rounded-te-md`}
                >
                  {t("text-actions")}
                </th>
              </tr>
            </thead>
            <tbody className="text-sm lg:text-base">
              {data?.data?.result?.map((order: any) => {
                return (
                  <tr className="border-b border-gray-300 last:border-b-0">
                    <td className="px-4 py-5 text-start">
                      <Link
                        href={`/my-account/orders/${order.order_number}`}
                        className={`underline hover:no-underline  text-[${companyInfo.web_secondary_color}]`}
                      >
                        {order.order_number}
                      </Link>
                    </td>
                    <td className="text-start lg:text-center px-4 py-5 ">
                      {moment(order.order_date).format("DD/MM/YY")}
                    </td>
                    <td className="text-start lg:text-center px-4 py-5 ">
                      {orderStatus[order.order_status]?.title}
                    </td>
                    <td className="text-start lg:text-center px-4 py-5 ">
                      {CURRENCY}
                      {order.order_total}
                    </td>
                    <td className="text-end px-4 py-5 text-heading">
                      <Link
                        href={`/my-account/orders/${order.order_number}`}
                        className={`text-sm leading-4  text-white px-4 py-2.5 inline-block rounded-md hover:text-white `}
                      >
                        <Button> {t("button-view")}</Button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="w-full space-y-4">
            {data?.data?.result?.map((order: any) => {
              return (
                <ul className="text-sm font-semibold text-heading border border-gray-300 rounded-md flex flex-col px-4 pt-5 pb-6 space-y-5">
                  <li className="flex items-center justify-between">
                    {t("text-order")}
                    <span className="font-normal">
                      <Link
                        href={`/my-account/orders/${order.order_number}`}
                        className="underline hover:no-underline text-body"
                      >
                        {order.order_number}
                      </Link>
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    {t("text-date")}
                    <span className="font-normal">
                      {moment(order.order_date).format("DD/MM/YY")}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    {t("text-status")}
                    <span className="font-normal">
                      {orderStatus[order.order_status]?.title}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    {t("text-total")}
                    <span className="font-normal">{`R ${order.order_total}`}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    {t("text-actions")}
                    <span className="font-normal">
                      <Link
                        href={`/my-account/orders/${order.order_number}`}
                        className={`text-sm leading-4 bg-[${companyInfo.web_secondary_color}] text-white px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600`}
                      >
                        {t("button-view")}
                      </Link>
                    </span>
                  </li>
                </ul>
              );
            })}
          </div>
        )}
      </motion.div>
    </>
  );
};

export default OrdersTable;
