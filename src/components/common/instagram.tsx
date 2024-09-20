import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import cn from "classnames";
import { useTranslation } from "next-i18next";
// import {
//   Client,
//   GetPageInfoRequest,
//   GetPageMediaRequest,
//   GetUserLongLivedTokenRequest,
//   GetUserLongLivedTokenResponse,
// } from "instagram-graph-api";

const instagramFeed = [
  {
    id: 1,
    title: "text-man",
    slug: "https://thecadco.com/site/pages/portfolio/MjY%3D",
    image: "/assets/images/instagram/tcc1.jpg"
  },
  {
    id: 2,
    title: "text-woman",
    slug: "https://thecadco.com/site/pages/portfolio/MjY%3D",
    image: "/assets/images/instagram/tcc2.jpg"
  },
  {
    id: 3,
    title: "text-watch",
    slug: "https://thecadco.com/site/pages/portfolio/MjY%3D",
    image: "/assets/images/instagram/tcc3.jpg"
  },
  {
    id: 4,
    title: "text-man",
    slug: "https://thecadco.com/site/pages/portfolio/MjY%3D",
    image: "/assets/images/instagram/tcc4.jpg"
  },
];

interface Props {
  className?: string;
  variant?: "rounded";
  disableContainerBorderRadius?: boolean;
}
const Instagram: React.FC<Props> = ({
  className = "",
  variant,
  disableContainerBorderRadius = false,
}) => {
  const { t } = useTranslation("common");

  return (
    <div className="flex justify-center gap-5 my-20 px-4">
      {instagramFeed?.map((item) => (
        <a
          className="group flex justify-center odd:mb-20 even:mt-20 text-center relative"
          href={item.slug}
          key={`instagram--key${item.id}`}
          target="_blank"
        >
          <Image
            src={item.image ?? "/assets/placeholder/instagram.svg"}
            alt={t(`${item.title}`) || t("text-instagram-thumbnail")}
            width={300}
            height={300}
            className={cn("bg-gray-300 object-cover", {
              "rounded-md": variant === "rounded",
            })}
          />
          <div
            className={cn(
              "absolute top left bg-black w-full h-full opacity-0 transition-opacity duration-300 group-hover:opacity-50",
              {
                "rounded-md": variant === "rounded",
              }
            )}
          />
          <div className="absolute top left h-full w-full flex items-center justify-center">
            <FaInstagram className="text-white text-base sm:text-xl md:text-3xl lg:text-5xl xl:text-6xl transform opacity-0 scale-400 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100" />
          </div>
        </a>
      ))}
    </div>
  );
};

export default Instagram;
