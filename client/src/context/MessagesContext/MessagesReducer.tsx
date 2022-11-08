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
        case 'DELETE_MESSAGE_START':
            return {
                messages: state.messages,
                isFetching: true,
                error: false,
            };
        case 'DELETE_MESSAGE_SUCCESS':
            let messages = state.messages;
            let deleteMessages = action.payload;
            let newMessagePayload = messages.filter(
                (item) => !deleteMessages.includes(item._id)
            );
            return {
                messages: newMessagePayload,
                isFetching: false,
                error: false,
            };
        case 'DELETE_MESSAGE_FAIL':
            return {
                messages: state.messages,
                isFetching: false,
                error: true,
            };
        default:
            return { ...state };
    }
};

export default MessagesReducer;
