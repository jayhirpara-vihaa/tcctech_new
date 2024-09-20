import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@components/icons/close-icon";
import { useMarketingBanner } from "src/framework/Home/marketingBanner";
import Button from "@components/ui/button";

const style = {
  bgcolor: "background.paper",
  boxShadow: 24,
  m: 2,
};

type IProps = {
  modalIsClose: () => void;
};

const HomeModal = (props: IProps) => {
  const { data: marketingPopup } = useMarketingBanner();
  const marketingPopupData = marketingPopup?.data?.result[0];
  const imageUrl = process.env.NEXT_PUBLIC_IMG_URL;
  const { modalIsClose } = props;
  const handleClose = () => {
    modalIsClose();
  };
  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        // onClose={handleClose}
        open={true}
      >
        <Box
          sx={style}
          className="absolute place-items-center md:top-1/2 md:left-1/2 rounded-md md:-translate-y-1/2 md:-translate-x-1/2 lg:w-[900px] sm:w-[300px] md:w-[600px] outline-none"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="w-full h-auto">
              <img
                className="w-full h-auto rounded-l-md"
                src={`${imageUrl}${marketingPopupData?.image_path}`}
                alt="The Cad Co Marketing Image"
              />
            </div>
            <div className="p-4">
              <div className="flex flex-row-reverse">
                <button onClick={handleClose}>
                  <CloseIcon color="black" />
                </button>
              </div>
              <h1 className="stater-model-title font-semibold">
                {marketingPopupData?.name}
              </h1>
              <div className="py-4 w-full">
                <h1 className="w-full">{marketingPopupData?.content}</h1>
              </div>
              <div className="py-2">
                <Button className="text-white w-auto lg:w-[35%] h-[3rem] hover:w-[36%] hover:h-[3.2rem]">
                  {marketingPopupData?.button_name}
                </Button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default HomeModal;
