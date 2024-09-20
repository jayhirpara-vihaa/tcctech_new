import React, { createContext, useState } from "react";
import { FilterQueryType } from "@framework/types";
import { AddressData } from "@components/my-account/my-address-card";

export const CheakOutContext = createContext({
  shippingAddress: {} as AddressData,
  billingAddress: {} as AddressData,
  shippingValue: "2",
  saveInfoValue: "0",
  orderNote: "",
  useSameBillingAddress: false,
  selectShowRoom: "south africa",
  subTotal: 0,
  totalTax: 0,
  totalWithoutTax: 0,
  updateShippingAddress: (value: AddressData) => {},
  updateBillingAddress: (value: AddressData) => {},
  updateShippingValue: (value: string) => {},
  updateSaveInfoValue: (value: string) => {},
  updateOrderNote: (value: string) => {},
  updateUseSameBillingAddress: (value: boolean) => {},
  updateSelectShowRoom: (value: string) => {},
  updateSubTotalItems: (value: number) => {},
  updateTotalTaxItems: (value: number) => {},
  updateTotalWithoutTax: (value: number) => {},
});

function CheakOutContextProvider({ children }: any) {
  const [shippingAddress, setShippingAddress] = useState({} as AddressData);
  const [billingAddress, setBillingAddress] = useState({} as AddressData);
  const [shippingValue, setShippingValue] = useState("2");
  const [saveInfoValue, setSaveInfoValue] = useState("0");
  const [orderNote, setOrderNote] = useState("");
  const [useSameBillingAddress, setUseSameBillingAddress] = useState(false);
  const [selectShowRoom, setSelectShowRoom] = useState("");
  const [subTotal, setSubTotal] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [totalWithoutTax, setTotalWithoutTax] = useState(0);

  const updateShippingAddress = (value: AddressData) => {
    setShippingAddress(value);
  };

  const updateBillingAddress = (value: AddressData) => {
    setBillingAddress(value);
  };
  const updateShippingValue = (value: string) => {
    setShippingValue(value);
  };
  const updateSaveInfoValue = (value: string) => {
    setSaveInfoValue(value);
  };
  const updateOrderNote = (value: string) => {
    setOrderNote(value);
  };
  const updateUseSameBillingAddress = (value: boolean) => {
    setUseSameBillingAddress(value);
  };
  const updateSelectShowRoom = (value: string) => {
    setSelectShowRoom(value);
  };
  const updateSubTotalItems = (value: number) => {
    setSubTotal(value);
  };
  const updateTotalTaxItems = (value: number) => {
    setTotalTax(value);
  };

  const updateTotalWithoutTax = (value: number) => {
    setTotalWithoutTax(value);
  };

  return (
    <CheakOutContext.Provider
      value={{
        shippingAddress,
        billingAddress,
        shippingValue,
        saveInfoValue,
        orderNote,
        useSameBillingAddress,
        selectShowRoom,
        subTotal,
        totalTax,
        totalWithoutTax,
        updateShippingAddress,
        updateBillingAddress,
        updateShippingValue,
        updateSaveInfoValue,
        updateOrderNote,
        updateUseSameBillingAddress,
        updateSelectShowRoom,
        updateSubTotalItems,
        updateTotalWithoutTax,
        updateTotalTaxItems,
      }}
    >
      {children}
    </CheakOutContext.Provider>
  );
}

export default CheakOutContextProvider;
