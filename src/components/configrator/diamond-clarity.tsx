import React, { useEffect, useState } from "react";

const DiamondClarity: React.FC<any> = (props: any) => {
  const [selectedClarity, setSelectedClarity] = useState(props.selectedValue);

  const handleClarity = (e: any, item: any) => {
    setSelectedClarity(item);
    props.value(item);
  };

  const defaultComponent = props.data.filter(
    (t: any) =>
      parseInt(t.id_color) === parseInt(selectedClarity?.id_color) &&
      parseInt(t.id_clarity) === parseInt(selectedClarity?.id_clarity)
  );

  useEffect(() => {
    if (defaultComponent[0] != undefined) {
      props.value(defaultComponent[0]);
    }
  }, [selectedClarity]);

  useEffect(() => {
    setSelectedClarity(props.selectedValue);
  }, [props]);

  return props.page !== "version1" && props.page !== "version2" ? (
    <div className="mt-3">
      <span className="TCC-config-title TFArrow">Diamond Quality: </span>
      <span>
        {defaultComponent.color_name} / {defaultComponent.clarity_name}
      </span>
      <div className="space-x-2 flex">
        {/* 14k GOld */}
        {props.data.map((item: any) => {
          return (
            <button
              key={item.id}
              id={item.id}
              className={`${parseInt(selectedClarity?.id_clarity) ===
                parseInt(item.id_clarity) &&
                parseInt(selectedClarity.id_color) === parseInt(item.id_color)
                ? "config-selected-value"
                : ""
                }  px-3 py-3 w-full`}
              onClick={(e) => {
                handleClarity(e, item);
              }}
            >
              <div id={item.id}>
                {item.color_name} / {item.clarity_name}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  ) : props.page !== "version2" ? (
    <div className="">
      <p className="font-bold">
        Diamond Quality:{" "}
        <span className="" style={{ color: props.colorUI }}>
          {defaultComponent.color_name} / {defaultComponent.clarity_name}
        </span>
      </p>
      <div className="flex flex-colum gap-8 my-2 ">
        {props.data.map((item: any) => {
          return (
            <div
              className={`justify-center cursor-pointer py-4 px-5 item`}
              key={item.id}
              id={item.id}
              onClick={(e) => {
                handleClarity(e, item);
              }}
            >
              <p className="text-center" id={item.id}>
                {item.color_name} / {item.clarity_name}
              </p>
              {parseInt(selectedClarity?.id_clarity) ===
                parseInt(item.id_clarity) &&
                parseInt(selectedClarity.id_color) ===
                parseInt(item.id_color) && (
                  <div className="flex justify-center ">
                    <div
                      className="selected-border"
                      style={{ borderColor: props.colorUI }}
                    ></div>
                  </div>
                )}
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div className="">
      <div className="flex flex-colum">
        {props.data.map((item: any) => {
          return (
            <div
              className={`justify-center cursor-pointer w-1/5 py-1.5 px-3 item`}
              key={item.id}
              id={item.id}
              onClick={(e) => {
                handleClarity(e, item);
              }}
            >
              <p className="text-center render-2-fontsize" id={item.id}>
                {item.color_name} / {item.clarity_name}
              </p>
              {parseInt(selectedClarity?.id_clarity) ===
                parseInt(item.id_clarity) &&
                parseInt(selectedClarity.id_color) ===
                parseInt(item.id_color) && (
                  <div className="flex justify-center ">
                    <div
                      className="selected-border absolute width-render-2"
                      style={{ borderColor: props.colorUI }}
                    ></div>
                  </div>
                )}
            </div>
          );
        })}
      </div>
    </div>
  )
};

export default DiamondClarity;
