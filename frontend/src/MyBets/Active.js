import React, { useEffect, useState } from 'react';
import { makeStyles, Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Paper, Typography } from '@material-ui/core';
import moment from 'moment';
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

function Active(props) {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const classes = useStyles();

  const [activeBet, setMyActiveBet] = useState([])
    
    useEffect(()=>{
        if (activeBet.length === 0) {
          getmyactivebets()
        }
    }, [])


    const getmyactivebets = () => {
      request.getMyBetActive().then(res => setMyActiveBet(res))
    }

  return (
    <>
      {activeBet[0]
        ?
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Date</TableCell>
                <TableCell align="center">Game</TableCell>
                <TableCell align="left">Against</TableCell>
                <TableCell align="left">My Bet</TableCell>
                <TableCell align="center">Wager</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activeBet.map(bet => (
                <TableRow key={bet.id}>
                  <TableCell align="left">{moment(bet.date).format("M/D")}</TableCell>
                  <TableCell align="center">{bet.team1 + ' @'}<br/>{bet.team2}</TableCell>
                  {/* determines if bet is spread or O/U */}
                  {bet.proposers_team_id ? 
                  <>
                  {bet.proposers_id === props.store.user.id ?
                    bet.proposers_team_is_home_team ?
                      //user is proposer and team is home
                      <>
                        <TableCell align="left">{bet.acceptors_first_name}</TableCell>
                        <TableCell align="left">{bet.home_team_abbr} {bet.home_team_spread > 0 && '+'}{bet.home_team_spread}</TableCell>
                      </>
                      :
                      //user is proposer and team is away
                      <>
                        <TableCell align="left">{bet.acceptors_first_name}</TableCell>
                        <TableCell align="left">{bet.away_team_abbr} {bet.away_team_spread > 0 && '+'}{bet.away_team_spread}</TableCell>
                      </>
                    :
                    bet.proposers_team_is_home_team ?
                      //user is acceptor and team is away
                      <>
                        <TableCell align="left">{bet.proposers_first_name}</TableCell>
                        <TableCell align="left">{bet.away_team_abbr} {bet.away_team_spread > 0 && '+'}{bet.away_team_spread}</TableCell>
                      </>
                      :
                      //user is acceptor and team is home
                      <>
                        <TableCell align="left">{bet.proposers_first_name}</TableCell>
                        <TableCell align="left">{bet.home_team_abbr} {bet.home_team_spread > 0 && '+'}{bet.home_team_spread}</TableCell>
                      </>
                  }
                  </>
                  :
                  <>
                      {bet.proposers_bet_is_over ?
                        //user is proposer and bet is over
                        <>
                          <TableCell align="left">{bet.acceptors_first_name}</TableCell>
                          <TableCell align="left">Over {bet.over_under}</TableCell>
                        </>
                        :
                        //user is proposer and bet is under
                        <>                          
                          <TableCell align="left">{bet.acceptors_first_name}</TableCell>
                          <TableCell align="left">Under {bet.over_under}</TableCell>
                        </>
                      } 
                  </>
                }
                  <TableCell align="left">{bet.wager}u</TableCell>
                </TableRow>
              )
              )}
            </TableBody>
          </Table>
        </TableContainer>
        :
        <Typography color="textPrimary" className={classes.conditionalText}>You don't have any active bets right now.</Typography>
      }
    </>
  );
}

export default Active;
