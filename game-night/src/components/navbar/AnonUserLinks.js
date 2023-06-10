import React from "react";
import { StyledNavLink } from "./LoggedInLinks";

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