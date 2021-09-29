import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { AppBar, Toolbar, Button, Container, IconButton, Grid, Typography, Drawer } from '@material-ui/core';
import { ExitToApp, Menu } from '@material-ui/icons';
import { NavList } from './index';
import useStyles from '../styles/Header';
import messages from '../constants/messages';
import Firebase from '../api/firebase';

interface LocationParams {
  pathname: string;
};

const exit = (): void => {
  Firebase.exit();
  window.location.reload();
};

const Header: React.FC = () => {
  const { pathname }: LocationParams = useLocation();
  const [ open, setOpen ] = useState<boolean>(false);
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
              onClick={(): void => setOpen(true)}
            >
              <Menu />
            </IconButton>
            {isMenu 
              ? <Drawer 
                  open={ open }
                  anchor='right'
                  onClose={(): void => setOpen(false)}
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
                {Firebase.getUser().email}
              </Typography>
              <Button
                startIcon={ <ExitToApp /> } 
                variant='outlined' 
                className={ classes.button }
                onClick={ exit }
              >
                {messages.header.button}
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