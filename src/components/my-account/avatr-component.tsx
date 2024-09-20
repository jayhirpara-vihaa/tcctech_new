import { Avatar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AvatarImg from "../../../public/assets/Photos/logo/Tcc_Logo.svg";

const AvatarComponent: React.FC = () => {
  return (
    <>
      <div className="relative inline-block">
        <label htmlFor="contained-button-file">
          <IconButton>
            <Avatar
              className="opacity-1"
              // @ts-ignore
              src={AvatarImg}
              style={{
                margin: "10px",
                width: "60px",
                height: "60px",
              }}
            />
          </IconButton>
          <input
            className="absolute opacity-0 top-0 right-0 left-0 bottom-0 cursor-pointer"
            type="file"
          />
        </label>
      </div>
    </>
  );
};

export default AvatarComponent;
