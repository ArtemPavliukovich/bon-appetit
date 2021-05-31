import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  main: {padding: '24px'},
  displayOff: {display: 'none'},

  position: {
    flexGrow: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default useStyles;