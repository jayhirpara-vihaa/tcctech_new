import { Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";

const BirthStoneThreeData: React.FC<any> = (props: any) => {
    const [diamondName, setDiamondName] = useState(
        props.selectedValue && props.selectedValue.name
            ? props.selectedValue.name
            : ""
    );

    const [diamondName2, setDiamondName2] = useState()

    useEffect(() => {
        setDiamondName(
            props.selectedValue && props.selectedValue.name
                ? props.selectedValue.name
                : ""
        );
    }, [props]);

    const handleSelectedCenterDiamond = (e: any, itmes: any, index: any) => {
        setDiamondName(e.target.id);
        if (index + 1 == 1) {
            setDiamondName2(e.target.id)
            props.value1(itmes);

        } else if (index + 1 == 2) {
            setDiamondName(e.target.id)
            props.value2(itmes)
        } else if (index + 1 == 3) {
            setDiamondName(e.target.id)
            props.value3(itmes)
        } else if (index + 1 == 4) {
            setDiamondName(e.target.id)
            props.value4(itmes)
        } else if (index + 1 == 5) {
            setDiamondName(e.target.id)
            props.value5(itmes)
        } else if (index + 1 == 6) {
            setDiamondName(e.target.id)
            props.value6(itmes)
        } else if (index + 1 == 7) {
            setDiamondName(e.target.id)
            props.value7(itmes)
        } else if (index + 1 == 8) {
            setDiamondName(e.target.id)
            props.value8(itmes)
        } else if (index + 1 == 9) {
            setDiamondName(e.target.id)
            props.value9(itmes)
        } else if (index + 1 == 10) {
            setDiamondName(e.target.id)
            props.value10(itmes)
        }
    };

    return (
        <div className="mt-2">
            {props.data && props.data.map((item: any, index: any) => {
                return (
                    <>
                        <div className="flex mt-2 lg:mx-0 mx-5 md:mx-5 sm:mx-5">
                            <h2 className="font-semibold feijoa zamels-birthstonetablocal-font text-black">{item.title} : </h2>
                            <h2 className="zamels-birthstonetablocal-font feijoa" style={{ color: `${props.webConfigBgColor.webConfigBgColor}`, marginLeft: "5px" }}>
                                {
                                    index == 0 && props.selectedValue1.name && props.selectedValue1.name != undefined ? ` ${props.selectedValue1?.name}` :
                                        index == 1 && props.selectedValue2.name && props.selectedValue2.name != undefined ? ` ${props.selectedValue2?.name}` :
                                            index == 2 && props.selectedValue3.name && props.selectedValue3.name != undefined ? ` ${props.selectedValue3?.name}` :
                                                index == 3 && props.selectedValue4.name && props.selectedValue4.name != undefined ? ` ${props.selectedValue4?.name}` :
                                                    index == 4 && props.selectedValue5.name && props.selectedValue5.name != undefined ? ` ${props.selectedValue5?.name}` :
                                                        index == 5 && props.selectedValue6.name && props.selectedValue6.name != undefined ? ` ${props.selectedValue6?.name}` :
                                                            index == 6 && props.selectedValue7.name && props.selectedValue7.name != undefined ? ` ${props.selectedValue7?.name}` :
                                                                index == 7 && props.selectedValue8.name && props.selectedValue8.name != undefined ? ` ${props.selectedValue8?.name}` :
                                                                    index == 8 && props.selectedValue9.name && props.selectedValue9.name != undefined ? ` ${props.selectedValue9?.name}` :
                                                                        index == 9 && props.selectedValue10.name && props.selectedValue10.name != undefined ? ` ${props.selectedValue10?.name}` : ""

                                }
                            </h2>
                        </div>
                        <div>
                            <div className="lg:gap-x-2 md:mx-[20px] sm:mx-[20px] lg:mx-0 md:gap-x-6 sm:gap-x-2 xl:gap-x-2 flex mt-1 grid lg:grid-cols-6 md:grid-cols-6 sm:grid-cols-6 grid-cols-4 lg:ps-0">
                                {item.gemstone?.map((item: any) => {
                                    return (
                                        <div className="mt-3 lg:mx-0 mx-auto" id={item.name}>
                                            <Tooltip
                                                id={item.name}
                                                className=""
                                                title={
                                                    <div className="tooltip-content border-solid border-2 border-stone-200 w-[80px]" id={item.name}>
                                                        <div className="" id={item.name}>
                                                            <img
                                                                src={`${process.env.NEXT_PUBLIC_IMG_URL}${item.image_path}`}
                                                                id={item.name}
                                                                className="mx-auto "
                                                                width="20px"
                                                                height="20px"
                                                            />
                                                            <p className="birthstone-font text-black text-center" id={item.name}>{item.name}{" "}{item.sort_code}</p>
                                                        </div>
                                                    </div>
                                                }
                                                placement="right"
                                                // arrow
                                                classes={{ tooltip: "custom-tooltip" }}
                                            >
                                                <button className={`
                                                ${index == 0 && props.selectedValue1 && props.selectedValue1?.gemstone?.name == item.name ? props.webConfigBgColor.borderColor :
                                                        index == 1 && props.selectedValue2 && props.selectedValue2?.gemstone?.name == item.name ? props.webConfigBgColor.borderColor :
                                                            index == 2 && props.selectedValue3 && props.selectedValue3?.gemstone?.name == item.name ? props.webConfigBgColor.borderColor :
                                                                index == 3 && props.selectedValue4 && props.selectedValue4?.gemstone?.name == item.name ? props.webConfigBgColor.borderColor :
                                                                    index == 4 && props.selectedValue5 && props.selectedValue5?.gemstone?.name == item.name ? props.webConfigBgColor.borderColor :
                                                                        index == 5 && props.selectedValue6 && props.selectedValue6?.gemstone?.name == item.name ? props.webConfigBgColor.borderColor :
                                                                            index == 6 && props.selectedValue7 && props.selectedValue7?.gemstone?.name == item.name ? props.webConfigBgColor.borderColor :
                                                                                index == 7 && props.selectedValue8 && props.selectedValue8?.gemstone?.name == item.name ? props.webConfigBgColor.borderColor :
                                                                                    index == 8 && props.selectedValue9 && props.selectedValue9?.gemstone?.name == item.name ? props.webConfigBgColor.borderColor :
                                                                                        index == 9 && props.selectedValue10 && props.selectedValue10?.gemstone?.name == item.name ? props.webConfigBgColor.borderColor : ""
                                                    } bg-[#a6a5a517] border-solid border-2 border-stone-200 lg:w-[100%] lg:h-[50px] md:w-[114px] sm:w-[62px] w-[62px]`}
                                                    key={item.id}
                                                    onClick={(e) => {
                                                        handleSelectedCenterDiamond(e, item, index);
                                                    }}
                                                    id={item.name}
                                                >
                                                    <div className="mt-1 mb-1">
                                                        <img
                                                            src={`${process.env.NEXT_PUBLIC_IMG_URL}${item.image_path}`}
                                                            id={item.name}
                                                            width="12px"
                                                            height="12px"
                                                            className="mx-auto"
                                                        />
                                                        <p className="ProximaNova-Regular text-black birthstone-font" id={item.name}>{item.name}</p>
                                                    </div>

                                                </button>
                                            </Tooltip>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <hr style={{ border: "1px solid #dadada", marginTop: "15px" }} />
                    </>
                )
            })}
        </div >
    )
}
export default BirthStoneThreeData;
