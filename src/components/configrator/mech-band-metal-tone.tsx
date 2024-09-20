import Carousel from "@components/ui/carousel/carousel";
import React, { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";

const MatchBandMetalTone: React.FC<any> = (props: any) => {
  const [matchBandTone, setmatchBandTone] = useState(
    props.selectedValue && props.selectedValue.id
  );

  const imageURL = process.env.NEXT_PUBLIC_IMG_URL;

  const handlematchBandTone = (e: any, item: any) => {
    setmatchBandTone(e.target.id);
    props.value(item);
  };

  const defaultBandColor =
    props &&
    props.data &&
    props.data.filter((t: any) => parseInt(t.id) === parseInt(matchBandTone));
  useEffect(() => {
    setmatchBandTone(props?.selectedValue && props?.selectedValue.id);
  }, [props]);

  useEffect(() => {
    if (defaultBandColor && defaultBandColor.length > 0)
      props.value(defaultBandColor[0]);
  }, [matchBandTone]);

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
    <div className="space-x-2 flex">
      {props.data
        .filter((t: any) => t.id_metal == 1)
        .map((item: any) => {
          return (
            <button
              key={item.id}
              id={item.id}
              className={`border ${
                parseInt(matchBandTone) === parseInt(item.id)
                  ? props.className?.buttonSelected
                  : ""
              } ${props.className?.mainButton}`}
              onClick={(e) => {
                handlematchBandTone(e, item);
              }}
            >
              <img
                id={item.id}
                src={`${imageURL}${item.image_path}`}
                className={props.className?.imageData.scaleStyle}
                width={props.className?.imageData.width}
                height={props.className?.imageData.height}
                alt=""
              />

              <div className={props.className?.divmargin} id={item.id}>
                {item.name}
              </div>
              {props.className?.buttonSelected === undefined ? (
                <>
                  {parseInt(matchBandTone) === parseInt(item.id) && (
                    <div className={props.className?.selectedBorder.maindiv}>
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
          );
        })}
    </div>
  );

  // return props.page !== "version1" && props.page !== "version2" ? (
  //   <div className="mt-3">
  //     <span className="TCC-config-title TFArrow">Band Metal: </span>
  //     <span className="TFArrowprice-2-font" style={{ background: `${webConfigBgColor}`, backgroundClip: "text", WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text" }}>{defaultBandColor[0]?.name}</span>
  //     <div className="space-x-2 flex">
  //       {props.data.map((item: any) => {
  //         return (
  //           <button
  //             key={item.id}
  //             id={item.id}
  //             className={`border ${parseInt(matchBandTone) === parseInt(item.id)
  //               ? "config-selected-value"
  //               : ""
  //               }  px-3 py-3 w-full`}
  //             onClick={(e) => {
  //               handlematchBandTone(e, item);
  //             }}
  //           >
  //             <Image
  //               id={item.id}
  //               src={`${imageURL}${item.image_path}`}
  //               height={20}
  //               width={40}
  //               alt=""
  //             />
  //             <div id={item.id}>{item.name}</div>
  //           </button>
  //         );
  //       })}
  //     </div>
  //   </div>
  // ) : props.page !== "version2" ? (
  //   <div className="">
  //     <p className="font-bold">
  //       Band Metal:&nbsp;
  //       <span className="text-" style={{ color: props.colorUI }}>
  //         {defaultBandColor[0]?.name}
  //       </span>
  //     </p>
  //     <div className="flex flex-colum gap-8 my-2 text-center">
  //       {props.data.map((item: any) => {
  //         return (
  //           <div
  //             className={`justify-center cursor-pointer py-4 px-5 item`}
  //             key={item.id}
  //             id={item.id}
  //           >
  //             <Image
  //               id={item.id}
  //               src={`${imageURL}${item.image_path}`}
  //               height={20}
  //               width={40}
  //               alt=""
  //             />
  //             {/* <Tooltip
  //               title={
  //                 <div className="tooltip-content">
  //                   <div className="">
  //                     <img
  //                       id={item.id}
  //                       src={item.image}
  //                       className="mx-auto "
  //                       width="80px"
  //                       height="80px"
  //                     />
  //                   </div>
  //                 </div>
  //               }
  //               placement="right"
  //               classes={{ tooltip: "custom-tooltip" }}
  //             >
  //               <img
  //                 id={item.id}
  //                 src={item.image}
  //                 className="mx-auto "
  //                 width="50px"
  //                 height="50px"
  //                 onClick={(e) => {
  //                   handlematchBandTone(e, item);
  //                 }}
  //               />
  //             </Tooltip> */}
  //             <p className="text-center">{item.name}</p>
  //             {parseInt(matchBandTone) === parseInt(item.id) && (
  //               <div className="flex justify-center ">
  //                 <div
  //                   className="selected-border"
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
  //       <div className="flex flex-colum text-center">
  //         {props.data.map((item: any) => {
  //           return (
  //             <div
  //               onClick={(e) => {
  //                 handlematchBandTone(e, item)
  //               }}
  //               className={`justify-center cursor-pointer w-1/5 py-1.5 px-3item`}
  //               key={item.id}
  //               id={item.id}
  //             >
  //               <Image
  //                 id={item.id}
  //                 src={`${imageURL}${item.image_path}`}
  //                 height={10}
  //                 width={30}
  //                 alt=""
  //               />
  //               <p className="text-center render-2-fontsize">{item.name}</p>
  //               {parseInt(matchBandTone) === parseInt(item.id) && (
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

export default MatchBandMetalTone;
