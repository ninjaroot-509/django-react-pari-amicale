import React, {  } from 'react';
import FriendsListHeading from './FriendsListHeading'
import { withStyles, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TabPanel from './TabPanel';

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

const FriendsList = () => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.heading}>
        <FriendsListHeading />
      </div>
      <div className={classes.tabPanel}>
        <TabPanel />
      </div>
    </div>
  );
}

export default FriendsList;
