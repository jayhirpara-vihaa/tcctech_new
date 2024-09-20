import React, { useEffect, useState } from "react";

const MatchingWeddingBandBet: React.FC<any> = (props: any) => {
  const [selectedBand, setSelectedBand] = useState(props?.selectedValue?.id);

  const handleSelectedBand = (e: any, item: any) => {
    setSelectedBand(e.target.id);
    props?.value(item);
  };

  useEffect(() => {
    setSelectedBand(props?.selectedValue && props?.selectedValue?.id);
  }, [props]);

  const defaultMatchingWeddingBand =
    props &&
    props?.data &&
    props?.data.filter((t: any) => parseInt(t.id) === parseInt(selectedBand));

  useEffect(() => {
    props?.value(defaultMatchingWeddingBand[0]);
  }, [selectedBand]);

  return (
    <div className="grid grid-cols-3 mb-5 gap-7">
      {props?.data?.map((item: any) => {
        return (
          <button
            key={item.id}
            id={item.id}
            className={` bg-gray-100/50 rounded-lg ${parseInt(selectedBand) === parseInt(item.id)
              ? props.className?.buttonSelected
              : ""
              } ${props?.className?.mainButton}`}
            onClick={(e) => {
              handleSelectedBand(e, item);
            }}
          >
            <img
              id={item.id}
              src={item.image_path}
              className={`${props?.className?.tooltipData?.scaleStyle}`}
              width={props?.className?.imageData?.width}
              height={props?.className?.imageData?.height}
              onClick={(e) => {
                handleSelectedBand(e, item);
              }}
            />

            <div className={props?.className?.divmargin} id={item.id}>
              {item.name}
            </div>
            {props?.className?.buttonSelected === undefined ? (
              <>
                {parseInt(selectedBand) === parseInt(item.id) && (
                  <div className={props?.className?.selectedBorder?.maindiv}>
                    <div
                      className={props?.className?.selectedBorder?.secdiv}
                      style={{ borderColor: props?.colorUI }}
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

export default MatchingWeddingBandBet;
