import { Tooltip } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const SideSettings: React.FC<any> = (props: any) => {
  const [sideSettings, setSideSettings] = useState(
    props.selectedValue && props.selectedValue.id
  );

  const [sideSettingList, setSideSettingList] = useState(props.data);
  const webConfigBgColor = `linear-gradient(${process.env.NEXT_PUBLIC_MAZZCONFIG_BG_COLOR})`;
  const handleSelectedCenterDiamond = (e: any, item: any) => {
    setSideSettings(e.target.id);
    props.value(item);
  };

  useEffect(() => {
    setSideSettingList(
      props &&
        props?.data &&
        props?.data?.filter((t: any) => t.id_shank == props.filter)
    );
  }, [props.filter]);

  useEffect(() => {
    setSideSettings(props?.selectedValue && props?.selectedValue?.id);
  }, [props]);

  const defaultSideSettings =
    props &&
    props.data &&
    props.data.filter((t: any) => parseInt(t.id) === parseInt(sideSettings));
  useEffect(() => {
    if (defaultSideSettings && defaultSideSettings.length > 0)
      props.value(defaultSideSettings[0]);
  }, [sideSettings]);

  return (
    <div className="space-x-2 flex">
      {props.data &&
        props.data.length !== 0 &&
        props.data.map((item: any) => {
          return (
            <button
              key={item.id}
              onClick={(e) => {
                handleSelectedCenterDiamond(e, item);
              }}
              id={item.id}
              className={`${
                parseInt(sideSettings) === parseInt(item.id)
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
                  width={props.className?.imageData.width}
                  height={props.className?.imageData.height}
                  id={item.id}
                />
              </Tooltip>
              {props.className?.buttonSelected === undefined ? (
                <div
                  className={props.className?.divmargin}
                  style={{ whiteSpace: "nowrap" }}
                  id={item.id}
                >
                  {item.name}
                </div>
              ) : (
                <div
                  className={props.className?.divmargin}
                  style={{ whiteSpace: "nowrap" }}
                  id={item.id}
                >
                  {item.name}
                </div>
              )}

              {props.className?.buttonSelected === undefined ? (
                <>
                  {parseInt(sideSettings) === parseInt(item.id) && (
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
  //     <span className="TCC-config-title TFArrow">Ring Side Settings: </span>
  //     <span className="TFArrowprice-2-font" style={{ background: `${webConfigBgColor}`, backgroundClip: "text", WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text" }}>{defaultSideSettings[0]?.name}</span>
  //     <div className="space-x-2 flex">
  //       {props.data.length !== 0 &&
  //         props.data.map((item: any) => {
  //           return (
  //             <button
  //               key={item.id}
  //               onClick={(e) => {
  //                 handleSelectedCenterDiamond(e, item);
  //               }}
  //               id={item.id}
  //               className={`${parseInt(sideSettings) === parseInt(item.id)
  //                 ? "config-selected-value"
  //                 : ""
  //                 }  px-5 py-3 w-full`}
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
  //                         src={`${process.env.NEXT_PUBLIC_IMG_URL}${item.image_path}`}
  //                         className="mx-auto scale-2001"
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
  //                   height={25}
  //                   width={25}
  //                   id={item.id}
  //                 />
  //               </Tooltip>

  //               <div className="whitespace-nowrap" id={item.id}>{item.name}</div>
  //             </button>
  //           );
  //         })}
  //     </div>
  //   </div>
  // ) : props.page !== "version2" ? (
  //   <div className="">
  //     <p className="font-bold">
  //       Ring Side Settings:{" "}
  //       <span className="text-" style={{ color: props.colorUI }}>
  //         {defaultSideSettings[0]?.name}
  //       </span>
  //     </p>
  //     <div className="flex flex-colum gap-8 my-2 ">
  //       {props.data.length !== 0 &&
  //         props.data.map((item: any) => {
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
  //                         id={item.id}
  //                         className="mx-auto "
  //                         width="80px"
  //                         height="80px"
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
  //                   width="50px"
  //                   height="50px"
  //                   className="mx-auto "
  //                 />
  //               </Tooltip>
  //               <p className="text-center">{item.name}</p>
  //               {parseInt(sideSettings) === parseInt(item.id) && (
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
  //     </div>
  //   </div>
  // ) : (
  //   <>
  //     <div className="">
  //       <div className="flex flex-colum">
  //         {props.data.length !== 0 &&
  //           props.data.map((item: any) => {
  //             return (
  //               <div
  //                 className={`justify-center cursor-pointer w-1/5 py-1.5 px-3 item`}
  //                 key={item.id}
  //                 onClick={(e) => {
  //                   handleSelectedCenterDiamond(e, item);
  //                 }}
  //                 id={item.id}
  //               >
  //                 <Tooltip
  //                   title={
  //                     <div className="tooltip-content">
  //                       <div className="">
  //                         <img
  //                           src={`${process.env.NEXT_PUBLIC_IMG_URL}${item.image_path}`}
  //                           id={item.id}
  //                           className="mx-auto "
  //                           width="50px"
  //                           height="50px"
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
  //                     width="20px"
  //                     height="20px"
  //                     className="mx-auto "
  //                   />
  //                 </Tooltip>
  //                 <p className="text-center render-2-fontsize">{item.name}</p>
  //                 {parseInt(sideSettings) === parseInt(item.id) && (
  //                   <div className="flex justify-center ">
  //                     <div
  //                       className="selected-border absolute width-render-2"
  //                       style={{ borderColor: props.colorUI }}
  //                     ></div>
  //                   </div>
  //                 )}
  //               </div>
  //             );
  //           })}
  //       </div>
  //     </div>
  //   </>
  // )
};

export default SideSettings;
