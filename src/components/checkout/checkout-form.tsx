import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TextArea from "@components/ui/text-area";
import { useCheckoutMutation } from "@framework/checkout/use-checkout";
import { CheckBox } from "@components/ui/checkbox";
import Router from "next/router";
import { useTranslation } from "next-i18next";
import { ROUTES } from "@utils/routes";
import Button from "@components/ui/button";
import Dropdown from "react-dropdown";
import MyAddress from "@components/my-account/my-address";
import { AddressData } from "@components/my-account/my-address-card";
import { OrderInputType } from "@framework/checkout/add-order-details";
import { Address } from "@components/my-account/address";
import { CheakOutContext } from "@contexts/cheakout/order_cheakout";
import { CompanyInfoContext } from "@contexts/company_info/company_info";

const CheckoutForm: React.FC = () => {
  const { t } = useTranslation();
  // const [shippingValue, setShippingValue] = useState("2");
  const options = ["south africa"];
  const [shippingAddress, setShippingAddress] = useState<AddressData>(
    {} as AddressData
  );
  const { isLoading } = useCheckoutMutation();
  const { companyInfo } = useContext(CompanyInfoContext);
  const {
    shippingValue,
    billingAddress,
    useSameBillingAddress,
    updateShippingAddress,
    updateBillingAddress,
    updateShippingValue,
    updateSaveInfoValue,
    updateOrderNote,
    updateUseSameBillingAddress,
    updateSelectShowRoom,
  } = useContext(CheakOutContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderInputType>();

  function onSubmit({ full_name }: any) {
    Router.push(ROUTES.ORDER);
  }

  useEffect(() => {
    updateShippingAddress(shippingAddress);
  }, [shippingAddress]);

  const handleChange = (event: any) => {
    updateUseSameBillingAddress(event.target.checked);
  };

  const handleRadioChange = (e: any) => {
    updateShippingValue(e.target.value);
  };

  const handleSelectShowroom = (e: any) => {
    updateSelectShowRoom(e.value);
  };

  const onSaveInfoChange = (e: any) => {
    updateSaveInfoValue(e.target.checked === true ? "1" : "0");
  };

  const handleShippingAddress = (item: any) => {
    updateShippingAddress(item);
  };

  const handleBillingAddress = (item: any) => {
    updateBillingAddress(item);
  };

  const handelChekOutRedirect = () => {
    Router.push("/payment");
  };

  return (
    <>
      <div className="px-4 md:px-8 2xl:px-16 py-14">
        {shippingValue === "2" && (
          <h2
            className={`text-lg md:text-xl xl:text-2xl font-bold text-[${companyInfo.web_secondary_color}] mb-6 xl:mb-8`}
          >
            {t("text-shipping-address")}
          </h2>
        )}
        <div className="flex border-b border-gray-300 my-3">
          <div className="mr-7">
            <input
              type="radio"
              name="shipping_method_button"
              value={"2"}
              className="checkout-metal cursor-pointer"
              defaultChecked
              onChange={handleRadioChange}
            />{" "}
            <span className="align-text-bottom">
              {t("forms:label-ship-to-my-address")}
            </span>
          </div>
          <div>
            <input
              type="radio"
              name="shipping_method_button"
              value={"1"}
              className="checkout-metal cursor-pointer"
              onChange={handleRadioChange}
            />{" "}
            <span className="align-text-bottom">
              {t("forms:label-pick-up-at-showroom")}
            </span>
          </div>
        </div>
        {shippingValue === "1" && (
          <div className="mb-5 w-2/4">
            <span className="TCC-product-text-diamond-shape ">
              Select Showroom
            </span>
            <Dropdown
              onChange={(e) => handleSelectShowroom(e)}
              className="w-2/4 mt-3"
              options={options}
              value={""}
            />
          </div>
        )}
        {shippingValue === "2" && (
          <MyAddress
            isCheckout={true}
            setShippingAddressId={setShippingAddress}
          />
        )}
        <div className="flex flex-col space-y-4 lg:space-y-5">
          {shippingValue === "1" && (
            <div>
              <Address
                hideDefaultAddress={true}
                handleSelectedAddress={handleShippingAddress}
                formType={"shipping"}
              />
            </div>
          )}

          {shippingValue === "2" && (
            <div className="relative flex items-center ">
              <CheckBox
                onChange={handleChange}
                labelKey="forms:label-use-billing-address"
              />
            </div>
          )}
          {/* Billing Address */}
          {useSameBillingAddress === false && (
            <>
              <h2
                className={`text-lg md:text-xl xl:text-2xl font-bold text-[${companyInfo.web_secondary_color}] mb-6 xl:mb-8`}
              >
                {t("text-billing-address")}
              </h2>
              <div>
                <Address
                  hideDefaultAddress={true}
                  handleSelectedAddress={handleBillingAddress}
                  formType={"billing"}
                />
              </div>
            </>
          )}

          <div className="relative flex items-center ">
            {
              <CheckBox
                value={"1"}
                id="infoSave"
                defaultValue={"0"}
                onChange={onSaveInfoChange}
                labelKey="forms:label-save-information"
              />
            }
          </div>
          <TextArea
            labelKey="forms:label-order-notes"
            {...register("note", {
              onChange: (e) => updateOrderNote(e.target.value),
            })}
            placeholderKey="forms:placeholder-order-notes"
            className="relative pt-3 xl:pt-6"
          />
          <div className="flex w-full">
            {/* <Link
              href={{
                pathname: ROUTES.PAYMENT,
              }}
            > */}
            <Button
              className="w-full sm:w-auto"
              loading={isLoading}
              disabled={
                Object.keys(shippingAddress).length === 0 &&
                Object.keys(billingAddress).length === 0
              }
              onClick={handelChekOutRedirect}
            >
              {t("common:button-place-order")}
            </Button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;
