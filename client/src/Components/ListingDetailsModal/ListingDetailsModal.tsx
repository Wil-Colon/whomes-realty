import './listingDetailsModal.scss';
import { useCounter, useMediaQuery } from '@mantine/hooks';
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
    Image,
    Center,
} from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IconColorSwatch } from '@tabler/icons';
import { Carousel } from '@mantine/carousel';
import { getSingleListing } from '../../context/ListingContext/apiCalls';
import { list } from 'firebase/storage';

const useStyles = createStyles((theme, _params, getRef) => ({
    price: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },

    carousel: {
        width: '95%',
        '&:hover': {
            [`& .${getRef('carouselControls')}`]: {
                opacity: 1,
            },
        },
    },

    carouselControls: {
        ref: getRef('carouselControls'),
        transition: 'opacity 150ms ease',
        opacity: 0,
    },

    carouselIndicator: {
        width: 4,
        height: 4,
        transition: 'width 250ms ease',

        '&[data-active]': {
            width: 16,
        },
    },
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
    const isMobile = useMediaQuery('(min-width: 580px)');
    const location = useLocation();
    const listId = location.state.listId;
    const [currentImages, setCurrentImages] = useState() as any;

    useEffect(() => {
        const getListing = async () => {
            const res = await getSingleListing(listId);
            setCurrentImages(res.image);
        };
        getListing();
    }, [listId]);

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
        <Modal
            opened={open}
            onClose={() => navigate(-1)}
            transition="fade"
            transitionDuration={400}
            transitionTimingFunction="ease"
            fullScreen={!isMobile ? true : false}
            centered
            size={'85vw'}
            style={{
                // width: '90vw',
                margin: 'auto',
                height: 'auto',
            }}
        >
            <Grid columns={!isMobile ? 10 : 20}>
                {isMobile ? (
                    <Grid.Col
                        span={10}
                        style={{ overflowY: 'scroll', height: '75vh' }}
                    >
                        <Grid gutter="xs">
                            <Grid.Col lg={12}>
                                <Image
                                    radius="md"
                                    src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                                    alt="Random unsplash image"
                                />
                            </Grid.Col>
                            <Grid.Col xs={12} lg={6}>
                                <Image
                                    radius="md"
                                    src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                                    alt="Random unsplash image"
                                />
                            </Grid.Col>
                            <Grid.Col xs={12} lg={6}>
                                <Image
                                    radius="md"
                                    src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                                    alt="Random unsplash image"
                                />
                            </Grid.Col>
                            <Grid.Col xs={12} lg={6}>
                                <Image
                                    radius="md"
                                    src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                                    alt="Random unsplash image"
                                />
                            </Grid.Col>
                            <Grid.Col xs={12} lg={6}>
                                <Image
                                    radius="md"
                                    src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                                    alt="Random unsplash image"
                                />
                            </Grid.Col>
                            <Grid.Col xs={12} lg={6}>
                                <Image
                                    radius="md"
                                    src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                                    alt="Random unsplash image"
                                />
                            </Grid.Col>
                        </Grid>
                    </Grid.Col>
                ) : (
                    <Carousel
                        height={200}
                        align="start"
                        mx="auto"
                        withIndicators
                        loop
                        withControls={
                            currentImages?.length === 0 ? false : true
                        }
                        classNames={{
                            root: classes.carousel,
                            controls: classes.carouselControls,
                            indicator: classes.carouselIndicator,
                        }}
                    >
                        {currentImages?.length > 0 ? (
                            currentImages.map((img, i) => (
                                <Carousel.Slide key={i}>
                                    <Image
                                        src={img}
                                        height={220}
                                        alt="home picture"
                                    />
                                </Carousel.Slide>
                            ))
                        ) : (
                            <Center
                                style={{
                                    backgroundColor: 'grey',
                                    width: '100%',
                                    height: '220px',
                                    position: 'relative',
                                    color: 'white',
                                    fontSize: '30px',
                                    fontFamily: 'Andale Mono',
                                }}
                            >
                                No Preview
                            </Center>
                        )}
                    </Carousel>
                )}

                <Grid.Col span={10}>
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
    );
}
