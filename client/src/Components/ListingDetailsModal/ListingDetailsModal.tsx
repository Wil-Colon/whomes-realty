import './listingDetailsModal.scss';
import { useCounter } from '@mantine/hooks';
import {
    Modal,
    Button,
    Group,
    Text,
    Badge,
    Grid,
    createStyles,
    Paper,
    ThemeIcon,
    ScrollArea,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IconColorSwatch } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
    card: {
        position: 'relative',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'transform 150ms ease, box-shadow 100ms ease',
        padding: theme.spacing.xl,
        paddingLeft: theme.spacing.xl * 2,

        '&:hover': {
            boxShadow: theme.shadows.md,
            transform: 'scale(1.02)',
        },

        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: 6,
            backgroundImage: theme.fn.linearGradient(
                0,
                theme.colors.pink[6],
                theme.colors.orange[6]
            ),
        },
    },
}));

interface CardGradientProps {
    title: string;
    description: string;
}

export default function ListingDetailsModal() {
    const [count, { increment, decrement }] = useCounter(3, { min: 0 });
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { classes } = useStyles();

    useEffect(() => {
        const onPageLoad = () => {
            setOpen(true);
        };

        if (document.readyState === 'complete') {
            onPageLoad();
        } else {
            window.addEventListener('load', onPageLoad);
            // Remove the event listener when component unmounts
            return () => window.removeEventListener('load', onPageLoad);
        }
    }, []);

    const badges = Array(count)
        .fill(0)
        .map((_, index) => <Badge key={index}>Badge {index}</Badge>);

    return (
        <div style={{ overflow: 'none', height: 'auto' }}>
            <Modal
                opened={open}
                onClose={() => navigate(-1)}
                size="90%"
                transition="fade"
                transitionDuration={400}
                transitionTimingFunction="ease"
                style={{
                    maxWidth: '1300px',
                    height: '100vh',
                    margin: 'auto',
                }}
            >
                <Grid columns={24}>
                    <Grid.Col span={14}>
                        <Grid
                            columns={24}
                            grow
                            gutter="xl"
                            style={{ height: '80vh', overflowY: 'auto' }}
                        >
                            <Grid.Col
                                style={{
                                    backgroundColor: 'yellow',
                                    height: '400px',
                                }}
                                span={24}
                            >
                                1
                            </Grid.Col>
                            <Grid.Col
                                style={{
                                    backgroundColor: 'blue',
                                    height: '200px',
                                }}
                                span={12}
                            >
                                2
                            </Grid.Col>
                            <Grid.Col
                                style={{
                                    backgroundColor: 'green',
                                    height: '200px',
                                }}
                                span={12}
                            >
                                3
                            </Grid.Col>
                            <Grid.Col
                                style={{
                                    backgroundColor: 'red',
                                    height: '200px',
                                }}
                                span={12}
                            >
                                4
                            </Grid.Col>
                            <Grid.Col
                                style={{
                                    backgroundColor: 'yellow',
                                    height: '200px',
                                }}
                                span={12}
                            >
                                5
                            </Grid.Col>
                            <Grid.Col
                                style={{
                                    backgroundColor: 'yellow',
                                    height: '200px',
                                }}
                                span={12}
                            >
                                5
                            </Grid.Col>
                            <Grid.Col
                                style={{
                                    backgroundColor: 'yellow',
                                    height: '200px',
                                }}
                                span={12}
                            >
                                5
                            </Grid.Col>
                            <Grid.Col
                                style={{
                                    backgroundColor: 'yellow',
                                    height: '200px',
                                }}
                                span={12}
                            >
                                5
                            </Grid.Col>
                            <Grid.Col
                                style={{
                                    backgroundColor: 'yellow',
                                    height: '200px',
                                }}
                                span={12}
                            >
                                5
                            </Grid.Col>
                            <Grid.Col
                                style={{
                                    backgroundColor: 'yellow',
                                    height: '200px',
                                }}
                                span={12}
                            >
                                5
                            </Grid.Col>
                            <Grid.Col
                                style={{
                                    backgroundColor: 'yellow',
                                    height: '200px',
                                }}
                                span={12}
                            >
                                5
                            </Grid.Col>
                            <Grid.Col
                                style={{
                                    backgroundColor: 'yellow',
                                    height: '200px',
                                }}
                                span={12}
                            >
                                5
                            </Grid.Col>
                        </Grid>
                    </Grid.Col>
                    <Grid.Col span={9}>
                        <Paper withBorder radius="md" className={classes.card}>
                            <ThemeIcon
                                size="xl"
                                radius="md"
                                variant="gradient"
                                gradient={{
                                    deg: 0,
                                    from: 'pink',
                                    to: 'orange',
                                }}
                            >
                                <IconColorSwatch size={28} stroke={1.5} />
                            </ThemeIcon>
                            <Text size="xl" weight={500} mt="md">
                                Just testing Title
                            </Text>
                            <Text size="sm" mt="sm" color="dimmed">
                                Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                                Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                            </Text>
                        </Paper>
                    </Grid.Col>
                </Grid>
            </Modal>
        </div>
    );
}
