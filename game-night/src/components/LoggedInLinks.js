import React from "react";
import UserAccountMenu from "./UserAccountMenu";
import { StyledNavLink } from "./styled";

export default function LoggedInLinks() {
  return (
    <>
      <StyledNavLink to="/collection">
        Collection
      </StyledNavLink>
      <StyledNavLink to="/groups">
        Groups
      </StyledNavLink>
      <UserAccountMenu />
    </>
  );
};