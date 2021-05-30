import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  nav: {justifyContent: 'space-between'},

  navLink: {
    color: 'white',
    textTransform: 'uppercase',
    cursor: 'pointer'
  },

  navItem: {width: 'auto'},

  navList: {display: 'flex'},

  button: {margin: theme.spacing(1)},

  offset: theme.mixins.toolbar,

  display: {display: 'none'},
  flexEnd: {justifyContent: 'flex-end'},
  buttonActive: {backgroundColor: '#303f9f'}
}));

export default useStyles;