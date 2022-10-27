export const loginStart = () => ({
    type: 'LOGIN_START',
});

export const getMessagesStart = () => ({
    type: 'GET_MESSAGES_START',
});

export const getMessagesSuccess = (messages) => ({
    type: 'GET_MESSAGES_SUCCESS',
    payload: messages,
});

export const getMessagesFailure = () => ({
    type: 'GET_MESSAGES_FAILURE',
});
