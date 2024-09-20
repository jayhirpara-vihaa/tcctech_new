import React, { useEffect, useState } from "react";
import Carousel from "@components/ui/carousel/carousel";
import { SwiperSlide } from "swiper/react";

const CenterDiamondShape: React.FC<any> = (props: any) => {
  const [selectedDiamondShape, setSelectedDiamondShape] = useState(
    props.selectedValue && props.selectedValue.id
  );
  const [dimaondShapeList, setDiamondShapeList] = useState(props.data || []);

  const handleSelectedDiamondShape = (e: any, item: any) => {
    setSelectedDiamondShape(item.id);
    props?.value(item);
  };

  useEffect(() => {
    setDiamondShapeList(props.data);
  }, [props.data]);

  const defaultDiamondShape =
    dimaondShapeList &&
    dimaondShapeList.filter(
      (t: any) => parseInt(t.id) === parseInt(selectedDiamondShape)
    );

  useEffect(() => {
    setSelectedDiamondShape(props.selectedValue && props.selectedValue.id);
  }, [props]);

  useEffect(() => {
    if (props.filter == "G") {
      setDiamondShapeList(
        props &&
        props.data &&
        props.data.filter((t: any) => t.is_diamond == 3 || t.is_diamond == 2)
      );
    }
    if (props.filter == "D") {
      setDiamondShapeList(
        props &&
        props.data &&
        props.data.filter((t: any) => t.is_diamond == 3 || t.is_diamond == 1)
      );
    }
  }, [props.data]);

  const flashSaleCarouselBreakpoint = {
    "1280": {
      slidesPerView: 5,
      spaceBetween: 2,
    },
    "768": {
      slidesPerView: 5,
      spaceBetween: 1,
    },
    "0": {
      slidesPerView: 4,
    },
  };

  return (
    <div className="space-x-2">
      <Carousel
        breakpoints={flashSaleCarouselBreakpoint}
        buttonSize="small"
        buttonGroupClassName=""
        className="-mx-0 md:-mx-2.5 xl:-mx-0 "
        prevButtonClasses={`left-1 md:left-1 xl:left-1 2xl:left-1 lg:left-1`}
        nextButtonClasses={`right-1 md:right-1 xl:right-1 2xl:right-1 lg:right-1`}
      >
        {dimaondShapeList &&
          dimaondShapeList.length &&
          dimaondShapeList.length !== 0 &&
          dimaondShapeList.map((item: any, index: any) => {
            return (
              <SwiperSlide
                className="carouselItem"
                key={`banner--key-${index}`}
              >
                <button
                  key={item.id}
                  onClick={(e) => {
                    handleSelectedDiamondShape(e, item);
                  }}
                  id={item.id}
                  className={`rounded-lg ${parseInt(selectedDiamondShape) === parseInt(item.id)
                    ? props.className?.buttonSelected
                    : ""
                    } ${props.className?.mainButton}`}
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMG_URL}${item.image_path}`}
                    className={props.className?.tooltipData.scaleStyle}
                    height={props.className?.imageData.height}
                    width={props.className?.imageData.width}
                    id={item.id}
                  />
                  {props.className?.buttonSelected === undefined ? (
                    <div className={props.className?.divmargin} id={item.id}>
                      {item.name}
                    </div>
                  ) : (
                    <div className={props.className?.divmargin} id={item.id}>
                      {item.name}
                    </div>
                  )}
                  {props.className?.buttonSelected === undefined ? (
                    <>
                      {defaultDiamondShape[0]?.name == item.name && (
                        <div
                          className={props.className?.selectedBorder.maindiv}
                        >
                          <div
                            className={props.className?.selectedBorder.secdiv}
                            style={{ borderColor: props.colorUI }}
                          ></div>
                        </div>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </button>
              </SwiperSlide>
            );
          })}
      </Carousel>
    </div>
  );
};

export default CenterDiamondShape;
