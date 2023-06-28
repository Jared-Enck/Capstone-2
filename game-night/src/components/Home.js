import React, { useContext, useState } from "react";
import {
  Switch
} from "@mui/material"
import styled from "@emotion/styled";
import UserContext from "../context/UserContext";

const StyledSwitch = styled(Switch)(({ theme }) => ({
  color: theme.palette.primary.contrastText
}));

export default function Home() {
  const { isDark, handleThemeToggle } = useContext(UserContext);
  const [checked, setChecked] = useState(isDark);

  const handleChange = () => {
    handleThemeToggle();
    setChecked(!checked);
  };

  return (
    <>
      <h1>
        Homepage
      </h1>
      <StyledSwitch
        checked={checked}
        onChange={handleChange}
      />
    </>
  );
};