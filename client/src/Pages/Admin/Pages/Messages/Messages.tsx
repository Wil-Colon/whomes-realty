import AdminNavBar from '../../../../Components/AdminNavBar/AdminNavBar';
import { useContext, useEffect } from 'react';
import { MessagesContext } from '../../../../context/MessagesContext/MessageContext';
import { getAllMessages } from '../../../../context/MessagesContext/apiCalls';

export default function Messages() {
    const { messages, dispatch } = useContext(MessagesContext);

    useEffect(() => {
        getAllMessages(dispatch);
    }, [dispatch]);

    console.log(messages);
    return (
        <AdminNavBar>
            <h1>messagess!!!</h1>
        </AdminNavBar>
    );
}
