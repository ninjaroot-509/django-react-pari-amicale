import axios from 'axios'
import {
    getToken,
    // removeUserSession 
} from './Auth/Sessions'
// import history from '../../history';

const url = 'https://quizapay.com/api/'
const config = { headers: { 'Content-Type': 'application/json' } }
const token = getToken()
if (token) config.headers['Authorization'] = `Token ${token}`

const getQuizOrder = (id, userId) => axios.get(`${url}quizdone/?quizz_id=${id}&user=${userId}`).then(res => res.data)
    // const getQuizOrderID = (quizId, userId) => axios.get(`${url}orderquizid/${quizId}/?user=${userId}`).then(res => res.data)
const getProfile = () => axios.get(`${url}profile/`, config).then(res => res.data)
const getWallet = () => axios.get(`${url}wallet/`, config).then(res => res.data)
const getCoin = () => axios.get(`${url}coins/`, config).then(res => res.data)
    // .catch(error => {
    //     removeUserSession()
    //     history.push('/login')
    //     window.location.reload()
    // });
const getRetrait = () => axios.get(`${url}retrait/`, config).then(res => res.data)
const getQuizzes = () => axios.get(`${url}quizzes/`).then(res => res.data)
const getCategory = () => axios.get(`${url}category/`).then(res => res.data)
const getCategoryQuiz = (id) => axios.get(`${url}quizzes/?category=${id}`).then(res => res.data)
const getCategoryId = (cateId) => axios.get(`${url}category/${cateId}/`).then(res => res.data)
const getQuizz = (id) => axios.get(`${url}quizzes/${id}/`).then(res => res.data)
const getQuestions = (id) => axios.get(`${url}questions/?quizz_id=${id}`).then(res => res.data)

export default { getProfile, getQuizzes, getQuizz, getQuestions, getCategory, getCategoryQuiz, getCategoryId, getQuizOrder, getWallet, getCoin, getRetrait }