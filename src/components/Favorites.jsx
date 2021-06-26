import React, { useEffect } from 'react';
import { Recipes } from './index';
import { Container, Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import useStyles from '../styles/Favorites';
import { addRecipe } from '../store/actions';

const Favorites = () => {
  const { main, padding } = useStyles();
  const recipes = useSelector(state => state.favorites);
  const favoritesBudge = useSelector(state => state.nav);
  const dispatch = useDispatch();

  useEffect(() => {
    if (favoritesBudge.favorites) {
      dispatch(addRecipe({countRecipe: 0}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className={ `${recipes.length ? padding : main}` }>
      <Grid container spacing={ 3 }>
        <Recipes recipes={ recipes } typeButtonCard={ 'delete' } />
      </Grid>
    </Container>
  );
};

export default Favorites;