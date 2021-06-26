import React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import { AccountCircle, VpnKey } from '@material-ui/icons';
import PropTypes from 'prop-types';

const LoginInput = ({ setAuthorization, type, error, value }) => {
  return (
    <TextField
      autoFocus={ type === 'email' }
      autoComplete='off'
      fullWidth
      value={ value }
      error={ Boolean(error) && error.type === type }
      helperText={ error?.type === type ? error.text : '' }
      label={ type }
      variant='filled'
      type={ type === 'password' ? 'password' : 'text' }
      margin='normal'
      onChange={(e) => setAuthorization(prev => ({
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

LoginInput.propTypes = {
  setAuthorization: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(PropTypes.string)
  ]).isRequired,
  value: PropTypes.string.isRequired
};

export default LoginInput;