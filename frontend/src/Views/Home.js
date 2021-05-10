import React, { Component } from 'react';
import { withStyles, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import TabPanel from './TabPanel';

const useStyles = makeStyles((theme) => ({
  heading: {
    padding: '1em',
    textAlign: 'center',
    position: 'fixed',
    width: '100%',
    top: 0,
    backgroundColor: '#303030',
    height: '4.5em',
  },
  tabPanel: {
    marginTop: '6.5em',
  },
  headingText: {
    marginTop: '.2em',
  },
  headingTextGroup: {
    paddingRight: '1em',
    color: 'white',
  },
}));

const Home = () => {
    const classes = useStyles();

    return (
      <div>
        <div className={classes.heading}>
          <div className={classes.headingTextGroup}>
            <Typography variant="h4" className={classes.headingText}>Le tableau</Typography>
            <Typography>Semaine </Typography>
          </div>
        </div>
        <div className={classes.tabPanel}>
          {/* <TabPanel /> */}
        </div>
      </div>
    );
}

export default Home;
