import React, { useState, useEffect } from 'react';
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
  InputAdornment 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';
import request from '../Components/Common/HttpRequests'
import { getToken } from '../Components/Common/Auth/Sessions'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    padding: 10,
  },
  multilineColor: {
    color: 'white',
    borderColor: 'green !important'
    
  },
  borderColor: {
    color: 'white !important',
    borderColor: 'white !important',
  },
  cssLabel: {
    color: 'white'
  },
  mainDiv: {
    marginBottom: '3.5em',
  },
  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'white !important'
  },
  avatar: {
    color: 'white',
    backgroundColor: '#606060',
  },
  textField: {
    align: "center"
  },
  conditionalText: {
    marginTop: '1.5em',
    paddingLeft: '24px',
    paddingRight: '24px',
    color: 'white',
  },
  backButton: {
    fontSize: '3em',
    position: 'relative',
    paddingLeft: '.25em',
  },
  heading: {
    textAlign: 'center',
    display: 'flex',
    height: '5em',
    paddingTop: '.75em',
    paddingBottom: '.75em',
    position: 'fixed',
    width: '100%',
    top: 0,
    backgroundColor: '#303030',
    zIndex: '20',
  },
  searchAbility: {
    marginTop: '6.5em',
    width: '100%',
    backgroundColor: '#151515',
  },
  addFriendText: {
    marginLeft: '1em',
    color: 'white',
    marginTop: '.5em',
  },
  mainHeading: {
    zIndex: '20',
    backgroundColor: '#303030',
    width: '100%',
    top: 0,
    position: 'fixed'
  },
  listContainer: {
    marginTop: '12em'
  }
 
}));

const AddFriend = ({history}) => {
  const [open, setOpen] = useState(false)
  const [member, setMember] = useState([])
  const token = getToken()
    
    useEffect(()=>{
        if (member.length === 0) {
          getusers()
        }
    }, [])


    const getusers = () => {
      request.getUserList().then(res => setMember(res))
    }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false)
  };


  // function to handle searching for a member by name
  const handleSearch = (event) => {
    let nameSearch = event.target.value;
    if (nameSearch !== '') {
      console.log(nameSearch)
    }
    if (nameSearch === '') {
      console.log(nameSearch)
    }
  }

  // function to add a friend
  const addFriend = (id) => {
    document.getElementById('friendSearch').value = '';
    const config = { headers: { 'Content-Type': 'application/json' } }
    if (token) config.headers['Authorization'] = `Token ${token}`
      axios.post(`http://localhost:8000/api/friends-actions/`, JSON.stringify({id_add: id}), config)
      .then(res => {
          setOpen(true)
      })
      .catch(err => {
          setOpen(false)
      })
  }

  const classes = useStyles();
  return (
    <>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
      open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          votre demande a été envoyer avec succes!
        </Alert>
      </Snackbar>
      <div className={classes.mainDiv}>
        <div className={classes.mainHeading}>
          <div className={classes.heading}>
            <Button onClick={() => history.goBack()}>
              <ArrowBackIcon className={classes.backButton} />
            </Button>
            <Typography variant="h4" className={classes.addFriendText}>Ajouter des amis</Typography>
          </div>
          <div className={classes.searchAbility}>
            <center>
              <TextField
              className={classes.searchfield}
              id="friendSearch"
              onChange={handleSearch}
              style={{color: '#01FF70'}}
              label="Rechercher un utilisateur"
              margin="normal"
              variant="outlined"
              InputProps={{
                classes: {
                  root: classes.notchedOutline,
                  focused: classes.multilineColor,
                  notchedOutline: classes.notchedOutline
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon style={{color: '#01FF70'}}/>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel,
                  focused: classes.borderColor,
                }
              }}
            />
          </center>
          </div>
        </div>
        <div className={classes.listContainer}>
          {member[0]
            ?
            <List>
              {member.map(member => (
                <ListItem key={member.id}>
                  <ListItemAvatar><Avatar className={classes.avatar} src={'http://localhost:8000' + member.photo}>{member.first_name}{member.last_name}</Avatar></ListItemAvatar>
                  <ListItemText primary={<Typography style={{color: 'white'}}>{member.username}</Typography>}/>
                  <ListItemSecondaryAction><IconButton onClick={() => addFriend(member.id)}><AddIcon style={{color: 'white'}}/></IconButton></ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            :
            <Typography className={classes.conditionalText}>Rechercher des amis par nom..</Typography>
          }
        </div>
      </div>
    </>
  );
}

export default AddFriend;