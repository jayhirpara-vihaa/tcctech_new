import { useForm } from "react-hook-form";
import { ROUTES } from "@utils/routes";
import Image from "next/image";
import "react-dropdown/style.css";
import { motion } from "framer-motion";
import { IoIosCloseCircle } from "react-icons/io";
import { fadeInOut } from "@utils/motion/fade-in-out";
import Link from "@components/ui/link";
import { useTranslation } from "next-i18next";
import { useCartList } from "@framework/cart/useCartList";
import { useDeleteFromCart } from "@framework/cart/deleteFromCart";
import { useContext, useEffect, useState } from "react";
import { getUserDetails } from "@store/authorization";
import { CompanyInfoContext } from "@contexts/company_info/company_info";
import Cookies from "js-cookie";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CART_TOTAL, CURRENCY } from "@utils/constants";
import { CheakOutContext } from "@contexts/cheakout/order_cheakout";
import { useGuestCartList } from "@framework/cart/useGuestCartList";
import { useCartConfigProductList } from "@framework/config-product-api/cartListApi";
import Item from "antd/es/list/Item";
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

const CartProductList: React.FC = () => {
  //const userData = getUserDetails();
  const userID = getUserDetails()?.id_app_user;
  //const { t } = useTranslation();
  const { data: cartListData, mutate: cartList } = useCartList();
  const { data: cartConfigProductData, mutate: cartConfigProductList } = useCartConfigProductList();
  const { data: guestCartListData, mutate: guestCartList } = useGuestCartList();
  const guestCartData = Cookies.get("GUEST_CART_ITEMS");

  const { data: deleteData, mutate: deleteFromCart } = useDeleteFromCart();
  const [cartData, setCartData] = useState<any>([]);
  const { updateCartTotalItems, companyInfo } = useContext(CompanyInfoContext);
  const { updateTotalWithoutTax } = useContext(CheakOutContext);
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");

  const { taxListItems } = useContext(CompanyInfoContext);
  const datas: any = Cookies.get("CART")

  const imageUrl = process.env.NEXT_PUBLIC_IMG_URL;
  const {
    formState: { errors },
  } = useForm<CheckoutInputType>();

  // useEffect(() => {
  //   if (datas !== 'undefined') {
  //     console.log("::::cartProductDetail::::", JSON.parse(datas));
  //   }
  // }, [datas])

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
    updateCartTotalItems(deleteData?.data === null ? 0 : deleteData?.data);
  }, [deleteData]);

  useEffect(() => {
    if (cartConfigProductData?.data?.length > 0) {
      setCartData(cartConfigProductData?.data);
    } else {
      setCartData(guestCartListData?.data);
    }

    if (cartConfigProductData?.data.length > 0) {
      updateCartTotalItems(
        cartConfigProductData?.data.length > "0" ? `${cartListData?.data.length}` : ""
      );
    } else {
      updateCartTotalItems(
        guestCartListData?.data.length > "0"
          ? `${guestCartListData?.data.length}`
          : ""
      );
    }
  }, [cartConfigProductData, guestCartListData]);


  useEffect(() => {

    const cartProductDetail: any = cartData?.map((item: any) => {
      let productTaxAmount: any;
      let productTax: any;
      let allTax = [];
      for (const taxData of taxListItems) {
        productTax = taxData.rate / 100;
        productTaxAmount = item?.product_price * productTax;
        allTax.push(parseFloat(productTaxAmount));
      }

      const sumTotal = allTax.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);

      return {
        id: item.id,
        is_config: item.is_config,
        price: item?.product_price,
        size_id: item.product_size,
        metal_id: item.metal_id,
        karat_id: item.karat_id,
        metal_tone: item.metal_tone_id,
        length_id: item.product_length,
        taxOnProduct: sumTotal,
      };
    });

    const cartDetail: any = cartData?.map((item: any) => {
      let productTaxAmount: any;
      let productTax: any;
      let allTax = [];
      for (const taxData of taxListItems) {
        productTax = taxData.rate / 100;
        productTaxAmount = item.product_price * productTax;
        allTax.push(parseFloat(productTaxAmount));
      }
      const sumTotal = allTax.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);

      return {
        id: item.id,
        product_id: item.product_id,
        is_config: item.is_config,
        is_band: item.is_band,
        price: item.product_price,
        size_id: item.product_size,
        karat_id: item.karat_id,
        metal_id: item.metal_id,
        metal_tone: item.metal_tone_id,
        length_id: item.product_length,
        taxOnProduct: sumTotal,

      };
    });
    Cookies.set("CARTPRODUCTDETAIL", JSON.stringify(cartDetail));
    Cookies.set("CART", JSON.stringify(cartDetail));

  }, [cartData, deleteData]);

  const handleDeleteProduct = () => {
    deleteFromCart({
      user_id: userID,
      product_id: productId,
    });
  };

  useEffect(() => {
    if (deleteData === null || deleteData === undefined) {
      updateCartTotalItems("");
    } else {
      setOpen(false);
    }
  }, [deleteData]);

  const handleClickOpen = (id: any) => {
    setOpen(true);
    setProductId(id);
  };

  const handleClose = () => {
    setOpen(false);
    setProductId("");
  };

  const allPrice = cartData && cartData.map((i: any) => i.product_price);

  let subTotal = 0;

  for (let i = 0; i < allPrice?.length; i++) {
    subTotal += allPrice[i];
  }

  useEffect(() => {
    Cookies.set(CART_TOTAL, JSON.stringify(subTotal));
    updateTotalWithoutTax(subTotal);
  }, [subTotal]);

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
              className={`px-4 md:px-7 group w-full h-auto flex justify-start items-center bg-white py-4 mb-4 md:py-7 border border-gray-500 relative`}
            >
              <div className="relative flex w-24 md:w-36 h-24 md:h-36 rounded-md overflow-hidden flex-shrink-0 cursor-pointer me-4">
                <Image
                  src={`${imageUrl}${item.product_image}`}
                  width={112}
                  height={112}
                  loading="eager"
                  alt={"Product Image"}
                  className=" object-cover"
                />
                <div
                  id={item?.id}
                  className="absolute top-0 start-0 h-full w-full bg-black bg-opacity-30 md:bg-opacity-0 flex justify-center items-center transition duration-200 ease-in-out md:group-hover:bg-opacity-30"
                  onClick={(e: any) => handleClickOpen(item.id)}
                  role="button"
                >
                  <IoIosCloseCircle
                    id={item?.id}
                    className="relative white text-2xl transform md:scale-0 md:opacity-0 transition duration-300 ease-in-out md:group-hover:scale-100 md:group-hover:opacity-100"
                  />
                </div>
              </div>

              <div className="flex flex-col w-full overflow-hidden">
                <Link
                  href={`${ROUTES.PRODUCT}/${item.slug}`}
                  className={`cartListText truncate font-semibold TCC-h1-tag text-black-100 mb-1.5`}
                >
                  {item?.name}
                </Link>
                {/* @ts-ignore */}
                <span className="text-sm text-gray-400 mb-2.5">
                  <b> Ring Size :</b> {item.size} <br />
                  <b> metalTone :</b> {item.product_metal} <br />{" "}
                  <b> karat : </b>
                  {item.product_karat}
                </span>

                <div className="flex items-end justify-between">
                  {/* <Counter
                    quantity={1}
                    onIncrement={() => ""}
                    onDecrement={() => ""}
                    variant="dark"
                  /> */}
                  <span
                    className={`TCC-product-text-diamond-price font-semibold text-md md:text-base text-[${companyInfo.web_secondary_color}] leading-5`}
                  >
                    {CURRENCY}
                    {parseFloat(item.product_price).toFixed(2)}
                  </span>
                </div>
              </div>
              {/* Delete Dialog */}

              <Dialog
                open={open}
                onClose={handleClose}
              // aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">
                  {"Remove Item From Cart ? "}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    {`Are you sure, you want to remove "${item?.name}" from cart ?`}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button variant="outlined" autoFocus onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleDeleteProduct}
                    autoFocus
                  >
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </motion.div>
          );
        })}
    </>
  );
};

export default CartProductList;
