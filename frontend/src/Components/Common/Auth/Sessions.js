export const setUserSession = (token, user, wallet, coin) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
}

export const getToken = () => {
    return localStorage.getItem('token') || null;
}

export const getUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    else return null;
}

export const removeUserSession = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('profile');
    window.localStorage.removeItem('wallet');
    window.localStorage.removeItem('coin');
}