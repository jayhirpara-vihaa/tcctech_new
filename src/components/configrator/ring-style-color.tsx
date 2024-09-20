import React, { useEffect, useState } from "react";

const RingStyleColor: React.FC<any> = (props: any) => {
  const imageURL = process.env.NEXT_PUBLIC_IMG_URL;

  const [selectedRingStyleColor, setSelectedRingStyleColor] = useState(
    props?.selectedValue && props?.selectedValue?.id
  );

  const handleSelectedRingStyleColor = (e: any, item: any) => {
    setSelectedRingStyleColor(e.target.id);
    props.value(item);
  };

  const defaultRingStyleColor =
    props &&
    props.data &&
    props.data.filter(
      (t: any) => parseInt(t.id) === parseInt(selectedRingStyleColor)
    );
  useEffect(() => {
    if (defaultRingStyleColor && defaultRingStyleColor.length > 0)
      props.value(defaultRingStyleColor[0]);
  }, [selectedRingStyleColor]);

  useEffect(() => {
    setSelectedRingStyleColor(props.selectedValue && props.selectedValue.id);
  }, [props]);

  return (
    <div className="space-x-2 flex">
      {props.data
        .filter((t: any) => t.id_metal == 1)
        .map((item: any) => {
          return (
            <button
              key={item.id}
              id={item.id}
              className={`${
                parseInt(selectedRingStyleColor) === parseInt(item.id)
                  ? props.className?.buttonSelected
                  : ""
              } ${props.className?.mainButton}`}
              onClick={(e) => {
                handleSelectedRingStyleColor(e, item);
              }}
            >
              <img
                id={item.id}
                src={`${imageURL}${item.image_path}`}
                className={props.className?.imageData.scaleStyle}
                width={props.className?.imageData.width}
                height={props.className?.imageData.height}
                alt=""
              />

              <div className={props.className?.divmargin} id={item.id}>
                {item.name}
              </div>
              {props.className?.buttonSelected === undefined ? (
                <>
                  {parseInt(selectedRingStyleColor) === parseInt(item.id) && (
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

export default RingStyleColor;
