import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { FormControl, Stack, Typography, Box } from '@mui/material';
import { FormBox, FormTextField, ErrorSpan } from '../common/styled';
import ContentContainer from '../common/ContentContainer';
import PasswordAdornment from './PasswordAdornment';
import { PrimaryButton } from '../common/styled';
import useFields from '../../hooks/useFields';
import CircularLoading from '../common/CircularLoading';

export default function FormComponent({
  header,
  initialState,
  inputs,
  submitFunc,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const { navigate } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const inputType = showPassword ? 'text' : 'password';

  const [formData, handleChange, formErrors, setFormErrors] =
    useFields(initialState);

  const handleShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await submitFunc(formData);
    if (result.msg === 'success') {
      setIsLoading(false);
      navigate('/');
    } else {
      setFormErrors(result.msg);
      setIsLoading(false);
    }
  };

  return (
    <Stack sx={{ paddingTop: 10 }}>
      <ContentContainer shadow={2}>
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
                    required
                  />
                </FormControl>
              );
            })}

            {formErrors
              ? formErrors.map((e, idx) => <ErrorSpan key={idx}>{e}</ErrorSpan>)
              : null}

            {inputs.length < 3 ? (
              <Typography sx={{ textAlign: 'center', color: 'primary.text' }}>
                Don't have an account yet? Sign in
                <Link to={'/signup'}> here.</Link>
              </Typography>
            ) : null}

            <PrimaryButton
              variant='contained'
              type='submit'
              className='main-button'
            >
              Submit
              {isLoading ? (
                <Box
                  sx={{
                    position: 'absolute',
                    right: 20,
                  }}
                >
                  <CircularLoading
                    size='1.3rem'
                    color='primary.light'
                  />
                </Box>
              ) : null}
            </PrimaryButton>
          </Stack>
        </FormBox>
      </ContentContainer>
    </Stack>
  );
}
