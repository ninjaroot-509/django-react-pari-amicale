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
    backgroundColor: '#151515',
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
    axios.post(`http://localhost:8000/api/delete-bet/`, JSON.stringify({bet_id: id}), config)
    .then(res => {
        alert("Votre pari est efface avec succes!");
    })
    .catch(err => {
        alert("Erreur " + err);
    })
    handleClose();
  }

  const [mybets, setMyBet] = useState([])
    
    useEffect(()=>{
        if (mybets.length === 0) {
          getmybets()
        }
    }, [])


    const getmybets = () => {
      request.getMyBet().then(res => setMyBet(res))
    }

  return (
    <>
      {mybets[0]
        ?
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Date</TableCell>
                <TableCell align="center">Equipes</TableCell>
                <TableCell align="center">Proposition</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* only displays your proposed bets */}
              {mybets.map(bet => (
                <TableRow key={bet.id}>
                  <TableCell align="left">{moment(bet.commence_time).calendar()}</TableCell>
                  <TableCell align="center">{bet.team1} @ {bet.team2}</TableCell>
                  <TableCell align="center">
                      {bet.winning_equipe?
                        <Typography style={{color: '#000'}} variant="body2">victoire de {bet.winning_equipe === 'team1' ? bet.team1 : bet.team2}</Typography>
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
            </TableBody>
          </Table>
        </TableContainer>
        :
        <Typography color="textPrimary" className={classes.conditionalText}>You haven't opened any bets right now.</Typography>
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
            Cancel
              </Button>
          <Button style={{backgroundColor: '#303030', color: 'white'}} onClick={() => handleDelete(betToDelete)} color="primary" autoFocus>
            Yes
            </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Open;
