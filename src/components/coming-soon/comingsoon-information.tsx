import Image from "next/image";
import { IoCartSharp } from "react-icons/io5";
import Text from "@components/ui/text";
import Link from "@components/ui/link";
import { useTranslation } from "next-i18next";
import Button from "@components/ui/button";
import { useRouter } from "next/router";
import ReactPlayer from "react-player";
const ComingSoonInformation: React.FC = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/products");
  };

  return (
    <div className="border-t border-b border-gray-300 text-center px-16 py-16 sm:py-20 lg:py-24 xl:py-32 flex items-center justify-center">
      <div>
        {/* <Text variant="mediumHeading">{t("coming-soon-subheader")}</Text> */}
        <h1 className="font-medium  blog-text mb-[40px] text-black">
          We are polishing up something exciting for you...
        </h1>
        <span className="revaluation-heading-text">Coming Soon...</span>
        <h3 className="TCC-product-detail-discription my-[40px] font-medium">
          Contact us:{" "}
          <a className="font-medium" href="mailto:info@nungu-diamonds.co.za">
            info@nungu-diamonds.co.za
          </a>
        </h3>
        <div className="flex justify-center">
          <Button
            type="submit"
            onClick={handleButtonClick}
            className="h-12 md:mt-1 text-sm lg:text-base w-full sm:w-auto"
          >
            <IoCartSharp /> {t("button-continue-shopping")}
          </Button>
        </div>
      </div>
      <div className="mx-3">
        {/* <ReactPlayer
          width="600px"
          height="600px"
          url="http://nungu-diamonds.co.za/assets/img/video1.mp4"
        /> */}
        {/* <video src={require("../../../public/assets/video1.mp4")} /> */}
        <video
          autoPlay={true}
          src="http://nungu-diamonds.co.za/assets/img/video1.mp4"
          style={{ width: "600px", height: "600px" }}
        />
      </div>
    </div>
  );
};

export default ComingSoonInformation;
