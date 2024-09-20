import { ProductDetailsContext } from "@contexts/productDetails/product-Details-Context";
import { siteSettings } from "@settings/site-settings";
import { parseInt } from "lodash";
import React, { useContext, useEffect, useState } from "react";

interface Iprops {
  data: any;
}
const CaratMetal = (props: Iprops) => {
  const { data } = props;
  const { updateCaratValue, updateSelectedCaratId, updateMetalId } = useContext(
    ProductDetailsContext
  );
  const [metalKarat, setMetalKarat] = useState<any[]>([]);

  // useEffect(() => {
  //   const metalArray = metalKarat.map((item: any) => {
  //     return {
  //       id: item.id,
  //       name: item.name,
  //       id_metal: item.id,
  //     };
  //   });
  // }, [metalKarat]);

  useEffect(() => {
    updateSelectedCaratId(
      data && data.metal_karat.length > 0 && `K_${data?.metal_karat[0].id}`
    );
  }, []);

  const handleRadioChnange = (event: any) => {
    updateCaratValue(event.target.value);
    updateSelectedCaratId(event.target.id);
  };

  useEffect(() => {
    const newMetalKarat =
      data &&
      data?.metal_karat.map((item: any) => {
        return {
          id: `K_${item.id}`,
          name: `${item.name}k`,
          metal: "Gold",
          id_metal: siteSettings.gold,
        };
      });

    let singleMetal =
      data &&
      data.metals.filter((item: any) => {
        if (
          [siteSettings.platinum, siteSettings.silver].indexOf(
            parseInt(item.id)
          ) >= 0
        )
          return {
            id: `M_${item.id}`,
            name: `${item.name}`,
            id_metal: item.id,
          };
      });
    singleMetal = singleMetal.map((item: any) => {
      return {
        id: `M_${item.id}`,
        name: `${item.name}`,
        id_metal: item.id,
      };
    })
    const finalKaratArray = [...newMetalKarat, ...singleMetal];
    setMetalKarat(finalKaratArray);
    updateCaratValue(
      finalKaratArray?.length > 0 ? finalKaratArray[0].name : ""
    );
  }, [data]);

  const handleMetalChange = (e: any) => {
    updateMetalId(e.target.id);
  };
  return (
    <div className="flex">
      {metalKarat?.map((item: any, index: number) => {
        return (
          <div
            key={item.id}
            className="w-full mt-3 px-4 justify-center items-center"
          >
            <input
              key={item.id}
              type="radio"
              name="review_select_button"
              id={`${item.id}`}
              className="carat-metal-radio cursor-pointer flex justify-center items-center m-auto"
              value={item.name}
              defaultChecked={!!!index}
              onChange={handleRadioChnange}
            />
            <div className="flex justify-center items-center w-full mt-2">
              <span className="uppercase carat-name w-auto">{item.name}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default CaratMetal;
