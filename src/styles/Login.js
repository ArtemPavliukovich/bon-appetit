import { makeStyles } from "@material-ui/core/styles";
import { pink, grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
    margin: '6px auto'
  },

  main: {flexGrow: 1},

  margin: {margin: '24px 0'},

  form: {
    padding: '24px',
    margin: theme.spacing(4),
    border: '1px solid black',
    borderColor: grey[600],
    borderRadius: '5px',
    backgroundColor: grey[200],
    textAlign: 'center'
  }
}));

export default useStyles;