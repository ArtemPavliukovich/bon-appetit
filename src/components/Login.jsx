import React, { useState } from 'react';
import { Grid, TextField, InputAdornment, Avatar, Typography, Button, Link } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { makeStyles } from "@material-ui/core/styles";
import { pink, grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
    margin: `6px auto` 
  },

  main: {flexGrow: 1},

  margin: {margin: '24px 0'},

  form: {
    padding: '24px',
    margin: theme.spacing(4),
    border: '1px solid black',
    borderColor: grey[600],
    borderRadius: '5px',
    backgroundColor: grey[200],
    textAlign: 'center'
  }
}));

const Login = () => {
  const [ type, changeType ] = useState('in');

  const classes = useStyles();

  const changeTypeForm = (e) => {
    e.preventDefault();
    type === 'in' ? changeType('') : changeType('in');
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
          { type === 'in' ? <LockOutlinedIcon/> : <ArrowForwardIcon/> }
        </Avatar>
        <Typography variant='h5' align='center' gutterBottom>
          { type === 'in' ? 'Sign In' : 'Registration' }
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
                <VpnKeyIcon />
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
          { type === 'in' ? 'SIGN IN' : 'REGISTRATION' }
        </Button>
        <Typography variant='body2' display='inline'>
          { type === 'in' ? 'Don\'t have an account? ' : 'Already have an account? ' }
        </Typography>
        <Link href='#' onClick={ changeTypeForm } variant="body2">
          { type === 'in' ? 'Register' : 'Sign In' }
        </Link>
      </Grid>
    </Grid>
  );
};

export default Login;