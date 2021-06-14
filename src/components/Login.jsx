import React, { useState, useRef, useEffect } from 'react';
import useStyles from '../styles/Login';
import { Grid, TextField, InputAdornment, Avatar, Typography, Button, Link } from '@material-ui/core';
import { AccountCircle, VpnKey, LockOutlined, ArrowForward } from '@material-ui/icons';
import Firebase from '../api/firebase';
import messages from '../constants/messages';

const userAutorization = {
  type: 'login',
  email: '',
  password: ''
};

const Login = () => {
  const [ typeAuth, setTypeAuth ] = useState(userAutorization.type);
  const [ error, setError ] = useState('');
  const form = useRef(null);
  const classes = useStyles();
  const { login } = messages;
  
  const changeType = (e) => {
    e.preventDefault();
    userAutorization.email = '';
    userAutorization.password = '';
    userAutorization.type = typeAuth === 'login' ? 'register' : 'login';
    form.current.reset();
    setTypeAuth(userAutorization.type);
  }

  useEffect(() => {
    if (error) {
      setError('');
    }
  }, [typeAuth]);

  const autorization = () => {
    Firebase.autorization(userAutorization)
      .then(() => window.location.reload())
      .catch(err => setError(err));
  }

  return (
    <Grid
      container
      component='main'
      justify='center'
      alignContent='center'
      className={ classes.main }
    >
      <Grid item component='form' xs={ 10 } sm={ 6 } md={ 4 } lg={ 3 } className={ classes.form } ref={ form }>
        <Avatar className={ classes.pink }>
          { typeAuth === 'login' ? <LockOutlined /> : <ArrowForward /> }
        </Avatar>
        <Typography variant='h5' align='center' gutterBottom>
          { typeAuth === 'login' ? login.signIn : login.registration }
        </Typography>
        <TextField
          autoFocus
          autoComplete='off'
          fullWidth
          error={ Boolean(error) && error.type === 'email' }
          helperText={ error?.type === 'email' ? error.text : '' }
          label='email'
          variant='filled'
          margin='normal'
          onChange={ (e) => userAutorization.email = e.target.value }
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
          label='password'
          variant='filled'
          type='password'
          margin='normal'
          onChange={ (e) => userAutorization.password = e.target.value }
          error={ Boolean(error) && error.type === 'password' }
          helperText={ error?.type === 'password' ? error.text : '' }
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
          onClick={ autorization }
        >
          { typeAuth === 'login' ? login.signIn : login.registration }
        </Button>
        <Typography variant='body2' display='inline'>
          { typeAuth === 'login' ? login.isRegistered : login.notRegistered }
        </Typography>
        <Link href='#' onClick={ changeType } variant='body2'>
          { typeAuth === 'login' ? login.registration : login.signIn }
        </Link>
      </Grid>
    </Grid>
  );
};

export default Login;