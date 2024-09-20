import React, { useEffect, useState } from "react";

const BirthStoneToneData: React.FC<any> = (props: any) => {
    const imageURL = process.env.NEXT_PUBLIC_IMG_URL;
    const [toneName, setToneName] = useState(
        props.selectedValue && props.selectedValue.name
            ? props.selectedValue.name
            : ""
    );

    useEffect(() => {
        setToneName(
            props.selectedValue && props.selectedValue.name
                ? props.selectedValue.name
                : ""
        );
    }, [props]);

    const handleSelectedTone = (e: any, itmes: any) => {
        setToneName(e.target.id);
        props.value(itmes);
    };

    return (
        <div className="mt-2 text-center">
            <div className="flex mt-2 lg:mx-0 mx-5 md:mx-5 sm:mx-5">
                <h2 className="font-semibold feijoa zamels-birthstonetablocal-font text-black">Metal Colour :</h2>
                <h2 className="feijoa zamels-birthstonetablocal-font" style={{ color: `${props.webConfigBgColor.webConfigBgColor}`, marginLeft: "5px" }}>{props.selectedValue?.name}</h2>
            </div>
            {/* {props.data && props.data.map((item: any) => { */}
            <div className="gap-2 flex mt-3 grid grid-cols-3 lg:mx-0 md:mx-[20px] sm:mx-[20px] mx-[20px]">

                {props.data && props.data.filter((t: any) => t.sort_code != "PL" && t.sort_code != "SL").map((item: any) => {
                    return (
                        <>
                            <div className="">
                                <button className={`${toneName === item.name ? props.webConfigBgColor.borderColor : ""
                                    } rounded border-solid border-none border-stone-200 w-full h-[60px]`}
                                    onClick={(e) => {
                                        handleSelectedTone(e, item);
                                    }}
                                    id={item.name}
                                >
                                    <img
                                        src={`${imageURL}${item.image_path}`}
                                        width="30px"
                                        height="30px"
                                        className="mx-auto"
                                        id={item.name}
                                    />
                                    <p className="ProximaNova-Regular text-black" id={item.name}>{item.name}</p>
                                </button>
                            </div>
                        </>
                    )
                })}
            </div>

        </div >
    )
}
export default BirthStoneToneData;
