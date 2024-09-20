import { useEffect, useState } from "react";

interface HomeIcon {
  color: string;
  width: string;
  height: string;
  className: string;
}
const HomeIcon: React.FC<HomeIcon> = ({
  color,
  width,
  height,
  className = "md:w-4 xl:w-5 md:h-4 xl:h-5",
}) => {
  const [iconColor, setColor] = useState("");
  useEffect(() => {
    setColor(color);
  }, [iconColor]);
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={width}
      height={height}
      viewBox="0 0 92 92"
      enableBackground="new 0 0 92 92"
    >
      <path
        id="XMLID_100_"
        d="M88,49c-1,0-2-0.4-2.8-1.1L46,9.6L6.8,47.9c-1.6,1.5-4.1,1.5-5.7-0.1c-1.5-1.6-1.5-4.1,0.1-5.7l42-41
	c1.6-1.5,4-1.5,5.6,0l42,41c1.6,1.5,1.6,4.1,0.1,5.7C90.1,48.6,89,49,88,49z M79.2,88V48.9c0-2.2-1.8-4-4-4c-2.2,0-4,1.8-4,4V84
	H58.7V62.6c0-2.9-2.4-5.3-5.3-5.3H38.6c-2.9,0-5.3,2.4-5.3,5.3V84H20.8V48.9c0-2.2-1.8-4-4-4s-4,1.8-4,4V88c0,2.2,1.8,4,4,4h20.5
	c2.2,0,4-1.8,4-4V65.3h9.5V88c0,2.2,1.8,4,4,4h20.5C77.5,92,79.2,90.2,79.2,88z"
        stroke={color}
        strokeWidth="2"
        fill={color}
      />
    </svg>

    // <svg
    //   width={width}
    //   height={height}
    //   viewBox="0 0 27 27"
    //   fill="none"
    //   xmlns="http://www.w3.org/2000/svg"
    // >
    //   <path
    //     d="M26 13.5C26 20.3894 20.4174 26 13.5 26C6.58257 26 1 20.3894 1 13.5C1 6.61056 6.58257 1 13.5 1C20.4174 1 26 6.61056 26 13.5Z"
    //     stroke={color}
    //     stroke-width="1.5"
    //   />
    //   <path
    //     d="M7 12.25L13 7L19 12.25V19.75H15.25V16.75C15.25 16.1533 15.0129 15.581 14.591 15.159C14.169 14.7371 13.5967 14.5 13 14.5C12.4032 14.5 11.831 14.7371 11.409 15.159C10.9871 15.581 10.75 16.1532 10.75 16.75V19.75H7.00001L7 12.25Z"
    //     stroke={color}
    //     stroke-width="1.5"
    //     stroke-linecap="round"
    //     stroke-linejoin="round"
    //   />
    // </svg>
  );
};

export default HomeIcon;
