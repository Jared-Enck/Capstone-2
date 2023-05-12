import { NavLink } from "react-router-dom"

export default function AnonNavLinks({isSmallWindow, classes}) {
  return (
    <>
      <NavLink className={classes} to="/login">
        <span>
          Login
        </span>
      </NavLink>
      <NavLink className={classes} to="/signup">
        <span>
          Sign up
        </span>
      </NavLink>
    </>
  )
}