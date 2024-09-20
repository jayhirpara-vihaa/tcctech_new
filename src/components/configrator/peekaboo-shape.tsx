import Image from "next/image";
import React, { useState } from "react";

const PeekabooShape: React.FC<any> = (props: any) => {
  const [peekabooShape, setPeekabooShape] = useState("Single Halo");
  const handleSelectedCenterDiamond = (e: any, item: any) => {
    setPeekabooShape(e.target.id);
    props.value(item);
  };

  return (
    <div className="mt-3">
      <span className="TCC-config-title">{props.data.title}: </span>
      <span>{peekabooShape}</span>
      <div className="space-x-2 flex">
        {props.data.component.map((item: any) => {
          return (
            <button
              onClick={(e) => {
                handleSelectedCenterDiamond(e, item);
              }}
              id={item.name}
              className={`border ${
                peekabooShape === item.name
                  ? "border-orange-300"
                  : "border-gray-300"
              }  px-7 py-3`}
            >
              <Image
                src={item.image}
                height={50}
                width={70}
                alt=""
                id={item.name}
              />
              <div id={item.name}>{item.name}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PeekabooShape;
