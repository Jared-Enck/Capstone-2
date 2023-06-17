import React from "react";
import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";
import UserAccountMenu from "../account/UserAccountMenu";

export const StyledNavLink = styled(NavLink)(({theme}) => ({
  color: theme.palette.primary.muted,
  marginRight: '2rem',
  '&:hover': {
    color: theme.palette.primary.contrastText
  }
}));

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