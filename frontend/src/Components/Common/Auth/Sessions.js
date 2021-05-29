export const setUserSession = (token, user, profile) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('profile', JSON.stringify(profile));
}

export const getToken = () => {
    return localStorage.getItem('token') || null;
}

export const getUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    else return null;
}

export const getProfile = () => {
    const profileStr = localStorage.getItem('profile');
    if (profileStr) return JSON.parse(profileStr);
    else return null;
}

export const removeUserSession = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('profile');
}