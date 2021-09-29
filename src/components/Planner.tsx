import React, { useEffect } from 'react';
import { Grid, Container, Typography, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { useSelector, useDispatch } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import html2canvas from 'html2canvas';
import { Field } from './index';
import useStyles from '../styles/Planner';
import messages from '../constants/messages';
import { changePlanner } from '../store/actions';
import type { RootState } from '../store/store';
import type { ObjectPlannerField, NavInitialState } from '../types';

const saveScreenPlanner = (): void => {
  html2canvas(document.getElementById('planner') as HTMLElement)
    .then((canvas: any) => {
      const link: HTMLAnchorElement = document.createElement('a');
      link.download = 'planner.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
};

const Planner: React.FC = () => {
  const classes = useStyles();
  const fields: Array<ObjectPlannerField> = useSelector((state: RootState) => state.planner);
  const plannerBudge: NavInitialState = useSelector((state: RootState)  => state.nav);
  const dispatch = useDispatch();
  const isMaxWidth640 = useMediaQuery('(max-width: 640px)');

  useEffect(() => {
    if (plannerBudge.planner) {
      dispatch(changePlanner({isChange: false}));
    }
  }, [dispatch, plannerBudge.planner]);
  
  return (
    <>
      <Grid container justify='center' className={ classes.saveBox }>
        <Button
          variant='contained'
          color='primary'
          startIcon={ <SaveIcon /> }
          onClick={ saveScreenPlanner }
        >
          {messages.planner.button}
        </Button>
      </Grid>
      <Grid container justify='center' alignItems='center' className={ classes.plannerWrap }>
        <Container maxWidth='md' className={ classes.planner } id='planner'>
          <Grid container>
            {messages.planner.title.map((title: string, i: number) =>
              <Grid 
                item 
                key={ title + i } 
                className={ classes.title }
                component={ Typography }
                variant='h6'
                xs={ i === 0 || i === 3 ? 2 : 4 }
              >
                { i === 3 && isMaxWidth640 ? '' : title }
              </Grid>
            )}
          </Grid>
          {fields.map((field: ObjectPlannerField, i: number) => 
            <Field field={ field } key={ i + 'field' } />
          )}
        </Container>
      </Grid>
    </>
  );
};

export default Planner;