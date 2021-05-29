import React, { Component } from 'react';
import BetsTabPanel from './BetsTabPanel'
import { Typography, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

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
  headingContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '6.5em',
  },
  addButton: {
    float: "right",
    color: 'white',
    fontSize: '2.5em',
    position: 'relative',
    top: '2px',
  },
  betsTabPanel: {
    marginTop: '6.5em',
  },
  headingText: {
    marginTop: '.2em',
    color: 'white',
  },
  headingTextGroup: {
    paddingRight: '1em',
  },
});

const MyBets = ({history}) => {

    const classes = useStyles();

    return (
      <div>
        <div className={classes.heading}>
          <div className={classes.headingTextGroup}>
            <div className={classes.headingContainer}>
              <Typography variant="h4" className={classes.headingText} color="textPrimary">Mes Paris</Typography>
              <Link to="/">
                <AddIcon className={classes.addButton} />
              </Link>
            </div>
          </div>
        </div>
        <div className={classes.betsTabPanel}>
          <BetsTabPanel />
        </div>
      </div>
    );
}

export default MyBets;