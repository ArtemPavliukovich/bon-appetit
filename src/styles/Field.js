import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  iconColor: {color: '#00c853'},

  title: {
    ['@media (max-width: 640px)']: { // eslint-disable-line no-useless-computed-key
      position: 'relative',
      display: 'inline-block',
      top: '50%',
      left: '0',
      transform: 'translateY(-50%)'
    },
    ['@media (max-width: 480px)']: { // eslint-disable-line no-useless-computed-key
      transform: 'translateY(-50%) rotateZ(-90deg)',
      width: '80px',
      textAlign: 'center',
      left: '-30px'
    }
  },

  field: {
    padding: '6px 0 6px 12px',
    flexWrap: 'nowrap',
    '&:nth-child(even)': {
      background: '#e0e0e0'
    }
  },
  
  actions: {textAlign: 'center'},

  comment: {
    wordWrap: 'break-word',
    hyphens: 'auto',
    paddingLeft: '12px'
  }
});

export default useStyles;