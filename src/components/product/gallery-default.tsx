import { Magnifier, MOUSE_ACTIVATION } from 'react-image-magnifiers';
import React, { useState, useEffect } from 'react';
import LightBox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

function GalleryDefault(props: any) {
    const { product, adClass = "product-gallery-vertical" } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    const handleImageClick = (index: number) => {
        setPhotoIndex(index);
        setIsOpen(true);
    }
    return (
        <>
            <div className="px-4 md:px-8 2xl:px-16 mt-5">
                <div className='bg-slate-300ima flex'>
                    <div>
                        {product?.gallery_round?.map((item: any, index: number) => {
                            return <div className="my-3" onClick={() => handleImageClick(index)}>
                                <img
                                    src={item?.original}
                                    alt={`product`}
                                    className="w-20"
                                />
                            </div>
                        })}
                    </div>
                    <div className='px-4 md:px-8 2xl:px-16 my-3'>
                        <Magnifier
                            imageSrc={product?.gallery_round[photoIndex].original}
                            imageAlt="product"
                            largeImageSrc={product?.gallery_round[photoIndex].original} // Optional
                            dragToMove={false}
                            cursorStyleActive="crosshair"
                            mouseActivation={MOUSE_ACTIVATION.CLICK}
                            className="relative overflow-hidden w-[50%] flex justify-center"
                        />
                    </div>
                </div>
                <div className="">

                </div>
            </div>
        </>
    )
}

export default React.memo(GalleryDefault);