import axios from 'axios';
import {
    getMessagesStart,
    getMessagesSuccess,
    getMessagesFailure,
    deleteMessageStart,
    deleteMessageSuccess,
    deleteMessageFailure,
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
        //messages will be retrieved by newest first
        dispatch(getMessagesSuccess(res.data.reverse()));
    } catch (err) {
        dispatch(getMessagesFailure());
        return err;
    }
};

export const deleteMessageById = async (dispatch, id) => {
    dispatch(deleteMessageStart());
    try {
        await axios.delete(`http://localhost:5000/api/messages/delete/${id}`, {
            headers: {
                token:
                    'Bearer ' +
                    JSON.parse(localStorage.getItem('user')!).accessToken,
            },
        });
        dispatch(deleteMessageSuccess(id));
    } catch (err) {
        dispatch(deleteMessageFailure());
        return err;
    }
};
