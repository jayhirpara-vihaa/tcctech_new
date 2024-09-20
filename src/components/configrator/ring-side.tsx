import React, { useEffect, useState } from "react";

const RingSide: React.FC<any> = (props: any) => {
  const [selectedRingSide, setSelectedRingSide] = useState("Plain");

  const handleSelectedRingSide = (e: any) => {
    setSelectedRingSide(e.target.id);
    props.value(e.target.id);
  };

  const defaultRingSide = props.data.component.filter(
    (t: any) => t.name === selectedRingSide
  );
  useEffect(() => {
    props.value(defaultRingSide[0]);
  }, [selectedRingSide]);

  return (
    <div className="mt-3">
      <span className="TCC-config-title TFArrow">{props.data.title}: </span>
      <span>{selectedRingSide}</span>
      <div className="space-x-2">
        {props.data.component.map((item: any) => {
          return (
            <button
              onClick={(e) => {
                handleSelectedRingSide(e);
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

export default RingSide;
