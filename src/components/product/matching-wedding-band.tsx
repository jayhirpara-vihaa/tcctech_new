import { Tooltip } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const MatchingWeddingBand: React.FC<any> = (props: any) => {
  const [selectedBand, setSelectedBand] = useState(
    props.selectedValue && props.selectedValue.id
  );

  const handleSelectedBand = (e: any, item: any) => {
    setSelectedBand(e.target.id);
    props.value(item);
  };

  useEffect(() => {
    setSelectedBand(props.selectedValue && props.selectedValue.id);
  }, [props]);

  const defaultMatchingWeddingBand =
    props &&
    props?.data &&
    props?.data.filter((t: any) => parseInt(t.id) === parseInt(selectedBand));

  useEffect(() => {
    props.value(defaultMatchingWeddingBand[0]);
  }, [selectedBand]);

  return (
    <div className="space-x-2 flex">
      {props.data.map((item: any) => {
        return (
          <button
            key={item.id}
            id={item.id}
            className={`${
              parseInt(selectedBand) === parseInt(item.id)
                ? props.className?.buttonSelected
                : ""
            } ${props.className?.mainButton}`}
            onClick={(e) => {
              handleSelectedBand(e, item);
            }}
          >
            <Tooltip
              title={
                <div className="tooltip-content">
                  <div className="">
                    <img
                      id={item.id}
                      src={item.image_path}
                      className={props.className?.tooltipData.scaleStyle}
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
                id={item.id}
                src={item.image_path}
                className={props.className?.tooltipData.scaleStyle}
                width={props.className?.imageData.width}
                height={props.className?.imageData.height}
                onClick={(e) => {
                  handleSelectedBand(e, item);
                }}
              />
            </Tooltip>
            <div className={props.className?.divmargin} id={item.id}>
              {item.name}
            </div>
            {props.className?.buttonSelected === undefined ? (
              <>
                {parseInt(selectedBand) === parseInt(item.id) && (
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
};

export default MatchingWeddingBand;
