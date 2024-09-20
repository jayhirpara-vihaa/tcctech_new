import Text from "@components/ui/text";
import Link from "@components/ui/link";
import { useTranslation } from "next-i18next";
import { useContext } from "react";
import { CompanyInfoContext } from "@contexts/company_info/company_info";

interface Props {
  sectionHeading: string;
  categorySlug?: string;
  className?: string;
  textClassName?: string;
  topVarient?: boolean;
}

const SectionHeader: React.FC<Props> = ({
  sectionHeading,
  categorySlug,
  topVarient,
  className = "pb-0.5 mb-2 md:mb-5 lg:mb-6 2xl:mb-7 3xl:mb-8",
}) => {
  const { t } = useTranslation("common");
  const { companyInfo } = useContext(CompanyInfoContext);
  return (
    <div className={`flex items-center justify-center mt-2 ${className}`}>
      <Text
        className={
          topVarient === false
            ? "Tcc-text-our-Jewelry-Section"
            : `Tcc-text-our-best-selling text-[${
                companyInfo && companyInfo.web_secondary_color
              }]`
        }
        variant="mediumHeading"
      >
        {t(`${sectionHeading}`)}
      </Text>
      {categorySlug && (
        <Link
          href={categorySlug}
          className={`text-xs lg:text-sm xl:text-base text-[${
            companyInfo && companyInfo.web_secondary_color
          }] mt-0.5 lg:mt-1`}
        >
          {t("text-see-all-product")}
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
