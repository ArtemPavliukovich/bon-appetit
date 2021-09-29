import React, { useEffect } from 'react';
import { Container, Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Recipes } from './index';
import useStyles from '../styles/Favorites';
import { addRecipe } from '../store/actions';
import { typeButton } from '../constants/enums';
import type { NavInitialState, RecipeType } from '../types';
import type { RootState } from '../store/store';

const Favorites: React.FC = () => {
  const { main, padding } = useStyles();
  const recipes: RecipeType[] = useSelector((state: RootState) => state.favorites);
  const favoritesBudge: NavInitialState = useSelector((state: RootState) => state.nav);
  const dispatch = useDispatch();

  useEffect(() => {
    if (favoritesBudge.favorites) {
      dispatch(addRecipe({countRecipe: 0}));
    }
  }, [dispatch, favoritesBudge.favorites]);

  return (
    <Container className={ `${recipes.length ? padding : main}` }>
      <Grid container spacing={ 3 }>
        <Recipes recipes={ recipes } typeButtonCard={ typeButton.delete } />
      </Grid>
    </Container>
  );
};

export default Favorites;