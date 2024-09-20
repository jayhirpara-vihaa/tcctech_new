import Text from "@components/ui/text";
import Link from "@components/ui/link";
import { useTranslation } from "next-i18next";

interface Props {
  sectionHeading: string;
  categorySlug?: string;
  className?: string;
  textClassName?: string;
  sectionDiscription?: string;
}

const SectionHeader: React.FC<Props> = ({
  sectionHeading = "text-section-title",
  sectionDiscription = "discriprion-new-arrivals",
  categorySlug,
  className = "lg:mb-6 2xl:mb-7 3xl:mb-8 pb-0.5 mb-1 sm:mb-1.5  lg:mb-3 2xl:mb-4 3xl:mb-5",
  textClassName = "Tcc-text-our-best-selling font-serif",
}) => {
  const { t } = useTranslation("common");
  return (
    <>
      <div className="my-20">
        <div className={`flex items-center justify-center ${className}`}>
          <Text className={textClassName} variant="mediumHeading">
            {t(`${sectionHeading}`)}
          </Text>
          {categorySlug && (
            <Link
              href={categorySlug}
              className="text-xs lg:text-sm xl:text-base text-heading mt-0.5 lg:mt-1"
            >
              {t("text-see-all-product")}
            </Link>
          )}
        </div>
        {/* Discription */}
        <div
          className={`flex items-center justify-center max-sm:mt-2 sm:mt-2 Tcc-text-our-best-selling ${className}`}
        >
          <Text
            className="Tcc-text-our-Jewelry-Section"
            variant="mediumHeading"
          >
            {t(`${sectionDiscription}`)}
          </Text>
        </div>
      </div>
    </>
  );
};

export default SectionHeader;
