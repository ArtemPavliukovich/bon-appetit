import React from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import { AccountCircle, VpnKey } from '@material-ui/icons';
import type { DataAutorization, LoginError } from '../types';

interface LoginInputProps {
  type: string;
  error: LoginError | null;
  value: string;
  setAuthorization: Dispatch<SetStateAction<DataAutorization>>;
};

const LoginInput: React.FC<LoginInputProps> = ({ setAuthorization, type, error, value }) => {
  return (
    <TextField
      autoFocus={ type === 'email' }
      autoComplete='off'
      fullWidth
      value={ value }
      error={ Boolean(error) && error?.type === type }
      helperText={ error?.type === type ? error.text : '' }
      label={ type }
      variant='filled'
      type={ type === 'password' ? 'password' : 'text' }
      margin='normal'
      onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setAuthorization(prev => ({
        ...prev,
        [type]: e.target.value.trim()
      }))}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            { type === 'email' ? <AccountCircle /> : <VpnKey /> }
          </InputAdornment>
        ),
      }}
    />
  );
};

export default LoginInput;