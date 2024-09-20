import { CheckBox } from "@components/ui/checkbox";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "next-i18next";
import PriceSlider from "../common/price-slider"
import InfoIcon from "../../components/icons/info"


export const PriceFilter = () => {
	const { t } = useTranslation("common");
	const router = useRouter();
	const { pathname, query } = router;
	const selectedPrices = query?.price ? (query.price as string).split(",") : [];
	const [formState, setFormState] = React.useState<string[]>(selectedPrices);
	React.useEffect(() => {
		setFormState(selectedPrices);
	}, [query?.price]);
	function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
		const { value } = e.currentTarget;
		let currentFormState = formState.includes(value)
			? formState.filter((i) => i !== value)
			: [...formState, value];
		// setFormState(currentFormState);
		const { price, ...restQuery } = query;
		router.push(
			{
				pathname,
				query: {
					...restQuery,
					...(!!currentFormState.length
						? { price: currentFormState.join(",") }
						: {}),
				},
			},
			undefined,
			{ scroll: false }
		);
	}

	return (
		<div className="block pb-7 mb-7 my-5 mx-5">
			<div className="flex">
				<h3 className="text-heading text-sm md:text-base font-semibold mb-7">
					{t("text-price")}

				</h3>
				<span className="mt-1 mx-2"><InfoIcon /></span>
			</div>

			<div className="mt-2 flex flex-col space-y-4">
				<PriceSlider />
			</div>
		</div>
	);
};
