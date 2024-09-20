import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import ReactStars from "react-rating-stars-component";
import TextArea from "@components/ui/text-area";
import { MdNoteAdd } from "react-icons/md";
import { Fragment, useContext, useState } from "react";
import { getUserDetails } from "@store/authorization";
import { ProductReviewMutation } from "@framework/product/review/add-product-review";
import { useRouter } from "next/router";
import { ProductDetailsContext } from "@contexts/productDetails/product-Details-Context";
import { useDropzone } from "react-dropzone";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";

interface FileProp {
  name: string;
  type: string;
  size: number;
}
const ProductReviewForm: React.FC = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState([]);
  // const [showImages, setShowImages] = useState();
  const userData = getUserDetails();
  const userID = userData?.id_app_user;
  const [starRating, setStarRating] = useState<number>(5);
  const [reviewerName, setReviewerName] = useState("");
  const [comment, setComment] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)));
    },
  });

  const { mutate: addProductReview } = ProductReviewMutation();
  const { product } = useContext(ProductDetailsContext);
  const productId = product && product.id;
  const handleSubmit = () => {
    addProductReview({
      user_id: userID,
      product_id: productId as number,
      rating: starRating,
      reviewer_name: reviewerName,
      comment: comment,
      images: files[0],
    });
  };
  const renderFilePreview = (file: FileProp) => {
    if (file.type.startsWith("image")) {
      return (
        <img
          width={38}
          height={38}
          alt={file.name}
          src={URL.createObjectURL(file as any)}
        />
      );
    } else {
      // return <Icon icon='tabler:file-description' />
    }
  };

  const handleRemoveFile = (file: FileProp) => {
    const uploadedFiles = files;
    const filtered = uploadedFiles.filter(
      (i: FileProp) => i.name !== file.name
    );
    setFiles([...filtered]);
  };

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  const fileList = files.map((file: FileProp) => (
    <ListItem key={file.name}>
      <div className="file-details">
        <div className="file-preview">{renderFilePreview(file)}</div>
        <div>
          <Typography className="file-name">{file.name}</Typography>
          <Typography className="file-size" variant="body2">
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(file)}>
        {/* <Icon icon="tabler:x" fontSize={20} /> */}
      </IconButton>
    </ListItem>
  ));

  return (
    <div className="overflow-hidden bg-white mx-auto w-full lg:w-full border border-gray-300 py-5 px-5 sm:px-8">
      <div className="relative inline-block">
        <span className="mx-2">
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <div className="border border-gray-300 p-16 w-40 h-full">
              <span className="drop-zone__prompt">
                <MdNoteAdd size={25} />
              </span>
            </div>
          </div>
          {files.length ? (
            <Fragment>
              <List>{fileList}</List>
              <div className="buttons">
                <Button color="error" onClick={handleRemoveAllFiles}>
                  Remove All
                </Button>
              </div>
            </Fragment>
          ) : null}
          <br />
          <br />
        </span>
      </div>
      <div>
        <h1 className="TCC-medium-text">LET US KNOW WHAT YOU THINK!</h1>
        <p className="TCC-small-text mt-3"> {product?.name} </p>
        <div className="border-b border-slate-300 mt-5" />
      </div>
      <div className="mt-3">
        <h1>Start Rating*</h1>
        <ReactStars
          count={5}
          size={30}
          isHalf={true}
          name="rating"
          className="react-review-star"
          onChange={(rate: number) => setStarRating(rate)}
          emptyIcon={
            <Image
              src={"/assets/Ratting/EmptyIcon.png"}
              width={30}
              height={30}
              loading="eager"
              alt={"Product Image"}
              className="bg-gray-300 object-cover"
            />
          }
          halfIcon={
            <Image
              src={"/assets/Ratting/HalfIcon.png"}
              width={30}
              height={30}
              loading="eager"
              className="bg-gray-300 object-cover"
            />
          }
          fullIcon={
            <Image
              src={"/assets/Ratting/FullIcon.png"}
              width={30}
              height={30}
              loading="eager"
              className="bg-gray-300 object-cover"
            />
          }
          activeColor="#ffd700"
        />
      </div>

      <div>
        {/* <h1 className="TCC-small-text mt-3 font-semibold">Your Rating*</h1>
        <Input
          name="reviewer_name"
          className="w-full mt-1"
          variant="solid"
          placeholder="Absolutely stunning ✨"
          onChange={(e: any) => setRating(e.target.value)}
        /> */}

        <h1 className="TCC-small-text mt-3 font-semibold">Name</h1>
        <Input
          name="YourRating"
          className="w-full mt-1"
          variant="solid"
          onChange={(e: any) => setReviewerName(e.target.value)}
        />

        <h1 className="TCC-small-text mt-5 font-semibold">Comments*</h1>
        <TextArea
          className="w-full mt-1"
          name="comment"
          placeholder="Tell us what you love about your new jewelry! Did you buy it for a special occasion? We’d love to hear your story."
          onChange={(e: any) => setComment(e.target.value)}
        />
        {/* <h1 className="TCC-small-text mt-5 font-semibold">
          Service/Delivery Comments
        </h1>
        <TextArea
          className="w-full  mt-1"
          name="comment"
          placeholder="Was your delivery prompt? Did your product arrive in good condition? If you used it, was customer service available and helpful?"
        /> */}
      </div>
      <div>
        <Button
          type="submit"
          className="h-12 md:mt-1 text-sm lg:text-base w-full sm:w-auto"
          onClick={handleSubmit}
        >
          {t("common:button-submit-review")}
        </Button>
      </div>
    </div>
  );
};

export default ProductReviewForm;
