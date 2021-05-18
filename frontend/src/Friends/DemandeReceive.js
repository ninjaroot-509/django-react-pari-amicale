import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Snackbar, Icon, List, ListItem, ListItemAvatar, ListItemSecondaryAction, IconButton, Button, ListItemText, Grid, Typography, Avatar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { withRouter } from "react-router";
import axios from 'axios'
import request from '../Components/Common/HttpRequests'
import { getToken } from '../Components/Common/Auth/Sessions'

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
    color: 'white',
  },
  tableContainer: {
    marginTop: '4em',
  },
  mainContainer: {
    marginTop: '4em',
  },
}));

function DemandeReceive(props) {
  const [demandeList, setDemande] = useState([])
  const [open, setOpen] = useState(false)
  const token = getToken()
  const classes = useStyles();
    
    useEffect(()=>{
        if (demandeList.length === 0) {
          getdemandes()
        }
    }, [])


    const getdemandes = () => {
      request.getDemandeRecuList().then(res => setDemande(res))
    }

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false)
    };

    const acceptFriend = (id) => {
      const config = { headers: { 'Content-Type': 'application/json' } }
        if (token) config.headers['Authorization'] = `Token ${token}`
          axios.post(`http://localhost:8000/api/friends-actions/`, JSON.stringify({id_accept: id}), config)
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
          vous venez de l'ajouté à votre liste d'amis!
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
                      <Avatar src={'http://localhost:8000' + friend.photo}
                        className={classes.avatar}>
                          {friend.from_user_name}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Typography style={{color: 'white'}}>{friend.from_user_name}</Typography>}
                    />
                    <ListItemSecondaryAction>
                      <Button onClick={() => acceptFriend(friend.from_user)}>Accepter</Button>
                    </ListItemSecondaryAction>
                  </ListItem>,
                )}
                </List>
              </div>
            </Grid>
          </Grid>
          :
          <Typography className={classes.conditionalText}>vous n'avez aucune demande d'amis.</Typography>
        }
      </div>
    </div>
    </>
  );
}
export default DemandeReceive;