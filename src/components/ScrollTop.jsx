import React from 'react';
import { Zoom, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

const useStyles = makeStyles((theme) => ({
  box: {
    position: 'fixed',
    bottom: theme.spacing(3),
    right: theme.spacing(3)
  }
}));

const ScrollTop = () => {
  const { box } = useStyles();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: window.screen.height + 200,
  });

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Zoom in={ trigger }>
      <div className={ box } onClick={ scrollTop } role='presentation'>
        <Fab color='secondary' size='small' aria-label='scroll back to top'>
          <KeyboardArrowUpIcon />
        </Fab>
      </div>
    </Zoom>
  );
};

export default ScrollTop;
