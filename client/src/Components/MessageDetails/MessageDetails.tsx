import './MessageDetails.scss';
import {
    Drawer,
    createStyles,
    Text,
    Group,
    TypographyStylesProvider,
    Paper,
    Button,
} from '@mantine/core';
import moment from 'moment';
import { IconMail, IconMailOpened, IconTrash } from '@tabler/icons';
import { useContext, useEffect, useState } from 'react';
import { MessagesContext } from '../../context/MessagesContext/MessageContext';
import {
    deleteMessageById,
    getAllMessages,
    markAsRead,
} from '../../context/MessagesContext/apiCalls';

interface MessageDetailsProps {
    open: boolean;
    onClose: any;
    message: any;
    setOpened: any;
}

const useStyles = createStyles((theme) => ({
    comment: {
        padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
    },

    body: {
        paddingTop: theme.spacing.sm,
        fontSize: theme.fontSizes.sm,
    },

    content: {
        '& > p:last-child': {
            marginBottom: 0,
        },
    },
}));

export default function MessageDetails({
    open,
    onClose,
    message,
    setOpened,
}: MessageDetailsProps) {
    const { messages, dispatch, isFetching } = useContext(MessagesContext);
    const [currentMessage, setCurrentMessage] = useState({ message }) as any;

    const { classes } = useStyles();
    let date = moment(`${message?.date}`).format('MMM D');

    useEffect(() => {
        setCurrentMessage(message);
    }, [message, dispatch]);

    return (
        <Drawer
            opened={open}
            onClose={() => onClose(false)}
            padding="xl"
            position="top"
            overlayColor="#151414"
            transition="slide-up"
            overlayOpacity={0.2}
            styles={(theme) => ({
                title: {
                    color: 'white',
                    fontWeight: 600,
                },
                closeButton: {
                    color: 'black',
                    '&:hover': {
                        backgroundColor: 'grey',
                    },
                },
                drawer: {
                    borderRadius: '5px',
                    margin: 'auto',
                    maxWidth: '800px',
                    msOverflowStyle: 'none',
                    scrollbarwidth: 'none',
                    overflow: 'scroll',
                    scrollbarWidth: 'none',
                    bottom: '155px',
                    borderTop: '6px solid rgba(17,65,97,0.81)',
                },
            })}
        >
            <>
                <Group position="left" style={{ marginBottom: '7px' }}>
                    <Button
                        title="Delete"
                        variant="outline"
                        size="xs"
                        aria-label="delete"
                        onClick={(e) => {
                            e.preventDefault();
                            deleteMessageById(dispatch, message._id);
                            setOpened(false);
                        }}
                    >
                        <IconTrash />
                    </Button>

                    <Button
                        title={currentMessage.unRead === true ? "Mark as Read" : "Mark as Unread"}
                        variant="outline"
                        size="xs"
                        onClick={(e) => {
                            e.preventDefault();
                            setCurrentMessage({
                                ...currentMessage,
                                unRead: !currentMessage.unRead,
                            });
                            markAsRead(
                                dispatch,
                                message._id,
                                !currentMessage.unRead
                            );
                        }}
                    >
                        {currentMessage.unRead === true ? (
                            <IconMail />
                        ) : (
                            <IconMailOpened />
                        )}
                    </Button>

                    {/* {currentMessage.unRead === true ? (<Button
                        title="Mark as Read"
                        variant="outline"
                        size="xs"
                        aria-label="mark as read"
                        onClick={(e) => {
                            e.preventDefault();
                            setCurrentMessage({
                                ...currentMessage,
                                unRead: !currentMessage.unRead,
                            });
                            markAsRead(
                                dispatch,
                                message._id,
                                !currentMessage.unRead
                            );
                        }}
                    ><IconMail /></Button>) : (<Button
                        title="Mark as Unread"
                        variant="outline"
                        size="xs"
                        aria-label="mark as read"
                        onClick={(e) => {
                            e.preventDefault();
                            setCurrentMessage({
                                ...currentMessage,
                                unRead: !currentMessage.unRead,
                            });
                            markAsRead(
                                dispatch,
                                message._id,
                                !currentMessage.unRead
                            );
                        }}
                    ><IconMailOpened /></Button>)} */}



                </Group>
                <Paper withBorder radius="md" className={classes.comment}>
                    <Group>
                        <div>
                            <Text size="sm">
                                {`${message.firstName} ${message.lastName}`}{' '}
                                <small style={{ color: 'grey' }}>
                                    {`<${message.email}>`}
                                </small>
                            </Text>

                            <Text size="xs" color="dimmed">
                                {date}
                            </Text>
                        </div>
                    </Group>
                    <TypographyStylesProvider className={classes.body}>
                        <div
                            className={classes.content}
                            dangerouslySetInnerHTML={{
                                __html: message.message,
                            }}
                        />
                    </TypographyStylesProvider>
                </Paper>
            </>
        </Drawer>
    );
}

// {message.unRead ? (
//     <Button
//         variant="outline"
//         size="xs"
//         aria-label="mark as read/unread"
//         onClick={(e) => {
//             e.preventDefault();
//             markAsRead(
//                 dispatch,
//                 message._id,
//                 !message.unRead
//             );
//         }}
//     >
//         <IconMail />
//     </Button>
// ) : (
//     <Button
//         variant="outline"
//         size="xs"
//         aria-label="mark as read/unread"
//         onClick={(e) => {
//             e.preventDefault();
//             markAsRead(
//                 dispatch,
//                 message._id,
//                 !message.unRead
//             );
//         }}
//     >
//         <IconMailOpened />
//     </Button>
// )}
