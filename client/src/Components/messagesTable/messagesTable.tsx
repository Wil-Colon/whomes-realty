import {
    deleteMessageById,
    getAllMessages,
    markAsRead,
} from '../../context/MessagesContext/apiCalls';
import {
    createStyles,
    Table,
    ScrollArea,
    Checkbox,
    Group,
    Text,
} from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { MessagesContext } from '../../context/MessagesContext/MessageContext';
import moment from 'moment';
import MessageDetails from '../MessageDetails/MessageDetails';

const useStyles = createStyles((theme) => ({
    rowSelected: {
        backgroundColor:
            theme.colorScheme === 'dark'
                ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
                : theme.colors[theme.primaryColor][0],
    },
}));

const button = {
    active: {
        backGroundColor: 'green',
        cursor: 'pointer',
    },
    inActive: {
        backgroundColor: 'transparent',
        color: 'grey',
    },
};

export default function MessagesTable() {
    let date;
    const { messages, dispatch, isFetching } = useContext(MessagesContext);
    const { classes, cx } = useStyles();
    const [selection, setSelection] = useState<string[]>([]);
    const [open, setOpened] = useState(false);
    const [openedMessage, setOpenedMessage] = useState<string[]>([]);

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + '...' : str;
    };

    useEffect(() => {
        getAllMessages(dispatch);
    }, [open, dispatch]);

    const toggleRow = (_id: string) =>
        setSelection((current) =>
            current?.includes(_id)
                ? current?.filter((item) => item !== _id)
                : [...current, _id]
        );
    const toggleAll = () =>
        setSelection((current) =>
            current.length === messages.length
                ? []
                : messages?.map((item) => item._id)
        );

    const openMessageDetails = (message, open) => {
        markAsRead(dispatch, message._id, false);
        setOpenedMessage(message);
        setOpened(open);
    };

    const rows = messages?.map((message) => {
        date = moment(`${message?.date}`).format('MMM D');
        const selected = selection.includes(message?._id);

        return (
            <tr
                key={message?._id}
                className={cx({ [classes.rowSelected]: selected })}
            >
                <td>
                    <Checkbox
                        checked={selection.includes(message?._id)}
                        onChange={() => toggleRow(message?._id)}
                        transitionDuration={0}
                    />
                </td>

                <MessageDetails
                    open={open}
                    onClose={() => setOpened(false)}
                    message={openedMessage}
                    setOpened={setOpened}
                />

                <td>
                    <Group spacing="sm">
                        <Text
                            size="sm"
                            weight={message.unRead ? 700 : 500}
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                openMessageDetails(message, true);
                            }}
                        >
                            {`${message?.firstName} ${message?.lastName}`}
                        </Text>
                    </Group>
                </td>

                <td
                    style={{
                        fontWeight: message?.unRead ? 700 : 500,
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        openMessageDetails(message, true);
                    }}
                >
                    {message?.email}
                </td>
                <td
                    style={{
                        fontWeight: message?.unRead ? 700 : 500,
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        openMessageDetails(message, true);
                    }}
                >
                    {truncate(message?.message, 80)}
                </td>
                <td
                    style={{
                        fontWeight: message?.unRead ? 700 : 500,
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        openMessageDetails(message, true);
                    }}
                >
                    {date}
                </td>
            </tr>
        );
    });

    const deleteItem = (e) => {
        e.preventDefault();
        deleteMessageById(dispatch, selection);
    };

    return (
        <>
            <ScrollArea>
                <Table
                    sx={{ minWidth: 800, marginBottom: ' 20px' }}
                    verticalSpacing="sm"
                >
                    <thead>
                        <tr>
                            <th style={{ width: 40 }}>
                                <Checkbox
                                    onChange={toggleAll}
                                    checked={
                                        selection.length === messages?.length
                                    }
                                    indeterminate={
                                        selection.length > 0 &&
                                        selection.length !== messages?.length
                                    }
                                    transitionDuration={0}
                                />
                            </th>
                            <th style={{ width: '16ch' }}>Name</th>
                            <th style={{ width: '25ch' }}>Email</th>
                            <th>Message</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </ScrollArea>

            <button
                disabled={selection.length === 0}
                style={selection.length > 0 ? button.active : button.inActive}
                onClick={(e) => deleteItem(e)}
            >
                delete
            </button>
        </>
    );
}
