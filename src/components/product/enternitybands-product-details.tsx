import React, { useEffect, useRef, useState } from "react";

import Button from "@components/ui/button";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { CURRENCY } from "@utils/constants";
import DATA from "../../../public/api/enternity-bands.json";
import PRICING from "../../../public/api/pricing.json";
import CenterDiamondShape from "@components/configrator/center-diamond-shape";
import CenterDiamondSize from "@components/configrator/center-diamond-size";
import RingStyleColor from "@components/configrator/ring-style-color";
import CenterGemstone from "@components/configrator/center-gemstone";
import CenterDiamond from "@components/configrator/center-diamond";
import MetalComponent from "@components/configrator/metal-component";
import FallbackSpinner from "@components/spinner";
import { CheckBox } from "@components/ui/checkbox";
import { useWindowSize } from "@utils/use-window-size";
import { useSsrCompatible } from "@utils/use-ssr-compatible";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai";
import {
    ViewerApp,
    AssetManagerPlugin,
    VariationConfiguratorPlugin,
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
    CubeNormalsCaptureHelper,
    AssetExporterPlugin,
} from "webgi";
import { useCheckOtpVerify } from "@framework/auth/config-otp-verify";
import Link from "@components/ui/link";
import { useShopifyAddCartMutation } from "@framework/config-product-api/shopify-add-cart-api";
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";
import DiamondCenterComponent from "@components/configrator/diamond-center";

const EnternityBandsDetailComponent: React.FC = () => {

    const [centerDiamond, setCenterDiamond] = useState<any>();
    const [diamondShape, setDiamondShape] = useState<any>();
    const [diamondSize, setDiamondSize] = useState<any>();
    const [ringShank, setRingShank] = useState<any>();
    const [MetalData, setMetalData] = useState<any>();
    const [ringShankTone, setRingShankTone] = useState<any>();
    const [diamondQuality, setDiamondQuality] = useState<any>();
    const [isLoading, setLoading] = useState(true);
    const [isCanvasLoading, setIsCanvasLoading] = useState(false);
    const [centerGemstone, setCenterGemstone] = useState<any>();
    const [centerDiamondData, setCenterDiamondData] = useState<any>();
    const [viewer, setViewer] = useState<any>();
    const [isBgChecked, setIsBgChecked] = useState<boolean>(false);
    const [diamondSizeList, setDiamondSizeList] = useState<any>(DATA.center_diamond_size.component);
    const [is360Running, setIs360Running] = useState<boolean>(false);
    const [imageDownLoadIndex, setImageDownLoadIndex] = useState<string>("1");
    const [pricing, setPricing] = useState<any>("0");
    const [diamondShapeList, setDiamondShapeList] = useState<any>(DATA.center_diamond_shape.component);
    const [imageData, setImageData] = useState<any>();
    const [shankNumber, setShankNumber] = useState<any>()
    const [ringNumber, setRingNumber] = useState<any>()
    const { data: addCartData, mutate: shopifyAddTocart } =
        useShopifyAddCartMutation();

    const dropdownRef = useRef(null);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [showModal, setShowModal] = React.useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [shareClick, setShareClick] = useState(false);

    const { data, mutate: login3dConfig } = useCheckOtpVerify();
    const webConfigBgColor = process.env.NEXT_PUBLIC_WEBCONFIG_BG_COLOR;
    const userName = sessionStorage.getItem("config_user_email") as string;
    useEffect(() => {
        if (userName) {
            login3dConfig({
                user_name: userName,
            });
        }
    }, []);

    const { height, width } = useSsrCompatible(useWindowSize(), {
        width: 0,
        height: 0,
    });

    const handleDropdownToggle1 = () => {
        setIsViewOpen((prev) => !prev);
    };

    const imageUrl = process.env.NEXT_PUBLIC_IMG_URL + "configurator/static/";

    const [selectedValue, setSelectedValue] = useState({
        CenterDiamondId: 1,
        CentreDiamondShapeId: 1,
        CentreDiamondSizeID: 1,
        GemStoneId: 1,
        DiamondId: 2,
        CutId: 2,
        gemstoneoneId: 3,
        RingShankID: 1,
        RingStyleMetalID: 1,
        MetalComponentID: 1,

    });

    useEffect(() => {
        const centerDiamondId = DATA.center_diamond.component.filter(
            (t) => t.id === selectedValue.CenterDiamondId
        );

        setCenterDiamond(centerDiamondId.length !== 0 && centerDiamondId[0]);

        const gemstoneId = DATA.center_Gemstone.component.filter(
            (t) => t.id === selectedValue.GemStoneId
        );
        setCenterGemstone(gemstoneId.length !== 0 && gemstoneId[0]);
        const centreDiamondShapeId = DATA.center_diamond_shape.component.filter(
            (t) => t.id === selectedValue.CentreDiamondShapeId
        );
        setDiamondShape(
            centreDiamondShapeId.length !== 0 && centreDiamondShapeId[0]
        );

        // const gemstoneId = DATA.center_Gemstone.component.filter(
        //     (t) => t.id === selectedValue.GemStoneId
        // );
        // setCenterGemstone(gemstoneId.length !== 0 && gemstoneId[0]);

        const diamondId = DATA.diamond_center.component.filter(
            (t) => t.id === selectedValue.DiamondId
        );
        setCenterDiamondData(diamondId.length !== 0 && diamondId[0]);

        const centreDiamondSizeID = DATA.center_diamond_size.component.filter(
            (t) => t.id === selectedValue.CentreDiamondSizeID
        );
        setDiamondSize(centreDiamondSizeID.length !== 0 && centreDiamondSizeID[0]);
        const metalComponentID = DATA.metal.component.filter(
            (t) => t.id === selectedValue.MetalComponentID
        );
        setMetalData(metalComponentID.length !== 0 && metalComponentID[0]);

        const ringStyleMetalID = DATA.ring_shank_metal_tone.component.filter(
            (t) => t.id === selectedValue.RingStyleMetalID
        );
        setRingShankTone(ringStyleMetalID.length !== 0 && ringStyleMetalID[0]);

    }, []);

    async function setupViewer() {
        // Initialize the viewer
        const viewer: any = new ViewerApp({
            canvas: document.getElementById("webgi-canvas") as HTMLCanvasElement,
            useRgbm: true,
            assetManager: {},
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
        setIsCanvasLoading(true);
        const manager = await viewer.addPlugin(AssetManagerPlugin);

        // or use this to add all main ones at once.
        await addBasePlugins(viewer);

        // Add more plugins not available in base, like CanvasSnipperPlugin which has helpers to download an image of the canvas.
        //await viewer.addPlugin(AssetManagerBasicPopupPlugin);
        await viewer.addPlugin(CanvasSnipperPlugin);
        await viewer.addPlugin(AssetExporterPlugin);
        await viewer.addPlugin(MaterialConfiguratorPlugin);
        await viewer.addPlugin(FileTransferPlugin); //
        await viewer.addPlugin(CanvasRecorderPlugin); //
        await viewer.addPlugin(PopmotionPlugin); //
        await viewer.addPlugin(SimpleTextPlugin); //

        viewer.renderer.refreshPipeline();

        // This must be called once after all plugins are added.
        const options = { autoScale: false, autoCenter: false, useRgbm: true };
        viewer.enable = false;
        viewer.renderEnabled = false;
        const config = await viewer.addPlugin(VariationConfiguratorPlugin);
        config.autoDispose = false;
        CubeNormalsCaptureHelper.AutoDisposeTargets = false;

        await manager.addFromPath(`/assets/${diamondShape?.glb_name}.glb`, options);
        await Promise.all([
            manager.addFromPath(`${imageUrl}config_tcc.vjson`),
            manager.addFromPath("/assets/config_tcc_variation.json")
        ]);

        await manager.addFromPath("/assets/preset.CameraViews.json");
        setMaterial();
    };

    useEffect(() => {
        if (viewer) {
            setViewerControls();
        }
    }, [viewer]);


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
            if (ringShankTone && ringShankTone.sort_code == "YG") {
                metalMaterial = ygMaterial;
            } else if (ringShankTone && ringShankTone.sort_code == "WG") {
                metalMaterial = wgMaterial;
            } else if (ringShankTone && ringShankTone.sort_code == "RG") {
                metalMaterial = rgMaterial;
            }
            await viewer.scene.traverse(async function (child: any) {
                //SHank Metal
                if (child.name.includes("Metal03")) {
                    child.material = metalMaterial; //apply same material to all meshes
                }

                const extension = ".dmat";

                if (child.name.includes("Diamond") || child.name.includes("Gem")) {
                    let dmatName = "RD-";
                    let smallDmatName = "WT-" + "RD-" + "DIAMOND" + extension;
                    let cacheKey = "";
                    if (
                        child.name.includes("Diamond_Band01")
                    ) {
                        if (centerDiamond && centerDiamond.sort_code == "G") {
                            dmatName = dmatName + centerGemstone.sort_code + extension;
                        } else {
                            dmatName = "WT-" + dmatName + "DIAMOND" + extension;
                        }

                        const diamondMaterial = await viewer
                            .getManager()
                            .importer.importSinglePath("/assets/Dmat/" + dmatName);
                        viewer.getPlugin(DiamondPlugin).prepareDiamondMesh(child, {
                            cacheKey: cacheKey,
                            normalMapRes: 512,
                        });

                        child.material = diamondMaterial;
                    }

                    if (
                        child.name.includes("Diamond_Band02")
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

    const changeShape = async () => {
        await viewer.scene.disposeSceneModels();
        const manager = await viewer?.addPlugin(AssetManagerPlugin);
        await manager?.addFromPath(`/assets/${diamondShape?.glb_name}.glb`);
        setMaterial();
    };

    const glbSizeData = diamondSize?.glbData?.filter((t: any) => t?.sort_code == diamondShape?.sort_code).map((value: any) => value.name)

    const changeSize = async () => {
        await viewer.scene.disposeSceneModels();
        const manager = await viewer?.addPlugin(AssetManagerPlugin);
        await manager?.addFromPath(`/assets/${glbSizeData}.glb`);
        setMaterial();
    }

    useEffect(() => {
        if (viewer) {
            changeShape();
        }
    }, [diamondShape]);

    useEffect(() => {
        if (viewer) {
            changeSize();
        }
    }, [diamondSize, diamondShape]);

    useEffect(() => {
        setMaterial();
    }, [ringShankTone,
        centerGemstone,
        centerDiamond,
        diamondShape,
        diamondSize,
        MetalData]);

    const handleBGChange = async () => {
        setIsBgChecked(!isBgChecked);
        viewer.getPlugin(TonemapPlugin).config.tonemapBackground = isBgChecked;
        viewer.getPlugin(GroundPlugin).tonemapGround = isBgChecked;
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
        viewer.resize();
        await timeout(1000);
        await snipper.downloadSnapshot("image.png", {
            waitForProgressive: true, // download anti-aliased image
            displayPixelRatio: scale,
        });
        await timeout(1000);
        viewer.setSize({ width: "100%", height: height });
        viewer.resize();
    };

    const addCartProducthandler = async () => {
        await timeout(1000);
        viewer.setDirty();
        const snipper = viewer.getPlugin(CanvasSnipperPlugin);
        const file = await snipper.getFile();
        setImageData(file);
    };

    useEffect(() => {
        if (addCartData?.code == 200 && addCartData?.data) {
            setImageData("");
            window.location.assign(
                `https://quickstart-3c059c30.myshopify.com/cart/add?id=${addCartData.data.variant_id}&quantity=1`
            );
        }
    }, [addCartData]);

    useEffect(() => {
        if (imageData && imageData != "" && imageData != undefined)
            shopifyAddTocart({
                center_stone: centerGemstone?.sort_code,
                center_stone_shape: diamondShape?.sort_code,
                center_stone_size: diamondSize?.sort_code,
                center_stone_color: "H",
                center_stone_clarity: "VS",
                shank: ringShank?.sort_code,
                metal: MetalData?.metal,
                image: imageData,
                karat: MetalData?.karat,
                product_title: "Classic Engagement Ring",
                sort_description: "ring product demo ring product demo",
                price: pricing,
                sku: "TC_PRODUCT_NEW_DEMO",
                ring_no: ringNumber ? ringNumber : "null",
                shank_no: shankNumber,
                app_name: "THE_CADCO_APP"
            });
    }, [imageData]);

    const handleFullScreen = async () => {
        setIsFullScreen(!isFullScreen)
        const canvas = document.getElementById("webgi-canvas") as HTMLCanvasElement;
        viewer.getPlugin(FullScreenPlugin).toggle(canvas.parentElement);
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
        const camViews = viewer.getPlugin(CameraViewPlugin);
        await camViews.animateToView(camViews.camViews[parseInt(value)]);
        viewer.scene.setDirty({ sceneUpdate: true });
    };

    const handle360Image = async () => {

        //Camera Rotation

        if (is360Running) {
            viewer.scene.activeCamera.controls.autoRotate = false;
            viewer.scene.activeCamera.controls.autoRotateSpeed = 0;
        } else {
            const popmotion = await viewer.getPlugin(PopmotionPlugin);

            popmotion.animate({
                from: 0,
                to: 1.57,
                duration: 1 * 1000,
                ease: EasingFunctions.linear,
                onUpdate: (v: number) => {
                    viewer.scene.modelRoot.rotation.z = v;
                    viewer.scene.modelRoot.rotation.x = v;
                },
            }).promise;

            const camViews = viewer.getPlugin(CameraViewPlugin);
            await camViews.animateToView(
                camViews.camViews.find((t: any) => t.name == "#360"),
                1000
            );
            viewer.scene.setDirty({ sceneUpdate: true });

            viewer.scene.activeCamera.controls.autoRotate = true;
            viewer.scene.activeCamera.controls.autoRotateSpeed = 5;
        }
        setIs360Running(!is360Running);
    };

    const handleVideoDownload = async () => {
        viewer.setDirty(); // trigger a rerender.
        const recorder = viewer.getPlugin(CanvasRecorderPlugin);
        const progressive = viewer.getPlugin(ProgressivePlugin);
        const fileTransfer = viewer.getPlugin(FileTransferPlugin);

        const popmotion = await viewer.getPlugin(PopmotionPlugin);

        popmotion.animate({
            from: 0,
            to: 1.57,
            duration: 1 * 1000,
            ease: EasingFunctions.linear,
            onUpdate: (v: number) => {
                viewer.scene.modelRoot.rotation.z = v;
                viewer.scene.modelRoot.rotation.x = v;
            },
        }).promise;

        const camViews = viewer.getPlugin(CameraViewPlugin);
        await camViews.animateToView(
            camViews.camViews.find((t: any) => t.name == "#360"),
            1000
        );
        viewer.scene.setDirty({ sceneUpdate: true });

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
                    to: -(current.theta + Math.PI * 3),
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

    // useEffect(() => {
    //     let filterData = diamondShape ? DATA.center_diamond_size.component.filter((e) => diamondShape.diamond_size_id.includes(e.id)) : DATA.center_diamond_size.component
    //     setDiamondSizeList(filterData)
    // }, [diamondShape])

    return (
        <>
            {isLoading ? (
                <FallbackSpinner />
            ) : (
                <div className="block lg:grid grid-cols-3 gap-x-10 TCC-main-component w-100">
                    <div
                        className={`col-span-2 grid grid-cols-1 TCC-image-component relative`}
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
                                    &nbsp;{CURRENCY}{" "}
                                    {`${parseInt(centerDiamond ? centerDiamond.price : 0) + parseInt(centerGemstone ? centerGemstone.price : 0) + parseInt(diamondShape ? diamondShape.price : 0) + parseInt(diamondSize ? diamondSize.price : 0) + parseInt(diamondQuality ? diamondQuality.price : 0) + parseInt(ringShank ? ringShank.price : 0) + parseInt(MetalData ? MetalData.price : 0)}`}
                                </p>
                            </button>
                        }

                        {isFullScreen ?
                            <>
                                {width < 1034 ?
                                    <canvas id="webgi-canvas" style={{ height: height, fontFamily: 'initial' }} className="h-full lg:h-full md:h-full"></canvas>
                                    :
                                    <canvas id="webgi-canvas" style={{ height: height, fontFamily: 'initial' }} className="h-full lg:h-full md:h-full"></canvas>
                                }
                            </> :
                            <>
                                {width > 1034 ?
                                    <canvas id="webgi-canvas" style={{ height: height - 120 }} ></canvas>
                                    : width < 768 ?
                                        <canvas id="webgi-canvas" className="w-full lg:h-full lg:w-full h-[370px] pt-[71px] lg:pt-0"></canvas>
                                        :
                                        <canvas id="webgi-canvas" className="w-full lg:h-full lg:w-full h-[450px] pt-[71px] lg:pt-0"></canvas>
                                }
                            </>
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
                                <div className="floating-buttons topright mt-[-14px] md:mt-[93px] lg:mt-0">
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
                                    className="absolute lg:top-[21px] top-[110px] p-2 lg:right-[9%] md:right-20 right-[53px]"
                                    onClick={() => setShareClick(!shareClick)}
                                >
                                    <img
                                        src={"/assets/TCCimage/share-icon.png"}
                                        alt={`share`}
                                        className="object-cover w-6 h-6"
                                    />
                                </button>
                                {shareClick && (
                                    <div className="gap-5 absolute lg:top-[13%] top-[35%] lg:right-0 right-0 md:right-0 p-2">
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

                        <div className="block lg:mt-[-60px] mt-[-4.375rem] lg:my-0 md:mt-[-4.375rem] bottom-[-52px] left-0 right-0 m-auto">
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
                                            onClick={() => {
                                                handleCameraViews("1")
                                                handleDownloadImage()
                                            }}
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
                    {showModal ? (
                        <>
                            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                <div className="relative w-full my-6 mx-5 lg:mx-auto max-w-3xl">

                                    {/*content*/}

                                    <div className="border-0 rounded-lg shadow-lg px-5 relative flex flex-col w-full bg-white outline-none focus:outline-none">

                                        {/*header*/}

                                        <div className="flex pl-0 items-start justify-between p-5 pb-2 pe-2 border-b border-solid border-slate-200 rounded-t">
                                            <h3 className="text-3xl font-semibold">
                                                {" "}
                                                <h3 className="font-bold">Enternity Band</h3>
                                            </h3>
                                            <button
                                                className="p-1 ml-auto  border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                onClick={() => setShowModal(false)}
                                            >
                                                <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                    {/* &#128473; */}
                                                </span>
                                            </button>
                                        </div>

                                        <div className="pt-5 py-5 items-center  ">
                                            <div id="main_id" className="px-5 pl-0">
                                                <div>
                                                    <p
                                                    >
                                                        {" "}
                                                        <p className="text-body TCC-product-detail-discription">
                                                            PN_PN_SH_OV_I_I1_1_GD_18
                                                        </p>
                                                    </p>
                                                </div>
                                                <div className="mt-2">
                                                    <p className="mb-0">
                                                        {" "}
                                                        <p className="text-body TCC-product-detail-discription">
                                                            Classic Enternity Band
                                                        </p>
                                                    </p>
                                                    <p>
                                                        &#11088; &#11088; &#11088; &#11088; &#11088;{" "}
                                                        <div>(107 Reviewed)</div>
                                                    </p>
                                                </div>
                                            </div>
                                            <div id="price_id " className="px-5 pl-0">
                                                <div className="">
                                                    <p className="text_size_16 font-bold pb-4 mt-5">
                                                        Price*
                                                        <span>
                                                            : {CURRENCY}
                                                            {`${parseInt(centerDiamond ? centerDiamond.price : 0) + parseInt(centerGemstone ? centerGemstone.price : 0) + parseInt(diamondShape ? diamondShape.price : 0) + parseInt(diamondSize ? diamondSize.price : 0) + parseInt(diamondQuality ? diamondQuality.price : 0) + parseInt(ringShank ? ringShank.price : 0) + parseInt(MetalData ? MetalData.price : 0)}`}

                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/*footer*/}

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
                    ) : (
                        <></>
                    )}
                    <div className="col-span-1 TCC-dis-component ps-3">
                        <div className="">
                            <div className="flex invisible lg:visible md:invisible">
                                <h2 className="text-black mb-3.5 TCC-product-detail-heading pt-3">
                                    Enternity Band{" "}
                                    <small style={{ color: webConfigBgColor }} className="flex w-100">TCC-100007</small>
                                </h2>
                            </div>

                            {/* {/ Discription /} */}

                            <p className="text-body invisible lg:visible md:invisible TCC-product-detail-discription w-2/3">
                                Classic Enternity Band
                            </p>

                            <div className="flex items-center mt-5 invisible lg:visible md:invisible">
                                <div className="font-bold text-base md:text-xl lg:text-2xl 2xl:text-4xl pe-2 md:pe-0 lg:pe-2 2xl:pe-0">
                                    <span style={{ color: webConfigBgColor }} className="TCC-product-configurator-price">
                                        {CURRENCY}
                                        {`${parseInt(centerDiamond ? centerDiamond.price : 0) + parseInt(centerDiamondData ? centerDiamondData.price : 0) + parseInt(centerGemstone ? centerGemstone.price : 0) + parseInt(diamondShape ? diamondShape.price : 0) + parseInt(diamondSize ? diamondSize.price : 0) + parseInt(diamondQuality ? diamondQuality.price : 0) + parseInt(ringShank ? ringShank.price : 0) + parseInt(MetalData ? MetalData.price : 0)}`}

                                    </span>
                                </div>
                            </div>
                        </div>
                        <div
                            className="lg:config-filter-content lg:overflow-x-hidden lg:overflow-y-auto lg:mh-50 ml pe-5 lg:mt-0 mt-[295px] md:mt-[-136px]"
                            style={{ height: height - 297 }}
                        >
                            {/* Config Component */}

                            <div>
                                <span className="TCC-config-title">Center Diamond: </span>
                                <span className="" style={{ background: `${webConfigBgColor}`, backgroundClip: "text", WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text" }}>{centerDiamond.name}</span>
                                <CenterDiamond
                                    data={DATA.center_diamond.component}
                                    value={setCenterDiamond}
                                    selectedValue={centerDiamond}
                                    className={{ mainButton: "px-7 py-3 w-full", buttonSelected: "localconfig-selected-value", tooltipData: { height: "50px", width: "50px" }, imageData: { height: "25px", width: "25px" }, imageStyle: "mx-auto" }}
                                />
                            </div>
                            <div className="border-b border-gray-300 my-3" />
                            {centerDiamond?.sort_code == "D" && (
                                <div>
                                    <span className="TCC-config-title">Diamond Type: </span>
                                    <span className="" style={{ background: `${webConfigBgColor}`, backgroundClip: "text", WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text" }}>{centerDiamondData.name}</span>
                                    <DiamondCenterComponent
                                        data={DATA.diamond_center.component}
                                        value={setCenterDiamondData}
                                        selectedValue={centerDiamondData}
                                        className={{ mainButton: "py-3 w-full", buttonSelected: "localconfig-selected-value", tooltipData: { height: "50px", width: "50px" }, imageData: { height: "25px", width: "25px" } }}
                                    />
                                    <div className="border-b border-gray-300 my-3" />

                                </div>
                            )}
                            {centerDiamond?.sort_code == "G" && (
                                <div>
                                    <span className="TCC-config-title">Alternate Gemstone: </span>
                                    <span className="" style={{ background: `${webConfigBgColor}`, backgroundClip: "text", WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text" }}>{centerGemstone.name}</span>
                                    <CenterGemstone
                                        data={DATA.center_Gemstone.component}
                                        value={setCenterGemstone}
                                        selectedValue={centerGemstone}
                                        className={{ mainButton: "py-3 w-full", buttonSelected: "localconfig-selected-value", tooltipData: { height: "50px", width: "50px", imageStyle: "mx-auto" }, imageData: { height: "25px", width: "25px" } }}
                                    />
                                    <div className="border-b border-gray-300 my-3" />

                                </div>
                            )}

                            <div>
                                <span className="TCC-config-title">Center Diamond Shape: </span>
                                <span className="" style={{ background: `${webConfigBgColor}`, backgroundClip: "text", WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text" }}>{diamondShape.name}</span>
                                <CenterDiamondShape
                                    data={diamondShapeList}
                                    value={setDiamondShape}
                                    filter={centerDiamond?.sort_code}
                                    selectedValue={diamondShape}
                                    className={{ mainButton: "py-3 w-full", buttonSelected: "localconfig-selected-value", tooltipData: { height: "50px", width: "50px", scaleStyle: "mx-auto scale-2001" }, imageData: { height: "25px", width: "25px" } }}
                                />
                            </div>
                            <div className="border-b border-gray-300 my-3" />

                            <div>
                                <span className="TCC-config-title">Center Diamond Size: </span>
                                <span className="" style={{ background: `${webConfigBgColor}`, backgroundClip: "text", WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text" }}>{diamondSize.value}</span>
                                <CenterDiamondSize
                                    data={diamondSizeList}
                                    value={setDiamondSize}
                                    selectedValue={diamondSize}
                                    className={{ mainButton: "px-7 py-3 w-full", buttonSelected: "localconfig-selected-value", tooltipData: { height: "50px", width: "50px", scaleStyle: "mx-auto scale-2001" }, imageData: { height: "25px", width: "25px" } }}
                                />
                            </div>

                            <div className="border-b border-gray-300 my-3" />

                            <div>
                                <span className="TCC-config-title">Metal: </span>
                                <span className="" style={{ background: `${webConfigBgColor}`, backgroundClip: "text", WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text" }}>
                                    {MetalData?.sort_code !== "PL" ?
                                        <>{MetalData?.sort_code}{" "}{MetalData?.name}</>
                                        :
                                        <>{MetalData?.name}</>
                                    }
                                </span>
                                <MetalComponent
                                    data={DATA.metal.component}
                                    value={setMetalData}
                                    selectedValue={MetalData}
                                    className={{ mainButton: "px-7 py-3 w-full", buttonSelected: "localconfig-selected-value", tooltipData: { height: "50px", width: "50px" }, imageData: { height: "25px", width: "25px" }, fontStyle: "font-bold" }}
                                />
                            </div>

                            <div className="border-b border-gray-300 my-3" />
                            {MetalData?.is_karat == 1 && (
                                <div>
                                    <span className="TCC-config-title">Ring Color Tone: </span>
                                    <span className="" style={{ background: `${webConfigBgColor}`, backgroundClip: "text", WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text" }}>{ringShankTone.name}</span>
                                    <RingStyleColor
                                        data={DATA.ring_shank_metal_tone.component}
                                        value={setRingShankTone}
                                        selectedValue={ringShankTone}
                                        onChange={(e: any) => e.target.value}
                                        className={{ mainButton: "px-7 py-3 w-full", buttonSelected: "localconfig-selected-value", imageData: { height: "25px", width: "25px" } }}
                                    />
                                    <div className="border-b border-gray-300 my-3" />
                                </div>
                            )}

                            {/* Snap Shot Style*/}

                            <div className="mb-5 w-full">
                                <span className="TCC-product-text-diamond-shape ">
                                    Image Resolution
                                </span>
                                <Dropdown
                                    className="w-full mt-3"
                                    options={[
                                        { label: "700 * 700", value: "1" },
                                        { label: "1024 * 1024", value: "2" },
                                        { label: "1980 * 1980", value: "3" },
                                    ]}
                                    value={imageDownLoadIndex}
                                    onChange={(e: any) => {
                                        setImageDownLoadIndex(e.value);
                                    }}
                                />
                            </div>

                            <div className="mb-5 w-full">
                                <CheckBox
                                    labelKey="Transparent Background"
                                    onChange={handleBGChange}
                                />
                            </div>

                            {/*  Download Button  */}

                            <div className="flex justify-start mb-12 mb- items-center">
                                <Button
                                    variant="slim"
                                    style={{ background: webConfigBgColor }}
                                    className={`w-1/3 md:w-1/3 rounded hover:bg-[#DBB961] mb-16 lg:mb-0 mr-5`}
                                    onClick={() => {
                                        handleCameraViews("1")
                                        handleDownloadImage()
                                    }}
                                >
                                    <span className="py-2 3xl:px-8">Download</span>
                                </Button>

                                <Link href={``}>
                                    <Button
                                        variant="slim"
                                        onClick={async () => {
                                            handleCameraViews("1")
                                            await addCartProducthandler()
                                        }}
                                        className={`w-100 md:w-100 rounded bg-[#DBB961] hover:bg-[#DBB961] mb-16 lg:mb-0`}
                                    >
                                        <span className="py-2 3xl:px-8">Add To cart</span>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EnternityBandsDetailComponent;
