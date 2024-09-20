// ** MUI Imports
import Box, { BoxProps } from "@mui/material/Box";
const FallbackSpinner = ({ sx }: { sx?: BoxProps["sx"] }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        opacity: '60%',
        ...sx,
      }}
    >
      <img
        src="/assets/images/products/BET_logo.png"
        alt="spinner"
        className="h-20 shimmer"
      />
    </Box>
  );
};

export default FallbackSpinner;
