import { Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";

const RingHead: React.FC<any> = (props: any) => {
  const [ringHead, setRingHead] = useState(
    props.selectedValue && props.selectedValue.id
  );
  const handleSelectedCenterDiamond = (e: any, item: any) => {
    setRingHead(e.target.id);
    props.value(item);
  };

  const defaultRingHead = props && props.data && props.data.filter(
    (t: any) => parseInt(t.id) === parseInt(ringHead)
  );

  useEffect(() => {
    if (defaultRingHead && defaultRingHead.length > 0)
      props.value(defaultRingHead[0]);
  }, [ringHead]);

  useEffect(() => {
    setRingHead(props.selectedValue && props.selectedValue.id);
  }, [props]);

  return (
    <div className="space-x-2 flex">
      {props.data.map((item: any) => {
        return (
          <button
            key={item.id}
            onClick={(e) => {
              handleSelectedCenterDiamond(e, item);
            }}
            id={item.id}
            className={`${parseInt(ringHead) === parseInt(item.id)
              ? (props.className?.buttonSelected)
              : ""
              } ${props.className?.mainButton}`}
          >
            <Tooltip
              title={
                <div className="tooltip-content">
                  <div className="">
                    <img
                      style={{ scale: 3 }}
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
                id={item.id}
                className={props.className?.tooltipData.scaleStyle}
                width={props.className?.imageData.height}
                height={props.className?.imageData.height}
                onClick={(e) => {
                  handleSelectedCenterDiamond(e, item);
                }}
              />
            </Tooltip>
            {props.className?.buttonSelected === undefined ?
              <div className={props.className?.divmargin} style={{ whiteSpace: "nowrap" }} id={item.id}>{item.name}</div> : <div className={props.className?.divmargin} style={{ whiteSpace: "nowrap" }} id={item.id}>{item.name}</div>}
            {props.className?.buttonSelected === undefined ?
              <>
                {parseInt(ringHead) === parseInt(item.id) && (
                  <div className={props.className?.selectedBorder.maindiv}>
                    <div
                      className={props.className?.selectedBorder.secdiv}
                      style={{ borderColor: props.colorUI }}
                    ></div>
                  </div>
                )}
              </> :
              <></>}
          </button>
        );
      })}
    </div>
  )
  // return props.page !== "version1" && props.page !== "version2" ? (
  //   <>
  //     <div className="mt-3">
  //       <span className="TCC-config-title TFArrow">Ring Head: </span>
  //       <span className="TFArrowprice-2-font" style={{ background: `${webConfigBgColor}`, backgroundClip: "text", WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text" }}>{defaultRingHead[0]?.name}</span>
  //       <div className="space-x-2 flex">
  //         {props.data.map((item: any) => {
  //           return (
  //             <button
  //               key={item.id}
  //               onClick={(e) => {
  //                 handleSelectedCenterDiamond(e, item);
  //               }}
  //               id={item.id}
  //               className={`${parseInt(ringHead) === parseInt(item.id)
  //                 ? "config-selected-value"
  //                 : ""
  //                 }  px-3 py-3 rounded-lg w-full`}
  //             >
  //               {/* <Image
  //                 src={`${process.env.NEXT_PUBLIC_IMG_URL}${item.image_path}`}
  //                 height={50}
  //                 width={50}
  //                 alt=""
  //                 id={item.id}
  //               /> */}
  //               <Tooltip
  //                 title={
  //                   <div className="tooltip-content">
  //                     <div className="">
  //                       <img
  //                         style={{ scale: 3 }}
  //                         src={`${process.env.NEXT_PUBLIC_IMG_URL}${item.image_path}`}
  //                         className="mx-auto scale-150"
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
  //                   id={item.id}
  //                   style={{ scale: 2 }}
  //                   className="mx-auto scale-150"
  //                   width="25px"
  //                   height="25px"
  //                   onClick={(e) => {
  //                     handleSelectedCenterDiamond(e, item);
  //                   }}
  //                 />
  //               </Tooltip>
  //               <div className="whitespace-nowrap" id={item.id}>{item.name}</div>
  //             </button>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   </>
  // ) : props.page !== "version2" ? (
  //   <>
  //     <div className="">
  //       <p className="font-bold">
  //         Ring Head:{" "}
  //         <span className="text-" style={{ color: props.colorUI }}>
  //           {defaultRingHead[0]?.name}
  //         </span>
  //       </p>
  //       <div className="flex flex-colum gap-8 my-2 ">
  //         {props.data.map((item: any) => {
  //           return (
  //             <>
  //               <div
  //                 className={`justify-center cursor-pointer py-4 px-5 item`}
  //                 key={item.id}
  //                 id={item.id}
  //               >
  //                 <Tooltip
  //                   title={
  //                     <div className="tooltip-content">
  //                       <div className="">
  //                         <img
  //                           style={{ scale: 2 }}
  //                           src={`${process.env.NEXT_PUBLIC_IMG_URL}${item.image_path}`}
  //                           className="mx-auto"
  //                           width="80px"
  //                           height="80px"
  //                           id={item.id}
  //                         />
  //                       </div>
  //                     </div>
  //                   }
  //                   placement="right"
  //                   // arrow
  //                   classes={{ tooltip: "custom-tooltip" }}
  //                 >
  //                   <img
  //                     src={`${process.env.NEXT_PUBLIC_IMG_URL}${item.image_path}`}
  //                     id={item.id}
  //                     style={{ scale: 2 }}
  //                     className="mx-auto"
  //                     width="50px"
  //                     height="50px"
  //                     onClick={(e) => {
  //                       handleSelectedCenterDiamond(e, item);
  //                     }}
  //                   />
  //                 </Tooltip>
  //                 <p className="text-center">{item.name}</p>
  //                 {parseInt(ringHead) === parseInt(item.id) && (
  //                   <div className="flex justify-center ">
  //                     <div
  //                       className="selected-border"
  //                       style={{ borderColor: props.colorUI }}
  //                     ></div>
  //                   </div>
  //                 )}
  //               </div>
  //             </>
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
  //             <>
  //               <div
  //                 className={`justify-center cursor-pointer w-1/5 py-1.5 px-3 item`}
  //                 key={item.id}
  //                 id={item.id}
  //               >
  //                 <Tooltip
  //                   title={
  //                     <div className="tooltip-content">
  //                       <div className="">
  //                         <img
  //                           style={{ scale: 2 }}
  //                           src={`${process.env.NEXT_PUBLIC_IMG_URL}${item.image_path}`}
  //                           className="mx-auto"
  //                           width="50px"
  //                           height="50px"
  //                           id={item.id}
  //                         />
  //                       </div>
  //                     </div>
  //                   }
  //                   placement="right"
  //                   // arrow
  //                   classes={{ tooltip: "custom-tooltip" }}
  //                 >
  //                   <img
  //                     src={`${process.env.NEXT_PUBLIC_IMG_URL}${item.image_path}`}
  //                     id={item.id}
  //                     style={{ scale: 2 }}
  //                     className="mx-auto"
  //                     width="20px"
  //                     height="20px"
  //                     onClick={(e) => {
  //                       handleSelectedCenterDiamond(e, item);
  //                     }}
  //                   />
  //                 </Tooltip>
  //                 <p className="text-center render-2-fontsize">{item.name}</p>
  //                 {parseInt(ringHead) === parseInt(item.id) && (
  //                   <div className="flex justify-center ">
  //                     <div
  //                       className="selected-border absolute width-render-2"
  //                       style={{ borderColor: props.colorUI }}
  //                     ></div>
  //                   </div>
  //                 )}
  //               </div>
  //             </>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   </>
  // )
};

export default RingHead;
