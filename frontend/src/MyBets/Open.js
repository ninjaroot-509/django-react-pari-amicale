import React, { useEffect, useState } from 'react';
import { makeStyles, Dialog, DialogActions, DialogTitle, Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Paper, Typography, Button } from '@material-ui/core'
import moment from 'moment';
import 'moment/locale/fr'
import DeleteIcon from '@material-ui/icons/Delete';
import request from '../Components/Common/HttpRequests'
import { getUser, getToken } from '../Components/Common/Auth/Sessions'
import axios from 'axios'

const useStyles = makeStyles({
  tableContainer: {
    marginTop: '2.9em',
  }, 
  conditionalText: {
    marginTop: '4.5em',
    paddingLeft: '24px',
    paddingRight: '24px',
    color: '#151515',
  }
});

function Open(props) {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const classes = useStyles();
  const token = getToken()

  const [open, setOpen] = useState(false);
  const [betToDelete, changeBetToDelete] = useState('');

  const handleClickOpen = (id) => {
    changeBetToDelete(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //deleting bet
  const handleDelete = (id) => {
    const config = { headers: { 'Content-Type': 'application/json' } }
    if (token) config.headers['Authorization'] = `Token ${token}`
    axios.post(`https://paryaj.quizapay.com/api/delete-bet/`, JSON.stringify({bet_id: id}), config)
    .then(res => {
        alert("le pari a été effacé avec succès!");
    })
    .catch(err => {
        alert("Erreur " + err);
    })
    handleClose();
  }

  const [temp, setTemp] = useState(0)

  const [mybets, setMyBet] = useState([])
    

  const getmybets = () => {
    request.getMyBet().then(res => setMyBet(res))
  }

  useEffect(()=>{
      setInterval(()=>{
          setTemp((prevTemp)=>prevTemp+1)
      }, 4000)
  }, [])

  useEffect(()=>{
    getmybets()
  }, [temp])

  return (
    <>
      {mybets[0]
        ?
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{fontWeight: 'bold'}}>heure de début</TableCell>
                <TableCell align="center" style={{fontWeight: 'bold'}}>Equipes</TableCell>
                <TableCell align="center" style={{fontWeight: 'bold'}}>Montants</TableCell>
                <TableCell align="center" style={{fontWeight: 'bold'}}>Votre proposition</TableCell>
                <TableCell align="right" style={{fontWeight: 'bold'}}>Effacer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* only displays your proposed bets */}
              {mybets.map(bet => (
                <TableRow key={bet.id}>
                  <TableCell align="left">{moment(bet.commence_time).calendar()}</TableCell>
                  <TableCell align="center">{bet.team1} @ {bet.team2}</TableCell>
                  <TableCell align="center">{bet.prix} gourdes</TableCell>
                  <TableCell align="center">
                      {bet.winning_equipe?
                        <Typography style={{color: '#000'}} variant="body2">victoire de <b>{bet.winning_equipe === 'team1' ? bet.team1 : bet.team2}</b></Typography>
                        :
                        bet.is_null === true? 
                          <Typography style={{color: '#000'}} variant="body2">match null</Typography>
                        :''
                      }
                  </TableCell>
                  <TableCell align="center">
                    <DeleteIcon style={{color: '#662424'}} onClick={() => handleClickOpen(bet.id)} />
                  </TableCell>
                </TableRow>
              ))}
              <br />
            </TableBody>
          </Table>
        </TableContainer>
        :
        <Typography color="textPrimary" className={classes.conditionalText}>Vous n'avez pas ouvert de paris en ce moment.</Typography>
      }
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{backgroundColor: '#303030'}}id="alert-dialog-title">{`Delete open bet?`}</DialogTitle>
        <DialogActions style={{backgroundColor: '#303030'}}>
          <Button style={{backgroundColor: '#303030', color: 'white'}} onClick={handleClose} color="primary">
            Annuler
              </Button>
          <Button style={{backgroundColor: '#303030', color: 'white'}} onClick={() => handleDelete(betToDelete)} color="primary" autoFocus>
            Oui
            </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Open;
