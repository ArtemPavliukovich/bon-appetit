import React, { useState } from 'react';
import messages from '../constants/messages';
import { Dialog, Select, MenuItem, DialogContent, Button } from '@material-ui/core';
import useStyles from '../styles/PlannerFields';
import { useDispatch } from 'react-redux';
import { setPlannerField, changePlanner } from '../store/actions';
import PropTypes from 'prop-types';

const PlannerFields = ({ openPlannerFields, setPlannerFields, title, url }) => {
  const { fields } = messages.planner;
  const [ valueSelect, setValueSelect ] = useState('');
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Dialog
      open={ openPlannerFields } 
      onClose={ () => setPlannerFields(false) } 
      aria-labelledby='dialog-title'
    >
      <DialogContent>
        <Select
          value={ valueSelect }
          variant='outlined'
          onChange={ (e) => setValueSelect(e.target.value) }
          className={ classes.select }
        >
          {fields.map(fieldName => 
            <MenuItem value={ fieldName } key={ fieldName }>
              {fieldName}
            </MenuItem>
          )}
        </Select>
      </DialogContent>
      <Button 
        variant='contained'
        onClick={() => {
          dispatch(setPlannerField({
            title: title,
            url: url,
            fieldName: valueSelect,
            comment: ''
          }));
          dispatch(changePlanner({isChange: true}));
          setPlannerFields(false);
        }}
      >
        {messages.plannerFields.button}
      </Button>
    </Dialog>
  );
};

PlannerFields.propTypes = {
  openPlannerFields: PropTypes.bool.isRequired,
  setPlannerFields: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default PlannerFields;