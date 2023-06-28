import React, { useEffect } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";

export default function SettingsDrawer({ open = null }) {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (bool) => (event) => {
    setOpenDrawer(bool);
  };

  useEffect(() => {
    if (open) {
      toggleDrawer(true);
    }
  }, [open])

  const list = () => (
    <Box
      sx={{ width: 250, backgroundColor: "primary.light" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['Dark Mode'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer
        anchor={"right"}
        open={openDrawer}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </div>
  );
};