import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import request from '../Components/Common/HttpRequests'
import { getUser, getToken } from '../Components/Common/Auth/Sessions'
import axios from 'axios'
import { useToasts } from 'react-toast-notifications';

const ProfileUpdate = () => {
    const user = getUser()
    const token = getToken()
    const userId = user.id
    const [profile, setProfile] = useState([])
    
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [first_name, setFirstName] = useState()
    const [last_name, setLastName] = useState()
    const [phone, setPhone] = useState()
    const [bio, setBio] = useState()
    const [photo, setPhoto] = useState()
    const Pphone = profile.phone
    const Pbio = profile.bio
    const Pusername = user.username
    const Pemail = user.email
    const Pnom = user.last_name
    const Pprenom = user.first_name
    const photoUrl = 'https://quizapay.com' + profile.photo
    const { addToast } = useToasts()

    useEffect(() => {
        request.getProfile(userId).then(res => setProfile(res))
    }, [])

    const handleChange = (ev) => {
        if (ev.target.name === 'username') setUsername(ev.target.value)
        else if (ev.target.name === 'email') setEmail(ev.target.value)
        else if (ev.target.name === 'first_name') setFirstName(ev.target.value)
        else if (ev.target.name === 'last_name') setLastName(ev.target.value)
        else if (ev.target.name === 'bio') setBio(ev.target.value)
        else if (ev.target.name === 'phone') setPhone(ev.target.value)
        else if (ev.target.name === 'photo') setPhoto(ev.target.files[0])
    }
    const notify = () => {
        addToast("Votre profile a ete mise a jour!", {appearance: 'success', autoDismiss: true})
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
        axios.post(`https://quizapay.com/api/profile/`, formData, config)
        .then(res => {
            notify()
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
            window.localStorage.setItem('user', JSON.stringify(userE))
            // setTimeout(() => window.location.reload(), 1000)
        })
        
        .catch(err => {
            addToast("profile error! " + err, {appearance: 'error', autoDismiss: true})
        })
        
    }
    const photoView = photo? URL.createObjectURL(photo) : photoUrl
    return (
        <div className="container">
            <div className="row">
                <div className="col-8 m-auto">
                    <div style={{textAlign: 'center', paddingTop: 10}}>
                        <img src={photoView}
                            alt={user.username}
                            style={{width: 200, height: 200, borderRadius: '50%'}} />
                    <h2 className="mt-4 focus-in-expand">Update {user.username} profile's </h2>
                    <h4 className="mt-4 focus-in-expand"><Link to="/userpage" className="link">Revenir à votre page</Link></h4>
                    </div>
                    <hr />
                    <div className="col-lg-8 m-auto px-4 mt-4">
                        <form>
                            <div className="form-group">
                                <label>Pseudoname</label>
                                <input type="text" className="form-control" name='username' onChange={handleChange} placeholder={Pusername}/>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" name='email' onChange={handleChange} placeholder={Pemail}/>
                            </div>
                            <div className="form-group">
                                <label>Nom</label>
                                <input type="text" className="form-control" name='last_name' onChange={handleChange} placeholder={Pnom}/>
                            </div>
                            <div className="form-group">
                                <label>Prenom</label>
                                <input type="text" className="form-control" name='first_name' onChange={handleChange} placeholder={Pprenom}/>
                            </div>
                            <div className="form-group">
                                <label>phone</label>
                                <input type="phone" className="form-control" name='phone' onChange={handleChange} placeholder={Pphone}/>
                            </div>
                            <div className="form-group">
                                <label>bio</label>
                                <input type="text" className="form-control" name='bio' onChange={handleChange} placeholder={Pbio}/>
                            </div>
                            <div className="form-group">
                                <label>Photo</label>
                                <input type="file" className="form-control-file" name='photo' onChange={handleChange}/>
                            </div>
                            <div className="form-group text-right mt-4">
                                <button onClick={handleSubmitClick} className="btn btn-primary btn-lg btn-block">Sauvegarder</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileUpdate

