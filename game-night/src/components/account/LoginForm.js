import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from '../../context/UserContext';
import {
  InputLabel,
  FormControl,
  InputAdornment,
  IconButton,
  Stack,
} from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { 
  PrimaryButton, 
  ErrorSpan,
  FormBox,
  FormOutlinedInput,
  FormBackGround
} from "../styled";
import useFields from "../../hooks/useFields";

const genError = (err, idx) => {
  return (
    <ErrorSpan key={idx}>
      {err}
    </ErrorSpan>
  )
}

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const initialState = {
    username: '', 
    password: ''
  };
  const [
    formData, 
    handleChange,
    formErrors,
    setFormErrors
  ] = useFields(initialState);
  
  const {loginUser} = useContext(UserContext);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await loginUser(formData)
    if (!result.success) {
      setFormErrors(result.err)
    }
  }

  return (
    <FormBackGround>
      <FormBox 
        component="form"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <Stack spacing={2}>
          <FormControl>
            <InputLabel 
              htmlFor="username"
            >
              Username
            </InputLabel>
            <FormOutlinedInput
              type="text"
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              autoFocus
            />
          </FormControl>

          <FormControl>
            <InputLabel 
              htmlFor="password"
            >
              Password
            </InputLabel>
            <FormOutlinedInput
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
          <Stack spacing={2}>
            {
              formErrors.length
                ? formErrors.map((e,idx) => genError(e,idx))
                : null
            }
            <span>
              Don't have an account? Sign up {' '}
              <Link to={"/signup"}>
                here.
              </Link>
            </span>
              <PrimaryButton
                type="submit"
                size="medium"
              >
                Login
              </PrimaryButton>
          </Stack>
          </FormControl>
        </Stack>
      </FormBox>
    </FormBackGround>
  );
};
