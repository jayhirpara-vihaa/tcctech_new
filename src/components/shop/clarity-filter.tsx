import { CheckBox } from "@components/ui/checkbox";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "next-i18next";
import InfoIcon from "../../components/icons/info";
import { DiamondFilter, DiamondFilterData, useDiamondFilterDataQuery } from "src/framework/filter/get-all-diamond-filterdata";

type Iprops = {
  data : DiamondFilter | undefined
}

export const ClarityFilter = (props: Iprops) => {
  const { data } = props
  const colorFilterItems = data?.data?.clarityData
  const { t } = useTranslation("common");
  const router = useRouter();
  const { pathname, query } = router;
  const selectedColors = query?.color ? (query.color as string).split(",") : [];
  const [formState, setFormState] = React.useState<string[]>(selectedColors);
  React.useEffect(() => {
    setFormState(selectedColors);
  }, [query?.color]);

  // function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
  //   const { value } = e.currentTarget;
  //   let currentFormState = formState.includes(value)
  //     ? formState.filter((i) => i !== value)
  //     : [...formState, value];
  //   // setFormState(currentFormState);
  //   const { color, ...restQuery } = query;
  //   router.push(
  //     {
  //       pathname,
  //       query: {
  //         ...restQuery,
  //         ...(!!currentFormState.length
  //           ? { color: currentFormState.join(",") }
  //           : {}),
  //       },
  //     },
  //     undefined,
  //     { scroll: false }
  //   );
  // }
  const items = colorFilterItems;

  return (
    <div className="block pb-5 mx-5">
      <div className="flex">
        <h3 className="text-heading text-sm md:text-base font-semibold mb-7">
          {t("text-carat-clarity")}
        </h3>
        <span className="mt-1 mx-2">
          <InfoIcon />
        </span>
      </div>

      <div className="mt-1 flex justify-center">
        {items?.map((item:any) => {
          return (
            <article className="feature4">
              <input type="checkbox" id="feature4" className="" />
              <div className="">
                <span className="">{item.name}</span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
