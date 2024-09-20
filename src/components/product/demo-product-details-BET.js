import React, { useState, useEffect, useRef } from "react";
import DATA from "../../../public/api/birth-stone-bet.json";
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
// import {
//   ViewerApp,
//   AssetManagerPlugin,
//   addBasePlugins,
//   FileTransferPlugin,
//   CanvasSnipperPlugin,
//   PopmotionPlugin,
//   MaterialConfiguratorPlugin,
//   CanvasRecorderPlugin,
//   ProgressivePlugin,
//   CameraViewPlugin,
//   DiamondPlugin,
//   SimpleTextPlugin,
//   EasingFunctions,
//   FullScreenPlugin,
//   Spherical,
//   timeout,
//   CubeNormalsCaptureHelper,
//   VariationConfiguratorPlugin,
// } from "three-tap";

import { canvasX } from 'canvas-frame-x';
import RingCrownColor from "@components/configrator/ring-crown-color";
import MatchingWeddingBandBet from "./matching-wedding-band-bet";
import CenterDiamondShape from "@components/configrator/center-diamond-shape";
import BandDataBet from "./band-data";
import FallbackSpinner from "@components/spinner";

const DemoProductSingleDetails = () => {
  // ---- Hook's ----
  const {
    query: { slug },
  } = useRouter();
  const { width, height } = useSsrCompatible(useWindowSize(), {
    width: 0,
    height: 0,
  });
  // ---- Other Const ----
  const imageUrl = process.env.NEXT_PUBLIC_IMG_URL + "configurator/static/";
  const webConfigBgColor = process.env.NEXT_PUBLIC_BET_BG_COLOR;
  const birthStoneDetailData = DATA.productList.find(
    (t) => t.slug == slug
  );
  const imageDownLoadIndex = "1";
  const selectedValue = {
    gemstoneType: 1,
    oneGemStoneId: 1,
    twoGemStoneId: 1,
    threeGemstoneId: 1,
    fourGemstoneId: 1,
    fiveGemstoneId: 1,
    metalToneId: 1,
    metalId: 1,
    diamondShapeId: 1,
    bandDataId: 1,
    matchingBandId: 1,
  };

  // ---- State's ----
  const [plugins, setPlugins] = React.useState({});
  const [showModal, setShowModal] = React.useState(false);
  const [diamondShape, setDiamondShape] = useState();
  const [bandData, setBandData] = useState();
  const [bandDetails, setBandDetails] = useState(DATA.band_data);
  const [objects, setObjects] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [ringHeadTone1, setRingHeadTone1] = useState({
    id: 3,
    name: "Rose Gold",
    sort_code: "RG",
    image_path: "images/metalTone/image-RG.svg-1693728490422.svg",
    id_metal: 1,
  });
  const [matchingWeddingBand, setMatchingWeddingBand] = useState();
  const [viewer, setViewer] = useState();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [is360Running, setIs360Running] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [shareClick, setShareClick] = useState(false);
  const [config, setConfig] = useState();
  const [selectedBtn, setSelectedBtn] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedColor, setSelectedColor] = useState({
    key: 0,
    value: "",
    color: "#C9AF96",
  });
  const [currentHandValue, setCurrentHandValue] = useState(selectedColor);
  useEffect(() => {
    // ** Diamond Shape
    const diamondShapeData = DATA.center_diamond_shape.component.filter(
      (t) => t.id === selectedValue.diamondShapeId
    );
    setDiamondShape(diamondShapeData[0]);

    // ** Band Data
    const bandData = DATA.band_data.filter(
      (t) => t.id === selectedValue.bandDataId
    );

    setBandData(bandData[0]);

    // ** Matching Band Data
    const matchingBandData =
      birthStoneDetailData?.ring_head_side_ring?.component.filter(
        (t) => t.id === selectedValue.matchingBandId
      );
    setMatchingWeddingBand(matchingBandData[0]);


    const bandDisplayData = (slug == "BE1D129") ? DATA.band_data.filter(
      (t) => t.sort_code === "NB"
    ) : DATA.band_data;
    setBandDetails(bandDisplayData)
  }, []);


  useEffect(() => {
    const data = canvasX("5f9e893390abb39392c08bdcfdf70620dce56420");
    data.then((result) => setPlugins(result));
  }, []);



  // ---- Application Functions ----
  const handleFullScreen = async () => {
    setIsFullScreen(!isFullScreen);
    const canvas = document.getElementById("webgi-canvas");
    viewer.getPlugin(plugins.FullScreenPlugin).toggle(canvas.parentElement);
  };

  const handle360Image = async () => {
    // Camera Rotation
    if (is360Running) {
      viewer.scene.activeCamera.controls.autoRotate = false;
      viewer.scene.activeCamera.controls.autoRotateSpeed = 0;
    } else {
      viewer.scene.activeCamera.controls.autoRotate = true;
      viewer.scene.activeCamera.controls.autoRotateSpeed = 5;
    }
    setIs360Running(!is360Running);

    if (selectedBtn === 1) {
      setSelectedBtn(0);
    } else {
      setSelectedBtn(1);
    }
  };

  const handleVideoDownload = async () => {
    if (selectedBtn === 2) {
      setSelectedBtn(0);
    } else {
      setSelectedBtn(2);
    }

    viewer.setDirty(); // trigger a rerender.
    const recorder = viewer.getPlugin(plugins.CanvasRecorderPlugin);
    const progressive = viewer.getPlugin(plugins.ProgressivePlugin);
    const fileTransfer = viewer.getPlugin(plugins.FileTransferPlugin);

    const popmotion = await viewer.getPlugin(plugins.PopmotionPlugin);

    progressive.maxFrameCount = 4;
    recorder.mimeType = "video/mp4";
    recorder.convergeMode = true;

    const durationNum = parseFloat("10");
    if (!isFinite(durationNum) || durationNum <= 0) return;
    const camera = viewer.scene.activeCamera;
    const interactions = camera.interactionsEnabled;
    if (interactions) camera.interactionsEnabled = false;
    const cameraPos = camera.position.clone();

    const current = new plugins.Spherical().setFromVector3(cameraPos);
    camera.position.setFromSpherical(current);
    camera.positionUpdated(true);
    const b = await await recorder.record(
      async () =>
        popmotion.animate({
          from: current.theta,
          to: -(current.theta + Math.PI * 2),
          duration: durationNum * 1000,
          ease: plugins.EasingFunctions.linear,
          onUpdate: (v) => {
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
    if (selectedBtn === 4) {
      setSelectedBtn(0);
    } else {
      setSelectedBtn(4);
    }

    viewer.setDirty(); // trigger a rerender.
    const snipper = viewer.getPlugin(plugins.CanvasSnipperPlugin);
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
    await plugins.timeout(1000);
    await snipper.downloadSnapshot("image.png", {
      waitForProgressive: true, // download anti-aliased image
      displayPixelRatio: scale,
    });
    await plugins.timeout(1000);
    viewer.setSize({ width: "100%", height: height });
    viewer.resize();
  };

  const handleCameraViews = async (value) => {
    const popmotion = await viewer.getPlugin(plugins.PopmotionPlugin);

    if (viewer.scene.modelRoot.rotation.x > 1.5) {
      popmotion.animate({
        from: 1.57,
        to: 0,
        duration: 1 * 1000,
        ease: plugins.EasingFunctions.linear,
        onUpdate: (v) => {
          viewer.scene.modelRoot.rotation.z = v;
          viewer.scene.modelRoot.rotation.x = v;
        },
      }).promise;
    }

    const camViews = viewer.getPlugin(plugins.CameraViewPlugin);
    await camViews.animateToView(camViews.camViews[parseInt(value)]);
    viewer.scene.setDirty({ sceneUpdate: true });
  };

  const handleDropdownToggle1 = () => {
    setIsViewOpen((prev) => !prev);
    if (selectedBtn === 3) {
      setSelectedBtn(0);
    } else {
      setSelectedBtn(3);
    }
  };

  async function setupViewer() {
    if (plugins) {
      const viewer = new plugins.ViewerApp({
        canvas: document.getElementById("webgi-canvas"),
        useGBufferDepth: false,
      });
      setViewer(viewer);
    }
  }

  useEffect(() => {
    setupViewer();
  }, [plugins]);


  // ---- Hand Material Function ----
  const handleHandChange = () => {
    if (selectedColor?.value === "") {
      setSelectedColor({ key: 1, value: "HAND1.pmat", color: "#C9AF96" });
    } else {
      setSelectedColor({ key: 0, value: "", color: "#C9AF96" });
      handleCameraViews("1");
    }
  };

  const handleSelectColor = (e, color) => {
    e?.stopPropagation();
    setSelectedColor(color);
    setShowDropdown(false);
  };

  const handMaterial = [
    { key: 1, value: "HAND1.pmat", color: "#C9AF96" },
    { key: 2, value: "HAND2.pmat", color: "#9A6E43" },
    { key: 3, value: "HAND3.pmat", color: "#7D4828" },
    { key: 4, value: "HAND4.pmat", color: "#533011" },
    { key: 5, value: "HAND5.pmat", color: "#4C1F0C" },
  ];
  // ---- Viewer Controls Function ----
  const setViewerControls = async () => {
    const manager = await viewer.addPlugin(plugins.AssetManagerPlugin);
    await plugins.addBasePlugins(viewer);
    await viewer.addPlugin(plugins.CanvasSnipperPlugin);
    await viewer.addPlugin(plugins.DiamondPlugin);
    await viewer.addPlugin(plugins.MaterialConfiguratorPlugin);
    await viewer.addPlugin(plugins.FileTransferPlugin);
    await viewer.addPlugin(plugins.CanvasRecorderPlugin);
    await viewer.addPlugin(plugins.PopmotionPlugin);
    await viewer.addPlugin(plugins.SimpleTextPlugin);

    viewer.renderer.refreshPipeline();

    const options = { autoScale: false, autoCenter: false, useRgbm: true };
    viewer.scene.modelRoot.scale.setScalar(0.1);
    // viewer.scene.activeCamera.userData.minNearPlane = 0.1;
    // viewer.scene.activeCamera.userData.maxFarPlane = 100;
    //viewer.scene.activeCamera.userData.autoNearFar = false;
    viewer.enable = false;
    viewer.renderEnabled = false;
    const config = await viewer.addPlugin(plugins.VariationConfiguratorPlugin);

    await manager.addFromPath("/assets/BET_config.json");
    // await manager.addFromPath(`${imageUrl}config_tcc_2410.vjson`);
    await manager.addFromPath(`/assets/BE_2.vjson`);
    await manager.addFromPath("/assets/preset.CameraViews.json");

    await viewer.addPlugin(plugins.CameraViewPlugin);
    plugins.CubeNormalsCaptureHelper.AutoDisposeTargets = false;
    // const glbPath = `/assets/DemoGlb/${birthStoneDetailData?.glb_path}.glb`;
    // await assetManager.addFromPath(glbPath, options);

    setConfig(config);
    await refreshUI(config);
    setObjects(config.getObjectVariations());
    setMaterials(config.getMaterialVariations());
    await setMaterial();

    const fileStates = {};

    const importer = await manager.importer;

    importer.addEventListener("importFile", (ev) => {
      fileStates[ev.path] =
        ev.state + (ev.progress ? " " + (ev.progress * 100).toFixed(2) : "");
    });

    // Callbacks for start, progress, load complete and stop.
    importer.addEventListener("onStart", () => {
      setShowLoader(true);
    });
    importer.addEventListener("onProgress", () => {
      setShowLoader(true);
    });
    importer.addEventListener("onLoad", () => {
      setShowLoader(false);
    });
    importer.addEventListener("onStop", () => {
      setShowLoader(false);
    });
    handleCameraViews("1");

  };

  useEffect(() => {
    if (viewer) {
      setViewerControls();
    }
  }, [viewer]);

  // ---- Refresh UI Function ----
  const refreshUI = async (configData) => {
    if (viewer && config) {
      viewer.enable = false;
      viewer.renderEnabled = false;
      // Bands & Rings
      let finalBandsName = matchingWeddingBand?.name;
      let bandSelection = bandData?.sort_code;
      let finalRingName = birthStoneDetailData?.glb_path;
      await viewer.scene.disposeSceneModels();
      if (finalRingName) {
        const object = configData?.variations.objects.find(
          (obj) => obj.name === "Rings"
        );
        if (object) {
          if (bandSelection === "OB") {
            finalRingName = "empty";
          } else if (bandSelection === "B") {
            if (
              finalRingName.includes("BE1D2120") ||
              finalRingName.includes("BE1D25343")
            ) {
              finalRingName =
                "BET_Rotated/" +
                finalBandsName +
                "_" +
                finalRingName +
                "_100ct_" +
                diamondShape?.sort_code;
            } else {
              finalRingName =
                "BET_Rotated/" +
                finalBandsName +
                "_" +
                finalRingName +
                "_" +
                diamondShape?.sort_code;
            }
          } else {
            if (
              finalRingName.includes("BE1D2120") ||
              finalRingName.includes("BE1D25343")
            ) {
              finalRingName =
                "/" + finalRingName + "_100ct_" + diamondShape?.sort_code;
            } else {
              finalRingName =
                "/" + finalRingName + "_" + diamondShape?.sort_code;
            }
          }
          const index = object.items.findIndex((t) =>
            t.includes(finalRingName)
          );
          await configData?.applyVariation(object, index, "objects");
        }
      }

      if (bandSelection) {
        const object = configData?.variations.objects.find(
          (obj) => obj.name === "Bands"
        );
        if (object) {
          if (bandSelection === "NB") {
            finalBandsName = "empty";
          }
          const index = object.items.findIndex((t) =>
            t.includes(finalBandsName)
          );
          await configData?.applyVariation(object, index, "objects");
        }
      }
      // if (selectedColor?.key !== 0) {
      //   const object = config?.variations.objects.find(
      //     (obj) => obj.name == "Hands"
      //   )!;
      //   if (object) {
      //     const index = object.items.findIndex((t) => t.includes("Hand"));
      //     await config?.applyVariation(object, index, "objects");
      //     if (selectedColor?.color === currentHandValue?.color) {
      //       setCurrentHandValue(selectedColor);
      //       handleCameraViews("2");
      //     }
      //   }
      // } else {
      //   const object = config?.variations.objects.find(
      //     (obj) => obj.name == "Hands"
      //   )!;
      //   setCurrentHandValue(selectedColor);

      //   if (object) {
      //     await config?.applyVariation(object, 0, "objects");
      //   }


      // }
      await setMaterial();
      if (slug != "BE1D129") {
        //viewer.scene.modelRoot.position.set(0, -10, 0);
      }
      //viewer.scene.modelRoot.position.set(0, -2, 0);
      viewer.scene.setDirty({ sceneUpdate: true });
      viewer.fitToView();
      viewer.enable = true;
      viewer.renderEnabled = true;

    }
  };

  useEffect(() => {
    refreshUI(config);
  }, [
    materials,
    objects,
    bandData,
    matchingWeddingBand,
    diamondShape,
    selectedColor,
  ]);

  // ---- Set Materials Function ----
  const setMaterial = async () => {
    if (viewer) {
      viewer.enable = false;
      viewer.renderEnabled = false;
      const rgMaterial = await viewer
        .getManager()
        .importer.importSinglePath("/assets/Pmat/RG.pmat");

      const ygMaterial = await viewer
        .getManager()
        .importer.importSinglePath("/assets/Pmat/YG.pmat");

      const wgMaterial = await viewer
        .getManager()
        .importer.importSinglePath("/assets/Pmat/WG.pmat");

      const traverseFunction = async function (child) {
        //child.frustumCulled = false;
        // Set Metal
        if (
          child.name.includes("Mesh_") ||
          child.name.includes("mesh_") ||
          child.name.includes("Metal") || child.name.includes("COLOR=�,MATERIAL")
        ) {
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
            child.name.includes("Diamond_Oval") ||
            child.name.includes("Diamond__Oval")
          ) {
            dmatName = "OV-";
            cacheKey = "Diamond_Oval";
          }

          if (child.name.includes("CS_Diamond")) {
            dmatName = "RD-";
            cacheKey = "CS_Diamond_Round";
          }

          if (child.name.includes("Diamond_Emerald")) {
            dmatName = "EM-";
            cacheKey = "Diamond_Emerald";
          }

          if (
            child.name.includes("Diamond_Pear") ||
            child.name.includes("Pear_CS")
          ) {
            dmatName = "PE-";
            cacheKey = "Diamond_Pear";
          }
          if (child.name.includes("Diamond_Princess")) {
            dmatName = "PR-";
            cacheKey = "Diamond_Princess";
          }
          if (child.name.includes("Diamond_Radiant")) {
            dmatName = "RA-";
            cacheKey = "Diamond_Radiant";
          }
          if (child.name.includes("Diamond_Marquise")) {
            dmatName = "MQ-";
            cacheKey = "Diamond_Marquise";
          }
          if (child.name.includes("CS_Diamond_Asscher")) {
            dmatName = "AS-";
            cacheKey = "CS_Diamond_Asscher";
          }
          dmatName = "WT-" + dmatName + "DIAMOND" + extension;
          if (
            child.name.includes("Diamond_Round") ||
            child.name.includes("Diamond_Marquise") ||
            child.name.includes("Diamond_Oval") ||
            child.name.includes("Diamond_Princess") ||
            child.name.includes("Diamond_Radiant") ||
            child.name.includes("Diamond_Emerald") ||
            child.name.includes("Diamond_Pear") ||
            child.name.includes("CS_Diamond_Asscher")
          ) {
            await viewer.getPlugin(plugins.DiamondPlugin).disposeAllCacheMaps();
            const diamondMaterial = await viewer
              .getManager()
              .importer.importSinglePath("/assets/Dmat/" + "WT-Diamond.dmat");

            viewer.getPlugin(plugins.DiamondPlugin).prepareDiamondMesh(child, {
              cacheKey: cacheKey,
              normalMapRes: 512,
            });
            child.setMaterial(diamondMaterial);
          } else {
            await viewer.getPlugin(plugins.DiamondPlugin).disposeAllCacheMaps();
            const smallDiamondMaterial = await viewer
              .getManager()
              .importer.importSinglePath("/assets/Dmat/" + + "WT-Diamond.dmat");
            viewer.getPlugin(plugins.DiamondPlugin).prepareDiamondMesh(child, {
              cacheKey: "Diamond_Round",
              normalMapRes: 256,
            });
            child.material = smallDiamondMaterial;
          }
        }
        if (selectedColor && selectedColor.key != 0) {
          //Find Selected Color
          const selectedHandPmat = handMaterial.filter(
            (t) => t.key == selectedColor.key
          )[0]?.value;
          if (child.name.includes("Hand02")) {
            const handMaterialLoad = await viewer
              .getManager()
              .importer.importSinglePath("/assets/Pmat/" + selectedHandPmat);
            child.material = handMaterialLoad;
          }
        }
      };

      let allPromises = [];
      viewer.scene.traverse((child) => {
        allPromises.push(traverseFunction(child));
      });
      await Promise.all(allPromises);

      viewer.enable = true;
      viewer.renderEnabled = true;

      viewer.scene.activeCamera._controls.maxDistance = 150;
      viewer.scene.activeCamera._controls.minDistance = 0;
      viewer.scene.activeCamera._controls.maxPolarAngle =
        selectedColor?.key === 0 ? 3.14 : 1;
      viewer.scene.setDirty({ sceneUpdate: true });
    }
  };

  useEffect(() => {
    if (materials) {
      setMaterial();
    }
  }, [ringHeadTone1, diamondShape, selectedColor]);

  return (
    <>
      <div className="flex-wrap block lg:grid lg:grid-cols-12 2xl:grid-cols-9 grid-cols-0 md:grid-cols-0">
        <div className="hidden lg:block" />
        <div
          className={`2xl:col-span-4 lg:col-span-6 col-span-2 md:col-span-2 relative`}
        >
          <div className="sticky top-[26%]">
            {isFullScreen ? (
              <></>
            ) : (
              <>
                <button
                  className="absolute flex bg-[#43464a] lg:mt-[110px] mt-7 opacity-90 text-white cursor-pointer items-center border rounded-full border-neutral-600 py-1 px-3 lg:hidden lg:left-44 md:left-8 left-8"
                  id="enter-fullscreen"
                  onClick={() => setShowModal(true)}
                >
                  <span>
                    <AiOutlineInfoCircle
                      style={{ height: "22px", width: "22px" }}
                      className="cursor-pointer"
                    />
                  </span>
                  <p className="">&nbsp;{CURRENCY} 1099.00</p>
                </button>
              </>
            )}

            {isFullScreen ? (
              <div className="floating-buttons topright">
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
              <div className="absolute right-0 flex items-center justify-end mt-5 ml-auto">
                <button
                  className="mr-3"
                  onClick={() => setShareClick(!shareClick)}
                >
                  <img
                    src={"/assets/TCCimage/share-icon.png"}
                    alt={`share`}
                    className="object-cover w-6 h-6"
                  />
                </button>
                {/* <div className="floating-buttons topright"> */}
                <Button
                  style={{ background: webConfigBgColor, width: "20px" }}
                  className="mr-3 rounded"
                  id="enter-fullscreen"
                  onClick={handleFullScreen}
                >
                  <span>
                    <MdOutlineZoomOutMap height="30" width="30" />
                  </span>
                </Button>
                {/* </div> */}
                {/* <Button
                  style={{ background: webConfigBgColor }}
                  className="mr-3 rounded"
                  id="enter-fullscreen"
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
                  onClick={handleHandChange}
                >
                  <div
                    className="scale-150 rounded-full"
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}>🖐🏻</div>
                  {showDropdown && (
                    <div className="stone-hand-color-dropdown">
                      {handMaterial.map((item, index) => (
                        <div
                          key={index}
                          className="stone-hand-color-option"
                          style={{
                            backgroundColor: item.color,
                            height: "16px",
                            width: "16px",
                            marginTop: "15px",
                            padding: "8px",
                          }}
                          onClick={(e) => handleSelectColor(e, item)}
                        />
                      ))}
                    </div>
                  )}
                </Button> */}

                {shareClick && (
                  <div className="absolute right-0 top-[130%]">
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
              </div>
            )}
            {/* Canvas */}
            {isFullScreen ? (
              <>
                {width < 1034 ? (
                  <>
                    <canvas
                      id="webgi-canvas"
                      style={{ height: height }}
                      className="h-full lg:h-full md:h-full"
                    ></canvas>
                    <div className="buttons">
                      {showLoader && <FallbackSpinner />}
                    </div>
                  </>
                ) : (
                  <>
                    <canvas
                      id="webgi-canvas"
                      style={{ height: height }}
                      className="h-full lg:h-full md:h-full"
                    ></canvas>
                    <div className="buttons">
                      {showLoader && <FallbackSpinner />}
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                {width > 1034 ? (
                  <>
                    <canvas
                      id="webgi-canvas"
                      style={{ height: height - 160 }}
                      className="mt-[29px]"
                    ></canvas>
                    <div className="buttons">
                      {showLoader && <FallbackSpinner />}
                    </div>
                  </>
                ) : width < 768 ? (
                  <>
                    <canvas
                      id="webgi-canvas"
                      className="w-full lg:h-full lg:w-full h-[370px] lg:pt-0"
                    ></canvas>
                    <div className="buttons">
                      {showLoader && <FallbackSpinner />}
                    </div>
                  </>
                ) : (
                  <>
                    <canvas
                      id="webgi-canvas"
                      className="w-full lg:h-full lg:w-full h-[450px] pt-[71px] lg:pt-0"
                    ></canvas>
                    <div className="buttons">
                      {showLoader && <FallbackSpinner />}
                    </div>
                  </>
                )}
              </>
            )}
            {/* Buttons */}
            {/* <div className="block lg:mt-[-80px] mt-2.5 lg:my-0 md:mt-mt-2.5 bottom-[-52px] left-0 right-0 m-auto">
              <div className="flex justify-center " id="font-size-custom">
                <div className="flex grid-cols-4 gap-2 bg-[#0D636333] px-8 py-3 rounded-full">
                  <button
                    style={{
                      background: `${selectedBtn === 1 ? webConfigBgColor : "white"
                        }`,
                    }}
                    className={` flex justify-center items-center z-10 rounded-md w-full text-white px-2 sm:px-2 py-2 font-size_16`}
                    onClick={handle360Image}
                  >
                    <img
                      src={`${selectedBtn === 1
                        ? "../../icons/BETIcon/360-white.svg"
                        : "../../icons/BETIcon/360.svg"
                        }`}
                      className="h-7 "
                    />
                  </button>

                  <button
                    style={{
                      background: `${selectedBtn === 2 ? webConfigBgColor : "white"
                        }`,
                    }}
                    className={` flex justify-center items-center z-10 rounded-md w-full text-white px-2 sm:px-2  py-3 font-size_16`}
                    onClick={handleVideoDownload}
                  >
                    <img src="../../icons/BETIcon/video.svg" className="h-7 " />
                  </button>

                  <div className="relative flex justify-center">
                    <button
                      style={{
                        background: `${selectedBtn === 3 ? webConfigBgColor : "white"
                          }`,
                      }}
                      className={` flex justify-center w-full rounded-md text-white items-center px-10 sm:px-10 py-3 font-size_16  gap-3`}
                      onClick={handleDropdownToggle1}
                    >
                      <img
                        src={`${selectedBtn === 3
                          ? "../../icons/BETIcon/eye-white.svg"
                          : "../../icons/BETIcon/eye.svg"
                          }`}
                        alt="Eye"
                        className="h-7"
                      />
                      <span
                        className={`${selectedBtn === 3 ? "text-white" : "text-[#0D6363]"
                          }`}
                      >
                        View
                      </span>
                      <span
                        className={`hidden sm:block ${selectedBtn === 3 ? "text-white" : "text-[#0D6363]"
                          }`}
                      >
                        ▼
                      </span>
                    </button>
                    {isViewOpen && (
                      <div
                        ref={dropdownRef}
                        className="absolute left-0 w-full bg-white border border-gray-300 bottom-full position_dropdown rounded-b-md"
                      >
                        <div className="flex-col p-4 d-flex">
                          <div>
                            <button
                              className="py-1 text-start"
                              onClick={() => handleCameraViews("1")}
                            >
                              Perspective View
                            </button>
                          </div>
                          <div>
                            <button
                              className="py-1 text-start"
                              onClick={() => handleCameraViews("2")}
                            >
                              Top View
                            </button>
                          </div>
                          <div>
                            <button
                              className="py-1 text-start"
                              onClick={() => handleCameraViews("3")}
                            >
                              Right View
                            </button>
                          </div>
                          <div>
                            <button
                              className="py-1 text-start"
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
                      style={{
                        background: `${selectedBtn === 4 ? webConfigBgColor : "white"
                          }`,
                      }}
                      className={` flex w-full justify-center rounded-md text-white items-center px-2  sm:px-10 md:px-10 py-3 font-size_16`}
                      onClick={handleDownloadImage}
                    >
                      <img
                        src="../../icons/BETIcon/download.svg"
                        alt="Eye"
                        className=" h-7"
                      />
                      &nbsp;{" "}
                      <span
                        className={`${selectedBtn === 4 ? "text-white" : "text-[#0D6363]"
                          } hidden sm:flex`}
                      >
                        Download
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div >
        {/*  Mobile Modal */}
        {
          showModal ? (
            <>
              <div className="fixed inset-0 z-50 flex items-center justify-center outline-none focus:outline-none">
                <div className="relative w-full max-w-3xl mx-5 my-6 lg:mx-auto">
                  <div className="relative flex flex-col w-full px-5 bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 pb-2 pl-0 border-b border-solid rounded-t pe-2 border-slate-200">
                      <h3 className="text-3xl font-semibold">
                        {" "}
                        <h3 className=" text-black sticky top-[23%]">
                          {birthStoneDetailData?.name}
                        </h3>
                      </h3>
                      <button
                        className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black border-0 outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none focus:outline-none"></span>
                      </button>
                    </div>

                    <div className="items-center py-5 pt-5 ">
                      <div id="main_id" className="px-5 pl-0">
                        <div>
                          <p>
                            {" "}
                            <p className="text-black TCC-product-detail-discription">
                              {birthStoneDetailData?.sku}
                            </p>
                          </p>
                        </div>
                        <div className="mt-2">
                          <p className="mb-0">
                            {" "}
                            <p className="text-black TCC-product-detail-discription"></p>
                          </p>
                        </div>
                      </div>
                      <div id="price_id " className="px-5 pl-0">
                        <div className="">
                          <p className="pb-4 mt-5 text_size_16">
                            <span className="text-black ">
                              {CURRENCY}
                              1099.00
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end p-6 border-t border-solid rounded-b border-slate-200">
                      <button
                        style={{ background: webConfigBgColor }}
                        className="px-10 py-2 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none active:bg-green-600 hover:shadow-lg focus:outline-none"
                      >
                        BUY
                      </button>
                      <button
                        className={`bg-gray-300 text-black active:bg-green-600 font-bold uppercase text-sm px-8 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-[-20px] mb-1 ease-linear transition-all duration-150`}
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
            </>
          ) : (
            <></>
          )
        }
        <div className="2xl:col-span-3 lg:col-span-4 col-span-2 lg:pl-[15px] pe-0 lg:mt-[35px] lg:mb-0 mb-20">
          <div className="lg:visible invisible md:invisible lg:pe-5 pe-1 ps-1 lg:ps-5 sticky xl:top-[26%] lg:top-[22%] md:top-[20%] bg-white z-[19]">
            <h1 className="text-black  zapfumanist-font  mt-[6px]">
              {birthStoneDetailData?.name}
            </h1>
            <small
              style={{ color: `${webConfigBgColor}` }}
              className="flex avenir-book-font w-100 TCC-product-detail-discription"
            >
              {birthStoneDetailData?.sku}
            </small>
            <p className="text-black font-semibold mt-[10px]">
              <span className="text-black zapfumanist-font">
                Price:{" "}
                <span className="text-[#0D6363] zapfumanist-font">
                  $ 1099.00
                </span>
              </span>
            </p>
          </div>

          <div className="lg:mt-0 mt-[-105px] overflow-x-hidden overflow-y-auto lg:pe-5 pe-1 ps-1 lg:ps-5 mb-5">
            {/* Diamond Shape */}
            <hr />
            {bandData?.sort_code !== "OB" && (
              <>
                <p className="text-black mt-[10px]">
                  <span className="avenir-book-font TCC-product-detail-discription">
                    {" "}
                    Diamond Shape:{" "}
                  </span>
                  <span className="avenir-book-font text-[#0D6363]">
                    {" "}
                    {diamondShape?.name}{" "}
                  </span>
                </p>
                <CenterDiamondShape
                  data={DATA.center_diamond_shape.component}
                  value={setDiamondShape}
                  selectedValue={diamondShape}
                  className={{
                    mainButton: "py-3 w-full",
                    buttonSelected: "localconfig-selected-value-bet",
                    tooltipData: {
                      height: "50px",
                      width: "50px",
                      scaleStyle: "mx-auto scale-2001",
                    },
                    imageData: { height: "25px", width: "25px" },
                  }}
                />
              </>
            )}

            {/* Band Data*/}
            <p
              className="text-black mt-[10px]"
              style={{ marginBottom: "15px" }}
            >
              <span className="mb-10 avenir-book-font TCC-product-detail-discription">
                {" "}
                Select Band:{" "}
                <span style={{ color: webConfigBgColor, fontSize: "20px" }}>
                  {bandData?.name}
                </span>
              </span>
            </p>
            <BandDataBet
              data={bandDetails}
              selectedValue={bandData}
              value={setBandData}
              className={{
                mainButton: "px-5 py-3 w-full",
                buttonSelected: "localconfig-selected-value-bet",
                divmargin: "text-black avenir-book-font ",
              }}
            />

            {/* Matching Band */}
            {(bandData?.sort_code === "B" || bandData?.sort_code === "OB") && (
              <>
                <p
                  className="text-black mt-[10px]"
                  style={{ marginBottom: "15px" }}
                >
                  <span className="mb-10 avenir-book-font TCC-product-detail-discription">
                    {" "}
                    Matching Band:{" "}
                    <span style={{ color: webConfigBgColor, fontSize: "20px" }}>
                      {matchingWeddingBand?.name}
                    </span>
                  </span>
                </p>
                <MatchingWeddingBandBet
                  data={birthStoneDetailData?.ring_head_side_ring?.component}
                  selectedValue={matchingWeddingBand}
                  value={setMatchingWeddingBand}
                  className={{
                    mainButton: "px-5 w-full",
                    buttonSelected: "localconfig-selected-value-bet",
                    divmargin: "text-black avenir-book-font ",
                    imageData: { height: "30px", width: "300px" },
                  }}
                />
              </>
            )}

            {/* Metal Tone */}
            <p className="text-black mt-[10px]">
              <span className="avenir-book-font TCC-product-detail-discription">
                {" "}
                Metal Tone:{" "}
              </span>
              <span className="avenir-book-font text-[#0D6363]">
                {" "}
                {ringHeadTone1?.name}{" "}
              </span>
            </p>
            <RingCrownColor
              data={DATA.ring_head_metal_tone.component}
              value={setRingHeadTone1}
              selectedValue={ringHeadTone1}
              className={{
                main: "w-full justify-between",
                buttonSelected: "border border-[#0D6363]",
                divmargin: "avenir-book-font",
                mainButton: "w-full flex flex-col items-center py-1 border",
              }}
            />
            {/* Tabs Content */}
          </div>
        </div>
        <div className="hidden lg:block 2xl:block" />
      </div >
    </>
  );
};

export default DemoProductSingleDetails;

