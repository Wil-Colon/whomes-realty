export const GetListingStart = () => ({
    type: 'GET_LISTING_START',
});

export const GetListingSuccess = (listings) => ({
    type: 'GET_LISTING_SUCCESS',
    payload: listings,
});

export const getListingFailure = () => ({
    type: 'GET_LISTING_FAILURE',
});

export const DeleteListingStart = () => ({
    type: 'DELETE_LISTING_START',
});

export const DeleteListingSuccess = (id) => ({
    type: 'DELETE_LISTING_SUCCESS',
    payload: id,
});

export const DeleteListingFailure = () => ({
    type: 'DELETE_LISTING_FAILURE',
});

export const UpdateListingStart = () => ({
    type: 'UPDATE_LISTING_START',
});

export const UpdateListingSuccess = (listings) => ({
    type: 'UPDATE_LISTING_SUCCESS',
    payload: listings,
});

export const UpdateListingFailure = () => ({
    type: 'UPDATE_LISTING_FAILURE',
});
