import { Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";

const CenterDiamond: React.FC<any> = (props: any) => {
  const [centerDiamondName, setCenterDiamondName] = useState(
    props.selectedValue && props.selectedValue.name
      ? props.selectedValue.name
      : ""
  );

  useEffect(() => {
    setCenterDiamondName(
      props.selectedValue && props.selectedValue.name
        ? props.selectedValue.name
        : ""
    );
  }, [props]);

  const handleSelectedCenterDiamond = (e: any, itmes: any) => {
    setCenterDiamondName(e.target.id);
    props.value(itmes);
  };

  return (
    <div className="space-x-2 flex">
      {props.data &&
        props.data.map((item: any) => {
          return (
            <button
              key={item.id}
              onClick={(e) => {
                handleSelectedCenterDiamond(e, item);
              }}
              id={item.name}
              className={`${centerDiamondName === item.name ? props.className?.buttonSelected : ""
                } ${props.className?.mainButton}`}
            >
              <Tooltip
                title={
                  <div className="tooltip-content">
                    <div className="">
                      <img
                        src={item.image}
                        id={item.name}
                        className={props.className?.imageStyle}
                        width={props.className?.tooltipData.width}
                        height={props.className?.tooltipData.height}
                      />
                    </div>
                  </div>
                }
                placement="right"
                // arrow
                classes={{ tooltip: "custom-tooltip" }}
              >
                <img
                  src={item.image}
                  id={item.name}
                  width={props.className?.imageData.width}
                  height={props.className?.imageData.width}
                  className={props.className?.imageStyle}
                />
              </Tooltip >
              <div className={props.className?.fontStyle} id={item.name}>{item.name}</div>
              {props.className?.buttonSelected === undefined ?
                <>
                  {centerDiamondName == item.name && (
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
  //   <div className="">
  //     <span className="TCC-config-title TFArrow">Center Diamond: </span>
  //     <span className="TFArrow price-2-font" style={{ background: `${webConfigBgColor}`, backgroundClip: "text", WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text" }}>{centerDiamondName}</span>
  //     <div className="space-x-2 flex">
  //       {props.data &&
  //         props.data.map((item: any) => {

  //           return (
  //             <button
  //               key={item.id}
  //               onClick={(e) => {
  //                 handleSelectedCenterDiamond(e, item);
  //               }}
  //               id={item.name}
  //               className={`${centerDiamondName === item.name ? "config-selected-value" : ""
  //                 } px-7 py-3 w-full`}
  //             >
  //               <Tooltip
  //                 title={
  //                   <div className="tooltip-content">
  //                     <div className="">
  //                       <img
  //                         src={item.image}
  //                         id={item.name}
  //                         className="mx-auto "
  //                         width="50px"
  //                         height="50px"
  //                       />
  //                     </div>
  //                   </div>
  //                 }
  //                 placement="right"
  //                 // arrow
  //                 classes={{ tooltip: "custom-tooltip" }}
  //               >
  //                 <img
  //                   src={item.image}
  //                   id={item.name}
  //                   width="25px"
  //                   height="25px"
  //                   className="mx-auto "
  //                 />
  //               </Tooltip>
  //               <div id={item.name}>{item.name}</div>
  //             </button>
  //           );
  //         })}
  //     </div>
  //   </div>
  // ) : props.page !== "version2" ? (
  //   <>
  //     <div className="">
  //       <p className="font-bold">
  //         Center Diamond:{" "}
  //         <span className="text-PinkProduct" style={{ color: props.colorUI }}>
  //           {centerDiamondName}
  //         </span>
  //       </p>
  //       <div className="flex flex-colum gap-8 my-2 ">
  //         {props.data.component.map((item: any) => {
  //           return (
  //             <div
  //               className={`justify-center cursor-pointer py-4 px-5 item`}
  //               key={item.id}
  //               onClick={(e) => {
  //                 handleSelectedCenterDiamond(e, item);
  //               }}
  //               id={item.name}
  //             >
  //               <Tooltip
  //                 title={
  //                   <div className="tooltip-content">
  //                     <div className="">
  //                       <img
  //                         src={item.image}
  //                         id={item.name}
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
  //                   src={item.image}
  //                   id={item.name}
  //                   width="50px"
  //                   height="50px"
  //                   className="mx-auto "
  //                 />
  //               </Tooltip>
  //               <p className="text-center">{item.name}</p>
  //               {centerDiamondName == item.name && (
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
  //       <div className="flex flex-column">
  //         {props.data.component.map((item: any) => {
  //           return (
  //             <div
  //               className={`justify-center cursor-pointer w-1/5 py-1.5 px-3 item`}
  //               key={item.id}
  //               onClick={(e) => {
  //                 handleSelectedCenterDiamond(e, item);
  //               }}
  //               id={item.name}
  //             >
  //               <Tooltip
  //                 title={
  //                   <div className="tooltip-content">
  //                     <div className="">
  //                       <img
  //                         src={item.image}
  //                         id={item.name}
  //                         className="mx-auto "
  //                         width="50px"
  //                         height="50px"
  //                       />
  //                     </div>
  //                   </div>
  //                 }
  //                 placement="right"
  //                 // arrow
  //                 classes={{ tooltip: "custom-tooltip" }}
  //               >
  //                 <img
  //                   src={item.image}
  //                   id={item.name}
  //                   width="25px"
  //                   height="25px"
  //                   className="mx-auto "
  //                 />
  //               </Tooltip>
  //               <p className="text-center render-2-fontsize">{item.name}</p>
  //               {centerDiamondName == item.name && (
  //                 <div className="flex justify-center ">
  //                   <div
  //                     className="selected-border width-render-2"
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

export default CenterDiamond;
