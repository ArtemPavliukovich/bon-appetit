import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NotFoundImage from '../images/not-found.jpg';

const useStyles = makeStyles({
  box: {
    background: `url(${NotFoundImage}) no-repeat center, white`,
    backgroundSize: 'auto 100%',
    display: 'flex',
    flexGrow: 1
  }
});

const NotFound: React.FC = () => {
  const classes = useStyles();
  return <Box className={ classes.box } />;
};

export default NotFound;