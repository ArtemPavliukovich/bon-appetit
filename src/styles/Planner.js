import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  plannerWrap: {
    background: '#b9f6ca',
    flexGrow: '1',
    padding: '24px'
  },

  planner: {
    border: '2px solid #3949ab',
    borderRadius: '6px',
    height: '100%',
    padding: '12px 0 0 0',
    background: '#bbdefb'
  },

  title: {
    textAlign: 'center',
    paddingBottom: '12px'
  }
});

export default useStyles;