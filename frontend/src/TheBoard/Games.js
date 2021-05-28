import React, { useState, useEffect } from 'react'
import moment from 'moment';
import 'moment/locale/fr'
import request from '../Components/Common/HttpRequests'
import { useHistory } from "react-router-dom";
// import { getUser, getToken, removeUserSession } from '../Components/Common/Auth/Sessions'
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    width: '100%',
  },
  tableContainer: {
    marginTop: '2.9em',
    backgroundColor: '#151515',
  },
  conditionalText: {
    padding: '24px',
    paddingTop: '32px',
    backgroundColor: '#151515',
    textAlign: 'center'
  },
  tableBody: {
    backgroundColor: 'white',
  }
});

function SimpleTable(props) {
  const [games, setGame] = useState([])
  const classes = useStyles();

  let history = useHistory();
    
    useEffect(()=>{
        if (games.length === 0) {
          getgame()
        }
    }, [])


    const getgame = () => {
      request.getGame().then(res => setGame(res))
      // request.refreshGame()
    }

  return (
    <>
      {games[0]
        ?
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{color: 'white'}} align="left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Matchs</TableCell>
                <TableCell style={{color: 'white'}} align="center">Type</TableCell>
                <TableCell style={{color: 'white'}} align="right">heure de début&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.tableBody}>
              {games.map((game, i) => {
                return (
                  <TableRow key={game.id} onClick={() => history.push(`/match-details/${game.id}`)}>
                    <TableCell style={{color: '#000'}} align="left">
                      <Grid container alignItems="center" >
                        <Grid item style={{verticalAlign: "middle"}} xs={12}>
                          <b>{game.team1}</b> 
                        </Grid>
                        <Grid item style={{textAlign: "middle", color: 'green'}} xs={12}>
                          VS
                        </Grid>
                        <Grid item style={{verticalAlign: "middle"}} xs={12}>
                          {/* <img style={{verticalAlign: "middle"}} src={game.home_team_logo} alt={game.home_team} width="20" height="20" /> */}
                          <b>{game.team2}</b>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell style={{color: '#000'}} align="center">{game.sport_key}</TableCell>
                    <TableCell style={{color: '#000'}} align="center">
                      {moment(game.commence_time).calendar()}
                    </TableCell>
                  </TableRow>
                )
              })}
            <br />
            <br />
            </TableBody>
          </Table>
        </TableContainer>
        :
        <Typography color="textPrimary" className={classes.conditionalText}>Il n'y a pas de jeux à afficher.</Typography>
      }
    </>
  );
}


export default SimpleTable;