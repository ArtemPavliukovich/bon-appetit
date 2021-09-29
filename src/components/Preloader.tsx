import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';

const Preloader: React.FC = () => {
  return (
    <Grid container justify='center' alignItems='center' style={{flexGrow: 1}}>
      <CircularProgress size={ 50 } />
    </Grid>
  );
};

export default Preloader;