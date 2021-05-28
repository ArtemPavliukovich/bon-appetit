import React from 'react';
import { AppBar, Toolbar, List, ListItem, Link, ListItemText, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link as RouterLink } from 'react-router-dom';
import useStyles from '../styles/Header';
// import { ReactComponent as Logo } from '../images/logo.svg';

const navLink = [
  {title: 'Home', path: '/'},
  {title: 'Favorites', path: '/favotites'},
  {title: 'Planner', path: '/planner'},
  {title: 'Analyzer', path: '/analyzer'}
];

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position='static'>
      <Toolbar component='nav' className= { classes.nav }>
        <List className={ classes.navList } aria-labelledby='main navigation'>
          {navLink.map(({ title, path }) => {
            return (
              <ListItem className={ classes.navItem } key={ title }>
                <Link component={ RouterLink } to={ path } className={ classes.navLink }>
                  <ListItemText primary={ title } />
                </Link>
              </ListItem>
            );
          })}
        </List>
        <Button 
          component={ RouterLink } 
          to='/login' 
          startIcon={ <LockOutlinedIcon /> } 
          variant='outlined' 
          className={ classes.button }
        >
          sign in
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;