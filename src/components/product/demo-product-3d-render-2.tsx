import React, { useContext, useEffect, useRef, useState } from "react";
// import DeleteIcon from "@mui/icons-material/Delete";

import Tooltip from "@mui/material/Tooltip";
import Carousel from "@components/ui/carousel/carousel";
import { useWindowSize } from "@utils/use-window-size";
import { useSsrCompatible } from "@utils/use-ssr-compatible";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { SwiperSlide } from "swiper/react";
import { Input, TextField } from "@mui/material";
import CenterDiamondShape from "@components/configrator/center-diamond-shape";
import { useRouter } from "next/router";
import { CompanyInfoContext } from "@contexts/company_info/company_info";
import { useAddCartMutation } from "@framework/config-product-api/AddCartModuleApi";
import { ROUTES } from "@utils/routes";
import { useConfiguratorProductPriceQuery } from "@framework/price-module-api/priceModuleApi";
import CenterDiamond from "@components/configrator/center-diamond";

import Cookies from "js-cookie";
import {
  ViewerApp,
  AssetManagerPlugin,
  VariationConfiguratorPlugin,
  AssetManagerBasicPopupPlugin,
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
  DebugPlugin,
  FrontSide,
  LinearFilter,
  EasingFunctions,
  TonemapPlugin,
  GroundPlugin,
  FullScreenPlugin,
  Spherical,
  timeout,
} from "webgi";
import CONFIG_DATA from "../../../public/api/configrator-3d.json";
import CenterDiamondSize from "@components/configrator/center-diamond-size";
import DiamondClarity from "@components/configrator/diamond-clarity";
import RingHead from "@components/configrator/ring-head";
import RingCrownColor from "@components/configrator/ring-crown-color";
import RingStyleColor from "@components/configrator/ring-style-color";
import RingShank from "@components/configrator/ring-shank";
import SideSettings from "@components/configrator/side-setting";
import MetalComponent from "@components/configrator/metal-component";
import MatchingWeddingBand from "./matching-wedding-band";
import MatchBandMetalTone from "@components/configrator/mech-band-metal-tone";
import { CURRENCY } from "@utils/constants";
import CenterGemstone from "@components/configrator/center-gemstone";
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";
import DiamondClarityComponent from "@components/configrator/diamond-clarity-component";


const DemoProduct3DRender: React.FC<{ configData: any }> = (props) => {

  const DATA = props.configData;
  const [viewer, setViewer] = useState<any>();
  const [selectedItem, setSelectedItem] = useState(null);
  const [RingSizeValue, setRingSizeValue] = useState(null);
  const [loginUserEmail, setLoginUserEmail] = useState<any>();
  const [productId, setProductId] = useState<any>();
  const [centerDiamond, setCenterDiamond] = useState<any>();
  const [diamondShape, setDiamondShape] = useState<any>();
  const [diamondSize, setDiamondSize] = useState<any>();
  const [ringHead, setRingHead] = useState<any>();
  const [metalId, setMetaId] = useState<any>();
  const [karatId, setkaratId] = useState<any>();
  const [metalToneId, setMetalToneId] = useState<any>();
  const [diamondGroupId, setDiamondGroupId] = useState<any>();
  const [productSku, setProductSku] = useState<string>();
  const [imageData, setImageData] = useState<any>();
  const [band, setBand] = useState<any>();
  const [centerDiamondList, setCenterDiamondList] = useState<any[]>();
  const [gemstoneList, setGemstoneList] = useState<any[]>();
  const [ringShankTone, setRingShankTone] = useState<any>();
  const [bandMetalTone, setBandMetalTone] = useState<any>();
  const [diamondQuality, setDiamondQuality] = useState<any>();
  const [engravingName, setEngravingName] = useState<string>("The Cadco Co.");
  const [resolution, setResolution] = useState("1200 * 1200");
  const [isOpen, setIsOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [sideSettings, setSideSettings] = useState<any>();
  const [ringShank, setRingShank] = useState<any>();
  const [centerGemstone, setCenterGemstone] = useState<any>();
  const [MetalData, setMetalData] = useState<any>();
  const [ringHeadTone, setRingHeadTone] = useState<any>();
  const [matchingWeddingBand, setMatchingWeddingBand] = useState<any>();
  const [productPriceValue, setProductPriceValue] = useState<any>();
  const [isLoading, setLoading] = useState(true);
  const [objects, setObjects] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [config, setConfig] = useState<VariationConfiguratorPlugin>();
  const [isBgChecked, setIsBgChecked] = useState<boolean>(false);
  const [is360Running, setIs360Running] = useState<boolean>(false);
  const [imageDownLoadIndex, setImageDownLoadIndex] = useState<string>("1");
  const [showModal, setShowModal] = React.useState(false);
  const [webSecondaryColor, setWebSecondaryColor] = useState<string>("");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [downloadOption, setDownloadOption] = useState("Top View"); // Default value
  const [shareClick, setShareClick] = useState(false);

  const dropdownRef = useRef(null);

  const handleDropdownToggle1 = () => {
    setIsViewOpen((prev) => !prev);
  };

  const handleDropdownToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  const { data: addCartData, mutate: addCart } = useAddCartMutation();


  const handleItemClick = (item: any) => {
    setSelectedItem(item);
  };


  const SetRingSize = (item: any) => {
    setRingSizeValue(item);
  };

  const RingSizeData = [
    {
      name: "4",
    },
    {
      name: "6",
    },
    {
      name: "3.2",
    },
    {
      name: "4.5",
    },
  ];

  // const dynamicStyle = {
  //   width: "100%",
  //   height:
  //     width > 1024 ? `calc(${height}px - 220px)` : `calc(${height}px - 330px)`,
  //   // Add any other styles you need
  // };

  const flashSaleCarouselBreakpoint = {
    "1280": {
      slidesPerView: 5,
      spaceBetween: 2,
    },
    "768": {
      slidesPerView: 5,
      spaceBetween: 2,
    },
    "0": {
      slidesPerView: 4,
      spaceBetween: 1,
    },
  };

  // async function setupViewer() {
  //   const viewer = new ViewerApp({
  //     canvas: document.getElementById("webgi-canvas") as HTMLCanvasElement,
  //   });
  //   setViewer(viewer);
  // }

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);

  //     setTimeout(() => {
  //       setupViewer();
  //     });
  //   });
  // }, [selectedValue]);

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
    setIsViewOpen(false);
  };

  const { updateCartTotalItems } =
    useContext(CompanyInfoContext);

  const userName = Cookies.get('USER_DETAILS');//sessionStorage.getItem("config_user_email") as string;
  useEffect(() => {
    if (userName) {
      const email = JSON.parse(userName).email;
      if (email) {
        // login3dConfig({
        //   user_name: email,
        // });
      }

    }
  }, []);

  const { height, width } = useSsrCompatible(useWindowSize(), {
    width: 0,
    height: 0,
  });

  const router = useRouter();

  const loginUser: any = Cookies.get('USER_DETAILS')

  useEffect(() => {
    if (loginUser)
      setLoginUserEmail(JSON.parse(loginUser)?.id_app_user);
  }, [loginUser])

  const addCartProducthandler = async () => {

    const snipper = viewer.getPlugin(CanvasSnipperPlugin);
    const file = await snipper.getFile();
    setImageData(file);

  }
  useEffect(() => {
    if (loginUserEmail != undefined) {
      addCart({
        user_id: loginUserEmail,
        product_id: productId,
        metal_id: metalId,
        karat_id: karatId,
        metal_tone_id: metalToneId,
        ring_size: null,
        center_diamond_group_id: diamondGroupId,
        SKU: productSku || "",
        image: imageData,
        is_band: band,
      })
    }
  }, [imageData])

  useEffect(() => {
    if ((addCartData && addCartData.code === 200) || (addCartData && addCartData.code === "200")) {
      updateCartTotalItems(addCartData?.data);

      router.push(`${ROUTES.CARTPAGE}`);
    }
  }, [addCartData])

  const [selectedValue, setSelectedValue] = useState({
    CenterDiamondId: 20,
    CentreDiamondShapeId: 2,
    CentreDiamondSizeID: 2,
    GemStoneId: 1,
    RingHeadID: 1,
    RingShankID: 1,
    SideSettingID: 1,
    MetalID: 1,
    MetalKaratID: 1,
    RingCrownMetalID: 2,
    ShankCrownMetalID: 2,
    RingStyleMetalID: 2,
    RingBandStyleID: 1,
    BandStyleMetalID: 2,
    DiamondColorID: 1,
    DiamondClarityID: 1,
  });

  const [selectedPriceValue, setSelectedPriceValue] =
    useState<any>();

  useEffect(() => {
    setMetaId(selectedPriceValue?.metal)
    setkaratId(selectedPriceValue?.karat)
    setBand(selectedPriceValue?.is_band)
  }, [selectedPriceValue])

  useEffect(() => {
    setMetalToneId(ringShankTone?.id)
  }, [ringShankTone])

  useEffect(() => {
    const selectedData = {
      CenterDiamondId: 20,
      CentreDiamondShapeId: 2,
      CentreDiamondSizeID: 2,
      GemStoneId: 1,
      RingHeadID: 1,
      RingShankID: 1,
      SideSettingID: 1,
      MetalID: 1,
      MetalKaratID: 1,
      RingCrownMetalID: 2,
      ShankCrownMetalID: 2,
      RingStyleMetalID: 2,
      RingBandStyleID: 1,
      BandStyleMetalID: 2,
      DiamondColorID: 1,
      DiamondClarityID: 1,
    };

    //New Logic for Default Value
    const dbCenterDiamondId = DATA.gemstoneList.filter(
      (t: any) => t.sort_code == "DI"
    );
    let centerDiamondData: any[] = [];
    CONFIG_DATA.center_diamond.component.map((t: any) => {
      const objDetails = t;
      if (t.sort_code == "D") {
        objDetails.id = dbCenterDiamondId[0].id;
      }
      centerDiamondData.push(objDetails);
    });
    setCenterDiamondList(centerDiamondData);

    const gemstoneData = DATA.gemstoneList.filter(
      (t: any) => t.sort_code != "DI"
    );

    setGemstoneList(gemstoneData);

    selectedData.CenterDiamondId = dbCenterDiamondId[0].id;

    const centerDiamondId = centerDiamondData.filter(
      (t: any) => t.id === selectedData.CenterDiamondId
    );

    setCenterDiamond(centerDiamondId.length !== 0 && centerDiamondId[0]);

    selectedData.CentreDiamondShapeId =
      DATA.diamondShapeList && DATA.diamondShapeList[0].id;

    const centreDiamondShapeId =
      DATA.diamondShapeList.length !== 0 &&
      DATA.diamondShapeList.filter(
        (t: any) => t.id === selectedData.CentreDiamondShapeId
      );

    setDiamondShape(
      centreDiamondShapeId.length !== 0 && centreDiamondShapeId[0]
    );

    selectedData.GemStoneId = gemstoneData && gemstoneData[0].id;

    const gemstoneId =
      gemstoneData &&
      gemstoneData.length !== 0 &&
      gemstoneData.filter((t: any) => t.id === selectedData.GemStoneId);
    setCenterGemstone(gemstoneId.length !== 0 && gemstoneId[0]);

    selectedData.CentreDiamondSizeID =
      DATA.caratSizeList && DATA.caratSizeList[0].id;

    const centreDiamondSizeID =
      DATA &&
      DATA.caratSizeList.filter(
        (t: any) => t.id === selectedData.CentreDiamondSizeID
      );
    setDiamondSize(centreDiamondSizeID.length !== 0 && centreDiamondSizeID[0]);

    selectedData.RingHeadID = DATA.headList && DATA.headList[0].id;

    const ringHeadID =
      DATA &&
      DATA.headList.filter((t: any) => t.id === selectedData.RingHeadID);
    setRingHead(ringHeadID.length !== 0 && ringHeadID[0]);

    selectedData.RingShankID = DATA.shankList && DATA.shankList[0].id;

    const ringShankID =
      DATA &&
      DATA.shankList.filter((t: any) => t.id === selectedData.RingShankID);
    setRingShank(ringShankID.length !== 0 && ringShankID[0]);

    selectedData.SideSettingID =
      DATA.sideSettingStyle && DATA.sideSettingStyle[0].id;

    const sideSettingID =
      DATA &&
      DATA.sideSettingStyle.filter(
        (t: any) => t.id === selectedData.SideSettingID
      );
    setSideSettings(sideSettingID.length !== 0 && sideSettingID[0]);

    selectedData.MetalKaratID = DATA.metalList && DATA.metalList[0].id;
    selectedData.MetalID = DATA.metalList && DATA.metalList[0].id_metal;

    const metalComponentID = DATA.metalList.filter(
      (t: any) => t.id === selectedData.MetalKaratID
    );
    setMetalData(metalComponentID.length !== 0 && metalComponentID[0]);

    selectedData.RingCrownMetalID =
      DATA.metalToneList && DATA.metalToneList[0].id;

    const ringCrownMetalID = DATA.metalToneList.filter(
      (t: any) => t.id === selectedData.RingCrownMetalID
    );
    setRingHeadTone(ringCrownMetalID.length !== 0 && ringCrownMetalID[0]);

    selectedData.ShankCrownMetalID =
      DATA.metalToneList && DATA.metalToneList[0].id;

    const ringShankMetalID = DATA.metalToneList.filter(
      (t: any) => t.id === selectedData.ShankCrownMetalID
    );
    setRingShankTone(ringShankMetalID.length !== 0 && ringShankMetalID[0]);


    const RingBandStyleID = CONFIG_DATA.matching_wedding_band.component.filter(
      (t: any) => t.id === selectedData.RingBandStyleID
    );
    setMatchingWeddingBand(RingBandStyleID.length !== 0 && RingBandStyleID[0]);

    selectedData.BandStyleMetalID =
      DATA.metalToneList && DATA.metalToneList[0].id;

    const rindBandToneId = DATA.metalToneList.filter(
      (t: any) => t.id === selectedData.BandStyleMetalID
    );
    setBandMetalTone(rindBandToneId.length !== 0 && rindBandToneId[0]);

    selectedData.DiamondClarityID =
      DATA.colorClarityList && DATA.colorClarityList[0].id_clarity;

    selectedData.DiamondColorID =
      DATA.colorClarityList && DATA.colorClarityList[0].id_color;

    const diamondQualityData = DATA.colorClarityList.filter(
      (t: any) =>
        t.id_clarity === selectedData.DiamondClarityID &&
        t.id_color === selectedData.DiamondColorID
    );

    setDiamondQuality(diamondQualityData.length !== 0 && diamondQualityData[0]);
    setSelectedValue(selectedData);

    const defaultPriceValue = {
      center_stone: selectedData.CenterDiamondId,
      center_stone_shape: selectedData.CentreDiamondShapeId,
      center_stone_color: selectedData.DiamondColorID,
      center_stone_clarity: selectedData.DiamondClarityID,
      head: selectedData.RingHeadID,
      shank: selectedData.RingShankID,
      side_setting: selectedData.SideSettingID,
      center_stone_size: selectedData.CentreDiamondSizeID,
      metal: selectedData.MetalID,
      karat: selectedData.MetalKaratID,
      is_band: selectedData.RingBandStyleID == 1 ? 0 : 1
    };
    setSelectedPriceValue(defaultPriceValue)
  }, []);

  const { data: configPriceData, mutate: getConfigData } = useConfiguratorProductPriceQuery();

  useEffect(() => {
    if (selectedPriceValue && (selectedPriceValue as any).center_stone)
      getConfigData(selectedPriceValue);
  }, [selectedPriceValue]);

  useEffect(() => {
    setSelectedPriceValue({
      center_stone:
        centerDiamond &&
        (centerDiamond?.sort_code == "D"
          ? centerDiamond?.id
          : centerGemstone?.id),
      center_stone_shape: diamondShape && diamondShape?.id,
      center_stone_color: diamondQuality && diamondQuality.id_color,
      center_stone_clarity: diamondQuality && diamondQuality.id_clarity,
      head: ringHead && ringHead?.id,
      shank: ringShank && ringShank?.id,
      side_setting: sideSettings && sideSettings.id,
      center_stone_size: diamondSize && diamondSize.id,
      metal: MetalData && MetalData.id_metal,
      karat: MetalData && MetalData.id,
      is_band: matchingWeddingBand && matchingWeddingBand.id == 1 ? 0 : 1,
    });
  }, [
    centerDiamond,
    centerGemstone,
    diamondShape,
    ringHead,
    ringShank,
    sideSettings,
    diamondSize,
    MetalData,
    diamondQuality,
    matchingWeddingBand,
  ]);

  useEffect(() => {
    setProductId(configPriceData?.data?.data?.id)
    setDiamondGroupId(configPriceData?.data?.data?.center_diamond_group_id)
    setProductSku(configPriceData?.data?.data?.sku)
    setProductPriceValue(configPriceData?.data?.data);
    refreshUI(configPriceData?.data?.data);
  }, [configPriceData]);

  async function setupViewer() {
    const viewer = new ViewerApp({
      canvas: document.getElementById("webgi-canvas_version_1") as HTMLCanvasElement,
    });
    setViewer(viewer);
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);

      setTimeout(() => {
        setupViewer();
      });
    });
  }, [selectedValue]);

  const dynamicStyle = {
    width: "100%",
    height: width > 1024 ? `calc(${height}px - 260px)` : `350px`,
    // Add any other styles you need
  };

  const dynamicStyle2 = {
    width: "100%",
    height: isFullScreen
      ? "100%"
      : width > 1024
        ? `calc(${height}px)`
        : width < 768 ? `340px` : `450px`,
    // Add any other styles you need
  };
  const setViewerControls = async () => {
    //await viewer.addPlugin(DebugPlugin);
    const manager = await viewer.addPlugin(AssetManagerPlugin);
    await addBasePlugins(viewer);
    //await viewer.addPlugin(AssetManagerBasicPopupPlugin);
    await viewer.addPlugin(CanvasSnipperPlugin);
    await viewer.addPlugin(MaterialConfiguratorPlugin);
    await viewer.addPlugin(FileTransferPlugin); //
    await viewer.addPlugin(CanvasRecorderPlugin); //
    await viewer.addPlugin(PopmotionPlugin); //
    await viewer.addPlugin(SimpleTextPlugin); //

    viewer.renderer.refreshPipeline();

    const options = { autoScale: false, autoCenter: false, useRgbm: true };
    viewer.enable = false;
    viewer.renderEnabled = false;
    const config = await viewer.addPlugin(VariationConfiguratorPlugin);
    await config.importPath("/assets/config_3.json");
    await manager.addFromPath("/assets/UV_1.glb", options);
    await manager.addFromPath("/assets/GLB-10.vjson");

    await manager.addFromPath("/assets/preset.CameraViews.json");
    setConfig(config);
    setObjects(config.getObjectVariations());
    setMaterials(config.getMaterialVariations());
    getConfigData(selectedPriceValue);
  };

  // useEffect(() => {
  //   refreshUI();
  // }, [materials, objects]);

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
        let headMaterial = rgMaterial;
        if (ringHeadTone && ringHeadTone.sort_code == "YG") {
          headMaterial = ygMaterial;
          // const material = config?.variations.materials.find((obj) => obj.name == "Metal02")!;
          // if (material) {
          //   const index = material.items.findIndex((t: any) => t.includes(ringHeadTone.sort_code));
          //   console.log("material I", index)
          //   config?.applyVariation(material, index, "materials");
          // }
        } else if (ringHeadTone && ringHeadTone.sort_code == "WG") {
          headMaterial = wgMaterial;
        } else if (ringHeadTone && ringHeadTone.sort_code == "RG") {
          headMaterial = rgMaterial;
        }

        let shankMaterial = rgMaterial;
        if (ringShankTone && ringShankTone.sort_code == "YG") {
          shankMaterial = ygMaterial;
        } else if (ringShankTone && ringShankTone.sort_code == "WG") {
          shankMaterial = wgMaterial;
        } else if (ringShankTone && ringShankTone.sort_code == "RG") {
          shankMaterial = rgMaterial;
        }

        let bandMaterial = rgMaterial;
        if (bandMetalTone && bandMetalTone.sort_code == "YG") {
          bandMaterial = ygMaterial;
        } else if (bandMetalTone && bandMetalTone.sort_code == "WG") {
          bandMaterial = wgMaterial;
        }

        if (MetalData && MetalData.sort_code == "PL") {
          bandMaterial = wgMaterial;
          shankMaterial = wgMaterial;
          headMaterial = wgMaterial;
        }

        //Need Some Diff Material Name for Band
        //Band Metal
        //console.log("child", child)
        if (child.name.includes("Metal03")) {
          //console.log("bandMetalTone", bandMetalTone, bandMaterial)

          child.material = bandMaterial; //apply same material to all meshes
        }

        //Head Metal
        if (child.name.includes("Metal01")) {
          child.material = headMaterial; //apply same material to all meshes
        }

        //SHank Metal
        if (child.name.includes("Metal02")) {
          child.material = shankMaterial; //apply same material to all meshes
        }

        const extension = ".dmat";

        if (child.name.includes("Diamond")) {
          //console.log("child", child.name);
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

          if (centerDiamond && centerDiamond.sort_code == "G") {
            //GenStone
            dmatName = dmatName + centerGemstone.sort_code + extension;
          } else {
            dmatName = "WT-" + dmatName + "DIAMOND" + extension;
          }

          if (
            child.name.includes("Diamond_Oval") ||
            child.name.includes("Diamond__Oval") ||
            child.name.includes("CS_Diamond") ||
            child.name.includes("Diamond_Emerald")
          ) {
            const diamondMaterial = await viewer
              .getManager()
              .importer.importSinglePath("/assets/Dmat/" + dmatName);

            viewer.getPlugin(DiamondPlugin).prepareDiamondMesh(child, {
              cacheKey: cacheKey,
              normalMapRes: 512,
            });
            //console.log("dmatName Main", dmatName);
            child.setMaterial(diamondMaterial);
          } else {
            //console.log("dmatName Small", smallDmatName);
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
          // child.visible = false;
          // if (
          //   child.modelObject.name.includes("Band")
          // ) {
          //   child.visible = true;
          // } else {
          //   child.visible = false;
          // }
        }
      });
      viewer.enable = true;
      viewer.renderEnabled = true;
      viewer.scene.setDirty({ sceneUpdate: true });
    }
  };

  const refreshUI = async (configDetails: any) => {
    if (configDetails == undefined || configDetails == null) {
      return;
    }
    // console.log("config",)
    if (viewer && config && config?.variations && config?.variations.objects) {
      const finalHeadName = parseInt(configDetails?.head_no);
      const finalShankName = parseInt(configDetails?.shank_no);
      const finalBandName = parseInt(configDetails?.band_no);
      if (finalHeadName) {
        const object = config?.variations.objects.find(
          (obj) => obj.name == "Heads"
        )!;
        if (object) {
          const index = object.items.findIndex((t: any) =>
            t.includes(finalHeadName)
          );
          await config?.applyVariation(object, index, "objects");
        }
      }

      if (finalShankName) {
        const object = config?.variations.objects.find(
          (obj) => obj.name == "Shanks"
        )!;
        if (object) {
          const index = object.items.findIndex((t: any) =>
            t.includes(finalShankName)
          );
          await config?.applyVariation(object, index, "objects");
        }
      }
      if (matchingWeddingBand && matchingWeddingBand.sort_code == "BAND") {
        if (finalBandName) {
          const object = config?.variations.objects.find(
            (obj) => obj.name == "Bands"
          )!;
          if (object) {
            const index = object.items.findIndex((t: any) =>
              t.includes(finalBandName)
            );
            if (index > 0) {
              await config?.applyVariation(object, index, "objects");
            } else {
              const index1 = object.items.findIndex((t: any) =>
                t.includes("empty")
              );

              await config?.applyVariation(object, index1, "objects");
            }
          }
        }
      } else {
        const object = config?.variations.objects.find(
          (obj) => obj.name == "Bands"
        )!;
        const index = object.items.findIndex((t: any) => t.includes("empty"));

        await config?.applyVariation(object, index, "objects");
      }

      //console.log("finalName", finalShankName, finalHeadName);

      // let pricingData = 0;

      // //Pricing
      // if (diamondQuality && diamondShape && diamondSize) {
      //   const findHead = PRICING.head.filter(
      //     (t: any) =>
      //       t.shape == diamondShape.sort_code &&
      //       t.carat == diamondSize.sort_code &&
      //       t.quality == diamondQuality.sort_code
      //   );
      //   console.log("findHead", findHead);
      //   if (findHead && findHead.length > 0) {
      //     pricingData = pricingData + parseInt(findHead[0].value);
      //   }
      // }

      // if (ringShank && sideSettings) {
      //   const findShank = PRICING.shank.filter(
      //     (t: any) =>
      //       t.type == ringShank.sort_code &&
      //       t.style == sideSettings.sort_code &&
      //       t.metal == MetalData.sort_code
      //   );
      //   if (findShank && findShank.length > 0) {
      //     pricingData = pricingData + parseInt(findShank[0].value);
      //   }

      //   if (matchingWeddingBand && matchingWeddingBand.sort_code == "BAND") {
      //     const findBand = PRICING.band.filter(
      //       (t: any) =>
      //         t.type == ringShank.sort_code &&
      //         t.style == sideSettings.sort_code &&
      //         t.metal == MetalData.sort_code
      //     );
      //     if (findBand && findBand.length > 0) {
      //       pricingData = pricingData + parseInt(findBand[0].value);
      //     }
      //   }
      // }

      // setPricing(pricingData);

      setMaterial();
    }
  };

  useEffect(() => {
    if (materials) {
      //refreshUI();
    }
  }, [
    diamondShape,
    ringShank,
    CenterDiamondShape,
    ringHead,
    diamondSize,
    sideSettings,
    matchingWeddingBand,
    diamondQuality,
    MetalData,
  ]);

  useEffect(() => {
    if (materials) {
      setMaterial();
    }
  }, [
    ringHeadTone,
    ringShankTone,
    centerDiamond,
    centerGemstone,
    bandMetalTone,
  ]);

  const handleBGChange = async () => {
    setIsBgChecked(!isBgChecked);
    viewer.getPlugin(TonemapPlugin).config.tonemapBackground = isBgChecked;
    viewer.getPlugin(GroundPlugin).tonemapGround = isBgChecked;
  };

  const handleDownloadImage = async () => {
    viewer.setDirty(); // trigger a rerender.
    const snipper = viewer.getPlugin(CanvasSnipperPlugin);
    const file = await snipper.getFile()
    setImageData(file);

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

  const handleFullScreen = async () => {
    setIsFullScreen(!isFullScreen);
    const canvas = document.getElementById(
      "webgi-canvas_version_1"
    ) as HTMLCanvasElement;
    viewer.getPlugin(FullScreenPlugin).toggle(canvas.parentElement);

  };

  const handleFullScreenChange = () => {
    // When full-screen mode changes, check if we are still in full-screen and update the state
    setIsFullScreen(!!document.fullscreenElement);
  };

  useEffect(() => {
    // Add the event listener for the fullscreenchange event
    document.addEventListener("fullscreenchange", handleFullScreenChange);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  const handleCameraViews = async (value: any) => {
    viewer.scene.modelRoot.rotation.z = 0;
    viewer.scene.modelRoot.rotation.x = 0;
    const camViews = viewer.getPlugin(CameraViewPlugin);
    await camViews.animateToView(camViews.camViews[parseInt(value)]);
  };

  const handle360Image = async () => {
    //Camera Rotation
    if (is360Running) {
      viewer.scene.activeCamera.controls.autoRotate = false;
      viewer.scene.activeCamera.controls.autoRotateSpeed = 0;
      const camViews = viewer.getPlugin(CameraViewPlugin);
      await camViews.animateToView(
        camViews.camViews.find((t: any) => t.name == "PV"),
        1000
      );
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

      //viewer.scene.modelRoot.rotation.y = -0.5;
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
    // const blob = await recorder.record(async () => {
    //   viewer.scene.activeCamera.controls.autoRotate = true;
    //   viewer.scene.activeCamera.controls.autoRotateSpeed = 30;
    //   await timeout(6000);
    //   viewer.scene.activeCamera.controls.autoRotateSpeed = 5;
    // });

    // await fileTransfer.exportFile(blob, 'recording.mp4');

    ///
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
    //viewer.scene.modelRoot.rotation.x = intialRotation;
    //viewer.scene.modelRoot.rotation.y = intialRotation;
  };

  const handleEngravingText = async () => {
    const fontStyles = await (
      await fetch(
        "https://fonts.googleapis.com/css2?family=Aboreto&family=Dancing+Script&family=Inter&family=Montserrat&family=Nunito&family=Sacramento&display=swap"
      )
    ).text();

    const text = viewer.getPlugin(SimpleTextPlugin);

    text.applyToAlphaMap = true;
    text.inverseAlphaMap = true;
    text.applyToMap = true;

    const state = {
      text: engravingName,
      // rest of the text properties are saved in the GLB file.
    };

    const decalObject = viewer.scene.getObjectByName("1010001");
    text.updateText(decalObject, { ...state });
  };

  useEffect(() => {
    if (viewer) {
      handleEngravingText();
    }
  }, [engravingName]);






  return (
    <>
      <div className="custom_font_Playfair">
        <div className="flex flex-wrap">
          <div className="w-full relative lg:w-8/12 sticky top-0 bottom-0 z-40 bg-white grid">
            <div className="absolute top-0 lg:block z-50 m-auto w-9/12">
              <div className="hidden lg:flex  justify-between lg:justify-evenly items-center">
                <div id="main_id">
                  <div>
                    <p className="mb-0 custom_text">
                      {configPriceData &&
                        configPriceData.data &&
                        configPriceData?.data?.data?.product_title}{" "}
                    </p>
                    <p className="text_size_16 font-semibold">
                      Price*
                      <span className="text-BlackProduct font-bold text_size_16">
                        : {CURRENCY}{" "}
                        {configPriceData &&
                          configPriceData.data &&
                          configPriceData?.data?.data?.product_total_price.toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>
                <div id="price_id">
                  <button
                    className="border rounded-md  bg-BlackProduct text-white  px-2 sm:px-8 py-2"
                    onClick={addCartProducthandler}
                    style={{ backgroundColor: webSecondaryColor }}
                  >
                    ADD TO BAG
                  </button>
                </div>
              </div>
            </div>
            <div className="relative md:h-[450px]"
            // style={dynamicStyle}
            >
              <button
                className="absolute top-4 p-2 bg-BlackProduct  lg:right-26 md:right-8 right-8 rounded"
                id="enter-fullscreen"
                // onClick={toggleFullScreen}
                onClick={handleFullScreen}
                style={{ backgroundColor: webSecondaryColor }}
              >
                <span>
                  <MdOutlineZoomOutMap
                    style={{ height: "20px", width: "20px", color: "white" }}
                  />
                </span>
              </button>
              <button
                className="absolute top-4 p-2 lg:right-[8%] md:right-20 right-[18%]"
                onClick={() => setShareClick(!shareClick)}
              >
                <img
                  src={"/assets/TCCimage/share-icon.png"}
                  alt={`share`}
                  className="object-cover w-6 h-6"
                />
              </button>
              <button
                className="absolute flex bg-[#43464a] opacity-90 text-white top-4 cursor-pointer items-center border border-2  rounded-full border-neutral-600 py-1 px-3 lg:hidden lg:left-44 md:left-8 left-8 rounded"
                id="enter-fullscreen"
              >
                <span>
                  <AiOutlineInfoCircle
                    style={{ height: "22px", width: "22px" }}
                    // onClick={()=>}
                    onClick={() => setShowModal(true)}
                    className="cursor-pointer"
                  />
                </span>
                <p className="f-bold">
                  {CURRENCY}{" "}
                  {configPriceData &&
                    configPriceData.data &&
                    configPriceData?.data?.data?.product_total_price.toFixed(2)}
                </p>
              </button>
              {shareClick && (
                <div className="gap-5 absolute top-[15%] lg:right-0 right-0 md:right-0 p-2 ">
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
              <div className="flex lg:h-screen items-center justify-center">
                <canvas
                  id="webgi-canvas_version_1"
                  style={dynamicStyle2}
                ></canvas>
                {isFullScreen && (
                  <>
                    <button
                      className={`absolute p-2 top-4 bg-[${webSecondaryColor}] lg:right-26 md:right-8 right-8 rounded`}
                      style={{ backgroundColor: webSecondaryColor }}
                      id="enter-fullscreen"
                      // onClick={toggleFullScreen}
                      onClick={handleFullScreen}
                    >
                      <span>
                        <MdOutlineZoomOutMap
                          style={{
                            height: "20px",
                            width: "20px",
                            color: "white",
                          }}
                        />
                      </span>
                    </button>
                    <div className="absolute bottom-10 left-0 right-0 m-auto   ">
                      <div
                        className=" flex justify-center"
                        id="font-size-custom"
                      >
                        <div className=" grid grid-cols-4 gap-2">
                          <button
                            className={`flex justify-center items-center border z-10 rounded-md w-full bg-[${webSecondaryColor}] text-white px-2 sm:px-2 py-3 font-size_16`}
                            onClick={handle360Image}
                            style={{ backgroundColor: webSecondaryColor }}
                          >
                            <img
                              src="../../icons/360.png"
                              className="sm:pe-2 h-4 "
                            />
                            &nbsp;360
                          </button>

                          <button
                            className={`flex justify-center items-center border  z-10 rounded-md w-full bg-[${webSecondaryColor}] text-white px-2 sm:px-2  py-3 font-size_16`}
                            onClick={handleVideoDownload}
                            style={{ backgroundColor: webSecondaryColor }}
                          >
                            <img
                              src="../../icons/video.png"
                              className="sm:pe-2 h-4"
                            />
                            &nbsp;Video
                          </button>

                          <div className="relative flex justify-center">
                            <button
                              className={`flex justify-center items-center border w-full rounded-md bg-[${webSecondaryColor}] text-white items-center px-2 sm:px-2 py-3 font-size_16`}
                              onClick={handleDropdownToggle1}
                              style={{ backgroundColor: webSecondaryColor }}
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
                              className={`flex border w-full   justify-center items-center rounded-md bg-[${webSecondaryColor}] text-white items-center px-2  sm:px-10 md:px-10 py-3 font-size_16`}
                              style={{ backgroundColor: webSecondaryColor }}
                              onClick={handleDropdownToggle}
                            >
                              <img
                                src="../../icons/download.png"
                                alt="Eye"
                                className=" sm:pe-2 h-4"
                              />
                              &nbsp;{" "}
                              <span className="hidden sm:flex">Download</span>
                            </button>
                            {isOpen && (
                              <div
                                ref={dropdownRef}
                                className="absolute  bottom-full position_dropdown left-0 w-full bg-white border border-gray-300 rounded-b-md"
                              >
                                <div className="p-4">
                                  <label
                                    htmlFor="inputField"
                                    className="block mb-2 font-semibold"
                                  >
                                    Image Name Prefix
                                  </label>
                                  <input
                                    type="text"
                                    id="inputField"
                                    placeholder="Enter a value"
                                    className="p-2 mb-4 border border-gray-300 w-full"
                                  // style={{ width: "-webkit-fill-available" }}
                                  />

                                  <label
                                    htmlFor="dropdown1"
                                    className="block mb-2 font-semibold"
                                  >
                                    Download Options
                                  </label>
                                  <select
                                    id="dropdown1"
                                    className="p-2 mb-4  border border-gray-300 w-full"
                                    value={downloadOption}
                                    onChange={(e) =>
                                      setDownloadOption(e.target.value)
                                    }
                                  >
                                    <option onClick={() => handleCameraViews("2")} >Top View</option>
                                    <option value="Right View">
                                      Right View
                                    </option>
                                    <option value="Front View">
                                      Front View
                                    </option>
                                  </select>

                                  <label
                                    htmlFor="dropdown2"
                                    className="block mb-2 font-semibold "
                                  >
                                    Resolution
                                  </label>
                                  <select
                                    id="dropdown2"
                                    className="p-2 mb-4  border border-gray-300 w-full"
                                    value={resolution}
                                    onChange={(e) =>
                                      setResolution(e.target.value)
                                    }
                                  >
                                    <option value="1200 * 1200">
                                      1200 * 1200
                                    </option>
                                    <option value="1080Hd">1080Hd</option>
                                    <option value="320p">320p</option>
                                  </select>

                                  <button
                                    className={`border rounded-md bg-[${webSecondaryColor}] text-white p-2`}
                                    style={{
                                      backgroundColor: webSecondaryColor,
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
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="absolute bottom-10 left-0 right-0 m-auto">
              <div className=" flex justify-center" id="font-size-custom">
                <div className=" flex gap-3">
                  <button className="flex justify-center items-center border rounded-md bg-BlackProduct text-white px-4 sm:px-4 py-3 font-size_16"
                    onClick={handle360Image}
                  >
                    <img src="../../icons/360.png" className="sm:pe-2 h-6 " />
                    &nbsp;360
                  </button>
                  <div className="relative flex justify-center">
                    <button
                      className="flex justify-center
                   items-center border rounded-md bg-BlackProduct text-white  px-4 sm:px-4  py-3 font-size_16"
                      onClick={handleVideoDownload}
                    >
                      <img src="../../icons/video.png" className=" h-6" />
                    </button>
                  </div>

                  <div
                    className="relative flex justify-center"
                    onClick={handleDropdownToggle1}
                  >
                    <button className="flex justify-center items-center border rounded-md bg-BlackProduct text-white items-center  px-4 sm:px-4 py-3 font-size_16">
                      <img
                        src="../../icons/eye2.png"
                        alt="Eye"
                        className="sm:pe-2 h-5"
                      />
                      {selectedOption || "View ▼"}
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

                  <div className="relative flex justify-start">
                    <button
                      className="flex border justify-center items-center rounded-md bg-BlackProduct text-white items-center  px-4 sm:px-4 py-2 font-size_16"
                      onClick={handleDropdownToggle}
                    >
                      <img
                        src="../../icons/download.png"
                        alt="Eye"
                        className=" h-6"
                      />
                    </button>
                    {isOpen && (
                      <div
                        ref={dropdownRef}
                        className="absolute bottom-full position_dropdown left-0 w-max bg-white border border-gray-300 rounded-b-md"
                      >
                        <div className="p-4">
                          <label
                            htmlFor="inputField"
                            className="block mb-2 font-semibold"
                          >
                            Image Name Prefix
                          </label>
                          <input
                            type="text"
                            id="inputField"
                            placeholder="Enter a value"
                            className="p-2 mb-4 border border-gray-300 w-full"
                          // style={{ width: "-webkit-fill-available" }}
                          />

                          <label
                            htmlFor="dropdown1"
                            className="block mb-2 font-semibold"
                          >
                            Download Options
                          </label>
                          <select
                            id="dropdown1"
                            className="p-2 mb-4  border border-gray-300 w-full"
                          >
                            <option>Top View</option>
                            <option>Right View</option>
                            <option> Front View</option>
                          </select>

                          <label
                            htmlFor="dropdown2"
                            className="block mb-2 font-semibold "
                          >
                            Resolution
                          </label>
                          <select
                            id="dropdown2"
                            className="p-2 mb-4  border border-gray-300 w-full"
                          >
                            <option>1200 * 1200</option>
                            <option>1080Hd </option>
                            <option>320p</option>
                          </select>

                          <button className="border rounded-md bg-BlackProduct text-white p-2"
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
            </div>
          </div>
          {/* <div className="w-full lg:w-8/12 sticky top-0 z-50 bg-white  py-4 grid">
            <div className="hidden lg:block order-last  lg:order-first">
              <div className="flex justify-between lg:justify-evenly items-center">
                <div id="main_id">
                  <div>
                    <p className="mb-0 custom_text">Engagement Ring</p>
                    <p className="text_size_16 font-semibold">
                      Price*
                      <span className="text-BlackProduct font-bold text_size_16">
                        :$1999
                      </span>
                    </p>
                  </div>
                </div>
                <div id="price_id">
                  <button className="mt-2 border rounded-md  bg-BlackProduct text-white  px-2 sm:px-8 py-2">
                    ADD TO BAG
                  </button>
                </div>
              </div>
            </div>
            <div className="order-first dhairya relative" style={dynamicStyle}>
              <button
                className="absolute top-4 p-2 bg-BlackProduct  lg:right-26 md:right-8 right-8 rounded"
                id="enter-fullscreen"
                onClick={handleFullScreen}
              >
                <span>
                  <MdOutlineZoomOutMap
                    style={{ height: "20px", width: "20px", color: "white" }}
                  />
                </span>
              </button>

              <button
                className="absolute flex  bg-[#43464a] opacity-90 text-white top-4 cursor-pointer items-center border border-2  rounded-full border-neutral-600 py-1 px-3    lg:hidden lg:left-44 md:left-8 left-8 rounded"
                id="enter-fullscreen"
              >
                <span>
                  <AiOutlineInfoCircle
                    style={{ height: "22px", width: "22px" }}
                    // onClick={()=>}
                    onClick={() => setShowModal(true)}
                    className="cursor-pointer"
                  />
                </span>
                <p className="f-bold">&nbsp;$1999</p>
              </button>
              <canvas id="webgi-canvas"></canvas>
              <div className="flex lg:h-screen items-center justify-center">
                <canvas
                  id="webgi-canvas_version_1"
                  style={dynamicStyle2}
                ></canvas>
              </div>
            </div>
            <div className="lg:order-last">
              <div className=" flex justify-center" id="font-size-custom">
                <div className=" flex gap-3">
                  <button className="flex justify-center items-center border rounded-md bg-BlackProduct text-white px-4 sm:px-4 py-3 font-size_16">
                    <img src="../../icons/360.png" className="sm:pe-2 h-6 " />
                    &nbsp;360
                  </button>
                  <div className="relative flex justify-center">
                    <button
                      className="flex justify-center
                   items-center border rounded-md bg-BlackProduct text-white  px-4 sm:px-4  py-3 font-size_16"
                    >
                      <img src="../../icons/video.png" className=" h-6" />
                    </button>
                  </div>

                  <div
                    className="relative flex justify-center"
                    onClick={handleDropdownToggle1}
                  >
                    <button className="flex justify-center items-center border rounded-md bg-BlackProduct text-white items-center  px-4 sm:px-4 py-3 font-size_16">
                      <img
                        src="../../icons/eye2.png"
                        alt="Eye"
                        className="sm:pe-2 h-5"
                      />
                      {selectedOption || "View ▼"}
                    </button>

                    {isViewOpen && (
                      <div
                        ref={dropdownRef}
                        className="absolute bottom-full position_dropdown left-0 w-max bg-white border border-gray-300 rounded-b-md"
                      >
                        <div className="d-flex flex-col p-4">
                          <div>
                            <button
                              className="py-1"
                              onClick={() => handleOptionClick("Top ")}
                            >
                              Top View
                            </button>
                          </div>
                          <div>
                            <button
                              className="py-1"
                              onClick={() => handleOptionClick("Right ")}
                            >
                              Right View
                            </button>
                          </div>
                          <div>
                            <button
                              className="py-1"
                              onClick={() => handleOptionClick("Front ")}
                            >
                              Front View
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="relative flex justify-start">
                    <button
                      className="flex border justify-center items-center rounded-md bg-BlackProduct text-white items-center  px-4 sm:px-4 py-2 font-size_16"
                      onClick={handleDropdownToggle}
                    >
                      <img
                        src="../../icons/download.png"
                        alt="Eye"
                        className=" h-6"
                      />
                    </button>
                    {isOpen && (
                      <div
                        ref={dropdownRef}
                        className="absolute bottom-full position_dropdown left-0 w-max bg-white border border-gray-300 rounded-b-md"
                      >
                        <div className="p-4">
                          <label
                            htmlFor="inputField"
                            className="block mb-2 font-semibold"
                          >
                            Image Name Prefix
                          </label>
                          <input
                            type="text"
                            id="inputField"
                            placeholder="Enter a value"
                            className="p-2 mb-4 border border-gray-300 w-full"
                          // style={{ width: "-webkit-fill-available" }}
                          />

                          <label
                            htmlFor="dropdown1"
                            className="block mb-2 font-semibold"
                          >
                            Download Options
                          </label>
                          <select
                            id="dropdown1"
                            className="p-2 mb-4  border border-gray-300 w-full"
                          >
                            <option>Top View</option>
                            <option>Right View</option>
                            <option> Front View</option>
                          </select>

                          <label
                            htmlFor="dropdown2"
                            className="block mb-2 font-semibold "
                          >
                            Resolution
                          </label>
                          <select
                            id="dropdown2"
                            className="p-2 mb-4  border border-gray-300 w-full"
                          >
                            <option>1200 * 1200</option>
                            <option>1080Hd </option>
                            <option>320p</option>
                          </select>

                          <button className="border rounded-md bg-BlackProduct text-white p-2">
                            Download
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          <div
            className="flex flex-col justify-between w-full lg:w-4/12  py-1 h-screen overflow-auto"
            id="custom_scrollbar"
          >
            <div className="relative">
              <CenterDiamond
                data={CONFIG_DATA.center_diamond.component}
                value={setCenterDiamond}
                selectedValue={centerDiamond}
                className={{ mainButton: "py-1.5 px-2 sm:px-5", tooltipData: { height: "25px", width: "25px" }, imageData: { height: "20px", width: "20px" }, imageStyle: "mx-auto", selectedBorder: { maindiv: "flex justify-center", secdiv: "selected-border" } }}
                colorUI={webSecondaryColor}
              />
            </div>

            <div>
              {centerDiamond?.sort_code == "G" && (
                <>
                  <CenterGemstone
                    data={gemstoneList}
                    value={setCenterGemstone}
                    selectedValue={centerGemstone}
                    className={{ mainButton: "py-1.5 px-2 sm:px-5", tooltipData: { height: "25px", width: "25px" }, imageData: { height: "20px", width: "20px" }, selectedBorder: { maindiv: "flex justify-center", secdiv: "selected-border" } }}
                    colorUI={webSecondaryColor}
                  />
                </>
              )}
            </div>
            <div className="relative">
              <CenterDiamondShape
                data={DATA.diamondShapeList}
                value={setDiamondShape}
                filter={centerDiamond?.sort_code}
                selectedValue={diamondShape}
                className={{ mainButton: "py-1.5 px-2 sm:px-5 w-full", tooltipData: { height: "25px", width: "25px", scaleStyle: "mx-auto scale-2001" }, imageData: { height: "10px", width: "10px" }, divmargin: "mt-4", selectedBorder: { maindiv: "flex justify-center", secdiv: "selected-border" } }}
                colorUI={webSecondaryColor}
              />
              {/* <Carousel
                breakpoints={flashSaleCarouselBreakpoint}
                buttonSize="small"
                buttonGroupClassName=""
                className=""
                // prevButtonClasses={`start-10 md:start-0 xl:start-0 2xl:start-0`}
                // nextButtonClasses={`end-10 md:end-0 xl:end-0 2xl:end-0`}
                prevButtonClasses={`left-5 md:left-5 xl:left-5 2xl:left-5`}
                nextButtonClasses={`right-5 md:right-5 xl:right-5 2xl:right-5`}
              >
                {DATA.diamondShapeList.map((item: any, index: number) => (
                  <SwiperSlide
                    className="carouselItem"
                    key={`banner--key-${index}`}
                  >
                    <div
                      key={item.name}
                      className={`justify-center cursor-pointer cursor-pointer 
                        py-1.5 px-2 sm:px-5 item 
                        ${selectedItem === item.name ? "selected-item" : ""
                        }`}
                      onClick={() => handleItemClick(item.name)}
                    >
                      <Tooltip
                        title={
                          <div className="tooltip-content">
                            <div className="mt-2">
                              <img src={`${imageURL}${item.image_path}`} className="mx-auto" height={50} width={50} />
                            </div>
                          </div>
                        }
                        placement="right"
                        // arrow
                        classes={{ tooltip: "custom-tooltip" }}
                      >
                        <img src={`${imageURL}${item.image_path}`} className="mx-auto" height={25} width={25} />
                      </Tooltip>
                      <p className="flex justify-center">{item.name}</p>
                      {selectedItem === item.name && (
                        <div className="flex justify-center">
                          <div className="selected-border"></div>
                        </div>
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Carousel> */}
            </div>

            <div className="relative">
              <CenterDiamondSize
                data={DATA.caratSizeList}
                value={setDiamondSize}
                selectedValue={diamondSize}
                className={{ mainButton: "py-1.5 px-2 sm:px-5 w-full", tooltipData: { height: "25px", width: "25px", scaleStyle: "mx-auto scale-2001" }, imageData: { height: "15px", width: "15px" }, divmargin: "mt-4", selectedBorder: { maindiv: "flex justify-center", secdiv: "selected-border" } }}
                colorUI={webSecondaryColor}
              />
              {/* <div className="flex flex-colum mt-1">
                {DATA.caratSizeList.map((item: any) => {
                  return (
                    <div
                      className={`justify-center w-1/5 cursor-pointer 
                      py-1.5 px-3 item ${selectedDiamondSize === item.value ? "selected-item" : ""
                        }`}
                      onClick={() => centerDiamondSize(item.value)}
                    >
                      <Tooltip
                        title={
                          <div className="tooltip-content">
                            <div className="mt-2">
                              <img src={`${imageURL}${item.image_path}`} className="mx-auto" height={50} width={50} />
                            </div>
                          </div>
                        }
                        placement="right"
                        // arrow
                        classes={{ tooltip: "custom-tooltip" }}
                      >
                        <img src={`${imageURL}${item.image_path}`} className="mx-auto" height={25} width={25} />
                      </Tooltip>

                      <p className=" text-center">{item.value}</p>
                      {selectedDiamondSize === item.value && (
                        <div className="flex justify-center ">
                          <div className="selected-border"></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div> */}
            </div>

            <div className="relative">
              {centerDiamond?.sort_code != "G" && (
                <>
                  <DiamondClarityComponent
                    data={DATA.colorClarityList}
                    value={setDiamondQuality}
                    selectedValue={diamondQuality}
                    className={{ mainButton: "py-1.5 px-2 sm:px-5, ml-[18px]", tooltipData: { height: "25px", width: "25px", scaleStyle: "mx-auto scale-2001" }, imageData: { height: "15px", width: "15px" }, selectedBorder: { maindiv: "flex justify-center", secdiv: "selected-border" } }}
                    colorUI={webSecondaryColor}
                  />
                </>
              )}
              {/* <div className="flex flex-colum mt-1">
                {DATA.colorClarityList.map((item: any) => {
                  return (
                    <div
                      className={`justify-center w-1/5 cursor-pointer  
                      py-1.5
                        item ${DiamondQualityValue === item.clarity_name
                          ? "selected-item"
                          : ""
                        }`}
                      onClick={() => diamondQuality(item.clarity_name)}
                    >
                      <p className="text-center">{item.color_name}-{item.clarity_name}</p>
                      {DiamondQualityValue === item.clarity_name && (
                        <div className="flex justify-center ">
                          <div className="selected-border"></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div> */}
            </div>

            <div className="relative">
              <RingHead
                data={DATA.headList}
                value={setRingHead}
                selectedValue={ringHead}
                className={{ mainButton: "py-1.5 px-2 sm:px-5", tooltipData: { height: "25px", width: "25px", scaleStyle: "mx-auto scale-2001" }, imageData: { height: "10px", width: "10px" }, divmargin: "mt-4", selectedBorder: { maindiv: "flex justify-center", secdiv: "selected-border" } }}
                colorUI={webSecondaryColor}
              />
              {/* <div className="flex flex-colum mt-1">
                {DATA.headList.map((item: any) => {
                  return (
                    <div
                      className={`justify-center cursor-pointer  w-1/5
                      py-1.5
                       px-3 item ${crownTypeValue === item.name ? "selected-item" : ""
                        }`}
                      onClick={() => crownType(item.name)}
                    >
                      <Tooltip
                        title={
                          <div className="tooltip-content">
                            <div className="mt-2">
                              <img src={`${imageURL}${item.image_path}`} className="mx-auto" height={50} width={50} />
                            </div>
                          </div>
                        }
                        placement="right"
                        // arrow
                        classes={{ tooltip: "custom-tooltip" }}
                      >
                        <img src={`${imageURL}${item.image_path}`} className="mx-auto" height={25} width={25} />
                      </Tooltip>

                      <p className="text-center">{item.name}</p>
                      {crownTypeValue === item.name && (
                        <div className="flex justify-center ">
                          <div className="selected-border"></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div> */}
            </div>

            <div className="relative">
              <RingShank
                data={DATA.shankList}
                value={setRingShank}
                selectedValue={ringShank}
                className={{ mainButton: "py-1.5 px-2 sm:px-5 w-full", tooltipData: { height: "25px", width: "25px", scaleStyle: "mx-auto scale-2001" }, imageData: { height: "12px", width: "12px" }, divmargin: "mt-4", selectedBorder: { maindiv: "flex justify-center", secdiv: "selected-border" } }}
                colorUI={webSecondaryColor}
              />

              {/* <div className=" ">
                <Carousel
                  // breakpoints={flashSaleCarouselBreakpoint}
                  buttonSize="small"
                  buttonGroupClassName=""
                  className=""
                  // prevButtonClasses={`start-10 md:start-0 xl:start-0 2xl:start-0`}
                  // nextButtonClasses={`end-10 md:end-0 xl:end-0 2xl:end-0`}
                  prevButtonClasses={`left-5 md:left-5 xl:left-5 2xl:left-5`}
                  nextButtonClasses={`right-5 md:right-5 xl:right-5 2xl:right-5`}
                >
                  {DATA.shankList.map((item: any, index: number) => {
                    return (
                      <SwiperSlide
                        className="carouselItem"
                        key={`banner--key-${index}`}
                      >
                        <div
                          className={`justify-center cursor-pointer 
                          py-1.5
                           px-5 item ${shankTypeValue === item.name ? "selected-item" : ""
                            }`}
                          onClick={() => shankType(item.name)}
                        >
                          <Tooltip
                            title={
                              <div className="tooltip-content">
                                <div className="mt-2">
                                  <img src={`${imageURL}${item.image_path}`} className="mx-auto" height={50} width={50} />
                                </div>
                              </div>
                            }
                            placement="right"
                            // arrow
                            classes={{ tooltip: "custom-tooltip" }}
                          >
                            <img src={`${imageURL}${item.image_path}`} className="mx-auto" height={25} width={25} />
                          </Tooltip>
                          <p className="flex justify-center text-center">
                            {item.name}
                          </p>
                          {shankTypeValue === item.name && (
                            <div className="flex justify-center ">
                              <div className="selected-border"></div>
                            </div>
                          )}
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Carousel>
              </div> */}
            </div>

            <div className="relative">
              <SideSettings
                data={DATA.sideSettingStyle}
                value={setSideSettings}
                filter={ringShank?.id}
                selectedValue={sideSettings}
                className={{ mainButton: "py-1.5 px-2 sm:px-5", tooltipData: { height: "25px", width: "25px", scaleStyle: "mx-auto scale-2001" }, imageData: { height: "10px", width: "10px" }, divmargin: "mt-4", selectedBorder: { maindiv: "flex justify-center", secdiv: "selected-border" } }}
                colorUI={webSecondaryColor}
              />
              {/* <div className="flex flex-colum mt-1">
                {DATA.sideSettingStyle.map((item: any) => {
                  return (
                    <div
                      className={`justify-center cursor-pointer w-1/5
                      py-1.5
                       px-3 item ${sideSettingValue === item.name ? "selected-item" : ""
                        }`}
                      onClick={() => sideSetting(item.name)}
                    >
                      <Tooltip
                        title={
                          <div className="tooltip-content">
                            <div className="mt-2">
                              <img src={`${imageURL}${item.image_path}`} className="mx-auto" height={50} width={50} />
                            </div>
                          </div>
                        }
                        placement="right"
                        // arrow
                        classes={{ tooltip: "custom-tooltip" }}
                      >
                        <img src={`${imageURL}${item.image_path}`} className="mx-auto" height={25} width={25} />
                      </Tooltip>
                      <p className="text-center">{item.name}</p>
                      {sideSettingValue === item.name && (
                        <div className="flex justify-center ">
                          <div className="selected-border"></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div> */}
            </div>

            <div className="relative">
              <MetalComponent
                data={DATA.metalList}
                value={setMetalData}
                selectedValue={MetalData}
                className={{ mainButton: "py-1.5 px-2 sm:px-5", tooltipData: { height: "50px", width: "50px" }, imageData: { height: "25px", width: "25px" }, fontStyle: "font-bold", selectedBorder: { maindiv: "flex justify-center", secdiv: "selected-border" } }}
                colorUI={webSecondaryColor}
              />
              {/* <div className="flex flex-colum mt-1">
                {DATA.GoldKTList.map((item: any) => {
                  return (
                    <div
                      className={`justify-center cursor-pointer  w-1/5
                      py-1.5
                       px-3 item ${goldKtValue === item.slug ? "selected-item" : ""
                        }`}
                      onClick={() => goldKt(item.slug)}
                    >
                      <Tooltip
                        title={
                          <div className="tooltip-content">
                            <div className="mt-2  ">
                              <img src={item.src} className="mx-auto " />
                            </div>
                          </div>
                        }
                        placement="right"
                        // arrow
                        classes={{ tooltip: "custom-tooltip" }}
                      >
                        <img src={item.src} className=" items-center " />
                      </Tooltip>
                      <p className="mt-1 justify-center text-center">
                        {item.slug}
                      </p>
                      {goldKtValue === item.slug && (
                        <div className="flex justify-center ">
                          <div className="selected-border"></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div> */}
            </div>

            <div className="relative">
              {MetalData?.id_metal == 1 && (
                <>
                  <RingCrownColor
                    data={DATA.metalToneList}
                    value={setRingHeadTone}
                    selectedValue={ringHeadTone}
                    className={{ mainButton: "py-1.5 px-2 sm:px-5", imageData: { height: "15px", width: "15px" }, selectedBorder: { maindiv: "flex justify-center", secdiv: "selected-border" } }}
                    colorUI={webSecondaryColor}
                  />
                </>
              )}
              {/* <div className="flex flex-colum mt-1">
                {DATA.metalToneList.map((item: any) => {
                  return (
                    <div
                      className={`justify-center cursor-pointer w-1/5
                      py-1.5
                       px-3 item ${crownMetalToneValue === item.name
                          ? "selected-item"
                          : ""
                        }`}
                      onClick={() => crownMetalTone(item.name)}
                    >
                      <img src={`${imageURL}${item.image_path}`} className="mx-auto" height={25} width={25} />
                      <p className="text-center">{item.name}</p>

                      {crownMetalToneValue === item.name && (
                        <div className="flex justify-center ">
                          <div className="selected-border"></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div> */}
            </div>

            <div className="relative">
              {MetalData?.id_metal == 1 && (
                <>
                  <RingStyleColor
                    data={DATA.metalToneList}
                    value={setRingShankTone}
                    selectedValue={ringShankTone}
                    className={{ mainButton: "py-1.5 px-2 sm:px-5", imageData: { height: "15px", width: "15px" }, selectedBorder: { maindiv: "flex justify-center", secdiv: "selected-border" } }}
                    colorUI={webSecondaryColor}
                  />
                </>
              )}
              {/* {DATA.metalToneList.map((item: any) => {
                  return (
                    <div
                      className={`justify-center cursor-pointer w-1/5
                      py-1.5
                       px-3 item ${crownMetalToneValue === item.name
                          ? "selected-item"
                          : ""
                        }`}
                      onClick={() => crownMetalTone(item.name)}
                    >
                      <img src={`${imageURL}${item.image_path}`} className="mx-auto" height={25} width={25} />
                      <p className="flex justify-center text-center">
                        {item.name}
                      </p>

                      {crownMetalToneValue === item.name && (
                        <div className="flex justify-center ">
                          <div className="selected-border"></div>
                        </div>
                      )}
                    </div>
                  );
                })} */}
            </div>

            <div className="relative">
              <MatchingWeddingBand
                data={CONFIG_DATA.matching_wedding_band.component}
                selectedValue={matchingWeddingBand}
                value={setMatchingWeddingBand}
                className={{ mainButton: "py-1.5 px-2 sm:px-5", tooltipData: { height: "50px", width: "50px", scaleStyle: "mx-auto" }, imageData: { height: "25px", width: "25px" }, selectedBorder: { maindiv: "flex justify-center", secdiv: "selected-border" } }}
                colorUI={webSecondaryColor}
              />
              {/* <div className="flex flex-colum mt-1">
                {MatchingWeddingBandData.map((item) => {
                  return (
                    <div
                      className={`justify-center cursor-pointer w-1/5 py-4  px-1 item ${matchingWeddingBandValue === item.name
                        ? "selected-item"
                        : ""
                        }`}
                      onClick={() => matchingWeddingBand(item.name)}
                    >
                      <Tooltip
                        title={
                          <div className="tooltip-content">
                            <div className="mt-2">
                              <img src={item.src} className="mx-auto" height={50} width={50} />
                            </div>
                          </div>
                        }
                        placement="right"
                        // arrow
                        classes={{ tooltip: "custom-tooltip" }}
                      >
                        <img src={item.src} className="mx-auto" height={30} width={30} />
                      </Tooltip>
                      <p className="text-center">{item.name}</p>
                      {matchingWeddingBandValue === item.name && (
                        <div className="flex justify-center ">
                          <div className="selected-border"></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div> */}
            </div>

            <div className="relative">

              {MetalData?.id_metal == 1 &&
                matchingWeddingBand?.id_metal_tone == 1 && (
                  <>
                    <MatchBandMetalTone
                      data={DATA.metalToneList}
                      selectedValue={bandMetalTone}
                      value={setBandMetalTone}
                      className={{ mainButton: "py-1.5 px-2 sm:px-5", imageData: { height: "15px", width: "15px" }, selectedBorder: { maindiv: "flex justify-center", secdiv: "selected-border" } }}
                      colorUI={webSecondaryColor}
                    />
                  </>
                )}
            </div>
            <div className="relative">
              <div className="flex flex-colum mt-1">
                {RingSizeData.map((item) => {
                  return (
                    <div
                      className={`justify-center cursor-pointer  w-1/5
                      py-1  px-3 item ${RingSizeValue === item.name ? "selected-item" : ""
                        }`}
                      onClick={() => SetRingSize(item.name)}
                    >
                      <p className="flex justify-center render-2-fontsize">{item.name}</p>
                      {RingSizeValue === item.name && (
                        <div className="flex justify-center ">
                          <div className="selected-border absolute width-render-2"></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="">
              {/* <div className="flex flex-colum mt-4 overflow-auto">
                {PersonalisedEngravingData.map((item) => {
                  return (
                    <div
                      className={`justify-center cursor-pointer w-1/5
                      py-1.5
                       px-3 item ${persinalisedEngravingValue === item.name
                          ? "selected-item"
                          : ""
                        }`}
                      onClick={() => persinalisedEngraving(item.name)}
                    >
                      <p className="break-all text-center">{item.name}</p>
                      {persinalisedEngravingValue === item.name && (
                        <div className="flex justify-center ">
                          <div className="selected-border"></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div> */}

              {/* <div className="mb-3 pb-3 lg:pb-0">
                <Input
                  size="small"
                  name="Engraving"
                  className="w-full mt-1"
                  // variant="solid"
                  value={engravingName}
                  onChange={(e: any) => setEngravingName(e.target.value)}
                />
              </div> */}

              <div>
                <TextField
                  id="standard-basic"
                  style={{ paddingLeft: "24px" }}
                  label=" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; You Engraving Text"
                  variant="standard"
                  className="px-5 border-b rounded-lg border-gray-300 w-full"
                  value={engravingName}
                  onChange={(e: any) => setEngravingName(e.target.value)}
                />
              </div>

            </div>


            {/* <div className="my-8">
              <p className="font-bold">Select Ring Size:</p>
              <div className="flex flex-column gap-8 ">
                <div className="justify-center py-4 px-5 ">
                  <select className="border border-gray-300 w-32 h-10">
                    <option value="5">Size 5</option>
                    <option value="6">Size 6</option>
                    <option value="7">Size 7</option>
                
                  </select>
                </div>
             
          </div>

        </div> */}
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
                      <h3 className="font-bold">
                        {configPriceData &&
                          configPriceData.data &&
                          configPriceData?.data?.data?.product_title}{" "}
                      </h3>
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
                    <div id="main_id " className="px-5 pl-0">
                      <div>
                        <p
                        // className={`mb-0 text-[${webSecondaryColor}]`}
                        // style={{ color: webSecondaryColor }}
                        >
                          {" "}
                          <p className="text-body TCC-product-detail-discription">
                            {configPriceData &&
                              configPriceData.data &&
                              configPriceData?.data?.data?.sku}
                          </p>
                        </p>
                      </div>
                      <div className="mt-2">
                        <p className="mb-0">
                          {" "}
                          <p className="text-body TCC-product-detail-discription">
                            {configPriceData &&
                              configPriceData.data &&
                              configPriceData?.data?.data?.product_sort_des}
                          </p>
                        </p>
                        <p
                        // className={`mb-0 text-[${webSecondaryColor}]`}
                        // style={{ color: webSecondaryColor }}
                        >
                          &#11088; &#11088; &#11088; &#11088; &#11088;{" "}
                          <div>(107 Reviewed)</div>
                        </p>
                      </div>
                    </div>
                    <div id="price_id " className="px-5 pl-0">
                      <div className="">
                        <p className="text_size_16 font-bold pb-4 mt-5">
                          Price*
                          <span
                          // className={`text-[${webSecondaryColor}] text_size_16`}
                          // style={{ color: webSecondaryColor }}
                          >
                            : {CURRENCY}{" "}
                            {configPriceData &&
                              configPriceData.data &&
                              configPriceData?.data?.data?.product_total_price.toFixed(2)}
                          </span>
                        </p>
                      </div>
                      {/* <div className="">
                        <button
                          className={`bg-[${webSecondaryColor}] text-white active:bg-green-600 font-bold uppercase text-sm px-10 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                          onClick={addCartProducthandler}
                          style={{ backgroundColor: webSecondaryColor }}
                        >
                          BUY
                        </button>
                      </div> */}
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="bg-black text-white active:bg-green-600 font-bold uppercase text-sm px-10 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    // onClick={addCartProducthandler}
                    // style={{ backgroundColor: webSecondaryColor }}
                    >
                      BUY
                    </button>
                    <button
                      className={`bg-gray-300 text-black active:bg-green-600 font-bold uppercase text-sm px-8 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-[-20px] mb-1 ease-linear transition-all duration-150`}
                      type="button"
                      onClick={() => setShowModal(false)}
                    // style={{ backgroundColor: webSecondaryColor }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div >
    </>
  );
};

export default DemoProduct3DRender;
