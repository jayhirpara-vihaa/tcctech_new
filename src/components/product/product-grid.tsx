import ProductCard from "@components/product/product-card";
import { FC, useContext, useEffect } from "react";
import { useProductDataMutation } from "@framework/product/get-all-products";
import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
import { useTranslation } from "next-i18next";
import { DiamondSettingContext } from "@contexts/diamond_setting/diamond-setting-context";
import { ProductDetailsContext } from "@contexts/productDetails/product-Details-Context";
import FallbackSpinner from "@components/spinner";
interface ProductGridProps {
  className?: string;
}
export const ProductGrid: FC<ProductGridProps> = ({ className = "" }) => {
  const {
    value,
    selectedStyle,
    selectedShape,
    selectedColor,
    selectedGender,
    selectedCategory,
  } = useContext(DiamondSettingContext);
  const { updateListedProduct } = useContext(ProductDetailsContext);

  const {
    data,
    mutate: fetchProducts,
    isLoading,
    error,
  } = useProductDataMutation();
  useEffect(() => {
    fetchProducts({
      setting_type: selectedStyle,
      min_price: value[0],
      max_price: value[1],
      metal_tone: selectedColor,
      diamond_shape: selectedShape,
      current_page: selectedStyle,
      gender: selectedGender,
      product_category: selectedCategory,
    });
  }, [
    selectedStyle,
    value,
    selectedShape,
    selectedColor,
    selectedGender,
    selectedCategory,
  ]);

  const totalListedProduct = data?.data?.productList?.length;

  const { t } = useTranslation("common");

  useEffect(() => {
    updateListedProduct(totalListedProduct);
  }, [totalListedProduct]);

  if (isLoading) return <FallbackSpinner />;
  return (
    <>
      <div
        className={`px-4 md:px-6 2xl:px-16 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-3 lg:gap-x-5 xl:gap-x-7 2xl:gap-x-9  2xl:grid-cols-5 gap-y-3 xl:gap-y-5 2xl:gap-y-8 ${className}`}
      >
        {isLoading && !data?.data?.productList?.length ? (
          <ProductFeedLoader limit={20} uniqueKey="search-product" />
        ) : (
          data?.data?.productList?.map((product: any) => {
            console.log("productList", data?.data?.productList);
            console.log("product", product);
            return (
              <ProductCard
                key={`product-key-${product.id}`}
                product={product}
                variant="grid"
                className="2xl:px-2"
              />
            );
          })
        )}
      </div>
    </>
  );
};
