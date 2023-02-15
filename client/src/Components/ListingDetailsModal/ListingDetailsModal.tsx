import './listingDetailsModal.scss';
import { useMediaQuery } from '@mantine/hooks';
import {
    Modal,
    Text,
    Grid,
    createStyles,
    ThemeIcon,
    Image,
    Center,
    Button,
    Group,
    List,
    Title,
    Container,
    CloseButton,
} from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Carousel } from '@mantine/carousel';
import { getSingleListing } from '../../context/ListingContext/apiCalls';
import { IconCheck } from '@tabler/icons';

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

    container: {
        marginLeft: '15px',
    },

    inner: {
        display: 'flex',
        justifyContent: 'space-between',
    },

    content: {
        maxWidth: 480,

        [theme.fn.smallerThan('md')]: {
            maxWidth: '100%',
            marginRight: 0,
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: 44,
        lineHeight: 1.2,
        fontWeight: 900,
        [theme.fn.smallerThan('md')]: {
            fontSize: 35,
        },

        [theme.fn.smallerThan('xs')]: {
            fontSize: 28,
        },
    },

    control: {
        [theme.fn.smallerThan('xs')]: {
            flex: 1,
        },
    },

    highlight: {
        position: 'relative',
        backgroundImage: 'linear-gradient(45deg, #4c6ef5 0%, #15aabf 100%)',
        borderRadius: theme.radius.sm,
        padding: '4px 12px',
    },
}));

export default function ListingDetailsModal() {
    const { classes } = useStyles();
    const [open, setOpen] = useState(false);
    const [listingData, setListingData] = useState(null) as any;
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(min-width: 800px)');
    const location = useLocation();
    const listId = location.state.listId;

    useEffect(() => {
        const getListing = async () => {
            const res = await getSingleListing(listId);
            setListingData(res);
            setIsLoading(false);
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

    return (
        <Modal
            withCloseButton={false}
            opened={open}
            onClose={() => navigate(-1)}
            transition="fade"
            transitionDuration={400}
            transitionTimingFunction="ease"
            fullScreen={!isMobile ? true : false}
            centered
            size={'85vw'}
            style={{
                margin: 'auto',
                height: 'auto',
            }}
        >
            <Group position="apart">
                <Image
                    src={require('../../assets/images/logo1.png')}
                    alt="company logo"
                    width={60}
                    height={60}
                    style={{ marginBottom: '10px' }}
                />
                <CloseButton
                    variant="outline"
                    color={'blue'}
                    onClick={() => navigate(-1)}
                />
            </Group>
            {listingData ? (
                <Grid columns={!isMobile ? 10 : 20}>
                    {isMobile ? (
                        <Grid.Col
                            span={10}
                            style={{ overflowY: 'scroll', height: '75vh' }}
                        >
                            <Grid gutter="xs">
                                {!isLoading && listingData.image.length > 0 ? (
                                    <Grid.Col lg={12}>
                                        <Image
                                            radius="md"
                                            src={`${listingData.image[0]}`}
                                            alt="Random unsplash image"
                                        />
                                    </Grid.Col>
                                ) : (
                                    <h1>No Previews</h1>
                                )}
                                {!isLoading &&
                                    listingData.image.map((image, i) => {
                                        return (
                                            i > 0 && (
                                                <Grid.Col
                                                    xs={12}
                                                    lg={6}
                                                    key={i}
                                                >
                                                    <Image
                                                        radius="md"
                                                        src={`${image}`}
                                                        alt="Random unsplash image"
                                                        height={200}
                                                    />
                                                </Grid.Col>
                                            )
                                        );
                                    })}
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
                                listingData?.image.length === 0 ? false : true
                            }
                            classNames={{
                                root: classes.carousel,
                                controls: classes.carouselControls,
                                indicator: classes.carouselIndicator,
                            }}
                        >
                            {listingData?.image.length > 0 ? (
                                listingData.image.map((img, i) => (
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
                        <Container className={classes.container}>
                            <div className={classes.inner}>
                                <div className={classes.content}>
                                    <Title className={classes.title}>
                                        <Text
                                            component="span"
                                            variant="gradient"
                                            gradient={{
                                                from: 'indigo',
                                                to: 'cyan',
                                                deg: 45,
                                            }}
                                            style={{ lineHeight: '0' }}
                                        >
                                            {listingData.address}
                                        </Text>
                                        <br />
                                        <span>
                                            {listingData.city},
                                            {listingData.state}{' '}
                                            {listingData.zipcode}
                                        </span>
                                    </Title>
                                    <Text color="dimmed" mt="md">
                                        Build fully functional accessible web
                                        applications faster than ever – Mantine
                                        includes more than 120 customizable
                                        components and hooks to cover you in any
                                        situation
                                    </Text>

                                    <List
                                        mt={30}
                                        spacing="sm"
                                        size="sm"
                                        icon={
                                            <ThemeIcon size={20} radius="xl">
                                                <IconCheck
                                                    size={12}
                                                    stroke={1.5}
                                                />
                                            </ThemeIcon>
                                        }
                                    >
                                        <List.Item>
                                            <b>TypeScript based</b> – build type
                                            safe applications, all components
                                            and hooks export types
                                        </List.Item>
                                        <List.Item>
                                            <b>Free and open source</b> – all
                                            packages have MIT license, you can
                                            use Mantine in any project
                                        </List.Item>
                                        <List.Item>
                                            <b>No annoying focus ring</b> –
                                            focus ring will appear only when
                                            user navigates with keyboard
                                        </List.Item>
                                    </List>

                                    <Group mt={30}>
                                        <Button
                                            radius="xl"
                                            size="md"
                                            className={classes.control}
                                        >
                                            Get started
                                        </Button>
                                        <Button
                                            variant="default"
                                            radius="xl"
                                            size="md"
                                            className={classes.control}
                                        >
                                            Source code
                                        </Button>
                                    </Group>
                                </div>
                            </div>
                        </Container>
                    </Grid.Col>
                </Grid>
            ) : (
                <h1>loading</h1>
            )}
        </Modal>
    );
}
