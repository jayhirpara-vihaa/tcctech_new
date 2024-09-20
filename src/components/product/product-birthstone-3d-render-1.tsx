import React, { useEffect, useRef, useState } from "react";
import { MdOutlineFavorite } from "react-icons/md";
import Dropdown from "react-dropdown";

import Button from "@components/ui/button";
import { CheckBox } from "@components/ui/checkbox";
import DATA from "../../../public/api/birth-stone.json";
import BirthStoneToneData from "@components/configrator/birthstone-tone";
import BirthStoneMetalData from "@components/configrator/birthstone-metal";
import BirthStoneInscriptionData from "@components/configrator/birthstone-inscription";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { CURRENCY } from "@utils/constants";
import { MdOutline360, MdOutlineZoomOutMap } from "react-icons/md";

import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import {
  ViewerApp,
  AssetManagerPlugin,
  addBasePlugins,
  CanvasSnipperPlugin,
  MaterialConfiguratorPlugin,
  DiamondPlugin,
  SimpleTextPlugin,
  DebugPlugin,
  FrontSide,
  LinearFilter,
  EasingFunctions,
  TonemapPlugin,
  GroundPlugin,
  FullScreenPlugin,
  Spherical,
  timeout,
  CubeNormalsCaptureHelper,
  PopmotionPlugin,
  CanvasRecorderPlugin,
  FileTransferPlugin,
  AssetManagerBasicPopupPlugin,
  CameraViewPlugin,
  ProgressivePlugin,
} from "webgi";
import BirthStoneThreeData from "@components/configrator/birth-stone-three";
import { useWindowSize } from "@utils/use-window-size";
import { useSsrCompatible } from "@utils/use-ssr-compatible";
import { useShopifyAddCartBirsthStoneMutation } from "@framework/config-product-api/shopify-add-cart-birthstone";

const ProductBirthStone3DRenderLocal1: React.FC = () => {
  const webConfigBgColor = process.env.NEXT_PUBLIC_ZAMLES_BG_COLOR;

  const [activeTab, setActiveTab] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [shareClick, setShareClick] = useState(false);
  const [gemStoneOne, setGemStoneOne] = useState<any>();
  const [gemStoneTwo, setGemStoneTwo] = useState<any>();
  const [gemStoneThree, setGemStoneThree] = useState<any>();
  const [gemStoneFour, setGemStoneFour] = useState<any>();
  const [gemStoneFives, setGemStoneFive] = useState<any>();
  const [metalToneData, setMetalToneData] = useState<any>();
  const [metalData, setMetalData] = useState<any>();
  const [engravingName, setEngravingName] = useState<string>("");
  const [isLoading, setLoading] = useState(true);
  const [viewer, setViewer] = useState<any>();
  const [materials, setMaterials] = useState<string[]>([]);
  const [pricing, setPricing] = useState<any>("0");
  const [imageDownLoadIndex, setImageDownLoadIndex] = useState<string>("1");
  const [is360Running, setIs360Running] = useState<boolean>(false);
  const [isBgChecked, setIsBgChecked] = useState<boolean>(false);

  const [selectedValue, setSelectedValue] = useState({
    oneGemStoneId: 1,
    twoGemStoneId: 1,
    threeGemstoneId: 1,
    fourGemstoneId: 1,
    fiveGemstoneId: 1,
    metalToneId: 1,
    metalId: 1,
  });

  const { height, width } = useSsrCompatible(useWindowSize(), {
    width: 0,
    height: 0,
  });
  const [isFullScreen, setIsFullScreen] = useState(false);

  const imageUrl = process.env.NEXT_PUBLIC_IMG_URL + "configurator/";


  const [imageData, setImageData] = useState<any>();
  const { data: addCartData, mutate: shopifyAddTocartBirthSTone } =
    useShopifyAddCartBirsthStoneMutation();

  useEffect(() => {
    if (addCartData?.code == 200 && addCartData?.data) {
      setImageData("");
      window.location.assign(
        `https://zamels-development.myshopify.com/cart/add?id=${addCartData.data.variant_id}&quantity=1`
      );
    }
  }, [addCartData]);

  const addCartProducthandler = async () => {
    const snipper = viewer.getPlugin(CanvasSnipperPlugin);
    const file = await snipper.getFile();
    setImageData(file);
    // https://quickstart-3c059c30.myshopify.com/cart/add?id=${productVariantNumber ? productVariantNumber[0]?.value : 45981592420641}&quantity=${quntity}
  };

  const handleFullScreen = async () => {
    setIsFullScreen(!isFullScreen);
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
      console.error("Popmotion plugin not found");
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

  useEffect(() => {
    if (imageData && imageData != "" && imageData != undefined)
      shopifyAddTocartBirthSTone({
        product_type: "pendet1",
        stone_1: gemStoneOne.sort_code,
        stone_2: gemStoneTwo.sort_code,
        stone_3: gemStoneThree.sort_code,
        stone_4: gemStoneFour.sort_code,
        stone_5: gemStoneFives.sort_code,
        metal: metalData.name,
        karat: metalData.karat,
        image: imageData,
        product_title: "Classic pendet",
        sort_description: "pendet product demo pendet product demo",
        price: `${parseInt(metalData ? metalData.price : 0) +
          parseInt(gemStoneOne ? gemStoneOne.price : 0) +
          parseInt(gemStoneTwo ? gemStoneTwo.price : 0)
          }`,
        sku: "TC_PRODUCT_NEW_DEMO",
        app_name: "ZAMELS_APP",
      });
  }, [imageData]);

  const handleTabClick = (index: any) => {
    setActiveTab(index);
  };

  const tabs = [
    {
      label: "Birthstone",
    },
    {
      label: "Inscription",
    },
  ];

  const handleDropdownToggle1 = () => {
    setIsViewOpen((prev) => !prev);
  };

  const handleDropdownToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  const dropdownRef = useRef(null);

  // ************ VIEWVIER_CONTROLLER

  useEffect(() => {
    const metalData = DATA.metal.component.filter(
      (t: any) => t.id == selectedValue.metalId
    );

    setMetalData(metalData[0]);

    const gemStoneId = DATA.data.map((t: any) =>
      t.gemstone.filter((value: any) => value.id == selectedValue.oneGemStoneId)
    );
    setGemStoneOne(...gemStoneId[0]);

    const gemStoneId2 = DATA.data.map((t: any) =>
      t.gemstone.filter((value: any) => value.id == selectedValue.twoGemStoneId)
    );
    setGemStoneTwo(...gemStoneId2[0]);

    const gemStoneId3 = DATA.data.map((t: any) =>
      t.gemstone.filter(
        (value: any) => value.id == selectedValue.threeGemstoneId
      )
    );
    setGemStoneThree(...gemStoneId3[0]);
    const gemStoneId4 = DATA.data.map((t: any) =>
      t.gemstone.filter(
        (value: any) => value.id == selectedValue.fourGemstoneId
      )
    );
    setGemStoneFour(...gemStoneId4[0]);
    const gemStoneId5 = DATA.data.map((t: any) =>
      t.gemstone.filter(
        (value: any) => value.id == selectedValue.fiveGemstoneId
      )
    );
    setGemStoneFive(...gemStoneId5[0]);

    const metaToneIdE = DATA.metal_tone.component.filter(
      (t: any) => t.id == selectedValue.metalToneId
    );

    setMetalToneData(metaToneIdE[0]);
  }, []);

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

    //viewer.getPlugin(TonemapPlugin).config.tonemapBackground = true;
    //viewer.getPlugin(GroundPlugin).tonemapGround = true;
    viewer.renderer.refreshPipeline();
    const options = { autoScale: false, autoCenter: false, useRgbm: true };
    viewer.enable = false;
    viewer.renderEnabled = false;

    CubeNormalsCaptureHelper.AutoDisposeTargets = false;
    await manager.addFromPath(`${imageUrl}birthstone/VM-PD-R-33324.glb`, options);
    // await manager.addFromPath("/assets/VM-PD-R-33324 UV.glb", options);
    await manager.addFromPath(`${imageUrl}static/config_birthstone_pendant.vjson`);
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
      if (metalToneData && metalToneData.sort_code == "YG") {
        metalMaterial = ygMaterial;
      } else if (metalToneData && metalToneData.sort_code == "WG") {
        metalMaterial = wgMaterial;
      } else if (metalToneData && metalToneData.sort_code == "RG") {
        metalMaterial = rgMaterial;
      }
      viewer.scene.traverse(async function (child: any) {
        //SHank Metal
        if (child.name.includes("Metal")) {
          child.material = metalMaterial; //apply same material to all meshes
        }

        const extension = ".dmat";

        if (child.name.includes("Diamond") || child.name.includes("Gem")) {
          let dmatName = "RD-";
          let smallDmatName = "WT-" + "RD-" + "DIAMOND" + extension;
          let cacheKey = "";
          if (child.name.includes("Gem_1")) {
            dmatName = gemStoneOne.sort_code + extension;
            cacheKey = gemStoneOne.sort_code + extension;
            const diamondMaterial = await viewer
              .getManager()
              .importer.importSinglePath("/assets/BDmat/" + dmatName);
            viewer.getPlugin(DiamondPlugin).prepareDiamondMesh(child, {
              cacheKey: cacheKey,
              normalMapRes: 512,
            });
            child.material = diamondMaterial;
          }

          if (child.name.includes("Gem_2")) {
            dmatName = gemStoneTwo.sort_code + extension;
            cacheKey = gemStoneTwo.sort_code + extension;
            const diamondMaterial = await viewer
              .getManager()
              .importer.importSinglePath("/assets/BDmat/" + dmatName);
            viewer.getPlugin(DiamondPlugin).prepareDiamondMesh(child, {
              cacheKey: cacheKey,
              normalMapRes: 512,
            });
            child.material = diamondMaterial;
          }

          if (child.name.includes("Gem_3")) {
            dmatName = gemStoneThree.sort_code + extension;
            cacheKey = gemStoneThree.sort_code + extension;
            const diamondMaterial = await viewer
              .getManager()
              .importer.importSinglePath("/assets/BDmat/" + dmatName);
            viewer.getPlugin(DiamondPlugin).prepareDiamondMesh(child, {
              cacheKey: cacheKey,
              normalMapRes: 512,
            });
            child.material = diamondMaterial;
          }

          if (child.name.includes("Gem_4")) {
            dmatName = gemStoneFour.sort_code + extension;
            cacheKey = gemStoneFour.sort_code + extension;
            const diamondMaterial = await viewer
              .getManager()
              .importer.importSinglePath("/assets/BDmat/" + dmatName);
            viewer.getPlugin(DiamondPlugin).prepareDiamondMesh(child, {
              cacheKey: cacheKey,
              normalMapRes: 512,
            });
            child.material = diamondMaterial;
          }

          if (child.name.includes("Gem_5")) {
            dmatName = gemStoneFives.sort_code + extension;
            cacheKey = gemStoneFives.sort_code + extension;
            const diamondMaterial = await viewer
              .getManager()
              .importer.importSinglePath("/assets/BDmat/" + dmatName);
            viewer.getPlugin(DiamondPlugin).prepareDiamondMesh(child, {
              cacheKey: cacheKey,
              normalMapRes: 512,
            });
            child.material = diamondMaterial;
          }
          if (child.name.includes("Diamond_Round")) {
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

  useEffect(() => {
    setMaterial();
  }, [
    gemStoneOne,
    gemStoneTwo,
    metalToneData,
    gemStoneThree,
    gemStoneFour,
    gemStoneFives,
  ]);

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
                &nbsp;{CURRENCY}{" "}
              </p>
            </button>
          }

          {isFullScreen ?
            (
              <>
                {width < 1034 ? (
                  <canvas
                    id="webgi-canvas"
                    style={{ height: height - 60 }}
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
                    style={{ height: height - 160 }}
                    className="mt-[33px]"
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

          <div className="block lg:mt-[-60px] my-2.5 lg:my-0 md:my-2.5 bottom-[-52px] left-0 right-0 m-auto">
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
        {/* <div className="lg:col-span-4 col-span-2 md:col-span-2">
          <div className="flex justify-center">
            <button
              className="absolute flex bg-[#43464a] mt-[31px] opacity-90 text-white cursor-pointer items-center border border-2  rounded-full border-neutral-600 py-1 px-3 lg:hidden lg:left-44 md:left-8 left-8 rounded"
              id="enter-fullscreen"
              onClick={() => setShowModal(true)}
            >
              <span>
                <AiOutlineInfoCircle
                  style={{ height: "22px", width: "22px" }}
                  className="cursor-pointer"
                />
              </span>
              <p className="f-bold">&nbsp;{CURRENCY} 19777</p>
            </button>

            {isFullScreen ? (
              <></>
            ) : (
              <>
                <div className="gap-5 absolute md:top-[6%] top-[8%] lg:right-[36%] right-0 p-2 ">
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
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="flex mt-[31px]">
            {isFullScreen ? (
              <>
                {width < 1034 ? (
                  <canvas
                    id="webgi-canvas"
                    style={{ height: height - 60 }}
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
                    style={{ height: height - 160 }}
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
            )}
            {isFullScreen ? (
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
              </div>
            ) : (
              <>
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
            )}
          </div>
          <div className="mt-[-37px] flex justify-center" id="font-size-custom">
            <div className="grid grid-cols-4 gap-2  mt-[-11px]">
              <button
                className={`flex justify-center items-center border z-10 rounded-md w-full bg-[${webConfigBgColor}] text-white px-2 sm:px-2 py-3 font-size_16`}
                onClick={handle360Image}
                style={{ backgroundColor: webConfigBgColor }}
              >
                <img src="../../icons/360.png" className="sm:pe-2 h-4 " />
                &nbsp;360
              </button>

              <button
                className={`flex justify-center items-center border  z-10 rounded-md w-full bg-[${webConfigBgColor}] text-white px-2 sm:px-2  py-3 font-size_16`}
                onClick={handleVideoDownload}
                style={{ backgroundColor: webConfigBgColor }}
              >
                <img src="../../icons/video.png" className="sm:pe-2 h-4" />
                &nbsp;Video
              </button>

              <div className="relative flex justify-center">
                <button
                  className={`flex justify-center items-center border w-full rounded-md bg-[${webConfigBgColor}] text-white items-center px-2 sm:px-2 py-3 font-size_16`}
                  onClick={handleDropdownToggle1}
                  style={{ backgroundColor: webConfigBgColor }}
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
                  className={`flex border w-full justify-center items-center rounded-md bg-[${webConfigBgColor}] text-white items-center px-2  sm:px-10 md:px-10 py-3 font-size_16`}
                  style={{ backgroundColor: webConfigBgColor }}
                  onClick={handleDropdownToggle}
                >
                  <img
                    src="../../icons/download.png"
                    alt="Eye"
                    className=" sm:pe-2 h-4"
                  />
                  &nbsp; <span className="hidden sm:flex">Download</span>
                </button>
                {isOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute  bottom-full position_dropdown left-0 w-full bg-white border border-gray-300 rounded-b-md"
                  >
                    <div className="p-4">
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

                      <button
                        className={`border rounded-md bg-[${webConfigBgColor}] text-white p-2`}
                        style={{
                          backgroundColor: webConfigBgColor,
                        }}
                        onClick={handleDownloadImage}
                      >
                        Download
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div> */}
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-full my-6 mx-5 lg:mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg px-5 relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex pl-0 items-start justify-between p-5 pb-2 pe-2 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      {" "}
                      <h3 className="font-bold">Birthstone </h3>
                    </h3>
                    <button
                      className="p-1 ml-auto  border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none"></span>
                    </button>
                  </div>

                  <div className="pt-5 py-5 items-center  ">
                    <div id="main_id" className="px-5 pl-0">
                      <div>
                        <p>
                          {" "}
                          <p className="text-body TCC-product-detail-discription">
                            SKU# - 100007
                          </p>
                        </p>
                      </div>
                      <div className="mt-2">
                        <p className="mb-0">
                          {" "}
                          <p className="text-body TCC-product-detail-discription">
                            This is simply dummy text
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
                          <span
                          // className={`text-[${webSecondaryColor}] text_size_16`}
                          // style={{ color: webSecondaryColor }}
                          >
                            $
                            {`${parseInt(metalData ? metalData.price : 0) +
                              parseInt(gemStoneOne ? gemStoneOne.price : 0) +
                              parseInt(gemStoneTwo ? gemStoneTwo.price : 0) +
                              parseInt(
                                gemStoneThree ? gemStoneThree.price : 0
                              ) +
                              parseInt(gemStoneFour ? gemStoneFour.price : 0) +
                              parseInt(gemStoneFives ? gemStoneFives.price : 0)
                              }`}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : (
          <></>
        )}
        <div className="lg:col-span-2 col-span-2 lg:pl-[15px] pe-0 lg:mt-[35px]">
          <div className="lg:visible invisible md:invisible">
            <h1 className="mt-[6px] text-black feijoa-bold product-title">
              Birthstone
            </h1>
            <small
              style={{ color: `${webConfigBgColor}` }}
              className="flex w-100"
            >
              SKU# - 100007
            </small>

            <p className="font-semibold mt-2 mb-2 feijoa birthtone-tab-font text-black">
              {" "}
              <span className="birthtone-tab-font feijoa text-black">
                $
                {`${parseInt(metalData ? metalData.price : 0) +
                  parseInt(gemStoneOne ? gemStoneOne.price : 0) +
                  parseInt(gemStoneTwo ? gemStoneTwo.price : 0) +
                  parseInt(gemStoneThree ? gemStoneThree.price : 0) +
                  parseInt(gemStoneFour ? gemStoneFour.price : 0) +
                  parseInt(gemStoneFives ? gemStoneFives.price : 0)
                  }`}
              </span>
            </p>
            {/* <div className="mt-2 flex">
                            <button
                                style={{ background: `${webConfigBgColor}`, height: "32px" }}
                                className={`w-1/3 md:w-1/3 rounded mb-16 lg:mb-0`}
                            >
                                <span className="py-2 3xl:px-8 text-white font-semibold">ADD TO BAG</span>
                            </button>
                            <MdOutlineFavorite
                                size={20}
                                color="red"
                                style={{ pointerEvents: "none", marginLeft: "5px", marginTop: "5px" }}
                            />
                        </div> */}
          </div>
          <div className="lg:mt-0 mt-[-87px]">
            {/* Tabs */}
            <div className="flex gap-10">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => handleTabClick(index)}
                  className={`${activeTab === index
                    ? "border-b-2 border-gray-500 text-[#CF025C]"
                    : ""
                    }  py-2 px-4 mx-1 text-black focus:outline-none birthtone-tab-font feijoa`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {/* Tabs Content */}
            <div
              className="overflow-x-hidden overflow-y-auto"
              style={{ height: height - 300 }}
            >
              {tabs.map((tab, index) => (
                <div
                  key={index}
                  className={`${index === activeTab ? "block" : "hidden"} `}
                >
                  {activeTab === 0 ? (
                    <div className="mt-3">
                      <BirthStoneThreeData
                        webConfigBgColor={{ webConfigBgColor, borderColor: 'config-birthstone-select-value' }}
                        data={DATA.data}
                        value1={setGemStoneOne}
                        value2={setGemStoneTwo}
                        value3={setGemStoneThree}
                        value4={setGemStoneFour}
                        value5={setGemStoneFive}
                        selectedValue1={gemStoneOne}
                        selectedValue2={gemStoneTwo}
                        selectedValue3={gemStoneThree}
                        selectedValue4={gemStoneFour}
                        selectedValue5={gemStoneFives}
                      />
                    </div>
                  ) : (
                    <div>
                      <BirthStoneInscriptionData
                        webConfigBgColor={{ webConfigBgColor, borderColor: 'config-birthstone-select-value' }}
                        handleEngravingText={handleEngravingText}
                      />
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-6 w-full">
                <BirthStoneToneData
                  webConfigBgColor={{ webConfigBgColor, borderColor: 'birthstone-tone-config' }}
                  data={DATA.metal_tone}
                  value={setMetalToneData}
                  selectedValue={metalToneData}
                />
              </div>
              <div className="mt-6 w-full">
                <BirthStoneMetalData
                  webConfigBgColor={{ webConfigBgColor, borderColor: 'birthstone-tone-config' }}
                  data={DATA.metal}
                  value={setMetalData}
                  selectedValue={metalData}
                  onChange={(e: any) => setMetalData(e.target.value)}
                />
              </div>
              <div className="mt-6 w-full">
                <CheckBox
                  labelKey="Transparent Background"
                  onChange={handleBGChange}
                />
              </div>
              <div className="mb-6 mt-6 flex">
                <button
                  style={{ background: `${webConfigBgColor}`, height: "32px" }}
                  className={`w-1/3 md:w-1/3 rounded mb-16 lg:mb-0`}
                  onClick={addCartProducthandler}
                >
                  <span className="py-2 3xl:px-8 text-white">ADD TO BAG</span>
                </button>
                {/* <MdOutlineFavorite
                                    size={20}
                                    color="red"
                                    style={{ pointerEvents: "none", marginLeft: "5px", marginTop: "5px" }}
                                /> */}
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default ProductBirthStone3DRenderLocal1;
