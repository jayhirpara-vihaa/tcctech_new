import { ROUTES } from "@utils/routes";
import Image from "next/image";
import "react-dropdown/style.css";
import { motion } from "framer-motion";
import { fadeInOut } from "@utils/motion/fade-in-out";
import Link from "@components/ui/link";
import { MdOutlineFavorite } from "react-icons/md";
import { useDeleteWishListMutation } from "@framework/product/wishlist/delete-wishlist-product";
import { useContext, useEffect, useState } from "react";
import { getUserDetails } from "@store/authorization";
import { useListWishListMutation } from "@framework/product/wishlist/list-wishlist-product";
import NunguButton from "@components/ui/button";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import EmptyCart from "@components/cart/empty-cart";
import { useRouter } from "next/router";
import { CompanyInfoContext } from "@contexts/company_info/company_info";

const WishList: React.FC = () => {
  const {
    data: ListData,
    mutate: listWishList,
    isLoading: listDataLoading,
  } = useListWishListMutation();
  const userData = getUserDetails();
  const userID = userData?.id_app_user;
  const wishProduct = ListData?.data;
  const route = useRouter();
  const wishCount = wishProduct?.length;
  const imageUrl = process.env.NEXT_PUBLIC_IMG_URL;
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState<number>();
  const { updateWishTotalItems } = useContext(CompanyInfoContext);

  const { data: deleteDataResponse, mutate: deteleWishList } =
    useDeleteWishListMutation();

  const handleDeleteButtonClick = (e: any) => {
    setOpen(true);
    setProductId(e.target.id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (deleteDataResponse === null || deleteDataResponse === undefined) {
    } else {
      setOpen(false);
    }
  }, [deleteDataResponse]);

  useEffect(() => {
    updateWishTotalItems(
      wishProduct?.length > "0" ? `${wishProduct?.length}` : ""
    );
  }, [ListData, deleteDataResponse]);

  const handleDeleteWishListProduct = () => {
    deteleWishList({
      user_id: Number(userID),
      product_id: Number(productId),
    });
  };

  useEffect(() => {
    listWishList({ user_id: Number(userID) });
  }, [deleteDataResponse]);

  useEffect(() => {
    listWishList({ user_id: Number(userID) });
  }, []);

  return !listDataLoading && wishProduct?.length > "0" ? (
    <>
      <div>
        {wishProduct &&
          wishProduct.length > 0 &&
          wishProduct?.map((item: any) => {
            return (
              <motion.div
                key={item?.id}
                layout
                initial="from"
                animate="to"
                exit="from"
                variants={fadeInOut(0.25)}
                className={`px-4 md:px-7 px-4 md:px-7 group w-full h-auto flex justify-start items-center bg-white py-4 mb-4 md:py-7 border border-gray-500 relative`}
              >
                <div className="relative flex w-24 md:w-28 h-24 md:h-28 rounded-md overflow-hidden bg-gray-200 flex-shrink-0  me-4">
                  <Image
                    src={`${imageUrl}${item?.product_images[0]?.image_path}`}
                    width={112}
                    height={112}
                    loading="eager"
                    alt={"Product Image"}
                    className="object-cover"
                  />
                  {/* <div
                className="absolute top-0 start-0 h-full w-full bg-black bg-opacity-30 md:bg-opacity-0 flex justify-center items-center transition duration-200 ease-in-out md:group-hover:bg-opacity-30"
                role="button"
              >
                <IoIosCloseCircle className="relative text-white text-2xl transform md:scale-0 md:opacity-0 transition duration-300 ease-in-out md:group-hover:scale-100 md:group-hover:opacity-100" />
              </div> */}
                </div>

                <div className="flex flex-col w-full overflow-hidden">
                  <Link
                    href={`${ROUTES.PRODUCT}/${item.slug}`}
                    className="truncate text-sm text-heading mb-1.5 -mt-1"
                  >
                    {item?.name}
                  </Link>
                  {/* <span className="text-sm text-gray-400 mb-2.5">
                {t("text-unit-price")} : $1200
                </span> */}
                  <span className="text-sm text-gray-400 mb-2.5">
                    {item?.sort_description}
                  </span>

                  <div className="flex items-end justify-between">
                    {/* <span className="font-semibold text-sm md:text-base text-heading leading-5">
                 $1200
                 </span> */}
                  </div>
                </div>
                <div>
                  <button
                    id={item?.id}
                    className="cursor-pointer"
                    onClick={(e: any) => {
                      handleDeleteButtonClick(e);
                    }}
                  >
                    <MdOutlineFavorite
                      id={item?.id}
                      size={25}
                      color="red"
                      style={{ pointerEvents: "none" }}
                    />
                  </button>
                </div>

                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="responsive-dialog-title"
                >
                  <DialogTitle id="responsive-dialog-title">
                    {"Remove Product From Wishlist ?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Are you sure, you want to remove this product from
                      Wishlist ?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button variant="outlined" autoFocus onClick={handleClose}>
                      No
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={handleDeleteWishListProduct}
                      autoFocus
                    >
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
              </motion.div>
            );
          })}
      </div>
    </>
  ) : (
    <>
      <motion.div
        layout
        initial="from"
        animate="to"
        exit="from"
        variants={fadeInOut(0.25)}
        className="px-5 md:px-7 pt-8 pb-5 flex justify-center flex-col items-center"
      >
        {/* <EmptyCart /> */}
        {/* <Image  height={150} src="/assets/images/wishlist-empty.png" /> */}
        <img src="/assets/images/wishlist-empty.png" className="h-48" />
        <h3 className="text-lg text-heading font-bold pt-8">
          {/* @ts-ignore */}
          Your Wishlist is Empty!
        </h3>
        <div className="mt-4">
          <NunguButton onClick={() => route.push("/products")} variant="flat">
            Continue Shopping
          </NunguButton>
        </div>
      </motion.div>
    </>
  );
};

export default WishList;
