import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import Input from "@components/ui/input";

import {
  useAddAddressMutation,
  CheckoutInputType,
} from "@framework/account/add-address";
import Dropdown from "@components/ui/dropdown";
import { useTranslation } from "next-i18next";
import Button from "@components/ui/button";
import MyAddressCard from "./my-address-card";
import {
  useCountryDropdown,
  useStateDropdown,
  useCityDropdown,
} from "@framework/account/get-dropdown-data";
import { useEditAddressMutation } from "@framework/account/edit-address";
import { CheckBox } from "@components/ui/checkbox";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { USER_DETAILS } from "@utils/constants";
import { CompanyInfoContext } from "@contexts/company_info/company_info";
export interface editAddressData {
  full_name?: string;
  address_type?: number;
  area_name: string;
  city_id?: string;
  country_id?: string;
  created_date: string;
  default_addres: string;
  house_building: string;
  id?: number;
  phone_number?: string;
  pincode?: string;
  state_id?: string;
}
const MyAddress: React.FC<{
  isCheckout: boolean;
  setShippingAddressId: any;
}> = ({ isCheckout, setShippingAddressId }) => {
  const userId: any = Cookies.get(USER_DETAILS);
  const [editAddressData, setEditAddressData] = useState<editAddressData>();
  const [newAddress, setNewAddress] = useState(false);
  const [addressType, setAddressType] = useState("");
  const [stateDataDropDown, setStateDataDropDown] = useState<any>([]);
  const [CountryData, setCountryData] = useState<any>([]);
  const [defaultAddress, setDefaultAddress] = useState(false);
  const [countryId, setCountryId] = useState("");
  const [stateId, setStateId] = useState("");
  const { data: addAddressData, mutate: addAddress } = useAddAddressMutation();
  const { companyInfo } = useContext(CompanyInfoContext);
  const { data: editaddressData, mutate: editAddress } =
    useEditAddressMutation();

  const { data: stateData, mutate: fetchStateDropdown } = useStateDropdown();
  const { data: cityData, mutate: fetchCityDropdown } = useCityDropdown();

  useEffect(() => {
    if (stateData && stateData != undefined) {
      const arrStateData = stateData?.data.map((item: any) => ({
        optionId: item.id,
        optionName: item.state_name,
      }));
      setStateDataDropDown(arrStateData);
      if (editAddressData) {
        setStateId(editAddressData.state_id ?? "");
      } else {
        setStateId(arrStateData && arrStateData[0]?.optionId);
      }
    }
  }, [stateData]);

  useEffect(() => {
    if (addAddressData === null || addAddressData === undefined) {
    } else {
      setNewAddress(false);
      toast.success("Address Added Successfully!");
    }
  }, [addAddressData]);

  const { data: countryData } = useCountryDropdown();

  // const StateData = stateData?.data.map((item: any) => ({
  //   optionId: item.id,
  //   optionName: item.state_name,
  // }));

  const CityData = cityData?.data.map((item: any) => ({
    optionId: item.id,
    optionName: item.city_name,
  }));

  useEffect(() => {
    if (countryData) {
      const CountryData = countryData?.data.map((item: any) => ({
        optionId: item.id,
        optionName: item.country_name,
      }));
      setCountryData(CountryData);
      setCountryId(CountryData && CountryData[0]?.optionId);
    }
  }, [countryData]);

  useEffect(() => {}, []);

  useEffect(() => {
    if (countryId != "") {
      setStateId("");
      fetchStateDropdown({
        country_id: countryId,
      });
    }
  }, [countryId]);

  useEffect(() => {
    if (stateId != "") {
      fetchCityDropdown({
        state_id: stateId,
      });
    }
  }, [stateId]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutInputType>();

  function onSubmit({
    full_name,
    country_id,
    phone_number,
    house_building,
    area_name,
    city_id,
    pincode,
    state_id,
  }: CheckoutInputType) {
    if (editAddressData === undefined) {
      addAddress({
        full_name,
        user_id: JSON.parse(userId)?.id,
        country_id,
        phone_number,
        house_building,
        area_name,
        default_addres: defaultAddress === true ? "1" : "0",
        address_type: addressType,
        city_id,
        pincode,
        state_id,
      });
    } else {
      editAddress({
        id: editAddressData?.id!,
        full_name,
        country_id: country_id! ? country_id! : editAddressData?.country_id!,
        phone_number,
        house_building,
        area_name,
        default_addres: defaultAddress === true ? "1" : "0",
        address_type: addressType
          ? addressType
          : editAddressData?.address_type!,
        city_id: city_id! ? city_id! : editAddressData?.city_id!,
        pincode,
        state_id: state_id! ? state_id! : editAddressData?.state_id!,
      });
    }
  }

  const handleChange = (event: any) => {
    setDefaultAddress(event.target.checked);
  };

  const handleEditAddressData = (data: editAddressData) => {
    setEditAddressData(data);
    setCountryId(data.country_id ?? "");
    setNewAddress(true);
  };

  const handleCancelClick = () => {
    setNewAddress(false);
    setCountryId(CountryData && CountryData[0]?.optionId);
    setEditAddressData(undefined);
  };

  const { t } = useTranslation();
  return (
    <>
      <h2
        className={`text-lg md:text-xl xl:text-2xl font-bold text-[${companyInfo.web_secondary_color}] mb-6 xl:mb-8`}
      >
        {t("common:text-my-address")}
      </h2>
      {/* Add new Address Button */}
      {newAddress === false ? (
        <div
          onClick={() => setNewAddress(true)}
          className="w-full lg:w-8/12 border border-gray-500 rounded my-3 cursor-pointer"
        >
          <div className={`p-3 text-[${companyInfo.web_secondary_color}]`}>
            + ADD A NEW ADDRESS
          </div>
        </div>
      ) : (
        <div className={`p-3 text-[${companyInfo.web_secondary_color}]`}>
          Add New Address
        </div>
      )}
      {/* Add new address form */}
      <div className="bg-gray-50">
        {newAddress && (
          <div
            className={`w-full flex  h-full lg:w-8/12 flex-col px-4 md:px-8 2xl:px-16"`}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full mx-auto flex flex-col justify-center"
            >
              <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 my-3">
                <Input
                  labelKey="forms:label-full-name"
                  {...register("full_name")}
                  variant="solid"
                  className="w-full lg:w-full"
                />
              </div>
              <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 mb-3">
                <Input
                  type="tel"
                  labelKey="forms:label-phone"
                  errorKey={errors.phone_number?.message}
                  {...register("phone_number", {
                    required: "forms:phone-required",
                  })}
                  variant="solid"
                  className="w-full lg:w-full"
                  defaultValue={
                    editAddressData && editAddressData?.phone_number
                  }
                />
              </div>
              <Input
                labelKey="forms:label-house-building"
                {...register("house_building", {
                  required: "forms:address-required",
                })}
                errorKey={errors.house_building?.message}
                variant="solid"
                defaultValue={
                  editAddressData && editAddressData?.house_building
                }
              />
              <Input
                labelKey="forms:label-area-name"
                {...register("area_name", {
                  required: "forms:address-required",
                })}
                errorKey={errors.area_name?.message}
                variant="solid"
                className="my-3"
                defaultValue={editAddressData && editAddressData?.area_name}
              />
              <div className="flex lg:flex-row lg:w-full space-y-4 lg:space-y-0 justify-between">
                <div className="w-full lg:w-[49%]">
                  <div className="w-full font-bold">Country *</div>
                  <Dropdown
                    className="mb-dropdown border border-gray-300 rounded h-12 mr-2 w-full"
                    id="Country"
                    data={CountryData}
                    value={countryId}
                    {...register("country_id")}
                    onChange={(e) => setCountryId(e.target.value)}
                    defaultValue={
                      editAddressData && editAddressData?.country_id
                    }
                  />
                </div>
                <div className="w-full lg:w-[49%]">
                  <div className="w-full font-bold">State *</div>
                  <Dropdown
                    className="mb-dropdown border border-gray-300 rounded h-12 mr-2 w-full"
                    id="State"
                    data={stateDataDropDown}
                    value={stateId}
                    {...register("state_id")}
                    onChange={(e) => setStateId(e.target.value)}
                    defaultValue={editAddressData && editAddressData?.state_id}
                  />
                </div>
              </div>

              <div className="flex lg:flex-row lg:w-full space-y-4 lg:space-y-0 justify-between my-3">
                <div className="w-full lg:w-[49%]">
                  <div className="w-full font-bold">City *</div>
                  <Dropdown
                    className="mb-dropdown border border-gray-300 rounded h-12 mr-2 w-full"
                    id="City"
                    data={CityData}
                    value={CityData && CityData[0]?.optionId}
                    {...register("city_id")}
                    defaultValue={editAddressData && editAddressData?.city_id}
                  />
                </div>
                <div className="w-full lg:w-[49%]">
                  <div className="w-full font-bold">PostCode *</div>
                  <Input
                    //   labelKey="forms:label-postcode"
                    {...register("pincode")}
                    variant="solid"
                    className="w-full lg:w-full mt-2 md:mt-0"
                    defaultValue={editAddressData && editAddressData?.pincode}
                  />
                </div>
              </div>
              <div className="my-3">
                <CheckBox
                  labelKey="forms:label-default-address"
                  onChange={handleChange}
                  // checked={
                  //   editAddressData && editAddressData?.default_addres === "1"
                  //     ? true
                  //     : false
                  // }
                />
              </div>
              <div className="flex w-1/3">
                <div className="review_article w-1/2">
                  <input
                    type="radio"
                    name="review_select_button"
                    id="feature2"
                    className="review_article_input"
                    onChange={() => setAddressType("1")}
                    checked={
                      editAddressData && editAddressData?.address_type === 1
                        ? true
                        : false
                    }
                  />
                  <div className="review_article_div">
                    <span>Home</span>
                  </div>
                </div>
                <div className="review_article w-1/2">
                  <input
                    type="radio"
                    name="review_select_button"
                    id="feature2"
                    className="review_article_input"
                    onChange={() => setAddressType("2")}
                    checked={
                      editAddressData && editAddressData?.address_type === 2
                        ? true
                        : false
                    }
                  />
                  <div className="review_article_div">
                    <span>Work</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 my-3 justify-between">
                <Button type="submit" className="w-full lg:w-[49%]">
                  {editAddressData === null || editAddressData === undefined
                    ? t("common:button-add-address")
                    : "Edit Address"}
                </Button>
                <button
                  onClick={() => handleCancelClick()}
                  className="w-full lg:w-[49%] bg-gray-300 border-black rounded"
                >
                  {t("common:button-cancel")}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <div className="my-3 ">
        <MyAddressCard
          editAddress={handleEditAddressData}
          addAddressData={addAddressData}
          isCheckout={isCheckout}
          setShippingAddressId={setShippingAddressId}
        />
      </div>
    </>
  );
};

export default MyAddress;
