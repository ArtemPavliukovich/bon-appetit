import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { List, ListItem, Link, ListItemText, Badge, Divider } from '@material-ui/core';
import useStyles from '../styles/Header';
import type { RootState } from '../store/store';
import type { NavInitialState } from '../types';

interface NavListProps {
  url: string;
  open: boolean;
  isMenu: boolean;
  setOpen: (prev: boolean) => void;
};

interface LinkType {
  title: string;
  path: string;
};

type BagdeContent = string | null | number;

const navLink: Array<LinkType> = [
  {title: 'Home', path: '/'},
  {title: 'Favorites', path: '/favorites'},
  {title: 'Planner', path: '/planner'}
];

const NavList: React.FC<NavListProps> = ({ url, open, setOpen, isMenu }) => {
  const classes = useStyles();
  const badges: NavInitialState = useSelector((state: RootState) => state.nav);

  const setBadgeContent = (title: string): BagdeContent => {
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
      onClick={(): void => {
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
          const badgeContent: BagdeContent = setBadgeContent(title);
          return (
            <Fragment key={ title }>
              <ListItem 
                className={ `${open ? '' : classes.navItem} ${path === url ? classes.activeLink : ''}` }
              >
                <Link
                  component={ RouterLink }
                  to={ path }
                  className={ open ? '' : classes.navLink }
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>): void => {
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

export default NavList;