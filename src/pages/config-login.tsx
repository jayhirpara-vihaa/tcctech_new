import Container from "@components/ui/container";
import Layout from "@components/layout/layout-configurator";
import VerifyOTP from "@components/auth/verifyOTP-form";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import ConfigOTPLoginForm from "@components/auth/config-login-OTP-form";
import LoginFrom3DConfig from "@components/auth/login-3d-config-from";
export default function ConfigLogin() {
    return (
        <>
            {/* <PageHeader pageHeader="Sign In" /> */}
            <Container>
                <div className="py-16 lg:py-20 px-4 md:px-8 2xl:px-16">
                    <LoginFrom3DConfig />
                </div>
            </Container>
        </>
    );
}

ConfigLogin.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale!, [
                "common",
                "forms",
                "menu",
                "footer",
            ])),
        },
    };
};
