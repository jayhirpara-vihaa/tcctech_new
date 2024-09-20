import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
// import ring from '../Assets/Photos/HandEffect/ring.png'

const Hand_color_chnage = () => {
  const [sliderValue, setSliderValue] = useState<number>();
  const [className, setClassName] = useState("Tcc-ring");

  useEffect(() => {
    if (sliderValue === 0) {
      setClassName("Tcc-ring");
    } else if (sliderValue === 20) {
      setClassName("MintWhitering");
    } else if (sliderValue === 40) {
      setClassName("Brownring");
    } else if (sliderValue === 60) {
      setClassName("MintBlackring");
    } else if (sliderValue === 80) {
      setClassName("MintBrownring");
    } else if (sliderValue === 100) {
      setClassName("Blackring");
    }
  }, [sliderValue]);

  return (
    <>
      <div className="relative">
        <div>
          <img
            className={className}
            src={"/assets/HandEffect/ring.png"}
            alt=""
          />
        </div>
        <div className="absolute top-[92%] bg-white/50">
          <Box width={300} className="slider col">
            <Slider
              size="small"
              aria-label="Small"
              step={20}
              min={0}
              max={100}
              scale={(value: number) => setSliderValue(value)}
            />
          </Box>
        </div>
      </div>
    </>
  );
};

export default Hand_color_chnage;
