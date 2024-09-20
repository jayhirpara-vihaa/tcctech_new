import Image from "next/image";
import Link from "@components/ui/link";
import cn from "classnames";
import { siteSettings } from "@settings/site-settings";
import { useContext } from "react";
import { CompanyInfoContext } from "@contexts/company_info/company_info";

const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
  className,
  ...props
}) => {
  const { logoImages } = useContext(CompanyInfoContext);
  const imgUrl = process.env.NEXT_PUBLIC_IMG_URL;

  return (
    <>
      <Link
        href={siteSettings.logo.href}
        className={cn("inline-flex focus:outline-none", className)}
        {...props}
      >
        <Image
          src={`${imgUrl}${logoImages?.darakImage}`}
          alt={siteSettings.logo.alt}
          height={siteSettings.logo.height}
          width={siteSettings.logo.width}
          layout="fixed"
          loading="eager"
        />
      </Link>
    </>
  );
};

export default Logo;
