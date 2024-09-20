import React, { useEffect, useState } from "react";

const DiamondCutComponent: React.FC<any> = (props: any) => {
    const [selectedCut, setSelectedCut] = useState(
        props.selectedValue && props.selectedValue.id
    );

    const handleCut = (e: any, item: any) => {
        setSelectedCut(item.id);
        props.value(item);
    };

    const defaultComponent = props && props.data && props.data.filter(
        (t: any) => parseInt(t.id) === parseInt(selectedCut)
    );

    useEffect(() => {
        if (defaultComponent && defaultComponent.length > 0 && defaultComponent[0] != undefined) {
            props.value(defaultComponent[0]);
        }
    }, [selectedCut]);

    return (
        <div className="space-x-2 flex">
            {props.data.map((item: any) => {

                return (
                    <button
                        key={item.id}
                        id={item.id}
                        className={` ${parseInt(selectedCut) === parseInt(item.id)
                            ? (props.className?.buttonSelected)
                            : ""
                            } ${props.className?.mainButton} `}
                        onClick={(e) => {
                            handleCut(e, item);
                        }}
                    >
                        <div className={props.className.divmargin} id={item.id}>
                            {item.value}
                        </div>
                        {props.className?.buttonSelected === undefined ?
                            <>

                                {(props.selectedValue?.value === item.value) && (
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

export default DiamondCutComponent;