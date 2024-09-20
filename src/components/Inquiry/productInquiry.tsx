import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import TextArea from "@components/ui/text-area";
import { CheckBox } from "@components/ui/checkbox";
import { ProductDetailsContext } from "@contexts/productDetails/product-Details-Context";
import { useContext, useEffect, useState } from "react";
import { getUserDetails } from "@store/authorization";
import { useProductEnquiryMutation } from "@framework/inquiries/product-enquiry";
import { useUI } from "@contexts/ui.context";

const EnquireForm: React.FC = () => {
  const [reviewComment, setReviewComment] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [checked, setChecked] = useState(false);
  const {
    product,
    ringSize,
    selectedToneName,
    caratValue,
    ringValue,
    selectedCaratId,
    selectedMetal,
    metalId,
    showTones,
    enquiryImage,
    diamondShape,
  } = useContext(ProductDetailsContext);
  const { setModalView, closeModal } = useUI();

  const imgUrl = process.env.NEXT_PUBLIC_IMG_URL;
  const userData = getUserDetails();
  const { t } = useTranslation();
  const { mutate: productEnquiry } = useProductEnquiryMutation();

  const handleCommentChange = (e: any) => {
    setReviewComment(e.target.value);
  };
  useEffect(() => {
    setFirstName(userData.full_name),
      setEmail(userData.email),
      setPhoneNumber(userData.mobile);
  }, []);

  console.log("product", product);

  const onEnquirySubmit = () => {
    productEnquiry({
      full_name: firstName,
      // last_name: lastName,
      email: email,
      contact_number: phoneNumber,
      message: reviewComment,
      product_id: product?.id,
      SKU: product?.sku,
      size: Number(ringValue),
      length: null,
      metal_id: metalId,
      karat_id: Number(selectedCaratId),
      metal_tone_id: Number(selectedMetal),
    });
    setModalView("INQUIRY");
    return closeModal();
  };

  return (
    <div className="w-[70%] sm:w-full overflow-hidden bg-white mx-auto w-auto lg:w-full border border-gray-300 py-5 px-5 sm:px-8">
      <div>
        <div className="flex py-3 pb-8 justify-center">
          <h1 className="TCC-h1-tag text-bold  border-b border-slate-300">
            Enquiry
          </h1>
        </div>

        <div className="sm:grid sm:grid-cols-1 md:flex md:flex-cols-2 ">
          <Image
            src={`${imgUrl}${enquiryImage[0]?.image_path}`}
            width={144}
            height={150}
            loading="eager"
            alt={"Product Image"}
            className="bg-gray-300 "
          />
          <div className="md:mx-5 sm:mt-4 md:mt-0">
            <div className="product-name font-bold">{product?.name}</div>
            <div>{product?.sku}</div>

            <div>
              <div>
                <b>Metal : </b>{" "}
                <span className="capitalize ">
                  {caratValue} {showTones && selectedToneName}
                </span>
              </div>
              {ringSize !== "undefined" && (
                <div>
                  <b>Ring Size : </b>
                  {ringSize}
                </div>
              )}
              <div>
                <b>Diamond Shape :</b> {diamondShape}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h1 className="TCC-medium-text">Need Help ? </h1>
          <p className="TCC-small-text mt-3">
            Our jewelry specialists are happy to answer your questions about
            this product.
          </p>
        </div>
        <div className="border-b border-slate-300 mt-5" />
      </div>
      <div className="mt-5">
        <div className="w-full space-2">
          <Input
            name="YourRating"
            className="mb-2"
            variant="solid"
            placeholder="Full Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {/* <Input
            name="YourRating"
            className="w-[90%] mb-2"
            variant="solid"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          /> */}
        </div>
        <div className="md:grid md:grid-cols-2 sm:grid sm:grid-cols-1 gap-5 space-2">
          <Input
            name="YourRating"
            className="mb-2"
            variant="solid"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            name="YourRating"
            className=" mb-2"
            variant="solid"
            placeholder="Phone (Optional)"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <TextArea
          className="w-full mb-2"
          name="comment"
          placeholder="Message"
          onChange={handleCommentChange}
        />
      </div>
      <div className="my-3">
        <CheckBox
          labelKey="forms:label-send-updates"
          onChange={(e) => {
            setChecked(e.target.checked);
          }}
        />
      </div>
      <div className="flex justify-center">
        <Button
          type="submit"
          className="h-12 md:mt-1 text-sm lg:text-base w-full sm:w-auto"
          onClick={onEnquirySubmit}
          disabled={!checked || reviewComment === ""}
        >
          {t("Enquire Now")}
        </Button>
      </div>
    </div>
  );
};

export default EnquireForm;
