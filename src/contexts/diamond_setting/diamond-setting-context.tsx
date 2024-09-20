import React, { createContext, useState } from "react";
import { FilterQueryType } from "@framework/types";

export const DiamondSettingContext = createContext({
  FirstValue: 0.33,
  SecondValue: 2,
  MinPrice: 1,
  MaxPrice: 25000,
  value: [1, 25000],
  hoverStyle: 0,
  selectedStyle: 0,
  selectedGender: 0,
  selectedCategory: 0,
  hoverShape: 0,
  selectedShape: 0,
  hoverColor: 0,
  selectedColor: 0,
  mainFilterData: {
    diamondShapeData: [],
    shopByStyle: [],
    settingStyleData: [],
    metalToneData: [],
  } as FilterQueryType,
  updateFirstValue: (value: number) => {},
  updateSecondValue: (value: number) => {},
  updateMinPrice: (value: number) => {},
  updateMaxPrice: (value: number) => {},
  updateValue: (value: number[]) => {},
  updateHoverStyle: (value: number) => {},
  updateSelectedStyle: (value: number) => {},
  updateSelectedGender: (value: number) => {},
  updateSelectedCategory: (value: number) => {},
  updateHoverShape: (value: number) => {},
  updateSelectedShape: (value: number) => {},
  updateHoverColor: (value: number) => {},
  updateSelectedColor: (value: number) => {},
  updateMainFilterData: (value: FilterQueryType) => {},
});

function DiamondSettingProvider({ children }: any) {
  const [FirstValue, setFirstValue] = useState(0.33);
  const [SecondValue, setSecondValue] = useState(2);
  const [MinPrice, setMinPrice] = useState(1);
  const [MaxPrice, setMaxPrice] = useState(25000);
  const [value, setValue] = useState<number[]>([MinPrice, 25000]);
  const [hoverStyle, setHoverStyle] = useState<number>(0);
  const [selectedStyle, setSelectedStyle] = useState<number>(0);
  const [selectedGender, setSelectedGender] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [hoverShape, setHoverShape] = useState(0);
  const [selectedShape, setSelectedShape] = useState<number>(0);
  const [hoverColor, setHoverColor] = useState(0);
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [mainFilterData, setMainFilterData] = useState<FilterQueryType>({
    diamondShapeData: [],
    shopByStyle: [],
    settingStyleData: [],
    metalToneData: [],
  } as FilterQueryType);

  const updateMainFilterData = (value: FilterQueryType) => {
    setMainFilterData(value);
  };
  const updateFirstValue = (value: number) => {
    setFirstValue(value);
  };

  const updateSecondValue = (value: number) => {
    setSecondValue(value);
  };
  const updateMinPrice = (value: number) => {
    setMinPrice(value);
  };

  const updateMaxPrice = (value: number) => {
    setMaxPrice(value);
  };

  const updateValue = (value: number[]) => {
    setValue(value);
  };

  const updateHoverStyle = (value: number) => {
    setHoverStyle(value);
  };

  const updateSelectedStyle = (value: number) => {
    setSelectedStyle(value);
  };

  const updateSelectedGender = (value: number) => {
    setSelectedGender(value);
  };

  const updateSelectedCategory = (value: number) => {
    setSelectedCategory(value);
  };

  const updateHoverShape = (value: number) => {
    setHoverShape(value);
  };

  const updateSelectedShape = (value: number) => {
    setSelectedShape(value);
  };

  const updateHoverColor = (value: number) => {
    setHoverColor(value);
  };

  const updateSelectedColor = (value: number) => {
    setSelectedColor(value);
  };

  return (
    <DiamondSettingContext.Provider
      value={{
        FirstValue,
        SecondValue,
        MinPrice,
        MaxPrice,
        value,
        hoverStyle,
        selectedStyle,
        hoverShape,
        selectedShape,
        hoverColor,
        selectedColor,
        mainFilterData,
        selectedGender,
        selectedCategory,
        updateMainFilterData,
        updateFirstValue,
        updateSecondValue,
        updateMinPrice,
        updateMaxPrice,
        updateValue,
        updateHoverStyle,
        updateSelectedStyle,
        updateSelectedGender,
        updateSelectedCategory,
        updateHoverShape,
        updateSelectedShape,
        updateHoverColor,
        updateSelectedColor,
      }}
    >
      {children}
    </DiamondSettingContext.Provider>
  );
}

export default DiamondSettingProvider;
