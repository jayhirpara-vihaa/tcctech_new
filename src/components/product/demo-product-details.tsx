import React, { useState, useEffect, useRef } from "react";
import DATA from "../../../public/api/birth-stone.json";
import CONFIG_DATA from "../../../public/api/configrator-3d.json";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai";

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
import { CURRENCY } from "@utils/constants";
import BirthStoneToneData from "@components/configrator/birthstone-tone";
import BirthStoneMetalData from "@components/configrator/birthstone-metal";
import { CheckBox } from "@components/ui/checkbox";
import BirthStoneInscriptionData from "@components/configrator/birthstone-inscription";
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
  CubeNormalsCaptureHelper,
  VariationConfiguratorPlugin,
} from "webgi";
import BirthStoneThreeData from "@components/configrator/birth-stone-three";
import BirthStoneInscriptionLocalData from "@components/configrator/birthstone-inscription-local";
import GemstoneTypeComponent from "@components/configrator/gemstone-type";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { IoMdArrowDropdown } from "react-icons/io";
import { Collapse } from "@components/common/accordioncommon";
import RingCrownColor from "@components/configrator/ring-crown-color";
import MatchingWeddingBand from "./matching-wedding-band";

const DemoProductSingleDetails: React.FC = () => {
  const {
    query: { slug },
  } = useRouter();

  const router = useRouter();

  const birthStoneDetailData = DATA.productList.find(
    (t: any) => t.slug == slug
  );
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
  }, []);
  const [showModal, setShowModal] = React.useState(false);
  const webConfigBgColor = process.env.NEXT_PUBLIC_ZAMLES_BG_COLOR;
  const [gemStoneOne, setGemStoneOne] = useState<any>();
  const [gemStoneTwo, setGemStoneTwo] = useState<any>();
  const [gemStoneThree, setGemStoneThree] = useState<any>();
  const [gemStoneFour, setGemStoneFour] = useState<any>();
  const [gemStoneFives, setGemStoneFive] = useState<any>();
  const [metalToneData, setMetalToneData] = useState<any>();
  const [metalData, setMetalData] = useState<any>();
  const [ringHeadTone, setRingHeadTone] = useState<any>();
  const [ringHeadTone1, setRingHeadTone1] = useState<any>();
  const [matchingWeddingBand, setMatchingWeddingBand] = useState<any>({
    id: 1,
    sort_code: "BAND",
    name: "BD-01-RN-001",
    image_path: "/assets/images/demo/BD-01-RN-001.png",
    id_metal: 1,
  });
  const [activeTab, setActiveTab] = useState(0);
  const [viewer, setViewer] = useState<any>();
  const [selectedOption, setSelectedOption] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [imageDownLoadIndex, setImageDownLoadIndex] = useState<string>("1");
  const [is360Running, setIs360Running] = useState<boolean>(false);
  const [isBgChecked, setIsBgChecked] = useState<boolean>(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [shareClick, setShareClick] = useState(false);
  const [gemstoneName, setGemstoneName] = useState<any>();
  const [gemstoneTwoName, setGemstoneTwoName] = useState<any>();
  const [gemstoneThreeName, setGemstoneThreeName] = useState<any>();
  const [gemstoneFourName, setGemstoneFourName] = useState<any>();
  const [gemstoneFiveName, setGemstoneFiveName] = useState<any>();
  const [config, setConfig] = useState<VariationConfiguratorPlugin>();

  const [selectedValue, setSelectedValue] = useState({
    gemstoneType: 1,
    oneGemStoneId: 1,
    twoGemStoneId: 1,
    threeGemstoneId: 1,
    fourGemstoneId: 1,
    fiveGemstoneId: 1,
    metalToneId: 1,
    metalId: 1,
  });
  const silvermetalData = metalData?.name === "Silver";
  const [expanded, setExapanded] = useState<any>();
  const dropdownRef = useRef(null);

  const tabs = [
    {
      label: "Birthstone",
    },
    {
      label: "Engraving",
    },
  ];

  const handleTabClick = (index: any) => {
    setActiveTab(index);
  };

  const { width, height } = useSsrCompatible(useWindowSize(), {
    width: 0,
    height: 0,
  });
  const [isLoading, setLoading] = useState(true);

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

  const dynamicStyle = {
    width: "100%",
    height:
      width > 1024
        ? `calc(${height}px - 450px)`
        : width > 700
        ? `calc(${height}px - 694px)`
        : width > 380
        ? `calc(${height}px - 586px)`
        : `73px`,
    // Add any other styles you need
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

    const camViews = viewer.getPlugin(CameraViewPlugin);
    await camViews.animateToView(camViews.camViews[parseInt(value)]);
    viewer.scene.setDirty({ sceneUpdate: true });
  };

  const imageUrl = process.env.NEXT_PUBLIC_IMG_URL + "configurator/static/";

  const handleDropdownToggle1 = () => {
    setIsViewOpen((prev) => !prev);
  };

  // ************ VIEWVIER_CONTROLLER

  useEffect(() => {
    const metalData = DATA.metal.filter(
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

    const metaToneIdE = DATA.metal_tone.filter(
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

  const refreshUI = async () => {
    if (viewer && config && config?.variations && config?.variations.objects) {
      //Head FIle Name
      let finalHeadName = matchingWeddingBand?.name;
      const headSku = finalHeadName?.split("-");

      if (headSku?.length > 0) {
        const splitedValue = headSku[3];
        //"HD-" + headName.replace(diamondSize.sort_code, diamondSize.value) + "-" + findHeadDesign[0].value + ".glb";
        const object = config?.variations.objects.find(
          (obj) => obj.name == splitedValue
        )!;

        if (object) {
          const index = object.items.findIndex((t: any) =>
            t.includes(finalHeadName)
          );

          await config?.applyVariation(object, index, "objects");
        }
      }

      await setMaterial();
    }
  };

  useEffect(() => {
    refreshUI();
  }, [matchingWeddingBand]);

  const setViewerControls = async () => {
    // Add some plugins
    const config = await viewer.addPlugin(VariationConfiguratorPlugin);
    const manager = await viewer.addPlugin(AssetManagerPlugin);

    await addBasePlugins(viewer);

    // Add more plugins not available in base, like CanvasSnipperPlugin which has helpers to download an image of the canvas.
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

    await manager.addFromPath(
      `/assets/DemoGlb/${
        birthStoneDetailData?.glb_path
          ? birthStoneDetailData?.glb_path
          : "VM-PD-R-33322"
      }.glb`,
      options
    ),
      await manager.addFromPath("/assets/demo_config_1.json");
    await manager.addFromPath(`${imageUrl}config_birthstone_pendant.vjson`);
    await manager.addFromPath("/assets/preset.CameraViews.json");

    setConfig(config);
    await refreshUI();
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

      viewer.scene.traverse(async function (child: any) {
        //SHank Metal
        if (child.name.includes("Metal01")) {
          let metalMaterial = rgMaterial;
          if (ringHeadTone && ringHeadTone.sort_code == "YG") {
            metalMaterial = ygMaterial;
          } else if (ringHeadTone && ringHeadTone.sort_code == "WG") {
            metalMaterial = wgMaterial;
          } else if (ringHeadTone && ringHeadTone.sort_code == "RG") {
            metalMaterial = rgMaterial;
          }
          child.material = metalMaterial; //apply same material to all meshes
        }

        if (child.name.includes("Metal02")) {
          let metalMaterial = rgMaterial;
          if (ringHeadTone1 && ringHeadTone1.sort_code == "YG") {
            metalMaterial = ygMaterial;
          } else if (ringHeadTone1 && ringHeadTone1.sort_code == "WG") {
            metalMaterial = wgMaterial;
          } else if (ringHeadTone1 && ringHeadTone1.sort_code == "RG") {
            metalMaterial = rgMaterial;
          }
          child.material = metalMaterial; //apply same material to all meshes
        }

        const extension = ".dmat";

        if (child.name.includes("Diamond") || child.name.includes("Gem")) {
          let dmatName = "RD-";
          let smallDmatName = "WT-" + "RD-" + "DIAMOND" + extension;
          let cacheKey = "";
          if (
            child.name.includes(
              `${
                birthStoneDetailData?.gemstone_glb_name.one
                  ? birthStoneDetailData?.gemstone_glb_name.one
                  : "Gem_1"
              }`
            )
          ) {
            dmatName = gemStoneOne.sort_code + extension;
            cacheKey = gemStoneOne.sort_code + extension;
            const diamondMaterial = await viewer
              .getManager()
              .importer.importSinglePath("/assets/BLDmat/" + dmatName);
            viewer.getPlugin(DiamondPlugin).prepareDiamondMesh(child, {
              cacheKey: cacheKey,
              normalMapRes: 512,
            });
            child.material = diamondMaterial;
          }

          if (
            child.name.includes(
              `${
                birthStoneDetailData?.gemstone_glb_name.two
                  ? birthStoneDetailData?.gemstone_glb_name.two
                  : "Gem_2"
              }`
            )
          ) {
            dmatName = gemStoneTwo.sort_code + extension;
            cacheKey = gemStoneTwo.sort_code + extension;
            const diamondMaterial = await viewer
              .getManager()
              .importer.importSinglePath("/assets/BLDmat/" + dmatName);
            viewer.getPlugin(DiamondPlugin).prepareDiamondMesh(child, {
              cacheKey: cacheKey,
              normalMapRes: 512,
            });
            child.material = diamondMaterial;
          }

          if (
            child.name.includes(
              `${
                birthStoneDetailData?.gemstone_glb_name.three
                  ? birthStoneDetailData?.gemstone_glb_name.three
                  : "Gem_3"
              }`
            )
          ) {
            dmatName = gemStoneThree.sort_code + extension;
            cacheKey = gemStoneThree.sort_code + extension;
            const diamondMaterial = await viewer
              .getManager()
              .importer.importSinglePath("/assets/BLDmat/" + dmatName);
            viewer.getPlugin(DiamondPlugin).prepareDiamondMesh(child, {
              cacheKey: cacheKey,
              normalMapRes: 512,
            });
            child.material = diamondMaterial;
          }

          if (
            child.name.includes(
              `${
                birthStoneDetailData?.gemstone_glb_name.four
                  ? birthStoneDetailData?.gemstone_glb_name.four
                  : "Gem_4"
              }`
            )
          ) {
            dmatName = gemStoneFour.sort_code + extension;
            cacheKey = gemStoneFour.sort_code + extension;
            const diamondMaterial = await viewer
              .getManager()
              .importer.importSinglePath("/assets/BLDmat/" + dmatName);
            viewer.getPlugin(DiamondPlugin).prepareDiamondMesh(child, {
              cacheKey: cacheKey,
              normalMapRes: 512,
            });
            child.material = diamondMaterial;
          }

          if (
            child.name.includes(
              `${
                birthStoneDetailData?.gemstone_glb_name.five
                  ? birthStoneDetailData?.gemstone_glb_name.five
                  : "Gem_5"
              }`
            )
          ) {
            dmatName = gemStoneFives.sort_code + extension;
            cacheKey = gemStoneFives.sort_code + extension;
            const diamondMaterial = await viewer
              .getManager()
              .importer.importSinglePath("/assets/BLDmat/" + dmatName);
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

  useEffect(() => {
    setMaterial();
  }, [ringHeadTone, ringHeadTone1]);

  useEffect(() => {
    const gemstoneTypeId = DATA.ring_head_metal_tone.component.filter(
      (t: any) => t.id == 0
    );
    setRingHeadTone(gemstoneTypeId?.[0]);
  }, []);

  useEffect(() => {
    if (
      (gemStoneOne && gemStoneOne?.sort_code == "May") ||
      gemStoneOne?.sort_code == "July" ||
      gemStoneOne?.sort_code == "September"
    ) {
      setGemstoneName("Created");
    } else {
      setGemstoneName("");
    }
  }, [gemStoneOne]);

  useEffect(() => {
    if (
      (gemStoneTwo && gemStoneTwo?.sort_code == "May") ||
      gemStoneTwo?.sort_code == "July" ||
      gemStoneTwo?.sort_code == "September"
    ) {
      setGemstoneTwoName("Created");
    } else {
      setGemstoneTwoName("");
    }
  }, [gemStoneTwo]);

  useEffect(() => {
    if (
      (gemStoneThree && gemStoneThree?.sort_code == "May") ||
      gemStoneThree?.sort_code == "July" ||
      gemStoneThree?.sort_code == "September"
    ) {
      setGemstoneThreeName("Created");
    } else {
      setGemstoneThreeName("");
    }
  }, [gemStoneThree]);

  useEffect(() => {
    if (
      (gemStoneFour && gemStoneFour?.sort_code == "May") ||
      gemStoneFour?.sort_code == "July" ||
      gemStoneFour?.sort_code == "September"
    ) {
      setGemstoneFourName("Created");
    } else {
      setGemstoneFourName("");
    }
  }, [gemStoneFour]);

  useEffect(() => {
    if (
      (gemStoneFives && gemStoneFives?.sort_code == "May") ||
      gemStoneFives?.sort_code == "July" ||
      gemStoneFives?.sort_code == "September"
    ) {
      setGemstoneFiveName("Created");
    } else {
      setGemstoneFiveName("");
    }
  }, [gemStoneFives]);

  console.log(matchingWeddingBand);
  return (
    <>
      <div className="grid lg:grid-cols-6 grid-cols-0 md:grid-cols-0 flex flex-wrap">
        <div className={`lg:col-span-4 col-span-2 md:col-span-2 relative`}>
          {isFullScreen ? (
            <></>
          ) : (
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
              <p className="feijoa">
                &nbsp;{CURRENCY}{" "}
                {`${
                  parseInt(metalData ? metalData.price : 0) +
                  parseInt(gemStoneOne ? gemStoneOne.price : 0) +
                  parseInt(gemStoneTwo ? gemStoneTwo.price : 0)
                }`}
              </p>
            </button>
          )}

          {isFullScreen ? (
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
                  style={{ height: height - 160 }}
                  className="mt-[29px]"
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
                  <EmailShareButton className="mx-2" url={window.location.href}>
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

          <div className="block lg:mt-[-60px] mt-[-3.375rem] lg:my-0 md:mt-[-3.375rem] bottom-[-52px] left-0 right-0 m-auto">
            <div className=" flex justify-center" id="font-size-custom">
              <div className="grid grid-cols-4 gap-2">
                <button
                  style={{ background: webConfigBgColor }}
                  className={`ProximaNova-Regular flex justify-center items-center z-10 rounded-md w-full text-white px-2 sm:px-2 py-3 font-size_16`}
                  onClick={handle360Image}
                >
                  <img
                    src="../../icons/360.png"
                    className="sm:pe-2 h-4 ProximaNova-Regular"
                  />
                  &nbsp;360
                </button>

                <button
                  style={{ background: webConfigBgColor }}
                  className={`ProximaNova-Regular flex justify-center items-center z-10 rounded-md w-full text-white px-2 sm:px-2  py-3 font-size_16`}
                  onClick={handleVideoDownload}
                >
                  <img
                    src="../../icons/video.png"
                    className="sm:pe-2 h-4 ProximaNova-Regular"
                  />
                  &nbsp;Video
                </button>

                <div className="relative flex justify-center">
                  <button
                    style={{ background: webConfigBgColor }}
                    className={`ProximaNova-Regular flex justify-center items-center w-full rounded-md text-white items-center px-2 sm:px-2 py-3 font-size_16 ProximaNova-Regular`}
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
                            className="py-1 ProximaNova-Regular"
                            onClick={() => handleCameraViews("1")}
                          >
                            Perspective View
                          </button>
                        </div>
                        <div>
                          <button
                            className="py-1 ProximaNova-Regular"
                            onClick={() => handleCameraViews("2")}
                          >
                            Top View
                          </button>
                        </div>
                        <div>
                          <button
                            className="py-1 ProximaNova-Regular"
                            onClick={() => handleCameraViews("3")}
                          >
                            Right View
                          </button>
                        </div>
                        <div>
                          <button
                            className="py-1 ProximaNova-Regular"
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
                    className={`ProximaNova-Regular flex w-full justify-center items-center rounded-md text-white items-center px-2  sm:px-10 md:px-10 py-3 font-size_16`}
                    onClick={handleDownloadImage}
                  >
                    <img
                      src="../../icons/download.png"
                      alt="Eye"
                      className=" sm:pe-2 h-4"
                    />
                    &nbsp; <span className="hidden sm:flex">Download</span>
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
                      <h3 className="feijoa-bold text-black">
                        {birthStoneDetailData?.name}
                      </h3>
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
                          <p className="text-black ProximaNova-Regular TCC-product-detail-discription">
                            {birthStoneDetailData?.sku}
                          </p>
                        </p>
                      </div>
                      <div className="mt-2">
                        <p className="mb-0">
                          {" "}
                          <p className="text-black ProximaNova-Regular TCC-product-detail-discription">
                            {birthStoneDetailData?.long_description}
                          </p>
                        </p>
                      </div>
                    </div>
                    <div id="price_id " className="px-5 pl-0">
                      <div className="">
                        <p className="text_size_16 pb-4 mt-5">
                          <span className="feijoa-bold text-black">
                            {CURRENCY}
                            {`${
                              parseInt(metalData ? metalData.price : 0) +
                              parseInt(gemStoneOne ? gemStoneOne.price : 0) +
                              parseInt(gemStoneTwo ? gemStoneTwo.price : 0)
                            }`}
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
        ) : (
          <></>
        )}
        <div className="lg:col-span-2 col-span-2 lg:pl-[15px] pe-0 lg:mt-[35px]">
          <div className="lg:visible invisible md:invisible lg:pe-5 pe-1 ps-1 lg:ps-5">
            <h1 className="text-black feijoa-bold zamels-birthstonelocal-font  mt-[6px]">
              {birthStoneDetailData?.name}
            </h1>
            <small
              style={{ color: `${webConfigBgColor}` }}
              className="ProximaNova-Regular flex w-100 TCC-product-detail-discription"
            >
              {birthStoneDetailData?.sku}
            </small>
            <p className="text-black birthtone-tab-font font-semibold feijoa mt-[10px]">
              <span className="zamels-birthstonelocal-font feijoa text-black">
                Price: $
                {`${
                  parseInt(metalData ? metalData.price : 0) +
                  parseInt(gemStoneOne ? gemStoneOne.price : 0) +
                  parseInt(gemStoneTwo ? gemStoneTwo.price : 0)
                }`}
              </span>
            </p>
          </div>
          <div className="lg:mt-0 mt-[-105px] overflow-x-hidden overflow-y-auto lg:pe-5 pe-1 ps-1 lg:ps-5">
            {/* Metal Tone */}
            <p className="text-black birthtone-tab-font font-semibold feijoa mt-[10px]">
              <span className="ProximaNova-Regular TCC-product-detail-discription">
                {" "}
                Metal Tone:{" "}
              </span>
              <span className="feijoa text-black"> {ringHeadTone1?.name} </span>
            </p>
            <RingCrownColor
              data={DATA.ring_head_metal_tone.component}
              value={setRingHeadTone1}
              selectedValue={ringHeadTone1}
            />
            {/* Matching Band */}
            <p className="text-black birthtone-tab-font font-semibold feijoa mt-[10px]">
              <span className="ProximaNova-Regular TCC-product-detail-discription">
                {" "}
                Matching Band:{" "}
              </span>
              <span className="feijoa text-black"> {ringHeadTone1?.name} </span>
            </p>
            <MatchingWeddingBand
              data={DATA.ring_head_side_ring.component}
              selectedValue={matchingWeddingBand}
              value={setMatchingWeddingBand}
              className={{
                mainButton: "px-7 py-3 w-full",
                buttonSelected: "localconfig-selected-value",
                tooltipData: {
                  height: "50px",
                  width: "50px",
                  scaleStyle: "mx-auto",
                },
                imageData: { height: "215px", width: "315px" },
              }}
            />
            {/* Tabs Content */}
          </div>
        </div>
      </div>
    </>
  );
};

export default DemoProductSingleDetails;
