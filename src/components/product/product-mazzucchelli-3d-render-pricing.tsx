import React, { useContext, useEffect, useMemo, useRef, useState } from "react";

import Button from "@components/ui/button";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Input from "@components/ui/input";

import { CURRENCY } from "@utils/constants";
import CONFIG_DATA from "../../../public/api/configrator-3d.json";
import MAZZDATA from "../../../public/api/mazz-3d.json";
//import DATA from "../../../public/api/configrator-3d.json";
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
import { MdOutline360, MdOutlineZoomOutMap } from "react-icons/md";
import {
  AiOutlineDownload,
  AiOutlineInfoCircle,
  AiOutlineVideoCamera,
} from "react-icons/ai";
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
import Cookies from "js-cookie";
import { CompanyInfoContext } from "@contexts/company_info/company_info";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import DiamondCenterComponent from "@components/configrator/diamond-center";
import DiamondCutComponent from "@components/configrator/diamond-cut";
import GemstoneTypeComponent from "@components/configrator/gemstone-type";
import { useShopifyAddCartMutation } from "@framework/config-product-api/shopify-add-cart-api";
import { Collapse } from "@components/common/accordioncommon";

const Product3DRenderPricing: React.FC<{ configData: any }> = (props) => {
  const DATA = props.configData;

  const imageUrl = process.env.NEXT_PUBLIC_IMG_URL + "configurator/static/";
  const [centerDiamondList, setCenterDiamondList] = useState<any[]>();
  const [gemstoneList, setGemstoneList] = useState<any[]>();
  const [centerDiamond, setCenterDiamond] = useState<any>();
  const [centerDiamondData, setCenterDiamondData] = useState<any>();
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
  const [gemstoneType, setGemstoneType] = useState<any>();
  const [expanded, setExapanded] = useState<any>();
  const [viewer, setViewer] = useState<any>();
  const [isBgChecked, setIsBgChecked] = useState<boolean>(false);
  const [finalClarityData, setFinalClarityData] = useState<any>();
  const [is360Running, setIs360Running] = useState<boolean>(false);
  const [imageDownLoadIndex, setImageDownLoadIndex] = useState<string>("1");
  const [engravingName, setEngravingName] = useState<string>("");
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
  const [engravingNameCart, setEngravingNameCart] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<any>("");
  const { data: addCartData, mutate: shopifyAddTocart } =
    useShopifyAddCartMutation();
  const [diamondSizeList, setDiamondSizeList] = useState<any>(
    DATA?.caratSizeList
  );
  const [diamondShapeList, setDiamondShapeList] = useState<any>(
    DATA?.diamondShapeList
  );
  const [sideSettingList, setSideSettingList] = useState<any>(
    DATA?.sideSettingStyle
  );
  const [diamondClarityList, setDiamondClarityList] = useState<any>(
    DATA?.colorClarityList
  );

  const [selectedValue, setSelectedValue] = useState({
    // CenterDiamondId: 1,
    // DiamondShapeId: 80,
    // CentreDiamondShapeId: 80,
    // CentreDiamondSizeID: 2,
    // GemStoneId: 1,
    // RingHeadID: 28,
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
    // CutId: 9,
    // GemstoneTypeId: 1,
  });

  const diamondFilterData =
    DATA &&
    DATA?.gemstoneList &&
    DATA?.gemstoneList.length != 0 &&
    DATA?.gemstoneList.filter((t: any) => t.is_diamond == 1);
  const colorClarityData =
    DATA && DATA?.colorClarityList
      ? DATA?.colorClarityList.map((value: any, index: any) => ({
          ...value,
          id: index + 1,
        }))
      : [];

  // **** Certify Data
  useEffect(() => {
    const array: any = [];
    if (colorClarityData) {
      for (const list of colorClarityData) {
        if (list.color_name == "G" && list.clarity_name == "VS") {
          array.push({ ...list, certify: "GIA Premium Certified" });
        } else if (list.color_name == "H" && list.clarity_name == "SI") {
          array.push({ ...list, certify: "IGI Certified" });
        } else {
          array.push({ ...list, certify: " " });
        }
      }
    }
    setFinalClarityData(array);
  }, [DATA?.colorClarityList]);

  const dropdownRef = useRef(null);

  const handleDropdownToggle1 = () => {
    setIsViewOpen((prev) => !prev);
  };

  const handleDropdownToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  const { updateCartTotalItems } = useContext(CompanyInfoContext);

  const userName = Cookies.get("USER_DETAILS"); //sessionStorage.getItem("config_user_email") as string;
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

  const loginUser: any = Cookies.get("USER_DETAILS");

  useEffect(() => {
    if (loginUser) setLoginUserEmail(JSON.parse(loginUser)?.id_app_user);
  }, [loginUser]);

  const addCartProducthandler = async () => {
    await timeout(1000);
    viewer.setDirty();
    const snipper = viewer.getPlugin(CanvasSnipperPlugin);
    const file = await snipper.getFile();
    setImageData(file);
    // https://quickstart-3c059c30.myshopify.com/cart/add?id=${productVariantNumber ? productVariantNumber[0]?.value : 45981592420641}&quantity=${quntity}
  };

  useEffect(() => {
    if (addCartData?.code == 200 && addCartData?.data) {
      setImageData("");
      if (MetalData?.id_metal) {
        if (matchingWeddingBand?.sort_code == "NONE") {
          window.location.assign(
            `https://mazzucchellis-dev.myshopify.com/cart/add?id=${addCartData.data.variant_id}&quantity=1&properties[Engraving]=${engravingNameCart}&properties[Head Tone]=${ringHeadTone?.name}&properties[Shank Tone]=${ringShankTone?.name}&properties[Head Number]=${configPriceData?.data?.data?.head_no}&properties[Shank Number]=${configPriceData?.data?.data?.shank_no}`
          );
        } else {
          window.location.assign(
            `https://mazzucchellis-dev.myshopify.com/cart/add?id=${addCartData.data.variant_id}&quantity=1&properties[Engraving]=${engravingNameCart}&properties[Head Tone]=${ringHeadTone?.name}&properties[Shank Tone]=${ringShankTone?.name}&properties[Band Tone]=${bandMetalTone?.name}&properties[Head Number]=${configPriceData?.data?.data?.head_no}&properties[Shank Number]=${configPriceData?.data?.data?.shank_no}&properties[Band Number]=${configPriceData?.data?.data?.band_no}`
          );
        }
      } else {
        if (matchingWeddingBand?.sort_code == "NONE") {
          window.location.assign(
            `https://mazzucchellis-dev.myshopify.com/cart/add?id=${addCartData.data.variant_id}&quantity=1&properties[Engraving]=${engravingNameCart}&properties[Metal]=${MetalData.name}&properties[Head Number]=${configPriceData?.data?.data?.head_no}&properties[Shank Number]=${configPriceData?.data?.data?.shank_no}`
          );
        } else {
          window.location.assign(
            `https://mazzucchellis-dev.myshopify.com/cart/add?id=${addCartData.data.variant_id}&quantity=1&properties[Engraving]=${engravingNameCart}&properties[Metal]=${MetalData.name}&properties[Band Metal]=${MetalData.name}&properties[Head Number]=${configPriceData?.data?.data?.head_no}&properties[Shank Number]=${configPriceData?.data?.data?.shank_no}&properties[Band Number]=${configPriceData?.data?.data?.band_no}`
          );
        }
      }
      // window.location.assign(
      //   `https://mazzucchellis-dev.myshopify.com/cart/add?id=${addCartData.data.variant_id}&quantity=1&properties[engraving]=${engravingNameCart}`
      // );

      setEngravingNameCart("");
    }
  }, [addCartData]);

  useEffect(() => {
    if (imageData && imageData != "" && imageData != undefined)
      shopifyAddTocart({
        center_stone: centerGemstone?.sort_code,
        center_stone_shape: diamondShape?.sort_code,
        center_stone_size: diamondSize ? diamondSize?.value : null,
        center_stone_color: diamondQuality ? diamondQuality.color_name : null,
        center_stone_clarity: diamondQuality
          ? diamondQuality.clarity_name
          : null,
        head: ringHead?.sort_code,
        shank: ringShank?.sort_code,
        metal: MetalData?.metal_name ? MetalData?.metal_name : MetalData.name,
        image: imageData,
        karat: MetalData?.metal_name ? MetalData?.name : null,
        is_band: matchingWeddingBand?.sort_code,
        side_setting: sideSettings?.sort_code,
        product_title:
          configPriceData &&
          configPriceData.data &&
          configPriceData?.data?.data?.product_title,
        sort_description:
          configPriceData &&
          configPriceData.data &&
          configPriceData?.data?.data?.product_sort_des,
        price:
          configPriceData &&
          configPriceData.data &&
          configPriceData?.data?.data?.product_total_price.toFixed(2),
        sku:
          configPriceData &&
          configPriceData.data &&
          configPriceData?.data?.data?.sku,
        ring_no:
          configPriceData &&
          configPriceData.data &&
          configPriceData?.data?.data?.ring_no,
        shank_no:
          configPriceData &&
          configPriceData.data &&
          configPriceData?.data?.data?.shank_no,
        head_no:
          configPriceData &&
          configPriceData.data &&
          configPriceData?.data?.data?.head_no,
        band_no:
          configPriceData &&
          configPriceData.data &&
          configPriceData?.data?.data?.band_no,
        app_name: "MAZZUCCHELLIS_APP",
      });
  }, [imageData]);

  const webConfigBgColor = `linear-gradient(${process.env.NEXT_PUBLIC_MAZZCONFIG_BG_COLOR})`;

  // useEffect(() => {
  //   if (loginUserEmail != undefined) {
  //     addCart({
  //       user_id: loginUserEmail,
  //       product_id: productId,
  //       metal_id: metalId,
  //       karat_id: karatId,
  //       metal_tone_id: metalToneId,
  //       ring_size: null,
  //       center_diamond_group_id: diamondGroupId,
  //       SKU: productSku || "",
  //       image: imageData,
  //       is_band: band,
  //     })
  //   }
  // }, [imageData])

  // useEffect(() => {
  //   if ((addCartData && addCartData.code === 200) || (addCartData && addCartData.code === "200")) {
  //     updateCartTotalItems(addCartData?.data);

  //     router.push(`${ROUTES.CARTPAGE}`);
  //   }
  // }, [addCartData])

  const [selectedPriceValue, setSelectedPriceValue] = useState<any>();

  useEffect(() => {
    setMetaId(selectedPriceValue?.metal);
    setkaratId(selectedPriceValue?.karat);
    setBand(selectedPriceValue?.is_band);
  }, [selectedPriceValue]);

  useEffect(() => {
    setMetalToneId(ringShankTone?.id);
  }, [ringShankTone]);

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

    setCenterDiamondList(MAZZDATA?.center_diamond?.component);

    const gemstoneData =
      DATA &&
      DATA?.gemstoneList &&
      DATA?.gemstoneList.length != 0 &&
      DATA?.gemstoneList.filter((t: any) => t.is_diamond == 2);

    setGemstoneList(gemstoneData);

    selectedData.CenterDiamondId =
      MAZZDATA?.center_diamond?.component &&
      MAZZDATA?.center_diamond?.component.length &&
      MAZZDATA?.center_diamond?.component[0]?.id;

    const centerDiamondId =
      MAZZDATA?.center_diamond?.component &&
      MAZZDATA?.center_diamond?.component.length != 0 &&
      MAZZDATA?.center_diamond?.component[0];
    setCenterDiamond(centerDiamondId);

    // ** CENTER_DIAMOND_TYPE

    // const diamondId = CONFIG_DATA.diamond_center.component && CONFIG_DATA.diamond_center.component.length != 0 && CONFIG_DATA.diamond_center.component.filter(
    //   (t: any) => t.id === selectedData.DiamondId
    // );

    setCenterDiamondData(
      CONFIG_DATA.diamond_center.component &&
        CONFIG_DATA.diamond_center.component.length != 0 &&
        CONFIG_DATA.diamond_center.component[0]
    );

    // ** SHAPE

    setDiamondShape(
      DATA?.diamondShapeList &&
        DATA?.diamondShapeList.length !== 0 &&
        DATA?.diamondShapeList[0]
    );

    selectedData.GemStoneId =
      DATA?.gemstoneList &&
      DATA?.gemstoneList.length != 0 &&
      DATA?.gemstoneList[0].id;

    // const gemstoneId =
    //   gemstoneData &&
    //   gemstoneData.length !== 0 &&
    //   gemstoneData.filter((t: any) => t.id === selectedData.GemStoneId);

    setCenterGemstone(
      gemstoneData && gemstoneData.length !== 0 && gemstoneData[0]
    );

    // ** SIZE

    // selectedData.CentreDiamondSizeID =
    //   DATA?.caratSizeList && DATA?.caratSizeList.length !== 0 && DATA.caratSizeList[0]?.id;

    // const centreDiamondSizeID =
    //   DATA && DATA?.caratSizeList && DATA?.caratSizeList.length !== 0 &&
    //   DATA?.caratSizeList.filter(
    //     (t: any) => t.id === selectedData.CentreDiamondSizeID
    //   );

    setDiamondSize(
      DATA &&
        DATA?.caratSizeList &&
        DATA?.caratSizeList.length !== 0 &&
        DATA?.caratSizeList[0]
    );

    // ** CUT

    // const diamondCutId = DATA?.cutsList && DATA?.cutsList.length !== 0 &&
    //   DATA?.cutsList.filter(
    //     (t: any) => t.id === DATA?.cutsList[0].id
    //   );

    setDiamondCut(
      DATA && DATA?.cutsList && DATA?.cutsList.length !== 0 && DATA?.cutsList[0]
    );

    // ** RING_HEAD

    selectedData.RingHeadID =
      DATA?.headList && DATA.headList.length !== 0 && DATA.headList[0].id;

    // const ringHeadID =
    //   DATA && DATA?.headList.length != 0 &&
    //   DATA?.headList.filter((t: any) => t.id === selectedData.RingHeadID);
    setRingHead(DATA && DATA?.headList.length != 0 && DATA?.headList[0]);

    // ** RING_SHANK

    setRingShank(
      DATA &&
        DATA?.shankList &&
        DATA?.shankList.length !== 0 &&
        DATA?.shankList[0]
    );

    // ** SIDE_SETTING

    // const sideSettingID =
    //   DATA && DATA.sideSettingStyle && DATA.sideSettingStyle.length != 0 &&
    //   DATA.sideSettingStyle.filter(
    //     (t: any) => t.id === selectedData.SideSettingID
    //   );
    setSideSettings(
      DATA &&
        DATA.sideSettingStyle &&
        DATA.sideSettingStyle.length != 0 &&
        DATA.sideSettingStyle[0]
    );

    // ** METAL_KARAT

    selectedData.MetalKaratID =
      DATA?.metalList && DATA?.metalList.length !== 0 && DATA.metalList[0].id;
    selectedData.MetalID =
      DATA?.metalList &&
      DATA?.metalList.length !== 0 &&
      DATA?.metalList[0].id_metal;

    const metalComponentID =
      DATA &&
      DATA?.metalList &&
      DATA?.metalList.length != 0 &&
      DATA?.metalList.filter((t: any) => t.id === selectedData?.MetalKaratID);
    setMetalData(
      metalComponentID && metalComponentID.length !== 0 && metalComponentID[0]
    );

    // ** HEAD_METALTONE

    selectedData.RingCrownMetalID =
      DATA?.metalToneList && DATA.metalToneList[2].id;

    const ringCrownMetalID =
      DATA?.metalToneList &&
      DATA?.metalToneList.length != 0 &&
      DATA?.metalToneList.filter(
        (t: any) => t.id === selectedData.RingCrownMetalID
      );
    setRingHeadTone(
      ringCrownMetalID && ringCrownMetalID.length !== 0 && ringCrownMetalID[0]
    );

    // ** SHANK_MEATALTONE

    selectedData.ShankCrownMetalID =
      DATA?.metalToneList && DATA.metalToneList[2].id;

    const ringShankMetalID =
      DATA &&
      DATA?.metalToneList &&
      DATA?.metalToneList.length != 0 &&
      DATA?.metalToneList.filter(
        (t: any) => t.id === selectedData.ShankCrownMetalID
      );
    setRingShankTone(
      ringShankMetalID && ringShankMetalID.length !== 0 && ringShankMetalID[0]
    );

    // ** BAND

    const RingBandStyleID =
      CONFIG_DATA &&
      CONFIG_DATA.matching_wedding_band.component &&
      CONFIG_DATA.matching_wedding_band.component.filter(
        (t: any) => t.id === selectedData.RingBandStyleID
      );
    setMatchingWeddingBand(
      RingBandStyleID && RingBandStyleID.length !== 0 && RingBandStyleID[0]
    );

    selectedData.BandStyleMetalID =
      DATA?.metalToneList && DATA?.metalToneList[2].id;

    const rindBandToneId =
      DATA &&
      DATA?.metalToneList &&
      DATA?.metalToneList.length != 0 &&
      DATA?.metalToneList.filter(
        (t: any) => t.id === selectedData.BandStyleMetalID
      );
    setBandMetalTone(
      rindBandToneId && rindBandToneId.length !== 0 && rindBandToneId[0]
    );

    // ** COLORCLARITY

    const diamondQualityData =
      DATA &&
      DATA?.colorClarityList &&
      DATA?.colorClarityList.length != 0 &&
      DATA?.colorClarityList?.filter(
        (t: any) =>
          t.id_clarity === selectedData.DiamondClarityID &&
          t.id_color === selectedData.DiamondColorID
      );

    setDiamondQuality(
      diamondQualityData &&
        diamondQualityData?.length !== 0 &&
        diamondQualityData[0]
    );
    // ** GEMSTONE_TYPE
    const gemstoneTypeData =
      CONFIG_DATA &&
      CONFIG_DATA?.gemstone_type?.component &&
      CONFIG_DATA?.gemstone_type?.component.filter(
        (t: any) => t.id === selectedData?.GemstoneTypeId
      );

    setGemstoneType(
      gemstoneTypeData && gemstoneTypeData.length !== 0 && gemstoneTypeData[0]
    );

    setSelectedValue(selectedData);
  }, [DATA]);

  const { data: configPrice, mutate: getConfigData } =
    useConfiguratorProductPriceQuery();

  const configPriceData = useMemo(() => {
    return configPrice;
  }, [configPrice]);

  useEffect(() => {
    if (selectedPriceValue && (selectedPriceValue as any).center_stone)
      getConfigData(selectedPriceValue);
  }, [selectedPriceValue]);

  useEffect(() => {
    setSelectedPriceValue({
      center_stone:
        centerDiamond &&
        (centerDiamond?.sort_code == "D" || centerDiamond?.sort_code == "LD"
          ? diamondFilterData && diamondFilterData[0]?.id
          : centerGemstone?.id),
      diamond_type: centerDiamond && centerDiamond?.diamond_type,
      center_stone_shape: diamondShape && diamondShape?.id,
      center_stone_color:
        centerDiamond?.sort_code == "D" || centerDiamond?.sort_code == "LD"
          ? diamondQuality && diamondQuality.id_color
          : null,
      center_stone_clarity:
        centerDiamond?.sort_code == "D" || centerDiamond?.sort_code == "LD"
          ? diamondQuality && diamondQuality.id_clarity
          : null,
      head: ringHead && ringHead?.id,
      shank: ringShank && ringShank?.id,
      side_setting: sideSettings && sideSettings.id,
      center_stone_size: diamondSize && diamondSize.id,
      center_stone_cuts:
        centerDiamond?.sort_code == "G" ? diamondCut && diamondCut?.id : null,
      metal:
        MetalData && MetalData.id_metal ? MetalData.id_metal : MetalData?.id,
      karat: MetalData && MetalData.id_metal ? MetalData.id : null,
      is_band: matchingWeddingBand && matchingWeddingBand.id == 1 ? 0 : 1,
    });
  }, [
    gemstoneType,
    centerDiamond,
    centerDiamondData,
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
    if (configPriceData?.data?.data !== undefined) {
      setProductId(configPriceData && configPriceData?.data?.data?.id);
      setDiamondGroupId(
        configPriceData && configPriceData?.data?.data?.center_diamond_group_id
      );
      setProductSku(configPriceData && configPriceData?.data?.data?.sku);
      setProductShortDes(
        configPriceData && configPriceData?.data?.data?.product_sort_des
      );
      setProductTitle(
        configPriceData && configPriceData?.data?.data?.product_title
      );
      setProductPriceValue(
        configPriceData && configPriceData?.data?.data?.product_total_price
      );
      refreshUI(configPriceData && configPriceData?.data?.data);
    }
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

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //     function setupViewer() {
  //       const viewer = new ViewerApp({
  //         canvas: document.getElementById("webgi-canvas") as HTMLCanvasElement,
  //       });
  //       setViewer(viewer);
  //     }
  //     setupViewer();
  //   }, 500);
  // }, [selectedValue]);

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
    viewer.getManager().importer.registerFile("temp.glb").preparsers[0].key = (
      encryption: any,
      json: any,
      a: any
    ) => {
      if (a.includes("Bands/")) return "d{H9KprfAxqh";
      else return "ObECsgKY3qJ$";
    };
    const config = await viewer.addPlugin(VariationConfiguratorPlugin);

    await manager.addFromPath(`${imageUrl}UV_TCC.glb`, options);
    await Promise.all([
      manager.addFromPath(`${imageUrl}config_tcc.vjson`),
      manager.addFromPath("/assets/config_tcc_variation.json"),
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

        if (MetalData && !MetalData.id_metal) {
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
            //console.log("dmatName Main", dmatName);
            child.setMaterial(diamondMaterial);
          } else {
            // console.log("dmatName Small", smallDmatName);
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
        const object = config?.variations?.objects?.find(
          (obj) => obj?.name == "Heads"
        )!;
        if (object) {
          const index = object?.items?.findIndex((t: any) =>
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

      let pricingData = 0;

      //Pricing
      if (diamondQuality && diamondShape && diamondSize) {
        const findHead =
          PRICING &&
          PRICING.head &&
          PRICING.head.filter(
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
        const findShank =
          PRICING &&
          PRICING.shank &&
          PRICING.shank.filter(
            (t: any) =>
              t.type == ringShank.sort_code &&
              t.style == sideSettings.sort_code &&
              t.metal == MetalData.sort_code
          );
        if (findShank && findShank.length > 0) {
          pricingData = pricingData + parseInt(findShank[0].value);
        }

        if (matchingWeddingBand && matchingWeddingBand.sort_code == "BAND") {
          const findBand =
            PRICING &&
            PRICING.band &&
            PRICING.band.filter(
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

      setProductPriceValue(pricingData);
      // setPricing(pricingData);

      setMaterial();
    }
  };

  // useEffect(() => {
  //   if (materials) {
  //     refreshUI(configPriceData && configPriceData?.data?.data);
  //   }
  // }, [
  //   diamondShape,
  //   ringShank,
  //   CenterDiamondShape,
  //   ringHead,
  //   diamondSize,
  //   sideSettings,
  //   matchingWeddingBand,
  //   diamondQuality,
  //   MetalData,
  // ]);

  // useEffect(() => {
  //   refreshUI(configPriceData && configPriceData?.data?.data);
  // }, [materials, objects]);

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
    const file = await snipper.getFile();
    // setImageData(file);

    const size =
      imageDownLoadIndex == "1"
        ? 700
        : imageDownLoadIndex == "2"
        ? 1024 / 2
        : 1980 / 3;
    const scale =
      imageDownLoadIndex == "1" ? 1 : imageDownLoadIndex == "2" ? 2 : 3;
    // viewer.setSize({ width: size, height: size });
    //setCanvasHeight(100);
    //setCanvasWidth(100);
    // viewer.resize();
    await timeout(1000);
    await snipper.downloadSnapshot("image.png", {
      waitForProgressive: true, // download anti-aliased image
      displayPixelRatio: scale,
    });
    await timeout(1000);
    // viewer.setSize({ width: "100%", height: height });
    //setCanvasHeight(100);
    //setCanvasWidth(100);
    // viewer.resize();
  };

  const handleFullScreen = async () => {
    setIsFullScreen(!isFullScreen);
    const canvas = document.getElementById("webgi-canvas") as HTMLCanvasElement;
    viewer.getPlugin(FullScreenPlugin).toggle(canvas.parentElement);
  };

  const dynamicStyle = {
    width: "100%",
    height: width > 1024 ? `calc(${height}px - 300px)` : "",
    // Add any other styles you need
  };

  const dynamicStyle2 = {
    width: "100%",
    height: isFullScreen ? "100%" : width > 1024 ? `450px` : `340px`,
    // Add any other styles you need
  };

  // const handleFullScreenChange = () => {
  //   // When full-screen mode changes, check if we are still in full-screen and update the state
  //   setIsFullScreen(!!document.fullscreenElement);
  // };

  // useEffect(() => {
  //   // Add the event listener for the fullscreenchange event
  //   document.addEventListener("fullscreenchange", handleFullScreenChange);

  //   // Clean up the event listener on component unmount
  //   return () => {
  //     document.removeEventListener("fullscreenchange", handleFullScreenChange);
  //   };
  // }, []);

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

  useEffect(() => {
    let filterData =
      diamondShape &&
      DATA &&
      DATA?.caratSizeList &&
      DATA?.caratSizeList.length != 0
        ? DATA?.caratSizeList.filter((e: any) =>
            diamondShape.diamond_size_id.includes(e.id)
          )
        : DATA?.caratSizeList;

    filterData =
      ringHead && filterData && filterData.length != 0
        ? filterData.filter((e: any) => ringHead.diamond_size_id.includes(e.id))
        : filterData;
    const value =
      filterData && filterData.find((e: any) => diamondSize?.id == e.id);
    if (!value && filterData && filterData.length != 0) {
      setDiamondSize(filterData[0]);
    }
    setDiamondSizeList(filterData);
  }, [ringHead, diamondShape, DATA?.caratSizeList]);

  useEffect(() => {
    const data =
      ringHead &&
      DATA &&
      DATA?.diamondShapeList &&
      DATA?.diamondShapeList.length != 0
        ? DATA?.diamondShapeList.filter((e: any) =>
            ringHead.diamond_shape_id.includes(e.id)
          )
        : DATA?.diamondShapeList;

    const value = data && data.find((e: any) => diamondShape?.id == e.id);
    if (!value && data && data.length != 0) {
      setDiamondShape(data[0]);
    }
    setDiamondShapeList(data);
  }, [ringHead, DATA?.diamondShapeList]);

  useEffect(() => {
    const data =
      ringShank &&
      DATA &&
      DATA?.sideSettingStyle &&
      DATA?.sideSettingStyle.length != 0
        ? DATA?.sideSettingStyle.filter((e: any) =>
            ringShank.side_setting_id.includes(e.id)
          )
        : DATA?.sideSettingStyle;

    const value = data && data.find((e: any) => sideSettings?.id == e.id);
    if (!value && data && data.length != 0) {
      setSideSettings(data[0]);
    }
    setSideSettingList(data);
  }, [ringShank, DATA?.sideSettingStyle]);

  useEffect(() => {
    const data =
      centerDiamond && finalClarityData && finalClarityData.length != 0
        ? finalClarityData?.filter(
            (value: any) => value.is_diamond_type == centerDiamond.diamond_type
          )
        : finalClarityData;
    setDiamondClarityList(data);
    const value =
      data &&
      data.length != 0 &&
      data.find(
        (t: any) =>
          diamondQuality.id_color == t.id_color &&
          diamondQuality.id_clarity == t.id_clarity
      );

    if (!value && data && data.length != 0) {
      setDiamondQuality(data[0]);
    }
  }, [centerDiamond, finalClarityData]);

  if (isLoading) return <FallbackSpinner />;
  return (
    <div className="block lg:grid grid-cols-3 TCC-main-component w-100">
      <div
        className={`col-span-2 grid grid-cols-1 xl:mt-0 lg:mt-[118px] TCC-image-component relative`}
      >
        {isFullScreen ? (
          <></>
        ) : (
          <>
            <button
              className="absolute flex bg-[#43464a] mt-[90px] opacity-90 text-white cursor-pointer items-center border border-2  rounded-full border-neutral-600 py-1 px-3 lg:hidden lg:left-44 md:left-8 left-8 rounded"
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
                &nbsp;{CURRENCY}
                {configPriceData &&
                  configPriceData.data &&
                  configPriceData?.data?.data?.product_total_price?.toFixed()}
              </p>
            </button>
          </>
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
                style={{ height: height - 120 }}
              ></canvas>
            ) : width < 768 ? (
              <canvas
                id="webgi-canvas"
                className="w-full lg:h-full lg:w-full h-[350px] mt-[74px] lg:pt-0"
              ></canvas>
            ) : (
              <canvas
                id="webgi-canvas"
                className="w-full lg:h-full lg:w-full h-[400px] mt-[74px] lg:pt-0"
              ></canvas>
            )}
          </>
        )}
        {/* <div className="">
        <button
          className="absolute flex bg-[#43464a] top-4 opacity-90 text-white cursor-pointer items-center border border-2  rounded-full border-neutral-600 py-1 px-3 lg:hidden lg:left-44 md:left-8 left-8 rounded"
          id="enter-fullscreen"
        >
          <span>
            <AiOutlineInfoCircle
              style={{ height: "22px", width: "22px" }}
              onClick={() => setShowModal(true)}
              className="cursor-pointer"
            />
          </span>
          <p className="f-bold">
            &nbsp;{CURRENCY}
            {configPriceData &&
              configPriceData.data &&
              configPriceData?.data?.data?.product_total_price}
          </p>
        </button>
      </div> */}
        {isFullScreen ? (
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
          </>
        ) : (
          <>
            <div className="floating-buttons topright mt-[-14px] md:mt-[72px] lg:mt-0">
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
              className="absolute lg:top-[21px] top-[89px] p-2 lg:right-[11%] md:right-24 right-[70px]"
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

        <div className="block lg:mt-[-60px] mt-[-4.375rem] lg:my-0 md:mt-[-4.375rem] bottom-[-52px] left-0 right-0 m-auto">
          <div className=" flex justify-center" id="font-size-custom">
            <div className="grid grid-cols-4 gap-2 mt-3">
              <button
                style={{ background: webConfigBgColor }}
                className={`BrownLight flex justify-center items-center z-10 rounded-md w-full text-white px-2 sm:px-2 py-3 font-size_16`}
                onClick={handle360Image}
              >
                <img src="../../icons/360.png" className="sm:pe-2 h-4 " />
                &nbsp;360
              </button>

              <button
                style={{ background: webConfigBgColor }}
                className={`BrownLight flex justify-center items-center z-10 rounded-md w-full text-white px-2 sm:px-2  py-3 font-size_16`}
                onClick={handleVideoDownload}
              >
                <img src="../../icons/video.png" className="sm:pe-2 h-4" />
                &nbsp;Video
              </button>

              <div className="relative flex justify-center">
                <button
                  style={{ background: webConfigBgColor }}
                  className={`BrownLight flex justify-center items-center w-full rounded-md text-white items-center px-2 sm:px-2 py-3 font-size_16`}
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
                          className="py-1 BrownLight"
                          onClick={() => {
                            handleDropdownToggle1();
                            handleCameraViews("1");
                          }}
                        >
                          Perspective View
                        </button>
                      </div>
                      <div>
                        <button
                          className="py-1 BrownLight"
                          onClick={() => {
                            handleDropdownToggle1();
                            handleCameraViews("2");
                          }}
                        >
                          Top View
                        </button>
                      </div>
                      <div>
                        <button
                          className="py-1 BrownLight"
                          onClick={() => {
                            handleDropdownToggle1();
                            handleCameraViews("3");
                          }}
                        >
                          Right View
                        </button>
                      </div>
                      <div>
                        <button
                          className="py-1 BrownLight"
                          onClick={() => {
                            handleDropdownToggle1();
                            handleCameraViews("0");
                          }}
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
                  <span className="hidden sm:flex BrownLight">Download</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="floating-buttons bottomcenter text-center md:text-justify md:w-[23.45%]">
        <Button className="rounded w-[24.45%] md:w-[23.45%]" onClick={handle360Image}>
          <span className="mr-2">
            <MdOutline360 height="30" width="30" />
          </span>{" "}
          <span className="button-fontsize">360</span>
        </Button>
        <Button
          variant="slim"
          className={`w-1/3 w-[24.45%] md:w-[23.45%] rounded bg-[#DBB961] hover:bg-[#DBB961]`}
          onClick={handleVideoDownload}
        >
          <span className="mr-2">
            <AiOutlineVideoCamera height="30" width="30" />
          </span>
          <span className="py-2 3xl:px-8 button-fontsize">Video</span>
        </Button>
        <Dropdown
          className="mr-2 top-[-3px] w-[24.45%] md:w-[23.45%]"
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
          className={`w-[24.45%] md:w-[23.45%] rounded bg-[#DBB961] hover:bg-[#DBB961]`}
          onClick={handleDownloadImage}
        >
          <span className="mr-2">
            <AiOutlineDownload height="30" width="30" />
          </span>
          <span className="py-2 3xl:px-8 button-fontsize">Download</span>
        </Button>

      </div> */}
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
                    <h3 className="TFArrow-bold text-black">{productTitle}</h3>
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
                        <p className="text-body BrownLight TCC-product-detail-discription">
                          {configPriceData &&
                            configPriceData.data &&
                            configPriceData?.data?.data?.sku}
                        </p>
                      </p>
                    </div>
                    <div className="mt-2">
                      <p className="mb-0">
                        {" "}
                        <p className="text-body BrownLight TCC-product-detail-discription">
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
                        <div className="BrownLight">(107 Reviewed)</div>
                      </p>
                    </div>
                  </div>
                  <div id="price_id " className="px-5 pl-0">
                    <div className="">
                      <p className="TFArrow-bold text_size_16 pb-4 mt-5">
                        Price*
                        <span className="TFArrow-bold">
                          : {CURRENCY}
                          {configPriceData &&
                            configPriceData.data &&
                            configPriceData?.data?.data?.product_total_price.toFixed(
                              2
                            )}
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
                    className={`bg-gray-300 text-black active:bg-green-600 font-bold uppercase text-sm px-8 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                    type="button"
                    onClick={() => setShowModal(false)}
                    // style={{ backgroundColor: webSecondaryColor }}
                  >
                    Close
                  </button>
                  <button
                    style={{ background: webConfigBgColor }}
                    className={`text-white active:bg-green-600 font-bold uppercase text-sm px-10 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none -mr-[20px] mr-1 mb-1 ease-linear transition-all duration-150`}
                    // onClick={addCartProducthandler}
                    // style={{ backgroundColor: webSecondaryColor }}
                  >
                    BUY
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
      <div className="col-span-1 TCC-dis-component xl:mt-0 lg:mt-[110px] lg:ps-3 ps-0 md:ps-0">
        <div className="pb-7 tcc-mobile-margin lg:pe-2 pe-2 ps-2 lg:ps-2">
          <div className="flex lg:block hidden lg:visible md:invisible">
            <h2 className="text-black TFArrow mb-3.5 TCC-product-pricing-heading pt-3">
              {productTitle}
              <small
                style={{ color: webConfigBgColor }}
                className="flex w-100 BrownLight"
              >
                {" "}
                {productSku}
              </small>
            </h2>
          </div>

          {/* {/ Description /} */}
          <p className=" BrownLight lg:block hidden lg:visible md:invisible text-body TCC-product-detail-discription w-2/3">
            {productShortDes}
          </p>

          <div className="flex items-center mt-5 hidden lg:block lg:visible md:invisible">
            <div className="font-bold text-base md:text-xl lg:text-2xl 2xl:text-4xl pe-2 md:pe-0 lg:pe-2 2xl:pe-0">
              <span
                style={{ color: webConfigBgColor }}
                className="TFArrow TCC-product-configurator-price text-black"
              >
                Price: {CURRENCY}
                {configPriceData &&
                  configPriceData.data &&
                  configPriceData?.data?.data?.product_total_price?.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        <div
          className="mazzscroll lg:overflow-y-auto lg:overflow-x-hidden lg:mh-50 mt-4 md:mt-4 sm:mt-4 lg:mt-0 lg:pe-5 pe-5 ps-5 md:px-8 lg:ps-5"
          style={dynamicStyle}
        >
          {/* Config Component */}
          <div>
            <span className="Mazz-config-title text-black TFArrow">
              Centre Diamond:{" "}
            </span>
            <span
              className="TFArrow Mazz-config-title"
              style={{
                background: `${webConfigBgColor}`,
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                WebkitBackgroundClip: "text",
              }}
            >
              {centerDiamond.name}
            </span>
            <CenterDiamond
              data={MAZZDATA?.center_diamond?.component}
              value={setCenterDiamond}
              selectedValue={centerDiamond}
              className={{
                mainButton: "py-3 w-full",
                buttonSelected: "config-selected-value",
                tooltipData: { height: "50px", width: "50px" },
                imageData: { height: "25px", width: "25px" },
                imageStyle: "mx-auto",
                fontStyle: "BrownLight text-black",
              }}
            />
          </div>

          <div className="border-b border-gray-300 my-3" />

          <div>
            <span className="Mazz-config-title text-black TFArrow">
              Centre Diamond Shape:{" "}
            </span>
            <span
              className="TFArrow Mazz-config-title"
              style={{
                background: `${webConfigBgColor}`,
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                WebkitBackgroundClip: "text",
              }}
            >
              {diamondShape?.name}
            </span>
            <CenterDiamondShape
              data={diamondShapeList}
              value={setDiamondShape}
              filter={centerDiamond?.sort_code}
              selectedValue={diamondShape}
              className={{
                mainButton: "py-3 w-full",
                buttonSelected: "config-selected-value",
                tooltipData: {
                  height: "25px",
                  width: "25px",
                  scaleStyle: "mx-auto scale-2001",
                },
                imageData: { height: "15px", width: "15px" },
                divmargin: "mt-2.5 BrownLight text- black",
              }}
            />
          </div>

          <div className="border-b border-gray-300 my-3" />
          <div>
            <span className="Mazz-config-title text-black TFArrow">
              Centre Diamond Size:{" "}
            </span>
            <span
              className="TFArrow Mazz-config-title"
              style={{
                background: `${webConfigBgColor}`,
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                WebkitBackgroundClip: "text",
              }}
            >
              {diamondSize?.value}
            </span>
            <CenterDiamondSize
              data={diamondSizeList}
              value={setDiamondSize}
              selectedValue={diamondSize}
              className={{
                mainButton: "px-7 py-3 w-full",
                buttonSelected: "config-selected-value",
                tooltipData: {
                  height: "25px",
                  width: "25px",
                  scaleStyle: "mx-auto scale-2001",
                },
                imageData: { height: "15px", width: "15px" },
                divmargin: "mt-2.5 BrownLight text-black",
              }}
            />
            <div className="border-b border-gray-300 my-3" />
          </div>
          {centerDiamond?.sort_code == "G" && (
            <div>
              <span className="Mazz-config-title text-black TFArrow">
                Diamond Cut:{" "}
              </span>
              <span
                className="TFArrow Mazz-config-title"
                style={{
                  background: `${webConfigBgColor}`,
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  WebkitBackgroundClip: "text",
                }}
              >
                {diamondCut?.value}
              </span>
              <DiamondCutComponent
                data={DATA?.cutsList || []}
                value={setDiamondCut}
                selectedValue={diamondCut}
                className={{
                  mainButton: "px-7 py-3 w-full",
                  buttonSelected: "config-selected-value",
                  tooltipData: { height: "50px", width: "50px" },
                  imageData: { height: "25px", width: "25px" },
                  divmargin: "BrownLight text-black",
                }}
              />
            </div>
          )}

          <>
            <span className="Mazz-config-title text-black TFArrow">
              Diamond Quality:{" "}
            </span>
            <span
              className="TFArrow Mazz-config-title"
              style={{
                background: `${webConfigBgColor}`,
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                WebkitBackgroundClip: "text",
              }}
            >
              {diamondQuality?.color_name}/{diamondQuality?.clarity_name}
            </span>
            <DiamondClarityComponent
              data={diamondClarityList}
              value={setDiamondQuality}
              selectedValue={diamondQuality}
              className={{
                certify: "is_certify",
                mainButton: "px-7 py-3 w-full",
                buttonSelected: "config-selected-value",
                tooltipData: { height: "50px", width: "50px" },
                imageData: { height: "25px", width: "25px" },
                divmargin: "BrownLight text-black",
              }}
            />

            {/* {certifyData &&
            <DiamondCertifyComponent
              data={MAZZDATA.diamond_certify}
              className={{ mainButton: "px-7 py-3 w-full", divmargin: "BrownLight text-black" }}
            />
          } */}

            <div className="border-b border-gray-300 my-3" />
          </>
          <div>
            <span className="Mazz-config-title text-black TFArrow">
              Head Design:{" "}
            </span>
            <span
              className="TFArrow Mazz-config-title"
              style={{
                background: `${webConfigBgColor}`,
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                WebkitBackgroundClip: "text",
              }}
            >
              {ringHead?.name}
            </span>
            <RingHead
              data={DATA?.headList || []}
              value={setRingHead}
              selectedValue={ringHead}
              className={{
                mainButton: "py-3 w-full",
                buttonSelected: "config-selected-value",
                tooltipData: {
                  height: "40px",
                  width: "40px",
                  scaleStyle: "mx-auto scale-150",
                },
                imageData: { height: "25px", width: "25px" },
                divmargin: "mt-2.5 BrownLight text-black",
              }}
            />
          </div>

          <div className="border-b border-gray-300 my-3" />
          <div>
            <span className="Mazz-config-title text-black TFArrow">
              Mount Design:{" "}
            </span>
            <span
              className="TFArrow Mazz-config-title"
              style={{
                background: `${webConfigBgColor}`,
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                WebkitBackgroundClip: "text",
              }}
            >
              {ringShank?.name}
            </span>
            <RingShank
              data={(DATA && DATA?.shankList) || []}
              value={setRingShank}
              selectedValue={ringShank}
              className={{
                mainButton: "py-3 w-full",
                buttonSelected: "config-selected-value",
                tooltipData: {
                  height: "30px",
                  width: "30px",
                  scaleStyle: "mx-auto scale-2001",
                },
                imageData: { height: "20px", width: "20px" },
                divmargin: "mt-2.5 BrownLight text-black",
              }}
            />
          </div>

          <div className="border-b border-gray-300 my-3" />
          <div>
            <span className="Mazz-config-title text-black TFArrow">
              Ring Side Settings:{" "}
            </span>
            <span
              className="TFArrow Mazz-config-title"
              style={{
                background: `${webConfigBgColor}`,
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                WebkitBackgroundClip: "text",
              }}
            >
              {sideSettings?.name}
            </span>
          </div>
          <SideSettings
            data={sideSettingList}
            value={setSideSettings}
            filter={ringShank?.id}
            selectedValue={sideSettings}
            className={{
              mainButton: "py-3 w-full",
              buttonSelected: "config-selected-value",
              tooltipData: {
                height: "40px",
                width: "40px",
                scaleStyle: "mx-auto scale-150",
              },
              imageData: { height: "20px", width: "20px" },
              divmargin: "mt-2.5 BrownLight text- black",
            }}
          />
          <div className="border-b border-gray-300 my-3" />
          <div>
            <span className="Mazz-config-title text-black TFArrow">
              Metal:{" "}
            </span>
            <span
              className="TFArrow Mazz-config-title"
              style={{
                background: `${webConfigBgColor}`,
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                WebkitBackgroundClip: "text",
              }}
            >
              {MetalData?.slug} {MetalData?.metal_name}
            </span>
            <MetalComponent
              data={
                DATA && DATA?.metalList && DATA?.metalList.length != 0
                  ? DATA?.metalList.filter((value: any) => value.id_metal == 1)
                  : []
              }
              value={setMetalData}
              selectedValue={MetalData}
              className={{
                mainButton: "px-7 py-3 w-full",
                buttonSelected: "config-selected-value",
                tooltipData: { height: "50px", width: "50px" },
                imageData: { height: "25px", width: "25px" },
                fontStyle: "font-bold",
                divmargin: "mt-2.5 BrownLight text-black",
              }}
            />
          </div>

          <div className="border-b border-gray-300 my-3" />

          {MetalData && MetalData.id_metal ? (
            <>
              <div>
                <span className="Mazz-config-title text-black TFArrow">
                  Metal Colour:{" "}
                </span>
                <span
                  className="TFArrow Mazz-config-title"
                  style={{
                    background: `${webConfigBgColor}`,
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    WebkitBackgroundClip: "text",
                  }}
                >
                  {ringHeadTone?.name}
                </span>
                <RingCrownColor
                  data={DATA?.metalToneList}
                  value={setRingHeadTone}
                  selectedValue={ringHeadTone}
                  className={{
                    mainButton: "px-7 py-3 w-full",
                    buttonSelected: "config-selected-value",
                    imageData: {
                      height: "25px",
                      width: "25px",
                      scaleStyle: "mx-auto scale-150",
                    },
                    divmargin: "mt-2.5 BrownLight text-black",
                  }}
                />
                <div className="border-b border-gray-300 my-3" />
              </div>
              <div>
                <span className="Mazz-config-title text-black TFArrow">
                  Ring Style Metal:{" "}
                </span>
                <span
                  className="TFArrow Mazz-config-title"
                  style={{
                    background: `${webConfigBgColor}`,
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    WebkitBackgroundClip: "text",
                  }}
                >
                  {ringShankTone?.name}
                </span>
                <RingStyleColor
                  data={DATA?.metalToneList}
                  value={setRingShankTone}
                  selectedValue={ringShankTone}
                  className={{
                    mainButton: "px-7 py-3 w-full",
                    buttonSelected: "config-selected-value",
                    imageData: {
                      height: "25px",
                      width: "25px",
                      scaleStyle: "mx-auto scale-150",
                    },
                    divmargin: "mt-2.5 BrownLight text-black",
                  }}
                />
                <div className="border-b border-gray-300 my-3" />
              </div>
            </>
          ) : (
            <></>
          )}
          <div>
            <span className="Mazz-config-title text-black TFArrow">Band: </span>
            <span
              className="TFArrow Mazz-config-title"
              style={{
                background: `${webConfigBgColor}`,
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                WebkitBackgroundClip: "text",
              }}
            >
              {matchingWeddingBand?.name}
            </span>
            <MatchingWeddingBand
              data={CONFIG_DATA?.matching_wedding_band.component || []}
              selectedValue={matchingWeddingBand}
              value={setMatchingWeddingBand}
              className={{
                mainButton: "px-7 py-3 w-full",
                buttonSelected: "config-selected-value",
                tooltipData: {
                  height: "50px",
                  width: "50px",
                  scaleStyle: "mx-auto",
                },
                imageData: { height: "25px", width: "25px" },
                divmargin: "mt-2.5 BrownLight text-black",
              }}
            />
          </div>

          <div className="border-b border-gray-300 my-3" />
          {matchingWeddingBand?.id_metal_tone == 1 && MetalData.id_metal && (
            <>
              <span className="Mazz-config-title text-black TFArrow ">
                Band Metal:{" "}
              </span>
              <span
                className="TFArrow Mazz-config-title"
                style={{
                  background: `${webConfigBgColor}`,
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  WebkitBackgroundClip: "text",
                }}
              >
                {bandMetalTone?.name}
              </span>
              <MatchBandMetalTone
                data={DATA?.metalToneList || []}
                selectedValue={bandMetalTone}
                value={setBandMetalTone}
                className={{
                  mainButton: "px-7 py-3 w-full",
                  buttonSelected: "config-selected-value",
                  imageData: {
                    height: "25px",
                    width: "25px",
                    scaleStyle: "mx-auto scale-150",
                  },
                  divmargin: "mt-2.5 BrownLight text-black",
                }}
              />
              <div className="border-b border-gray-300 my-3" />
            </>
          )}
          {/* Engraving */}
          <div className="mb-5 w-full">
            <span className="TFArrow-bold TCC-product-text-diamond-shape ">
              Engraving
            </span>
            <Input
              name="Engraving"
              className="w-full mt-1"
              variant="solid"
              value={engravingNameCart}
              onChange={(e: any) => {
                setEngravingName(e.target.value);
                setEngravingNameCart(e.target.value);
              }}
            />
          </div>

          {/* Snap Shot Style*/}
          <div className="mb-5 w-full">
            <span className="TFArrow-bold TCC-product-text-diamond-shape ">
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
          <div className="flex felx-cols items-center">
            {/* <Button
            variant="slim"
            style={{ background: webConfigBgColor }}
            className={`w-1/3 md:w-1/3 rounded hover:bg-[#DBB961] mb-16 lg:mb-0`}
            onClick={handleDownloadImage}
          >
            <span className="py-2 3xl:px-8">Download</span>
          </Button> */}
            <Button
              variant="slim"
              style={{ background: webConfigBgColor }}
              className={`w-1/3 ml-[7px] md:w-1/3 rounded hover:bg-[#DBB961] lg:mb-8`}
              onClick={async () => {
                handleCameraViews("1");
                setEngravingName(" ");

                await addCartProducthandler();
              }}
            >
              <span className="py-2 3xl:px-8">Add To Cart</span>
            </Button>
          </div>
          <div className="mb-28 lg:mb-0 text-[#6C6C6C]">
            <Collapse
              i={0}
              title={"Product Preview"}
              translatorNS="review"
              content={
                <div>
                  <div className="flex justify-between mb-4">
                    <div className="BrownLight">Centre Stone</div>
                    <div className="BrownLight">{centerDiamond?.name}</div>
                  </div>
                  <div className="flex justify-between mb-4">
                    <div className="BrownLight">Centre Diamond</div>
                    <div className="BrownLight">
                      {centerDiamond == "D"
                        ? centerDiamondData?.name
                        : gemstoneType?.name}
                    </div>
                  </div>
                  <div className="flex justify-between mb-4">
                    <div className="BrownLight">Diamond Shape</div>
                    <div className="BrownLight">{diamondShape?.name}</div>
                  </div>
                  <div className="flex justify-between mb-4">
                    <div className="BrownLight">Diamond Size</div>
                    <div className="BrownLight">{diamondSize?.value}</div>
                  </div>
                  <div className="flex justify-between mb-4">
                    <div className="BrownLight">Crown Type</div>
                    <div className="BrownLight">{ringHead?.name}</div>
                  </div>
                  <div className="flex justify-between mb-4">
                    <div className="BrownLight">Shank Type</div>
                    <div className="BrownLight">{ringShank?.name}</div>
                  </div>
                  <div className="flex justify-between mb-4">
                    <div className="BrownLight">Side Setting</div>
                    <div className="BrownLight">{sideSettings?.name}</div>
                  </div>
                  <div className="flex justify-between mb-4">
                    <div className="BrownLight">Metal Tone</div>
                    <div className="BrownLight">{ringHeadTone?.name}</div>
                  </div>
                  <div className="flex justify-between mb-4">
                    <div className="BrownLight">Metal</div>
                    <div className="BrownLight">{MetalData?.name}</div>
                  </div>
                  <div className="flex justify-between mb-4">
                    <div className="BrownLight">Matching Band</div>
                    <div className="BrownLight">
                      {matchingWeddingBand?.name}
                    </div>
                  </div>
                  {matchingWeddingBand &&
                  matchingWeddingBand?.sort_code == "BAND" ? (
                    <div className="flex justify-between mb-4">
                      <div className="BrownLight">Band Metal</div>
                      <div className="BrownLight">{bandMetalTone?.name}</div>
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="flex justify-between">
                    <div className="BrownLight">Engraving</div>
                    <div className="BrownLight">{engravingName}</div>
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
                  <span className="BrownLight">Standard Delivery:</span>
                  <span className="BrownLight"> 3 Weeks</span>
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
                  <span className="BrownLight">
                    These custom made products cannot be returned and refunded.
                  </span>
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
  );
};

export default Product3DRenderPricing;
