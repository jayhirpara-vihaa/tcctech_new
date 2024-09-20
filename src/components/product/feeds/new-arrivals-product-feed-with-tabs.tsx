import SectionHeader from "@components/common/bestSelling-section-header";
import ProductsBlock from "@containers/products-block";
import ProductsBlockCarousel from "@containers/products-block-carousel";
import { PropsData } from "@framework/types";
import { Tab } from "@headlessui/react";
import { useTranslation } from "next-i18next";

const NewArrivalsProductFeedWithTabs: React.FC<PropsData> = ({
  data,
  isLoading,
  error,
}) => {
  const { t } = useTranslation("common");

  // const { data, isLoading, error } = useProductsQuery({
  //   limit: 10,
  // });
  const newArrivelData = data?.data;
  return (
    <div className="mb-12 md:mb-14 xl:mb-16">
      <ProductsBlockCarousel
        sectionHeading="text-our-bestselling"
        sectionDiscription="text-our-jewelry-selection"
        products={newArrivelData}
        loading={isLoading}
        error={error?.message}
        uniqueKey="new-arrivals"
        type="gridTrendy"
        // type='gridModernWide'
        className="mb-12 md:mb-14 xl:mb-16"
        imgWidth={435}
        imgHeight={435}
        productType={"trending"}
      />
    </div>
  );
};

export default NewArrivalsProductFeedWithTabs;
