import React from "react";
import {
  Box,
  Typography,
  alpha,
  Tooltip,
} from "@mui/material";
import styled from "@emotion/styled";
import YouTubeIcon from '@mui/icons-material/YouTube';

const StyledBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  backgroundColor: alpha(theme.palette.common.black, .4),
  width: "100%",
  height: "100%",
  textAlign: "center",
  padding: ".5rem"
}));

export default function VideoOverlay({ title }) {
  return (
    <Tooltip title={title}>
      <StyledBox>
        <Typography
          sx={{
            color: "primary.contrastText",
            textShadow: "2px 1px 1px solid black"
          }}
          variant="h5"
          noWrap
        >
          {title}
        </Typography>
        <Box
          sx={{
            marginTop: "1rem",
            color: "red"
          }}
        >
          <YouTubeIcon
            sx={{
              fontSize: "5rem"
            }}
          />
        </Box>
      </StyledBox>
    </Tooltip>
  )
};