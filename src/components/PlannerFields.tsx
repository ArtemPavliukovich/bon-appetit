import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, Select, MenuItem, DialogContent, Button } from '@material-ui/core';
import messages from '../constants/messages';
import useStyles from '../styles/PlannerFields';
import { setPlannerField, changePlanner } from '../store/actions';

interface PlannerFieldsProps {
  openPlannerFields: boolean;
  title: string;
  url: string;
  setPlannerFields: (open: boolean) => void;
};

const PlannerFields: React.FC<PlannerFieldsProps> = ({ openPlannerFields, setPlannerFields, title, url }) => {
  const { fields } = messages.planner;
  const [ valueSelect, setValueSelect ] = useState<string>('');
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Dialog
      open={ openPlannerFields } 
      onClose={(): void => setPlannerFields(false)} 
      aria-labelledby='dialog-title'
    >
      <DialogContent>
        <Select
          value={ valueSelect }
          variant='outlined'
          onChange={(e: React.ChangeEvent<{value: any}>): void => setValueSelect(e.target.value)}
          className={ classes.select }
        >
          {fields.map((fieldName: string) => 
            <MenuItem value={ fieldName } key={ fieldName }>
              {fieldName}
            </MenuItem>
          )}
        </Select>
      </DialogContent>
      <Button 
        variant='contained'
        onClick={(): void => {
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

export default PlannerFields;