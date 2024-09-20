import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@components/icons/close-icon";

const Modeldemo = () => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    bgcolor: "background.paper",
    boxShadow: 24,
  };
  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        //   onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: "",
          },
        }}
      >
        <Box sx={style} className="rounded-md">
          <div className="grid grid-cols-2 gap-5">
            <div className="w-full h-full">
              <img
                className="w-full h-full rounded-l-md"
                src="/assets/images/og-image-01.png"
                alt=""
              />
            </div>
            <div className="p-4">
              <div className="flex flex-row-reverse">
                <button>
                  <CloseIcon color="red" />
                </button>
              </div>
              <h1 className="stater-model-title  font-semibold">The Cad Co</h1>
              <h1 className="py-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
                obcaecati praesentium neque exercitationem, eos assumenda saepe
                velit in aliquam tempora illo molestiae, aliquid laborum
                corporis ipsam nihil. In, inventore ipsa.
              </h1>
              <div className="py-2">
                <button className="py-2 border border-black p-2 rounded bg-orange-600 text-white">
                  The Cad Co
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Modeldemo;
// onClick={handleClose}
