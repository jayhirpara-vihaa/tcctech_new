import { Tooltip } from "@mui/material";
import Carousel from "@components/ui/carousel/carousel";
import React, { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";

const CenterDiamondSize: React.FC<any> = (props: any) => {
  const [centerDiamondSize, setCenterDiamondSize] = useState(
    props && props?.selectedValue && props?.selectedValue.id
  );

  const handleSelectedCenterDiamond = (e: any, item: any) => {
    setCenterDiamondSize(e.target.id);
    props.value(item);
  };

  useEffect(() => {
    const defaultDiamondSize =
      (props &&
        props.data &&
        props.data.filter(
          (t: any) => parseInt(t.id) === parseInt(centerDiamondSize)
        )) ||
      [];
    if (defaultDiamondSize && defaultDiamondSize.length > 0)
      props.value(defaultDiamondSize[0]);
  }, [centerDiamondSize, props.data]);

  useEffect(() => {
    setCenterDiamondSize(props.selectedValue && props.selectedValue.id);
  }, [props]);

  const flashSaleCarouselBreakpoint = {
    "1280": {
      slidesPerView: 5,
      spaceBetween: 2,
    },
    "768": {
      slidesPerView: 5,
      spaceBetween: 1,
    },
    "0": {
      slidesPerView: 4,
    },
  };

  return (
    <div className="space-x-2">
      <Carousel
        breakpoints={flashSaleCarouselBreakpoint}
        buttonSize="small"
        buttonGroupClassName=""
        className="-mx-0 md:-mx-2.5 xl:-mx-0"
        prevButtonClasses={`left-1 md:left-1 xl:left-1 2xl:left-1 lg:left-1`}
        nextButtonClasses={`right-1 md:right-1 xl:right-1 2xl:right-1 lg:right-1`}
      >
        {props.data &&
          props.data.length !== 0 &&
          props.data.map((item: any, index: any) => {
            return (
              <SwiperSlide
                className="carouselItem"
                key={`banner--key-${index}`}
              >
                <button
                  key={item.id}
                  onClick={(e) => {
                    handleSelectedCenterDiamond(e, item);
                  }}
                  id={item.id}
                  className={`${parseInt(centerDiamondSize) === parseInt(item.id)
                    ? props.className?.buttonSelected
                    : ""
                    } ${props.className?.mainButton}`}
                >
                  <Tooltip
                    title={
                      <div className="tooltip-content">
                        <div className="">
                          <img
                            src={`${process.env.NEXT_PUBLIC_IMG_URL}${item.image_path}`}
                            className={props.className?.tooltipData.scaleStyle}
                            width={props.className?.tooltipData.width}
                            height={props.className?.tooltipData.height}
                            id={item.id}
                          />
                        </div>
                      </div>
                    }
                    placement="right"
                    // arrow
                    classes={{ tooltip: "custom-tooltip" }}
                  >
                    <img
                      src={`${process.env.NEXT_PUBLIC_IMG_URL}${item.image_path}`}
                      className={props.className?.tooltipData.scaleStyle}
                      height={props.className?.imageData.height}
                      width={props.className?.imageData.width}
                      id={item.id}
                    />
                  </Tooltip>
                  {props.className?.buttonSelected === undefined ? (
                    <div className={props.className?.divmargin} id={item.id}>
                      {item.value}
                    </div>
                  ) : (
                    <div className={props.className?.divmargin} id={item.id}>
                      {item.value}
                    </div>
                  )}
                  {props.className?.buttonSelected === undefined ? (
                    <>
                      {defaultDiamondSize[0]?.value == item.value && (
                        <div
                          className={props.className?.selectedBorder.maindiv}
                        >
                          <div
                            className={props.className?.selectedBorder.secdiv}
                            style={{ borderColor: props.colorUI }}
                          ></div>
                        </div>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </button>
              </SwiperSlide>
            );
          })}
      </Carousel>
    </div>
  );
  // return props.page !== "version1" && props.page !== "version2" ? (
  //   <>
  //     <div className="mt-3">
  //       <span className="TCC-config-title TFArrow">Center Diamond Size: </span>
  //       <span className="text-16 TFArrowprice-2-font" style={{ background: `${webConfigBgColor}`, backgroundClip: "text", WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text" }}>
  //         {defaultDiamondSize[0]?.value} ct
  //       </span>
  //       <div className="space-x-2">
  //         <Carousel
  //           breakpoints={flashSaleCarouselBreakpoint}
  //           buttonSize="small"
  //           buttonGroupClassName=""
  //           className="-mx-0 md:-mx-2.5 xl:-mx-0"
  //           // prevButtonClasses={`start-10 md:start-0 xl:start-0 2xl:start-0`}
  //           // nextButtonClasses={`end-10 md:end-0 xl:end-0 2xl:end-0`}
  //           prevButtonClasses={`left-5 md:left-5 xl:left-5 2xl:left-5`}
  //           nextButtonClasses={`right-5 md:right-5 xl:right-5 2xl:right-5`}
  //         >
  //           {props.data.length !== 0 &&
  //             props.data.map((item: any, index: any) => {
  //               return (
  //                 <SwiperSlide
  //                   className="carouselItem"
  //                   key={`banner--key-${index}`}
  //                 >
  //                   <button
  //                     key={item.id}
  //                     onClick={(e) => {
  //                       handleSelectedCenterDiamond(e, item);
  //                     }}
  //                     id={item.id}
  //                     className={`${parseInt(centerDiamondSize) === parseInt(item.id)
  //                       ? "config-selected-value"
  //                       : ""
  //                       } px-7 py-3 w-full `}
  //                   >
  //                     <Tooltip
  //                       title={
  //                         <div className="tooltip-content">
  //                           <div className="">
  //                             <img
  //                               src={`${process.env.NEXT_PUBLIC_IMG_URL}${item.image_path}`}
  //                               style={{ scale: 2 }}
  //                               className="mx-auto scale-2001"
  //                               width="50px"
  //                               height="50px"
  //                               id={item.id}
  //                             />
  //                           </div>
  //                         </div>
  //                       }
  //                       placement="right"
  //                       // arrow
  //                       classes={{ tooltip: "custom-tooltip" }}
  //                     >
  //                       <img
  //                         src={`${process.env.NEXT_PUBLIC_IMG_URL}${item.image_path}`}
  //                         style={{ scale: 2 }}
  //                         className="mx-auto scale-2001"
  //                         height={25}
  //                         width={25}
  //                         id={item.id}
  //                       />
  //                     </Tooltip>
  //                     <div id={item.id}>{item.value}</div>
  //                   </button>
  //                 </SwiperSlide>
  //               );
  //             })}
  //         </Carousel>
  //       </div>
  //       {/* <div className="space-x-2 flex">
  //         {props.data.map((item: any) => {
  //           return (
  //             <button
  //               key={item.id}
  //               onClick={(e) => {
  //                 handleSelectedCenterDiamond(e, item);
  //               }}
  //               id={item.id}
  //               className={`${parseInt(centerDiamondSize) === parseInt(item.id)
  //                 ? "config-selected-value"
  //                 : ""
  //                 }  px-7 py-3 w-full`}
  //             >
  //               <Tooltip
  //                 title={
  //                   <div className="tooltip-content">
  //                     <div className="">
  //                       <img
  //                         src={`${process.env.NEXT_PUBLIC_IMG_URL}${item.image_path}`}
  //                         className="mx-auto scale-2001"
  //                         style={{ scale: 2 }}
  //                         width="50px"
  //                         height="50px"
  //                         id={item.id}
  //                       />
  //                     </div>
  //                   </div>
  //                 }
  //                 placement="right"
  //                 // arrow
  //                 classes={{ tooltip: "custom-tooltip" }}
  //               >
  //                 <img
  //                   src={`${process.env.NEXT_PUBLIC_IMG_URL}${item.image_path}`}
  //                   className="mx-auto scale-2001"
  //                   style={{ scale: 2 }}
  //                   width="50px"
  //                   height="50px"
  //                   id={item.id}
  //                 />
  //               </Tooltip>

  //               <div id={item.id}>{item.value}</div>
  //             </button>
  //           );
  //         })}
  //       </div> */}
  //     </div>
  //   </>
  // ) : props.page !== "version2" ? (
  //   <>
  //     <div className="">
  //       <p className="font-bold">
  //         Center Diamond Size:{" "}
  //         <span className="" style={{ color: props.colorUI }}>
  //           {defaultDiamondSize[0]?.name}
  //         </span>
  //       </p>
  //       <div className="flex flex-colum gap-8 my-2 ">
  //         {props.data.map((item: any) => {
  //           return (
  //             <div
  //               className={`justify-center cursor-pointer py-4 px-5 item`}
  //               key={item.id}
  //               onClick={(e) => {
  //                 handleSelectedCenterDiamond(e, item);
  //               }}
  //               id={item.id}
  //             >
  //               <Tooltip
  //                 title={
  //                   <div className="tooltip-content">
  //                     <div className="">
  //                       <img
  //                         src={`${process.env.NEXT_PUBLIC_IMG_URL}${item.image_path}`}
  //                         className="mx-auto "
  //                         width="50px"
  //                         height="50px"
  //                         id={item.id}
  //                       />
  //                     </div>
  //                   </div>
  //                 }
  //                 placement="right"
  //                 // arrow
  //                 classes={{ tooltip: "custom-tooltip" }}
  //               >
  //                 <img
  //                   src={`${process.env.NEXT_PUBLIC_IMG_URL}${item.image_path}`}
  //                   className="mx-auto"
  //                   width="30px"
  //                   height="30px"
  //                   id={item.id}
  //                 />
  //               </Tooltip>

  //               <p className="flex justify-center" id={item.id}>
  //                 {item.value}
  //               </p>
  //               {parseInt(centerDiamondSize) === parseInt(item.id) && (
  //                 <div className="flex justify-center ">
  //                   <div
  //                     className="selected-border"
  //                     style={{ borderColor: props.colorUI }}
  //                   ></div>
  //                 </div>
  //               )}
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   </>
  // ) : (
  //   <>
  //     <div className="">
  //       <div className="flex flex-colum">
  //         {props.data.map((item: any) => {
  //           return (
  //             <div
  //               className={`justify-center cursor-pointer w-1/5 py-1.5 px-3 item`}
  //               key={item.id}
  //               onClick={(e) => {
  //                 handleSelectedCenterDiamond(e, item);
  //               }}
  //               id={item.id}
  //             >
  //               <Tooltip
  //                 title={
  //                   <div className="tooltip-content">
  //                     <div className="">
  //                       <img
  //                         src={`${process.env.NEXT_PUBLIC_IMG_URL}${item.image_path}`}
  //                         className="mx-auto "
  //                         width="50px"
  //                         height="50px"
  //                         id={item.id}
  //                       />
  //                     </div>
  //                   </div>
  //                 }
  //                 placement="right"
  //                 // arrow
  //                 classes={{ tooltip: "custom-tooltip" }}
  //               >
  //                 <img
  //                   src={`${process.env.NEXT_PUBLIC_IMG_URL}${item.image_path}`}
  //                   className="mx-auto"
  //                   width="20px"
  //                   height="20px"
  //                   id={item.id}
  //                 />
  //               </Tooltip>

  //               <p className="flex justify-center render-2-fontsize" id={item.id}>
  //                 {item.value}
  //               </p>
  //               {parseInt(centerDiamondSize) === parseInt(item.id) && (
  //                 <div className="flex justify-center">
  //                   <div
  //                     className="selected-border absolute width-render-2"
  //                     style={{ borderColor: props.colorUI }}
  //                   ></div>
  //                 </div>
  //               )}
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   </>
  // )
};

export default CenterDiamondSize;
