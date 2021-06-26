import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';

const Preloader = ({ height }) => {
  return (
    <Grid container justify='center' alignItems='center' style={{height: height}}>
      <CircularProgress size={ 50 } />
    </Grid>
  );
};

Preloader.propTypes = {
  height: PropTypes.string.isRequired
};

export default Preloader;