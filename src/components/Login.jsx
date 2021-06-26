import React, { useState, useEffect } from 'react';
import useStyles from '../styles/Login';
import { Grid, Avatar, Typography, Button, Link } from '@material-ui/core';
import { LockOutlined, ArrowForward } from '@material-ui/icons';
import Firebase from '../api/firebase';
import messages from '../constants/messages';
import { LoginInput } from './index';

const Login = () => {
  const [ authorization, setAuthorization ] = useState({
    type: 'login',
    email: '',
    password: ''
  });
  
  const [ error, setError ] = useState('');
  const classes = useStyles();
  const { login } = messages;
  
  const changeType = (e) => {
    e.preventDefault();
    setAuthorization(prev => ({
      type: prev.type === 'login' ? 'register' : 'login',
      email: '',
      password: ''
    }));
  }

  useEffect(() => {
    if (error) {
      setError('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorization.type]);

  const autorization = () => {
    Firebase.autorization(authorization)
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
      <Grid item component='form' xs={ 10 } sm={ 6 } md={ 4 } lg={ 3 } className={ classes.form }>
        <Avatar className={ classes.pink }>
          { authorization.type === 'login' ? <LockOutlined /> : <ArrowForward /> }
        </Avatar>
        <Typography variant='h5' align='center' gutterBottom>
          { authorization.type === 'login' ? login.signIn : login.registration }
        </Typography>
        <LoginInput 
          setAuthorization={ setAuthorization }
          type={ 'email' }
          value={ authorization['email'] }
          error={ error }
        />
        <LoginInput 
          setAuthorization={ setAuthorization }
          type={ 'password' }
          value={ authorization['password'] }
          error={ error }
        />
        <Button
          fullWidth
          variant='contained'
          size='medium'
          color='primary'
          className={ classes.margin }
          onClick={ autorization }
        >
          { authorization.type === 'login' ? login.signIn : login.registration }
        </Button>
        <Typography variant='body2' display='inline'>
          { authorization.type === 'login' ? login.isRegistered : login.notRegistered }
        </Typography>
        <Link href='#' onClick={ changeType } variant='body2'>
          { authorization.type === 'login' ? login.registration : login.signIn }
        </Link>
      </Grid>
    </Grid>
  );
};

export default Login;