import React, { useState, useEffect } from "react";
import { useVeifyOTPMutation } from "@framework/auth/verify-otp";
import { useResendOTPMutation } from "@framework/auth/resend-otp";
import Logo from "@components/ui/logo";
import Button from "@components/ui/button";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import OtpInput from "react-otp-input";
import useSessionStorage from "@utils/use-local-storage";
import Cookies from "js-cookie";
import { USER_DETAILS } from "@utils/constants";
import { useConfigVeifyOTPMutation } from "@framework/auth/login-config-otp-verify";
import { toast } from "react-toastify";

const ConfigOTPLoginForm: React.FC = () => {
  const { t } = useTranslation();
  const [otp, setOTP] = useState("");
  const router = useRouter();
  const { data, mutate: configVerifyOTP } = useConfigVeifyOTPMutation();
  const userName = sessionStorage.getItem('config_user_verification_email') as string

  const handleVerifyOtpClick = () => {

    configVerifyOTP({
      otp: otp,
      user_name: userName,
    });
  };


  const handleOnSubmit = () => {
    if ((data && data.code === 200) || (data && data.code === "200")) {
      sessionStorage.setItem("config_user_email", userName);
      router.push(`/create-3d-local`);
    }
  };

  const handleResendOtpClick = () => {
    router.push(`/config-login`)
  }

  useEffect(() => {
    handleOnSubmit();
  }, [data]);

  const handleOTPchnage = (otp: any) => {
    setOTP(otp);
  };

  return (
    <div className="overflow-hidden bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300 py-5 px-5 sm:px-8 ">
      <div className="text-center mb-6 pt-2.5">
        {/* <div>
          <Logo />
        </div> */}
        <div className="text-sm md:text-base text-body mt-2 mb-8 sm:mb-10">
          {t("common:verify-otp-helper")}
        </div>
      </div>

      <div className="flex justify-center">
        <OtpInput
          value={otp}
          onChange={handleOTPchnage}
          numInputs={6}
          separator={<span>-</span>}
          shouldAutoFocus={true}
          containerStyle="h-32"
        />
      </div>
      <div className="text-center items-center justify-center">
        <div className="mx-auto">
          <button
            type="button"
            className="text-end text-sm text-heading ps-3 underline hover:no-underline focus:outline-none"
            onClick={handleResendOtpClick}
          >
            {t("common:text-login")}
          </button>
        </div>
      </div>
      <div className="relative">
        <Button
          type="submit"
          // loading={isLoading}
          // disabled={isLoading}
          className="h-11 md:h-12 w-full mt-1.5"
          onClick={handleVerifyOtpClick}
        >
          Verify Account
        </Button>
      </div>
    </div>
  );
};

export default ConfigOTPLoginForm;