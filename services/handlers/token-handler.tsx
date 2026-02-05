
import nookies from 'nookies';

const StoreToken = (token : string) => {
    nookies.set(null, 'token', token, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
    });
};

const HasToken = () => {
    const cookies = nookies.get();
    const token = cookies.token;
    return !!token;
};

const GetToken = () => {
    const cookies = nookies.get();
    const token = cookies.token;
    return token;
};

const RemoveToken = (ctx = null) => {
    nookies.destroy(ctx, 'token', {
        path: '/',
    });
};


export { 
    StoreToken, 
    HasToken, 
    RemoveToken,
    GetToken
};