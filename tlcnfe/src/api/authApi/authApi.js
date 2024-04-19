import * as httpRequest from '~/utils/httpRequest';

export const loginPass = async (params) => {
    try {
        const res = await httpRequest.post('/login', {
            userName: params.userName,
            password: params.password,
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const logout = async () => {
    try {
        const res = await httpRequest.post('/auth/logout');
        console.log(res?.result);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const registerPassword = async (params) => {
    try {
        console.log(params)
        const res = await httpRequest.post('/register', {
            password: params.password,
            confirmPassword: params.confirmPassword,
            fullName: params.fullName,
            userName: params.userName,
            phoneNumber: params.phoneNumber
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};
