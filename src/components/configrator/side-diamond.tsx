import Image from "next/image";
import React, { useState } from "react";

const SideDiamond: React.FC<any> = (props: any) => {
  const [sideDiamond, setSideDiamond] = useState("Diamond");
  const handleSelectedCenterDiamond = (e: any, item: any) => {
    setSideDiamond(e.target.id);
    props.value(item);
  };

  return (
    <div className="mt-3">
      <span className="TCC-config-title TFArrow">{props.data.title}: </span>
      <span>{sideDiamond}</span>
      <div className="space-x-2 flex">
        {props.data.component.map((item: any) => {
          return (
            <button
              onClick={(e) => {
                handleSelectedCenterDiamond(e, item);
              }}
              id={item.name}
              className={`border ${sideDiamond === item.name
                  ? "border-orange-300"
                  : "border-gray-300"
                }  px-7 py-3`}
            >
              <Image
                src={item.image}
                height={50}
                width={50}
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

export default SideDiamond;
