import React, { Component } from "react";
import { Row, Typography } from "antd";
import { Md360 } from "react-icons/md";

// higher values make mouse less sensitive
const pixelsPerDegree = 0.8;
const imageUrl = process.env.NEXT_PUBLIC_IMG_URL;

class React360 extends Component<any> {
  state = {
    dragging: false,
    imageIndex: 1,
    dragStartIndex: 0,
    images: [],
    show360: false,
    imgs: null,
    dragStart: 0,
  };

  componentDidMount = () => {
    document.addEventListener("touchstart", this.handleMouseMove, false);
    document.addEventListener("touchend", this.handleMouseUp, false);
  };

  componentWillUnmount = () => {
    document.removeEventListener("touchstart", this.handleMouseMove, false);
    document.removeEventListener("touchend", this.handleMouseUp, false);
  };

  handleMouseDown = (e: any) => {
    e.persist();
    this.setState((state: any) => ({
      dragging: true,
      dragStart: e.screenX || Math.round(e?.touches?.[0]?.clientX),
      dragStartIndex: state.imageIndex,
    }));
  };

  handleMouseUp = () => {
    this.setState({ dragging: true });
  };

  updateImageIndex = (currentPosition: any) => {
    let rImages = this.props.imgData;
    let numImages = rImages?.length;
    const pixelsPerImage = pixelsPerDegree * (360 / numImages);
    const { dragStart, imageIndex, dragStartIndex } = this.state;
    // pixels moved
    let dx = (currentPosition - dragStart) / pixelsPerImage;
    // let index = Math.floor(dx) % numImages;
    let index = numImages - Math.floor(dx) + 1;
    if (index < 0) {
      index = numImages + index - 1;
    }
    index = (index + dragStartIndex) % numImages;
    if (index !== imageIndex) {
      this.setState({ imageIndex: index === 0 ? 1 : index });
    }
  };

  handleMouseMove = (e: any) => {
    if (this.state.dragging) {
      this.updateImageIndex(e.screenX || Math.round(e?.touches?.[0]?.clientX));
    }
  };

  preventDragHandler = (e: any) => {
    e.preventDefault();
  };

  renderImage = () => {
    const { imageIndex } = this.state;
    let imageNameNotation = "";
    if (imageIndex < 10) {
      imageNameNotation = "00" + imageIndex.toString();
    } else if (imageIndex >= 9 && imageIndex <= 99) {
      imageNameNotation = "0" + imageIndex.toString();
    } else if (imageIndex >= 100 && imageIndex <= 999) {
      imageNameNotation = imageIndex.toString();
    }
    // Splitting URL
    const IVimage = this?.props?.imgData[0];
    const imgArray = IVimage?.image_path?.split(".");
    const imageExt = imgArray[imgArray?.length - 1];
    const arrNames = imgArray[0].split("-");
    const finalArray = arrNames.slice(0, arrNames.length - 1);
    const prefixImageName =
      imageUrl +
      finalArray.join("-") +
      "-" +
      imageNameNotation +
      "." +
      imageExt;
    return (
      <>
        <div className="react360 bg-gray-50">
          {/* <MdOutline360 size={30} /> */}
          <img alt="" className="main-Image" src={`${prefixImageName}`} />
          <div className="flex justify-center">
            <Md360 size={25} color="#8C8C8C" />
            <Typography.Title
              level={5}
              type="secondary"
              style={{
                fontFamily: "Gilroy",
                marginLeft: "5px",
                marginTop: "3px",
              }}
              className="helptext-360"
            >
              Click and Move to view 360 degrees
            </Typography.Title>
          </div>
        </div>
        <Row justify="center" style={{ marginTop: "1.5em" }}></Row>
      </>
    );
  };

  render = () => {
    return (
      <>
        <div
          className="react-360-img"
          onMouseDown={this.handleMouseDown}
          onDragStart={this.preventDragHandler}
          // onTouchStart={this.handleMouseMove}
          onTouchStart={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onTouchMove={this.handleMouseMove}
          onTouchEnd={this.handleMouseUp}
          onMouseOver={this.handleMouseMove}
          onMouseLeave={this.handleMouseUp}
        >
          {this.renderImage()}
        </div>
      </>
    );
  };
}
export default React360;
