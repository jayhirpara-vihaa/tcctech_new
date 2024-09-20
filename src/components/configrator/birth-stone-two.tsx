import { Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";

const BirthStoneTWoData: React.FC<any> = (props: any) => {
    const [selectedValue, setSelectedValue] = useState<any>([])
    const webConfigBgColor = process.env.NEXT_PUBLIC_ZAMLES_BG_COLOR;

    const [diamondName, setDiamondName] = useState(
        props.selectedValue && props.selectedValue.name
            ? props.selectedValue.name
            : ""
    );
    const [gemSortCode, setGemSortCode] = useState("")
    useEffect(() => {
        setDiamondName(
            props.selectedValue && props.selectedValue.name
                ? props.selectedValue.name
                : ""
        );
    }, [props]);

    const handleSelectedCenterDiamond = (e: any, itmes: any) => {
        setDiamondName(e.target.id);
        setGemSortCode(itmes.sort_code);
        props.value(itmes);
    };

    return (
        <div className="mt-2 lg:overflow-auto overflow-auto lg:h-40 h-40">
            {props.data && props.data.map((item: any) => {
                return (
                    <>
                        <div className="flex mt-2">
                            <h2 className="font-semibold">{item.title} : </h2>
                            <h2 style={{ color: `${webConfigBgColor}`, marginLeft: "5px" }}>{diamondName}{" "}{gemSortCode}</h2>
                        </div>
                        <div className="gap-[1px] flex mt-1 grid grid-cols-6">

                            {item.gemstone.map((item: any) => {
                                return (
                                    <div className="mt-3" id={item.name}>
                                        <button className={`${diamondName === item.name ? "config-birthstone-select-value" : ""
                                            } bg-[#a6a5a517] rounded border-solid border-2 border-stone-200 w-[60px]`}
                                            key={item.id}
                                            onClick={(e) => {
                                                handleSelectedCenterDiamond(e, item);
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
                                                                width="20px"
                                                                height="20px"
                                                            />
                                                            <p className="birthstone-font text-black text-center" id={item.name}>{item.sort_code}</p>
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
export default BirthStoneTWoData;