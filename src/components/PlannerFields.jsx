import React, { useRef } from 'react';
import messages from '../constants/messages';
import { Dialog, Select, MenuItem, DialogContent, Button } from '@material-ui/core';
import useStyles from '../styles/PlannerFields';
import { useDispatch } from 'react-redux';
import { setPlannerField } from '../store/actions';

const PlannerFields = ({ openPlannerFields, setPlannerFields, title, url }) => {
  const { fields } = messages.planner;
  const valueSelect = useRef(fields[0]);
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
          defaultValue={ valueSelect.current }
          variant='outlined'
          onChange={ (e) => valueSelect.current = e.target.value }
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
            field: valueSelect.current,
            comment: ''
          }));
          setPlannerFields(false);
        }}
      >
        {messages.plannerFields.button}
      </Button>
    </Dialog>
  );
}

export default PlannerFields;