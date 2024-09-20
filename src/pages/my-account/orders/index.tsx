import Layout from "@components/layout/layout-three";
import AccountLayout from "@components/my-account/account-layout";
import OrdersTable from "@components/my-account/orders-table";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function OrdersTablePage() {
	return (
		<AccountLayout>
			<OrdersTable />
		</AccountLayout>
	);
}

OrdersTablePage.Layout = Layout;
OrdersTablePage.authenticate = true;
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
