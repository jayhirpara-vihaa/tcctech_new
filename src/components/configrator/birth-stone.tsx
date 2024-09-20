import { Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";

const BirthStoneOneData: React.FC<any> = (props: any) => {
    const webConfigBgColor = process.env.NEXT_PUBLIC_ZAMLES_BG_COLOR;
    const [diamondName, setDiamondName] = useState(
        props.selectedValue && props.selectedValue.name
            ? props.selectedValue.name
            : ""
    );
    const [gemSortCode, setGemSortCode] = useState("")

    const sortCode = props.data.map((t: any) => t.gemstone.map((value: any) => value.id))

    useEffect(() => {
        setDiamondName(
            props.selectedValue && props.selectedValue.name
                ? props.selectedValue.name
                : ""
        );
    }, [props]);

    const handleSelectedCenterDiamond = (e: any, itmes: any, index: any) => {
        setGemSortCode(itmes.sort_code);
        setDiamondName(e.target.id);
        if (index + 1 == 1) {
            setDiamondName(e.target.id)
            props.value1(itmes);

        } else if (index + 1 == 2) {
            setDiamondName(e.target.id)
            props.value2(itmes)
        }
    };

    return (
        <div className="mt-2">
            {props.data && props.data.map((item: any, index: any) => {
                return (
                    <>
                        <div className="flex mt-2">
                            <h2 className="font-semibold feijoa birthtone-tab-font text-black">{item.title} : </h2>
                            <h2 className="feijoa" style={{ color: `${webConfigBgColor}`, marginLeft: "5px", marginTop: "5px" }}>
                                {index == 0 && props.selectedValue1 ?
                                    `${props.selectedValue1?.name.toUpperCase()} ${props.selectedValue1?.sort_code}`
                                    :
                                    index == 1 && props.selectedValue2 ?
                                        `${props.selectedValue2?.name.toUpperCase()} ${props.selectedValue2?.sort_code}`
                                        : ""
                                }
                            </h2>
                        </div>
                        <div className="gap-[1px] flex mt-1 grid grid-cols-6">

                            {item.gemstone?.map((item: any) => {
                                return (
                                    <div className="mt-3" id={item.name}>
                                        <button className={
                                            `${index == 0 && props.selectedValue1 && props.selectedValue1.name == item.name ? "config-birthstone-select-value" :
                                                index == 1 && props.selectedValue2 && props.selectedValue2.name == item.name ? "config-birthstone-select-value" : ""
                                            } bg-[#a6a5a517] rounded border-solid border-2 border-stone-200 w-[60px]`}
                                            key={item.id}
                                            onClick={(e) => {
                                                handleSelectedCenterDiamond(e, item, index);
                                            }}
                                            id={item.name}
                                        >
                                            <Tooltip
                                                id={item.name}
                                                className=""
                                                title={
                                                    <div className="tooltip-content rounded border-solid border-2 border-stone-200 w-[80px]" id={item.name}>
                                                        <div className="" id={item.name}>
                                                            <img
                                                                src={item.image}
                                                                id={item.name}
                                                                className="mx-auto "
                                                                width="15px"
                                                                height="15px"
                                                            />
                                                            <div className="flex justify-center">
                                                                <p className="birthstone-font text-black" id={item.name}>{item.sort_code}</p>
                                                                {/* <p className="birthstone-font text-black text-center" id={item.name}>{item.sort_code}</p> */}
                                                            </div>

                                                        </div>
                                                    </div>
                                                }
                                                placement="right"
                                                // arrow
                                                classes={{ tooltip: "custom-tooltip" }}
                                            >
                                                <div className="mt-1 mb-1" id={item.name}>
                                                    <img
                                                        src={item.image}
                                                        id={item.name}
                                                        className="mx-auto "
                                                        width="12px"
                                                        height="12px"
                                                    />
                                                    <p className="birthstone-font text-black text-center" id={item.name}>{item.name}</p>
                                                </div>
                                            </Tooltip>
                                            {/* <p className="birthstone-font" id={item.name}>{item.name}</p> */}
                                        </button>
                                    </div>
                                )
                            })}

                        </div>

                        <hr style={{ border: "1px solid #dadada", marginTop: "15px" }} />
                    </>
                )
            })}
        </div >
    )
}
export default BirthStoneOneData;
