import { useContext, useEffect } from "react";
import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { fadeInTop } from "@utils/motion/fade-in-top";
import {
  useUpdateUserMutation,
  UpdateUserType,
} from "@framework/customer/use-update-customer";
import { useTranslation } from "next-i18next";
import Dropdown from "@components/ui/dropdown";
import { getToken } from "@framework/utils/get-token";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { getUserDetails } from "@store/authorization";
import { USER_DETAILS } from "@utils/constants";
import { CompanyInfoContext } from "@contexts/company_info/company_info";

const defaultValues = {};
const AccountDetails: React.FC = () => {
  const { companyInfo } = useContext(CompanyInfoContext);
  const { data, mutate: updateUser, isLoading } = useUpdateUserMutation();
  const router = useRouter();
  const userData: any = getUserDetails();
  const userId = userData?.id;
  const updatedBy = userData?.id_app_user;
  const full_name = userData?.full_name;
  const phoneNumber = userData?.mobile;

  useEffect(() => {
    if (data) {
      Cookies.set(USER_DETAILS, JSON.stringify(data?.data));
    }
  }, [data]);

  useEffect(() => {
    if (!getToken()) {
      router.push("/");
    }
  }, [router.query.counter]);

  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserType>({
    defaultValues,
  });
  function onSubmit({ full_name, country_id, mobile }: UpdateUserType) {
    updateUser({
      full_name,
      country_id,
      mobile,
      image: "istockphoto-1322964481-612x612.jpg",
      id: userId,
      updated_by: updatedBy,
    });
  }

  const phoneCode = [
    { optionId: 1, optionName: "+91" },
    { optionId: 1, optionName: "+93" },
    { optionId: 2, optionName: "+1" },
    { optionId: 3, optionName: "+23" },
    { optionId: 1, optionName: "+56" },
    { optionId: 1, optionName: "+89" },
  ];

  return (
    <motion.div
      layout
      initial="from"
      animate="to"
      exit="from"
      //@ts-ignore
      variants={fadeInTop(0.35)}
      className={`w-full flex flex-col px-4 md:px-8 2xl:px-16`}
    >
      <h2
        className={`text-lg md:text-xl xl:text-2xl font-bold text-[${companyInfo.web_secondary_color}] mb-6 xl:mb-8`}
      >
        {t("common:text-account-details")}
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mx-auto flex flex-col justify-center "
        noValidate
      >
        <div className="flex flex-col space-y-4 sm:space-y-5">
          {/* <AvatarUpload /> */}
          <div className="flex flex-col sm:flex-row sm:space-s-3 space-y-4 sm:space-y-0">
            <Input
              labelKey="forms:label-first-name"
              {...register("full_name", {
                required: "forms:first-name-required",
              })}
              variant="solid"
              className="w-full sm:w-full"
              defaultValue={full_name}
              errorKey={errors.full_name?.message}
            />
          </div>
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
                defaultValue={phoneNumber}
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
          <div className="relative">
            <Button
              type="submit"
              loading={isLoading}
              disabled={isLoading}
              className="h-12 mt-3 w-full sm:w-32"
            >
              {t("common:button-save")}
            </Button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default AccountDetails;
