import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  nav: {justifyContent: 'space-between'},

  navLink: {
    color: 'white',
    textTransform: 'uppercase'
  },

  navItem: {width: 'auto'},

  navList: {display: 'flex'},

  button: {margin: theme.spacing(2)}
}));

export default useStyles;