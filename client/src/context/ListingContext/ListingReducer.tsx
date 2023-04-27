const ListingReducer = (state, action) => {
    switch (action.type) {
        case 'GET_LISTING_START':
            return {
                listings: [],
                isFetching: true,
                error: false,
            };
        case 'GET_LISTING_SUCCESS':
            return {
                listings: action.payload,
                isFetching: false,
                error: false,
            };
        case 'GET_LISTING_FAILURE':
            return {
                listings: [],
                isFetching: false,
                error: true,
            };
        case 'CREATE_LISTING_START':
            return {
                listings: [],
                isFetching: true,
                error: false,
            };
        case 'CREATE_LISTING_SUCCESS':
            return {
                listings: action.payload,
                isFetching: false,
                error: false,
            };
        case 'CREATE_LISTING_FAILURE':
            return {
                listings: [],
                isFetching: false,
                error: true,
            };
        case 'DELETE_LISTING_START':
            return {
                listings: [],
                isFetching: true,
                error: false,
            };
        case 'DELETE_LISTING_SUCCESS':
            return {
                listings: action.payload,
                isFetching: false,
                error: false,
            };
        case 'DELETE_LISTING_FAIL':
            return {
                listings: state.listings,
                isFetching: false,
                error: true,
            };
        case 'UPDATE_LISTING_START':
            return {
                listings: [],
                isFetching: true,
                error: false,
            };
        case 'UPDATE_LISTING_SUCCESS':
            return {
                listings: action.payload,
                isFetching: false,
                error: false,
            };
        case 'UPDATE_LISTING_FAILURE':
            return {
                listings: [],
                isFetching: false,
                error: true,
            };
        default:
            return { ...state };
    }
};

export default ListingReducer;
