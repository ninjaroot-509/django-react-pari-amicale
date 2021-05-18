import React, { Component } from 'react';
import BetsTabPanel from './BetsTabPanel'
import { Typography, withStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  heading: {
    padding: '1em',
    textAlign: 'center',
    position: 'fixed',
    width: '100%',
    top: 0,
    backgroundColor: '#303030',
    height: '4.5em',
  },
  betsTabPanel: {
    marginTop: '6.5em',
  },
  headingText: {
    marginTop: '.2em',
  },
  headingTextGroup: {
    paddingRight: '1em',
  },
});

const MyBets = () => {

    const classes = useStyles();

    return (
      <div>
        <div className={classes.heading}>
          <div className={classes.headingTextGroup}>
            <Typography variant="h4" className={classes.headingText} color="textPrimary">My Bets</Typography>
            <Typography color="textPrimary">Lifetime Overall: Units</Typography>
          </div>
        </div>
        <div className={classes.betsTabPanel}>
          <BetsTabPanel />
        </div>
      </div>
    );
}

export default MyBets;