import axios from 'axios'
import {
    getToken,
    // removeUserSession 
} from './Auth/Sessions'
// import history from '../../history';

const url = 'http://localhost:8000/api/'
const config = { headers: { 'Content-Type': 'application/json' } }
const token = getToken()
if (token) config.headers['Authorization'] = `Token ${token}`

const getProfile = () => axios.get(`${url}profile/`, config).then(res => res.data)
const getWallet = () => axios.get(`${url}wallet/`, config).then(res => res.data)
const getRetrait = () => axios.get(`${url}retrait/`, config).then(res => res.data)
const getGame = () => axios.get(`${url}games/`, config).then(res => res.data)
const getBet = () => axios.get(`${url}bets/`, config).then(res => res.data)
const getUserList = () => axios.get(`${url}users/`, config).then(res => res.data)
const getFriendList = () => axios.get(`${url}friends/`, config).then(res => res.data)
const getMyBet = () => axios.get(`${url}mybets/`, config).then(res => res.data)
const getMyOldBet = () => axios.get(`${url}myoldbets/`, config).then(res => res.data)
const getMyBetActive = () => axios.get(`${url}myactivebets/`, config).then(res => res.data)
const getDemandeRecuList = () => axios.get(`${url}demandereculist/`, config).then(res => res.data)
const getDemandeSentList = () => axios.get(`${url}demandesentlist/`, config).then(res => res.data)

export default { getProfile, getWallet, getRetrait, getGame, getBet, getUserList, getFriendList, getMyBet, getMyOldBet, getMyBetActive, getDemandeRecuList, getDemandeSentList }