import React, { useEffect } from 'react';
import { Grid, Container, Typography, Button } from '@material-ui/core';
import useStyles from '../styles/Planner';
import { Field } from './index';
import SaveIcon from '@material-ui/icons/Save';
import html2canvas from 'html2canvas';
import { useSelector, useDispatch } from 'react-redux';
import messages from '../constants/messages';
import { changePlanner } from '../store/actions';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const saveScreenPlanner = () => {
  html2canvas(document.getElementById('planner'))
    .then(canvas => {
      const link = document.createElement('a');
      link.download = 'planner.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
}

const Planner = () => {
  const classes = useStyles();
  const fields = useSelector(state => state.planner);
  const plannerBudge = useSelector(state => state.nav);
  const dispatch = useDispatch();
  const isMaxWidth640 = useMediaQuery('(max-width: 640px)');

  useEffect(() => {
    if (plannerBudge.planner) {
      dispatch(changePlanner({isChange: false}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
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
            {messages.planner.title.map((title, i) =>
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
          {fields.map((field, i) => 
            <Field field={ field } key={ i + 'field' } />
          )}
        </Container>
      </Grid>
    </>
  );
};

export default Planner;