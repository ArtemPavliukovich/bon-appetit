import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles({
  media: {height: 250},

  chipsBox: {margin: '8px 0 12px 0'},

  cardContent: {padding: '0!important'},
  
  favoriteIcon: {color: '#d50000'},

  title: {
    lineHeight: '1.2',
    margin: '8px 0'
  },

  card: {
    padding: '12px',
    height: '100%',
    backgroundColor: grey[300],
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },

  lorem: {
    display: '-webkit-box',
    textOverflow: 'ellipsis',
    WebkitLineClamp: 4,
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical' 
  }
});

export default useStyles;