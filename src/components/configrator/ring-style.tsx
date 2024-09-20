import React, { useState } from "react";

const RingStyle: React.FC<any> = (props: any) => {
  const [selectedRingStyle, setSelectedRingStyle] = useState("Parker Classic");

  const handleSelectedRingStyle = (e: any) => {
    setSelectedRingStyle(e.target.id);
    props.value(e.target.id)
  };

  return (
    <div className="mt-3">
      <span className="TCC-config-title TFArrow">{props.data.title}: </span>
      <span>{selectedRingStyle}</span>
      <div className="space-x-2">
        {props.data.component.map((item: any) => {
          return (
            <button
              onClick={(e) => {
                handleSelectedRingStyle(e);
              }}
              id={item.name}
              className="border border-gray-300 focus:outline-none focus:border-orange-300 px-7 py-3 ..."
            >
              <div id={item.name}>{item.name}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RingStyle;
