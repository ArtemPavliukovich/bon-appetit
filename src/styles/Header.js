import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  nav: {
    justifyContent: 'space-between',
    minWidth: '360px'
  },

  navLink: {
    color: 'white',
    textTransform: 'uppercase',
    cursor: 'pointer'
  },

  navItem: {width: 'auto'},
  navList: {display: 'flex'},
  activeLink: {background: 'rgba(0, 0, 0, 0.25)'},
  button: {margin: theme.spacing(1)},
  offset: theme.mixins.toolbar,
  display: {display: 'none'},
  badge: {top: '14%!important'},
  list: {width: 250},

  email: {
    maxWidth: '140px',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}));

export default useStyles;