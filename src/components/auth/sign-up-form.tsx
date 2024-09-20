import React, { useState, useContext } from "react";
import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import Logo from "@components/ui/logo";
import { useRouter } from "next/router";
import { useUI } from "@contexts/ui.context";
import { useSignUpMutation, SignUpInputType } from "@framework/auth/use-signup";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import "react-phone-input-2/lib/semantic-ui.css";
import Dropdown from "@components/ui/dropdown";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CompanyInfoContext } from "@contexts/company_info/company_info";
import { useCountryDropdown } from "@framework/account/get-dropdown-data";

const SignUpForm: React.FC = () => {
  // Other Constants
  const { t } = useTranslation();
  const { closeModal } = useUI();
  const router = useRouter();
  const { companyInfo } = useContext(CompanyInfoContext);
  // API Hooks
  const { data, mutate: signUp } = useSignUpMutation();
  const [CountryData, setCountryData] = useState([]);

  const handleOnSubmit = () => {
    if (data === null || data === "" || data === undefined) {
    } else if ((data && data.code === 200) || (data && data.code === "200")) {
      sessionStorage.setItem("userID", JSON.stringify(data.data.id_app_user));
      router.push(`${ROUTES.OTP_VERIFICATION}`, undefined, {
        locale: router.locale,
      });
    }
  };

  useEffect(() => {
    handleOnSubmit();
  }, [data]);

  const getCharacterValidationError = (str: string) => {
    return `Your password must have at least 1 ${str} character`;
  };

  const formSchema = yup.object().shape({
    password: yup
      .string()
      .required("Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters")
      .matches(/[0-9]/, getCharacterValidationError("digit"))
      .matches(/[a-z]/, getCharacterValidationError("lowercase"))
      .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
      .matches(
        /[\/\[\]^$|*+()\\~@#%&_+={}£<>-]+/g,
        getCharacterValidationError("special character")
      ),

    confirm_password: yup
      .string()
      .required("Confirm Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters")
      .oneOf(
        [yup.ref("password")],
        "Password and confirm password does not match"
      ),

    full_name: yup.string().required(`${t("forms:name-required")}`),
    username: yup
      .string()
      .required(`${t("forms:email-required")}`)
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        `${t("forms:email-error")}`
      ),
    mobile: yup
      .string()
      .required(`${t("forms:phone-required")}`)
      .min(10, `${t("forms:phone-length-error")}`)
      .max(10, `${t("forms:phone-max-length-error")}`),
  });

  const { data: countryData } = useCountryDropdown();

  useEffect(() => {
    if (countryData) {
      const CountryData = countryData?.data.map((item: any) => ({
        optionId: item.id,
        optionName: item.country_code,
      }));
      setCountryData(CountryData);
    }
  }, [countryData]);

  const phoneCode = CountryData;

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm<SignUpInputType>({
    resolver: yupResolver(formSchema),
  });
  function onSubmit({
    full_name,
    username,
    mobile,
    password,
    confirm_password,
    country_id,
  }: SignUpInputType) {
    signUp({
      full_name,
      username,
      mobile,
      password,
      confirm_password,
      country_id,
    });
  }

  return (
    <div className="py-5 px-5 sm:px-8 bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300">
      <div className="text-center mb-6 pt-2.5">
        <div onClick={closeModal}>
          <Logo />
        </div>
        <p className="text-sm md:text-base text-body mt-2 mb-8 sm:mb-10">
          {t("common:registration-helper")}{" "}
          <Link
            href={ROUTES.TERMS}
            className="text-heading underline hover:no-underline focus:outline-none"
          >
            {t("common:text-terms")}
          </Link>{" "}
          &amp;{" "}
          <Link
            href={ROUTES.POLICY}
            className="text-heading underline hover:no-underline focus:outline-none"
          >
            {t("common:text-policy")}
          </Link>
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center"
        noValidate
      >
        <div className="flex flex-col space-y-4">
          <Input
            labelKey="forms:label-fullname"
            type="text"
            variant="solid"
            {...register("full_name")}
            errorKey={errors.full_name?.message}
          />
          <Input
            labelKey="forms:label-email"
            type="email"
            variant="solid"
            {...register("username")}
            errorKey={errors.username?.message}
          />
          <div className="block">
            <label
              htmlFor="phonenumber"
              className="block text-sm font-semibold text-gray-600 leading-none mb-3 cursor-pointer"
            >
              {t("forms:label-mobile")}
            </label>
            {/* Phone Number Input */}
            <div className="flex">
              <div>
                <Dropdown
                  className="mb-dropdown border border-gray-300 rounded h-12 mr-2"
                  id="country_id"
                  data={phoneCode}
                  {...register("country_id")}
                />
              </div>
              <Input
                className="w-full"
                type="tel"
                id="mobile"
                variant="solid"
                {...register("mobile", {
                  required: `${t("forms:phone-required")}`,
                  minLength: {
                    value: 10,
                    message: t("phone-length-error"),
                  },
                })}
                errorKey={errors.mobile?.message}
              />
            </div>
          </div>

          <PasswordInput
            id="password"
            labelKey="forms:label-password"
            errorKey={errors.password?.message}
            {...register("password")}
          />

          <PasswordInput
            id="confirm_password"
            labelKey="forms:label-confirm_password"
            errorKey={errors.confirm_password?.message}
            {...register("confirm_password")}
          />

          <div className="relative">
            <Button
              type="submit"
              // loading={isLoading}
              // disabled={isLoading}
              className="h-11 md:h-12 w-full mt-1.5"
              onClick={handleOnSubmit}
            >
              {t("common:text-register")}
            </Button>
          </div>
        </div>
      </form>
      <div
        className={`flex flex-col items-center justify-center relative text-sm text-[${companyInfo.web_secondary_color}] mt-6 mb-3.5`}
      >
        <hr className="w-full border-gray-300" />
        <span className="absolute -top-2.5 px-2 bg-white ">
          {t("common:text-or")}
        </span>
      </div>

      <Link href={ROUTES.LOGIN}>
        <div className="text-sm sm:text-base text-body text-center mt-5 mb-1">
          {t("common:text-have-account")}{" "}
          <button
            type="button"
            className={`text-sm sm:text-base text-[${companyInfo.web_secondary_color}] underline font-bold hover:no-underline focus:outline-none`}
          >
            {t("common:text-login")}
          </button>
        </div>
      </Link>
    </div>
  );
};

export default SignUpForm;
