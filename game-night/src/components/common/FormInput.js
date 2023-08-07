import React from 'react';
import { FormControl } from '@mui/material';
import { FormTextField } from './styled';
import PasswordAdornment from './PasswordAdornment';

export default function FormInput({
  name,
  formData,
  handleChange,
  idx = undefined,
  inputType,
  showPassword,
  handleShowPassword,
  variant = 'outlined',
}) {
  const firstLetter = name[0].toUpperCase();
  const label = firstLetter.concat(name.slice(1));

  return (
    <FormControl>
      <FormTextField
        variant={variant}
        label={label}
        type={name === 'password' ? inputType : 'text'}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        autoFocus={idx === 0}
        InputProps={{
          endAdornment:
            name === 'password' ? (
              <PasswordAdornment
                showPassword={showPassword}
                handleShowPassword={handleShowPassword}
              />
            ) : null,
        }}
      />
    </FormControl>
  );
}
