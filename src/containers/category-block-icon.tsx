import IconCard from "@components/common/icon-card";
import CardIconLoader from "@components/ui/loaders/card-icon-loader";
import CardRoundedLoader from "@components/ui/loaders/card-rounded-loader";
import Alert from "@components/ui/alert";
import cn from "classnames";
import { SwiperSlide } from "swiper/react";
import { Category } from "@framework/types";
import { useFeaturedCategoriesQuery } from "@framework/category/get-featured-categories";
import SectionHeader from "@components/common/theProcess-section-header";
import { useEffect, useState } from "react";

interface CategoriesProps {
  sectionHeading: string;
  className?: string;
  variant?: "default" | "modern" | "circle" | "list";
}

export interface CategoryData {
  id: number;
  name: string;
  target_url: string;
  created_date: string;
  content: string;
  image_path: string;
}
const CategoryBlockIcon: React.FC<CategoriesProps> = ({
  className = "mb-12 md:mb-14 xl:mb-16 px-4 md:px-8 2xl:px-16",
  variant = "default",
}) => {
  const { data, isLoading, error } = useFeaturedCategoriesQuery();
  const [href, setHref] = useState("/coming-soon");
  const categoryData = data?.result;

  const Category =
    categoryData &&
    categoryData.map((category: CategoryData) => {
      return {
        id: category.id,
        name: category.name,
        slug: category.target_url,
        icon: `${process.env.NEXT_PUBLIC_IMG_URL}${category.image_path}`,
        tags: category.content,
      };
    });

  useEffect(() => {
    if (Category && Category.name === "Jewellery Care") {
      setHref("/jewellery-care");
    }
    if (Category && Category.name === "Find Your Ring Size") {
      setHref("/engagement-ring-guide");
    }
    if (Category && Category.name === "Precious Metal Guide") {
      setHref("/precious-metal-guide");
    }
  }, [Category]);

  return (
    <div className={cn(className)}>
      {error ? (
        <Alert message={(error as any)?.message} />
      ) : (
        <>
          <SectionHeader
            sectionHeading={"Education"}
            topVarient={false}
            className="pb-0.5 mb-1 sm:mb-1.5 md:mb-2 lg:mb-3 2xl:mb-4 3xl:mb-5 mt-20"
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {isLoading && !data
              ? Array.from({ length: 10 }).map((_, idx) => {
                  return (
                    <SwiperSlide key={`card-rounded-${idx}`}>
                      {variant === "circle" ? (
                        <CardRoundedLoader uniqueKey={`card-circle-${idx}`} />
                      ) : (
                        <CardIconLoader uniqueKey={`card-rounded-${idx}`} />
                      )}
                    </SwiperSlide>
                  );
                })
              : Category.map((category: Category) => (
                  <SwiperSlide key={`category--icon-key-${category.id}`}>
                    <IconCard
                      item={category}
                      href={href}
                      effectActive={true}
                      variant={variant}
                    />
                  </SwiperSlide>
                ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryBlockIcon;
