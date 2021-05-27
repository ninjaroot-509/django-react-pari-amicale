import React, {useState} from 'react';
import moment from 'moment';
// import Moment from 'react-moment';
import 'moment/locale/fr'
import { makeStyles } from '@material-ui/core/styles';
import { Button, TableCell, TableRow, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { getToken } from '../Components/Common/Auth/Sessions'
import axios from 'axios'

const useStyles = makeStyles({
  table: {
    width: 600,
    height: 50
  },
});

function OpenBetRow(props) {
  const token = getToken()
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function acceptBet(id, user_position) {
    //regardless, closes the dialog
    const config = { headers: { 'Content-Type': 'application/json' } }
    if (token) config.headers['Authorization'] = `Token ${token}`
      axios.post(`http://localhost:8000/api/accept-bet/`, JSON.stringify({id_accept: id, user_position: user_position}), config)
      .then(res => {
      })
      .catch(err => {
      })
    handleClose();
  }

  return (
    <>
      <TableRow onClick={handleClickOpen}>
        {/* Friend */}
        <TableCell style={{color: 'white'}} align="left">{props.bet.owner_name}</TableCell>
        {/* Game */}
        <TableCell style={{color: 'white'}} align="left">{props.bet.team1} @ {props.bet.team2}</TableCell>
        {/* Bet */}
        {/* determines if bet is spread or O/U */}
          <TableCell align="left" style={{color: 'white'}}>
            {/* checks if proposer is home team */}
            {props.bet.winning_equipe ?
              <Typography variant="body2">victoire de {props.bet.winning_equipe === 'team1' ? props.bet.team1 : props.bet.team2}</Typography>
              :
              props.bet.is_null === true? 
                <Typography variant="body2">match null</Typography>
              :''
            }
          </TableCell>
        {/* commence_time */}
        <TableCell style={{color: 'white'}} align="center">{moment(props.bet.commence_time).calendar()}</TableCell>
      </TableRow>
      <>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Take this Bet?</DialogTitle>
          <DialogContent>
            {/* displays different confirmation text depending if the bet is spread or over/under */}
            <>
              {/* spread options */}
              <DialogContentText id="alert-dialog-description">
                {props.bet.owner_name} a parier sur victoire de {props.bet.winning_equipe === 'team1' ? props.bet.team1 : props.bet.team2} contre {props.bet.winning_equipe === 'team1' ? props.bet.team2 : props.bet.team1} pour une somme de {props.bet.prix} Gourdes
                <br/>
                si tu accept le parie tu paieras {props.bet.prix} gourdes, et si tu gagnes tu auras gagne {props.bet.prix} X2
              </DialogContentText>
            </>            
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              Back
          </Button>
            <Button onClick={() => acceptBet(props.bet.id, props.bet.winning_equipe === 'team1' ? 'team2' : 'team1')}>
              Accept Bet
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </>
  );
}

export default OpenBetRow;