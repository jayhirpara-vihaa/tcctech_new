import { useContext, useState } from "react";
import { Collapse } from "@components/common/accordion";
import ReviewForm from "@components/common/form/review-form";
import { DiamondShapeContext } from "@contexts/diamond_shape/diamond-shape.context";
import { ProductDetailsContext } from "@contexts/productDetails/product-Details-Context";
import { DiamondDetail } from "@framework/types";

interface Props {
  data: any;
  selectedCaratSize: string;
  diamondData: DiamondDetail;
  ringSize: string;
}

const ProductMetaReview: React.FC<Props> = ({
  data,
  selectedCaratSize,
  diamondData,
  ringSize,
}) => {
  const [expanded, setExpanded] = useState<number>(0);
  const { selectedToneName, showTones } = useContext(ProductDetailsContext);
  return (
    <>
      <Collapse
        i={0}
        title={"Product Details"}
        translatorNS="review"
        content={
          <div>
            <div>
              <b>Metal : </b>
              <span className="capitalize">
                {selectedCaratSize} {showTones && selectedToneName}
              </span>
            </div>

            <div>
              <b>Diamond Shape : </b> {diamondData?.shape}
            </div>
            {ringSize !== "undefined" && (
              <div>
                <b>Ring Size : </b>
                {ringSize}
              </div>
            )}
          </div>
        }
        expanded={expanded}
        setExpanded={setExpanded}
        variant="transparent"
      />

      <Collapse
        i={1}
        title={"Description"}
        translatorNS="review"
        content={data?.long_description}
        expanded={expanded}
        setExpanded={setExpanded}
        variant="transparent"
      />
    </>
  );
};

export default ProductMetaReview;
