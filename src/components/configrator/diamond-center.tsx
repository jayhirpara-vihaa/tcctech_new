import React, { useEffect, useState } from "react";

const DiamondCenterComponent: React.FC<any> = (props: any) => {

    const [selectedDiamond, setSelectedDiamond] = useState(
        props.selectedValue && props.selectedValue.id
    );

    const handleSelectDiamond = (e: any, item: any) => {
        setSelectedDiamond(item.id);
        props.value(item);
    };

    const defaultComponent = props.data.filter(
        (t: any) => parseInt(t.id) === parseInt(selectedDiamond)
    );

    useEffect(() => {
        if (defaultComponent[0] != undefined) {
            props.value(defaultComponent[0]);
        }
    }, [selectedDiamond]);

    return (
        <div className="space-x-2 flex">
            {props.data.map((item: any) => {
                return (
                    <button
                        key={item.id}
                        id={item.id}
                        className={`${parseInt(selectedDiamond) === parseInt(item.id)
                            ? (props.className?.buttonSelected)
                            : ""
                            } ${props.className?.mainButton} `}
                        onClick={(e) => {
                            handleSelectDiamond(e, item);
                        }}
                    >
                        <div className={props.className?.fontStyle} id={item.id}>
                            {item.name}
                        </div>
                        {props.className?.buttonSelected === undefined ?
                            <>

                                {(props.selectedValue?.id_color === item.id_color) && (props.selectedValue?.id_clarity === item.id_clarity) && (
                                    <div className={props.className?.selectedBorder.maindiv}>
                                        <div
                                            className={props.className?.selectedBorder.secdiv}
                                            style={{ borderColor: props.colorUI }}
                                        ></div>
                                    </div>
                                )}
                            </> :
                            <></>}
                    </button>
                );
            })}
        </div>
    )
}
export default DiamondCenterComponent;