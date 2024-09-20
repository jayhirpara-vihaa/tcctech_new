import { CartWeightFilter } from "./cart-weight-filter";
import { ColorFilter } from "./color-filter";
import { FilteredItem } from "./filtered-item";
import { ClarityFilter } from "./clarity-filter";
import { PriceFilter } from "./price-filter";
import { useRouter } from "next/router";
import isEmpty from "lodash/isEmpty";
import { useTranslation } from "next-i18next";
import { useDiamondFilterDataQuery } from "src/framework/filter/get-all-diamond-filterdata";


export const ShopFilters: React.FC = () => {
	const router = useRouter();
	const { data : clarityFilterData , isLoading } = useDiamondFilterDataQuery()

	const { pathname, query } = router;
	const { t } = useTranslation("common");
	return (
		<div className="pt-1 bg-[#F8F8F8] h-auto w-[350px]">
			<div className="block border-b border-gray-300 pb-7 mb-7">
				<div className="flex items-center justify-between mx-5 my-3	">
					<h2 className="font-semibold text-heading text-xl md:text-2xl">
						{t("text-filters")}
					</h2>
					<button
						className="flex-shrink text-xs mt-0.5 transition duration-150 ease-in focus:outline-none hover:text-heading"
						aria-label="Clear All"
						onClick={() => {
							router.push(pathname);
						}}
					>
						{t("text-clear-all")}
					</button>
				</div>
				<div className="flex flex-wrap -m-1.5 pt-2">
					{!isEmpty(query) &&
						Object.values(query)
							.join(",")
							.split(",")
							.map((v, idx) => (
								<FilteredItem
									itemKey={
										Object.keys(query).find((k) => query[k]?.includes(v))!
									}
									itemValue={v}
									key={idx}
								/>
							))}
				</div>
			</div>

			<CartWeightFilter />
			<ColorFilter />
			{!isLoading && <ClarityFilter data={clarityFilterData} />}
			<PriceFilter />

		</div>
	);
};
