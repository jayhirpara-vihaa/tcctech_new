import Text from "@components/ui/text";
import { FaLink } from "react-icons/fa";
import cn from "classnames";

const NunguShipping = () => {
  interface ShippingData {
    id: number;
    icon: string;
    heading: string;
    Description: string;
  }
  interface ShippingDatas extends Array<ShippingData> {}
  const image = "/assets/images/NunguLoveStory/About-3.png";
  const ShippingData: ShippingDatas = [
    {
      id: 1,
      icon: "/assets/images/NunguLoveStory/icon/1.svg",
      heading: "Free Shipping",
      Description:
        "A wonderful serenity has taken possession of my entire soul,like these sweet mornings  of spring which i enjoy with my whole heart.",
    },
    {
      id: 2,
      icon: "/assets/images/NunguLoveStory/icon/2.svg",
      heading: "Free Shipping",
      Description:
        "A wonderful serenity has taken possession of my entire soul,like these sweet mornings of spring which i enjoy with my whole heart.",
    },
    {
      id: 3,
      icon: "/assets/images/NunguLoveStory/icon/3.svg",
      heading: "Free Shipping",
      Description:
        "A wonderful serenity has taken possession of my entire soul,like these sweet mornings of spring which i enjoy with my whole heart.",
    },
  ];
  return (
    <div className="px-4 max-sm:py-16 sm:py-16  md:py-28 grid grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-2 2xl:px-16 relative mb-5 md:mb-8 mx-auto max-w-[1920px] bg-[#f8f8f8]">
      <div className="grid grid-cols-1 gap-5">
        {ShippingData.map((item) => {
          return (
            <div className="flex sm:px-6 max-sm:grid grid-cols-1 sm:grid-cols-2">
              <div className="flex relative flex-shrink-0 sm:w-20 max-sm:w-[60px] max-sm:grid max-sm:justify-items-start max-sm:items-start lg:mb-5 xl:mb-1  lg:h-24  h-10  w-[105px] md:w-16 lg:w-[80px] xl:w-20 lg:h-[120px] h-[80px] xl:h-24 max-w-full">
                <img src={item.icon} alt="icon" className="mb-0" />
              </div>
              <div>
                <div className="sm:mx-4">
                  <Text
                    variant="heading"
                    className={cn("capitalize", {
                      "nungustories-shipping-heading mb-2 inset-x-0": "mb-1",
                    })}
                  >
                    {item.heading}
                  </Text>
                  <Text
                    className={cn(
                      "py-2 nungustories-shipping-description font-medium"
                    )}
                  >
                    {item.Description}
                  </Text>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1  ">
        <div className="max-sm:grid max-sm:my-6  ">
          <img className="w-full" src={image} alt={"item"} />
        </div>
      </div>
    </div>
  );
};

export default NunguShipping;
