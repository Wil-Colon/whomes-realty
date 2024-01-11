import axios from 'axios';
import {
    CreateListingFailure,
    CreateListingStart,
    CreateListingSuccess,
    DeleteListingStart,
    DeleteListingSuccess,
    getListingFailure,
    GetListingStart,
    GetListingSuccess,
    UpdateListingFailure,
    UpdateListingStart,
    UpdateListingSuccess,
} from './ListingAction';

export const getSingleListing = async (id) => {
    try {
        const res = await axios.get(`/api/listing/${id}`);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const getListings = async (dispatch, query?) => {
    dispatch(GetListingStart());
    try {
        const res = await axios.post(`/api/listing`, {
            query,
        });
        dispatch(GetListingSuccess(res.data));
        return res;
    } catch (err) {
        dispatch(getListingFailure());
        return err;
    }
};

export const createListing = async (dispatch, accessToken, formData) => {
    dispatch(CreateListingStart());
    try {
        const res = await axios.post('/api/listing/newListing', formData, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(CreateListingSuccess(res.data));
    } catch (err) {
        dispatch(CreateListingFailure());
    }
};

export const deleteListing = async (dispatch, accessToken, id) => {
    dispatch(DeleteListingStart());
    try {
        const res = await axios.delete(`/api/listing/${id}`, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(DeleteListingSuccess(res.data));
    } catch (err) {
        dispatch(getListingFailure());
        return err;
    }
};

export const updateListing = async (dispatch, accessToken, id, formData) => {
    dispatch(UpdateListingStart());
    try {
        const res = await axios.put(`/api/listing/${id}`, formData, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });

        dispatch(UpdateListingSuccess(res.data));
        return res.data;
    } catch (err) {
        dispatch(UpdateListingFailure());
    }
};
