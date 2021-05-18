import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#151515',

  },
  headingContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '6.5em',
  },
  heading: {
    paddingRight: '20px',
    color: 'white',
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  multilineColor: {
    color: 'white',
    borderColor: 'green !important'
    
  },
  borderColor: {
    color: 'white !important',
    borderColor: 'white !important',
  },
  cssLabel: {
    color: 'white'
  },
  addButton: {
    float: "right",
    color: 'white',
    fontSize: '2.5em',
    position: 'relative',
    top: '2px',
  },
  margin: {
    margin: theme.spacing(1),
  },
  search: {
    
  },
  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'white !important'
  },
  mainContainer: {
    position: 'fixed',
    zIndex: '20',
    width: '100%',
    top: 0,
    backgroundColor: '#303030'
  },
}));


function FriendsListHeading(props) {
  const classes = useStyles();

  return (
    <div className={classes.mainContainer}>
      <div className={classes.headingContainer}>
        <Typography variant="h4" className={classes.heading}>Ajouter ici!</Typography>
        <Link to="/friends/add">
          <AddIcon className={classes.addButton} />
        </Link>
      </div>
    </div>
  );
}

export default FriendsListHeading;
