import Carousel from "@components/ui/carousel/carousel";
import React, { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";

const MetalComponent: React.FC<any> = (props: any) => {

  const [selectedMetal, setSelectedMetal] = useState(
    props.selectedValue && props.selectedValue.id
  );

  useEffect(() => {
    setSelectedMetal(props.selectedValue && props.selectedValue.id);
  }, [props]);

  const handleSelectedMetal = (e: any, item: any) => {
    setSelectedMetal(item.id);
    props.value(item);
  };

  const defaultMetalComponent = props && props.data && props.data.filter(
    (t: any) => t.id === selectedMetal
  );

  useEffect(() => {
    if (defaultMetalComponent && defaultMetalComponent.length > 0 && defaultMetalComponent[0] != undefined) {
      props.value(defaultMetalComponent[0]);
    }
  }, [selectedMetal]);

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
        {props.data && props.data.length !== 0 &&
          props.data.map((item: any, index: any) => {
            return (
              <SwiperSlide
                className="carouselItem"
                key={`banner--key-${index}`}
              >
                <button
                  key={item.id}
                  onClick={(e) => {
                    handleSelectedMetal(e, item);
                  }}
                  id={item.id}
                  className={`${parseInt(selectedMetal) === parseInt(item.id)
                    ? (props.className?.buttonSelected)
                    : ""
                    } ${props.className?.mainButton}`}
                >
                  {props.className?.buttonSelected === undefined ?
                    <div className={props.className?.divmargin} id={item.id}>{item.name}</div>
                    : <div className={props.className?.divmargin} id={item.id}>{item.name}</div>
                  }
                  {
                    props.className?.buttonSelected === undefined ?
                      <>

                        {selectedMetal?.name == item.name && (

                          <div className={props.className?.selectedBorder.maindiv}>
                            <div
                              className={props.className?.selectedBorder.secdiv}
                              style={{ borderColor: props.colorUI }}
                            ></div>
                          </div>
                        )}
                      </> :
                      <></>
                  }
                </button>
              </SwiperSlide>
            );
          })}
      </Carousel>
    </div>
  )
  // return props.page !== "version1" && props.page !== "version2" ? (
  //   <div className="mt-3">
  //     <span className="TCC-config-title TFArrow">Metal: </span>
  //     <span className="TFArrowprice-2-font" style={{ background: `${webConfigBgColor}`, backgroundClip: "text", WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text" }}>
  //       {defaultMetalComponent[0]?.sort_code !== "PL" ?
  //         <>
  //           {defaultMetalComponent[0]?.sort_code} {defaultMetalComponent[0]?.name}
  //         </> : <>
  //           {defaultMetalComponent[0]?.name}
  //         </>
  //       }

  //       {/* {!isNaN(selectedMetal) ? <span> kt Gold</span> : ""} */}
  //     </span>
  //     <div className="space-x-2 flex">
  //       {/* 14k GOld */}
  //       {props.data.map((item: any) => {
  //         return (
  //           <button
  //             key={item.id}
  //             id={item.id}
  //             className={`${parseInt(selectedMetal) === parseInt(item.id)
  //               ? "config-selected-value"
  //               : ""
  //               }  px-3 py-3 w-full`}
  //             onClick={(e) => {
  //               handleSelectedMetal(e, item);
  //             }}
  //           >
  //             <div className="font-bold" id={item.id}>{item.sort_code}</div>
  //             <div id={item.id}>{item.name}</div>
  //           </button>
  //         );
  //       })}
  //     </div>
  //   </div>
  // ) : props.page !== "version2" ? (
  //   <div className="">
  //     <p className="font-bold">
  //       Metal:{" "}
  //       <span className="text-" style={{ color: props.colorUI }}>
  //         {selectedMetal.name}{" "}
  //         {!isNaN(selectedMetal) ? <span> kt Gold</span> : ""}
  //       </span>
  //     </p>
  //     <div className="flex flex-colum gap-8 my-2 ">
  //       {props.data.map((item: any) => {
  //         return (
  //           <div
  //             className={`justify-center cursor-pointer py-4 px-5 item`}
  //             key={item.id}
  //             id={item.id}
  //             onClick={(e) => {
  //               handleSelectedMetal(e, item);
  //             }}
  //           >
  //             <p className="text-center" id={item.id}>
  //               {item.name}
  //             </p>
  //             {parseInt(selectedMetal) === parseInt(item.id) && (
  //               <div className="flex justify-center ">
  //                 <div
  //                   className="selected-border "
  //                   style={{ borderColor: props.colorUI }}
  //                 ></div>
  //               </div>
  //             )}
  //           </div>
  //         );
  //       })}
  //     </div>
  //   </div>
  // ) : (
  //   <>
  //     <div className="">
  //       <div className="flex flex-colum">
  //         {props.data.map((item: any) => {
  //           return (
  //             <div
  //               className={`justify-center cursor-pointer w-1/5 py-1.5 px-3 item `}
  //               key={item.id}
  //               id={item.id}
  //               onClick={(e) => {
  //                 handleSelectedMetal(e, item);
  //               }}
  //             >
  //               <p className="text-center render-2-fontsize" id={item.id}>
  //                 {item.name}
  //               </p>
  //               {parseInt(selectedMetal) === parseInt(item.id) && (
  //                 <div className="flex justify-center ">
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

export default MetalComponent;
