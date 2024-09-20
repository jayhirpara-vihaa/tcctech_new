import React, { useEffect, useState } from "react";

import Button from "@components/ui/button";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Input from "@components/ui/input";

import { CURRENCY } from "@utils/constants";
import CONFIG_DATA from "../../../public/api/configrator.json";
import CenterDiamondShape from "@components/configrator/center-diamond-shape";
import CenterDiamondSize from "@components/configrator/center-diamond-size";
import RingCrownColor from "@components/configrator/ring-crown-color";
import RingStyleColor from "@components/configrator/ring-style-color";
import CenterGemstone from "@components/configrator/center-gemstone";
import RingHead from "@components/configrator/ring-head";
import SideSettings from "@components/configrator/side-setting";
import RingShank from "@components/configrator/ring-shank";
import CenterDiamond from "@components/configrator/center-diamond";
import ReactStars from "react-rating-stars-component";

import FallbackSpinner from "@components/spinner";
import { CheckBox } from "@components/ui/checkbox";
import { useWindowSize } from "@utils/use-window-size";
import { useSsrCompatible } from "@utils/use-ssr-compatible";
import { MdOutline360, MdOutlineZoomOutMap } from "react-icons/md";
import { AiOutlineDownload } from "react-icons/ai";
import {
  ViewerApp,
  AssetManagerPlugin,
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
import MetalComponent from "@components/configrator/metal-component";
import { useConfiguratorProductPriceQuery } from "@framework/price-module-api/priceModuleApi";

const DemoProduct3DRender: React.FC<{ configData: any }> = (props) => {
  const DATA = props.configData;

  const [centerDiamond, setCenterDiamond] = useState<any>();
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
  const [ringImages, setRingImages] = useState<any[]>([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [centerGemstone, setCenterGemstone] = useState<any>();

  const [viewer, setViewer] = useState<any>();
  const [isBgChecked, setIsBgChecked] = useState<boolean>(false);
  const [canvasWidth, setCanvasWidth] = useState<number>(900);
  const [canvasHeight, setCanvasHeight] = useState<number>(550);
  const [is360Running, setIs360Running] = useState<boolean>(false);
  const [imageDownLoadIndex, setImageDownLoadIndex] = useState<string>("1");
  const [engravingName, setEngravingName] = useState<string>("The Cadco Co.");
  const { height, width } = useSsrCompatible(useWindowSize(), {
    width: 0,
    height: 0,
  });
  const [productPriceValue, setProductPriceValue] = useState();
  const [selectedValue, setSelectedValue] = useState({
    CenterDiamondId: 1,
    CentreDiamondShapeId: 1,
    CentreDiamondSizeID: 2,
    GemStoneId: 1,
    RingHeadID: 1,
    RingShankID: 1,
    SideSettingID: 1,
    MetalComponentID: 1,
    RingCrownMetalID: 2,
    RingStyleMetalID: 2,
    RingBandStyleID: 1,
  });

  const [selectedPriceValue, setSelectedPriceValue] = useState({
    center_stone: 20,
    center_stone_shape: 113,
    center_stone_mm_size: 5,
    center_stone_color: 10,
    center_stone_clarity: 13,
    center_stone_cut: 7,
    head: 21,
    shank: 20,
    side_setting: 1,
    center_stone_size: 0.5,
    metal: 1,
    karat: 40,
  });

  const { data: configPriceData } =
    useConfiguratorProductPriceQuery(selectedPriceValue);

  useEffect(() => {
    selectedPriceValue.center_stone = centerDiamond && centerDiamond.id;
    selectedPriceValue.center_stone_shape = diamondShape && diamondShape.id;
    selectedPriceValue.center_stone_mm_size = 5;
    selectedPriceValue.center_stone_color = 10;
    selectedPriceValue.center_stone_clarity = 13;
    selectedPriceValue.center_stone_cut = 7;
    selectedPriceValue.head = ringHead && ringHead.id;
    selectedPriceValue.shank = ringShank && ringShank.id;
    selectedPriceValue.side_setting = sideSettings && sideSettings.id;
    selectedPriceValue.center_stone_size =
      diamondSize && parseFloat(diamondSize.value);
    selectedPriceValue.karat = MetalData && MetalData.id;
  }, [
    centerDiamond,
    diamondShape,
    ringHead,
    ringShank,
    sideSettings,
    diamondSize,
    MetalData,
  ]);

  useEffect(() => {
    setProductPriceValue(configPriceData?.data);
  }, [configPriceData]);

  const arrDesignNumbers = [
    { key: "19662", value: "HD-HH-EM-100_-_V23dm" },
    { key: "19801", value: "HD-HH-EM-100_-_V33dm" },
    { key: "15467", value: "HD-HH-EM-1003dm" },
    { key: "16312", value: "HD-HH-EM-200_-_V23dm" },
    { key: "15469", value: "HD-HH-EM-2003dm" },
    { key: "19661", value: "HD-HH-OV-100_-_V23dm" },
    { key: "19800", value: "HD-HH-OV-100_-_V33dm" },
    { key: "15460", value: "HD-HH-OV-1003dm" },
    { key: "15462", value: "HD-HH-OV-2003dm" },
    { key: "16308", value: "HD-HH-RD-100_-_V23dm" },
    { key: "19648", value: "HD-HH-RD-1003dm" },
    { key: "15455", value: "HD-HH-RD-2003dm" },
    { key: "15502", value: "HD-SH-EM-1003dm" },
    { key: "15504", value: "HD-SH-EM-2003dm" },
    { key: "16321", value: "HD-SH-OV-100_-_V23dm" },
    { key: "15495", value: "HD-SH-OV-1003dm" },
    { key: "15497", value: "HD-SH-OV-2003dm" },
    { key: "15488", value: "HD-SH-RD-1003dm" },
    { key: "15490", value: "HD-SH-RD-2003dm" },
    { key: "15555", value: "SH-CA-PL-V13dm" },
    { key: "15558", value: "SH-CA-PL-V23dm" },
    { key: "15554", value: "SH-CA-PL-V33dm" },
    { key: "15560", value: "SH-CA-PL-V43dm" },
    { key: "15572", value: "SH-CA-PL-V53dm" },
    { key: "15571", value: "SH-CA-PL-V63dm" },
    { key: "15566", value: "SH-CA-PL-V73dm" },
    { key: "15567", value: "SH-CA-PL-V83dm" },
    { key: "15565", value: "SH-CA-PL-V93dm" },
    { key: "15681", value: "SH-CA-UM-V13dm" },
    { key: "15684", value: "SH-CA-UM-V23dm" },
    { key: "15680", value: "SH-CA-UM-V33dm" },
    { key: "15686", value: "SH-CA-UM-V43dm" },
    { key: "15698", value: "SH-CA-UM-V53dm" },
    { key: "15697", value: "SH-CA-UM-V63dm" },
    { key: "15692", value: "SH-CA-UM-V73dm" },
    { key: "15693", value: "SH-CA-UM-V83dm" },
    { key: "15691", value: "SH-CA-UM-V93dm" },
    { key: "16300", value: "SH-PL-PL-V13dm" },
    { key: "16298", value: "SH-PL-PL-V23dm" },
    { key: "16301", value: "SH-PL-PL-V33dm" },
    { key: "16426", value: "SH-PL-UM-V13dm" },
    { key: "16427", value: "SH-PL-UM-V23dm" },
    { key: "16424", value: "SH-PL-UM-V33dm" },
    { key: "17263", value: "SH-TW-PL-V103dm" },
    { key: "17243", value: "SH-TW-PL-V113dm" },
    { key: "17230", value: "SH-TW-PL-V13dm" },
    { key: "17237", value: "SH-TW-PL-V23dm" },
    { key: "17231", value: "SH-TW-PL-V33dm" },
    { key: "17249", value: "SH-TW-PL-V43dm" },
    { key: "17232", value: "SH-TW-PL-V53dm" },
    { key: "17258", value: "SH-TW-PL-V63dm" },
    { key: "17255", value: "SH-TW-PL-V73dm" },
    { key: "17248", value: "SH-TW-PL-V83dm" },
    { key: "17246", value: "SH-TW-PL-V93dm" },
    { key: "17347", value: "SH-TW-UM-V103dm" },
    { key: "17327", value: "SH-TW-UM-V113dm" },
    { key: "17314", value: "SH-TW-UM-V13dm" },
    { key: "17321", value: "SH-TW-UM-V23dm" },
    { key: "17315", value: "SH-TW-UM-V33dm" },
    { key: "17333", value: "SH-TW-UM-V43dm" },
    { key: "17316", value: "SH-TW-UM-V53dm" },
    { key: "17342", value: "SH-TW-UM-V63dm" },
    { key: "17339", value: "SH-TW-UM-V73dm" },
    { key: "17332", value: "SH-TW-UM-V83dm" },
    { key: "17330", value: "SH-TW-UM-V93dm" },
  ];

  const arrHeadNumbers = [
    { key: "HH-RD-100-PL-PL", value: "15453" },
    { key: "HH-RD-200-PL-PL", value: "15455" },
    { key: "HH-OV-100-PL-PL", value: "15460" },
    { key: "HH-OV-200-PL-PL", value: "15462" },
    { key: "HH-EM-100-PL-PL", value: "15467" },
    { key: "HH-EM-200-PL-PL", value: "15469" },
    { key: "HH-RD-100-PL-UM", value: "15453" },
    { key: "HH-RD-200-PL-UM", value: "15455" },
    { key: "HH-OV-100-PL-UM", value: "15460" },
    { key: "HH-OV-200-PL-UM", value: "15462" },
    { key: "HH-EM-100-PL-UM", value: "15467" },
    { key: "HH-EM-200-PL-UM", value: "15469" },
    { key: "SH-RD-100-PL-PL", value: "15488" },
    { key: "SH-RD-200-PL-PL", value: "15490" },
    { key: "SH-OV-100-PL-PL", value: "15495" },
    { key: "SH-OV-200-PL-PL", value: "15497" },
    { key: "SH-EM-100-PL-PL", value: "15502" },
    { key: "SH-EM-200-PL-PL", value: "15504" },
    { key: "SH-RD-100-PL-UM", value: "15488" },
    { key: "SH-RD-200-PL-UM", value: "15490" },
    { key: "SH-OV-100-PL-UM", value: "15495" },
    { key: "SH-OV-200-PL-UM", value: "15497" },
    { key: "SH-EM-100-PL-UM", value: "15502" },
    { key: "SH-EM-200-PL-UM", value: "15504" },
    { key: "HH-RD-100-CA-PL", value: "19648" },
    { key: "HH-RD-200-CA-PL", value: "15455" },
    { key: "HH-OV-100-CA-PL", value: "19661" },
    { key: "HH-OV-200-CA-PL", value: "15462" },
    { key: "HH-EM-100-CA-PL", value: "19662" },
    { key: "HH-EM-200-CA-PL", value: "15469" },
    { key: "HH-RD-100-CA-UM", value: "19648" },
    { key: "HH-RD-200-CA-UM", value: "15455" },
    { key: "HH-OV-100-CA-UM", value: "19661" },
    { key: "HH-OV-200-CA-UM", value: "15462" },
    { key: "HH-EM-100-CA-UM", value: "19662" },
    { key: "HH-EM-200-CA-UM", value: "15469" },
    { key: "SH-RD-100-CA-PL", value: "15488" },
    { key: "SH-RD-200-CA-PL", value: "15490" },
    { key: "SH-OV-100-CA-PL", value: "15495" },
    { key: "SH-OV-200-CA-PL", value: "15497" },
    { key: "SH-EM-100-CA-PL", value: "15502" },
    { key: "SH-EM-200-CA-PL", value: "15504" },
    { key: "SH-RD-100-CA-UM", value: "15488" },
    { key: "SH-RD-200-CA-UM", value: "15490" },
    { key: "SH-OV-100-CA-UM", value: "15495" },
    { key: "SH-OV-200-CA-UM", value: "15497" },
    { key: "SH-EM-100-CA-UM", value: "15502" },
    { key: "SH-EM-200-CA-UM", value: "15504" },
    { key: "HH-RD-100-TW-PL", value: "19648" },
    { key: "HH-RD-200-TW-PL", value: "15455" },
    { key: "HH-OV-100-TW-PL", value: "19800" },
    { key: "HH-OV-200-TW-PL", value: "16308" },
    { key: "HH-EM-100-TW-PL", value: "19801" },
    { key: "HH-EM-200-TW-PL", value: "16312" },
    { key: "HH-RD-100-TW-UM", value: "19648" },
    { key: "HH-RD-200-TW-UM", value: "15455" },
    { key: "HH-OV-100-TW-UM", value: "19800" },
    { key: "HH-OV-200-TW-UM", value: "16308" },
    { key: "HH-EM-100-TW-UM", value: "19801" },
    { key: "HH-EM-200-TW-UM", value: "16312" },
    { key: "SH-RD-100-TW-PL", value: "15488" },
    { key: "SH-RD-200-TW-PL", value: "15490" },
    { key: "SH-OV-100-TW-PL", value: "16321" },
    { key: "SH-OV-200-TW-PL", value: "15497" },
    { key: "SH-EM-100-TW-PL", value: "15502" },
    { key: "SH-EM-200-TW-PL", value: "15504" },
    { key: "SH-RD-100-TW-UM", value: "15488" },
    { key: "SH-RD-200-TW-UM", value: "15490" },
    { key: "SH-OV-100-TW-UM", value: "16321" },
    { key: "SH-OV-200-TW-UM", value: "15497" },
    { key: "SH-EM-100-TW-UM", value: "15502" },
    { key: "SH-EM-200-TW-UM", value: "15504" },
  ];

  const arrShankNumbers = [
    { key: "HH-RD-100-PL-PL", value: "16300" },
    { key: "HH-RD-200-PL-PL", value: "16298" },
    { key: "HH-OV-100-PL-PL", value: "16300" },
    { key: "HH-OV-200-PL-PL", value: "16301" },
    { key: "HH-EM-100-PL-PL", value: "16300" },
    { key: "HH-EM-200-PL-PL", value: "16301" },
    { key: "HH-RD-100-PL-UM", value: "16426" },
    { key: "HH-RD-200-PL-UM", value: "16424" },
    { key: "HH-OV-100-PL-UM", value: "16426" },
    { key: "HH-OV-200-PL-UM", value: "16427" },
    { key: "HH-EM-100-PL-UM", value: "16426" },
    { key: "HH-EM-200-PL-UM", value: "16427" },
    { key: "SH-RD-100-PL-PL", value: "16300" },
    { key: "SH-RD-200-PL-PL", value: "16298" },
    { key: "SH-OV-100-PL-PL", value: "16300" },
    { key: "SH-OV-200-PL-PL", value: "16300" },
    { key: "SH-EM-100-PL-PL", value: "16300" },
    { key: "SH-EM-200-PL-PL", value: "16300" },
    { key: "SH-RD-100-PL-UM", value: "16426" },
    { key: "SH-RD-200-PL-UM", value: "16424" },
    { key: "SH-OV-100-PL-UM", value: "16426" },
    { key: "SH-OV-200-PL-UM", value: "16426" },
    { key: "SH-EM-100-PL-UM", value: "16426" },
    { key: "SH-EM-200-PL-UM", value: "16426" },
    { key: "HH-RD-100-CA-PL", value: "15555" },
    { key: "HH-RD-200-CA-PL", value: "15558" },
    { key: "HH-OV-100-CA-PL", value: "15554" },
    { key: "HH-OV-200-CA-PL", value: "15560" },
    { key: "HH-EM-100-CA-PL", value: "15554" },
    { key: "HH-EM-200-CA-PL", value: "15560" },
    { key: "HH-RD-100-CA-UM", value: "15681" },
    { key: "HH-RD-200-CA-UM", value: "15684" },
    { key: "HH-OV-100-CA-UM", value: "15680" },
    { key: "HH-OV-200-CA-UM", value: "15686" },
    { key: "HH-EM-100-CA-UM", value: "15680" },
    { key: "HH-EM-200-CA-UM", value: "15686" },
    { key: "SH-RD-100-CA-PL", value: "15572" },
    { key: "SH-RD-200-CA-PL", value: "15571" },
    { key: "SH-OV-100-CA-PL", value: "15572" },
    { key: "SH-OV-200-CA-PL", value: "15566" },
    { key: "SH-EM-100-CA-PL", value: "15567" },
    { key: "SH-EM-200-CA-PL", value: "15565" },
    { key: "SH-RD-100-CA-UM", value: "15698" },
    { key: "SH-RD-200-CA-UM", value: "15697" },
    { key: "SH-OV-100-CA-UM", value: "15698" },
    { key: "SH-OV-200-CA-UM", value: "15692" },
    { key: "SH-EM-100-CA-UM", value: "15693" },
    { key: "SH-EM-200-CA-UM", value: "15691" },
    { key: "HH-RD-100-TW-PL", value: "17230" },
    { key: "HH-RD-200-TW-PL", value: "17237" },
    { key: "HH-OV-100-TW-PL", value: "17231" },
    { key: "HH-OV-200-TW-PL", value: "17249" },
    { key: "HH-EM-100-TW-PL", value: "17231" },
    { key: "HH-EM-200-TW-PL", value: "17232" },
    { key: "HH-RD-100-TW-UM", value: "17314" },
    { key: "HH-RD-200-TW-UM", value: "17321" },
    { key: "HH-OV-100-TW-UM", value: "17315" },
    { key: "HH-OV-200-TW-UM", value: "17333" },
    { key: "HH-EM-100-TW-UM", value: "17315" },
    { key: "HH-EM-200-TW-UM", value: "17316" },
    { key: "SH-RD-100-TW-PL", value: "17258" },
    { key: "SH-RD-200-TW-PL", value: "17255" },
    { key: "SH-OV-100-TW-PL", value: "17248" },
    { key: "SH-OV-200-TW-PL", value: "17246" },
    { key: "SH-EM-100-TW-PL", value: "17263" },
    { key: "SH-EM-200-TW-PL", value: "17243" },
    { key: "SH-RD-100-TW-UM", value: "17342" },
    { key: "SH-RD-200-TW-UM", value: "17339" },
    { key: "SH-OV-100-TW-UM", value: "17332" },
    { key: "SH-OV-200-TW-UM", value: "17330" },
    { key: "SH-EM-100-TW-UM", value: "17347" },
    { key: "SH-EM-200-TW-UM", value: "17327" },
  ];

  useEffect(() => {
    const centerDiamondId = CONFIG_DATA.center_diamond.component.filter(
      (t) => t.id === selectedValue.CenterDiamondId
    );

    setCenterDiamond(centerDiamondId.length !== 0 && centerDiamondId[0]);

    const centreDiamondShapeId =
      DATA.diamondShapeList.length !== 0 &&
      DATA.diamondShapeList.filter(
        (t: any) => t.id === selectedValue.CentreDiamondShapeId
      );
    setDiamondShape(
      centreDiamondShapeId.length !== 0 && centreDiamondShapeId[0]
    );

    const centreDiamondSizeID =
      DATA &&
      DATA.caratSizeList.filter(
        (t: any) => t.id === selectedValue.CentreDiamondSizeID
      );
    setDiamondSize(centreDiamondSizeID.length !== 0 && centreDiamondSizeID[0]);

    const gemstoneId = CONFIG_DATA.center_Gemstone.component.filter(
      (t) => t.id === selectedValue.GemStoneId
    );
    setCenterGemstone(gemstoneId.length !== 0 && gemstoneId[0]);

    const ringHeadID =
      DATA &&
      DATA.headList.filter((t: any) => t.id === selectedValue.RingHeadID);
    setRingHead(ringHeadID.length !== 0 && ringHeadID[0]);

    const ringShankID =
      DATA &&
      DATA.shankList.filter((t: any) => t.id === selectedValue.RingShankID);
    setRingShank(ringShankID.length !== 0 && ringShankID[0]);

    const sideSettingID =
      DATA &&
      DATA.sideSettingStyle.filter(
        (t: any) => t.id === selectedValue.SideSettingID
      );
    setSideSettings(sideSettingID.length !== 0 && sideSettingID[0]);

    const metalComponentID = CONFIG_DATA.metal.component.filter(
      (t: any) => t.id === selectedValue.MetalComponentID
    );
    setMetalData(metalComponentID.length !== 0 && metalComponentID[0]);

    const ringCrownMetalID = CONFIG_DATA.ring_head_metal_tone.component.filter(
      (t: any) => t.id === selectedValue.RingCrownMetalID
    );
    setRingHeadTone(ringCrownMetalID.length !== 0 && ringCrownMetalID[0]);

    const ringStyleMetalID = CONFIG_DATA.ring_shank_metal_tone.component.filter(
      (t: any) => t.id === selectedValue.RingStyleMetalID
    );
    setRingShankTone(ringStyleMetalID.length !== 0 && ringStyleMetalID[0]);

    const RingBandStyleID = CONFIG_DATA.matching_wedding_band.component.filter(
      (t: any) => t.id === selectedValue.RingBandStyleID
    );
    setMatchingWeddingBand(RingBandStyleID.length !== 0 && RingBandStyleID[0]);
  }, []);

  async function setupViewer() {
    // Initialize the viewer
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
    const manager = await viewer.addPlugin(AssetManagerPlugin);
    // or use this to add all main ones at once.
    await addBasePlugins(viewer);

    // Add more plugins not available in base, like CanvasSnipperPlugin which has helpers to download an image of the canvas.
    //await viewer.addPlugin(AssetManagerBasicPopupPlugin);
    await viewer.addPlugin(CanvasSnipperPlugin);
    await viewer.addPlugin(MaterialConfiguratorPlugin);
    await viewer.addPlugin(FileTransferPlugin); //
    await viewer.addPlugin(CanvasRecorderPlugin); //
    await viewer.addPlugin(PopmotionPlugin); //
    await viewer.addPlugin(SimpleTextPlugin); //

    viewer.renderer.refreshPipeline();

    // This must be called once after all plugins are added.
    const options = { autoScale: true, autoCenter: true, useRgbm: true };
    viewer.enable = false;
    viewer.renderEnabled = false;
    await manager.addFromPath("/assets/scene_1006.glb", options);

    await manager.addFromPath("/assets/GLB-07.vjson");

    await manager.addFromPath("/assets/preset.CameraViews.json");

    refreshUI();
  };

  useEffect(() => {
    if (viewer) {
      setViewerControls();
    }
  }, [viewer]);

  const refreshUI = async () => {
    //const { DiamondPlugin } = await import("webgi");
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

      let headMaterial = rgMaterial;
      if (ringHeadTone && ringHeadTone.sort_code == "YG") {
        headMaterial = ygMaterial;
      } else if (ringHeadTone && ringHeadTone.sort_code == "WG") {
        headMaterial = wgMaterial;
      }

      let shankMaterial = rgMaterial;
      if (ringShankTone && ringShankTone.sort_code == "YG") {
        shankMaterial = ygMaterial;
      } else if (ringShankTone && ringShankTone.sort_code == "WG") {
        shankMaterial = wgMaterial;
      }

      //Head FIle Name
      let headName = "";
      if (ringHead) {
        headName = headName + ringHead.sort_code;
      }

      if (diamondShape) {
        headName = headName + "-" + diamondShape.sort_code;
      }

      if (diamondSize) {
        headName = headName + "-" + diamondSize.sort_code;
      }

      let shankName = "";
      if (ringShank) {
        shankName = shankName + ringShank.sort_code;
      }

      if (sideSettings) {
        shankName = shankName + "-" + sideSettings.sort_code;
      }
      const finalName = headName + "-" + shankName;

      const findHeadDesign = arrHeadNumbers.filter((t) => t.key == finalName);
      const finalShankDesign = arrShankNumbers.filter(
        (t) => t.key == finalName
      );
      let finalHeadName = "";
      if (findHeadDesign.length > 0) {
        const arrHeadDesignNumber = arrDesignNumbers.filter(
          (t) => t.key == findHeadDesign[0].value
        );
        if (arrHeadDesignNumber.length > 0)
          finalHeadName = arrHeadDesignNumber[0].value;
      }

      let finalShankName = "";
      if (finalShankDesign.length > 0) {
        const arrShankDesignNumber = arrDesignNumbers.filter(
          (t) => t.key == finalShankDesign[0].value
        );
        if (arrShankDesignNumber.length > 0)
          finalShankName = arrShankDesignNumber[0].value;
      }

      viewer.scene.traverse(async function (child: any) {
        //Head Metal
        if (child.name.includes("Metal02")) {
          child.material = headMaterial; //apply same material to all meshes
        }

        //SHank Metal
        if (child.name.includes("Metal01")) {
          child.material = shankMaterial; //apply same material to all meshes
        }

        const extension = ".dmat";

        if (child.name.includes("Gem")) {
          let dmatName = "OV-";
          let smallDmatName = "WT-" + "RD-" + "DIAMOND" + extension;
          let cacheKey = "";

          if (child.name.includes("Diamond_Oval")) {
            dmatName = "OV-";
            cacheKey = "Diamond_Oval";
          }

          if (child.name.includes("CS_Diamond_Round")) {
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

          const diamondMaterial = await viewer
            .getManager()
            .importer.importSinglePath("/assets/Dmat/" + dmatName);
          //console.log("child.name", child.name)
          if (
            child.name.includes("Diamond_Oval") ||
            child.name.includes("CS_Diamond_Round") ||
            child.name.includes("Diamond_Emerald")
          ) {
            viewer.getPlugin(DiamondPlugin).prepareDiamondMesh(child, {
              cacheKey: cacheKey,
              normalMapRes: 512,
            });
            child.material = diamondMaterial;
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
          //console.log("child", child.name)
          if (
            child.modelObject.name.includes(finalHeadName) ||
            child.modelObject.name.includes(finalShankName) ||
            child.modelObject.name.includes("UV_1")
          ) {
            child.visible = true;
          } else {
            child.visible = false;
          }
        }
      });
      viewer.enable = true;
      viewer.renderEnabled = true;
      viewer.scene.setDirty({ sceneUpdate: true });
    }
  };

  useEffect(() => {
    refreshUI();
  }, [
    diamondShape,
    ringShank,
    ringHeadTone,
    ringShankTone,
    centerDiamond,
    centerGemstone,
    CenterDiamondShape,
    ringHead,
    diamondSize,
    sideSettings,
  ]);

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

  const handleFullScreen = async () => {
    const canvas = document.getElementById("webgi-canvas") as HTMLCanvasElement;
    viewer.getPlugin(FullScreenPlugin).toggle(canvas.parentElement);
  };

  const handleCameraViews = async (event: any) => {
    viewer.scene.modelRoot.rotation.z = 0;
    viewer.scene.modelRoot.rotation.x = 0;

    const camViews = viewer.getPlugin(CameraViewPlugin);
    await camViews.animateToView(camViews.camViews[parseInt(event.value)]);
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

    //const { SimpleTextPlugin } = await import("webgi");

    //const text = await viewer.addPlugin(SimpleTextPlugin);
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
        <div className="block lg:grid grid-cols-3 gap-x-10 TCC-main-component w-100">
          <div
            className={`col-span-2 grid grid-cols-1 TCC-image-component relative`}
          >
            <canvas id="webgi-canvas" style={{ height: height - 120 }}></canvas>
            <div className="floating-buttons topright">
              <Button
                className="rounded"
                id="enter-fullscreen"
                onClick={handleFullScreen}
              >
                <span>
                  <MdOutlineZoomOutMap height="30" width="30" />
                </span>
              </Button>
            </div>
            <div className="floating-buttons bottomcenter">
              {/* <Button onClick={handleCameraViews}>
               <span className="mr-2">
               <FaEye height="30" width="30" /></span> 
               Views

             </Button> */}

              <Button className="rounded" onClick={handle360Image}>
                <span className="mr-2">
                  <MdOutline360 height="30" width="30" />
                </span>{" "}
                <span>360</span>
              </Button>
              <Button
                variant="slim"
                className={`w-1/3 md:w-1/3 rounded bg-[#DBB961] hover:bg-[#DBB961]`}
                onClick={handleVideoDownload}
              >
                <span className="mr-2">
                  <AiOutlineDownload height="30" width="30" />
                </span>
                <span className="py-2 3xl:px-8">Download Video</span>
              </Button>
              <Dropdown
                className={`w-1/3 md:w-1/3 rounded bg-[#DBB961] hover:bg-[#DBB961]`}
                options={[
                  { label: "Top View", value: "2" },
                  { label: "Right View", value: "3" },
                  { label: "Front View", value: "0" },
                  { label: "Perspective View", value: "1" },
                ]}
                value={"3"}
                onChange={(e: any) => {
                  handleCameraViews(e);
                }}
              />

              <Button
                variant="slim"
                className={`w-1/3 md:w-1/3 rounded bg-[#DBB961] hover:bg-[#DBB961]`}
                onClick={handleDownloadImage}
              >
                <span className="mr-2">
                  <AiOutlineDownload height="30" width="30" />
                </span>
                <span className="py-2 3xl:px-8">Download</span>
              </Button>
            </div>
          </div>

          <div className="col-span-1 TCC-dis-component ps-3">
            <div className="pb-7 tcc-mobile-margin">
              <div className="flex">
                <h2 className="text-black mb-3.5 TCC-product-detail-heading pt-3">
                  {configPriceData !== null &&
                    configPriceData?.data?.product_title}{" "}
                  <small className="flex w-100 text-heading">
                    {configPriceData !== null && configPriceData?.data?.sku}
                  </small>
                </h2>
              </div>

              {/* {/ Discription /} */}
              <p className="text-body TCC-product-detail-discription w-2/3">
                {configPriceData !== null &&
                  configPriceData?.data?.product_sort_des}
              </p>
              {/* <div className="flex grid-cols-4">
                <span className="flex flex-col">
                  <ReactStars
                    count={5}
                    size={25}
                    value={4.5}
                    color="#c6c6c6"
                    activeColor="#DBB961"
                    isHalf={true}
                    edit={false}
                  />
                </span>
                <span className="flex flex-col ml-2"> ({107} Reviews)</span>
              </div> */}

              <div className="flex items-center mt-5">
                <div className="text-heading font-bold text-base md:text-xl lg:text-2xl 2xl:text-4xl pe-2 md:pe-0 lg:pe-2 2xl:pe-0">
                  <span className="TCC-product-configurator-price">
                    {CURRENCY} {configPriceData !== null &&
                      configPriceData?.data?.product_total_price}
                  </span>
                </div>
              </div>
            </div>
            <div
              className="lg:config-filter-content lg:overflow-x-hidden lg:overflow-y-auto lg:mh-50 ml pe-5"
              style={{ height: height - 297 }}
            >
              {/* Config Component */}
              <CenterDiamond
                data={CONFIG_DATA.center_diamond}
                value={setCenterDiamond}
                selectedValue={centerDiamond}
              />
              <div className="border-b border-gray-300 my-3" />
              {centerDiamond?.sort_code == "G" && (
                <>
                  <CenterGemstone
                    data={DATA.gemstoneList}
                    value={setCenterGemstone}
                    filter={centerDiamond?.sort_code}
                    selectedValue={diamondShape}
                  />
                  <div className="border-b border-gray-300 my-3" />
                </>
              )}
              <CenterDiamondShape
                data={DATA.diamondShapeList}
                value={setDiamondShape}
                filter={centerDiamond?.sort_code}
                selectedValue={diamondShape}
              />
              <div className="border-b border-gray-300 my-3" />
              <CenterDiamondSize
                data={DATA.caratSizeList}
                value={setDiamondSize}
                selectedValue={diamondSize}
              />
              <div className="border-b border-gray-300 my-3" />
              <RingHead
                data={DATA.headList}
                value={setRingHead}
                selectedValue={ringHead}
              />
              <div className="border-b border-gray-300 my-3" />

              <RingShank
                data={DATA.shankList}
                value={setRingShank}
                selectedValue={ringShank}
              />
              <div className="border-b border-gray-300 my-3" />

              <SideSettings
                data={DATA.sideSettingStyle}
                value={setSideSettings}
                filter={ringShank?.id}
                selectedValue={sideSettings}
              />
              <div className="border-b border-gray-300 my-3" />

              <MetalComponent
                data={DATA.metalList}
                value={setMetalData}
                selectedValue={MetalData}
              />
              <div className="border-b border-gray-300 my-3" />
              {MetalData?.is_karat == 1 && (
                <>
                  <RingCrownColor
                    data={DATA.metalToneList}
                    value={setRingHeadTone}
                    selectedValue={ringHeadTone}
                  />
                  <div className="border-b border-gray-300 my-3" />
                </>
              )}
              {MetalData?.is_karat == 1 && (
                <>
                  <RingStyleColor
                    data={DATA.metalToneList}
                    value={setRingShankTone}
                    selectedValue={ringShankTone}
                  />
                  <div className="border-b border-gray-300 my-3" />
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
                  className={`w-1/3 md:w-1/3 rounded bg-[#DBB961] hover:bg-[#DBB961] mb-16 lg:mb-0`}
                  onClick={handleDownloadImage}
                >
                  <span className="py-2 3xl:px-8">Download</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DemoProduct3DRender;
