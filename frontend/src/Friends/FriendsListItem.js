import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemAvatar, ListItemText, Grid, Typography, Avatar } from '@material-ui/core';
import { withRouter } from "react-router";
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

function FriendsListItem(props) {
  const [friendsList, setFriend] = useState([])
  const classes = useStyles();
  const [temp, setTemp] = useState(0)
    
  useEffect(()=>{
      setInterval(()=>{
          setTemp((prevTemp)=>prevTemp+1)
      }, 10000)
  }, [])

  useEffect(()=>{
    getfriends()
  }, [temp])

    const getfriends = () => {
      request.getFriendList().then(res => setFriend(res))
    }
  
  return (
    <div className={classes.mainContainer}>
      <center>
     </center>
      <div className={classes.root}>
        {friendsList[0]
          ?
          <Grid container spacing={0} className={classes.grids}>
            <Grid item xs={12} md={6}>
              <div>
                {friendsList.map((friend) =>
                  <ListItem key={friend.id} onClick={() => { props.history.push(`/friends/statistics/${friend.id}`) }}>
                    <ListItemAvatar>
                      <Avatar src={friend.photo}
                        className={classes.avatar}>
                          {friend.username}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Typography style={{color: '#000'}}>{friend.first_name} {friend.last_name}</Typography>}
                      secondary={<Typography style={{color: '#000'}}>{friend.username}</Typography>}
                    />
                  </ListItem>,
                )}
              </div>
            </Grid>
          </Grid>
          :
          <Typography className={classes.conditionalText}>Il n'y a aucun résultat d'amis.</Typography>
        }
      </div>
    </div>
  );
}
export default FriendsListItem;