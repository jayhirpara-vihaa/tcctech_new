import React, { useState, useEffect, useRef } from "react";
import DATA from "../../../public/api/birth-stone.json";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai";
import CONFIG_DATA from "../../../public/api/configrator-3d.json";
import Button from "@components/ui/button";
import { useRouter } from "next/router";
import { useWindowSize } from "@utils/use-window-size";
import { useSsrCompatible } from "@utils/use-ssr-compatible";
import {
    EmailShareButton,
    EmailIcon,
    FacebookShareButton,
    FacebookIcon,
    WhatsappShareButton,
    WhatsappIcon,
} from "react-share";
import "react-dropdown/style.css";
import { useUI } from "@contexts/ui.context";
import { CURRENCY } from "@utils/constants";
import { getUserDetails } from "@store/authorization";
import BirthStoneToneData from "@components/configrator/birthstone-tone";
import BirthStoneMetalData from "@components/configrator/birthstone-metal";
import { CheckBox } from "@components/ui/checkbox";
import {
    ViewerApp,
    AssetManagerPlugin,
    addBasePlugins,
    FileTransferPlugin,
    CanvasSnipperPlugin,
    PopmotionPlugin,
    MaterialConfiguratorPlugin,
    CanvasRecorderPlugin,
    ProgressivePlugin,
    CameraViewPlugin,
    DiamondPlugin,
    SimpleTextPlugin,
    EasingFunctions,
    TonemapPlugin,
    GroundPlugin,
    FullScreenPlugin,
    Spherical,
    timeout,
    CubeNormalsCaptureHelper
} from "webgi";
import BirthStoneThreeData from "@components/configrator/birth-stone-three";
import { useBirthstoneProductDetailQuery } from "src/framework/Birth-stone/get-birthstone-product-detail";
import Input from "@components/ui/input";
import { useBirthstoneProductPriceQuery } from "src/framework/Birth-stone/price-find-birthstone-products";
import GemstoneTypeComponent from "@components/configrator/gemstone-type";
import BirthStoneInscriptionData from "@components/configrator/birthstone-inscription";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { IoMdArrowDropdown } from "react-icons/io";
import { Collapse } from "@components/common/accordioncommon";
const BirthStoneProductSingleDetails: React.FC = () => {
    const {
        query: { slug },
    } = useRouter();
    const router = useRouter();
    const birthStoneDetailData = DATA.productList.find((t: any) => t.slug == slug)
    useEffect(() => {
        if (!router.isReady) {
            return;
        }
    }, []);
    const [showModal, setShowModal] = React.useState(false);
    const webConfigBgColor = process.env.NEXT_PUBLIC_WEBCONFIG_BG_COLOR;
    const [productId, setProductId] = useState<any>();
    const [gemStoneListData, setgemStoneListData] = useState<any>();
    const [gemStone1, setGemStone1] = useState<any>();
    const [gemStone2, setGemStone2] = useState<any>();
    const [gemStone3, setGemStone3] = useState<any>();
    const [gemStone4, setGemStone4] = useState<any>();
    const [gemStone5, setGemStone5] = useState<any>();
    const [gemStone6, setGemStone6] = useState<any>();
    const [gemStone7, setGemStone7] = useState<any>();
    const [gemStone8, setGemStone8] = useState<any>();
    const [gemStone9, setGemStone9] = useState<any>();
    const [gemStone10, setGemStone10] = useState<any>();

    const [metalToneData, setMetalToneData] = useState<any>();
    const [engravingName, setEngravingName] = useState([{ id: 0, text: null, value: "", max_text_count: null }]);
    const [metalData, setMetalData] = useState<any>();
    const [activeTab, setActiveTab] = useState(0);
    const [viewer, setViewer] = useState<any>();
    const [selectedOption, setSelectedOption] = useState("");
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [imageDownLoadIndex, setImageDownLoadIndex] = useState<string>("1");
    const [is360Running, setIs360Running] = useState<boolean>(false);
    const [isBgChecked, setIsBgChecked] = useState<boolean>(false);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [shareClick, setShareClick] = useState(false);
    const [gemstoneType, setGemstoneType] = useState<any>();
    const [expanded, setExapanded] = useState<any>();
    const [selectedValue, setSelectedValue] = useState({
        gemstoneType: 1,
        gemStoneId: 59,
        twoGemStoneId: 59,
        threeGemstoneId: 59,
        fourGemstoneId: 59,
        fiveGemstoneId: 59,
        sixGemstoneId: 59,
        sevenGemstoneId: 59,
        eightGemstoneId: 59,
        nineGemstoneId: 59,
        tenGemstoneId: 59,
        metalToneId: 46,
        metalId: 41,
    });
    const [glbName, setGlbName] = useState<any>()
    const [inputFieldsDiamond, setInputFieldsDiamond] = useState([{ id_stone: "", id_mm_size: null, id_cut: null, id_shape: null, }])

    const { isAuthorized } = useUI();

    const [payload, setPayload] = useState({ slug: slug });
    const [authPayload, setAuthPayload] = useState({
        slug: slug,
    });

    const { data: productDescriptionData } = useBirthstoneProductDetailQuery(isAuthorized ? authPayload : payload);
    const { data: birthstonePriceData, mutate: getBirthstoneData } = useBirthstoneProductPriceQuery();

    const engravingDetailData = productDescriptionData?.data?.data?.products?.engravings
    const gemstoneCountData = productDescriptionData?.data?.data?.gemstone_count

    const [selectedPriceValue, setSelectedPriceValue] = useState<any>();

    useEffect(() => {
        getBirthstoneData(selectedPriceValue);
    }, [selectedPriceValue]);
    console.log("selectedPriceValue", inputFieldsDiamond)
    const silvermetalData = metalData?.name === "Silver";

    const dropdownRef = useRef(null);

    useEffect(() => {
        if ((productDescriptionData && productDescriptionData.status === 200) || (productDescriptionData && productDescriptionData.status === "200")) {
            const engravingData: any = []
            for (const value of engravingDetailData) {
                engravingData.push({
                    id: value.id, text: value.text, value: '', max_text_count: value.max_text_count
                })
            };
            setEngravingName(engravingData)
        }
        setProductId(productDescriptionData?.data?.data?.products?.id)
    }, [productDescriptionData])

    useEffect(() => {
        if (productDescriptionData?.data?.data?.products?.product_number) {
            setGlbName(productDescriptionData?.data?.data?.products?.product_number)
        }
    }, [productDescriptionData?.data?.data?.products])

    useEffect(() => {
        const gemstoneList = []
        for (let i = 0; i < productDescriptionData?.data?.data?.gemstone_count; i++) {
            gemstoneList.push({
                title: `Birthstone ${i + 1}`,
                gemstone: productDescriptionData?.data?.data?.Gemstone.filter((t: any) => t.gemstone_type == null),
            })
        }
        setgemStoneListData(gemstoneList);

    }, [productDescriptionData, gemstoneType])

    const tabs = [
        {
            label: 'Birthstone',
        },
        {
            label: "Engraving",
        },
    ];

    useEffect(() => {
        const birthstone = productDescriptionData?.data?.data?.products?.birthstone_PDO.map((value: any) => {
            const data = {
                "id_stone": value.id_stone,
                "id_shape": value.id_shape,
                "id_mm_size": value.id_mm_size,
                "id_cut": value.id_cut
            }
            return data
        })
        setInputFieldsDiamond(birthstone)
    }, [productDescriptionData])

    useEffect(() => {
        if (gemstoneCountData === 1) {
            if (gemStone1) {
                const data = [...inputFieldsDiamond]
                data[0].id_stone = gemStone1.id
                setInputFieldsDiamond(data)
            }
        } else if (gemstoneCountData === 2) {
            if (gemStone1) {
                const data = [...inputFieldsDiamond]
                data[0].id_stone = gemStone1.id
                setInputFieldsDiamond(data)
            } if (gemStone2) {
                const data = [...inputFieldsDiamond]
                data[1].id_stone = gemStone2.id
                setInputFieldsDiamond(data)
            }
        } else if (gemstoneCountData === 3) {
            if (gemStone1) {
                const data = [...inputFieldsDiamond]
                data[0].id_stone = gemStone1.id
                setInputFieldsDiamond(data)
            } if (gemStone2) {
                const data = [...inputFieldsDiamond]
                data[1].id_stone = gemStone2.id
                setInputFieldsDiamond(data)
            } if (gemStone3) {
                const data = [...inputFieldsDiamond]
                data[2].id_stone = gemStone3.id
                setInputFieldsDiamond(data)
            }
        } else if (gemstoneCountData === 4) {
            if (gemStone1) {
                const data = [...inputFieldsDiamond]
                data[0].id_stone = gemStone1.id
                setInputFieldsDiamond(data)
            } if (gemStone2) {
                const data = [...inputFieldsDiamond]
                data[1].id_stone = gemStone2.id
                setInputFieldsDiamond(data)
            } if (gemStone3) {
                const data = [...inputFieldsDiamond]
                data[2].id_stone = gemStone3.id
                setInputFieldsDiamond(data)
            } if (gemStone4) {
                const data = [...inputFieldsDiamond]
                data[3].id_stone = gemStone4.id
                setInputFieldsDiamond(data)
            }
        } else if (gemstoneCountData === 5) {
            if (gemStone1) {
                const data = [...inputFieldsDiamond]
                data[0].id_stone = gemStone1.id
                setInputFieldsDiamond(data)
            } if (gemStone2) {
                const data = [...inputFieldsDiamond]
                data[1].id_stone = gemStone2.id
                setInputFieldsDiamond(data)
            } if (gemStone3) {
                const data = [...inputFieldsDiamond]
                data[2].id_stone = gemStone3.id
                setInputFieldsDiamond(data)
            } if (gemStone4) {
                const data = [...inputFieldsDiamond]
                data[3].id_stone = gemStone4.id
                setInputFieldsDiamond(data)
            } if (gemStone5) {
                const data = [...inputFieldsDiamond]
                data[4].id_stone = gemStone5.id
                setInputFieldsDiamond(data)
            }
        } else if (gemstoneCountData === 6) {
            if (gemStone1) {
                const data = [...inputFieldsDiamond]
                data[0].id_stone = gemStone1.id
                setInputFieldsDiamond(data)
            } if (gemStone2) {
                const data = [...inputFieldsDiamond]
                data[1].id_stone = gemStone2.id
                setInputFieldsDiamond(data)
            } if (gemStone3) {
                const data = [...inputFieldsDiamond]
                data[2].id_stone = gemStone3.id
                setInputFieldsDiamond(data)
            } if (gemStone4) {
                const data = [...inputFieldsDiamond]
                data[3].id_stone = gemStone4.id
                setInputFieldsDiamond(data)
            } if (gemStone5) {
                const data = [...inputFieldsDiamond]
                data[4].id_stone = gemStone5.id
                setInputFieldsDiamond(data)
            } if (gemStone6) {
                const data = [...inputFieldsDiamond]
                data[5].id_stone = gemStone6.id
                setInputFieldsDiamond(data)
            }
        } else if (gemstoneCountData === 7) {
            if (gemStone1) {
                const data = [...inputFieldsDiamond]
                data[0].id_stone = gemStone1.id
                setInputFieldsDiamond(data)
            } if (gemStone2) {
                const data = [...inputFieldsDiamond]
                data[1].id_stone = gemStone2.id
                setInputFieldsDiamond(data)
            } if (gemStone3) {
                const data = [...inputFieldsDiamond]
                data[2].id_stone = gemStone3.id
                setInputFieldsDiamond(data)
            } if (gemStone4) {
                const data = [...inputFieldsDiamond]
                data[3].id_stone = gemStone4.id
                setInputFieldsDiamond(data)
            } if (gemStone5) {
                const data = [...inputFieldsDiamond]
                data[4].id_stone = gemStone5.id
                setInputFieldsDiamond(data)
            } if (gemStone6) {
                const data = [...inputFieldsDiamond]
                data[5].id_stone = gemStone6.id
                setInputFieldsDiamond(data)
            } if (gemStone7) {
                const data = [...inputFieldsDiamond]
                data[6].id_stone = gemStone7.id
                setInputFieldsDiamond(data)
            }
        } else if (gemstoneCountData === 8) {
            if (gemStone1) {
                const data = [...inputFieldsDiamond]
                data[0].id_stone = gemStone1.id
                setInputFieldsDiamond(data)
            } if (gemStone2) {
                const data = [...inputFieldsDiamond]
                data[1].id_stone = gemStone2.id
                setInputFieldsDiamond(data)
            } if (gemStone3) {
                const data = [...inputFieldsDiamond]
                data[2].id_stone = gemStone3.id
                setInputFieldsDiamond(data)
            } if (gemStone4) {
                const data = [...inputFieldsDiamond]
                data[3].id_stone = gemStone4.id
                setInputFieldsDiamond(data)
            } if (gemStone5) {
                const data = [...inputFieldsDiamond]
                data[4].id_stone = gemStone5.id
                setInputFieldsDiamond(data)
            } if (gemStone6) {
                const data = [...inputFieldsDiamond]
                data[5].id_stone = gemStone6.id
                setInputFieldsDiamond(data)
            } if (gemStone7) {
                const data = [...inputFieldsDiamond]
                data[6].id_stone = gemStone7.id
                setInputFieldsDiamond(data)
            } if (gemStone8) {
                const data = [...inputFieldsDiamond]
                data[7].id_stone = gemStone8.id
                setInputFieldsDiamond(data)
            }
        } else if (gemstoneCountData === 9) {
            if (gemStone1) {
                const data = [...inputFieldsDiamond]
                data[0].id_stone = gemStone1.id
                setInputFieldsDiamond(data)
            } if (gemStone2) {
                const data = [...inputFieldsDiamond]
                data[1].id_stone = gemStone2.id
                setInputFieldsDiamond(data)
            } if (gemStone3) {
                const data = [...inputFieldsDiamond]
                data[2].id_stone = gemStone3.id
                setInputFieldsDiamond(data)
            } if (gemStone4) {
                const data = [...inputFieldsDiamond]
                data[3].id_stone = gemStone4.id
                setInputFieldsDiamond(data)
            } if (gemStone5) {
                const data = [...inputFieldsDiamond]
                data[4].id_stone = gemStone5.id
                setInputFieldsDiamond(data)
            } if (gemStone6) {
                const data = [...inputFieldsDiamond]
                data[5].id_stone = gemStone6.id
                setInputFieldsDiamond(data)
            } if (gemStone7) {
                const data = [...inputFieldsDiamond]
                data[6].id_stone = gemStone7.id
                setInputFieldsDiamond(data)
            } if (gemStone8) {
                const data = [...inputFieldsDiamond]
                data[7].id_stone = gemStone8.id
                setInputFieldsDiamond(data)
            } if (gemStone9) {
                const data = [...inputFieldsDiamond]
                data[7].id_stone = gemStone9.id
                setInputFieldsDiamond(data)
            }
        } else if (gemstoneCountData === 10) {
            if (gemStone1) {
                const data = [...inputFieldsDiamond]
                data[0].id_stone = gemStone1.id
                setInputFieldsDiamond(data)
            } if (gemStone2) {
                const data = [...inputFieldsDiamond]
                data[1].id_stone = gemStone2.id
                setInputFieldsDiamond(data)
            } if (gemStone3) {
                const data = [...inputFieldsDiamond]
                data[2].id_stone = gemStone3.id
                setInputFieldsDiamond(data)
            } if (gemStone4) {
                const data = [...inputFieldsDiamond]
                data[3].id_stone = gemStone4.id
                setInputFieldsDiamond(data)
            } if (gemStone5) {
                const data = [...inputFieldsDiamond]
                data[4].id_stone = gemStone5.id
                setInputFieldsDiamond(data)
            } if (gemStone6) {
                const data = [...inputFieldsDiamond]
                data[5].id_stone = gemStone6.id
                setInputFieldsDiamond(data)
            } if (gemStone7) {
                const data = [...inputFieldsDiamond]
                data[6].id_stone = gemStone7.id
                setInputFieldsDiamond(data)
            } if (gemStone8) {
                const data = [...inputFieldsDiamond]
                data[7].id_stone = gemStone8.id
                setInputFieldsDiamond(data)
            } if (gemStone10) {
                const data = [...inputFieldsDiamond]
                data[7].id_stone = gemStone10.id
                setInputFieldsDiamond(data)
            }
        }
    }, [gemstoneCountData, gemStone1, gemStone2, gemStone3, gemStone4, gemStone5, gemStone6, gemStone7, gemStone8, gemStone9, gemStone10])

    useEffect(() => {
        if (productId) {
            // if (gemstoneCountData === 1) {
            setSelectedPriceValue({
                id_product: productId,
                metal: metalData && metalData.id_metal ? metalData.id_metal : null,
                karat: metalData && metalData.id_karat ? metalData.id_karat : null,
                diamond_type: gemstoneType && gemstoneType.id,
                select_gemstone: inputFieldsDiamond && inputFieldsDiamond?.map((value) => {
                    const data = {
                        "id_stone": value.id_stone,
                        "id_shape": value.id_shape,
                        "id_mm_size": value.id_mm_size,
                        "id_cut": value.id_cut
                    }
                    return data
                })
            })
            // } 
            // else if (gemstoneCountData === 2) {
            //     setSelectedPriceValue({
            //         id_product: productId,
            //         metal: metalData && metalData.id_metal ? metalData.id_metal : null,
            //         karat: metalData && metalData.id_karat ? metalData.id_karat : null,
            //         diamond_type: gemstoneType && gemstoneType.id,
            //         select_gemstone: inputFieldsDiamond && inputFieldsDiamond?.map((value) => {
            //             const data = {
            //                 "id_stone": value.id_stone,
            //                 "id_shape": value.id_shape,
            //                 "id_mm_size": value.id_mm_size,
            //                 "id_cut": value.id_cut
            //             }
            //             return data
            //         })
            //     })
            // } else if (gemstoneCountData === 3) {
            //     setSelectedPriceValue({
            //         id_product: productId,
            //         metal: metalData && metalData.id_metal ? metalData.id_metal : null,
            //         karat: metalData && metalData.id_karat ? metalData.id_karat : null,
            //         diamond_type: gemstoneType && gemstoneType.id,
            //         select_gemstone: inputFieldsDiamond && inputFieldsDiamond?.map((value) => {
            //             const data = {
            //                 "id_stone": value.id_stone,
            //                 "id_shape": value.id_shape,
            //                 "id_mm_size": value.id_mm_size,
            //                 "id_cut": value.id_cut
            //             }
            //             return data
            //         })
            //     })
            // } else if (gemstoneCountData === 4) {
            //     setSelectedPriceValue({
            //         id_product: productId,
            //         metal: metalData && metalData.id_metal ? metalData.id_metal : null,
            //         karat: metalData && metalData.id_karat ? metalData.id_karat : null,
            //         diamond_type: gemstoneType && gemstoneType.id,
            //         select_gemstone: inputFieldsDiamond && inputFieldsDiamond?.map((value) => {
            //             const data = {
            //                 "id_stone": value.id_stone,
            //                 "id_shape": value.id_shape,
            //                 "id_mm_size": value.id_mm_size,
            //                 "id_cut": value.id_cut
            //             }
            //             return data
            //         })
            //     })
            // } else if (gemstoneCountData === 5) {
            //     setSelectedPriceValue({
            //         id_product: productId,
            //         metal: metalData && metalData.id_metal ? metalData.id_metal : null,
            //         karat: metalData && metalData.id_karat ? metalData.id_karat : null,
            //         diamond_type: gemstoneType && gemstoneType.id,
            //         select_gemstone: inputFieldsDiamond && inputFieldsDiamond?.map((value) => {
            //             const data = {
            //                 "id_stone": value.id_stone,
            //                 "id_shape": value.id_shape,
            //                 "id_mm_size": value.id_mm_size,
            //                 "id_cut": value.id_cut
            //             }
            //             return data
            //         })
            //     })
            // } else if (gemstoneCountData === 6) {
            //     setSelectedPriceValue({
            //         id_product: productId,
            //         metal: metalData && metalData.id_metal ? metalData.id_metal : null,
            //         karat: metalData && metalData.id_karat ? metalData.id_karat : null,
            //         diamond_type: gemstoneType && gemstoneType.id,
            //         select_gemstone: inputFieldsDiamond && inputFieldsDiamond?.map((value) => {
            //             const data = {
            //                 "id_stone": value.id_stone,
            //                 "id_shape": value.id_shape,
            //                 "id_mm_size": value.id_mm_size,
            //                 "id_cut": value.id_cut
            //             }
            //             return data
            //         })
            //     })
            // }
        }

    }, [productId,
        productDescriptionData,
        gemstoneType,
        gemStone1,
        gemStone2,
        gemStone3,
        gemStone4,
        gemStone5,
        gemStone6,
        gemStone7,
        gemStone8,
        gemStone9,
        gemStone10,
        metalData,
    ])

    const handleTabClick = (index: any) => {
        setActiveTab(index);
    };

    const userData = getUserDetails();
    const userID = userData?.id_app_user;

    const { width, height } = useSsrCompatible(useWindowSize(), { width: 0, height: 0 });
    const [isLoading, setLoading] = useState(true);

    const handleFullScreen = async () => {
        setIsFullScreen(!isFullScreen)
        const canvas = document.getElementById("webgi-canvas") as HTMLCanvasElement;
        viewer.getPlugin(FullScreenPlugin).toggle(canvas.parentElement);
    };

    const handle360Image = async () => {
        //Camera Rotation
        if (is360Running) {
            viewer.scene.activeCamera.controls.autoRotate = false;
            viewer.scene.activeCamera.controls.autoRotateSpeed = 0;
        } else {

            viewer.scene.activeCamera.controls.autoRotate = true;
            viewer.scene.activeCamera.controls.autoRotateSpeed = 5;
        }
        setIs360Running(!is360Running);
    };

    const handleBGChange = async () => {
        setIsBgChecked(!isBgChecked);
        viewer.getPlugin(TonemapPlugin).config.tonemapBackground = isBgChecked;
        viewer.getPlugin(GroundPlugin).tonemapGround = isBgChecked;
    };

    const handleVideoDownload = async () => {
        viewer.setDirty(); // trigger a rerender.
        const recorder = viewer.getPlugin(CanvasRecorderPlugin);
        const progressive = viewer.getPlugin(ProgressivePlugin);
        const fileTransfer = viewer.getPlugin(FileTransferPlugin);

        const popmotion = await viewer.getPlugin(PopmotionPlugin);

        progressive.maxFrameCount = 4;
        recorder.mimeType = "video/mp4";
        recorder.convergeMode = true;

        const durationNum = parseFloat("10");
        if (!isFinite(durationNum) || durationNum <= 0) return;
        const camera = viewer.scene.activeCamera;
        const interactions = camera.interactionsEnabled;
        if (interactions) camera.interactionsEnabled = false;
        const cameraPos = camera.position.clone();
        if (!popmotion) {
            return;
        }
        const current = new Spherical().setFromVector3(cameraPos);
        camera.position.setFromSpherical(current);
        camera.positionUpdated(true);
        const b = await await recorder.record(
            async () =>
                popmotion.animate({
                    from: current.theta,
                    to: -(current.theta + Math.PI * 2),
                    duration: durationNum * 1000,
                    ease: EasingFunctions.linear,
                    onUpdate: (v: number) => {
                        current.theta = v;
                        camera.position.setFromSpherical(current);
                        camera.positionUpdated(true);
                    },
                }).promise
        );
        camera.position.copy(cameraPos);
        camera.positionUpdated(true);
        if (interactions) camera.interactionsEnabled = true;
        await fileTransfer.exportFile(b, "recording.mp4");
        progressive.maxFrameCount = 32;

    };

    const handleDownloadImage = async () => {
        viewer.setDirty(); // trigger a rerender.
        const snipper = viewer.getPlugin(CanvasSnipperPlugin);
        const size =
            imageDownLoadIndex == "1"
                ? 700
                : imageDownLoadIndex == "2"
                    ? 1024 / 2
                    : 1980 / 3;
        const scale =
            imageDownLoadIndex == "1" ? 1 : imageDownLoadIndex == "2" ? 2 : 3;
        viewer.setSize({ width: size, height: size });
        //setCanvasHeight(100);
        //setCanvasWidth(100);
        viewer.resize();
        await timeout(1000);
        await snipper.downloadSnapshot("image.png", {
            waitForProgressive: true, // download anti-aliased image
            displayPixelRatio: scale,
        });
        await timeout(1000);
        viewer.setSize({ width: "100%", height: height });
        //setCanvasHeight(100);
        //setCanvasWidth(100);
        viewer.resize();
    };


    const handleCameraViews = async (value: any) => {

        const popmotion = await viewer.getPlugin(PopmotionPlugin);

        if (viewer.scene.modelRoot.rotation.x > 1.5) {
            popmotion.animate({
                from: 1.57,
                to: 0,
                duration: 1 * 1000,
                ease: EasingFunctions.linear,
                onUpdate: (v: number) => {
                    viewer.scene.modelRoot.rotation.z = v;
                    viewer.scene.modelRoot.rotation.x = v;
                },
            }).promise;
        }

        //viewer.setDirty(); // trigger a rerender.
        //const { CameraViewPlugin } = await import("webgi");

        const camViews = viewer.getPlugin(CameraViewPlugin);
        await camViews.animateToView(camViews.camViews[parseInt(value)]);
        viewer.scene.setDirty({ sceneUpdate: true });
    };

    const imageUrl = process.env.NEXT_PUBLIC_IMG_URL + "configurator/static/";

    const handleDropdownToggle1 = () => {
        setIsViewOpen((prev) => !prev);
    };

    // const handleDropdownToggle = () => {
    //     setIsOpen((prevState) => !prevState);
    // };

    // ************ VIEWVIER_CONTROLLER

    useEffect(() => {
        const gemstoneTypeId = CONFIG_DATA.gemstone_type.component.filter((t: any) => t.id == selectedValue.gemstoneType)
        setGemstoneType(gemstoneTypeId?.[0])
    }, [])

    useEffect(() => {

        const metalData1 = productDescriptionData?.data?.data?.metal_karat_list.filter((t: any) => t.id_karat == selectedValue.metalId)

        setMetalData(metalData1?.[0])

        // const gemStoneId = gemStoneData.filter((value: any) => value.id == selectedValue.oneGemStoneId)
        // setGemStone1(gemStoneId?.[0])

        const gemStoneDataId = productDescriptionData?.data?.data?.Gemstone.filter((value: any) => value.id == selectedValue.gemStoneId)
        setGemStone1(gemStoneDataId?.length !== 0 && gemStoneDataId?.[0]);

        const gemStoneId2 = productDescriptionData?.data?.data?.Gemstone.filter((value: any) => value.id == selectedValue.twoGemStoneId)
        setGemStone2(gemStoneId2?.length !== 0 && gemStoneId2?.[0]);

        const gemStoneId3 = productDescriptionData?.data?.data?.Gemstone.filter((value: any) => value.id == selectedValue.threeGemstoneId)
        setGemStone3(gemStoneId3?.length !== 0 && gemStoneId3?.[0]);

        const gemStoneId4 = productDescriptionData?.data?.data?.Gemstone.filter((value: any) => value.id == selectedValue.fourGemstoneId)
        setGemStone4(gemStoneId4?.length !== 0 && gemStoneId4?.[0]);

        const gemStoneId5 = productDescriptionData?.data?.data?.Gemstone.filter((value: any) => value.id == selectedValue.fiveGemstoneId)

        setGemStone5(gemStoneId5?.length !== 0 && gemStoneId5?.[0]);

        const gemStoneId6 = productDescriptionData?.data?.data?.Gemstone.filter((value: any) => value.id == selectedValue.sixGemstoneId)

        setGemStone6(gemStoneId5?.length !== 0 && gemStoneId6?.[0]);

        const gemStoneId7 = productDescriptionData?.data?.data?.Gemstone.filter((value: any) => value.id == selectedValue.sevenGemstoneId)

        setGemStone7(gemStoneId5?.length !== 0 && gemStoneId7?.[0]);
        const gemStoneId8 = productDescriptionData?.data?.data?.Gemstone.filter((value: any) => value.id == selectedValue.eightGemstoneId)

        setGemStone8(gemStoneId5?.length !== 0 && gemStoneId8?.[0]);
        const gemStoneId9 = productDescriptionData?.data?.data?.Gemstone.filter((value: any) => value.id == selectedValue.nineGemstoneId)

        setGemStone9(gemStoneId5?.length !== 0 && gemStoneId9?.[0]);
        const gemStoneId10 = productDescriptionData?.data?.data?.Gemstone.filter((value: any) => value.id == selectedValue.tenGemstoneId)

        setGemStone10(gemStoneId5?.length !== 0 && gemStoneId10?.[0]);

        const metaToneIdE = productDescriptionData?.data?.data?.metal_tone.filter((t: any) => t.id == selectedValue.metalToneId)

        setMetalToneData(metaToneIdE?.[0])
    }, [productDescriptionData])

    async function setupViewer() {
        const viewer = new ViewerApp({
            canvas: document.getElementById("webgi-canvas") as HTMLCanvasElement,
        });
        setViewer(viewer);
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
            setTimeout(() => {
                setupViewer();
            }, 100);
        }, 100);
    }, [selectedValue]);

    const setViewerControls = async () => {

        // Add some plugins
        //await viewer.addPlugin(DebugPlugin);
        const manager = await viewer.addPlugin(AssetManagerPlugin);

        // or use this to add all main ones at once.
        await addBasePlugins(viewer);

        // Add more plugins not available in base, like CanvasSnipperPlugin which has helpers to download an image of the canvas.
        //await viewer.addPlugin(AssetManagerBasicPopupPlugin);
        await viewer.addPlugin(CanvasSnipperPlugin);
        await viewer.addPlugin(MaterialConfiguratorPlugin);
        await viewer.addPlugin(FileTransferPlugin);
        await viewer.addPlugin(CanvasRecorderPlugin);
        await viewer.addPlugin(PopmotionPlugin);
        await viewer.addPlugin(SimpleTextPlugin);
        await viewer.addPlugin(CameraViewPlugin);

        viewer.renderer.refreshPipeline();
        const options = { autoScale: false, autoCenter: false, useRgbm: true };
        viewer.enable = false;
        viewer.renderEnabled = false;
        CubeNormalsCaptureHelper.AutoDisposeTargets = false;
        const glbPath = imageUrl.replace("static", "birthstone")
        await manager.addFromPath(`${glbPath}${glbName && glbName}.glb`, options);
        await manager.addFromPath(`${imageUrl}config_birthstone_pendant.vjson`);
        await manager.addFromPath("/assets/preset.CameraViews.json");
        setMaterial();
        viewer.enable = true;
        viewer.renderEnabled = true;
        viewer.scene.setDirty({ sceneUpdate: true });
    };

    useEffect(() => {
        if (viewer && glbName) {
            setViewerControls();
        }
    }, [viewer, glbName]);

    const setMaterial = async () => {
        if (viewer) {
            const rgMaterial = await viewer
                .getManager()
                .importer.importSinglePath("/assets/Pmat/RG.pmat");

            const ygMaterial = await viewer
                .getManager()
                .importer.importSinglePath("/assets/Pmat/YG.pmat");

            const wgMaterial = await viewer
                .getManager()
                .importer.importSinglePath("/assets/Pmat/WG.pmat");

            let metalMaterial = rgMaterial;
            if (metalToneData && metalToneData.sort_code == "YG") {
                metalMaterial = ygMaterial;
            } else if (metalToneData && metalToneData.sort_code == "WG") {
                metalMaterial = wgMaterial;
            } else if (metalToneData && metalToneData.sort_code == "RG") {
                metalMaterial = rgMaterial;
            }
            viewer.scene.traverse(async function (child: any) {
                //SHank Metal
                if (metalData && !metalData.id_karat) {
                    metalMaterial = wgMaterial;

                }
                if (child.name.includes("Metal")) {
                    child.material = metalMaterial; //apply same material to all meshes
                }

                const extension = ".dmat";

                if (child.name.includes("Diamond") || child.name.includes("Gem")) {
                    let dmatName = "RD-";
                    let smallDmatName = "WT-" + "RD-" + "DIAMOND" + extension;
                    let cacheKey = "";
                    gemStoneListData.map(async (value: any, index: any) => {
                        if (child.name.includes(`${birthStoneDetailData?.gemstone_glb_name.one ? birthStoneDetailData?.gemstone_glb_name.one : `Gem_${index + 1}`}`)) {
                            dmatName = index == 0 ? gemStone1?.sort_code + extension :
                                index == 1 ? gemStone2?.sort_code + extension :
                                    index == 2 ? gemStone3?.sort_code + extension :
                                        index == 3 ? gemStone4?.sort_code + extension :
                                            index == 4 ? gemStone5?.sort_code + extension :
                                                index == 5 ? gemStone6?.sort_code + extension :
                                                    index == 6 ? gemStone7?.sort_code + extension :
                                                        index == 7 ? gemStone8?.sort_code + extension :
                                                            index == 8 ? gemStone9?.sort_code + extension :
                                                                index == 9 ? gemStone10?.sort_code + extension :
                                                                    gemStone1?.sort_code + extension

                                ;
                            cacheKey = index == 0 ? gemStone1?.sort_code + extension :
                                index == 1 ? gemStone2?.sort_code + extension :
                                    index == 2 ? gemStone3?.sort_code + extension :
                                        index == 3 ? gemStone4?.sort_code + extension :
                                            index == 4 ? gemStone5?.sort_code + extension :
                                                index == 5 ? gemStone6?.sort_code + extension :
                                                    index == 6 ? gemStone7?.sort_code + extension :
                                                        index == 7 ? gemStone8?.sort_code + extension :
                                                            index == 8 ? gemStone9?.sort_code + extension :
                                                                index == 9 ? gemStone10?.sort_code + extension :
                                                                    gemStone1?.sort_code + extension;
                            const diamondMaterial = await viewer
                                .getManager()
                                .importer.importSinglePath("/assets/BDDmat/" + dmatName);
                            viewer.getPlugin(DiamondPlugin).prepareDiamondMesh(child, {
                                cacheKey: cacheKey,
                                normalMapRes: 512,
                            });
                            child.material = diamondMaterial;
                        }
                    })


                    // if (child.name.includes(`${birthStoneDetailData?.gemstone_glb_name.two ? birthStoneDetailData?.gemstone_glb_name.two : 'Gem_2'}`)) {
                    //     dmatName = gemStone2?.sort_code + extension;
                    //     cacheKey = gemStone2?.sort_code + extension;
                    //     const diamondMaterial = await viewer
                    //         .getManager()
                    //         .importer.importSinglePath("/assets/BDDmat/" + dmatName);
                    //     viewer.getPlugin(DiamondPlugin).prepareDiamondMesh(child, {
                    //         cacheKey: cacheKey,
                    //         normalMapRes: 512,
                    //     });
                    //     child.material = diamondMaterial;
                    // }

                    // if (child.name.includes(`${birthStoneDetailData?.gemstone_glb_name.three ? birthStoneDetailData?.gemstone_glb_name.three : "Gem_3"}`)) {
                    //     dmatName = gemStone3?.sort_code + extension;
                    //     cacheKey = gemStone3?.sort_code + extension;
                    //     const diamondMaterial = await viewer
                    //         .getManager()
                    //         .importer.importSinglePath("/assets/BDDmat/" + dmatName);
                    //     viewer.getPlugin(DiamondPlugin).prepareDiamondMesh(child, {
                    //         cacheKey: cacheKey,
                    //         normalMapRes: 512,
                    //     });
                    //     child.material = diamondMaterial;
                    // }

                    // if (child.name.includes(`${birthStoneDetailData?.gemstone_glb_name.four ? birthStoneDetailData?.gemstone_glb_name.four : "Gem_4"}`)) {
                    //     dmatName = gemStone4?.sort_code + extension;
                    //     cacheKey = gemStone4?.sort_code + extension;
                    //     const diamondMaterial = await viewer
                    //         .getManager()
                    //         .importer.importSinglePath("/assets/BDDmat/" + dmatName);
                    //     viewer.getPlugin(DiamondPlugin).prepareDiamondMesh(child, {
                    //         cacheKey: cacheKey,
                    //         normalMapRes: 512,
                    //     });
                    //     child.material = diamondMaterial;
                    // }

                    // if (child.name.includes(`${birthStoneDetailData?.gemstone_glb_name.five ? birthStoneDetailData?.gemstone_glb_name.five : 'Gem_5'}`)) {
                    //     dmatName = gemStone5?.sort_code + extension;
                    //     cacheKey = gemStone5?.sort_code + extension;
                    //     const diamondMaterial = await viewer
                    //         .getManager()
                    //         .importer.importSinglePath("/assets/BDDmat/" + dmatName);
                    //     viewer.getPlugin(DiamondPlugin).prepareDiamondMesh(child, {
                    //         cacheKey: cacheKey,
                    //         normalMapRes: 512,
                    //     });
                    //     child.material = diamondMaterial;
                    // }

                    if (child.name.includes("Diamond_1")) {
                        dmatName = gemStone1?.sort_code + extension;
                        cacheKey = gemStone1?.sort_code + extension;
                        const diamondMaterial = await viewer
                            .getManager()
                            .importer.importSinglePath("/assets/BDDmat/" + dmatName);
                        viewer.getPlugin(DiamondPlugin).prepareDiamondMesh(child, {
                            cacheKey: cacheKey,
                            normalMapRes: 512,
                        });
                        child.material = diamondMaterial;
                    }

                    if (child.name.includes("Diamond_2")) {
                        dmatName = gemStone2?.sort_code + extension;
                        cacheKey = gemStone2?.sort_code + extension;
                        const diamondMaterial = await viewer
                            .getManager()
                            .importer.importSinglePath("/assets/BDDmat/" + dmatName);
                        viewer.getPlugin(DiamondPlugin).prepareDiamondMesh(child, {
                            cacheKey: cacheKey,
                            normalMapRes: 512,
                        });
                        child.material = diamondMaterial;
                    }
                    if (
                        child.name.includes("Diamond_Round")
                    ) {
                        const smallDiamondMaterial = await viewer
                            .getManager()
                            .importer.importSinglePath("/assets/Dmat/" + smallDmatName);
                        viewer.getPlugin(DiamondPlugin).prepareDiamondMesh(child, {
                            cacheKey: "Diamond_Round",
                            normalMapRes: 256,
                        });
                        child.material = smallDiamondMaterial;
                    }
                }

                if (
                    child.modelObject.type == "Object3D" &&
                    child.modelObject.parent.modelObject.name == "Scene"
                ) {
                }
            });
            viewer.enable = true;
            viewer.renderEnabled = true;
            viewer.scene.setDirty({ sceneUpdate: true });
        }
    };

    useEffect(() => {
        setMaterial();
    }, [gemStone1, gemStone2, gemStone3, gemStone4, gemStone5, gemStone6, gemStone7, gemStone8, gemStone9, gemStone10, metalToneData, metalData, birthStoneDetailData])
    const handleEngravingText = async (e: any, index: number) => {
        const text = viewer.getPlugin(SimpleTextPlugin);
        // let fontStyles = await (
        //   await fetch(
        //     "https://fonts.googleapis.com/css2?family=Courgette&display=swap"
        //   )
        // ).text();

        // // Custom fonts
        // fontStyles += `
        // @font-face {
        //   font-family: 'Courgette';
        //   font-style: normal;
        //   font-weight: 400;
        //   font-display: swap;
        //   src: url(https://fonts.gstatic.com/s/courgette/v17/wEO_EBrAnc9BLjLQAUk1VvoK_kgXiQ.woff2) format('woff2');
        //   unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        // }
        // `;

        text.applyToAlphaMap = true;
        text.inverseAlphaMap = true;
        text.applyToMap = true;

        const state = {
            text: e.target.value,
            // rest of the text properties are saved in the GLB file.
        };

        if (index == 1) {
            const decalObject = viewer.scene.getObjectByName("UV_1");
            text.updateText(decalObject, { ...state });
        } else if (index == 2) {
            const decalObject = viewer.scene.getObjectByName("UV_2");
            text.updateText(decalObject, { ...state });
        } else if (index == 3) {
            const decalObject = viewer.scene.getObjectByName("UV_3");
            text.updateText(decalObject, { ...state });
        } else if (index == 4) {
            const decalObject = viewer.scene.getObjectByName("UV_4");
            text.updateText(decalObject, { ...state });
        }
    };

    // useEffect(() => {
    //     handleEngravingText
    // }, [viewer])

    const dynamicStyle = {
        width: "100%",
        height: width > 1024 ? `calc(${height}px - 400px)` : width > 700 ? `calc(${height}px - 694px)` : width > 380 ? `calc(${height}px - 586px)` : `73px`,
        // Add any other styles you need
    };
    return (
        <>
            <div className="grid lg:grid-cols-6 grid-cols-0 md:grid-cols-0 flex flex-wrap">
                <div
                    className={`lg:col-span-4 col-span-2 md:col-span-2 relative`}
                >
                    {isFullScreen ?
                        <></> :
                        <button
                            className="absolute flex bg-[#43464a] mt-[110px] opacity-90 text-white cursor-pointer items-center border border-2  rounded-full border-neutral-600 py-1 px-3 lg:hidden lg:left-44 md:left-8 left-8 rounded"
                            id="enter-fullscreen"
                            onClick={() => setShowModal(true)}
                        >
                            <span>
                                <AiOutlineInfoCircle
                                    style={{ height: "22px", width: "22px" }}
                                    className="cursor-pointer"
                                />
                            </span>
                            <p className="f-bold">
                                &nbsp;
                                {CURRENCY}{" "}
                                {birthstonePriceData &&
                                    birthstonePriceData.data &&
                                    birthstonePriceData?.data?.data?.toFixed(2)}
                            </p>
                        </button>
                    }

                    {isFullScreen ?
                        (
                            <>
                                {width < 1034 ? (
                                    <canvas
                                        id="webgi-canvas"
                                        style={{ height: height }}
                                        className="h-full lg:h-full md:h-full"
                                    ></canvas>
                                ) : (
                                    <canvas
                                        id="webgi-canvas"
                                        style={{ height: height }}
                                        className="h-full lg:h-full md:h-full"
                                    ></canvas>
                                )}
                            </>
                        ) : (
                            <>
                                {width > 1034 ? (
                                    <canvas
                                        id="webgi-canvas"
                                        style={{ height: height - 134 }}
                                        className=""
                                    ></canvas>
                                ) : width < 768 ? (
                                    <canvas
                                        id="webgi-canvas"
                                        className="w-full lg:h-full lg:w-full h-[370px] pt-[71px] lg:pt-0"
                                    ></canvas>
                                ) : (
                                    <canvas
                                        id="webgi-canvas"
                                        className="w-full lg:h-full lg:w-full h-[450px] pt-[71px] lg:pt-0"
                                    ></canvas>
                                )}
                            </>
                        )
                    }
                    {isFullScreen ?
                        <div className="floating-buttons topright mt-[-97px] md:mt-[15px] lg:mt-0">
                            <Button
                                style={{ background: webConfigBgColor }}
                                className="rounded"
                                id="enter-fullscreen"
                                onClick={handleFullScreen}
                            >
                                <span>
                                    <MdOutlineZoomOutMap height="30" width="30" />
                                </span>
                            </Button>
                        </div> :
                        <>
                            <div className="floating-buttons topright lg:mt-[17px] mt-[-0.875rem] md:mt-[91px]">
                                <Button
                                    style={{ background: webConfigBgColor, width: "20px" }}
                                    className="rounded"
                                    id="enter-fullscreen"
                                    onClick={handleFullScreen}
                                >
                                    <span>
                                        <MdOutlineZoomOutMap height="30" width="30" />
                                    </span>
                                </Button>
                            </div>
                            <button
                                className="absolute lg:top-[35px] top-[110px] p-2 lg:right-[9%] md:right-20 right-[53px]"
                                onClick={() => setShareClick(!shareClick)}
                            >
                                <img
                                    src={"/assets/TCCimage/share-icon.png"}
                                    alt={`share`}
                                    className="object-cover w-6 h-6"
                                />
                            </button>
                            {shareClick && (
                                <div className="gap-5 absolute lg:top-[17%] top-[35%] lg:right-0 right-0 md:right-0 p-2">
                                    <EmailShareButton
                                        className="mx-2"
                                        url={window.location.href}
                                    >
                                        <EmailIcon size={32} round={true} />
                                    </EmailShareButton>
                                    <FacebookShareButton
                                        className="mx-2"
                                        url={window.location.href}
                                    >
                                        <FacebookIcon size={32} round={true} />
                                    </FacebookShareButton>
                                    <WhatsappShareButton
                                        className="mx-2"
                                        url={window.location.href}
                                    >
                                        <WhatsappIcon size={32} round={true} />
                                    </WhatsappShareButton>
                                </div>
                            )}
                        </>
                    }

                    <div className="block lg:mt-[-60px] mt-[-3.375rem] lg:my-0 md:mt-[-3.375rem] bottom-[-52px] left-0 right-0 m-auto">
                        <div
                            className=" flex justify-center"
                            id="font-size-custom"
                        >
                            <div className="grid grid-cols-4 gap-2">
                                <button
                                    style={{ background: webConfigBgColor }}
                                    className={`flex justify-center items-center z-10 rounded-md w-full text-white px-2 sm:px-2 py-3 font-size_16`}
                                    onClick={handle360Image}
                                >
                                    <img
                                        src="../../icons/360.png"
                                        className="sm:pe-2 h-4 "
                                    />
                                    &nbsp;360
                                </button>

                                <button
                                    style={{ background: webConfigBgColor }}
                                    className={`flex justify-center items-center z-10 rounded-md w-full text-white px-2 sm:px-2  py-3 font-size_16`}
                                    onClick={handleVideoDownload}
                                >
                                    <img
                                        src="../../icons/video.png"
                                        className="sm:pe-2 h-4"
                                    />
                                    &nbsp;Video
                                </button>

                                <div className="relative flex justify-center">
                                    <button
                                        style={{ background: webConfigBgColor }}
                                        className={`flex justify-center items-center w-full rounded-md text-white items-center px-2 sm:px-2 py-3 font-size_16`}
                                        onClick={handleDropdownToggle1}
                                    >
                                        <img
                                            src="../../icons/eye2.png"
                                            alt="Eye"
                                            className="sm:pe-2 h-4"
                                        />
                                        &nbsp; {selectedOption || "View"}{" "}
                                        <span className="hidden sm:block">▼</span>
                                    </button>
                                    {isViewOpen && (
                                        <div
                                            ref={dropdownRef}
                                            className="absolute bottom-full position_dropdown left-0 w-full bg-white border border-gray-300 rounded-b-md"
                                        >
                                            <div className="d-flex flex-col p-4">
                                                <div>
                                                    <button
                                                        className="py-1"
                                                        onClick={() => handleCameraViews("1")}
                                                    >
                                                        Perspective View
                                                    </button>
                                                </div>
                                                <div>
                                                    <button
                                                        className="py-1"
                                                        onClick={() => handleCameraViews("2")}
                                                    >
                                                        Top View
                                                    </button>
                                                </div>
                                                <div>
                                                    <button
                                                        className="py-1"
                                                        onClick={() => handleCameraViews("3")}
                                                    >
                                                        Right View
                                                    </button>
                                                </div>
                                                <div>
                                                    <button
                                                        className="py-1"
                                                        onClick={() => handleCameraViews("0")}
                                                    >
                                                        Front View
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="relative flex justify-center">
                                    <button
                                        style={{ background: webConfigBgColor }}
                                        className={`flex w-full justify-center items-center rounded-md text-white items-center px-2  sm:px-10 md:px-10 py-3 font-size_16`}
                                        onClick={handleDownloadImage}
                                    >
                                        <img
                                            src="../../icons/download.png"
                                            alt="Eye"
                                            className=" sm:pe-2 h-4"
                                        />
                                        &nbsp;{" "}
                                        <span className="hidden sm:flex">Download</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*  Name  */}
                {showModal ? (
                    <>
                        <div className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none">
                            <div className="relative w-full my-6 mx-5 lg:mx-auto max-w-3xl">
                                <div className="border-0 rounded-lg shadow-lg px-5 relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    <div className="flex pl-0 items-start justify-between p-5 pb-2 pe-2 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="text-3xl font-semibold">
                                            {" "}
                                            <h3 className="font-bold">
                                                {productDescriptionData?.data?.data?.products?.name}
                                            </h3>
                                        </h3>
                                        <button
                                            className="p-1 ml-auto  border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setShowModal(false)}
                                        >
                                            <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            </span>
                                        </button>
                                    </div>

                                    <div className="pt-5 py-5 items-center  ">
                                        <div id="main_id" className="px-5 pl-0">
                                            <div>
                                                <p>
                                                    {" "}
                                                    <p className="text-body TCC-product-detail-discription">
                                                        {productDescriptionData?.data?.data?.products?.sku}
                                                    </p>
                                                </p>
                                            </div>
                                            <div className="mt-2">
                                                <p className="mb-0">
                                                    {" "}
                                                    <p className="text-body TCC-product-detail-discription">
                                                        {productDescriptionData?.data?.data?.products?.long_description}
                                                    </p>
                                                </p>


                                            </div>
                                        </div>
                                        <div id="price_id " className="px-5 pl-0">
                                            <div className="">
                                                <p className="text_size_16 font-bold pb-4 mt-5">
                                                    <span>
                                                        {" "}{CURRENCY}{" "}
                                                        {birthstonePriceData &&
                                                            birthstonePriceData.data &&
                                                            birthstonePriceData?.data?.data?.toFixed(2)}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            style={{ background: webConfigBgColor }}
                                            className="text-white active:bg-green-600 font-bold uppercase text-sm px-10 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        >
                                            BUY
                                        </button>
                                        <button
                                            className={`bg-gray-300 text-black text-white active:bg-green-600 font-bold uppercase text-sm px-8 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-[-20px] mb-1 ease-linear transition-all duration-150`}
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : <></>}
                <div className="lg:col-span-2 col-span-2 lg:pl-[15px] pe-0 lg:mt-[2px]">
                    <div className="lg:visible invisible md:invisible relative">
                        <h1 className="text-black feijoa-bold product-title mt-[6px]">{productDescriptionData?.data?.data?.products?.name}</h1>
                        <small style={{ color: `${webConfigBgColor}` }} className="flex w-100">{productDescriptionData?.data?.data?.products?.sku}</small>
                        <p className="text-black birthtone-tab-font font-semibold feijoa mt-[10px]">
                            <span
                                className="birthtone-tab-font feijoa text-black"
                            >
                                Price{" "}:
                                {" "}{CURRENCY}{" "}
                                {birthstonePriceData &&
                                    birthstonePriceData.data &&
                                    birthstonePriceData?.data?.data?.toFixed(2)}
                            </span>
                        </p>
                    </div>
                    <div className="lg:mt-3 mt-[-80px] lg:mb-3 mb-3 relative">
                        <span className="feijoa price-2-font text-black">Gemstone Type : </span>
                        <span className="feijoa" style={{ background: `${webConfigBgColor}`, backgroundClip: "text", WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text" }}>{gemstoneType?.name}</span>
                        <GemstoneTypeComponent
                            data={CONFIG_DATA.gemstone_type}
                            value={setGemstoneType}
                            selectedValue={gemstoneType}
                            className={{ mainButton: "py-3 w-full", buttonSelected: "localconfig-selected-value", tooltipData: { height: "25px", width: "25px", scaleStyle: "mx-auto scale-2001" }, imageData: { height: "15px", width: "15px" }, divmargin: "mt-2.5", fontstyle: "" }}
                        />
                    </div>
                    <div className="lg:mt-0 mt-[7px] overflow-x-hidden overflow-y-auto">
                        {/* Tabs */}
                        <div className="flex gap-10">
                            {tabs.map((tab, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleTabClick(index)}
                                    className={`${activeTab === index
                                        ? `border-b-2 border-gray-500 text-[${webConfigBgColor}]`
                                        : ""
                                        }  py-3 w-full px-4 mx-1 text-black focus:outline-none birthtone-tab-font feijoa`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                        {/* Tabs Content */}
                        <div
                            className=""
                            style={dynamicStyle}
                        >
                            {tabs.map((tab, index) => (
                                <div
                                    key={index}
                                    className={`${index === activeTab ? "block" : "hidden"} `}
                                >
                                    {activeTab === 0 ? (
                                        <div className="mt-3">
                                            <BirthStoneThreeData
                                                webConfigBgColor={{ webConfigBgColor, borderColor: 'localconfig-selected-value' }}
                                                data={gemStoneListData}
                                                value1={setGemStone1}
                                                value2={setGemStone2}
                                                value3={setGemStone3}
                                                value4={setGemStone4}
                                                value5={setGemStone5}
                                                value6={setGemStone6}
                                                value7={setGemStone7}
                                                value8={setGemStone8}
                                                value9={setGemStone9}
                                                value10={setGemStone10}
                                                selectedValue1={{ gemstone: gemStone1, name: `${gemStone1?.sort_code} ${gemStone1?.name}` }}
                                                selectedValue2={{ gemstone: gemStone2, name: `${gemStone2?.sort_code} ${gemStone2?.name}` }}
                                                selectedValue3={{ gemstone: gemStone3, name: `${gemStone3?.sort_code} ${gemStone3?.name}` }}
                                                selectedValue4={{ gemstone: gemStone4, name: `${gemStone4?.sort_code} ${gemStone4?.name}` }}
                                                selectedValue5={{ gemstone: gemStone5, name: `${gemStone5?.sort_code} ${gemStone5?.name}` }}
                                                selectedValue6={{ gemstone: gemStone6, name: `${gemStone6?.sort_code} ${gemStone6?.name}` }}
                                                selectedValue7={{ gemstone: gemStone7, name: `${gemStone7?.sort_code} ${gemStone7?.name}` }}
                                                selectedValue8={{ gemstone: gemStone8, name: `${gemStone8?.sort_code} ${gemStone8?.name}` }}
                                                selectedValue9={{ gemstone: gemStone9, name: `${gemStone9?.sort_code} ${gemStone5?.name}` }}
                                                selectedValue10={{ gemstone: gemStone10, name: `${gemStone10?.sort_code} ${gemStone10?.name}` }}

                                            />
                                        </div>
                                    ) : (
                                        <div>
                                            {/* <BirthStoneInscriptionData
                                                webConfigBgColor={{ webConfigBgColor, borderColor: 'config-birthstone-select-value' }}
                                                handleEngravingText={handleEngravingText}
                                                data={engravingName}
                                            /> */}
                                            <div className="gap-1 flex mt-2 grid grid-cols-2">

                                                {engravingName && engravingName.map((input: any, index: any) => {
                                                    return (
                                                        <>

                                                            <div className="flex">
                                                                <Input
                                                                    style={{ borderRadius: "3px", width: "100%", height: "30px" }}
                                                                    name="value"
                                                                    id="Inscription1"
                                                                    className="w-full mt-1"
                                                                    variant="solid"
                                                                    maxLength={input.max_text_count}
                                                                    value={input.value}
                                                                    onChange={(e: any) => {
                                                                        const data = [...engravingName]
                                                                        data[index].value = e.target.value
                                                                        setEngravingName(data)
                                                                        if (index === 0) {
                                                                            handleEngravingText(e, 2)
                                                                        } else if (index === 1) {
                                                                            handleEngravingText(e, 1)
                                                                        } else if (index === 2) {
                                                                            handleEngravingText(e, 3)
                                                                        } else if (index === 3) {
                                                                            handleEngravingText(e, 4)
                                                                        }
                                                                    }
                                                                    }
                                                                />
                                                                <p className="mt-2 ml-1">{input.value.length}/{input.max_text_count}</p>
                                                            </div>
                                                        </>

                                                    )
                                                })}
                                            </div>


                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="mt-6 w-full">
                                <BirthStoneMetalData
                                    webConfigBgColor={{ webConfigBgColor, borderColor: 'tcc-birthstone-tone-config' }}
                                    data={productDescriptionData?.data?.data?.metal_karat_list}
                                    value={setMetalData}
                                    selectedValue={metalData}
                                    onChange={(e: any) => setMetalData(e.target.value)}
                                />
                            </div>
                            <div className="mt-6 w-full">
                                {metalData && metalData.id_karat ? <BirthStoneToneData
                                    webConfigBgColor={{ webConfigBgColor, borderColor: 'tcc-birthstone-tone-config' }}
                                    data={productDescriptionData?.data?.data?.metal_tone}
                                    value={setMetalToneData}
                                    selectedValue={metalToneData}
                                    metalData={DATA.metal.component}
                                /> : <></>
                                }
                            </div>
                            <div className="mt-6 w-full">
                                <CheckBox
                                    labelKey="Transparent Background"
                                    onChange={handleBGChange}
                                />
                            </div>
                            <div className="mt-6 flex">
                                <button
                                    style={{ background: `${webConfigBgColor}`, height: "32px" }}
                                    className={`w-1/3 md:w-1/3 rounded lg:mb-0`}
                                // onClick={addCartProducthandler}
                                >
                                    <span className="py-2 3xl:px-8 text-white">ADD TO BAG</span>
                                </button>
                                {/* <MdOutlineFavorite
                                    size={20}
                                    color="red"
                                    style={{ pointerEvents: "none", marginLeft: "5px", marginTop: "5px" }}
                                /> */}
                            </div>
                            <div className="mt-5 mb-28 lg:mb-0">
                                <Collapse
                                    i={0}
                                    title={"Product Preview"}
                                    translatorNS="review"
                                    content={
                                        <div className="text-[#6C6C6C]">
                                            <div className="flex justify-between mb-4">
                                                <div className="ProximaNova-Regular">Birthstone Type</div>
                                                <div className="ProximaNova-Regular">{gemstoneType?.name}</div>
                                            </div>
                                            <div className="flex justify-between mb-4">
                                                <div className="ProximaNova-Regular">Birthstone 1</div>
                                                <div className="ProximaNova-Regular">{gemStone1?.sort_code}{" "}{gemStone1?.name}</div>
                                            </div>
                                            <div className="flex justify-between mb-4">
                                                <div className="ProximaNova-Regular">Birthstone 2</div>
                                                <div className="ProximaNova-Regular">{gemStone2?.sort_code}{" "}{gemStone2?.name}</div>
                                            </div>
                                            <div className="flex justify-between mb-4">
                                                <div className="ProximaNova-Regular">Birthstone 3</div>
                                                <div className="ProximaNova-Regular">{gemStone3?.sort_code}{" "}{gemStone3?.name}</div>
                                            </div>
                                            <div className="flex justify-between mb-4">
                                                <div className="ProximaNova-Regular">Birthstone 4</div>
                                                <div className="ProximaNova-Regular">{gemStone4?.sort_code}{" "}{gemStone4?.name}</div>
                                            </div>
                                            <div className="flex justify-between mb-4">
                                                <div className="ProximaNova-Regular">Birthstone 5</div>
                                                <div className="ProximaNova-Regular">{gemStone5?.sort_code}{" "}{gemStone5?.name}</div>
                                            </div>
                                            <div className="flex justify-between mb-4">
                                                <div className="ProximaNova-Regular">Metal</div>
                                                <div className="ProximaNova-Regular">{metalData?.name}</div>
                                            </div>
                                            <div className="flex justify-between mb-4">
                                                <div className="ProximaNova-Regular">Metal Tone</div>
                                                <div className="ProximaNova-Regular">{metalToneData?.name}</div>
                                            </div>
                                            <div className="flex justify-between">
                                                <div className="ProximaNova-Regular">Engraving</div>
                                                <div className="ProximaNova-Regular">Grishma Patel</div>
                                            </div>
                                        </div>
                                    }
                                    expanded={expanded}
                                    setExpanded={setExapanded}
                                    variant="transparent"
                                />
                                <Collapse
                                    i={1}
                                    title={"Delivery"}
                                    translatorNS="review"
                                    content={
                                        <div>
                                            <span className="ProximaNova-Regular">Standard Delivery:</span>
                                            <span className="ProximaNova-Regular">{" "}3 Weeks</span>
                                        </div>
                                    }
                                    expanded={expanded}
                                    setExpanded={setExapanded}
                                    variant="transparent"
                                />
                                <Collapse
                                    i={3}
                                    title={"Refund Policy"}
                                    translatorNS="review"
                                    content={
                                        <div>
                                            <span className="ProximaNova-Regular">These custom made products cannot be returned and refunded.</span>
                                        </div>
                                    }
                                    expanded={expanded}
                                    setExpanded={setExapanded}
                                    variant="transparent"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default BirthStoneProductSingleDetails;
