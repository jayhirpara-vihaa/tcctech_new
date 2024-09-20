import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { useLoginMutation, LoginInputType } from "@framework/auth/use-login";
import Logo from "@components/ui/logo";
import { useTranslation } from "next-i18next";
import Link from "@components/ui/link";
import { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";
import { useContext, useEffect } from "react";
import { CompanyInfoContext } from "@contexts/company_info/company_info";

const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { data, mutate: login, isLoading } = useLoginMutation();
  const { companyInfo } = useContext(CompanyInfoContext);
  const handleOnSubmit = () => {
    if (data === null || data === "" || data === undefined) {
    } else if (data) {
      if ((data && data.code === 200) || (data && data.code === "200")) {
        router.push(`${ROUTES.HOME}`, undefined, {
          locale: router.locale,
        });
        // router.back();
      } else {
      }
    }
  };

  useEffect(() => {
    handleOnSubmit();
  }, [data]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputType>();

  function onSubmit({ username, password }: LoginInputType) {
    login({
      username,
      password,
    });
  }

  return (
    <div className="overflow-hidden bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300 py-5 px-5 sm:px-8 ">
      <div className="text-center mb-6 pt-2.5">
        <div>
          <Logo />
        </div>
        <div className="text-sm md:text-base text-body mt-2 mb-8 sm:mb-10">
          {t("common:login-helper")}
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center"
        noValidate
      >
        <div className="flex flex-col space-y-3.5">
          <Input
            labelKey="forms:label-email"
            type="email"
            variant="solid"
            {...register("username", {
              required: `${t("forms:email-required")}`,
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: t("forms:email-error"),
              },
            })}
            errorKey={errors.username?.message}
          />
          <PasswordInput
            labelKey="forms:label-password"
            errorKey={errors.password?.message}
            {...register("password", {
              required: `${t("forms:password-required")}`,
            })}
          />
          <div className="flex items-center justify-center">
            <Link href={ROUTES.FORGET_PASSWORD}>
              <div className="flex ms-auto">
                <button
                  type="button"
                  className={`text-end text-sm text-[${companyInfo.web_secondary_color}] ps-3 underline hover:no-underline focus:outline-none`}
                >
                  {t("common:text-forgot-password")}
                </button>
              </div>
            </Link>
          </div>
          <div className="relative items-center">
            <Button
              type="submit"
              loading={isLoading}
              disabled={isLoading}
              className="h-11 md:h-12 w-full hover:w-[101%] hover:h-12  mt-1.5"
            >
              {t("common:text-login")}
            </Button>
          </div>
        </div>
      </form>
      {/* <div className="flex justify-center mt-5">
        <div className="border border-gray-300 p-2 cursor-pointer hover:drop-shadow-md">
          <span>Continue as Guest</span>
        </div>
      </div> */}
      <Link href={ROUTES.POLICY}>
        <div className="text-sm sm:text-base text-body text-center mt-5 mb-1">
          <button
            type="button"
            className={`text-sm sm:text-base text-[${companyInfo.web_secondary_color}] underline font-bold hover:no-underline focus:outline-none`}
            // onClick={handleSignUp}
          >
            {t("common:text-page-privacy-policy")}
          </button>
        </div>
      </Link>
      <Link href={ROUTES.SIGN_UP}>
        <div className="text-sm sm:text-base text-body text-center mt-5 mb-1">
          {t("common:text-no-account")}{" "}
          <button
            type="button"
            className={`text-sm sm:text-base text-[${companyInfo.web_secondary_color}] underline font-bold hover:no-underline focus:outline-none`}
            // onClick={handleSignUp}
          >
            {t("common:text-register")}
          </button>
        </div>
      </Link>
    </div>
  );
};

export default LoginForm;
