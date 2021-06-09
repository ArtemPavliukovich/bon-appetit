import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  fon: {background: '#e0e0e0'},
  iconColor: {color: '#00c853'},
  field: {padding: '6px 0 6px 12px'},

  actions: {
    textAlign: 'center'
  },

  comment: {
    wordWrap: 'break-word',
    hyphens: 'auto'
  }
});

export default useStyles;