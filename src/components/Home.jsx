import React, { useState, useEffect, useRef } from 'react';
import { Edamam, meal, diet } from '../api/edamam';
import { Container, Grid, TextField, Button } from '@material-ui/core';
import { Recipes, Preloader, Filter } from './index';
import useStyles from '../styles/Home';
import messages from '../constants/messages';
import { nanoid } from 'nanoid';
import { setHistoryState, getHistoryState, setScrollPosition } from '../api/history';

const defaultState = {
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

const Home = () => {
  const [ state, setState ] = useState(getHistoryState() ?? defaultState);
  const queryValue = useRef(state.query); // для неуправляемого input
  const isLoad = useRef(false); // для флага, который разрешает next запрос к api
  const classes = useStyles();
  
  const sendQuery = () => {
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
    
    Edamam.getRecipe({
      type: 'q',
      page: state.page,
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
            recipes: [...prev.recipes, ...[data.hits][0].map(el => {
              const recipe = Object.values(el)[0];
              recipe.id = nanoid();
              return recipe;
            })],
          }));
        }
      });

    return (() => {isMounted = false});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.page, state.query, state.filter]);

  useEffect(() => {
    const lazyLoadContent = () => {
      const bodyHeight = document.body.offsetHeight,
            screenHeight = document.documentElement.clientHeight,
            scrollHeight = window.pageYOffset;
      
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

    return () => {
      window.removeEventListener('scroll', lazyLoadContent, {passive: true});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.recipes]);

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
                  onChange={ (e) => queryValue.current = e.target.value.trim() }
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
              : <Recipes recipes={ state.recipes } typeButtonCard={ 'add' } />
            }
          </Grid>
        : <Preloader />
      }
    </Container>
  );
};

export default Home;