import Container from "@components/ui/container";
import Layout from "@components/layout/layout-three";
import OrderInformation from "@components/order/order-information";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import Text from '@components/ui/text'
import { useTranslation } from "next-i18next";

export default function Order() {

	const { t } = useTranslation();

	return (
		<>
			<div className={`flex items-center justify-center mt-10 pb-0.5 mb-2 md:mb-5 lg:mb-6 2xl:mb-7 3xl:mb-8`}>
				<Text className="Tcc-text-our-Jewelry-Section">
					{t('text-order-status')}
				</Text>
			</div>
			<Container>
				<OrderInformation />
			</Container>
		</>
	);
}

Order.Layout = Layout;

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
