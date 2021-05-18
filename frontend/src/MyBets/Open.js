import React, { useEffect, useState } from 'react';
import { makeStyles, Dialog, DialogActions, DialogTitle, Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Paper, Typography, Button } from '@material-ui/core'
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import request from '../Components/Common/HttpRequests'

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
    console.log('deleting bet:', id);
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
                <TableCell align="center">Game</TableCell>
                <TableCell align="left">My Bet</TableCell>
                <TableCell align="center">Wager</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* only displays your proposed bets */}
              {mybets.map(bet => (
                <TableRow key={bet.id}>
                  <TableCell align="left">{moment(bet.commence_time).format("M/D")}</TableCell>
                  <TableCell align="center">{bet.team1} @ <br/> {bet.team2}</TableCell>
                  {/* determines if bet is spread or O/U */}
                  {bet.proposers_team_id ? 
                    <>
                      {/* checks if proposer is home team */}
                      {bet.proposers_team_is_home_team ?
                        <TableCell align="left">{bet.home_team_name} <br/>{bet.home_team_spread > 0 && '+'}{bet.home_team_spread}</TableCell>
                        :
                        <TableCell align="left">{bet.away_team_name} <br/>{bet.away_team_spread > 0 && '+'}{bet.away_team_spread}</TableCell>
                      }
                    </>
                  :
                    <TableCell align="left">
                      {/* determines if proposer has over */}
                      {bet.proposers_bet_is_over ?
                        <Typography variant="body2">Over <br/>{bet.over_under}</Typography>
                        :
                        <Typography variant="body2">Under <br/>{bet.over_under}</Typography>
                      } 
                    </TableCell>
                  }
                  <TableCell align="center">{bet.wager}u</TableCell>
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
