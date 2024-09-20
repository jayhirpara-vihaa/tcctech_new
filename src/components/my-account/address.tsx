import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import Input from "@components/ui/input";
import { useTranslation } from "next-i18next";
import { CheckoutInputType } from "@framework/account/add-address";
import Dropdown from "@components/ui/dropdown";
import Button from "@components/ui/button";
import {
  useCountryDropdown,
  useStateDropdown,
  useCityDropdown,
} from "@framework/account/get-dropdown-data";
import { CheckBox } from "@components/ui/checkbox";
import { editAddressData } from "./my-address";
import { CheakOutContext } from "@contexts/cheakout/order_cheakout";

export const Address: React.FC<{
  hideDefaultAddress: boolean;
  handleSelectedAddress: any;
  formType: any;
}> = ({ hideDefaultAddress, handleSelectedAddress, formType }) => {
  const { t } = useTranslation();
  const { shippingValue, selectShowRoom } = useContext(CheakOutContext);
  const [countryId, setCountryId] = useState("");
  const [editAddressData, setEditAddressData] = useState<editAddressData>();
  const [stateId, setStateId] = useState("");
  const [stateDataDropDown, setStateDataDropDown] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState(false);
  const { data: stateData, mutate: fetchStateDropdown } = useStateDropdown();
  const { data: cityData, mutate: fetchCityDropdown } = useCityDropdown();
  const { data: countryData } = useCountryDropdown();

  useEffect(() => {
    if (countryId != "") {
      fetchStateDropdown({
        country_id: countryId,
      });
    }
  }, [countryId]);

  useEffect(() => {
    if (stateData && stateData != undefined) {
      const arrStateData = stateData?.data.map((item: any) => ({
        optionId: item.id,
        optionName: item.state_name,
      }));
      setStateDataDropDown(arrStateData);
      if (editAddressData) {
        setStateId(editAddressData.state_id ?? "");
      }
    }
  }, [stateData]);

  useEffect(() => {
    if (stateId != "") {
      fetchCityDropdown({
        state_id: stateId,
      });
    }
  }, [stateId]);

  const CountryData = countryData?.data.map((item: any) => ({
    optionId: item.id,
    optionName: item.country_name,
  }));

  const CityData = cityData?.data.map((item: any) => ({
    optionId: item.id,
    optionName: item.city_name,
  }));

  const handleChange = (event: any) => {
    setDefaultAddress(event.target.checked);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutInputType>();

  const handleSaveData = (e: any) => {
    handleSelectedAddress({
      full_name: e.full_name,
      country_id: e.country_id,
      phone_number: e.phone_number,
      house_building: e.area_name,
      area_name: e.area_name,
      city_id: e.city_id,
      pincode: e.pincode,
      state_id: e.state_id,
    });
  };
  return (
    <div>
      <div className="bg-gray-50">
        <div
          className={`w-full flex  h-full lg:w-8/12 flex-col px-4 2xl:px-16"`}
        >
          <form className="w-full mx-auto flex flex-col">
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
              />
            </div>
            {formType === "billing" && (
              <div>
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
                      {...register("state_id")}
                      onChange={(e) => setStateId(e.target.value)}
                      defaultValue={
                        editAddressData && editAddressData?.state_id
                      }
                    />
                  </div>
                </div>

                <div className="flex lg:flex-row lg:w-full space-y-4 lg:space-y-0 justify-between my-3">
                  <div className="w-full lg:w-[49%]">
                    <div className="w-full font-bold">City *</div>
                    <Dropdown
                      className="mb-dropdown border border-gray-300 rounded h-12 mr-2 w-full"
                      id="Gauteng"
                      data={CityData}
                      {...register("city_id")}
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
              </div>
            )}
            <div>
              <Button onClick={handleSubmit(handleSaveData)}>
                {t("common:button-save-address")}
              </Button>
            </div>

            {hideDefaultAddress === false && (
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
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
