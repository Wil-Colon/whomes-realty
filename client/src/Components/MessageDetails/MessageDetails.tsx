import './MessageDetails.scss';
import {
    Drawer,
    createStyles,
    Text,
    Avatar,
    Group,
    TypographyStylesProvider,
    Paper,
} from '@mantine/core';
import moment from 'moment';

interface MessageDetailsProps {
    open: boolean;
    onClose: any;
    message: any;
}

interface CommentHtmlProps {
    postedAt: string;
    body: string;
    author: {
        name: string;
        image: string;
    };
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
}: MessageDetailsProps) {
    const { classes } = useStyles();
    let date = moment(`${message?.date}`).format('MMM D');

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
                <p>delete, mark as read buttons</p>
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
