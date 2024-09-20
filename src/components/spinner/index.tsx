// ** MUI Imports
import Box, { BoxProps } from "@mui/material/Box";
import Image from "next/image";
const FallbackSpinner = ({ sx }: { sx?: BoxProps["sx"] }) => {
  // ** Hook

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        ...sx,
      }}
    >
      <Image
        src={
          "https://css.brilliantearth.com/static/img/common/ajax-loading-y23.gif"
        }
        alt="Spinner"
        height={100}
        width={100}
      />
    </Box>
  );
};

export default FallbackSpinner;
