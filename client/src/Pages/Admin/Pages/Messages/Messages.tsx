import AdminNavBar from '../../../../Components/AdminNavBar/AdminNavBar';
import { useContext, useEffect } from 'react';
import { MessagesContext } from '../../../../context/MessagesContext/MessageContext';
import {
    deleteMessageById,
    getAllMessages,
} from '../../../../context/MessagesContext/apiCalls';
import { Button } from '@mantine/core';

export default function Messages() {
    const { messages, dispatch } = useContext(MessagesContext);

    useEffect(() => {
        getAllMessages(dispatch);
    }, [dispatch]);

    const deleteMessage = (id) => {
        deleteMessageById(dispatch, id);
    };

    return (
        <AdminNavBar>
            <h1>messagess!!!</h1>
            <Button
                onClick={() => deleteMessage('635b2668e09517a28f6c430a')}
            ></Button>
        </AdminNavBar>
    );
}
