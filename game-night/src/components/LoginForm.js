import React, { useState, useContext } from "react";
import UserContext from '../context/UserContext';
import { 
  Box,
  InputLabel,
  FormControl,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Button
} from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useFields from "../hooks/useFields";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const initialState = {
    username: '', 
    password: ''
  };
  const [formData,handleChange] = useFields(initialState);
  const [formErrors, setFormErrors] = useState([]);
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
    <Box 
      component="form"
      onSubmit={handleSubmit}
    >
      <h2>
        Login
      </h2>
      <FormControl>
        <InputLabel 
          htmlFor="username"
        >
          Username
        </InputLabel>
        <OutlinedInput
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
        <OutlinedInput
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
        <Button type="submit" size="medium">
          Submit
        </Button>
      </FormControl>  
    </Box>
  );
};