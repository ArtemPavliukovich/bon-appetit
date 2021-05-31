import React, { useState } from 'react';
import useStyles from '../styles/Login';
import { Grid, TextField, InputAdornment, Avatar, Typography, Button, Link } from '@material-ui/core';
import { AccountCircle, VpnKey, LockOutlined, ArrowForward } from '@material-ui/icons';

const Login = () => {
  const [ type, setType ] = useState('login');
  const classes = useStyles();

  const changeType = (e) => {
    e.preventDefault();
    type === 'login' ? setType('register') : setType('login');
  }

  return (
    <Grid 
      container
      component='main'
      justify='center'
      alignContent='center'
      className={ classes.main }
    >
      <Grid item component='form' xs={ 10 } sm={ 6 } md={ 4 } lg={ 3 } className={ classes.form }>
        <Avatar className={ classes.pink }>
          { type === 'login' ? <LockOutlined /> : <ArrowForward /> }
        </Avatar>
        <Typography variant='h5' align='center' gutterBottom>
          { type === 'login' ? 'Sign In' : 'Registration' }
        </Typography>
        <TextField
          autoFocus
          autoComplete='off'
          fullWidth
          id='input-login'
          label='email'
          variant='filled'
          margin='normal'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          id='input-password'
          label='password'
          variant='filled'
          type='password'
          margin='normal'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <VpnKey />
              </InputAdornment>
            ),
          }}
        />
        <Button
          fullWidth
          variant='contained'
          size='medium'
          color='primary'
          className={ classes.margin }
        >
          { type === 'login' ? 'SIGN IN' : 'REGISTRATION' }
        </Button>
        <Typography variant='body2' display='inline'>
          { type === 'login' ? 'Don\'t have an account? ' : 'Already have an account? ' }
        </Typography>
        <Link href='#' onClick={ changeType } variant='body2'>
          { type === 'login' ? 'Register' : 'Sign In' }
        </Link>
      </Grid>
    </Grid>
  );
};

export default Login;