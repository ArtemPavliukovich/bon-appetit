import React, { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import { Container, Grid, TextField, Button } from '@material-ui/core';
import { Recipes, Preloader, Filter } from './index';
import { Edamam, meal, diet } from '../api/edamam';
import useStyles from '../styles/Home';
import messages from '../constants/messages';
import { setHistoryState, getHistoryState, setScrollPosition } from '../api/history';
import { typeButton } from '../constants/enums';
import type { DefaultState, ResponseApiEdamam, RecipeType } from '../types';

const initialState: DefaultState = {
  recipes: [],
  page: 0,
  query: '',
  isNextQuery: false,
  preloader: 'not-filter',
  popstate: false,
  scroll: null,
  filter: {
    meal: '',
    diet: ''
  }
};

const Home: React.FC = () => {
  const [ state, setState ] = useState<DefaultState>(getHistoryState() ?? initialState);
  const queryValue = useRef<string>(state.query);
  const isLoad = useRef<boolean>(false);
  const classes = useStyles();
  
  const sendQuery = (): void => {
    if (state.query !== queryValue.current) {
      setState(prev => ({
        ...prev,
        recipes: [],
        page: 0,
        preloader: 'filter',
        scroll: null,
        query: queryValue.current
      }));
    }
  };

  useEffect(() => {
    let isMounted = true;

    setHistoryState({
      ...state,
      preloader: false,
      isNextQuery: true,
      recipes: [],
      popstate: false
    });
    
    Edamam.getRecipe<ResponseApiEdamam>({
      type: 'q',
      page: `${state.page}`,
      text: state.query,
      filter: state.filter,
      popstate: state.popstate
    })
      .then(data => {
        if (isMounted) {
          isLoad.current = data.more;
          setState(prev => ({
            ...prev,
            preloader: false,
            isNextQuery: true,
            popstate: false,
            recipes: [...prev.recipes, ...[data.hits][0].map((el: RecipeType): RecipeType => {
              const recipe = Object.values(el)[0];
              recipe.id = nanoid();
              return recipe;
            })],
          }));
        }
      });

    return ((): void => {isMounted = false});
  }, [state.page, state.query, state.filter]);

  useEffect(() => {
    const lazyLoadContent = (): void => {
      const bodyHeight: number = document.body.offsetHeight,
            screenHeight: number = document.documentElement.clientHeight,
            scrollHeight: number = window.pageYOffset;
      
      if (state.isNextQuery && isLoad.current && bodyHeight - screenHeight - scrollHeight < 1000) {
        isLoad.current = false;
        setState(prev => ({
          ...prev,
          page: prev.page + 1,
          isNextQuery: false
        }));
      }
    };

    if (state.scroll) {
      setScrollPosition(null);
      window.scrollTo(0, +state.scroll);
    }

    window.addEventListener('scroll', lazyLoadContent, {passive: true});

    return (): void => {
      (window as any).removeEventListener('scroll', lazyLoadContent, {passive: true});
    };
  }, [state.recipes, state.isNextQuery, state.scroll]);

  return (
    <Container component='main' className={ classes.main }>
      {state.recipes.length || !(state.preloader && state.preloader === 'not-filter')
        ? <Grid container spacing={ 3 } direction={ state.recipes.length ? 'row' : 'column' }>
            <Grid container justify='space-between' className={ classes.filterBoxes }>
              <Grid container className={ classes.filterBox }>
                <Filter items={ meal } setState={ setState } name={ 'Meal' } value={ state.filter.meal } />
                <Filter items={ diet } setState={ setState } name={ 'Diet' } value={ state.filter.diet } />
              </Grid>
              <Grid container justify='center' className={ classes.filterBox }>
                <TextField
                  size='small'
                  label='Search for recipes' 
                  variant='outlined'
                  defaultValue={ state.query }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    queryValue.current = e.target.value.trim();
                  }}
                />
                <Button
                  size='small'
                  variant='outlined'
                  className={ classes.searchButton }
                  onClick={ sendQuery }
                >
                  { messages.home.searchButton }
                </Button>
              </Grid>
            </Grid>
            {state.preloader === 'filter'
              ? <Preloader />
              : <Recipes recipes={ state.recipes } typeButtonCard={ typeButton.add } />
            }
          </Grid>
        : <Preloader />
      }
    </Container>
  );
};

export default Home;