import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { List, ListItem, Link, ListItemText, Badge, Divider } from '@material-ui/core';
import useStyles from '../styles/Header';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const navLink = [
  {title: 'Home', path: '/'},
  {title: 'Favorites', path: '/favorites'},
  {title: 'Planner', path: '/planner'}
];

const NavList = ({ url, open, setOpen, isMenu }) => {
  const classes = useStyles();
  const badges = useSelector(state => state.nav);

  const setBadgeContent = (title) => {
    title = title.toLowerCase();
    switch (title) {
      case 'favorites':
        return badges[title] || null;
      case 'planner':
        return badges[title] ? '!' : null;
      default:
        return null;
    }
  };
  
  return (
    <div 
      role='presentation'
      className={ open ? clsx(classes.list) : '' }
      onClick={() => {
        if (open) {
          setOpen(false);
        }
      }}
    >
      <List 
        className={ open ? '' : classes.navList } 
        aria-labelledby='main navigation'
      >
        {navLink.map(({ title, path }) => {
          const badgeContent = setBadgeContent(title);
          return (
            <Fragment key={ title }>
              <ListItem 
                className={ `${open ? '' : classes.navItem} ${path === url ? classes.activeLink : ''}` }
              >
                <Link
                  component={ RouterLink }
                  to={ path }
                  className={ open ? '' : classes.navLink }
                  onClick={(e) => {
                    if (path === url) {
                      e.preventDefault();
                    } 
                  }}
                >
                  <Badge 
                    color='secondary' 
                    badgeContent={ badgeContent }
                    showZero={ true }
                    className={ isMenu && !open ? classes.display : '' }
                    classes={{ badge: classes.badge }}
                  >
                    <ListItemText primary={ title } />
                  </Badge>
                </Link>
              </ListItem>
              { open && <Divider /> }
            </Fragment>
          );
        })}
      </List>
    </div>
  );
};

NavList.propTypes = {
  url: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  isMenu: PropTypes.bool.isRequired
};

export default NavList;