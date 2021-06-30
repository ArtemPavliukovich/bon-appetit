import { makeStyles } from '@material-ui/core/styles';
import noPhoto from '../images/no-photo.svg';

const useStyles = makeStyles({
  main: {
    padding: '24px',
    flexGrow: '1',
    display: 'flex',
    flexWrap: 'wrap'
  },

  recipeImg: {
    width: '300px',
    height: '300px',
    background: `url(${noPhoto}) no-repeat center / 100% 100%`
  },

  recipeInfo: {
    width: 'calc(100% - 300px)',
    padding: ' 12px 0 12px 20px',
    ['@media (max-width: 640px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%',
      padding: '12px 0'
    }
  },

  table: {margin: '24px 0'},
  tableHead: {background: '#bdbdbd'},
  tableRow: {background: '#f5f5f5'}
});

export default useStyles;