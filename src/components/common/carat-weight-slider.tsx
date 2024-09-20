// import * as React from "react";
// import { useContext } from "react";
// import { useEffect } from "react";
// import Box from "@mui/material/Box";
// import Slider from "@mui/material/Slider";
// import MuiInput from "@mui/material/Input";
// import { styled } from "@mui/material/styles";
// import { DiamondSettingContext } from "../../contexts/diamond_setting/diamond-setting-context";
// import { useDiamondFilterDataQuery } from "src/framework/filter/get-all-diamond-filterdata";

// function valuetext(value: number) {
//   return `${value}°C`;
// }

// const minDistance = 0.1;

// export default function MinimumDistanceSlider() {
//   const { data: CaratWeight } = useDiamondFilterDataQuery();
//   const CaratWeightDataLenght = CaratWeight?.data?.caratWeight?.length;
//   const [minValue, setMinValue] = React.useState(0.1);
//   const [maxValue, setMaxValue] = React.useState(100);
//   const [value, setValue] = React.useState([minValue, maxValue]);

//   useEffect(() => {
//     setMinValue(Number(CaratWeight?.data?.caratWeight[0]?.value) ?? 0.1);
//     setMaxValue(
//       Number(
//         CaratWeight?.data?.caratWeight[Number(CaratWeightDataLenght) - 1]?.value
//       )
//     );
//     setValue([
//       Number(CaratWeight?.data?.caratWeight[0]?.value) ?? 0.1,
//       Number(
//         CaratWeight?.data?.caratWeight[Number(CaratWeightDataLenght) - 1]?.value
//       ),
//     ]);
//   }, [CaratWeight]);

//   useEffect(() => {
//     if (value[0] === 10) {
//       setMinValue(0.33);
//     } else if (value[0] === 20) {
//       setMinValue(0.5);
//     } else if (value[0] === 30) {
//       setMinValue(0.75);
//     } else if (value[0] === 40) {
//       setMinValue(1);
//     } else if (value[0] === 50) {
//       setMinValue(1.25);
//     } else if (value[0] === 60) {
//       setMinValue(1.5);
//     }

//     if (value[1] === 10) {
//       setMaxValue(0.33);
//     } else if (value[1] === 20) {
//       setMaxValue(0.5);
//     } else if (value[1] === 30) {
//       setMaxValue(0.75);
//     } else if (value[1] === 40) {
//       setMaxValue(1);
//     } else if (value[1] === 50) {
//       setMaxValue(1.25);
//     } else if (value[1] === 60) {
//       setMaxValue(1.5);
//     } else if (value[1] === 70) {
//       setMaxValue(2);
//     }
//   }, [value]);

//   const { FirstValue, SecondValue, updateFirstValue, updateSecondValue } =
//     useContext(DiamondSettingContext);

//   useEffect(() => {
//     updateFirstValue(value[0]);
//     updateSecondValue(value[1]);
//   }, [value]);

//   const handleChange = (
//     event: Event,
//     newValue: number | number[],
//     activeThumb: number
//   ) => {
//     if (!Array.isArray(newValue)) {
//       return;
//     }
//     if (activeThumb === 0) {
//       setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
//     } else {
//       setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
//     }
//   };

//   const Input = styled(MuiInput)`
//     width: 42px;
//   `;

//   return (
//     <div className="flex justify-center">
//       <Box sx={{ width: 200 }}>
//         <div className="flex justify-between">
//           <span>Min</span>
//           <span>Max</span>
//         </div>
//         <Slider
//           getAriaLabel={() => "Minimum distance"}
//           value={value}
//           onChange={handleChange}
//           valueLabelDisplay="auto"
//           getAriaValueText={valuetext}
//           step={0.1}
//           marks
//           min={minValue}
//           max={maxValue}
//           disableSwap
//         />
//         <div className="flex justify-between">
//           <Input value={`$ ${FirstValue}`} size="small" />
//           <span className="mt-3">TO</span>
//           <Input value={`$ ${SecondValue}`} size="small" />
//         </div>
//       </Box>
//     </div>
//   );
// }

//===================================================//

import * as React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import { styled } from "@mui/material/styles";
import { DiamondSettingContext } from "../../contexts/diamond_setting/diamond-setting-context";
import { useDiamondFilterDataQuery } from "src/framework/filter/get-all-diamond-filterdata";

function valuetext(value: number) {
  return `${value}°C`;
}

const minDistance = 1;

export default function MinimumDistanceSlider() {
  const [diamondCaratValue, setDiamondCaratValue] = React.useState([]);
  const [value, setValue] = React.useState<number[]>([1, 2]);
  const [CaratWeight1, setCaratWeight1] = React.useState<number | undefined>(
    0.33
  );
  const [CaratWeight2, setCaratWeight2] = React.useState<number>(2);
  const { FirstValue, updateFirstValue, updateSecondValue } = useContext(
    DiamondSettingContext
  );
  const { data: CaratWeight } = useDiamondFilterDataQuery();
  const CaratWeightDataLenght = CaratWeight?.data?.caratWeight ?? "";

  useEffect(() => {
    updateFirstValue(CaratWeight1);
    updateSecondValue(CaratWeight2);
  }, [CaratWeight1, CaratWeight2]);

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

  useEffect(() => {
    setValue([
      diamondCaratValue[0],
      diamondCaratValue[diamondCaratValue.length - 1],
    ]);
  }, [diamondCaratValue]);

  useEffect(() => {
    for (let i = 1; i <= Number(CaratWeightDataLenght?.length); i++) {
      setDiamondCaratValue((prevState) => [...prevState, i]);
    }
  }, [CaratWeight]);

  useEffect(() => {
    diamondCaratValue.map((i, index) => {
      if (value[0] === i) {
        setCaratWeight1(Number(CaratWeightDataLenght[index]?.value) ?? "");
      }
    });
  }, [value]);

  useEffect(() => {
    diamondCaratValue.map((i, index) => {
      if (value[1] === i) {
        setCaratWeight2(Number(CaratWeightDataLenght[index]?.value) ?? "");
      }
    });
  }, [value]);

  // useEffect(() => {
  //     if (value[0] === 10) {
  //         setCaratWeight1(0.33)
  //     } else if (value[0] === 20) {
  //         setCaratWeight1(0.50)
  //     } else if (value[0] === 30) {
  //         setCaratWeight1(0.75)
  //     } else if (value[0] === 40) {
  //         setCaratWeight1(1)
  //     } else if (value[0] === 50) {
  //         setCaratWeight1(1.25)
  //     } else if (value[0] === 60) {
  //         setCaratWeight1(1.50)
  //     }

  //     if (value[1] === 10) {
  //         setCaratWeight2(0.33)
  //     } else if (value[1] === 20) {
  //         setCaratWeight2(0.50)
  //     } else if (value[1] === 30) {
  //         setCaratWeight2(0.75)
  //     } else if (value[1] === 40) {
  //         setCaratWeight2(1)
  //     } else if (value[1] === 50) {
  //         setCaratWeight2(1.25)
  //     } else if (value[1] === 60) {
  //         setCaratWeight2(1.50)
  //     } else if (value[1] === 70) {
  //         setCaratWeight2(2)
  //     }
  // }, [value])

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
          step={1}
          marks
          min={value[0]}
          max={value[1]}
          disableSwap
        />
        <div className="flex justify-between">
          <Input value={FirstValue} size="small" />
          <span className="mt-3">TO</span>
          <Input value={CaratWeight2} size="small" />
        </div>
      </Box>
    </div>
  );
}
