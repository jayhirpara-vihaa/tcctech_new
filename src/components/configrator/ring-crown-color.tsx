import React, { useEffect, useState } from "react";

const RingCrownColor: React.FC<any> = (props: any) => {
  const imageURL = process.env.NEXT_PUBLIC_IMG_URL;

  const [selectedCrownColor, setSelectedCrownColor] = useState(
    props.selectedValue && props.selectedValue.id
  );

  const handleSelectedCrownColor = (e: any, item: any) => {
    setSelectedCrownColor(e.target.id);
    props.value(item);
  };

  useEffect(() => {
    setSelectedCrownColor(props.selectedValue && props.selectedValue.id);
  }, []);

  const defaultRingCrownColor =
    props &&
    props.data &&
    props.data.filter(
      (t: any) => parseInt(t.id) === parseInt(selectedCrownColor)
    );

  useEffect(() => {
    if (defaultRingCrownColor && defaultRingCrownColor.length > 0)
      props.value(defaultRingCrownColor[0]);
  }, [selectedCrownColor]);

  return (
    <div className={`space-x-2 flex mt-5${props?.className?.main}`}>
      {props.data
        .filter((t: any) => t.id_metal == 1)
        .map((item: any) => {
          return (
            <button
              key={item.id}
              id={item.id}
              className={`rounded-lg mt-2 ${parseInt(selectedCrownColor) === parseInt(item.id)
                ? ` ${props?.className?.buttonSelected}`
                : ""
                } ${props?.className?.mainButton}`}
              onClick={(e) => {
                handleSelectedCrownColor(e, item);
              }}
            >
              <img
                id={item?.id}
                src={`${imageURL}${item?.image_path}`}
                className={`${props?.className?.imageData?.scaleStyle} mx-10`}
                width={props?.className?.imageData?.width}
                height={props?.className?.imageData?.height}
                alt=""
              />
              <div
                className={`${props?.className?.divmargin} mx-1`}
                id={item.id}
              >
                {item.name}
              </div>
              {props?.className?.buttonSelected === undefined ? (
                <>
                  {parseInt(selectedCrownColor) === parseInt(item.id) && (
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

export default RingCrownColor;
