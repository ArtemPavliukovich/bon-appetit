import React, { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { Select, InputLabel, MenuItem, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import type { DefaultState } from '../types';

interface FilterProps {
  items: Array<string>;
  name: string;
  value: string;
  setState: Dispatch<SetStateAction<DefaultState>>
};

const useStyles = makeStyles({
  filter: {
    width: '150px',
    marginRight: '12px',
    '&:last-child': {
      marginRight: '0',
    }
  }
});

const Filter: React.FC<FilterProps> = ({ setState, items, name, value }) => {
  const [ open, setOpen ] = useState<boolean>(false);
  const classes = useStyles();
  
  const changeFilter = (e: React.ChangeEvent<{value: any}>): void => {
    setState(prev => ({
      ...prev,
      preloader: 'filter',
      recipes: [],
      page: 0,
      scroll: null,
      filter: {
        ...prev.filter,
        [name.toLowerCase()]: e.target.value
      }
    }));
  }
  
  return (
    <FormControl variant='outlined' size='small' className={ classes.filter }>
      <InputLabel id={ name }>
        { name }
      </InputLabel>
      <Select
        labelId={ name }
        label={ name }
        open={ open }
        value={ value }
        onClose={(): void => setOpen(false)}
        onOpen={(): void => setOpen(true)}
        onChange={ changeFilter }
      >
        {items.map((item: string) => 
          <MenuItem value={ item } key={ item }>
            { item ? item : 'none' }
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default Filter;