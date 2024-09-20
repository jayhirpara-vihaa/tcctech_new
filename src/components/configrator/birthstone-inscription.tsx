import Input from "@components/ui/input";
import React, { useState } from "react";

const BirthStoneInscriptionData: React.FC<any> = (props: any) => {

    // const webConfigBgColor = process.env.NEXT_PUBLIC_ZAMLES_BG_COLOR;

    const [inscriptionName1, setInscriptionName1] = useState(
        ""
    );

    const [inscriptionName2, setInscriptionName2] = useState(
        ""
    );
    const [inscriptionName3, setInscriptionName3] = useState(
        ""
    );
    const [inscriptionName4, setInscriptionName4] = useState(
        ""
    );

    // useEffect(() => {
    //     setDiamondName(
    //         props.selectedValue && props.selectedValue.name
    //             ? props.selectedValue.name
    //             : ""
    //     );
    // }, [props]);

    const handleTextChange = (e: any, index: Number) => {
        //setDiamondName(e.target.id);

        if (index == 1) {
            setInscriptionName2(e.target.value);
        } else if (index == 2) {
            setInscriptionName1(e.target.value);
        }
        else if (index == 3) {
            setInscriptionName3(e.target.value);
        }
        else if (index == 4) {
            setInscriptionName4(e.target.value);
        }
        props.handleEngravingText(e, index);
    };

    return (
        <div className="mt-2 text-center overflow-y-auto h-40">
            <div>
                <div className="gap-2 flex mt-2 grid grid-cols-2">
                    <div>
                        <Input
                            style={{ border: `1px solid ${props.webConfigBgColor.webConfigBgColor}`, borderRadius: "3px", width: "100%", height: "30px" }}
                            name="Inscription1"
                            id="Inscription1"
                            className="w-full mt-1"
                            variant="solid"
                            placeholder="Inscription Text 1"
                            value={inscriptionName1}
                            onChange={(e: any) => handleTextChange(e, 2)}

                        />
                    </div>
                    <div>

                        <Input
                            style={{ border: `1px solid ${props.webConfigBgColor.webConfigBgColor}`, borderRadius: "3px", width: "100%", height: "30px" }}
                            name="Inscription2"
                            className="w-full mt-1"
                            variant="solid"
                            placeholder="Inscription Text 2"
                            value={inscriptionName2}
                            onChange={(e: any) => handleTextChange(e, 1)}

                        />
                    </div>
                </div>
            </div>
            <div>
                <div className="gap-2 flex mt-1 grid grid-cols-2">
                    <div>

                        <Input
                            style={{ border: `1px solid ${props.webConfigBgColor.webConfigBgColor}`, borderRadius: "3px", width: "100%", height: "30px" }}
                            name="Inscription3"
                            className="w-full mt-1"
                            variant="solid"
                            placeholder="Inscription Text 3"
                            value={inscriptionName3}
                            onChange={(e: any) => handleTextChange(e, 3)}

                        />
                    </div>
                    <div>
                        <div>
                            <Input
                                style={{ border: `1px solid ${props.webConfigBgColor.webConfigBgColor}`, borderRadius: "3px", width: "100%", height: "30px" }}
                                name="Inscription4"
                                className="w-full mt-1"
                                variant="solid"
                                placeholder="Inscription Text 4"
                                value={inscriptionName4}
                                onChange={(e: any) => handleTextChange(e, 4)}

                            />
                        </div>
                    </div>
                </div>
            </div>

        </div >

    )
}
export default BirthStoneInscriptionData;
