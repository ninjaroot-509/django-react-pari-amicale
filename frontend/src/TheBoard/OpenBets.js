import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@material-ui/core';
import { getUser } from '../Components/Common/Auth/Sessions'
import request from '../Components/Common/HttpRequests'
import OpenBetRow from './OpenBetRow';
//2.1 
const useStyles = makeStyles({
  tableContainer: {
    marginTop: '2.9em',
    backgroundColor: 'white',
  },
  conditionalText: {
    padding: '24px',
    paddingTop: '32px',
    color: '#151515',
    textAlign: 'center'
  },
});

function OpenBets(props) {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const user = getUser()
  const [temp, setTemp] = useState(0)
  const [bets, setBet] = useState([])
    
    useEffect(()=>{
        setInterval(()=>{
            setTemp((prevTemp)=>prevTemp+1)
        }, 5000)
    }, [])

    useEffect(()=>{
        getbet()
    }, [temp])

    const getbet = () => {
      request.getBet().then(res => setBet(res))
    }

  const classes = useStyles();

  return (
    <>
      {bets[0]
        ?
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table aria-label="simple table" className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{color: '#000', fontWeight: 'bold'}}>Amis</TableCell>
                <TableCell align="left" style={{color: '#000', fontWeight: 'bold'}}>Equipes</TableCell>
                <TableCell align="left" style={{color: '#000', fontWeight: 'bold'}}>Propositions</TableCell>
                <TableCell align="center" style={{color: '#000', fontWeight: 'bold'}}>heure de début&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* only displays open bets that you didn't propose */}
              {bets.filter(bet => bet.owner !== user.id).map((bet) => (
                <OpenBetRow key={bet.id} bet={bet} />
              )
              )}
            </TableBody>
          </Table>
        </TableContainer>
        :
          <Typography color="textPrimary" className={classes.conditionalText}>Vos amis n'ont pas encore de paris ouverts.Essayez d'en informer!</Typography>
      }
    </>
  );
}

export default OpenBets;