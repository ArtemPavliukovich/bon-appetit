import React from 'react';
import { Recipes } from './index';
import useStyles from '../styles/Home';
import { Container, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';

const Favorites = () => {
  const { main, padding } = useStyles();
  const recipes = useSelector(state => state.favorites);

  return (
    <Container className={ `${recipes.length ? padding : main}` }>
      <Grid container spacing={ 3 }>
        <Recipes recipes={ recipes } typeButtonCard={ 'delete' } />
      </Grid>
    </Container>
  );
};

export default Favorites;