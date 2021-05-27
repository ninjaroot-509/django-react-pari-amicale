import React, { useState, useEffect } from 'react';
import { Button, Typography, withStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import moment from 'moment';
import CreateBetForm from './CreateBetForm';
import { makeStyles } from '@material-ui/core/styles';
import request from '../Components/Common/HttpRequests'

const useStyles = makeStyles((theme) => ({
  backButton: {
    fontSize: '3em',
    position: 'relative',
    marginLeft: '.25em',
    marginRight: '1em',
    color: 'white',
  },
  atLogo: {
    fontSize: '1.5em',
    color: 'white',
    padding: '.2em',
    position: 'relative',
    top: '.65em',
  },
  heading: {
    textAlign: 'center',
    display: 'flex',
    height: '5em',
    paddingTop: '.75em',
    paddingBottom: '.75em',
    position: 'fixed',
    width: '100%',
    top: 0,
    backgroundColor: '#303030',
  },
  tabPanel: {
    marginTop: '6.5em',
  },
  gameDate: {
    position: 'absolute',
    top: '4.8em',
    left: '7.2em',
    paddingTop: '.2em',
  },
}));

const AddBet = ({history}) => {
  const { id } = useParams()
  const [game, setGame] = useState([])

  const classes = useStyles();
  
  const getgame = () => {
    request.getGameID(id).then(res => setGame(res))
  }

  const handleBack = () => {
    history.goBack();
  };

  useEffect(()=>{
    if (game.length === 0) {
      getgame()
    }
    console.log(game)
  })
  
  return (
    <>
    <div>
      <div className={classes.heading}>
        <Button onClick={handleBack}>
          <ArrowBackIcon className={classes.backButton} />
        </Button>
        {/* <img src={game.team1} alt={game.team1} width="70" height="70" /> */}
        <Typography color="textPrimary">{game.team1}</Typography>
        <AlternateEmailIcon className={classes.atLogo} />
        {/* <img src={game.team2} alt={game.team2} width="70" height="70" /> */}
        <Typography color="textPrimary">{game.team2}</Typography>
        {/* <Typography color="textPrimary" className={classes.gameDate}>2 juin</Typography> */}
      </div>
      <div className={classes.tabPanel}>
          <CreateBetForm game={game}/>
      </div>
    </div>
    </>
  );
}

export default AddBet;