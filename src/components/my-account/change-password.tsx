import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { fadeInTop } from "@utils/motion/fade-in-top";
import {
  useChangePasswordMutation,
  ChangePasswordInputType,
} from "@framework/customer/use-change-password";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import { CompanyInfoContext } from "@contexts/company_info/company_info";

const ChangePassword: React.FC = () => {
  const { companyInfo } = useContext(CompanyInfoContext);
  const { mutate: changePassword, isLoading } = useChangePasswordMutation();
  const { t } = useTranslation();

  const formSchema = yup.object().shape({
    new_password: yup
      .string()
      .required(`${t("password-new-required")}`)
      .min(4, "Password length should be at least 4 characters")
      .max(16, "Password cannot exceed more than 16 characters"),
    confirm_password: yup
      .string()
      .required(`${t("forms:confirm-password-required")}`)
      .min(4, "Password length should be at least 4 characters")
      .max(16, "Password cannot exceed more than 16 characters")
      .oneOf(
        [yup.ref("new_password")],
        "Password and confirm password does not match"
      ),
    old_password: yup
      .string()
      .required(`${t("forms:password-old-required")}`)
      .min(4, "Password length should be at least 4 characters")
      .max(16, "Password cannot exceed more than 12 characters"),
  });

  const {
    register,
    handleSubmit,
    resetField,

    formState: { errors },
  } = useForm<ChangePasswordInputType>({
    resolver: yupResolver(formSchema),
  });
  function onSubmit({
    new_password,
    confirm_password,
    old_password,
  }: ChangePasswordInputType) {
    changePassword({ new_password, confirm_password, old_password });
    resetField("new_password");
    resetField("confirm_password");
    resetField("old_password");
  }

  return (
    <>
      <h2
        className={`text-lg md:text-xl xl:text-2xl font-bold text-[${companyInfo.web_secondary_color}] mb-6 xl:mb-8`}
      >
        {t("common:text-change-password")}
      </h2>
      <motion.div
        layout
        initial="from"
        animate="to"
        exit="from"
        //@ts-ignore
        variants={fadeInTop(0.35)}
        className={`w-full flex  h-full lg:w-8/12 flex-col`}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full mx-auto flex flex-col justify-center "
        >
          <div className="flex flex-col space-y-3">
            <PasswordInput
              labelKey="forms:label-old-password"
              errorKey={errors.old_password?.message}
              {...register("old_password")}
              className="mb-4"
            />
            <PasswordInput
              labelKey="forms:label-new-password"
              errorKey={errors.new_password?.message}
              {...register("new_password")}
              className="mb-4"
            />
            <PasswordInput
              labelKey="forms:label-confirm_password"
              errorKey={errors.confirm_password?.message}
              {...register("confirm_password")}
              className="mb-4"
            />

            <div className="relative">
              <Button
                type="submit"
                loading={isLoading}
                disabled={isLoading}
                className="h-13 mt-3"
              >
                {t("common:text-change-password")}
              </Button>
            </div>
          </div>
        </form>
      </motion.div>
    </>
  );
};

export default ChangePassword;
