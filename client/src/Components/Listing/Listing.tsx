import './listing.scss';
import {
    Grid,
    Card,
    Image,
    Text,
    Badge,
    Button,
    Group,
    Center,
    createStyles,
} from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import { useRef, useState, useEffect } from 'react';
import { Carousel } from '@mantine/carousel';
import { IconBath, IconBed, IconDimensions } from '@tabler/icons';
import { useLocation, useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme, _params, getRef) => ({
    price: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },

    carousel: {
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
}));

export default function Listing({ list, index }) {
    const location = useLocation();
    const navigate = useNavigate();
    const containerRef = useRef();
    const [viewed, setViewed] = useState(false);
    const { classes } = useStyles();
    const { ref, entry } = useIntersection({
        root: containerRef.current,
        threshold: 0.1,
    });

    useEffect(() => {
        if (viewed === false && entry?.isIntersecting) {
            setTimeout(() => {
                setViewed(true);
            }, index * 100);
        }
    }, [entry?.isIntersecting, viewed, index]);

    return (
        <Grid.Col
            sm={4}
            style={{
                maxWidth: '335px',
            }}
            ref={ref}
        >
            {viewed ? (
                <div className="card">
                    <Card shadow="md" p="lg" radius="md" withBorder>
                        <Card.Section>
                            <Carousel
                                sx={{ maxWidth: 320 }}
                                mx="auto"
                                withIndicators
                                loop
                                withControls={
                                    list.image.length === 0 ? false : true
                                }
                                classNames={{
                                    root: classes.carousel,
                                    controls: classes.carouselControls,
                                    indicator: classes.carouselIndicator,
                                }}
                            >
                                {list?.image.length > 0 ? (
                                    list?.image?.map((img, i) => (
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
                        </Card.Section>

                        <Group grow mt="md" mb="xs" spacing={'sm'}>
                            <Text
                                style={{ textDecoration: 'underline' }}
                                color={'darkgreen'}
                                weight={700}
                            >
                                ${list?.price}
                            </Text>
                            <Badge
                                color="pink"
                                variant="gradient"
                                gradient={{
                                    from: 'indigo',
                                    to: 'blue',
                                }}
                            >
                                {list?.status}
                            </Badge>
                        </Group>

                        <Text align="center" weight={700} color={'blue'}>
                            {list?.address}
                            <br />
                            {list?.city}, {list?.state} {list?.zipcode}
                        </Text>
                        <Group
                            spacing="lg"
                            position="center"
                            sx={{ marginTop: '10px' }}
                        >
                            <IconBed size={'20px'} />
                            <span style={{ marginLeft: '-15px' }}>
                                {list?.bedRooms}bd{' '}
                            </span>
                            <IconBath size={'20px'} />
                            <span style={{ marginLeft: '-15px' }}>
                                {list?.baths}ba
                            </span>
                            <IconDimensions size={'20px'} />
                            <span style={{ marginLeft: '-15px' }}>
                                {list?.squareFootage}ft
                            </span>
                            <sup style={{ marginLeft: '-15px' }}>2</sup>{' '}
                        </Group>

                        <Button
                            variant="light"
                            color="blue"
                            fullWidth
                            mt="md"
                            radius="md"
                            onClick={() => {
                                navigate(`/listing/${list._id}`, {
                                    state: {
                                        background: location,
                                        listId: list._id,
                                    },
                                });
                            }}
                        >
                            More Info
                        </Button>
                    </Card>
                </div>
            ) : (
                <div className="loader"></div>
            )}
        </Grid.Col>
    );
}
