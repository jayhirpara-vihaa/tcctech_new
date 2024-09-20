import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import {
  useResetPasswordMutation,
  ResetPasswordType,
} from "@framework/auth/use-reset-password";
import Logo from "@components/ui/logo";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";
import { useEffect } from "react";

const ResetPasswordForm: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { query: queryParams } = useRouter();
  const { data, mutate: resetPassword, isLoading } = useResetPasswordMutation();
  const token = queryParams?.token!;

  const handleOnSubmit = () => {
    if (data === null || data === "" || data === undefined) {
    } else if ((data && data.code === 200) || (data && data.code === "200")) {
      router.push(`${ROUTES.LOGIN}`, undefined, {
        locale: router.locale,
      });
    }
  };

  useEffect(() => {
    handleOnSubmit();
  }, [data]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordType>();

  function onSubmit({ new_password }: ResetPasswordType) {
    resetPassword({
      new_password,
      token: token.toString(),
    });
  }

  return (
    <div className="overflow-hidden bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300 py-5 px-5 sm:px-8 ">
      <div className="text-center mb-6 pt-2.5">
        <div>
          <Logo />
        </div>
        <div className="text-sm md:text-base text-body mt-2 mb-8 sm:mb-10">
          {t("common:reset-password-helper")}
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center"
        noValidate
      >
        <div className="flex flex-col space-y-3.5">
          <PasswordInput
            labelKey="forms:label-new-password"
            errorKey={errors.new_password?.message}
            {...register("new_password", {
              required: `${t("forms:password-required")}`,
            })}
          />
          <div className="relative">
            <Button
              type="submit"
              loading={isLoading}
              disabled={isLoading}
              className="h-11 md:h-12 w-full mt-1.5"
            >
              {t("common:text-reset-password")}
            </Button>
          </div>
        </div>
      </form>
      <div className="text-sm sm:text-base text-body text-center mt-5 mb-1">
        {t("common:text-have-account")}{" "}
        <button
          type="button"
          className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none"
        >
          {t("common:text-login")}
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
