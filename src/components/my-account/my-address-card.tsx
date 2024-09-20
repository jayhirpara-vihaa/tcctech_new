import React, { useContext, useEffect, useState } from "react";
import "react-dropdown/style.css";
import { motion } from "framer-motion";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useGetAddressressMutation } from "@framework/account/add-address";
import { useDeleteAddressMutation } from "@framework/account/delete-address";
import { getUserDetails } from "@store/authorization";
import { CheakOutContext } from "@contexts/cheakout/order_cheakout";

export interface AddressData {
  full_name: string;
  address_type: number;
  area_name: string;
  city_id: number;
  country_id: number;
  created_date: string;
  default_addres: string;
  house_building: string;
  id: number;
  phone_number: string;
  pincode: number;
  state_id: number;
}
const MyAddressCard: React.FC<{
  editAddress: any;
  addAddressData: any;
  isCheckout: boolean;
  setShippingAddressId: any;
}> = ({ editAddress, addAddressData, isCheckout, setShippingAddressId }) => {
  const userData: any = getUserDetails();
  // const userData: any = Cookies.get(USER_DETAILS);
  const userId = userData?.id;
  const [addresses, setAddresses] = useState<AddressData[]>();
  const [addressId, setAddressId] = useState<number>();
  const [editAddressId, setEditAddressId] = useState("");
  const [open, setOpen] = React.useState(false);
  const { updateShippingAddress } = useContext(CheakOutContext);

  const { data, mutate: getAddress } = useGetAddressressMutation();
  const { data: deleteAddressData, mutate: deleteAddress } =
    useDeleteAddressMutation();

  const handleClickOpen = (e: any) => {
    setOpen(true);
    setAddressId(e.target.id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (userId) {
      getAddress({
        user_id: userId,
      });
    }
  }, [userId, deleteAddressData, addAddressData]);

  useEffect(() => {
    setAddresses(data?.data?.data);
  }, [data]);

  useEffect(() => {
    if (deleteAddressData === null || deleteAddressData === undefined) {
    } else {
      setOpen(false);
    }
  }, [deleteAddressData]);

  const handleDeleteAddress = () => {
    deleteAddress({
      id: addressId!,
    });
  };

  const handleEditAddress = (e: any) => {
    setEditAddressId(e.target.id);
    if (e.target.id !== null) {
      const editableAddress = addresses?.filter(
        (t) => t.id === parseInt(e.target.id)
      );
      if (editableAddress) editAddress(editableAddress[0]);
    }
  };

  const handleRadioChange = (e: AddressData) => {
    setShippingAddressId(e);
    updateShippingAddress(e);
  };

  return (
    <motion.div
      layout
      initial="from"
      animate="to"
      exit="from"
      //@ts-ignore
      className={`w-full flex lg:w-8/12 flex-col`}
    >
      {addresses?.map((item: any) => {
        return (
          <div
            key={item.id}
            className="flex justify-between border border-gray-500 rounded p-4  my-2"
          >
            <div>
              {isCheckout ? (
                <div>
                  <input
                    type="radio"
                    name="address_select_button"
                    value={"1"}
                    onChange={(e: any) => {
                      handleRadioChange(item);
                    }}
                    className="checkout-metal cursor-pointer flex justify-center items-center"
                  />{" "}
                </div>
              ) : (
                <></>
              )}
              <div>
                <span className="font-bold">Name : </span>
                <span>{item?.full_name}</span>
              </div>
              <div>
                <span className="font-bold">House/Building : </span>
                <span>{item.house_building}</span>
              </div>
              <div>
                <span className="font-bold">Area : </span>
                <span>{item.area_name}</span>
              </div>{" "}
              <div>
                <span className="font-bold">Pincode : </span>
                <span>{item.pincode}</span>
              </div>
              <div>
                <span className="font-bold">Phone: </span>
                <span>{item.phone_number}</span>
              </div>
            </div>
            <div className="">
              {isCheckout === false ? (
                <div onClick={(e: any) => handleClickOpen(e)}>
                  <button className="cursor-pointer">
                    <span
                      id={item.id}
                      className="text-sm font-semibold transition-all duration-100 ease-in-out cursor-pointer lg:font-normal lg:block xl:text-base text-red-500"
                    >
                      {/* <DeleteIcon /> */}
                      Delete
                    </span>
                  </button>
                </div>
              ) : (
                <></>
              )}

              <div onClick={(e: any) => handleEditAddress(e)}>
                <button className="cursor-pointer">
                  <span
                    id={item.id}
                    className="text-sm font-semibold transition-all duration-100 ease-in-out cursor-pointer lg:font-normal lg:block xl:text-base text-black"
                  >
                    {/* <EditIcon /> */}
                    Edit
                  </span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
      {/* Delete Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Delete Address ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            are you sure, you want to delete this address ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" autoFocus onClick={handleClose}>
            cancel
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleDeleteAddress}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};

export default MyAddressCard;
