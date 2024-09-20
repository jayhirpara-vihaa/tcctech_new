import React, { useEffect, useState } from "react";

const BirthStoneMetalData: React.FC<any> = (props: any) => {

    const [metalName, setMetalName] = useState(
        props.selectedValue && props.selectedValue.slug
            ? props.selectedValue.slug
            : ""
    );

    useEffect(() => {
        setMetalName(
            props.selectedValue && props.selectedValue.slug
                ? props.selectedValue.slug
                : ""
        );
    }, [props]);

    const handleSelectedMetal = (e: any, itmes: any) => {
        setMetalName(itmes.slug);
        props.value(itmes);
    };

    return (
        <div className="mt-4 text-center">
            <div className="flex mt-2 lg:mx-0 mx-5 md:mx-5 sm:mx-5">
                <h2 className="font-semibold feijoa zamels-birthstonetablocal-font text-black">Metal :</h2>
                <h2 className="feijoa zamels-birthstonetablocal-font" style={{ color: `${props.webConfigBgColor.webConfigBgColor}`, marginLeft: "5px" }}>{metalName}</h2>
            </div>
            <div className="gap-2 flex my-3 grid grid-cols-3 md:mx-[20px] mx-[20px] sm:mx-[20px] lg:mx-0">

                {props.data && props.data.filter((t: any) => t.name != "gold").map((item: any) => {
                    return (
                        <>
                            <div className="">
                                <button className={`${metalName === item.slug ? props.webConfigBgColor.borderColor : ""}
                                } rounded border-solid border-none border-stone-200 p-[8px]`}
                                    onClick={(e) => {
                                        handleSelectedMetal(e, item)
                                    }}
                                    id={item.slug}
                                >
                                    <div className="metal-birthstone-font text-black ProximaNova-Regular" id={item.slug}>{item.slug}</div>
                                </button>
                            </div>

                        </>
                    )
                })}
            </div>

        </div >
    )
}
export default BirthStoneMetalData;
