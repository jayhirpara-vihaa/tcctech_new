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
import { useLogin3DConfig } from "@framework/auth/login-3d-config";

const LoginFrom3DConfig: React.FC = () => {
    // Other Constants
    const { t } = useTranslation();
    const { closeModal } = useUI();
    const router = useRouter();
    const { companyInfo } = useContext(CompanyInfoContext);
    // API Hooks
    const { data, mutate: login3dConfig } = useLogin3DConfig();
    const [CountryData, setCountryData] = useState([]);

    const handleOnSubmit = () => {
        if (data === null || data === "" || data === undefined) {
        } else if ((data && data.code === 200) || (data && data.code === "200")) {
            sessionStorage.setItem("config_user_verification_email", data.data.username);
            router.push(`/config-login-otp-verified`, undefined, {
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

        username: yup
            .string()
            .required(`${t("forms:email-required")}`)
            .matches(
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                `${t("forms:email-error")}`
            )
    });

    const { data: countryData } = useCountryDropdown();

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
        username,
    }: SignUpInputType) {
        login3dConfig({
            user_name: username,
        });
    }

    return (
        <div className="py-5 px-5 sm:px-8 bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300">
            <div className="text-center mb-6 pt-2.5">
                {/* <div onClick={closeModal}>
                    <Logo />
                </div> */}

            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col justify-center"
                noValidate
            >
                <div className="flex flex-col space-y-4">

                    <Input
                        labelKey="forms:label-email"
                        type="email"
                        variant="solid"
                        {...register("username")}
                        errorKey={errors.username?.message}
                    />
                    {/* <p className="text-sm md:text-base text-body mt-2 mb-8 sm:mb-10">
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
                    </p> */}
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

        </div>
    );
};

export default LoginFrom3DConfig;
