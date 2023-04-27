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

export const deleteMessageStart = () => ({
    type: 'DELETE_MESSAGE_START',
});

export const deleteMessageSuccess = (id) => ({
    type: 'DELETE_MESSAGE_SUCCESS',
    payload: id,
});

export const deleteMessageFailure = () => ({
    type: 'DELETE_MESSAGE_FAILURE',
});

export const markAsReadStart = () => ({
    type: 'MARK_AS_READ_START',
});

export const markAsReadSuccess = (message) => ({
    type: 'MARK_AS_READ_SUCCESS',
    payload: message,
});

export const markAsReadFailure = () => ({
    type: 'MARK_AS_READ_FAILURE',
});
