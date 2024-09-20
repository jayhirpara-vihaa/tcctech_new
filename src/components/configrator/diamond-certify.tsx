import React from "react";

const DiamondCertifyComponent: React.FC<any> = (props: any) => {

    return (
        <div className="space-x-2 flex w-full">
            {props.data.component.map((item: any) => {
                return (
                    <button
                        key={item.id}
                        id={item.id}
                        className={props.className.mainButton}
                    >
                        <div className="BrownLight text-black" id={item.id}>
                            {item.name}
                        </div>
                    </button>
                );
            })}
        </div>
    )
}
export default DiamondCertifyComponent;