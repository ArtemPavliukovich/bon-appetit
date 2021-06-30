import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Container, IconButton, Grid, Typography, Drawer } from '@material-ui/core';
import { ExitToApp, Menu } from '@material-ui/icons';
import useStyles from '../styles/Header';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import messages from '../constants/messages';
import Firebase from '../api/firebase';
import { NavList } from './index';
import { useLocation } from 'react-router-dom';

const exit = () => {
  Firebase.exit();
  window.location.reload();
};

const Header = () => {
  const { pathname } = useLocation();
  const [ open, setOpen ] = useState(false);
  const isMenu = useMediaQuery('(max-width: 640px)');
  const classes = useStyles();
  
  return (
    <>
      <AppBar position={ pathname === '/' || pathname === '/favorites' ? 'fixed' : 'static' }>
        <Container disableGutters={ true }> 
          <Toolbar
            component='nav'
            className= { classes.nav }
          >
            <IconButton
              color='inherit' 
              aria-label='menu'
              className={ isMenu ? '' : classes.display }
              onClick={ () => setOpen(true) }
            >
              <Menu />
            </IconButton>
            {isMenu 
              ? <Drawer 
                  open={ open }
                  anchor='right'
                  onClose={ () => setOpen(false) }
                >
                  <NavList 
                    open={ open } 
                    setOpen={ setOpen } 
                    url={ pathname } 
                    isMenu={ isMenu }
                  />
                </Drawer>
              : <NavList 
                  open={ open } 
                  setOpen={ setOpen } 
                  url={ pathname } 
                  isMenu={ isMenu }
                />
            }
            <Grid container alignItems='center' justify='flex-end' wrap='nowrap'>
              <Typography className={ classes.email }>
                { Firebase.getUser().email }
              </Typography>
              <Button
                startIcon={ <ExitToApp /> } 
                variant='outlined' 
                className={ classes.button }
                onClick={ exit }
              >
                { messages.header.button }
              </Button>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
      { pathname === '/' || pathname === '/favorites' ? <div className={ classes.offset } /> : null }
    </>
  );
};

export default Header;