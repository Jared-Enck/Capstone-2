import React, { useState, useContext } from 'react';
import UserContext from '../../context/UserContext';
import { FormControl, Stack, Typography } from '@mui/material';
import { FormBox, FormTextField, ErrorSpan } from '../common/styled';
import ContentContainer from '../common/ContentContainer';
import PasswordAdornment from './PasswordAdornment';
import { PrimaryButton } from '../common/styled';
import useFields from '../../hooks/useFields';

export default function FormComponent({
  header,
  initialState,
  inputs,
  submitFunc,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const { navigate } = useContext(UserContext);

  const inputType = showPassword ? 'text' : 'password';

  const [formData, handleChange, formErrors, setFormErrors] =
    useFields(initialState);

  const handleShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await submitFunc(formData);
    if (result.msg === 'success') {
      navigate('/');
    } else {
      setFormErrors(result.msg);
    }
  };

  return (
    <Stack>
      <ContentContainer>
        <FormBox
          component='form'
          onSubmit={handleSubmit}
          autoComplete='off'
        >
          <Stack spacing={2}>
            <Typography
              variant='h5'
              sx={{ color: 'primary.muted' }}
            >
              {header}
            </Typography>

            {inputs.map((name, idx) => {
              const firstLetter = name[0].toUpperCase();
              const label = firstLetter.concat(name.slice(1));

              return (
                <FormControl
                  key={name}
                  variant='outlined'
                >
                  <FormTextField
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
            })}

            {formErrors
              ? formErrors.map((e, idx) => <ErrorSpan key={idx}>{e}</ErrorSpan>)
              : null}

            <PrimaryButton
              variant='contained'
              type='submit'
              className='main-button'
            >
              Submit
            </PrimaryButton>
          </Stack>
        </FormBox>
      </ContentContainer>
    </Stack>
  );
}
