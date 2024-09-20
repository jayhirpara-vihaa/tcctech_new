import Link from "@components/ui/link";
import Text from "@components/ui/text";
import { FaLink } from "react-icons/fa";
import { LinkProps } from "next/link";
import { useTranslation } from "next-i18next";
import cn from "classnames";

interface Props {
  item: any;
  effectActive?: boolean;
  variant?: "default" | "modern" | "circle" | "list";
  href: LinkProps["href"];
}

const IconCard: React.FC<Props> = ({
  item,
  effectActive = false,
  variant = "default",
  href,
}) => {
  const { name, icon, tags } = item ?? {};
  const { t } = useTranslation("common");
  return (
    <div className=" border-solid border-2 border-gray-300 Tcc-box-shadow justify-center">
      <Link
        href={href}
        className={cn("flex justify-start  rounded-md", {
          "flex-col h-28 sm:h-[8.5rem] md:h-20 xl:h-[11.5rem] 2xl:h-44 3xl:h-60 bg-white border-gray-200":
            variant === "default",
          "flex-col px-6 lg:px-8 pt-7 lg:pt-10 pb-5 lg:pb-8 bg-white border-gray-200":
            variant === "modern",
          "flex-col items-center": variant === "circle",
          "gap-[25px] xl:gap-[30px] 2xl:gap-[40px] 3xl:gap-[50px] px-3 lg:px-4 py-5 lg:py-8 bg-white":
            variant === "list",
        })}
      >
        <div
          className={cn("relative  justify-center", {
            "mb-3.5 md:mb-4 lg:mb-5 xl:mb-2 2xl:mb-6 3xl:mb-8 lg:h-24 mx-auto":
              variant === "default",
            "me-auto h-10": variant === "modern",
            "bg-white justify-center rounded-full mb-3.5 md:mb-4 lg:mb-5 w-[105px] md:w-32 lg:w-[140px] xl:w-44 h-[105px] md:h-32 lg:h-[140px] xl:h-44 max-w-full":
              variant === "circle",
            "flex-shrink-0": variant === "list",
          })}
        >
          <span className={`mx-auto border-white`}>
            <img
              src={icon}
              alt={name || t("text-card-thumbnail")}
              className={cn("mb-0 mx-auto rounded-full h-[60px] w-[60px]")}
            />
          </span>

          {effectActive === true && variant === "circle" && (
            <>
              <div className="absolute top-0 left-0 bg-black w-full h-full opacity-0 transition-opacity duration-300 group-hover:opacity-30 rounded-full" />
              <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center rounded-full">
                <FaLink className="text-white text-base sm:text-xl lg:text-2xl xl:text-3xl transform opacity-0 scale-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100" />
              </div>
            </>
          )}
        </div>

        {effectActive === true && variant !== "circle" && (
          <>
            <div className="absolute top-0 left-0 bg-black w-full h-full opacity-0 transition-opacity duration-300 group-hover:opacity-30 rounded-lg" />
            <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center  rounded-lg">
              <FaLink className="text-white text-base sm:text-xl lg:text-2xl xl:text-3xl transform opacity-0 scale-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100" />
            </div>
          </>
        )}
      </Link>
      <div className="m-3">
        <div className="overflow-hidden gap-y-2 mx-auto">
          <Text
            variant="heading"
            className={cn("capitalize", {
              "absolute text-center bottom-4 sm:bottom-5 md:bottom-6 xl:bottom-8 inset-x-0 text-xl":
                variant === "default",
              "mb-1": variant === "modern",
            })}
          >
            {name}
          </Text>

          {(variant === "modern" || variant === "list") && (
            <Text
              className={cn("pb-0.5 ", {
                "": variant === "list",
              })}
            >
              {`${tags}`}
            </Text>
          )}
        </div>
      </div>
    </div>
  );
};

export default IconCard;
