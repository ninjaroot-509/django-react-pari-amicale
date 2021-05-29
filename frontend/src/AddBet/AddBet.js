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
    height: '9em',
    paddingTop: '.75em',
    paddingBottom: '.75em',
    position: 'absolute',
    width: '100%',
    top: 0,
    backgroundColor: '#303030',
  },
  tabPanel: {
    paddingTop: '50%',
  },
  gameDate: {
    position: 'absolute',
    textAlign: 'center',
    top: '9em',
    left: '8.2em',
    paddingTop: '.2em',
    color: 'white'
  },
  team: {
    color: 'white'
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
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
  })
  
  return (
    <>
    <div>
      <div className={classes.heading}>
        <Button onClick={handleBack}>
          <ArrowBackIcon className={classes.backButton} />
        </Button>
        <div>
          <img src={process.env.PUBLIC_URL + '/static/assets/img/icons/sports.png'} alt={game.team1} width="70" height="70" />
          <Typography color="textPrimary" className={classes.team}>{game.team1}</Typography>
        </div>
        <AlternateEmailIcon className={classes.atLogo} />
        <div>
          <img src={process.env.PUBLIC_URL + '/static/assets/img/icons/sports.png'} alt={game.team2} width="70" height="70" />
          <Typography color="textPrimary" className={classes.team}>{game.team2}</Typography>
        </div>
        <Typography color="textPrimary" className={classes.gameDate}>{moment(game.commence_time).calendar()}</Typography>
      </div>
    </div>
      <div className={classes.tabPanel}>
          <CreateBetForm game={game} history={history}/>
      </div>
    </>
  );
}

export default AddBet;