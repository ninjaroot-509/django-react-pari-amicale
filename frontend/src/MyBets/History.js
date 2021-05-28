import React, { useEffect, useState } from 'react';
import { makeStyles, Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Paper, Typography } from '@material-ui/core';
import moment from 'moment';
import request from '../Components/Common/HttpRequests'
import { getUser } from '../Components/Common/Auth/Sessions'

const useStyles = makeStyles({
  table: {
    flexGrow: 1
  },
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

function History(props) {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const classes = useStyles();
  const user = getUser()

  const [oldBet, setOldBet] = useState([])
    
    useEffect(()=>{
        if (oldBet.length === 0) {
          getoldbets()
        }
    }, [])


    const getoldbets = () => {
      request.getMyOldBet().then(res => setOldBet(res))
    }

  return (
    <>
      {oldBet[0]
        ?
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
              <TableCell align="left">Ajout le</TableCell>
                <TableCell align="center">Equipes</TableCell>
                <TableCell align="left">Joeur</TableCell>
                <TableCell align="center">Votre proposition</TableCell>
                <TableCell align="center">l'autre proposition</TableCell>
                <TableCell align="center">Gagnant</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {oldBet.map(bet => (
                <TableRow key={bet.id}>
                  <TableCell align="left">{moment(bet.add_time).format("M/D/Y")}</TableCell>
                  <TableCell align="center">{bet.team1 + ' @'}<br/>{bet.team2}</TableCell>
                  {bet.owner === user.id?
                  <>
                    <TableCell align="left">{bet.acceptors_name}</TableCell>
                    <TableCell align="center">
                        {bet.winning_equipe?
                          <Typography style={{color: '#000'}} variant="body2">victoire de {bet.winning_equipe === 'team1' ? bet.team1 : bet.team2}</Typography>
                          :
                          bet.is_null === true? 
                          <Typography style={{color: '#000'}} variant="body2">match null</Typography>
                          :''
                        }
                    </TableCell>
                    <TableCell align="center">victoire de {bet.user_position === 'team1' ? bet.team1 : bet.team2}</TableCell>
                    {bet.winning_user === user.id?
                      <TableCell align="center">Vous</TableCell>
                      :
                      <TableCell align="center">{bet.acceptors_name}</TableCell>
                    }
                  </>
                  :
                  <>
                    <TableCell align="left">{bet.owner_name}</TableCell>
                    <TableCell align="center">victoire de {bet.user_position === 'team1' ? bet.team1 : bet.team2}</TableCell>
                    <TableCell align="center">
                        {bet.winning_equipe?
                          <Typography style={{color: '#000'}} variant="body2">victoire de {bet.winning_equipe === 'team1' ? bet.team1 : bet.team2}</Typography>
                          :
                          bet.is_null === true? 
                          <Typography style={{color: '#000'}} variant="body2">match null</Typography>
                          :''
                        }
                    </TableCell>
                    {bet.winning_user === user.id?
                      <TableCell align="center">Vous</TableCell>
                      :
                      <TableCell align="center">{bet.owner_name}</TableCell>
                    }
                  </>
                  }
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </TableContainer>
        :
        <Typography color="textPrimary" className={classes.conditionalText}>Vous n'avez pas encore terminé de paris.</Typography>
      }
    </>
  );
}

export default History;
