import React, { useContext, useEffect, useState } from "react";
import {
  Switch
} from "@mui/material"
import styled from "@emotion/styled";
import UserContext from "../context/UserContext";

const StyledSwitch = styled(Switch)(({ theme }) => ({
  color: theme.palette.primary.contrastText
}));

export default function Home() {
  const { currentUser, isDark, handleThemeToggle } = useContext(UserContext);
  const [checked, setChecked] = useState(isDark);

  useEffect(() => {
    console.log(currentUser)
  },[])
  
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