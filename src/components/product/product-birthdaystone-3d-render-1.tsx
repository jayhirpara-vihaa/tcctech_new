import BirthStoneData from "@components/configrator/birth-stone";
import React, { useState } from "react";
import { MdOutlineFavorite, MdOutlineZoomOut } from "react-icons/md";
import ReactStars from "react-rating-stars-component";
import DATA from "../../../public/api/birth-stone.json";
import BirthStoneToneData from "@components/configrator/birthstone-tone";
import BirthStoneMetalData from "@components/configrator/birthstone-metal";
import BirthStoneInscriptionData from "@components/configrator/birthstone-inscription";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { CURRENCY } from "@utils/constants";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";
import Accordion from "@components/common/accordion";



const ProductBirthdayStone3DRenderLocal1: React.FC = () => {
    const webConfigBgColor = process.env.NEXT_PUBLIC_BIRTHSTONE_TWO_COLOR;
    const [activeTab, setActiveTab] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [showModal, setShowModal] = React.useState(false);
    const [shareClick, setShareClick] = useState(false);
    const [accordionOpen, setAccordionOpen] = useState('1');

    const accordionToggle = (id: any) => {
        if (accordionOpen === id) {
            setAccordionOpen('');
        } else {
            setAccordionOpen(id);
        }
    };

    const handleTabClick = (index: any) => {
        setActiveTab(index);
    };

    const tabs = [
        {
            label: 'Birthstone',
        },
        {
            label: 'Inscription',
        },
    ];

    return (
        <>
            <div className="grid lg:grid-cols-6 grid-cols-0 md:grid-cols-0 flex flex-wrap">
                <div className="lg:col-span-4 col-span-2 md:col-span-2">
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
                            <p className="f-bold">
                                &nbsp;{CURRENCY}{" "}
                                19777
                            </p>
                        </button>
                        <img
                            src="../../birthstone.png"
                            alt="diamond image"
                            className="lg:h-[550px] lg:w-[60%] w-full h-[430px] md:w-[60%] md:h-[60%]"
                        />
                        <div>
                            <button
                                className="absolute lg:top-4 top-8 p-2 lg:ml-16 md:ml-16 ml-[-85px]"
                                onClick={() => setShareClick(!shareClick)}
                            >
                                <img
                                    src="assets/TCCimage/share-icon.png"
                                    alt={`share`}
                                    className="w-6 h-6"
                                />
                            </button>
                            <button
                                className="absolute lg:top-4 top-8 p-2 bg-BlackProduct rounded lg:ml-28 md:ml-28 ml-[-54px]"
                                id="enter-fullscreen"
                                // onClick={toggleFullScreen}
                                // onClick={handleFullScreen}
                                style={{ backgroundColor: webConfigBgColor }}
                            >
                                <span>
                                    <MdOutlineZoomOutMap
                                        style={{ height: "20px", width: "20px", color: "white" }}
                                    />
                                </span>
                            </button>
                        </div>
                        {shareClick && (
                            <div className="gap-5 absolute md:top-[6%] top-[8%] lg:right-[36%] right-0 p-2 ">
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
                    <div
                        className="mt-[-37px] flex justify-center"
                        id="font-size-custom"
                    >
                        <div className="grid grid-cols-4 gap-2">
                            <button
                                className={`flex justify-center items-center border z-10 rounded-md w-full bg-[${webConfigBgColor}] text-white px-2 sm:px-2 py-3 font-size_16`}
                                // onClick={handle360Image}
                                style={{ backgroundColor: webConfigBgColor }}
                            >
                                <img
                                    src="../../icons/360.png"
                                    className="sm:pe-2 h-4 "
                                />
                                &nbsp;360
                            </button>

                            <button
                                className={`flex justify-center items-center border  z-10 rounded-md w-full bg-[${webConfigBgColor}] text-white px-2 sm:px-2  py-3 font-size_16`}
                                // onClick={handleVideoDownload}
                                style={{ backgroundColor: webConfigBgColor }}
                            >
                                <img
                                    src="../../icons/video.png"
                                    className="sm:pe-2 h-4"
                                />
                                &nbsp;Video
                            </button>

                            <div className="relative flex justify-center">
                                <button
                                    className={`flex justify-center items-center border w-full rounded-md bg-[${webConfigBgColor}] text-white items-center px-2 sm:px-2 py-3 font-size_16`}
                                    //   onClick={handleDropdownToggle1}
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
                                        // ref={dropdownRef}
                                        className="absolute bottom-full position_dropdown left-0 w-full bg-white border border-gray-300 rounded-b-md"
                                    >
                                        <div className="d-flex flex-col p-4">
                                            <div>
                                                <button
                                                    className="py-1"
                                                //   onClick={() => handleCameraViews("1")}
                                                >
                                                    Perspective View
                                                </button>
                                            </div>
                                            <div>
                                                <button
                                                    className="py-1"
                                                //   onClick={() => handleCameraViews("2")}
                                                >
                                                    Top View
                                                </button>
                                            </div>
                                            <div>
                                                <button
                                                    className="py-1"
                                                //   onClick={() => handleCameraViews("3")}
                                                >
                                                    Right View
                                                </button>
                                            </div>
                                            <div>
                                                <button
                                                    className="py-1"
                                                //   onClick={() => handleCameraViews("0")}
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
                                //   onClick={handleDropdownToggle}
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
                                        // ref={dropdownRef}
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
                                            // value={downloadOption}
                                            // onChange={(e) =>
                                            //   setDownloadOption(e.target.value)
                                            // }
                                            >
                                                <option value="Top View">Top View</option>
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
                                            // value={resolution}
                                            // onChange={(e) =>
                                            //   setResolution(e.target.value)
                                            // }
                                            >
                                                <option value="1200 * 1200">
                                                    1200 * 1200
                                                </option>
                                                <option value="1080Hd">1080Hd</option>
                                                <option value="320p">320p</option>
                                            </select>

                                            <button
                                                className={`border rounded-md bg-[${webConfigBgColor}] text-white p-2`}
                                                style={{
                                                    backgroundColor: webConfigBgColor,
                                                }}
                                            // onClick={handleDownloadImage}
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
                {showModal ? (
                    <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                            <div className="relative w-full my-6 mx-5 lg:mx-auto max-w-3xl">
                                <div className="border-0 rounded-lg shadow-lg px-5 relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    <div className="flex pl-0 items-start justify-between p-5 pb-2 pe-2 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="text-3xl font-semibold">
                                            {" "}
                                            <h3 className="font-bold">
                                                Birthstone{" "}
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
                                                        Birthstone - 100007
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
                                                    Price*
                                                    <span
                                                    // className={`text-[${webSecondaryColor}] text_size_16`}
                                                    // style={{ color: webSecondaryColor }}
                                                    >
                                                        : {CURRENCY}{" "}
                                                        19777
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
                ) : <></>}
                <div className="lg:col-span-2 col-span-2 lg:h-fit h-[117%] overflow-auto p-[15px]">
                    <div className="lg:visible invisible md:invisible">
                        <h1 className="text-black birthstone-two-font product-title">Birthstone</h1>
                        <small style={{ color: `${webConfigBgColor}` }} className="flex w-100">Birthstone - 100007</small>
                        <p className="text-black mt-3 md:mt-3 lg:mt-3">This is simply dummy text</p>
                        <p className={`mb-0 text-black flex`}>
                            <ReactStars
                                count={5}
                                size={25}
                                value={3}
                                color="#c6c6c6"
                                activeColor={webConfigBgColor}
                                isHalf={true}
                                edit={false}
                            />
                            <span className="ml-2">(107 Reviewed)</span>
                        </p>
                        <p className="price-2-font text-black font-[500] mt-2 birthstone-two-font">
                            Price* {" "}
                            <span
                                style={{ color: `${webConfigBgColor}` }}
                                className="price-2-font"
                            >
                                : $1999
                            </span>
                        </p>
                        <div className="mt-2 flex">
                            <button
                                style={{ background: `${webConfigBgColor}`, height: "32px" }}
                                className={`w-1/3 md:w-1/3 rounded mb-16 lg:mb-0`}
                            >
                                <span className="py-2 3xl:px-8 text-white font-semibold">ADD TO BAG</span>
                            </button>
                            <MdOutlineFavorite
                                size={20}
                                style={{ pointerEvents: "none", marginLeft: "5px", marginTop: "5px", color: `${webConfigBgColor}` }}
                            />
                        </div>
                    </div>
                    <div className="lg:mt-0 mt-[-221px]">
                        <div>
                            <h2 className="birthstone-two-font text-black price-2-font mt-2">Choose Your Stone Options</h2>
                            <div>
                                {/* <Accordion open={open} toggle={toggle}>
                                    <AccordionItem>
                                        <AccordionHeader targetId="1">Accordion Item 1</AccordionHeader>
                                        <AccordionBody accordionId="1">
                                            <strong>This is the first item&#39;s accordion body.</strong>
                                            You can modify any of this with custom CSS or overriding our default
                                            variables. It&#39;s also worth noting that just about any HTML can
                                            go within the <code>.accordion-body</code>, though the transition
                                            does limit overflow.
                                        </AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionHeader targetId="2">Accordion Item 2</AccordionHeader>
                                        <AccordionBody accordionId="2">
                                            <strong>This is the second item&#39;s accordion body.</strong>
                                            You can modify any of this with custom CSS or overriding our default
                                            variables. It&#39;s also worth noting that just about any HTML can
                                            go within the <code>.accordion-body</code>, though the transition
                                            does limit overflow.
                                        </AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionHeader targetId="3">Accordion Item 3</AccordionHeader>
                                        <AccordionBody accordionId="3">
                                            <strong>This is the third item&#39;s accordion body.</strong>
                                            You can modify any of this with custom CSS or overriding our default
                                            variables. It&#39;s also worth noting that just about any HTML can
                                            go within the <code>.accordion-body</code>, though the transition
                                            does limit overflow.
                                        </AccordionBody>
                                    </AccordionItem>
                                </Accordion> */}
                            </div>

                            <div id="accordion-collapse" data-accordion="collapse">
                                <h2 id="accordion-collapse-heading-1">
                                    <button type="button" className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
                                        <span>What is Flowbite?</span>
                                        <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                                        </svg>
                                    </button>
                                </h2>
                                <div id="accordion-collapse-body-1" className="hidden" aria-labelledby="accordion-collapse-heading-1">
                                    <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.</p>
                                        <p className="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a href="/docs/getting-started/introduction/" class="text-blue-600 dark:text-blue-500 hover:underline">get started</a> and start developing websites even faster with components on top of Tailwind CSS.</p>
                                    </div>
                                </div>
                                <h2 id="accordion-collapse-heading-2">
                                    <button type="button" className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-2" aria-expanded="false" aria-controls="accordion-collapse-body-2">
                                        <span>Is there a Figma file available?</span>
                                        <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                                        </svg>
                                    </button>
                                </h2>
                                <div id="accordion-collapse-body-2" className="hidden" aria-labelledby="accordion-collapse-heading-2">
                                    <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">Flowbite is first conceptualized and designed using the Figma software so everything you see in the library has a design equivalent in our Figma file.</p>
                                        <p className="text-gray-500 dark:text-gray-400">Check out the <a href="https://flowbite.com/figma/" class="text-blue-600 dark:text-blue-500 hover:underline">Figma design system</a> based on the utility classes from Tailwind CSS and components from Flowbite.</p>
                                    </div>
                                </div>
                                <h2 id="accordion-collapse-heading-3">
                                    <button type="button" className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-3" aria-expanded="false" aria-controls="accordion-collapse-body-3">
                                        <span>What are the differences between Flowbite and Tailwind UI?</span>
                                        <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                                        </svg>
                                    </button>
                                </h2>
                                <div id="accordion-collapse-body-3" className="hidden" aria-labelledby="accordion-collapse-heading-3">
                                    <div className="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">The main difference is that the core components from Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.</p>
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no technical reason stopping you from using the best of two worlds.</p>
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
                                        <ul className="pl-5 text-gray-500 list-disc dark:text-gray-400">
                                            <li><a href="https://flowbite.com/pro/" className="text-blue-600 dark:text-blue-500 hover:underline">Flowbite Pro</a></li>
                                            <li><a href="https://tailwindui.com/" rel="nofollow" className="text-blue-600 dark:text-blue-500 hover:underline">Tailwind UI</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                        {/* <div className="flex gap-10">
                            {tabs.map((tab, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleTabClick(index)}
                                    style={{ color: `${webConfigBgColor}` }}
                                    className={`${activeTab === index ? 'border-b-2 border-gray-500' : ''
                                        }  py-2 px-4 mx-1 text-gray-800 focus:outline-none birthtone-tab-font`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                        <div>
                            {tabs.map((tab, index) => (
                                <div
                                    key={index}
                                    className={`${index === activeTab ? 'block' : 'hidden'} `}
                                >
                                    {activeTab === 0 ?
                                        <div className="mt-3">
                                            <BirthStoneData
                                                data={DATA.data}
                                            />
                                        </div> :
                                        <div>
                                            <BirthStoneInscriptionData />
                                        </div>
                                    }
                                </div>
                            ))}
                        </div> */}

                        {/* <div>
                            <BirthStoneToneData
                                data={DATA.metal_tone.component}
                            />
                        </div>
                        <div>
                            <BirthStoneMetalData
                                data={DATA.metal.component}
                            />
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductBirthdayStone3DRenderLocal1;