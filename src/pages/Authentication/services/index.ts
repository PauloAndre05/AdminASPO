import jwt_decode from 'jwt-decode';
import nookies, { destroyCookie } from 'nookies';

export const logout = () => {
    destroyCookie(null, 'token', { path: '/' });
};

export const isAuthenticated = () => {
    const { token } = nookies.get(null);
    return !!token;
};


export const getUserInfo = () => {
    const cookies = nookies.get();
    const token = cookies.token;
    if (token) {
        return jwt_decode(token);
    }
    return null;
};