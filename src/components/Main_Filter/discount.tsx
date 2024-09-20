import { useState } from "react";
import Container from "@components/ui/container";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "next-i18next";
import ListBox from '@components/ui/list-box';


const ShopDiscount: React.FC = () => {
	const [status, setStatus] = useState(false);
	const hide = () => {
		setStatus(true);
	};
	const { t } = useTranslation("common");
	return (
		<div
			className={`flex justify-center mb-12 relative bg-borderBottom transition duration-200 ease-in ${status === true ? "h-0.5" : "py-4"
				}`}
		>
			<Container className={status === true ? "opacity-0 invisible" : "w-full"}>
				<div className="relative text-center text-heading text-xs md:text-sm leading-6 md:leading-7 px-8">
					{"374"} {t("text-discount")} &nbsp;
					{/* <a className="underline" href="#">
						{t("text-details")}
					</a> */}
					{/* <button
						className="absolute h-full end-0 top-0 flex text-lg md:text-2xl items-center justify-center text-gray-500 opacity-50 focus:outline-none transition-opacity hover:opacity-100"
						onClick={hide}
						aria-label="close"
					>
						Sort: Best Seller
					</button> */}

					<div className="flex justify-end absolute h-full end-0 top-0 text-lg md:text-2xl items-center text-gray-500 opacity-50 focus:outline-none transition-opacity hover:opacity-100">
						<div className="flex">
							<span className="text-black ">Sort: </span>&nbsp;
						</div>
						<ListBox
							options={[
								{ name: 'text-sorting-options', value: 'options' },
								{ name: 'text-newest', value: 'newest' },
								{ name: 'text-popularity', value: 'popularity' },
								{ name: 'text-price-low-high', value: 'low-high' },
								{ name: 'text-price-high-low', value: 'high-low' },
							]}
						/>

					</div>
				</div>
			</Container>
		</div>
	);
};

export default ShopDiscount;
