import React from "react";
import { NavLink } from "react-router-dom";
import { StyledNavLink } from "./styled";

export default function AnonUserLinks() {
  return (
    <>
      <StyledNavLink to="/login">
        Login
      </StyledNavLink>
      <StyledNavLink to="/signup">
        Sign Up
      </StyledNavLink>
    </>
  );
};