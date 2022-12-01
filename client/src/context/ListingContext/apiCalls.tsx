import axios from 'axios';
import {
    DeleteListingStart,
    DeleteListingSuccess,
    getListingFailure,
    GetListingStart,
    GetListingSuccess,
} from './ListingAction';

export const getListings = async (dispatch, query?) => {
    dispatch(GetListingStart());
    try {
        const res = await axios.get(
            `http://localhost:5000/api/listing${
                query === undefined ? '/' : query
            }`
        );
        dispatch(GetListingSuccess(res.data));
        return res;
    } catch (err) {
        dispatch(getListingFailure());
        return err;
    }
};

export const deleteListing = async (dispatch, id) => {
    dispatch(DeleteListingStart());
    try {
        await axios.delete(`http://localhost:5000/api/listing/${id}`);
        dispatch(DeleteListingSuccess(id));
    } catch (err) {
        dispatch(getListingFailure());
        return err;
    }
};
