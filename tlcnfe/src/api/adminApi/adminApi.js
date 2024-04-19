import * as httpRequest from '~/utils/httpRequest';

export const getAllUser = async (page, limit) => {
    try {
        const res = await httpRequest.get(`/user/ADMIN?page=${page}&limit=${limit}`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getAllShipment = async (page, limit) => {
    try {
        const res = await httpRequest.get(`/shipment/ADMIN?page=${page}&limit=${limit}`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const addUser = async ({
    userName,
    fullName,
    gender,
    address,
    phoneNumber,
    birthday,
    email,
    beginWorkDate,
    endWorkDate,
    password,
    role,
}) => {
    try {
        const res = await httpRequest.post(`/user`, {
            userName,
            fullName,
            gender,
            address,
            phoneNumber,
            birthday,
            email,
            beginWorkDate,
            endWorkDate,
            workStoreCode: null,
            password,
            role,
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getUserByUserName = async (username) => {
    try {
        const res = await httpRequest.get(`/user/ADMIN?userName=${username}`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const updateUser = async ({
    id,
    userName,
    fullName,
    gender,
    address,
    phoneNumber,
    birthday,
    email,
    beginWorkDate,
    endWorkDate,
    password,
    role,
    isActived,
}) => {
    try {
        const res = await httpRequest.put(`/user/${id}`, {
            userName,
            fullName,
            gender,
            address,
            phoneNumber,
            birthday,
            email,
            beginWorkDate,
            endWorkDate,
            workStoreCode: null,
            password,
            role,
            isActived,
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};
