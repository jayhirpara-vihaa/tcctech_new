import { FC } from "react";
import TccBirthstoneProductCard from "./tcc-birthstoneProduct-card";
import { useGetBirthstoneProductQuery } from "src/framework/Birth-stone/get-all-birthstone-products";

interface ProductGridProps {
    className?: string;
}
export const TccBirthstoneProductGrid: FC<ProductGridProps> = ({ className = "" }) => {

    const { data: birthsoneProductData } = useGetBirthstoneProductQuery();

    console.log("birthsoneProductData", birthsoneProductData);


    return (
        <>
            <div
                className={`px-4 md:px-6 2xl:px-16 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-3 lg:gap-x-5 xl:gap-x-7 2xl:gap-x-9  2xl:grid-cols-5 gap-y-3 xl:gap-y-5 2xl:gap-y-8 ${className}`}
            >

                {birthsoneProductData?.data?.productList.map((product: any) => {
                    return (
                        <TccBirthstoneProductCard
                            key={`product-key-${product.id}`}
                            product={product}
                            variant="grid"
                            className="2xl:px-2"
                        />
                    );
                })
                }
            </div>
        </>
    );
};
