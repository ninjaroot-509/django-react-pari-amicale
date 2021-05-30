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
      axios.post(`https://paryaj.quizapay.com/api/accept-bet/`, JSON.stringify({id_accept: id, user_position: user_position}), config)
      .then(res => {
        alert('le pari a été accepté')
      })
      .catch(err => {
        alert('Votre solde est insuffisant')
      })
    handleClose();
  }

  return (
    <>
      <TableRow onClick={handleClickOpen}>
        {/* Friend */}
        <TableCell style={{color: '#000'}} align="left">{props.bet.owner_name}</TableCell>
        {/* Game */}
        <TableCell style={{color: '#000'}} align="left">{props.bet.team1} <b style={{color: 'green'}}>VS</b> {props.bet.team2}</TableCell>
        <TableCell style={{color: '#002'}} align="left">{props.bet.prix} gourdes</TableCell>
        {/* Bet */}
        {/* determines if bet is spread or O/U */}
          <TableCell align="left" style={{color: '#000'}}>
            {/* checks if proposer is home team */}
            {props.bet.winning_equipe ?
              <Typography variant="body2" style={{color: '#000'}}>victoire de <b style={{color: 'green'}}>{props.bet.winning_equipe === 'team1' ? props.bet.team1 : props.bet.team2}</b></Typography>
              :
              props.bet.is_null === true? 
                <Typography variant="body2" style={{color: '#000'}}><b style={{color: 'green'}}>match null</b></Typography>
              :''
            }
          </TableCell>
        {/* commence_time */}
        <TableCell style={{color: '#000'}} align="center">{moment(props.bet.commence_time).calendar()}</TableCell>
      </TableRow>
      <>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Prenez-vous ce pari?</DialogTitle>
          <DialogContent>
            {/* displays different confirmation text depending if the bet is spread or over/under */}
            <>
              {/* spread options */}
              <DialogContentText id="alert-dialog-description">
                {props.bet.owner_name} a parier sur la victoire de <b style={{color: 'green'}}>{props.bet.winning_equipe === 'team1' ? props.bet.team1 : props.bet.team2}</b> contre <b style={{color: 'red'}}>{props.bet.winning_equipe === 'team1' ? props.bet.team2 : props.bet.team1}</b> pour une somme de {props.bet.prix} Gourdes
                <br/>
                si vous acceptez le pari, vous paierez {props.bet.prix} gourdes, et si vous gagnez, vous aurez gagné le double (-20%)
              </DialogContentText>
            </>            
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              Annuler
          </Button>
            <Button onClick={() => acceptBet(props.bet.id, props.bet.winning_equipe === 'team1' ? 'team2' : 'team1')}>
              Accepter le pari
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </>
  );
}

export default OpenBetRow;