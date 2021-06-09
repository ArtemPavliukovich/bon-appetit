import React, { Fragment, useState, useEffect } from 'react';
import { AppBar, Toolbar, List, ListItem, Link, ListItemText, Button, Container, IconButton, Slide } from '@material-ui/core';
import { LockOutlined, Menu } from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import useStyles from '../styles/Header';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import messages from '../constants/messages';
// import { ReactComponent as Logo } from '../images/logo.svg';

const navLink = [
  {title: 'Home', path: '/'},
  {title: 'Favorites', path: '/favotites'},
  {title: 'Planner', path: '/planner'}
];

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
    <Fragment>
      <AppBar position={ url === '/' ? 'fixed' : 'static'}>
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
            {/* <Slide>
              {'hgghg'}
            </Slide> */}
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
            <Button 
              component={ url === '/login' ? 'button' : RouterLink } 
              to='/login' 
              startIcon={ <LockOutlined /> } 
              variant='outlined' 
              className={ `${classes.button} ${url === '/login' ? classes.buttonActive : ''}` }
              onClick={ () => setUrl('/login') }
            >
              {messages.header.button}
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      { url === '/' ? <div className={ classes.offset } /> : null }
    </Fragment>
  );
};

export default Header;