import { useEffect, useState, useRef } from 'react'

import ReactStars from "react-rating-stars-component";
import MetalColor from "../../components/Product_Details/Metal_Tone";
import Phone from "../../components/icons/Phone";
import Email from "../../components/icons/Email";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Button from '@components/ui/button';
import ProductWishIcon from "@components/icons/product-wish-icon";
import {
    EmailShareButton,
    EmailIcon,
    FacebookShareButton,
    FacebookIcon,
    WhatsappShareButton,
    WhatsappIcon,
} from "react-share";
import DiamondShape from "../Product_Details/Diamond_Shape";
import { useUI } from "@contexts/ui.context";

const options = [
    '3', '3 1/2',
    '4', '4 1/2',
    '5', '5 1/2',
    '6', '6 1/2',
    '7', '7 1/2',
    '8', '8 1/2',
    '9', '9 1/2',
    '10', '10 1/2',
    '11', '11 1/2',
];

const defaultOption = options[0];
function DetailOne(props: any) {
    const { setModalView, openModal } = useUI();
    const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);

    const { product } = props;
    const data = product;

    function handleReviewPopup() {
        setModalView("APPOINTMENT");
        return openModal();
    }

    return (
        <div className="mt-7">
            <h1 className="text-heading hover:text-black mb-3.5 TCC-product-detail-heading">{product?.name}</h1>
            {/* Review */}
            <div className='flex grid-cols-4'>
                <span className='flex flex-col'>
                    <ReactStars
                        count={5}
                        size={25}
                        color="#c6c6c6"
                        activeColor="#DBB961"
                    />
                </span>
                <span className='flex flex-col ml-2'> (25)</span>
            </div>
            {/* Price */}
            <div className="mt-3">
                <span className="text-heading font-bold text-base md:text-xl lg:text-2xl 2xl:text-4xl pe-2 md:pe-0 lg:pe-2 2xl:pe-0">${product?.sale_price?.toFixed(2)}</span>
            </div>
            {/* Product Discription */}
            <div className="product-content">
                <p className='text-body TCC-product-detail-discription'>{product?.description}</p>
            </div>
            <>
                <div className="mt-5">
                    <div className="">
                        <MetalColor product={product!} />
                    </div>
                </div>
                <div>
                    {/* Diamond Images */}
                    <DiamondShape product={product!} />
                </div>
                <div className="gap-3 my-3">
                    <label htmlFor="size">Ring Size:</label>
                    <div className="">
                        <Dropdown className="w-2/6" options={options} value={defaultOption} placeholder="Select an option" />
                    </div>
                </div >
            </>
            {/* Add to Cart Button */}
            <div className='flex mt-5'>
                <Button
                    variant="slim"
                    className={`w-1/3 md:w-1/3 mb-12 bg-[#DBB961] hover:bg-[#DBB961]`}
                    loading={addToCartLoader}
                >
                    <span className="py-2 3xl:px-8">ADD TO BAG</span>
                </Button>
                <ProductWishIcon className="w-14 h-14 rounded-md" />
                <span className="mt-4 hover:text-headerSecondaryTextColor cursor-pointer">Add To wishlist</span>
            </div>
            <div className="product-details-footer">
                <div className="social-icons social-icons-sm flex">
                    <span className="social-label mt-2">Share:</span>
                    <div className="gap-5">
                        <EmailShareButton className="mx-2" url={"https://www.facebook.com/"}>
                            <EmailIcon size={32} round={true} />
                        </EmailShareButton>
                        <FacebookShareButton className="mx-2" url={"https://www.facebook.com/"}>
                            <FacebookIcon size={32} round={true} />
                        </FacebookShareButton>
                        <WhatsappShareButton className="mx-2" url={"https://www.facebook.com/"}>
                            <WhatsappIcon size={32} round={true} />
                        </WhatsappShareButton>
                    </div>
                </div>
            </div >

            {/* Inquiry */}
            <div className='bg-[#F8F8F8] h-20 w-50 my-5 flex justify-between '>
                <div className='flex justify-between items-center mx-5 cursor-pointer' onClick={handleReviewPopup}>
                    <span>
                        <Email />
                    </span>
                    <span className='mx-2' >
                        Inquiry
                    </span>
                </div>
                <div className='flex justify-between items-center mx-5 cursor-pointer'>
                    <span>
                        <Phone />
                    </span>
                    <span className='mx-2'>
                        91+ 011 681 0209
                    </span>
                </div>
            </div>
            {/* <ProductMetaReview data={data} /> */}
        </div >
    )
}

export default DetailOne;
