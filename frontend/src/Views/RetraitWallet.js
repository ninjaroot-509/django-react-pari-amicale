import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import request from '../Components/Common/HttpRequests'
import { getUser, getToken, removeUserSession } from '../Components/Common/Auth/Sessions'
import axios from 'axios'
import { useToasts } from 'react-toast-notifications';

const RetraitWallet = () => {
    const user = getUser()
    const token = getToken()
    const [profile, setProfile] = useState([])
    const photoUrl = 'https://quizapay.com' + profile.photo

    const [wallet, setWallet] = useState([])
    
    const [montant, setMontant] = useState('')
    const [phone, setPhone] = useState('')
    const Pmontant = wallet.montant
    const [temp, setTemp] = useState(0)
    const { addToast } = useToasts()
    
    useEffect(()=>{
        setInterval(()=>{
            setTemp((prevTemp)=>prevTemp+1)
        }, 5000)
    }, [])

    useEffect(()=>{
        getprofile()
    }, [temp])

    const getprofile = () => {
        if (getUser()) {
            request.getProfile().then(res => setProfile(res))
            request.getWallet().then(res => setWallet(res))
        }
    }
    const [loading, setLoading] = useState(false)

    const handleChange = (ev) => {
        if (ev.target.name === 'montant') setMontant(ev.target.value)
        if (ev.target.name === 'phone') setPhone(ev.target.value)
    }
    
    const handleSubmitClick = (ev) => {
        ev.preventDefault()

        let formData = new FormData()
        formData.append('phone', phone)
        formData.append('montant', montant)
        const config = { headers: { 'Content-Type': 'application/json' } }
        if (token) config.headers['Authorization'] = `Bearer ${token}`
        if (montant !== '' && phone !== '') {
            if (Pmontant >= montant) {
                if (Pmontant >= 100 && montant >= 100) {
                    setLoading(true)
                    axios.post(`https://quizapay.com/api/retrait/`, formData, config)
                    .then(res => {
                        setLoading(false)
                        addToast("Votre demande a ete envoyer avec succes!", {appearance: 'success', autoDismiss: true})
                    })
                    .catch(err => {
                        setLoading(false)
                        addToast("Oupps une erreur s'est produite! " + err, {appearance: 'error', autoDismiss: true})
                    })
                } else{
                    addToast("Vous devez avoir une somme de 100 Gourdes pour effectuer un retrait!", {appearance: 'warning', autoDismiss: true})
                }
            } else {
                addToast("insuffisance capitale!", {appearance: 'error', autoDismiss: true})
            }
        } else {
            addToast("Veuillez remplir tout les champs!", {appearance: 'error', autoDismiss: true})
        }
        
    }
    return (
        <section className="absolute">
            <div className="rounded-lg d-block d-sm-flex">
                <div className="profile-tab-nav border-right">
                    <div className="p-4">
                        <div className="img-circle flex justify-center mb-3">
                            <img src={photoUrl} alt={user.username} className="shadow" />
                        </div>
                        <h4 className="text-center">{user.username}</h4>
                    </div>
                    <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <Link to="/userpage" className="nav-link">
                            <i className="fa fa-home text-center mr-1"></i> Compte
                        </Link>
                        <Link to="#" className="nav-link">
                            <i className="fa fa-key text-center mr-1"></i> Changer de mot de passe
                        </Link>
                        <Link to={`/depot/moncash/`} className="nav-link">
                            <i className="fa fa-dollar-sign text-center mr-1"></i> Recharger mon compte
                        </Link>
                        <Link to={`/convertir/`} className="nav-link">
                            <i className="fa fa-dollar-sign text-center mr-1"></i> Acheter plus coins
                        </Link>
                        <Link to={`/retrait/moncash/`} className="nav-link active">
                            <i className="fa fa-dollar-sign text-center mr-1"></i> Faire un retrait
                        </Link>
                        <Link to='/' className="nav-link"
                            onClick={() => {
                                removeUserSession()
                                window.location.reload()
                            }}>
                            <i className="fa fa-sign-out text-center mr-1"></i> Deconnecter
                        </Link>
                    </div>
                </div>
                <div className="tab-content p-4 p-md-5">
                    <div className="tab-pane fade show active">
                        <h3 className="mb-4">Retrait {user.username} wallet's</h3>
                        <p className="alert alert-warning">
                            Entrer la quantité de Gourdes que vous souhaitez retirer<br />
                            <b>N.B: Le montant minimum doit être de 100 gourdes et plus encore !!
                                <br /> immédiatement que vous avez cliqué sur le bouton ci-dessous vous nous confirmez que vous souhaitez retirer la somme choisie</b> <b style={{color: 'green'}}>Cliquez ici pour avoir plus d'informations!!</b>
                        </p>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Votre numero moncash</label>
                                    <input type="phone" className="form-control" name='phone' onChange={handleChange} placeholder="EX: 47929400"/>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Montant</label>
                                    <input type="number" className="form-control" name='montant' onChange={handleChange} placeholder="EX: 1000"/>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button onClick={handleSubmitClick} disabled={loading} className="btn btn-primary btn-lg btn-block">Continuer</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RetraitWallet