import React from 'react';
import FormComponent from '../common/FormComponent';

export default function LoginForm({ loginUser }) {
  const initialState = {
    username: '',
    password: '',
  };

  return (
    <FormComponent
      header={'Login'}
      initialState={initialState}
      inputs={['username', 'password']}
      submitFunc={loginUser}
    />
  );
}
