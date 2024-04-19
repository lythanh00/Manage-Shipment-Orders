import * as httpRequest from '~/utils/httpRequest';

export const putUpdateUser = async (param) => {
    try {
        const res = await httpRequest.put('/userprofile', param, {
            'Content-Type': 'application/json',
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const createProduct = async (param) => {
    try {
        const res = await httpRequest.post('/product', param, {
            'Content-Type': 'application/json',
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const updateProduct = async (id, param) => {
    try {
        console.log(id, param)
        const res = await httpRequest.put(`/product/${id}`, param, {
            'Content-Type': 'application/json',
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getAllProduct = async (page, limit) => {
    try {
        const res = await httpRequest.get(`/product?page=${page}&limit=${limit}`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};