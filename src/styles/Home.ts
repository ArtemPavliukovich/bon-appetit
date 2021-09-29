import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  main: {
    padding: '24px',
    flexGrow: 1,
    display: 'flex'
  },

  filterBoxes: {padding: '0 12px'},

  searchButton: {marginLeft: '12px'},
  
  filterBox: {
    width: 'auto',
    ['@media (max-width: 680px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%',
      '&:first-child': {
        marginBottom: '12px',
        justifyContent: 'center'
      },
      '&:last-child': {
        flexWrap: 'nowrap'
      }
    },
  }
});

export default useStyles;