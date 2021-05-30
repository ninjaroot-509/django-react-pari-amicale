import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  withStyles, 
  TextField, 
  List, 
  ListItem, 
  ListItemAvatar, 
  Avatar, 
  ListItemText, 
  ListItemSecondaryAction, 
  IconButton, 
  Button, 
  Typography,
  Snackbar,
  InputAdornment,
  Grid
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Alert from '@material-ui/lab/Alert';
import { withRouter } from "react-router";
import { getToken } from '../Components/Common/Auth/Sessions'
import axios from 'axios'
import request from '../Components/Common/HttpRequests'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 752,
    marginBottom: '3.5em',
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  avatar: {
    color: 'white',
    backgroundColor: '#606060',
  },
  conditionalText: {
    marginTop: '1.5em',
    paddingLeft: '24px',
    paddingRight: '24px',
    color: '#151515',
  },
  tableContainer: {
    marginTop: '4em',
  },
  mainContainer: {
    marginTop: '4em',
  },
}));

function DemandeSent(props) {
  const [demandeList, setDemande] = useState([])
  const [open, setOpen] = useState(false)
  const token = getToken()
  const classes = useStyles();
  const [temp, setTemp] = useState(0)
    
    useEffect(()=>{
        setInterval(()=>{
            setTemp((prevTemp)=>prevTemp+1)
        }, 6000)
    }, [])

    useEffect(()=>{
      getdemandes()
    }, [temp])

    const getdemandes = () => {
      request.getDemandeSentList().then(res => setDemande(res))
    } 

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false)
    };

    const cancelRequest = (id) => {
      const config = { headers: { 'Content-Type': 'application/json' } }
        if (token) config.headers['Authorization'] = `Token ${token}`
          axios.post(`https://paryaj.quizapay.com/api/friends-actions/`, JSON.stringify({id_cancel: id}), config)
          .then(res => {
              setOpen(true)
          })
          .catch(err => {
              setOpen(false)
          })
    }
  
  return (
    <>
    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
      open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          votre demande est annuler!
        </Alert>
      </Snackbar>
    <div className={classes.mainContainer}>
      <center>
     </center>
      <div className={classes.root}>
        {demandeList[0]
          ?
          <Grid container spacing={0} className={classes.grids}>
            <Grid item xs={12} md={6}>
              <div>
                <List>
                  {demandeList.map((friend) =>
                    <ListItem key={friend.id}>
                      <ListItemAvatar>
                        <Avatar src={'https://paryaj.quizapay.com' + friend.photo}
                          className={classes.avatar}>
                            {friend.to_user_name}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={<Typography style={{color: '#000'}}>{friend.to_user_name}</Typography>}
                      />
                      <ListItemSecondaryAction><IconButton onClick={() => cancelRequest(friend.to_user)}><DeleteIcon style={{color: 'red'}}/></IconButton></ListItemSecondaryAction>
                    </ListItem>,
                  )}
                </List>
              </div>
            </Grid>
          </Grid>
          :
          <Typography className={classes.conditionalText}>vous n'avez aucune demande d'amis envoyes.</Typography>
        }
      </div>
    </div>
    </>
  );
}
export default DemandeSent;