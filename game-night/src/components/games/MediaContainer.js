import React from "react";
import {
  Grid,
  Typography,
  CardMedia,
  Card,
  CardActionArea,
  CardHeader
} from "@mui/material";

export default function MediaContainer({ header, items, isVideos = null }) {
  const handleClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <>
      <Typography 
        sx={{
          textAlign: "left",
          marginBottom: "1rem"
        }}
        variant="h5"
      >
        {header}
      </Typography>
      <Grid
        container
        direction={"row"}
        alignItems={"center"}
        spacing={2}
        height={220}
        overflow={"auto"}
      >
        {
          items
            ? (
              items.map(i => (
                <Grid key={i.id} item>
                  <Card
                    sx={{
                      height: 200,
                      width: 200
                    }}
                  >
                    <CardActionArea
                      onClick={() => handleClick(i.url)}
                    >
                      <CardMedia
                        sx={{
                          height: 200,
                          width: 200,
                          objectFit: "fill"
                        }}
                        component="img"
                        image={i.medium || i.image_url}
                        alt={i.name}
                      />
                    </CardActionArea>
                  </Card>
                </Grid>
              ))
            )
            : null
        }
      </Grid>
    </>
  )
};