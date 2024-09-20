const CartIcon = ({
  color = "currentColor",
  width = "18px",
  height = "18px",
  className = "md:w-4 xl:w-5 md:h-4 xl:h-5 text-orange",
}) => {
  return (
    <svg
      width="16"
      height="20"
      viewBox="0 0 17 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M13.4872 23.1663H3.51283C2.57734 23.1622 1.68176 22.7867 1.02302 22.1225C0.364288 21.4582 -0.00366925 20.5596 2.75892e-05 19.6241V4.62088H4.60082V3.59008C4.6721 2.61643 5.10848 1.70563 5.82258 1.03995C6.53669 0.374278 7.47583 0.00284776 8.45208 0V0.0494272C9.42308 0.0415666 10.3608 0.402905 11.0755 1.06023C11.7902 1.71756 12.2285 2.62182 12.3018 3.59008V4.62088H17V19.6241C17.0037 20.5596 16.6357 21.4582 15.977 22.1225C15.3182 22.7867 14.4226 23.1622 13.4872 23.1663V23.1663ZM3.60864 21.6054H13.345C13.6228 21.6041 13.8977 21.5482 14.1539 21.4408C14.4101 21.3333 14.6427 21.1764 14.8383 20.9791C15.0339 20.7818 15.1887 20.5479 15.2939 20.2907C15.3991 20.0336 15.4526 19.7582 15.4514 19.4804V9.25723H1.50374V19.4804C1.50231 19.7583 1.55569 20.0338 1.66082 20.291C1.76594 20.5483 1.92075 20.7822 2.11639 20.9796C2.31203 21.177 2.54467 21.3338 2.80099 21.4412C3.05731 21.5486 3.3323 21.6043 3.6102 21.6054H3.60864ZM10.7996 3.59008C10.7468 3.00546 10.4758 2.46218 10.0405 2.0684C9.60514 1.67461 9.03749 1.45921 8.45053 1.46508C7.86882 1.46082 7.30729 1.67808 6.87991 2.07274C6.45254 2.46739 6.19134 3.00987 6.14935 3.59008V4.62088H10.7996V3.59008ZM1.50065 6.1818V7.71178H15.4483V6.1818H1.50065Z"
        fill={color}
      />
    </svg>
  );
};

export default CartIcon;