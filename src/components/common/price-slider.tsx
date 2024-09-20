import * as React from "react";
import Box from "@mui/material/Box";
import { useContext, useEffect } from "react";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import { styled } from "@mui/material/styles";
import { DiamondSettingContext } from "@contexts/diamond_setting/diamond-setting-context";
import { useDiamondFilterDataQuery } from "src/framework/filter/get-all-diamond-filterdata";

function valuetext(value: number) {
  return `${value}°C`;
}

const minDistance = 1;

export default function MinimumDistanceSlider() {
  const { data: price , isLoading } = useDiamondFilterDataQuery();
  //const minPrice = price?.data?.minPrice;
  //const maxPrice = price?.data?.maxPrice;
  const [minValue, setMinValue] = React.useState(300);
  const [maxValue, setMaxValue] = React.useState(25000);
  const [value, setValue] = React.useState([minValue, maxValue] as number[]);
  const { updateMinPrice, updateMaxPrice } = useContext(DiamondSettingContext);

  useEffect(() => {
      setMinValue(Number(price?.data?.minPrice) ?? 300);
      setMaxValue(Number(price?.data?.maxPrice) ?? 25000);
      setValue([Number(price?.data?.minPrice), Number(price?.data?.maxPrice)])
    }, [price]);

    useEffect(() => {
      updateMinPrice(value[0]);
      updateMaxPrice(value[1]);
    }, [value]);

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  const Input = styled(MuiInput)`
    width: 42px;
  `;

  return (
    <div className="flex justify-center">
      <Box sx={{ width: 200 }}>
        <div className="flex justify-between">
          <span>Min</span>
          <span>Max</span>
        </div>
        <Slider
          getAriaLabel={() => "Minimum distance"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          min={minValue}
          max={maxValue}
          disableSwap
        />
        <div className="flex justify-between">
          <Input value={`$ ${value[0]}`} multiline={true} />
          <span className="mt-3">TO</span>
          <Input value={`$ ${value[1]}`} multiline={true} />
        </div>
      </Box>
    </div>
  );
}
