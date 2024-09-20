// import ProductCard from "@components/product/product-card";
// import Button from "@components/ui/button";
// import { useDiamondSettingQuery } from "@framework/diamond-setting/get-all-settings";
// import { useRouter } from "next/router";
// import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
// import { Settings } from "@framework/types";
// import { useTranslation } from "next-i18next";
import type { FC } from "react";
import SettingCard from "@components/diamond-setting/diamond-setting-card";
import FilterData from "public/api/diamond_settings.json";

interface ProductGridProps {
  className?: string;
}
export const ProductGrid: FC<ProductGridProps> = ({ className = "" }) => {
  //   const { t } = useTranslation("common");
  const data = FilterData;

  return (
    <>
      <div
        className={`grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 ${className}`}
      >
        {/* {isLoading && !data?.pages?.length ? (
          <ProductFeedLoader limit={20} uniqueKey="search-product" />
        ) : (
          data?.pages?.map((page) => {
            return page?.data?.map((setting: Settings) => (
              <SettingCard
                key={`product--key${setting.id}`}
                setting={setting}
                variant="setting"
              />
            ));
          })
        )} */}

        {data?.map((setting: any) => {
          return (
            <SettingCard
              key={`product--key${setting.id}`}
              setting={setting}
              variant="setting"
            />
          );
        })}
      </div>
      <div className="text-center pt-8 xl:pt-14 ">
        {/* {hasNextPage && (
                    <Button
                        loading={loadingMore}
                        disabled={loadingMore}
                        // onClick={() => fetchNextPage()}
                        variant="slim"
                    >
                        {t("button-load-more")}
                    </Button>
                )} */}
      </div>
    </>
  );
};
