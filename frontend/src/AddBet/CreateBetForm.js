import React, { useState, useEffect } from "react";
import { 
    Button, 
    TextField, 
    Typography, 
    Switch, 
    Grid, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogContentText, 
    DialogActions,
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { getUser, getToken } from '../Components/Common/Auth/Sessions'
import axios from 'axios'
const useStyles = makeStyles({
    createBetBtn: {
        width: '140px',
        marginLeft: '20%',
        marginRight: '20%',
        marginTop: '2em',
    },
    formControlLabel: {
        color: '#000',
    },
    text: {
        margin: '1em',
        backgroundColor: '#151515',
    },
    radioColor: {
        color: '#000',
    },
    unitsInput: {
        backgroundColor: 'white',
        borderRadius: '.5em',
        marginTop: '1em',
        width: "120px",
    },

});

function CreateBetForm({game,history}) {

    const classes = useStyles();
    const user = getUser()
    const token = getToken()

    // state hook to handle opening dialog
    const [open, setOpen] = useState(false);
    const [vteam1, setVTeam1] = useState(false);
    const [vteam2, setVTeam2] = useState(false);
    const [prix, setPrix] = useState('');
    const [winning_equipe, setWinningEquipe] = useState('');

    // opens the dialog to confirm bet
    const handleClickOpen = () => {
        setOpen(true);
    }

    // cancels the bet and closed dialog
    const cancelBet = () => {
        setOpen(false);
    }

    //handling input change for state hook
    const handleInputChange = (event) => {
        //if block fixes default to 0 and app crash
        if (event.target.name === 'prix') setPrix(event.target.value)
    }

    //handles input change for 
    const handleOverUnderChange = (event) => {
        if (event.target.name === game.team1) {
            setVTeam1(true)
            setVTeam2(false)
            setWinningEquipe('team1')
        } else if (event.target.name === game.team2) {
            setVTeam2(true)
            setVTeam1(false)
            setWinningEquipe('team2')
        }
    }

    //sending packaged bet to saga
    //then emptying radio button and input
    const handleCreateBet = () => {
        if(prix === '' && winning_equipe === '') {
            alert("Sélectionnez un pari et entrez le nombre d'unités que vous souhaitez..");
        } else{
            const config = { headers: { 'Content-Type': 'application/json' } }
            if (token) config.headers['Authorization'] = `Token ${token}`
            axios.post(`http://localhost:8000/api/add-bet/`, JSON.stringify({game: game.id, prix: prix, winning_equipe: winning_equipe}), config)
            .then(res => {
                history.push('/mybets')
                alert("Votre pari est place");
            })
            .catch(err => {
                alert("Erreur " + err);
            })
        }

        // props.dispatch({ type: 'POST_BET', payload: bet });
        setOpen(false);
    };

    return (
        <FormControl margin="normal" component="fieldset">
            <Grid container justify="center" alignItems="center">
                <Grid item>Remplir les champs pour creer votre pari</Grid>
                <Grid item xs={12}>
                    
                    <>
                    <Grid container justify="center" alignItems="center">
                        <RadioGroup row aria-label="position" name="position" onChange={(event) => handleOverUnderChange(event)}>
                            <FormControlLabel
                                value={vteam1}
                                control={<Radio />}
                                label={'Victoire ' + game.team1}
                                name={game.team1}
                                labelPlacement="bottom"
                                checked={winning_equipe === "team1"}
                                className={classes.formControlLabel}
                            />
                            <FormControlLabel
                                value={vteam2}
                                control={<Radio />}
                                label={'Victoire ' + game.team2}
                                name={game.team2}
                                labelPlacement="bottom"
                                checked={winning_equipe === "team2"}
                                className={classes.formControlLabel}
                            />
                        </RadioGroup>
                    </Grid>
                        <Dialog open={open} onClose={handleCreateBet} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                            <DialogTitle id="alert-dialog-title">Confirmer la mise</DialogTitle>
                            <DialogContent>
                                {winning_equipe === 'team1' ?
                                    <DialogContentText>Le Parie sera placé sur L'equipe <b>{game.team1}</b> pour {prix} Gourdes.</DialogContentText>
                                    :
                                    <DialogContentText>Le Parie sera placé sur L'equipe <b>{game.team2}</b> pour {prix} Gourdes.</DialogContentText>}
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={cancelBet}>Annuler</Button>
                                <Button onClick={handleCreateBet}>Confirmer</Button>
                            </DialogActions>
                        </Dialog>
                    </>

                </Grid>
                <Grid container justify="center" alignItems="center">
                    <TextField
                        color="secondary"
                        type="number"
                        value={prix}
                        placeholder="prix"
                        name="prix"
                        variant="outlined"
                        onChange={handleInputChange}
                        className={classes.unitsInput}
                    />
                </Grid>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.createBetBtn}
                    onClick={handleClickOpen}
                >
                    Créer le pari
                </Button>
            </Grid>

        </FormControl>
    );
}

export default CreateBetForm;