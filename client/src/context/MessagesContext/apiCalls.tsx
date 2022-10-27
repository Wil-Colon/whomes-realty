import axios from 'axios';
import {
    getMessagesStart,
    getMessagesSuccess,
    getMessagesFailure,
} from './MessagesAction';

export const getUnReadMessages = async () => {
    try {
        const res = await axios.get(
            'http://localhost:5000/api/messages?unread=true',
            {
                headers: {
                    token:
                        'Bearer ' +
                        JSON.parse(localStorage.getItem('user')!).accessToken,
                },
            }
        );
        return res.data;
    } catch (err) {
        return err;
    }
};

export const getAllMessages = async (dispatch) => {
    dispatch(getMessagesStart());
    try {
        const res = await axios.get('http://localhost:5000/api/messages', {
            headers: {
                token:
                    'Bearer ' +
                    JSON.parse(localStorage.getItem('user')!).accessToken,
            },
        });
        dispatch(getMessagesSuccess(res.data));
    } catch (err) {
        dispatch(getMessagesFailure());
        return err;
    }
};
