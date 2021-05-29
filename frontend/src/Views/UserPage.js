import React, { useState,useRef } from 'react';
import { Typography, Grid, Button, Avatar, TextField} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { getUser, getToken, getProfile, removeUserSession } from '../Components/Common/Auth/Sessions'

const useStyles = makeStyles({
    heading: {
        paddingTop: '1em',
        paddingBottom: '1em',
        textAlign: 'center',
        position: 'fixed',
        width: '100%',
        top: 0,
        backgroundColor: '#303030',
        height: '4.5em',
    },
    avatarLogo : {
        width: '4em',
        height: '4em',
       position: 'relative',
    },
    container: {
        height: '50vh',
        position: 'fixed',
    },
    info: {
        marginTop: '6.5em',
        paddingTop: '3em',
        width: '100%' 
    },
    profilePicture: {
        paddingBottom: '3em',
    },
    headingText: {
        marginTop: '.5em',
    },
    button: {
        marginTop: '1em'
    },
    cssLabel: {
        color: '#000'
      },
    logOutButton: {
        paddingTop: '1em'
    },
    headingTextGroup: {
        paddingRight: '1em',
    },
    multilineColor: {
        color: '#01FF70',
        borderColor: 'green !important'
      },
      borderColor: {
        color: '#000 !important',
        borderColor: '#000 !important',
      },
      notchedOutline: {
        borderWidth: '1px',
        borderColor: '#000 !important'
      },
});



const Profile = () => {
    const uploadInputRef = useRef(null);
  const [load, setLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const [opendep, setOpenDep] = useState(false);
  const [montant, setMontant] = useState('')
  const user = getUser()
    const token = getToken()
    const [photo, setPhoto] = useState()
    const profile = getProfile()
    
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [first_name, setFirstName] = useState()
    const [last_name, setLastName] = useState()
    const [phone, setPhone] = useState()
    const [bio, setBio] = useState()


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (ev) => {
    if (ev.target.name === 'username') setUsername(ev.target.value)
    else if (ev.target.name === 'email') setEmail(ev.target.value)
    else if (ev.target.name === 'first_name') setFirstName(ev.target.value)
    else if (ev.target.name === 'last_name') setLastName(ev.target.value)
    else if (ev.target.name === 'bio') setBio(ev.target.value)
    else if (ev.target.name === 'phone') setPhone(ev.target.value)
    else if (ev.target.name === 'photo') setPhoto(ev.target.files[0])
}

const handleSubmitClick = (ev) => {
    ev.preventDefault()
    
    let formData = new FormData()
    if (username) {
        formData.append('username', username)
    }
    if (first_name) {
        formData.append('first_name', first_name)
    }
    if (last_name) {
        formData.append('last_name', last_name)
    }
    if (email) {
        formData.append('email', email)
    }
    if (phone) {
        formData.append('phone', phone)
    }
    if (bio) {
        formData.append('bio', bio)
    }
    if (photo) {
        formData.append('photo', photo)
    }
    const config = { headers: { 'Content-Type': 'application/json' } }
    if (token) config.headers['Authorization'] = `Token ${token}`
    axios.post(`https://paryaj.quizapay.com/api/profile/`, formData, config)
    .then(res => {
        const userE={
            "id": user.id,
            "username": `${username? username : user.username }`,
            "first_name": `${first_name? first_name : user.first_name}`,
            "last_name": `${last_name? last_name : user.last_name}`,
            "email": `${email? email : user.email }`,
            "password": user.password,
            "last_login": user.last_login,
            "is_superuser": user.is_superuser,
            "is_staff": user.is_staff,
            "is_active": user.is_active,
            "date_joined": user.date_joined,
            "groups":[],
            "user_permissions":[]
        }
        const profileE={
            "id": profile.id,
            "bio": `${bio? bio : profile.bio }`,
            "phone": `${phone? phone : profile.phone }`,
            "photo": profile.photo,
            "user": profile.user
        }
        window.localStorage.setItem('user', JSON.stringify(userE))
        window.localStorage.setItem('profile', JSON.stringify(profileE))
        // setTimeout(() => window.location.reload(), 1000)
        handleClose()
    })
    
    .catch(err => {
        alert("profile error! " + err)
        handleClose()
    })
    
}
const handleChangeDep = (ev) => {
    if (ev.target.name === 'montant') setMontant(ev.target.value)
}
const openDep = () => {
    setOpenDep(true)
}

const closeDep = () => {
    setOpenDep(false)
}

const handleSubmitDep = () => {
    const config = { headers: { 'Content-Type': 'application/json' } }
        if (token) config.headers['Authorization'] = `Token ${token}`
        if (montant !== undefined) {
            if (montant >= 1) {
                setLoad(true)
                axios.post(`https://paryaj.quizapay.com/api/depot/`, JSON.stringify({montant: montant}), config)
                .then(res => {
                    setLoad(false)
                    closeDep()
                    window.location.assign(res.data.site)
                })
                .catch(err => {
                    setLoad(false)
                    closeDep()
                    alert("Oupps une erreur s'est produite! " + err)
                })
            } else {
                alert("il faut mettre un montant valide! ")
            }
        } else {
            alert("il faut mettre le montant! ")
        }
}
    const classes = useStyles();

    return (
        <>
        <div className={classes.container}>
            <div className={classes.heading}>
                <Typography variant="h4" className={classes.headingText} style={{color: 'white'}}>My Profile</Typography>
                
            </div>
            <div className={classes.info}>
            <Grid container align="center" justify="center" alignItems="center" >
                <div className={classes.profilePicture}>
                <Grid item xs={12}> 
                    <Avatar className={classes.avatarLogo} src={profile.photo}>{user.username}</Avatar>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={handleOpen} className={classes.button} color="primary">Modifier mon profile</Button>
                    <Button variant="contained" style={{backgroundColor: '#008', color: 'white'}} onClick={openDep} className={classes.button} color="secondary">Depot moncash</Button>
                </Grid>
                </div>
                <Grid item xs={12}>
                    <Typography style={{color: '#000'}}>Pseudo: {user.username}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography  style={{color: '#000'}}>Nom: {user.last_name}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography style={{color: '#000'}}>Prenom: {user.first_name}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography  style={{color: '#000'}}>Email: {user.email}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography  style={{color: '#000'}}>numero moncash: {profile.phone}</Typography>
                </Grid>
            </Grid>
            </div>           
            <center>
            <div className={classes.logOutButton}>
            <Button variant="contained" 
                    onClick={() => {
                        removeUserSession()
                        window.location.reload() 
                    }} style={{backgroundColor: 'red', color: 'white'}}>Deconnecter</Button>
            </div>
            </center>
            </div>
            <Dialog  
                fullWidth={true}
                maxWidth="lg" 
                open={open} 
                onClose={handleClose} 
                aria-labelledby="form-dialog-title">
            <DialogContent style={{backgroundColor: 'white'}}>
                    <TextField
                        autoFocus
                        margin="dense"
                        onChange={handleChange}
                        name="username"
                        label="Pseudonyme"
                        type="text"
                        placeholder={user.username}
                        fullWidth
                        InputProps={{
                        classes: {
                            root: classes.notchedOutline,
                            focused: classes.multilineColor,
                        },
                    }}
                    InputLabelProps={{
                        classes: {
                            root: classes.cssLabel,
                            focused: classes.borderColor,
                        }
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        defaultValue=''
                        onChange={handleChange}
                        name="last_name"
                        label="Nom"
                        type="text"
                        placeholder={user.last_name}
                        fullWidth
                        InputProps={{
                        classes: {
                            root: classes.notchedOutline,
                            focused: classes.multilineColor,
                        },
                    }}
                    InputLabelProps={{
                        classes: {
                            root: classes.cssLabel,
                            focused: classes.borderColor,
                        }
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        defaultValue=''
                        onChange={handleChange}
                        name="first_name"
                        label="Prenom"
                        type="text"
                        placeholder={user.first_name}
                        fullWidth
                        InputProps={{
                        classes: {
                            root: classes.notchedOutline,
                            focused: classes.multilineColor,
                        },
                    }}
                    InputLabelProps={{
                        classes: {
                            root: classes.cssLabel,
                            focused: classes.borderColor,
                        }
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        defaultValue=''
                        onChange={handleChange}
                        name="email"
                        label="Email"
                        type="email"
                        placeholder={user.email}
                        fullWidth
                        InputProps={{
                        classes: {
                            root: classes.notchedOutline,
                            focused: classes.multilineColor,
                        },
                    }}
                    InputLabelProps={{
                        classes: {
                            root: classes.cssLabel,
                            focused: classes.borderColor,
                        }
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        defaultValue=''
                        onChange={handleChange}
                        name="phone"
                        label="Numero moncash"
                        type="phone"
                        placeholder={profile.phone}
                        fullWidth
                        InputProps={{
                        classes: {
                            root: classes.notchedOutline,
                            focused: classes.multilineColor,
                        },
                    }}
                    InputLabelProps={{
                        classes: {
                            root: classes.cssLabel,
                            focused: classes.borderColor,
                        }
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        defaultValue=''
                        onChange={handleChange}
                        name="bio"
                        label="Bio"
                        type="text"
                        placeholder={profile.bio}
                        fullWidth
                        InputProps={{
                        classes: {
                            root: classes.notchedOutline,
                            focused: classes.multilineColor,
                        },
                    }}
                    InputLabelProps={{
                        classes: {
                            root: classes.cssLabel,
                            focused: classes.borderColor,
                        }
                        }}
                    />
                    <label htmlFor="icon-button-file">
                    <input
                        ref={uploadInputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        name="photo"
                        onChange={handleChange}
                        />
                    <Button
                        variant="contained"
                        component="span"
                        className={classes.button}
                        size="large"
                        color="primary"
                        onClick={() => uploadInputRef.current && uploadInputRef.current.click()}
                    >
                        Upload photo
                    </Button>
                    </label>
            </DialogContent>
            <DialogActions style={{backgroundColor: 'white'}}>
            <Button style={{color: '#000'}} onClick={handleClose} color="primary">
                Annuler
            </Button>
            <Button style={{color: '#000'}} onClick={handleSubmitClick} color="primary">
                Sauvegarder
            </Button>
            </DialogActions>
        </Dialog>

        <Dialog  
                fullWidth={true}
                maxWidth="lg" 
                open={opendep} 
                onClose={closeDep} 
                aria-labelledby="form-dialog-title">
            <DialogContent style={{backgroundColor: 'white'}}>
                    <TextField
                        autoFocus
                        margin="dense"
                        onChange={handleChangeDep}
                        name="montant"
                        label="Montant"
                        type="text"
                        placeholder="Ex: 100"
                        fullWidth
                        InputProps={{
                        classes: {
                            root: classes.notchedOutline,
                            focused: classes.multilineColor,
                        },
                    }}
                    InputLabelProps={{
                        classes: {
                            root: classes.cssLabel,
                            focused: classes.borderColor,
                        }
                        }}
                    />
            </DialogContent>
            <DialogActions style={{backgroundColor: 'white'}}>
            <Button style={{color: '#000'}} onClick={closeDep} color="primary">
                Annuler
            </Button>
            <Button style={{color: '#000'}} disable={load} onClick={handleSubmitDep} color="primary">
                continuer
            </Button>
            </DialogActions>
        </Dialog>
        </>
    );
}
export default Profile;