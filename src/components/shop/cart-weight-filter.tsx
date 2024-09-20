import { useCategoriesQuery } from "@framework/category/get-all-categories";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "next-i18next";
import MultiRange from "../common/carat-weight-slider";
import InfoIcon from "../../components/icons/info";

export const CartWeightFilter = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { pathname, query } = router;
  const { data, isLoading } = useCategoriesQuery({
    limit: 10,
  });
  const selectedCategories = query?.category
    ? (query.category as string).split(",")
    : [];
  const [formState, setFormState] =
    React.useState<string[]>(selectedCategories);

  React.useEffect(() => {
    setFormState(selectedCategories);
  }, [query?.category]);

  // if (isLoading) return <p>Loading...</p>;

  // function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
  // 	const { value } = e.currentTarget;
  // 	let currentFormState = formState.includes(value)
  // 		? formState.filter((i) => i !== value)
  // 		: [...formState, value];
  // 	const { category, ...restQuery } = query;
  // 	router.push(
  // 		{
  // 			pathname,
  // 			query: {
  // 				...restQuery,
  // 				...(!!currentFormState.length
  // 					? { category: currentFormState.join(",") }
  // 					: {}),
  // 			},
  // 		},
  // 		undefined,
  // 		{ scroll: false }
  // 	);
  // }

  const items = data?.categories.data;
  return (
    <div className="block pb-7 mb-4 mx-5">
      <div className="flex">
        <h3 className="text-heading text-sm md:text-base font-semibold mb-7">
          {t("text-carat-weight")}
        </h3>
        <span className="mt-1 mx-2">
          <InfoIcon />
        </span>
      </div>
      <div className="mt-2 flex flex-col space-y-4">
        <MultiRange />
      </div>
    </div>
  );
};
