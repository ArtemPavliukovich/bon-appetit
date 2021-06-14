import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, List, ListItem, Link, ListItemText } from '@material-ui/core';
import { Button, Container, IconButton, Grid, Typography } from '@material-ui/core';
import { ExitToApp, Menu } from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import useStyles from '../styles/Header';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import messages from '../constants/messages';
import Firebase from '../api/firebase';
// import { ReactComponent as Logo } from '../images/logo.svg';

const navLink = [
  {title: 'Home', path: '/'},
  {title: 'Favorites', path: '/favorites'},
  {title: 'Planner', path: '/planner'}
];

const exit = () => {
  Firebase.exit();
  window.location.reload();
};

const Header = () => {
  const [ url, setUrl ] = useState(window.location.pathname);
  const [ menu, setMenu ] = useState(false);
  const isMenu = useMediaQuery('(max-width: 640px)');
  const classes = useStyles();

  useEffect(() => {
    window.addEventListener('popstate', () => {
      setUrl(window.location.pathname);
    });
  }, []);
  
  return (
    <>
      <AppBar position={ url === '/' || url === '/favorites' ? 'fixed' : 'static'}>
        <Container disableGutters={ true }> 
          <Toolbar
            component='nav'
            className= { `${classes.nav} ${url === '/login' ? classes.flexEnd : ''}` }
          >
            <IconButton
              color='inherit' 
              aria-label='menu'
              className={ isMenu && url !== '/login' ? '' : classes.display }
              onClick={ () => setMenu(!menu) }
            >
              <Menu />
            </IconButton>
            <List 
              className={ `${classes.navList} ${url === '/login' || isMenu ? classes.display : ''}` } 
              aria-labelledby='main navigation'
            >
              {navLink.map(({ title, path }) => {
                return (
                  <ListItem className={ classes.navItem } key={ title }>
                    <Link 
                      component={ url === path ? 'a' : RouterLink }
                      href={ url === path ? '#' : null }
                      to={ path }
                      className={ classes.navLink }
                      onClick={(e) => {
                        path !== url ? setUrl(path) : e.preventDefault();
                      }}
                    >
                      <ListItemText primary={ title } />
                    </Link>
                  </ListItem>
                );
              })}
            </List>
            <Grid container alignItems='center' justify='flex-end' wrap='nowrap'>
              <Typography>
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
      { url === '/' || url === '/favorites' ? <div className={ classes.offset } /> : null }
    </>
  );
};

export default Header;