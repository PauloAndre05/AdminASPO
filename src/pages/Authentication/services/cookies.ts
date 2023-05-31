import nookies from 'nookies';

export const setCookie = (token: string) => {
    nookies.set(undefined, 'token', token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
        secure: true,
    });
};

export const parseCookies = (ctx: any) => {
    return nookies.get(ctx);
};