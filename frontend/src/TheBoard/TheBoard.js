import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import TabPanel from './TabPanel';
import request from '../Components/Common/HttpRequests'
import { getToken, getUser } from '../Components/Common/Auth/Sessions';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  heading: {
    padding: '1em',
    textAlign: 'center',
    position: 'fixed',
    width: '100%',
    top: 0,
    backgroundColor: '#303030',
    height: '7.5em',
  },
  tabPanel: {
    marginTop: '9.5em',
  },
  headingText: {
  },
  headingTextGroup: {
    paddingRight: '1em',
    color: 'white',
  },
}));

const TheBoard = ({history}) => {
    const [wallet, setWallet] = useState([])
    const [temp, setTemp] = useState(0)

    useEffect(()=>{
        setInterval(()=>{
            setTemp((prevTemp)=>prevTemp+1)
        }, 2000)
    }, [])

    useEffect(()=>{
        getwallet()
    }, [temp])


    const getwallet = () => {
        if (getUser()) {
            request.getWallet().then(res => setWallet(res))
        }
    }

    const classes = useStyles();

    return (
      <div>
        <div className={classes.heading}>
          <div className={classes.headingTextGroup}>
          <div 
            style={{
              backgroundColor: 'darkblue',
              width: 80,
              fontSize: 10,
              borderRadius: 25,
              padding: 4
            }}
          >
            <span style={{fontSize: 15}}>{Math.round(wallet.montant)} {wallet.montant > 1? 'Gourdes' : 'Gourde'}</span>
          </div>
            <Typography variant="h4" className={classes.headingText}>hello, {getUser().username}</Typography>
            <Typography>{moment().format("Do MMM")}, {moment().format('LTS')}</Typography>
          </div>
        </div>
        <div className={classes.tabPanel}>
          <TabPanel />
        </div>
      </div>
    );
}

export default TheBoard;
