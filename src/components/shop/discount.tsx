import { useContext, useState } from "react";
import Container from "@components/ui/container";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "next-i18next";
import ListBox from "@components/ui/list-box";
import { ProductDetailsContext } from "@contexts/productDetails/product-Details-Context";
import { CompanyInfoContext } from "@contexts/company_info/company_info";

const ShopDiscount: React.FC = () => {
  const [status, setStatus] = useState(false);
  const hide = () => {
    setStatus(true);
  };
  const { listedProduct } = useContext(ProductDetailsContext);
  const { companyInfo } = useContext(CompanyInfoContext);
  const { t } = useTranslation("common");
  return (
    <div
      className={`flex justify-center mb-12 relative bg-borderBottom transition duration-200 ease-in ${
        status === true ? "h-0.5" : "py-4"
      }`}
    >
      <Container className={status === true ? "opacity-0 invisible" : "w-full"}>
        <div
          className={`relative  md:text-center text-[${companyInfo.web_secondary_color}] text-xs md:text-sm leading-6 md:leading-7 px-8`}
        >
          <div>
            {listedProduct} {t("text-discount")} &nbsp;
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ShopDiscount;
