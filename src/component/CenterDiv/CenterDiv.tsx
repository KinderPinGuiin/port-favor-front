import { Box, styled } from "@mui/material";

/**
 * A div that centers all its elements in both axes.
 */
const FlexCenterDiv = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export default FlexCenterDiv;