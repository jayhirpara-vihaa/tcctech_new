import React, { useCallback, useEffect, useState } from "react";

import Button from "@components/ui/button";
import ReactStars from "react-rating-stars-component";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { ProductDetailImage } from "@framework/types";
import { Grid } from "@mui/material";

import { CURRENCY } from "@utils/constants";
import { MdOutlineFavorite } from "react-icons/md";
import CONFIG_DATA from "../../../public/api/configrator.json";
import CenterDiamondShape from "@components/configrator/center-diamond-shape";
import CenterDiamondSize from "@components/configrator/center-diamond-size";
import MetalComponent from "@components/configrator/metal-component";
import RingCrownColor from "@components/configrator/ring-crown-color";
import RingStyleColor from "@components/configrator/ring-style-color";
import MatchingWeddingBand from "./matching-wedding-band";
import CenterGemstone from "@components/configrator/center-gemstone";
import RingHead from "@components/configrator/ring-head";
import SideSettings from "@components/configrator/side-setting";
import RingShank from "@components/configrator/ring-shank";
import MatchBandMetalTone from "@components/configrator/mech-band-metal-tone";
import CenterDiamond from "@components/configrator/center-diamond";
import RingCrown from "@components/configrator/ring-head";
import ConfigImage from "../../../public/api/configrator-image.json";
import RingSide from "@components/configrator/ring-side";
import RingStyle from "@components/configrator/ring-style";
import RingHeadStone from "@components/configrator/ring-head-stone";
import PeekabooShape from "@components/configrator/peekaboo-shape";
import SideCraving from "@components/configrator/side-craving";
import SideDiamond from "@components/configrator/side-diamond";

import mergeImages from "merge-images";
import FallbackSpinner from "@components/spinner";

const ProductSingleDetails: React.FC<{ configData: any }> = (props) => {
  const ImgUrl = process.env.NEXT_PUBLIC_IMG_URL + "products/configurator/";
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

  const DATA = props.configData;
  console.log("configData", DATA && DATA.diamondShapeList);

  const angles = ["FV", "PV", "RV", "T2V"];
  const anglesWB = ["RV", "TV"];
  const [selectedValue, setSelectedValue] = useState({
    CenterDiamondId: 1,
    CentreDiamondShapeId: 2,
    CentreDiamondSizeID: 2,
    RingHeadID: 1,
    RingShankID: 4,
    SideSettingID: 1,
    MetalComponentID: 1,
    RingCrownMetalID: 2,
    RingStyleMetalID: 2,
    RingBandStyleID: 1,
  });

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
      (t) => t.id === selectedValue.MetalComponentID
    );
    setMetalData(metalComponentID.length !== 0 && metalComponentID[0]);

    const ringCrownMetalID = CONFIG_DATA.ring_head_metal_tone.component.filter(
      (t) => t.id === selectedValue.RingCrownMetalID
    );
    setRingHeadTone(ringCrownMetalID.length !== 0 && ringCrownMetalID[0]);

    const ringStyleMetalID = CONFIG_DATA.ring_shank_metal_tone.component.filter(
      (t) => t.id === selectedValue.RingStyleMetalID
    );
    setRingShankTone(ringStyleMetalID.length !== 0 && ringStyleMetalID[0]);

    const RingBandStyleID = CONFIG_DATA.matching_wedding_band.component.filter(
      (t) => t.id === selectedValue.RingBandStyleID
    );
    setMatchingWeddingBand(RingBandStyleID.length !== 0 && RingBandStyleID[0]);
  }, [DATA]);

  const changeMainImage = useCallback((event: any) => {
    const selectedImgIndex = Number(
      event.target.getAttribute("id").replace("thumb_", "")
    );
    setImageIndex(selectedImgIndex);
  }, []);

  useEffect(() => {
    //Oval.1ct.classicsinglehalo.cathedral.plain
    //Shape = Oval
    //1 ct = CD ct
    //classicsinglehalo = Ring Head
    //cathedral = Shank Settings
    //plain = Ring Settings
    //Bend

    let folderName: any[] = [];
    if (diamondShape) {
      folderName.push(diamondShape.name);
    }

    if (diamondSize) {
      folderName.push(diamondSize.sort_code);
    }

    if (ringHead) {
      folderName.push(ringHead.design_identifier);
    }

    if (ringShank) {
      folderName.push(ringShank.design_identifier);
    }

    if (sideSettings) {
      folderName.push(sideSettings.design_identifier);
    }

    let finalFolderName = folderName.join(".");
    if (matchingWeddingBand && matchingWeddingBand.id === 2) {
      finalFolderName = finalFolderName + "-WB";
    }
    //DLG-HD-CR-15495-OVSH1.00-RG-RV-WB
    //DLG-HD-CR-15489-RDSH1.50-RG-RV-WB.png
    //DLG-HD-CR-15495 = SKU - IGNORE
    //OV =  Diamond Shape
    //SH = SINGLE HELO = Head
    //1.00 = Center Stone Karat
    //RG = Rose Gold = Metal
    //RV = Angle
    let headImageName: any[] = [];
    let shankImageName: any[] = [];
    let headImgName = finalFolderName.length > 0 ? finalFolderName + "/" : "";
    if (diamondShape) {
      headImgName = headImgName + diamondShape.sort_code;
    }

    if (ringHead) {
      headImgName = headImgName + ringHead.sort_code;
    }

    if (diamondSize) {
      headImgName = headImgName + diamondSize.name;
    }

    if (ringHeadTone) {
      headImgName = headImgName + "-" + ringHeadTone.sort_code;
    }

    if (matchingWeddingBand && matchingWeddingBand.id == 2) {
      //headImgName = headImgName + "-" + "WB";
      //Shank- Band
      if (headImgName.length > 0) {
        anglesWB.forEach((angle) => {
          headImageName.push(headImgName + "-" + angle + "-WB.png");
        });
      }
    } else {
      if (headImgName.length > 0) {
        angles.forEach((angle) => {
          headImageName.push(headImgName + "-" + angle + ".png");
        });
      }
    }

    let shankImgName = finalFolderName.length > 0 ? finalFolderName + "/" : "";

    //Image Format for Shank with Band
    // if (matchingWeddingBand && matchingWeddingBand.id == 2) {
    //   if (sideSettings) {
    //     shankImgName = shankImgName + sideSettings.sort_code;
    //   }

    //   if (ringHead) {
    //     shankImgName = shankImgName + "-" + ringHead.sort_code;
    //   }

    //   if (diamondShape) {
    //     shankImgName = shankImgName + "-" + diamondShape.sort_code;
    //   }

    //   if (diamondSize) {
    //     shankImgName = shankImgName + "-" + diamondSize.name;
    //   }

    //   if (ringShankTone) {
    //     shankImgName = shankImgName + "-" + ringShankTone.sort_code;
    //   }

    //   if (bandMetalTone) {
    //     shankImgName = shankImgName + "-" + bandMetalTone.sort_code;
    //   }
    //   if (shankImgName.length > 0) {
    //     anglesWB.forEach((angle) => {
    //       shankImageName.push(shankImgName + "-" + angle + "-WB.png");
    //     });
    //   }
    // } else {
    //   //Without Band
    //   if (ringShank) {
    //     shankImgName = shankImgName + "" + ringShank.sort_code;
    //   }

    //   if (sideSettings) {
    //     shankImgName = shankImgName + sideSettings.sort_code;
    //   }

    //   if (ringShankTone) {
    //     shankImgName = shankImgName + "-" + ringShankTone.sort_code;
    //   }
    //   if (shankImgName.length > 0) {
    //     angles.forEach((angle) => {
    //       shankImageName.push(shankImgName + "-" + angle + ".png");
    //     });
    //   }
    // }

    // if (shankImageName.length <= imageIndex) {
    //   setImageIndex(0);
    // }

    // let allPromises: any[] = [];
    // headImageName.forEach((t, index) => {
    //   const headImg = ImgUrl + headImageName[index];
    //   const shankImg = ImgUrl + shankImageName[index];

    //   allPromises.push(
    //     mergeImages([shankImg, headImg], { crossOrigin: "anonymous" })
    //   );
    // });

    // mergeAllImages(allPromises);
  }, [
    diamondShape,
    sideSettings,
    ringShank,
    ringHead,
    diamondSize,
    matchingWeddingBand,
    bandMetalTone,
    ringHeadTone,
    ringShankTone,
  ]);

  const mergeAllImages = async (arrPromises: any) => {
    const results = await Promise.all(arrPromises); // wait for both promise to complete
    setRingImages(results);
  };

  setTimeout(() => {
    setLoading(false);
  }, 0);

  console.log("srdtcfvgbhnjm,", centerDiamond);
  return (
    <>
      {isLoading ? (
        <FallbackSpinner />
      ) : (
        <div className="block lg:grid grid-cols-9 gap-x-10 xl:gap-x-14 pt-7 pb-10 lg:pb-14 2xl:pb-20 px-4 md:px-8 2xl:px-16 TCC-main-component">
          <div className="left col-span-5 grid grid-cols-2 gap-2.5 TCC-image-component px-4 md:px-8 2xl:px-16">
            {/* {ringImages?.map((item: ProductDetailImage, index: number) => {
          return (  
            <div
              key={index}
              className="col-span-1 transition duration-150 ease-in hover:opacity-90"
            >
              <img src={""} alt={""} className="object-cover w-full" />
            </div>
          );
        })} */}
            <div className="images w-full">
              {ringImages.map((item: any, index: any) => (
                <div
                  className="config-product-side-image mb-5 w-36"
                  key={index}
                >
                  <img
                    onClick={changeMainImage}
                    className={
                      index === imageIndex ? "activeImage" : "notActive"
                    }
                    src={`${item}`}
                    key={index}
                    id={`thumb_${index}`}
                    alt={"images"}
                  />
                </div>
              ))}
            </div>
            <div
              className="mainImage"
              // onMouseMove={zoom}
              style={{
                backgroundImage: `url(${ringImages[imageIndex]})`,
                // backgroundPosition: bgPosition,
              }}
            >
              <img
                src={`${ringImages[imageIndex]}`}
                crossOrigin="anonymous"
                alt="mainImage"
                id="mainImage"
                className="bg-gray-800"
              />
            </div>
          </div>

          {/* Side BAr Component */}
          {/*  Name  */}
          <div className="col-span-4 pt-8 lg:pt-0 TCC-dis-component" id="right">
            <div className="pb-7">
              <div className="flex">
                <h2 className="text-heading hover:text-black mb-3.5 TCC-product-detail-heading">
                  Product Name
                </h2>
              </div>

              {/* {/ Discription /} */}
              <p className="text-body TCC-product-detail-discription w-2/3">
                ProductData sort_description
              </p>
              <div></div>

              <div className="flex items-center mt-5">
                <div className="text-heading font-bold text-base md:text-xl lg:text-2xl 2xl:text-4xl pe-2 md:pe-0 lg:pe-2 2xl:pe-0">
                  <span className="TCC-product-text-diamond-shape ">
                    Price* : {CURRENCY}
                    {2344}
                  </span>
                </div>
              </div>
            </div>
            <div
              className="config-filter-content overflow-x-hidden overflow-y-auto mh-50 ml pe-5"
              style={{ height: 380 }}
            >
              {/* Config Component */}
              <CenterDiamond
                data={CONFIG_DATA.center_diamond}
                value={setCenterDiamond}
                selectedValue={centerDiamond}
              />
              <div className="border-b border-orange-300 my-3" />
              {centerDiamond?.sort_code == "G" && (
                <>
                  <CenterGemstone
                    data={DATA.gemstoneList}
                    value={setCenterGemstone}
                    filter={centerDiamond?.sort_code}
                    selectedValue={diamondShape}
                  />
                  <div className="border-b border-orange-300 my-3" />
                </>
              )}
              <CenterDiamondShape
                data={DATA.diamondShapeList}
                value={setDiamondShape}
                filter={centerDiamond?.sort_code}
                selectedValue={diamondShape}
              />
              <div className="border-b border-orange-300 my-3" />
              <CenterDiamondSize
                data={DATA.caratSizeList}
                value={setDiamondSize}
                selectedValue={diamondSize}
              />
              <div className="border-b border-orange-300 my-3" />
              <RingHead
                data={DATA.headList}
                value={setRingHead}
                selectedValue={ringHead}
              />
              <div className="border-b border-orange-300 my-3" />

              <RingShank
                data={DATA.shankList}
                value={setRingShank}
                selectedValue={ringShank}
              />
              <div className="border-b border-orange-300 my-3" />

              <SideSettings
                data={DATA.sideSettingStyle}
                value={setSideSettings}
                filter={ringShank?.id}
                selectedValue={sideSettings}
              />
              <div className="border-b border-orange-300 my-3" />
              <MetalComponent
                data={DATA.metalList}
                value={setMetalData}
                selectedValue={MetalData}
              />
              <div className="border-b border-orange-300 my-3" />
              {MetalData?.id_metal == 1 && (
                <>
                  <RingCrownColor
                    data={DATA.metalToneList}
                    value={setRingHeadTone}
                    selectedValue={ringHeadTone}
                  />
                  <div className="border-b border-orange-300 my-3" />
                </>
              )}
              {MetalData?.id_metal == 1 && (
                <>
                  <RingStyleColor
                    data={DATA.metalToneList}
                    value={setRingShankTone}
                    selectedValue={ringShankTone}
                  />
                  <div className="border-b border-orange-300 my-3" />
                </>
              )}

              <MatchingWeddingBand
                data={CONFIG_DATA.matching_wedding_band}
                selectedValue={matchingWeddingBand}
                value={setMatchingWeddingBand}
              />
              <div className="border-b border-orange-300 my-3" />
              {MetalData?.is_karat == 1 &&
                matchingWeddingBand?.id_metal_tone == 1 && (
                  <>
                    <MatchBandMetalTone
                      data={CONFIG_DATA.band_metal_tone}
                      value={setBandMetalTone}
                    />
                    <div className="border-b border-orange-300 my-3" />
                  </>
                )}

              {/* Ring Size */}
              <div className="mb-5 w-2/4">
                <span className="TCC-product-text-diamond-shape ">
                  Select Ring Size
                </span>
                <Dropdown className="w-2/4 mt-3" options={[]} value={"4"} />
              </div>
              {/*  Add to Cart Button  */}
              <div className="flex felx-cols mb-12 items-center">
                <Button
                  variant="slim"
                  className={`w-1/3 md:w-1/3  bg-[#DBB961] hover:bg-[#DBB961]`}
                >
                  <span className="py-2 3xl:px-8">ADD TO BAG</span>
                </Button>
                <div className="pl-4 cursor-pointer">
                  <div>
                    <MdOutlineFavorite
                      size={25}
                      color="red"
                      style={{ pointerEvents: "none" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductSingleDetails;
