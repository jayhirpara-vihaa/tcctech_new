import Image from "next/image";
import Link from "@components/ui/link";
import cn from "classnames";
import { siteSettings } from "@settings/site-settings";
import { AnchorHTMLAttributes, HTMLAttributeAnchorTarget, HTMLAttributeReferrerPolicy } from "react";

interface FooterProps<T> extends AnchorHTMLAttributes<T> {
	download?: any;
	href?: string | undefined;
	hrefLang?: string | undefined;
	media?: string | undefined;
	ping?: string | undefined;
	rel?: string | undefined;
	target?: HTMLAttributeAnchorTarget | undefined;
	type?: string | undefined;
	referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
	logoImage: string
}

const footerLogo: React.FC<FooterProps<{}>> = ({
	className,
	logoImage,
	...props
}) => {

	return (
		<Link
			href={siteSettings.footerLogo.href}
			className={cn("inline-flex focus:outline-none", className)}
			{...props}
		>
			<Image
				src={`${process.env.NEXT_PUBLIC_IMG_URL}${logoImage}`}
				alt={siteSettings.footerLogo.alt}
				height={siteSettings.footerLogo.height}
				width={siteSettings.footerLogo.width}
				layout="fixed"
				loading="eager"
			/>
		</Link>
	);
};

export default footerLogo;