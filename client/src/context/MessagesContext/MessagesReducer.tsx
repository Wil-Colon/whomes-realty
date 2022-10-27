const MessagesReducer = (state, action) => {
    switch (action.type) {
        case 'GET_MESSAGES_START':
            return {
                messages: null,
                isFetching: true,
                error: false,
            };
        case 'GET_MESSAGES_SUCCESS':
            return {
                messages: action.payload,
                isFetching: false,
                error: false,
            };
        case 'GET_MESSAGES_FAILURE':
            return {
                messages: null,
                isFetching: false,
                error: action.payload,
            };
        default:
            return { ...state };
    }
};

export default MessagesReducer;
