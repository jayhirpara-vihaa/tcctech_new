import { useBrandsQuery } from "@framework/brand/get-all-brands";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "next-i18next";
import InfoIcon from "../../components/icons/info"
import colorFilterData from "public/api/brands.json"
export const ColorFilter = () => {
	const { t } = useTranslation("common");
	const router = useRouter();
	const { pathname, query } = router;
	// const { data, isLoading, error } = useBrandsQuery({
	// 	limit: 10,
	// });
	const data = colorFilterData
	const selectedBrands = query?.brand ? (query.brand as string).split(",") : [];
	const [formState, setFormState] = React.useState<string[]>(selectedBrands);
	React.useEffect(() => {
		setFormState(selectedBrands);
	}, [query?.brand]);
	// if (isLoading) return <p>Loading...</p>;
	// if (error) return <p>{error.message}</p>;

	// function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
	// 	const { value } = e.currentTarget;
	// 	let currentFormState = formState.includes(value)
	// 		? formState.filter((i) => i !== value)
	// 		: [...formState, value];
	// 	// setFormState(currentFormState);
	// 	const { brand, ...restQuery } = query;
	// 	router.push(
	// 		{
	// 			pathname,
	// 			query: {
	// 				...restQuery,
	// 				...(!!currentFormState.length
	// 					? { brand: currentFormState.join(",") }
	// 					: {}),
	// 			},
	// 		},
	// 		undefined,
	// 		{ scroll: false }
	// 	);
	// }
	const items = data?.brands;

	return (
		<div className="blockpb-7 mb-5 mx-5">
			<div className="flex">
				<h3 className="text-heading text-sm md:text-base font-semibold mb-7">
					{t("text-colors")}
				</h3>
				<span className="mt-1 mx-2"><InfoIcon /></span>
			</div>

			<div className="mt-1 flex justify-center">
				{items?.map((item) => {
					return <article className="feature4">
						<div className="color-filter-div">
							<input type="checkbox" id="feature4" />
							<div className="">
								<span className="mx-2">
									{item.color}
								</span>
							</div>
						</div>
					</article>
				})}


			</div>
		</div>
	);
};
