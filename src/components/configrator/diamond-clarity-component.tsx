import React, { useEffect, useState } from "react";

const DiamondClarityComponent: React.FC<any> = (props: any) => {

  const [selectedClarity, setSelectedClarity] = useState(
    props.selectedValue && props.selectedValue?.id_clarity
  );

  const handleClarity = (e: any, item: any) => {
    setSelectedClarity(item.id_clarity);
    props.value(item);
  };

  useEffect(() => {
    const defaultComponent = props && props.data && props.data.filter(
      (t: any) => parseInt(t.id_clarity) === parseInt(selectedClarity)
    );




    if (defaultComponent && defaultComponent.length > 0 && defaultComponent[0] != undefined) {
      props.value(defaultComponent[0]);
    }
  }, [selectedClarity, props.data]);

  return (
    <div className="flex">
      {props.data.map((item: any) => {
        return (
          <div className={`py-3 w-full`} key={item.id}>
            <button
              key={item.id}
              id={item.id}
              className={`${parseInt(selectedClarity) === parseInt(item.id_clarity)
                ? (props.className.buttonSelected)
                : ""
                } ${props.className.mainButton} `}
              onClick={(e) => {
                handleClarity(e, item);
              }}
            >
              <div className={props.className.divmargin} id={item.id}>
                {item.color_name} / {item.clarity_name}
              </div>
              {props.className.buttonSelected === undefined ?
                <>

                  {(props.selectedValue?.id_color === item.id_color) && (props.selectedValue?.id_clarity === item.id_clarity) && (
                    <div className={props.className.selectedBorder.maindiv}>
                      <div
                        className={props.className.selectedBorder.secdiv}
                        style={{ borderColor: props.colorUI }}
                      ></div>
                    </div>
                  )}
                </> :
                <></>}
            </button>
            {props.className.certify ?
              <button
                key={item.id}
                id={item.id}
                className={`py-3 w-full`}
              >
                <div className="BrownLight text-black">
                  {item.certify}
                </div>
              </button>
              : <></>
            }
          </div>
        )
      })}
    </div>
  )
};

export default DiamondClarityComponent;
