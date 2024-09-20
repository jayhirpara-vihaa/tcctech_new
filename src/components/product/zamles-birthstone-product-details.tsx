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
    CubeNormalsCaptureHelper,
} from "webgi";
import BirthStoneThreeData from "@components/configrator/birth-stone-three";
import { useBirthstoneProductDetailQuery } from "src/framework/Birth-stone/get-birthstone-product-detail";
import Input from "@components/ui/input";
import { useShopifyAddCartBirsthStoneMutation } from "@framework/config-product-api/shopify-add-cart-birthstone";
import { Collapse } from "@components/common/accordioncommon";
import Dropdown from "@components/ui/dropdown";
import { useRingSize } from "@framework/product/get-all-ring-size";

const ZamlesBirthStoneProductDetails: React.FC = () => {
    const {
        query: { slug },
    } = useRouter();
    const router = useRouter();
    const { data: ringSizeData } = useRingSize();
    const sizeData = ringSizeData?.data?.item_size

    const birthStoneDetailData = DATA.productList.find((t: any) => t.slug == slug)
    useEffect(() => {
        if (!router.isReady) {
            return;
        }
    }, []);
    const [ringSizeId, setRingSizeId] = useState<any>();
    const [showModal, setShowModal] = React.useState(false);
    const webConfigBgColor = process.env.NEXT_PUBLIC_ZAMLES_BG_COLOR;
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
    const [gemstoneName1, setGemstoneName1] = useState<any>();
    const [gemstoneName2, setGemstoneName2] = useState<any>();
    const [gemstoneName3, setGemstoneName3] = useState<any>();
    const [gemstoneName4, setGemstoneName4] = useState<any>();
    const [gemstoneName5, setGemstoneName5] = useState<any>();
    const [gemstoneName6, setGemstoneName6] = useState<any>();
    const [gemstoneName7, setGemstoneName7] = useState<any>();
    const [gemstoneName8, setGemstoneName8] = useState<any>();
    const [gemstoneName9, setGemstoneName9] = useState<any>();
    const [gemstoneName10, setGemstoneName10] = useState<any>();

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
    const [glbName, setGlbName] = useState<any>()
    const [category, setCategory] = useState<any>("")
    const [expanded, setExapanded] = useState<any>()
    const [selectValue, setSelectValue] = useState<any>([])
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
        metalId: 2,
    });


    const [inputFieldsDiamond, setInputFieldsDiamond] = useState([{ id_stone: "", id_mm_size: null, id_cut: null, id_shape: null, }])
    const [selectedPluNumber, setSelectedPluNumber] = useState<any>({ pluNumber: "", price: "" })
    const { isAuthorized } = useUI();

    const [payload, setPayload] = useState({ slug: slug });
    const [authPayload, setAuthPayload] = useState({
        slug: slug,
    });
    const { data: productDescriptionData, mutate: fetchBirthstoneProductDetail } = useBirthstoneProductDetailQuery();
    const [selectedPriceValue, setSelectedPriceValue] = useState<any>();
    const [imageData, setImageData] = useState<any>();
    const [gemstoneCountData, setGemstoneCountData] = useState<any>([]);
    const [engravingDetailData, setEngravingDetailData] = useState<any>([]);
    const { data: addCartData, mutate: shopifyAddTocartBirthSTone } = useShopifyAddCartBirsthStoneMutation();
    const shopifyStroreUrl = process.env.NEXT_PUBLIC_SHOPIFY_STORE_URL
    const shopifyStroreKey = process.env.NEXT_PUBLIC_SHOPIFY_STORE_KEY

    useEffect(() => {
        fetchBirthstoneProductDetail(isAuthorized ? authPayload : payload)
    }, []);

    useEffect(() => {
        if (productDescriptionData?.data?.products?.product_number) {
            setGlbName(productDescriptionData?.data?.products?.product_number)
        }
        if (productDescriptionData?.data?.products?.birth_stone_product_categories) {
            const category = productDescriptionData?.data?.products?.birth_stone_product_categories;
            setCategory(category[0].category);
        }
        if (productDescriptionData?.data?.gemstone_count) {
            setGemstoneCountData(productDescriptionData?.data?.gemstone_count)
        }

        if (productDescriptionData?.data?.products?.engravings) {
            setEngravingDetailData(productDescriptionData?.data?.products?.engravings)
            const engravingData: any = []
            for (const value of productDescriptionData?.data?.products?.engravings) {
                engravingData.push({
                    id: value.id, text: value.text, value: '', max_text_count: value.max_text_count
                })
            };

            setEngravingName(engravingData)
        }
        setProductId(productDescriptionData?.data?.products?.id)
    }, [productDescriptionData?.data?.products])
    const addCartProducthandler = async () => {
        const snipper = viewer.getPlugin(CanvasSnipperPlugin);
        const file = await snipper.getFile();
        setImageData(file);
        // https://quickstart-3c059c30.myshopify.com/cart/add?id=${productVariantNumber ? productVariantNumber[0]?.value : 45981592420641}&quantity=${quntity}
    };


    useEffect(() => {
        if (imageData && imageData != "" && imageData != undefined)

            shopifyAddTocartBirthSTone({
                selected_metal: metalData?.id_karat ? metalToneData?.name.toLowerCase() : metalData?.name.toLowerCase(),
                product_details: productDescriptionData?.data?.products.birthstone_PMO.map((t: any) => {
                    if (t.id_karat) {
                        const data = {
                            option1: t.metal_tone_name.toLowerCase(),
                            price: t.price,
                            sku: t.plu_no
                        }

                        return data
                    } else {
                        if (t.metal_name == "silver") {
                            const data = {
                                option1: "sterling silver",
                                price: t.price,
                                sku: t.plu_no
                            }
                            return data

                        } else {
                            const data = {
                                option1: (t.metal_name).toLowerCase(),
                                price: t.price,
                                sku: t.plu_no
                            }
                            return data
                        }

                    }

                }),
                style_no: productDescriptionData?.data && productDescriptionData?.data?.products?.style_no,
                image: imageData,
                product_title: productDescriptionData?.data && productDescriptionData?.data?.products.name,
                sort_description: productDescriptionData?.data && productDescriptionData?.data?.products.sort_description,
                price: selectedPluNumber?.price,
                stone_1: gemStone1 && gemstoneCountData >= 1 ? `${gemStone1?.sort_code}-${gemstoneName1} ${gemStone1?.name}` : "-",
                stone_2: gemStone2 && gemstoneCountData >= 2 ? `${gemStone2?.sort_code}-${gemstoneName2} ${gemStone2?.name}` : "-",
                stone_3: gemStone3 && gemstoneCountData >= 3 ? `${gemStone3?.sort_code}-${gemstoneName3} ${gemStone3?.name}` : "-",
                stone_4: gemStone4 && gemstoneCountData >= 4 ? `${gemStone4?.sort_code}-${gemstoneName4} ${gemStone4?.name}` : "-",
                stone_5: gemStone5 && gemstoneCountData >= 5 ? `${gemStone5?.sort_code}-${gemstoneName5} ${gemStone5?.name}` : "-",
                stone_6: gemStone6 && gemstoneCountData >= 6 ? `${gemStone6?.sort_code}-${gemstoneName6} ${gemStone6?.name}` : "-",
                stone_7: gemStone7 && gemstoneCountData >= 7 ? `${gemStone7?.sort_code}-${gemstoneName7} ${gemStone7?.name}` : "-",
                stone_8: gemStone8 && gemstoneCountData >= 8 ? `${gemStone8?.sort_code}-${gemstoneName8} ${gemStone8?.name}` : "-",
                stone_9: gemStone9 && gemstoneCountData >= 9 ? `${gemStone9?.sort_code}-${gemstoneName9} ${gemStone9?.name}` : "-",
                stone_10: gemStone10 && gemstoneCountData >= 10 ? `${gemStone10?.sort_code}-${gemstoneName10} ${gemStone10?.name}` : "-",
                app_name: shopifyStroreKey,
            });
    }, [imageData]);
    useEffect(() => {
        let stoneList = []
        let engravingValueList = []

        for (let index = 0; index < productDescriptionData?.data?.products.gemstone_count; index++) {
            const data = index == 0 ? `&properties[Birthstone ${index + 1}]=${gemStone1?.name}` :
                index == 1 ? `&properties[Birthstone ${index + 1}]=${gemStone2?.name}` :
                    index == 2 ? `&properties[Birthstone ${index + 1}]=${gemStone3?.name}` :
                        index == 3 ? `&properties[Birthstone ${index + 1}]=${gemStone4?.name}` :
                            index == 4 ? `&properties[Birthstone ${index + 1}]=${gemStone5?.name}` :
                                index == 5 ? `&properties[Birthstone ${index + 1}]=${gemStone6?.name}` :
                                    index == 6 ? `&properties[Birthstone ${index + 1}]=${gemStone7?.name}` :
                                        index == 7 ? `&properties[Birthstone ${index + 1}]=${gemStone8?.name}` :
                                            index == 8 ? `&properties[Birthstone ${index + 1}]=${gemStone9?.name}` :
                                                index == 9 ? `&properties[Birthstone ${index + 1}]=${gemStone10?.name}` :
                                                    `&properties[Birthstone ${index + 1}]=${gemStone1?.name}`
            stoneList.push(data);
        }


        for (let index = 0; index < engravingName.length; index++) {
            const element = engravingName[index];
            const data = `&properties[Engraving ${index + 1}]=${element.value}`
            engravingValueList.push(data)
        }

        if (addCartData?.code == 200 && addCartData?.data) {
            setImageData("");

            if (productDescriptionData?.data?.products?.birth_stone_product_categories[0].category == "ring") {
                if (metalData.id_karat) {
                    window.location.assign(
                        `${shopifyStroreUrl}cart/add?id=${addCartData.data.variant_id}&quantity=1&properties[Ring Size]=${!ringSizeId && ringSizeId != undefined ? ringSizeId : sizeData && sizeData[0].size}${engravingValueList.map((t: any) => t)}${stoneList.map((t: any) => t)}`
                    );
                } else {
                    window.location.assign(
                        `${shopifyStroreUrl}cart/add?id=${addCartData.data.variant_id}&quantity=1&properties[Ring Size]=${!ringSizeId && ringSizeId != undefined ? ringSizeId : sizeData && sizeData[0].size}${engravingValueList.map((t: any) => t)}${stoneList.map((t: any) => t)}`
                    );
                }
            } else {
                if (metalData.id_karat) {
                    window.location.assign(
                        `${shopifyStroreUrl}cart/add?id=${addCartData.data.variant_id}&quantity=1${engravingValueList.map((t: any) => t)}${stoneList.map((t: any) => t)}`
                    );
                } else {
                    window.location.assign(
                        `${shopifyStroreUrl}cart/add?id=${addCartData.data.variant_id}&quantity=1${engravingValueList.map((t: any) => t)}${stoneList.map((t: any) => t)}`
                    );
                }
            }
        }
    }, [addCartData]);

    const dropdownRef = useRef(null);

    useEffect(() => {
        const selectedValueData: any = [{
            gemstoneType: 1,
            gemStoneId: gemStoneListData && gemStoneListData[0]?.gemstone[0]?.id ? gemStoneListData && gemStoneListData[0]?.gemstone[0]?.id : 59,
            twoGemStoneId: gemStoneListData && gemStoneListData[1]?.gemstone[0]?.id ? gemStoneListData && gemStoneListData[1]?.gemstone[0]?.id : 59,
            threeGemstoneId: gemStoneListData && gemStoneListData[2]?.gemstone[0]?.id ? gemStoneListData && gemStoneListData[2]?.gemstone[0]?.id : 59,
            fourGemstoneId: gemStoneListData && gemStoneListData[3]?.gemstone[0]?.id ? gemStoneListData && gemStoneListData[3]?.gemstone[0]?.id : 59,
            fiveGemstoneId: gemStoneListData && gemStoneListData[4]?.gemstone[0]?.id ? gemStoneListData && gemStoneListData[4]?.gemstone[0]?.id : 59,
            sixGemstoneId: gemStoneListData && gemStoneListData[5]?.gemstone[0]?.id ? gemStoneListData && gemStoneListData[5]?.gemstone[0]?.id : 59,
            sevenGemstoneId: gemStoneListData && gemStoneListData[6]?.gemstone[0]?.id ? gemStoneListData && gemStoneListData[6]?.gemstone[0]?.id : 59,
            eightGemstoneId: gemStoneListData && gemStoneListData[7]?.gemstone[0]?.id ? gemStoneListData && gemStoneListData[7]?.gemstone[0]?.id : 59,
            nineGemstoneId: gemStoneListData && gemStoneListData[8]?.gemstone[0]?.id ? gemStoneListData && gemStoneListData[8]?.gemstone[0]?.id : 59,
            tenGemstoneId: gemStoneListData && gemStoneListData[9]?.gemstone[0]?.id ? gemStoneListData && gemStoneListData[9]?.gemstone[0]?.id : 59,
            metalToneId: 46,
            metalId: productDescriptionData?.data?.metal_karat_list[1].id_metal,
        }]
        setSelectValue(selectedValueData)
    }, [gemStoneListData])

    useEffect(() => {
        const gemstoneList = []
        for (let i = 0; i < productDescriptionData?.data?.gemstone_count; i++) {
            gemstoneList.push({
                title: `Birthstone ${i + 1}`,
                gemstone: productDescriptionData?.data?.Gemstone.filter((t: any) => t.gemstone_type == null),
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
        const birthstone = productDescriptionData?.data?.products?.birthstone_PDO.map((value: any) => {
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
                data[8].id_stone = gemStone9.id
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
                data[8].id_stone = gemStone9.id
                setInputFieldsDiamond(data)
            } if (gemStone10) {
                const data = [...inputFieldsDiamond]
                data[9].id_stone = gemStone10.id
                setInputFieldsDiamond(data)
            }
        }
    }, [gemstoneCountData, gemStone1, gemStone2, gemStone3, gemStone4, gemStone5, gemStone6, gemStone7, gemStone8, gemStone9, gemStone10])

    useEffect(() => {
        if (productId) {
            setSelectedPriceValue({
                id_product: productId,
                metal: metalData && metalData.id_metal ? metalData.id_metal : null,
                karat: metalData && metalData.id_karat ? metalData.id_karat : null,
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
        }

    }, [productId,
        productDescriptionData,
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
    useEffect(() => {
        if (gemStone1 && gemStone1?.sort_code == "May" || gemStone1?.sort_code == "July" || gemStone1?.sort_code == "September") {
            setGemstoneName1("Created");
        } else {
            setGemstoneName1("");
        }
    }, [gemStone1])

    useEffect(() => {
        if (gemStone2 && gemStone2?.sort_code == "May" || gemStone2?.sort_code == "July" || gemStone2?.sort_code == "September") {
            setGemstoneName2("Created");
        } else {
            setGemstoneName2("");
        }
    }, [gemStone2])

    useEffect(() => {
        if (gemStone3 && gemStone3?.sort_code == "May" || gemStone3?.sort_code == "July" || gemStone3?.sort_code == "September") {
            setGemstoneName3("Created");
        } else {
            setGemstoneName3("");
        }
    }, [gemStone3])

    useEffect(() => {
        if (gemStone4 && gemStone4?.sort_code == "May" || gemStone4?.sort_code == "July" || gemStone4?.sort_code == "September") {
            setGemstoneName4("Created");
        } else {
            setGemstoneName4("");
        }
    }, [gemStone4])

    useEffect(() => {
        if (gemStone5 && gemStone5?.sort_code == "May" || gemStone5?.sort_code == "July" || gemStone5?.sort_code == "September") {
            setGemstoneName5("Created");
        } else {
            setGemstoneName5("");
        }
    }, [gemStone5])

    useEffect(() => {
        if (gemStone6 && gemStone6?.sort_code == "May" || gemStone6?.sort_code == "July" || gemStone6?.sort_code == "September") {
            setGemstoneName6("Created");
        } else {
            setGemstoneName6("");
        }
    }, [gemStone6])

    useEffect(() => {
        if (gemStone7 && gemStone7?.sort_code == "May" || gemStone7?.sort_code == "July" || gemStone7?.sort_code == "September") {
            setGemstoneName7("Created");
        } else {
            setGemstoneName7("");
        }
    }, [gemStone7])

    useEffect(() => {
        if (gemStone8 && gemStone8?.sort_code == "May" || gemStone8?.sort_code == "July" || gemStone8?.sort_code == "September") {
            setGemstoneName8("Created");
        } else {
            setGemstoneName8("");
        }
    }, [gemStone8])

    useEffect(() => {
        if (gemStone9 && gemStone9?.sort_code == "May" || gemStone9?.sort_code == "July" || gemStone9?.sort_code == "September") {
            setGemstoneName9("Created");
        } else {
            setGemstoneName9("");
        }
    }, [gemStone9])

    useEffect(() => {
        if (gemStone10 && gemStone10?.sort_code == "May" || gemStone10?.sort_code == "July" || gemStone10?.sort_code == "September") {
            setGemstoneName10("Created");
        } else {
            setGemstoneName10("");
        }
    }, [gemStone10])

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

    const handleBGChange = async (checkValue: boolean) => {
        setIsBgChecked(checkValue);
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
        await snipper.downloadSnapshot("image.png", {
            waitForProgressive: true, // download anti-aliased image
            displayPixelRatio: scale,
        });
        await timeout(1000);
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

    // ************ VIEWVIER_CONTROLLER

    useEffect(() => {
        const gemstoneTypeId = CONFIG_DATA.gemstone_type.component.filter((t: any) => t.id == selectedValue.gemstoneType)
        setGemstoneType(gemstoneTypeId?.[0])
    }, [])

    useEffect(() => {

        const metalData1 = productDescriptionData?.data?.metal_karat_list.filter((t: any) => t.id_metal == selectValue[0].metalId)
        setMetalData(metalData1?.[0])

        const gemStoneDataId = productDescriptionData?.data?.Gemstone.filter((value: any) => value.id == selectValue[0]?.gemStoneId)
        setGemStone1(gemStoneDataId?.length !== 0 && gemStoneDataId?.[0]);

        const gemStoneId2 = productDescriptionData?.data?.Gemstone.filter((value: any) => value.id == selectValue[0]?.twoGemStoneId)
        setGemStone2(gemStoneId2?.length !== 0 && gemStoneId2?.[0]);

        const gemStoneId3 = productDescriptionData?.data?.Gemstone.filter((value: any) => value.id == selectValue[0]?.threeGemstoneId)
        setGemStone3(gemStoneId3?.length !== 0 && gemStoneId3?.[0]);

        const gemStoneId4 = productDescriptionData?.data?.Gemstone.filter((value: any) => value.id == selectValue[0]?.fourGemstoneId)
        setGemStone4(gemStoneId4?.length !== 0 && gemStoneId4?.[0]);

        const gemStoneId5 = productDescriptionData?.data?.Gemstone.filter((value: any) => value.id == selectValue[0]?.fiveGemstoneId)

        setGemStone5(gemStoneId5?.length !== 0 && gemStoneId5?.[0]);
        const gemStoneId6 = productDescriptionData?.data?.Gemstone.filter((value: any) => value.id == selectValue[0]?.sixGemstoneId)
        setGemStone6(gemStoneId5?.length !== 0 && gemStoneId6?.[0]);
        const gemStoneId7 = productDescriptionData?.data?.Gemstone.filter((value: any) => value.id == selectValue[0]?.sevenGemstoneId)
        setGemStone7(gemStoneId5?.length !== 0 && gemStoneId7?.[0]);
        const gemStoneId8 = productDescriptionData?.data?.Gemstone.filter((value: any) => value.id == selectValue[0]?.eightGemstoneId)
        setGemStone8(gemStoneId5?.length !== 0 && gemStoneId8?.[0]);
        const gemStoneId9 = productDescriptionData?.data?.Gemstone.filter((value: any) => value.id == selectValue[0]?.nineGemstoneId)
        setGemStone9(gemStoneId5?.length !== 0 && gemStoneId9?.[0]);
        const gemStoneId10 = productDescriptionData?.data?.Gemstone.filter((value: any) => value.id == selectValue[0]?.tenGemstoneId)
        setGemStone10(gemStoneId5?.length !== 0 && gemStoneId10?.[0]);
        const metaToneIdE = productDescriptionData?.data?.metal_tone.filter((t: any) => t.id == selectValue[0].metalToneId)
        setMetalToneData(metaToneIdE?.[0])
    }, [productDescriptionData, gemStoneListData, selectValue[0]])

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
    }, [selectValue[0]]);

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
        //await viewer.addPlugin(ParallaxMappingPlugin);


        viewer.renderer.refreshPipeline();
        const options = { autoScale: false, autoCenter: false, useRgbm: true };
        viewer.enable = false;
        viewer.renderEnabled = false;
        CubeNormalsCaptureHelper.AutoDisposeTargets = false;
        const glbPath = imageUrl.replace("static", "birthstone_6")
        await manager.addFromPath(`${glbPath}${glbName && glbName}.glb`, options);
        await manager.addFromPath(`${glbPath}${glbName && glbName}-UV.glb`, options);
        //await manager.addFromPath("/assets/VM-RN-R-33331.glb", options);
        //await manager.addFromPath("/assets/VM-PD-R-38733-UV.glb", options);

        if (category && category.includes("ring")) {
            await manager.addFromPath(`${imageUrl}config_tcc.vjson`);
        } else {
            await manager.addFromPath(`${imageUrl}config_birthstone_pendant.vjson`);
        }

        await manager.addFromPath("/assets/preset.CameraViews.json");
        //viewer.enable = true;
        //viewer.renderEnabled = true;
        //viewer.scene.setDirty({ sceneUpdate: true });
        setMaterial();
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
                            dmatName = index == 0 ? gemStone1?.sort_code == 'October' ? gemStone1?.sort_code + ".pmat" : gemStone1?.sort_code + extension :
                                index == 1 ? gemStone2?.sort_code == 'October' ? gemStone2?.sort_code + ".pmat" : gemStone2?.sort_code + extension :
                                    index == 2 ? gemStone3?.sort_code == 'October' ? gemStone3?.sort_code + ".pmat" : gemStone3?.sort_code + extension :
                                        index == 3 ? gemStone4?.sort_code == 'October' ? gemStone4?.sort_code + ".pmat" : gemStone4?.sort_code + extension :
                                            index == 4 ? gemStone5?.sort_code == 'October' ? gemStone5?.sort_code + ".pmat" : gemStone5?.sort_code + extension :
                                                index == 5 ? gemStone6?.sort_code == 'October' ? gemStone6?.sort_code + ".pmat" : gemStone6?.sort_code + extension :
                                                    index == 6 ? gemStone7?.sort_code == 'October' ? gemStone7?.sort_code + ".pmat" : gemStone7?.sort_code + extension :
                                                        index == 7 ? gemStone8?.sort_code == 'October' ? gemStone8?.sort_code + ".pmat" : gemStone8?.sort_code + extension :
                                                            index == 8 ? gemStone9?.sort_code == 'October' ? gemStone9?.sort_code + ".pmat" : gemStone9?.sort_code + extension :
                                                                index == 9 ? gemStone10?.sort_code == 'October' ? gemStone10?.sort_code + ".pmat" : gemStone10?.sort_code + extension :
                                                                    gemStone1?.sort_code == 'October' ? gemStone1?.sort_code + ".pmat" : gemStone1?.sort_code + extension
                                ;
                            cacheKey = index == 0 ? gemStone1?.sort_code == 'October' ? gemStone1?.sort_code + ".pmat" : gemStone1?.sort_code + extension :
                                index == 1 ? gemStone2?.sort_code == 'October' ? gemStone2?.sort_code + ".pmat" : gemStone2?.sort_code + extension :
                                    index == 2 ? gemStone3?.sort_code == 'October' ? gemStone3?.sort_code + ".pmat" : gemStone3?.sort_code + extension :
                                        index == 3 ? gemStone4?.sort_code == 'October' ? gemStone4?.sort_code + ".pmat" : gemStone4?.sort_code + extension :
                                            index == 4 ? gemStone5?.sort_code == 'October' ? gemStone5?.sort_code + ".pmat" : gemStone5?.sort_code + extension :
                                                index == 5 ? gemStone6?.sort_code == 'October' ? gemStone6?.sort_code + ".pmat" : gemStone6?.sort_code + extension :
                                                    index == 6 ? gemStone7?.sort_code == 'October' ? gemStone7?.sort_code + ".pmat" : gemStone7?.sort_code + extension :
                                                        index == 7 ? gemStone8?.sort_code == 'October' ? gemStone8?.sort_code + ".pmat" : gemStone8?.sort_code + extension :
                                                            index == 8 ? gemStone9?.sort_code == 'October' ? gemStone9?.sort_code + ".pmat" : gemStone9?.sort_code + extension :
                                                                index == 9 ? gemStone10?.sort_code == 'October' ? gemStone10?.sort_code + ".pmat" : gemStone10?.sort_code + extension :
                                                                    gemStone1?.sort_code == 'October' ? gemStone1?.sort_code + ".pmat" : gemStone1?.sort_code + extension;


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
    }, [gemStone1, gemStone2, gemStone3, gemStone4, gemStone5, gemStone6, gemStone7, gemStone8, gemStone9, gemStone10, metalToneData, metalData, gemStoneListData])

    const handleEngravingText = async (value: any, index: number) => {
        const text = viewer.getPlugin(SimpleTextPlugin);

        text.applyToAlphaMap = true;
        //text.applyToBumpMap = true;
        text.applyToMap = true;
        text.inverseAlphaMap = true;

        const state = {
            text: value,
            // fontSize: 400,
            // rest of the text properties are saved in the GLB file.
        };
        // const engraving = [...engravingName];
        // engraving[index - 1].value = e.target.value;
        // setEngravingName(engraving);
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
    useEffect(() => {
        let pluNumberFind
        if (metalData?.id_karat && metalData) {

            pluNumberFind = productDescriptionData?.data?.products?.birthstone_PMO?.find((t: any) => t.id_metal == metalData?.id_metal && t.id_karat == metalData?.id_karat && t.id_metal_tone == metalToneData?.id)

        } else if (!metalData?.id_karat && metalData) {
            pluNumberFind = productDescriptionData?.data?.products?.birthstone_PMO?.find((t: any) => t.id_metal == metalData?.id_metal)
        }

        if (pluNumberFind) {
            setSelectedPluNumber({ pluNumber: pluNumberFind.plu_no, price: pluNumberFind.price })
        }

    }, [metalData, metalToneData])

    return (
        <>
            <div className="grid lg:grid-cols-6 grid-cols-0 md:grid-cols-0 flex flex-wrap">
                <div
                    className={`lg:col-span-4 col-span-2 md:col-span-2 relative xl:mt-[8px] lg:mt-[118px]`}
                >
                    {isFullScreen ?
                        <></> :
                        <button
                            className="absolute flex bg-[#43464a] mt-[73px] opacity-90 text-white cursor-pointer items-center border border-2  rounded-full border-neutral-600 py-1 px-3 lg:hidden lg:left-44 md:left-8 left-8 rounded"
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
                                &nbsp;{CURRENCY}{selectedPluNumber &&
                                    selectedPluNumber.price &&
                                    selectedPluNumber.price?.toFixed(2)}
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
                                        className="w-full lg:h-full lg:w-full h-[380px] md:pt-[61px] sm:pt-[61px] pt-[61px] lg:pt-0"
                                    ></canvas>
                                ) : (
                                    <canvas
                                        id="webgi-canvas"
                                        className="w-full lg:h-full lg:w-full h-[450px] md:pt-[61px] sm:pt-[61px] pt-[61px] lg:pt-0"
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
                            <div className="floating-buttons topright lg:mt-[17px] mt-[-3.875rem] md:mt-[55px] sm:mt-[55px]">
                                <Button
                                    style={{ background: webConfigBgColor, width: "20px" }}
                                    className="rounded lg:px-6"
                                    id="enter-fullscreen"
                                    onClick={handleFullScreen}
                                >
                                    <span>
                                        <MdOutlineZoomOutMap height="30" width="30" />
                                    </span>
                                </Button>
                            </div>
                            <button
                                className="absolute lg:top-[36px] md:top-[36px] top-[71px] p-2 lg:right-[9%] md:right-[7%] right-[53px]"
                                onClick={() => setShareClick(!shareClick)}
                            >
                                <img
                                    src={"/assets/TCCimage/share-icon.png"}
                                    alt={`share`}
                                    className="object-cover w-6 h-6"
                                />
                            </button>
                            {shareClick && (
                                <div className="gap-5 absolute lg:top-[17%] top-[28%] lg:right-0 right-0 md:right-0 p-2">
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
                                    &nbsp;{" "}
                                    <span className="hidden md:hidden lg:visible sm:flex lg:flex">Download Video</span>
                                    {/* &nbsp;Download Video */}
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
                                                        onClick={() => {
                                                            handleCameraViews("1")
                                                            handleDropdownToggle1()
                                                        }}
                                                    >
                                                        Perspective View
                                                    </button>
                                                </div>
                                                <div>
                                                    <button
                                                        className="py-1"
                                                        onClick={() => {
                                                            handleDropdownToggle1()
                                                            handleCameraViews("2")
                                                        }}
                                                    >
                                                        Top View
                                                    </button>
                                                </div>
                                                <div>
                                                    <button
                                                        className="py-1"
                                                        onClick={() => {
                                                            handleDropdownToggle1()
                                                            handleCameraViews("3")
                                                        }}
                                                    >
                                                        Right View
                                                    </button>
                                                </div>
                                                <div>
                                                    <button
                                                        className="py-1"
                                                        onClick={() => {
                                                            handleDropdownToggle1()
                                                            handleCameraViews("0")
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
                                        <span className="hidden sm:flex md:hidden lg:flex">Download Image</span>
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
                            <div className="relative w-full my-6 mx-5 lg:mx-auto max-w-3xl xl:mt-[8px] lg:mt-[118px]">
                                <div className="border-0 rounded-lg shadow-lg px-5 relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    <div className="flex pl-0 items-start justify-between p-5 pb-2 pe-2 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="text-3xl font-semibold">
                                            {" "}
                                            <h3 className="font-bold">
                                                {productDescriptionData?.data?.products?.name}
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
                                                        PLU: {selectedPluNumber.pluNumber}
                                                    </p>
                                                </p>
                                            </div>
                                            <div className="mt-2">
                                                <p className="mb-0">
                                                    {" "}
                                                    <p className="text-body TCC-product-detail-discription">
                                                        {productDescriptionData?.data?.products?.long_description}
                                                    </p>
                                                </p>


                                            </div>
                                        </div>
                                        <div id="price_id " className="px-5 pl-0">
                                            <div className="">
                                                <p className="text_size_16 font-bold pb-4 mt-5">
                                                    <span>
                                                        {CURRENCY}{" "}
                                                        {selectedPluNumber &&
                                                            selectedPluNumber.price &&
                                                            selectedPluNumber.price?.toFixed(2)}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className={`bg-gray-300 text-black text-white active:bg-green-600 font-bold uppercase text-sm px-8 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 mr-1 ease-linear transition-all duration-150`}
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Close
                                        </button>
                                        <button
                                            style={{ background: webConfigBgColor }}
                                            className="text-white active:bg-green-600 font-bold uppercase text-sm px-10 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-[-20px] mb-1 ease-linear transition-all duration-150"
                                        >
                                            BUY
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : <></>}
                <div className="lg:col-span-2 col-span-2 lg:pl-[15px] pe-0 lg:mt-[118px] xl:mt-[0px]">
                    <div className="lg:visible hidden lg:block md:invisible">
                        <h1 className="text-black feijoa-bold product-title lg:mt-[35px]">{productDescriptionData?.data?.products?.name}</h1>
                        <small style={{ color: `${webConfigBgColor}` }} className="flex w-100">PLU: {selectedPluNumber.pluNumber}</small>
                        <p className="text-black birthtone-tab-font font-semibold font-feijoa mt-[10px]">
                            <span
                                className="birthtone-tab-font font-feijoa text-black"
                            >
                                {CURRENCY}{" "}
                                {selectedPluNumber &&
                                    selectedPluNumber.price &&
                                    selectedPluNumber.price?.toFixed(2)}
                            </span>
                        </p>

                    </div>
                    <div className="lg:mt-0 mt-[17px]">
                        {/* Tabs */}
                        {engravingName && engravingName.length == 0 ?
                            <></>
                            :
                            <>
                                <div className="flex">
                                    {tabs.map((tab, index) => (
                                        <>
                                            <button
                                                key={index}
                                                onClick={() => handleTabClick(index)}
                                                className={`${activeTab === index
                                                    ? `text-[#e81976]`
                                                    : ""
                                                    } config-tab-vertical-border py-2 w-1/2 focus:outline-none birthtone-tab-font feijoa`}
                                            >
                                                {tab.label}
                                            </button>
                                        </>
                                    ))}
                                </div>
                                <div className="border-b border-gray-300 my-5" />
                            </>
                        }
                        {/* Tabs Content */}
                        <div
                            className="overflow-x-hidden overflow-y-auto lg:pr-[15px] pr-0"
                            style={engravingName.length == 0 ? { height: height - 300 } : { height: height - 360 }}
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
                                                selectedValue1={{ gemstone: gemStone1, name: `${gemStone1?.sort_code} ${gemstoneName1} ${gemStone1?.name}` }}
                                                selectedValue2={{ gemstone: gemStone2, name: `${gemStone2?.sort_code} ${gemstoneName2} ${gemStone2?.name}` }}
                                                selectedValue3={{ gemstone: gemStone3, name: `${gemStone3?.sort_code} ${gemstoneName3} ${gemStone3?.name}` }}
                                                selectedValue4={{ gemstone: gemStone4, name: `${gemStone4?.sort_code} ${gemstoneName4} ${gemStone4?.name}` }}
                                                selectedValue5={{ gemstone: gemStone5, name: `${gemStone5?.sort_code} ${gemstoneName5} ${gemStone5?.name}` }}
                                                selectedValue6={{ gemstone: gemStone6, name: `${gemStone6?.sort_code} ${gemstoneName6} ${gemStone6?.name}` }}
                                                selectedValue7={{ gemstone: gemStone7, name: `${gemStone7?.sort_code} ${gemstoneName7} ${gemStone7?.name}` }}
                                                selectedValue8={{ gemstone: gemStone8, name: `${gemStone8?.sort_code} ${gemstoneName8} ${gemStone8?.name}` }}
                                                selectedValue9={{ gemstone: gemStone9, name: `${gemStone9?.sort_code} ${gemstoneName9} ${gemStone5?.name}` }}
                                                selectedValue10={{ gemstone: gemStone10, name: `${gemStone10?.sort_code} ${gemstoneName10} ${gemStone10?.name}` }}
                                            />
                                        </div>
                                    ) : (
                                        <div>
                                            {/* <BirthStoneInscriptionData
                                                webConfigBgColor={{ webConfigBgColor, borderColor: 'config-birthstone-select-value' }}
                                                handleEngravingText={handleEngravingText}
                                                data={engravingName}
                                            /> */}
                                            {engravingName && engravingName.map((input: any, index: any) => {
                                                return (
                                                    <>
                                                        <div className="mt-2">
                                                            <div className="flex lg:mx-0 mx-5 md:mx-5 sm:mx-5 items-center text-black zamels-birthstonetablocal-font feijoa">{`Engraving ${index + 1}`}: </div>
                                                            <div className="flex lg:mx-0 mx-5 md:mx-5 sm:mx-5">
                                                                <Input
                                                                    style={{ borderRadius: "3px", width: "100%", height: "30px" }}
                                                                    name="value"
                                                                    id="Inscription1"
                                                                    className="w-full mt-1"
                                                                    variant="solid"
                                                                    // placeholder={input.text}
                                                                    maxLength={input.max_text_count}
                                                                    value={input.value}
                                                                    onChange={(e: any) => {
                                                                        const data = [...engravingName]
                                                                        data[index].value = e.target.value
                                                                        setEngravingName(data)
                                                                        handleEngravingText(e.target.value, index + 1)
                                                                    }
                                                                    }
                                                                />
                                                                <p className="mt-2 ml-3">{input.value.length}/{input.max_text_count}</p>

                                                            </div>
                                                        </div>
                                                    </>

                                                )
                                            })}

                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="mt-6 w-full">
                                <BirthStoneMetalData
                                    webConfigBgColor={{ webConfigBgColor, borderColor: 'birthstone-tone-config' }}
                                    data={productDescriptionData?.data?.metal_karat_list}
                                    value={setMetalData}
                                    selectedValue={metalData}
                                    onChange={(e: any) => setMetalData(e.target.value)}
                                />
                            </div>
                            <div className="mt-6 w-full">
                                {metalData?.id_karat ?
                                    <BirthStoneToneData
                                        webConfigBgColor={{ webConfigBgColor, borderColor: 'birthstone-tone-config' }}
                                        data={productDescriptionData?.data?.metal_tone}
                                        value={setMetalToneData}
                                        selectedValue={metalToneData}
                                    /> : <></>
                                }
                            </div>
                            {productDescriptionData?.data?.products?.birth_stone_product_categories[0].category == "ring" ?
                                <div className="mt-6 md:mx-5 mx-5 lg:mx-0">
                                    <h2 className="text-black zamels-birthstonetablocal-font feijoa">Ring Size :</h2>
                                    <select
                                        className="mb-dropdown border border-gray-300 rounded h-12 mr-2 w-full"
                                        name="Ring Size"
                                        id="ringsizeid"
                                        value={ringSizeId}
                                        onChange={(e) => setRingSizeId(e.target.value)}
                                    >
                                        {sizeData?.map((t: any) => {
                                            return <option value={t.size}> {t.size} </option>;
                                        })}
                                    </select>
                                </div>
                                :
                                <></>
                            }

                            <div className="mt-6 w-full lg:mx-0 mx-5 md:mx-5 sm:mx-5">
                                <CheckBox
                                    labelKey="Transparent Background"
                                    onChange={() => handleBGChange(!isBgChecked)}
                                />
                            </div>


                            <div className="mb-6 mt-6 flex lg:mx-0 mx-5 md:mx-5 sm:mx-5">
                                <button
                                    style={{ background: `${webConfigBgColor}`, height: "32px" }}
                                    className={`w-1/3 md:w-1/3 rounded`}
                                    onClick={async () => {
                                        if (productDescriptionData?.data?.products?.birth_stone_product_categories[0].category == "ring") {
                                            await handleCameraViews("1")
                                            await handleBGChange(true)
                                            for (let index = 0; index < engravingName.length; index++) {
                                                const element = engravingName[index];

                                                await handleEngravingText("", index + 1)
                                            }
                                        } else {
                                            await handleCameraViews("0")
                                            await handleBGChange(true)

                                            for (let index = 0; index < engravingName.length; index++) {
                                                const element = engravingName[index];

                                                await handleEngravingText("", index + 1)
                                            }
                                        }
                                        await addCartProducthandler()
                                    }
                                    }
                                >
                                    <span className="py-2 3xl:px-8 text-white">ADD TO BAG</span>
                                </button>
                                {/* <MdOutlineFavorite
                                    size={20}
                                    color="red"
                                    style={{ pointerEvents: "none", marginLeft: "5px", marginTop: "5px" }}
                                /> */}

                            </div>

                            <div className="mt-5 mb-4 lg:mx-0 mx-[20px] lg:mb-4">
                                <Collapse
                                    i={0}
                                    title={"Product Preview"}
                                    translatorNS="review"
                                    content={
                                        <div className="text-[#6C6C6C]">
                                            {gemStoneListData && gemStoneListData.map((value: any, index: any) => {
                                                return (
                                                    <div className="flex justify-between mb-4">
                                                        <div className="ProximaNova-Regular">{value.title}</div>
                                                        <div className="ProximaNova-Regular text-black">{index == 0 ? (gemStone1 && gemStone1?.sort_code == "May" || gemStone1?.sort_code == "July" || gemStone1?.sort_code == "September") ? `${gemStone1?.sort_code} ${gemstoneName1} ${gemStone1?.name}` : `${gemStone1?.sort_code} ${gemStone1?.name}` :
                                                            index == 1 ? (gemStone2 && gemStone2?.sort_code == "May" || gemStone2?.sort_code == "July" || gemStone2?.sort_code == "September") ? `${gemStone2?.sort_code} ${gemstoneName2} ${gemStone2?.name}` : `${gemStone2?.sort_code} ${gemStone2?.name}` :
                                                                index == 2 ? (gemStone3 && gemStone3?.sort_code == "May" || gemStone3?.sort_code == "July" || gemStone3?.sort_code == "September") ? `${gemStone3?.sort_code} ${gemstoneName3} ${gemStone3?.name}` : `${gemStone3?.sort_code} ${gemStone3?.name}` :
                                                                    index == 3 ? (gemStone4 && gemStone4?.sort_code == "May" || gemStone4?.sort_code == "July" || gemStone4?.sort_code == "September") ? `${gemStone4?.sort_code} ${gemstoneName4} ${gemStone4?.name}` : `${gemStone4?.sort_code} ${gemStone4?.name}` :
                                                                        index == 4 ? (gemStone5 && gemStone5?.sort_code == "May" || gemStone5?.sort_code == "July" || gemStone5?.sort_code == "September") ? `${gemStone5?.sort_code} ${gemstoneName5} ${gemStone5?.name}` : `${gemStone5?.sort_code} ${gemStone5?.name}` :
                                                                            index == 5 ? (gemStone6 && gemStone6?.sort_code == "May" || gemStone6?.sort_code == "July" || gemStone6?.sort_code == "September") ? `${gemStone6?.sort_code} ${gemstoneName6} ${gemStone6?.name}` : `${gemStone6?.sort_code} ${gemStone6?.name}` :
                                                                                index == 6 ? (gemStone7 && gemStone7?.sort_code == "May" || gemStone7?.sort_code == "July" || gemStone7?.sort_code == "September") ? `${gemStone7?.sort_code} ${gemstoneName7} ${gemStone7?.name}` : `${gemStone7?.sort_code} ${gemStone7?.name}` :
                                                                                    index == 7 ? (gemStone8 && gemStone8?.sort_code == "May" || gemStone8?.sort_code == "July" || gemStone8?.sort_code == "September") ? `${gemStone8?.sort_code} ${gemstoneName8} ${gemStone8?.name}` : `${gemStone8?.sort_code} ${gemStone8?.name}` :
                                                                                        index == 8 ? (gemStone9 && gemStone9?.sort_code == "May" || gemStone9?.sort_code == "July" || gemStone9?.sort_code == "September") ? `${gemStone9?.sort_code} ${gemstoneName9} ${gemStone8?.name}` : `${gemStone9?.sort_code} ${gemStone9?.name}` :
                                                                                            index == 9 ? (gemStone10 && gemStone10?.sort_code == "May" || gemStone10?.sort_code == "July" || gemStone10?.sort_code == "September") ? `${gemStone10?.sort_code} ${gemstoneName10} ${gemStone10?.name}` : `${gemStone10?.sort_code} ${gemStone10?.name}` :
                                                                                                gemStone1?.sort_code}
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                            <div className="flex justify-between mb-4">
                                                <div className="ProximaNova-Regular">Metal</div>
                                                <div className="ProximaNova-Regular text-black">{metalData?.slug}</div>
                                            </div>
                                            {metalData?.slug == "Sterling Silver" ? <></> :
                                                <div className="flex justify-between mb-4">
                                                    <div className="ProximaNova-Regular">Metal Tone</div>
                                                    <div className="ProximaNova-Regular text-black">{metalToneData?.name}</div>
                                                </div>
                                            }
                                            {engravingName && engravingName.map((t: any, index: any) => {
                                                return (
                                                    <div className="flex justify-between">
                                                        <div className="ProximaNova-Regular">{`Engraving ${index + 1}`}</div>
                                                        <div className="ProximaNova-Regular text-black">{t.value}</div>
                                                    </div>
                                                )
                                            })}
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
            </div>
        </>
    );
};

export default ZamlesBirthStoneProductDetails;
