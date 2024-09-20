import React, { useContext, useEffect, useRef, useState } from "react";
import Button from "@components/ui/button";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Input from "@components/ui/input";
import { CURRENCY } from "@utils/constants";
import CONFIG_DATA from "../../../public/api/configrator-3d.json";
import PRICING from "../../../public/api/pricing.json";
import CenterDiamondShape from "@components/configrator/center-diamond-shape";
import CenterDiamondSize from "@components/configrator/center-diamond-size";
import RingCrownColor from "@components/configrator/ring-crown-color";
import RingStyleColor from "@components/configrator/ring-style-color";
import CenterGemstone from "@components/configrator/center-gemstone";
import RingHead from "@components/configrator/ring-head";
import SideSettings from "@components/configrator/side-setting";
import RingShank from "@components/configrator/ring-shank";
import CenterDiamond from "@components/configrator/center-diamond";
import MetalComponent from "@components/configrator/metal-component";
import DiamondClarityComponent from "@components/configrator/diamond-clarity-component";
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
} from "webgi";
import MatchingWeddingBand from "./matching-wedding-band";
import MatchBandMetalTone from "@components/configrator/mech-band-metal-tone";
import { useConfiguratorProductPriceQuery } from "@framework/price-module-api/priceModuleApi";
import { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";
import Cookies from "js-cookie";
import { useAddCartMutation } from "@framework/config-product-api/addCartModuleApi";
import { CompanyInfoContext } from "@contexts/company_info/company_info";
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";
import DiamondCenterComponent from "@components/configrator/diamond-center";
import DiamondCutComponent from "@components/configrator/diamond-cut";
import GemstoneTypeComponent from "@components/configrator/gemstone-type";


const Product3DRenderPricing: React.FC<{ configData: any }> = (props) => {
  const DATA = props.configData;
  const imageUrl = process.env.NEXT_PUBLIC_IMG_URL + "configurator/static/";
  const [centerDiamondList, setCenterDiamondList] = useState<any[]>();
  const [gemstoneList, setGemstoneList] = useState<any[]>();
  const [centerDiamond, setCenterDiamond] = useState<any>();
  const [centerDiamondData, setCenterDiamondData] = useState<any>();
  const [gemstoneType, setGemstoneType] = useState<any>();
  const [diamondShape, setDiamondShape] = useState<any>();
  const [diamondSize, setDiamondSize] = useState<any>();
  const [ringHead, setRingHead] = useState<any>();
  const [sideSettings, setSideSettings] = useState<any>();
  const [ringShank, setRingShank] = useState<any>();
  const [MetalData, setMetalData] = useState<any>();
  const [ringHeadTone, setRingHeadTone] = useState<any>();
  const [matchingWeddingBand, setMatchingWeddingBand] = useState<any>();
  const [ringShankTone, setRingShankTone] = useState<any>();
  const [bandMetalTone, setBandMetalTone] = useState<any>();
  const [diamondQuality, setDiamondQuality] = useState<any>();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [diamondCut, setDiamondCut] = useState<any>();
  const [isLoading, setLoading] = useState(true);
  const [centerGemstone, setCenterGemstone] = useState<any>();
  const [viewer, setViewer] = useState<any>();
  const [isBgChecked, setIsBgChecked] = useState<boolean>(false);
  const [is360Running, setIs360Running] = useState<boolean>(false);
  const [imageDownLoadIndex, setImageDownLoadIndex] = useState<string>("1");
  const [engravingName, setEngravingName] = useState<string>("The Cadco Co.");
  const [objects, setObjects] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [config, setConfig] = useState<VariationConfiguratorPlugin>();
  const [productPriceValue, setProductPriceValue] = useState<any>();

  const [loginUserEmail, setLoginUserEmail] = useState<any>();
  const [productId, setProductId] = useState<any>();
  const [metalId, setMetaId] = useState<any>();
  const [karatId, setkaratId] = useState<any>();
  const [metalToneId, setMetalToneId] = useState<any>();
  const [diamondGroupId, setDiamondGroupId] = useState<any>();
  const [productTitle, setProductTitle] = useState<any>();
  const [productShortDes, setProductShortDes] = useState<any>();
  const [productSku, setProductSku] = useState<string>();
  const [imageData, setImageData] = useState<any>();
  const [band, setBand] = useState<any>();
  const [shareClick, setShareClick] = useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const { data: addCartData, mutate: addCart } = useAddCartMutation();
  const [finalClarityData, setFinalClarityData] = useState<any>()

  const [isOpen, setIsOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedValue, setSelectedValue] = useState({
    // CenterDiamondId: 1,
    // DiamondShapeId: 80,
    // CentreDiamondShapeId: 80,
    // CentreDiamondSizeID: 2,
    // GemStoneId: 1,
    // RingHeadID: 27,
    // RingShankID: 1,
    // SideSettingID: 1,
    // MetalID: 1,
    // MetalKaratID: 40,
    // RingCrownMetalID: 2,
    // ShankCrownMetalID: 2,
    // RingStyleMetalID: 2,
    // RingBandStyleID: 1,
    // BandStyleMetalID: 2,
    // DiamondColorID: 9,
    // DiamondClarityID: 14,
    // DiamondId: 1,
    // CutId: 7,
    // GemstoneTypeId: 1
  });

  const diamondFilterData = DATA.gemstoneList.filter((t: any) => t.is_diamond == 1)
  const colorClarityData = DATA.colorClarityList?.map((value: any, index: any) => ({ ...value, id: index + 1 }))
  const dropdownRef = useRef(null);


  const handleDropdownToggle1 = () => {
    setIsViewOpen((prev) => !prev);
  };

  const handleDropdownToggle = () => {
    setIsOpen((prevState) => !prevState);
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

  const webConfigBgColor = process.env.NEXT_PUBLIC_WEBCONFIG_BG_COLOR;

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

  const [selectedPriceValue, setSelectedPriceValue] =
    useState<any>();

  useEffect(() => {
    const array: any = []
    for (const list of colorClarityData) {
      if (list.color_name == "G" && list.clarity_name == "VS") {
        array.push({ ...list, certify: "GIA Premium Certified" })
      } else if (list.color_name == "H" && list.clarity_name == "SI") {
        array.push({ ...list, certify: "IGI Certified" })
      } else {
        array.push({ ...list, certify: " " })
      }
    }
    setFinalClarityData(array)
  }, [DATA?.colorClarityList])

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
      CenterDiamondId: 1,
      CentreDiamondShapeId: 80,
      DiamondShapeId: 80,
      CentreDiamondSizeID: 2,
      GemStoneId: 1,
      RingHeadID: 27,
      RingShankID: 1,
      SideSettingID: 1,
      MetalID: 1,
      MetalKaratID: 40,
      RingCrownMetalID: 2,
      ShankCrownMetalID: 2,
      RingStyleMetalID: 2,
      RingBandStyleID: 1,
      BandStyleMetalID: 2,
      DiamondColorID: 8,
      DiamondClarityID: 13,
      DiamondId: 34,
      CutId: 9,
      GemstoneTypeId: 1,
    };

    //New Logic for Default Value

    const dbCenterDiamondId = DATA.gemstoneList.filter(
      (t: any) => t.sort_code == "ND"
    );
    let centerDiamondData: any[] = [];

    CONFIG_DATA.center_diamond.component.map((t: any) => {
      const objDetails = t;
      if (dbCenterDiamondId && dbCenterDiamondId.length > 0 && t.sort_code == "D") {
        objDetails.id = dbCenterDiamondId[0]?.id;
      }
      centerDiamondData.push(objDetails);
    });
    setCenterDiamondList(centerDiamondData);

    const gemstoneData = DATA.gemstoneList.filter(
      (t: any) => t.sort_code != "DI"
    );

    setGemstoneList(gemstoneData);

    selectedData.CenterDiamondId = dbCenterDiamondId[0]?.id;

    const centerDiamondId = centerDiamondData.filter(
      (t: any) => t.id === selectedData.CenterDiamondId
    );
    setCenterDiamond(centerDiamondId.length !== 0 && centerDiamondId[0]);


    // ** CENTER_DIAMOND_TYPE 

    const gemstoneTypeData = CONFIG_DATA.gemstone_type.component.filter(
      (t: any) => t.id === selectedData.GemstoneTypeId
    );

    setGemstoneType(gemstoneTypeData.length !== 0 && gemstoneTypeData[0]);

    // ** GEMSTONE_TYPE 

    const diamondId = CONFIG_DATA.diamond_center.component.filter(
      (t: any) => t.id === selectedData.DiamondId
    );

    setCenterDiamondData(diamondId.length !== 0 && diamondId[0]);
    // ** SHAPE

    const centreDiamondShapeId =
      DATA.diamondShapeList.length !== 0 &&
      DATA.diamondShapeList.filter((t: any) => t.id === selectedData.DiamondShapeId)

    setDiamondShape(
      centreDiamondShapeId.length !== 0 && centreDiamondShapeId[0]
    );

    selectedData.GemStoneId = gemstoneData && gemstoneData[0].id;

    const gemstoneId =
      gemstoneData &&
      gemstoneData.length !== 0 &&
      gemstoneData.filter((t: any) => t.id === selectedData.GemStoneId);
    setCenterGemstone(gemstoneId.length !== 0 && gemstoneId[0]);

    // ** SIZE

    selectedData.CentreDiamondSizeID =
      DATA.caratSizeList && DATA.caratSizeList[0].id;

    const centreDiamondSizeID =
      DATA &&
      DATA.caratSizeList.filter(
        (t: any) => t.id === selectedData.CentreDiamondSizeID
      );
    setDiamondSize(centreDiamondSizeID.length !== 0 && centreDiamondSizeID[0]);

    // ** CUT

    const diamondCutId = DATA.cutsList?.length !== 0 &&
      DATA.cutsList?.filter(
        (t: any) => t.id === selectedData.CutId
      );

    setDiamondCut(
      diamondCutId?.length !== 0 && diamondCutId[0]
    );

    // ** RING_HEAD

    selectedData.RingHeadID = DATA.headList && DATA.headList[4]?.id;

    const ringHeadID =
      DATA &&
      DATA.headList.filter((t: any) => t.id === selectedData?.RingHeadID);
    setRingHead(ringHeadID.length !== 0 && ringHeadID[0]);

    // ** RING_SHANK

    selectedData.RingShankID = DATA.shankList && DATA.shankList[0]?.id;

    const ringShankID =
      DATA &&
      DATA.shankList.filter((t: any) => t.id === selectedData.RingShankID);
    setRingShank(ringShankID.length !== 0 && ringShankID[0]);

    // ** SIDE_SETTING

    const sideSettingID =
      DATA &&
      DATA.sideSettingStyle.filter(
        (t: any) => t.id === selectedData.SideSettingID
      );
    setSideSettings(sideSettingID.length !== 0 && sideSettingID[0]);

    // ** METAL_KARAT

    selectedData.MetalKaratID = DATA.metalList && DATA.metalList[0].id;
    selectedData.MetalID = DATA.metalList && DATA.metalList[0].id_metal;

    const metalComponentID = DATA.metalList.filter(
      (t: any) => t.id === selectedData.MetalKaratID
    );
    setMetalData(metalComponentID.length !== 0 && metalComponentID[0]);

    // ** HEAD_METALTONE

    selectedData.RingCrownMetalID =
      DATA.metalToneList && DATA.metalToneList[3].id;

    const ringCrownMetalID = DATA.metalToneList.filter(
      (t: any) => t.id === selectedData.RingCrownMetalID
    );
    setRingHeadTone(ringCrownMetalID.length !== 0 && ringCrownMetalID[0]);

    // ** SHANK_MEATALTONE

    selectedData.ShankCrownMetalID =
      DATA.metalToneList && DATA.metalToneList[3].id;

    const ringShankMetalID = DATA.metalToneList.filter(
      (t: any) => t.id === selectedData.ShankCrownMetalID
    );
    setRingShankTone(ringShankMetalID.length !== 0 && ringShankMetalID[0]);

    // ** BAND

    const RingBandStyleID = CONFIG_DATA.matching_wedding_band.component.filter(
      (t: any) => t.id === selectedData.RingBandStyleID
    );
    setMatchingWeddingBand(RingBandStyleID.length !== 0 && RingBandStyleID[0]);

    selectedData.BandStyleMetalID =
      DATA.metalToneList && DATA.metalToneList[3].id;

    const rindBandToneId = DATA.metalToneList.filter(
      (t: any) => t.id === selectedData.BandStyleMetalID
    );
    setBandMetalTone(rindBandToneId.length !== 0 && rindBandToneId[0]);

    // ** COLORCLARITY 

    const diamondQualityData = colorClarityData?.filter(
      (t: any) =>
        t.id_clarity === selectedData.DiamondClarityID &&
        t.id_color === selectedData.DiamondColorID
    );

    setDiamondQuality(diamondQualityData?.length !== 0 && diamondQualityData[0]);

    setSelectedValue(selectedData);

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
          ? diamondFilterData && diamondFilterData[0].id
          : centerGemstone?.id),
      diamond_type: centerDiamond && centerDiamond?.diamond_type,
      center_stone_shape: diamondShape && diamondShape?.id,
      center_stone_color: (centerDiamond?.sort_code == "D" ? diamondQuality && diamondQuality.id_color : null),
      center_stone_clarity: (centerDiamond?.sort_code == "D" ? diamondQuality && diamondQuality.id_clarity : null),
      head: ringHead && ringHead?.id,
      shank: ringShank && ringShank?.id,
      side_setting: sideSettings && sideSettings.id,
      center_stone_size: diamondSize && diamondSize.id,
      center_stone_cuts: (centerDiamond?.sort_code == "G" ? diamondCut && diamondCut?.id : null),
      metal: MetalData && MetalData.id_metal,
      karat: MetalData && MetalData.id,
      is_band: matchingWeddingBand && matchingWeddingBand.id == 1 ? 0 : 1,
    });
  }, [
    centerDiamondData,
    centerDiamond,
    gemstoneType,
    centerGemstone,
    diamondShape,
    ringHead,
    ringShank,
    diamondCut,
    sideSettings,
    diamondSize,
    MetalData,
    diamondQuality,
    matchingWeddingBand,
  ]);

  useEffect(() => {
    setProductId(configPriceData && configPriceData?.data?.data?.id)
    setDiamondGroupId(configPriceData && configPriceData?.data?.data?.center_diamond_group_id)
    setProductSku(configPriceData && configPriceData?.data?.data?.sku)
    setProductShortDes(configPriceData && configPriceData?.data?.data?.product_sort_des)
    setProductTitle(configPriceData && configPriceData?.data?.data?.product_title)
    setProductPriceValue(configPriceData && configPriceData?.data?.data?.product_total_price);
    refreshUI(configPriceData && configPriceData?.data?.data);
  }, [configPriceData]);

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
      });
    });
  }, [selectedValue]);

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
    viewer.getManager().importer.registerFile("temp.glb").preparsers[0].key = (encryption: any, json: any, a: any) => {
      if (a.includes('Bands/'))
        return "d{H9KprfAxqh";
      else
        return "ObECsgKY3qJ$";
    };
    const config = await viewer.addPlugin(VariationConfiguratorPlugin);

    await manager.addFromPath(`${imageUrl}UV_TCC.glb`, options);
    await Promise.all([
      manager.addFromPath(`${imageUrl}config_tcc.vjson`),
      manager.addFromPath("/assets/config_tcc_variation.json")
    ]);

    await manager.addFromPath("/assets/preset.CameraViews.json");
    setConfig(config);
    setObjects(config.getObjectVariations());
    setMaterials(config.getMaterialVariations());
    getConfigData(selectedPriceValue);
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
        if (child.name.includes("Metal03")) {
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

          //console.log("child.name", child.name);

          if (
            child.name.includes("Diamond_Oval") ||
            child.name.includes("Diamond__Oval") ||
            child.name.includes("CS_Diamond") ||
            child.name.includes("Diamond_Emerald")
          ) {
            const diamondMaterial = await viewer
              .getManager()
              .importer.importSinglePath("/assets/PDmat/" + dmatName);

            viewer.getPlugin(DiamondPlugin).prepareDiamondMesh(child, {
              cacheKey: cacheKey,
              normalMapRes: 512,
            });
            child.setMaterial(diamondMaterial);
          } else {
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
      }
      else {
        const object = config?.variations.objects.find(
          (obj) => obj.name == "Bands"
        )!;
        const index = object.items.findIndex((t: any) => t.includes("empty"));

        await config?.applyVariation(object, index, "objects");
      }

      let pricingData = 0;

      //Pricing
      if (diamondQuality && diamondShape && diamondSize) {
        const findHead = PRICING.head.filter(
          (t: any) =>
            t.shape == diamondShape.sort_code &&
            t.carat == diamondSize.sort_code &&
            t.quality == diamondQuality.sort_code
        );
        if (findHead && findHead.length > 0) {
          pricingData = pricingData + parseInt(findHead[0].value);
        }
      }

      if (ringShank && sideSettings) {
        const findShank = PRICING.shank.filter(
          (t: any) =>
            t.type == ringShank.sort_code &&
            t.style == sideSettings.sort_code &&
            t.metal == MetalData.sort_code
        );
        if (findShank && findShank.length > 0) {
          pricingData = pricingData + parseInt(findShank[0].value);
        }

        if (matchingWeddingBand && matchingWeddingBand.sort_code == "BAND") {
          const findBand = PRICING.band.filter(
            (t: any) =>
              t.type == ringShank.sort_code &&
              t.style == sideSettings.sort_code &&
              t.metal == MetalData.sort_code
          );
          if (findBand && findBand.length > 0) {
            pricingData = pricingData + parseInt(findBand[0].value);
          }
        }
      }

      setProductPriceValue(pricingData)
      setMaterial();
    }
  };

  useEffect(() => {
    setMaterial();
  }, [
    centerDiamondData,
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
    const canvas = document.getElementById("webgi-canvas") as HTMLCanvasElement;
    viewer.getPlugin(FullScreenPlugin).toggle(canvas.parentElement);
  };

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
      {isLoading ? (
        <FallbackSpinner />
      ) : (
        <div className="block lg:grid grid-cols-3 TCC-main-component w-100">
          <div
            className={`col-span-2 grid grid-cols-1 TCC-image-component relative`}
          >
            {isFullScreen ? <></> :
              <>
                <button
                  className="absolute flex bg-[#43464a] mt-[114px] opacity-90 text-white cursor-pointer items-center border border-2  rounded-full border-neutral-600 py-1 px-3 lg:hidden lg:left-44 md:left-8 left-8 rounded"
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
                    {configPriceData &&
                      configPriceData.data &&
                      configPriceData?.data?.data?.product_total_price.toFixed(2)}
                  </p>
                </button>
              </>}

            {isFullScreen ?
              <>
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
              </> :
              <>
                <div className="floating-buttons topright mt-[-14px] md:mt-[93px] lg:mt-0">
                  <Button
                    style={{ background: webConfigBgColor, width: "20%" }}
                    className="rounded"
                    id="enter-fullscreen"
                    onClick={handleFullScreen}
                  >
                    <span>
                      <MdOutlineZoomOutMap height="40" width="40" />
                    </span>
                  </Button>
                </div>
                <button
                  className="absolute lg:top-[21px] top-[110px] p-2 lg:right-[11%] md:right-24 right-[70px]"
                  onClick={() => setShareClick(!shareClick)}
                >
                  <img
                    src={"/assets/TCCimage/share-icon.png"}
                    alt={`share`}
                    className="object-cover w-6 h-6"
                  />
                </button>
                {shareClick && (
                  <div className="gap-5 absolute lg:top-[15%] top-[34%] lg:right-0 right-0 md:right-0 p-2 ">
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
              </>}


            {isFullScreen ?
              <>
                {width < 1034 ?
                  <canvas id="webgi-canvas" style={{ height: height }} className="h-full lg:h-full md:h-full"></canvas>
                  :
                  <canvas id="webgi-canvas" style={{ height: height }} className="h-full lg:h-full md:h-full"></canvas>
                }
              </> :
              <>
                {width > 1034 ?
                  <canvas id="webgi-canvas" style={{ height: height - 120 }} ></canvas>
                  : width < 768 ?
                    <canvas id="webgi-canvas" className="w-full lg:h-full lg:w-full h-[370px] pt-[93px] lg:pt-0"></canvas>
                    :
                    <canvas id="webgi-canvas" className="w-full lg:h-full lg:w-full h-[450px] pt-[93px] lg:pt-0"></canvas>
                }
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
                        </span>
                      </button>
                    </div>
                    <div className="pt-5 py-5 items-center  ">
                      <div id="main_id " className="px-5 pl-0">
                        <div>
                          <p>
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
                            <span
                            >
                              : {CURRENCY}
                              {configPriceData &&
                                configPriceData.data &&
                                configPriceData?.data?.data?.product_total_price.toFixed(2)}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/*footer*/}
                    <div className="flex justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        style={{ background: webConfigBgColor }}
                        className={`text-white active:bg-green-600 font-bold uppercase text-sm px-10 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
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
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : <></>}
          <div className="col-span-1 TCC-dis-component ps-3">
            <div className="pb-7 tcc-mobile-margin lg:ps-5 lg:pe-5 ps-5 pe-5">
              <div className="lg:flex hidden lg:visible md:invisible">
                <h2 className="text-black mb-3.5 TCC-product-pricing-heading pt-3">
                  {productTitle}
                  <small style={{ color: webConfigBgColor }} className="flex w-100">
                    {productSku}
                  </small>
                </h2>
              </div>

              {/* {/ Discription /} */}
              <p className="invisible lg:visible md:invisible text-body TCC-product-detail-discription w-2/3">
                {productShortDes}
              </p>

              <div className="flex items-center mt-5 invisible lg:visible md:invisible">
                <div className="font-bold text-base md:text-xl lg:text-2xl 2xl:text-4xl pe-2 md:pe-0 lg:pe-2 2xl:pe-0">
                  <span style={{ color: webConfigBgColor }} className="TCC-product-configurator-price">
                    Price:{" "}{CURRENCY}
                    {configPriceData &&
                      configPriceData.data &&
                      configPriceData?.data?.data?.product_total_price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <div
              className="mt-[-110px] md:mt-[-87px] lg:mt-[4px] lg:config-filter-content lg:overflow-x-hidden lg:overflow-y-auto lg:mh-50 ml pe-5 ps-5 lg:pe-5 lg:ps-5"
              style={{ height: height - 297 }}
            >
              {/* Config Component */}
              <div>
                <span className="TCC-config-title">Center Diamond: </span>
                <span className="" style={{ background: `${webConfigBgColor}`, backgroundClip: "text", WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text" }}>{centerDiamond.name}</span>
                <CenterDiamond
                  data={CONFIG_DATA.center_diamond.component}
                  value={setCenterDiamond}
                  selectedValue={centerDiamond}
                  className={{ mainButton: "px-7 py-3 w-full", buttonSelected: "localconfig-selected-value", tooltipData: { height: "50px", width: "50px" }, imageData: { height: "25px", width: "25px" }, imageStyle: "mx-auto" }}
                />
              </div>

              <div className="border-b border-gray-300 my-3" />

              {/* {centerDiamond?.sort_code == "D" && (
                <div>
                  <span className="TCC-config-title">Diamond Type: </span>
                  <span className="" style={{ background: `${webConfigBgColor}`, backgroundClip: "text", WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text" }}>{centerDiamondData.name}</span>
                  <DiamondCenterComponent
                    data={CONFIG_DATA.diamond_center.component}
                    value={setCenterDiamondData}
                    selectedValue={centerDiamondData}
                    className={{ mainButton: "py-3 w-full", buttonSelected: "localconfig-selected-value", tooltipData: { height: "50px", width: "50px" }, imageData: { height: "25px", width: "25px" } }}
                  />
                  <div className="border-b border-gray-300 my-3" />
                </div>
              )} */}

              {centerDiamond?.sort_code == "G" && (
                <div>
                  <span className="TCC-config-title">Gemstone Type: </span>
                  <span className="" style={{ background: `${webConfigBgColor}`, backgroundClip: "text", WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text" }}>{centerDiamondData.name}</span>
                  <GemstoneTypeComponent
                    data={CONFIG_DATA.gemstone_type}
                    value={setGemstoneType}
                    selectedValue={gemstoneType}
                    className={{ mainButton: "py-3 w-full", buttonSelected: "localconfig-selected-value", tooltipData: { height: "50px", width: "50px" }, imageData: { height: "25px", width: "25px" } }}
                  />
                  <div className="border-b border-gray-300 my-3" />
                </div>
              )}

              {centerDiamond?.sort_code == "G" && (
                <>
                  <span className="TCC-config-title">Gemstone: </span>
                  <span className="" style={{ background: `${webConfigBgColor}`, backgroundClip: "text", WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text" }}>{centerGemstone.name}</span>
                  <CenterGemstone
                    data={DATA.gemstoneList}
                    value={setCenterGemstone}
                    selectedValue={centerGemstone}
                    className={{ mainButton: "py-3 w-full", buttonSelected: "localconfig-selected-value", tooltipData: { height: "25px", width: "25px", scaleStyle: "mx-auto scale-2001" }, imageData: { height: "15px", width: "15px" }, divmargin: "mt-2.5" }}
                  />
                  <div className="border-b border-gray-300 my-3" />
                </>
              )}

              <div>
                <span className="TCC-config-title">Center Diamond Shape: </span>
                <span className="" style={{ background: `${webConfigBgColor}`, backgroundClip: "text", WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text" }}>{diamondShape.name}</span>
                <CenterDiamondShape
                  data={DATA.diamondShapeList}
                  value={setDiamondShape}
                  filter={centerDiamond?.sort_code}
                  selectedValue={diamondShape}
                  className={{ mainButton: "py-3 w-full", buttonSelected: "localconfig-selected-value", tooltipData: { height: "25px", width: "25px", scaleStyle: "mx-auto scale-2001" }, imageData: { height: "15px", width: "15px" }, divmargin: "mt-2.5" }}
                />
              </div>

              <div className="border-b border-gray-300 my-3" />
              <div>
                <span className="TCC-config-title">Center Diamond Size: </span>
                <span className="" style={{ background: `${webConfigBgColor}`, backgroundClip: "text", WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text" }}>{diamondSize.value}</span>
                <CenterDiamondSize
                  data={DATA.caratSizeList}
                  value={setDiamondSize}
                  selectedValue={diamondSize}
                  className={{ mainButton: "px-7 py-3 w-full", buttonSelected: "localconfig-selected-value", tooltipData: { height: "25px", width: "25px", scaleStyle: "mx-auto scale-2001" }, imageData: { height: "15px", width: "15px" }, divmargin: "mt-2.5" }}
                />
                <div className="border-b border-gray-300 my-3" />

              </div>
              {centerDiamond?.sort_code == "G" && (
                <div>
                  <span className="TCC-config-title">Diamond Cut: </span>
                  <span className="" style={{ background: `${webConfigBgColor}`, backgroundClip: "text", WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text" }}>{diamondCut?.value}</span>
                  <DiamondCutComponent
                    data={DATA.cutsList}
                    value={setDiamondCut}
                    selectedValue={diamondCut}
                    className={{ mainButton: "px-7 py-3 w-full", buttonSelected: "localconfig-selected-value", tooltipData: { height: "50px", width: "50px" }, imageData: { height: "25px", width: "25px" } }}
                  />
                </div>
              )}

              {centerDiamond?.sort_code != "G" && (
                <>
                  <span className="TCC-config-title">Diamond Quality: </span>
                  <span className="" style={{ background: `${webConfigBgColor}`, backgroundClip: "text", WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text" }}>{diamondQuality.color_name}/{diamondQuality.clarity_name}</span>
                  <DiamondClarityComponent
                    data={centerDiamond.diamond_type == 1 ? finalClarityData.filter((value: any) => value.is_diamond_type == 1
                    ) : finalClarityData.filter((value: any) => value.is_diamond_type == 2
                    )}
                    value={setDiamondQuality}
                    selectedValue={diamondQuality}
                    className={{ mainButton: "px-7 py-3 w-full", buttonSelected: "localconfig-selected-value", tooltipData: { height: "50px", width: "50px" }, imageData: { height: "25px", width: "25px" } }}

                  />
                  <div className="border-b border-gray-300 my-3" />
                </>
              )}
              <div>
                <span className="TCC-config-title">Ring Head: </span>
                <span className="" style={{ background: `${webConfigBgColor}`, backgroundClip: "text", WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text" }}>{ringHead?.name}</span>
                <RingHead
                  data={DATA.headList}
                  value={setRingHead}
                  selectedValue={ringHead}
                  className={{ mainButton: "py-3 w-full", buttonSelected: "localconfig-selected-value", tooltipData: { height: "40px", width: "40px", scaleStyle: "mx-auto scale-150" }, imageData: { height: "25px", width: "25px" }, divmargin: "mt-2.5" }}
                />
              </div>
              <div className="border-b border-gray-300 my-3" />
              <div>
                <span className="TCC-config-title">Ring Shank: </span>
                <span className="" style={{ background: `${webConfigBgColor}`, backgroundClip: "text", WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text" }}>{ringShank.name}</span>
                <RingShank
                  data={DATA.shankList}
                  value={setRingShank}
                  selectedValue={ringShank}
                  className={{ mainButton: "py-3 w-full", buttonSelected: "localconfig-selected-value", tooltipData: { height: "30px", width: "30px", scaleStyle: "mx-auto scale-2001" }, imageData: { height: "20px", width: "20px" }, divmargin: "mt-2.5" }}
                />
              </div>
              <div className="border-b border-gray-300 my-3" />
              <div>
                <span className="TCC-config-title">Ring Side Settings: </span>
                <span className="" style={{ background: `${webConfigBgColor}`, backgroundClip: "text", WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text" }}>{sideSettings.name}</span>
              </div>
              <SideSettings
                data={DATA.sideSettingStyle}
                value={setSideSettings}
                filter={ringShank?.id}
                selectedValue={sideSettings}
                className={{ mainButton: "py-3 w-full", buttonSelected: "localconfig-selected-value", tooltipData: { height: "40px", width: "40px", scaleStyle: "mx-auto scale-150" }, imageData: { height: "20px", width: "20px" }, divmargin: "mt-2.5" }}
              />
              <div className="border-b border-gray-300 my-3" />

              <div>
                <span className="TCC-config-title">Metal: </span>
                <span className="" style={{ background: `${webConfigBgColor}`, backgroundClip: "text", WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text" }}>{MetalData.slug}{" "}{MetalData.metal_name}</span>
                <MetalComponent
                  data={DATA.metalList.filter((value: any) => value.id_metal == 1)}
                  value={setMetalData}
                  selectedValue={MetalData}
                  className={{ mainButton: "px-7 py-3 w-full", buttonSelected: "localconfig-selected-value", tooltipData: { height: "50px", width: "50px" }, imageData: { height: "25px", width: "25px" }, fontStyle: "font-bold" }}
                />
              </div>
              <div className="border-b border-gray-300 my-3" />

              <div>
                <span className="TCC-config-title">Ring Crown Metal: </span>
                <span className="" style={{ background: `${webConfigBgColor}`, backgroundClip: "text", WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text" }}>{ringHeadTone.name}</span>
                <RingCrownColor
                  data={DATA.metalToneList}
                  value={setRingHeadTone}
                  selectedValue={ringHeadTone}
                  className={{ mainButton: "px-7 py-3 w-full", buttonSelected: "localconfig-selected-value", imageData: { height: "25px", width: "25px", scaleStyle: "mx-auto scale-150" }, divmargin: "mt-2.5" }}
                />
                <div className="border-b border-gray-300 my-3" />
              </div>
              <div>
                <span className="TCC-config-title">Ring Style Metal: </span>
                <span className="" style={{ background: `${webConfigBgColor}`, backgroundClip: "text", WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text" }}>{ringShankTone.name}</span>
                <RingStyleColor
                  data={DATA.metalToneList}
                  value={setRingShankTone}
                  selectedValue={ringShankTone}
                  className={{ mainButton: "px-7 py-3 w-full", buttonSelected: "localconfig-selected-value", imageData: { height: "25px", width: "25px", scaleStyle: "mx-auto scale-150" }, divmargin: "mt-2.5" }}

                />
                <div className="border-b border-gray-300 my-3" />
              </div>
              <div>
                <span className="TCC-config-title">Band: </span>
                <span className="" style={{ background: `${webConfigBgColor}`, backgroundClip: "text", WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text" }}>{matchingWeddingBand.name}</span>
                <MatchingWeddingBand
                  data={CONFIG_DATA.matching_wedding_band.component}
                  selectedValue={matchingWeddingBand}
                  value={setMatchingWeddingBand}
                  className={{ mainButton: "px-7 py-3 w-full", buttonSelected: "localconfig-selected-value", tooltipData: { height: "50px", width: "50px", scaleStyle: "mx-auto" }, imageData: { height: "25px", width: "25px" } }}
                />
              </div>

              <div className="border-b border-orange-300 my-3" />
              {
                matchingWeddingBand?.id_metal_tone == 1 && (
                  <>
                    <span className="TCC-config-title ">Band Metal: </span>
                    <span className="" style={{ background: `${webConfigBgColor}`, backgroundClip: "text", WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text" }}>{bandMetalTone.name}</span>
                    <MatchBandMetalTone
                      data={DATA.metalToneList}
                      selectedValue={bandMetalTone}
                      value={setBandMetalTone}
                      className={{ mainButton: "px-7 py-3 w-full", buttonSelected: "localconfig-selected-value", imageData: { height: "25px", width: "25px", scaleStyle: "mx-auto scale-150" }, divmargin: "mt-2.5" }}

                    />
                    <div className="border-b border-orange-300 my-3" />
                  </>
                )}

              {/* Engraving */}
              <div className="mb-5 w-full">
                <span className="TCC-product-text-diamond-shape ">
                  Engraving
                </span>
                <Input
                  name="Engraving"
                  className="w-full mt-1"
                  variant="solid"
                  value={engravingName}
                  onChange={(e: any) => setEngravingName(e.target.value)}
                />
              </div>

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

              {/* Download Option */}
              {/* <div className="mb-5 w-full">
               <span className="TCC-product-text-diamond-shape ">
                 Download Options
               </span>
               <Dropdown
                 className="w-full mt-3"
                 options={[
                   { label: "Current View Snapshot", value: "1" },
                   { label: "All Views", value: "2" },
                   { label: "Current view in all variant", value: "3" },
                   { label: "All views in all variant", value: "4" },
                   { label: "Top view snapshot", value: "5" },
                   { label: "Top view all variant", value: "6" },
                 ]}
                 value={"2"}
               />
             </div> */}

              <div className="mb-5 w-full">
                <CheckBox
                  labelKey="Transparent Background"
                  onChange={handleBGChange}
                />
              </div>

              {/*  Download Button  */}
              <div className="flex felx-cols mb-12 mb- items-center">
                <Button
                  variant="slim"
                  style={{ background: webConfigBgColor }}
                  className={`w-1/3 md:w-1/3 rounded hover:bg-[#DBB961] mb-16 lg:mb-0`}
                  onClick={handleDownloadImage}
                >
                  <span className="py-2 3xl:px-8">Download</span>
                </Button>
                <Button
                  variant="slim"
                  style={{ background: webConfigBgColor }}
                  className={`w-1/3 ml-[7px] md:w-1/3 rounded hover:bg-[#DBB961] mb-16 lg:mb-0`}
                  onClick={addCartProducthandler}
                >
                  <span className="py-2 3xl:px-8">Add To Cart</span>
                </Button>
              </div>
            </div>
          </div>
        </div >
      )}
    </>
  );
};

export default Product3DRenderPricing;
