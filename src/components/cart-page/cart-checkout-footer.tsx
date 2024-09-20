import React from "react";

type FooterItemProps = {
  id: string;
  name: string;
  price: string;
  rate: string;
};
export const CartCardFooterItem: React.FC<{ item: FooterItemProps }> = ({
  item,
}) => {
  return (
    <>
      <div
        className={`flex items-center py-2 lg:py-5 text-sm lg:px-3 w-full font-semibold text-textColor last:border-b-0 last:text-base last:pb-0`}
      >
        {item.rate == null ? `${item.name}` : `${item.name} (${item.rate}%)`}
        <span className="ms-auto flex-shrink-0">{item.price}</span>
      </div>
    </>
  );
};
