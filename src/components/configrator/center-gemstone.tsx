import Carousel from "@components/ui/carousel/carousel";
import { Tooltip } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";

const CenterGemstone: React.FC<any> = (props: any) => {
  const [selectedCenterGemstone, setSelectedCenterGemstone] = useState(
    props.selectedValue && props.selectedValue.id
  );
  const [gemStoneList, setGemSToneList] = useState(props.data);
  const handleSelectedCenterGemstone = (e: any, item: any) => {
    setSelectedCenterGemstone(e.target.id);
    props.value(item);
  };

  useEffect(() => {
    setGemSToneList(props.data)
  }, [props.data]);

  const flashSaleCarouselBreakpoint = {
    "1280": {
      slidesPerView: 4,
      spaceBetween: 2,
    },
    "768": {
      slidesPerView: 4,
      spaceBetween: 1,
    },
    "0": {
      slidesPerView: 4,
    },
  };

  return (
    <div>
      <div className="space-x-2">
        <Carousel
          breakpoints={flashSaleCarouselBreakpoint}
          buttonSize="small"
          buttonGroupClassName=""
          className="-mx-0 md:-mx-2.5 xl:-mx-0 fixed"
          prevButtonClasses={`left-1 md:left-1 xl:left-1 2xl:left-1 lg:left-1`}
          nextButtonClasses={`right-1 md:right-1 xl:right-1 2xl:right-1 lg:right-1`}
        >
          {props.data &&
            props.data.filter((value: any) => value.is_diamond == 2).map((item: any, index: any) => {
              return (
                <SwiperSlide
                  className="carouselItem"
                  key={`banner--key-${index}`}
                >
                  <button
                    key={item.id}
                    onClick={(e) => {
                      handleSelectedCenterGemstone(e, item);
                    }}
                    id={item.id}
                    className={`${parseInt(selectedCenterGemstone) === parseInt(item.id) ? props.className.buttonSelected : ""
                      } ${props.className.mainButton}`}
                  >
                    <Tooltip
                      title={
                        <div className="tooltip-content">
                          <div className="">
                            <img
                              src={`${process.env.NEXT_PUBLIC_IMG_URL}${item.image_path}`}
                              className={props.className.tooltipData.scaleStyle}
                              width={props.className.tooltipData.width}
                              height={props.className.tooltipData.height}
                              id={item.id}
                            />
                          </div>
                        </div>
                      }
                      placement="right"
                      //arrow
                      classes={{ tooltip: "custom-tooltip" }}
                    >
                      <img
                        src={`${process.env.NEXT_PUBLIC_IMG_URL}${item.image_path}`}
                        className={props.className.tooltipData.scaleStyle}
                        height={props.className.imageData.height}
                        width={props.className.imageData.width}
                        id={item.id}
                      />
                    </Tooltip>
                    {props.className.buttonSelected === undefined ?
                      <div className={props.className.divmargin} id={item.id}>{item.name}</div>
                      : <div className={props.className.divmargin} id={item.id}>{item.name}</div>
                    }
                    {
                      props.className.buttonSelected === undefined ?
                        <>
                          {selectedCenterGemstone[0]?.name == item.name && (
                            <div className={props.className.selectedBorder.maindiv}>
                              <div
                                className={props.className.selectedBorder.secdiv}
                                style={{ borderColor: props.colorUI }}
                              ></div>
                            </div>
                          )}
                        </> :
                        <></>
                    }
                  </button>
                </SwiperSlide>
              );
            })}
        </Carousel>
      </div>

      {/* <div>Natural Gemstone </div>
      <div className="space-x-2 flex">
        {props.data &&
          props.data.filter((value: any) => value.is_diamond == 2).map((item: any) => {
            return (
              <button
                key={item.id}
                onClick={(e) => {
                  handleSelectedCenterGemstone(e, item);
                }}
                id={item.id}
                className={`${parseInt(selectedCenterGemstone) === parseInt(item.id) ? props.className?.buttonSelected : ""
                  } ${props.className?.mainButton}`}
              >
                <Tooltip
                  title={
                    <div className="tooltip-content">
                      <div className="">
                        <img
                          src={`${imageUrl}${item.image_path}`}
                          id={item.id}

                          width={props.className?.tooltipData.width}
                          height={props.className?.tooltipData.height}
                        />
                      </div>
                    </div>
                  }
                  placement="right"
                  // arrow
                  classes={{ tooltip: "custom-tooltip" }}
                >
                  <img
                    src={`${imageUrl}${item.image_path}`}
                    id={item.id}
                    width={props.className?.imageData.width}
                    height={props.className?.imageData.width}
                    className={props.className?.tooltipData.imageStyle}
                  />
                </Tooltip >
                <div id={item.id}>{item.name}</div>
                {props.className?.buttonSelected === undefined ?
                  <>
                    {selectedCenterGemstone == item.name && (
                      <div className={props.className?.selectedBorder.maindiv}>
                        <div
                          className={props.className?.selectedBorder.secdiv}
                          style={{ borderColor: props.colorUI }}
                        ></div>
                      </div>
                    )}
                  </> :
                  <></>}
              </button>
            );
          })}
      </div>
      <div>Simulated Gemstone </div>
      <div className="space-x-2 flex">
        {props.data &&
          props.data.filter((value: any) => value.is_natural == 0).map((item: any) => {
            return (
              <button
                key={item.id}
                onClick={(e) => {
                  handleSelectedCenterGemstone(e, item);
                }}
                id={item.id}
                className={`${parseInt(selectedCenterGemstone) === parseInt(item.id) ? props.className?.buttonSelected : ""
                  } ${props.className?.mainButton}`}
              >
                <Tooltip
                  title={
                    <div className="tooltip-content">
                      <div className="">
                        <img
                          src={`${imageUrl}${item.image_path}`}
                          id={item.id}

                          width={props.className?.tooltipData.width}
                          height={props.className?.tooltipData.height}
                        />
                      </div>
                    </div>
                  }
                  placement="right"
                  // arrow
                  classes={{ tooltip: "custom-tooltip" }}
                >
                  <img
                    src={`${imageUrl}${item.image_path}`}
                    id={item.id}
                    width={props.className?.imageData.width}
                    height={props.className?.imageData.width}
                    className={props.className?.tooltipData.imageStyle}
                  />
                </Tooltip >
                <div id={item.id}>{item.name}</div>
                {props.className?.buttonSelected === undefined ?
                  <>
                    {selectedCenterGemstone == item.name && (
                      <div className={props.className?.selectedBorder.maindiv}>
                        <div
                          className={props.className?.selectedBorder.secdiv}
                          style={{ borderColor: props.colorUI }}
                        ></div>
                      </div>
                    )}
                  </> :
                  <></>}
              </button>
            );
          })}
      </div> */}
    </div>
  )
};

export default CenterGemstone;
