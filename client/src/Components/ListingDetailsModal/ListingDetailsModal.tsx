import './listingDetailsModal.scss';
import { useMediaQuery } from '@mantine/hooks';
import {
    Modal,
    Text,
    Grid,
    createStyles,
    Image,
    Center,
    Group,
    Title,
    Container,
    CloseButton,
    Badge,
    Divider,
    Button,
} from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Carousel } from '@mantine/carousel';
import { getSingleListing } from '../../context/ListingContext/apiCalls';
// import logo from '../../assets/images/logo1.png';

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
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [imageModalImg, setImageModalImg] = useState('');
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

    const closeTransition = () => {
        setOpen(false);
        setTimeout(() => {
            navigate(`${location.state.background.pathname}`);
        }, 200);
    };

    const openImageModal = (img) => {
        setImageModalOpen(true);
        setImageModalImg(img);
    };

    return (
        <Modal
            withCloseButton={false}
            opened={open}
            onClose={() => closeTransition()}
            transitionTimingFunction="ease"
            fullScreen={!isMobile ? true : false}
            centered
            size={'85vw'}
            zIndex={'1001'}
            style={{
                margin: 'auto',
                height: 'auto',
            }}
        >
            <Modal
                opened={imageModalOpen}
                onClose={() => setImageModalOpen(false)}
                size={!isMobile ? '100%' : '70%'}
                withCloseButton={false}
                overlayBlur={3}
                zIndex={'1002'}
            >
                <Image
                    radius="md"
                    src={imageModalImg}
                    alt="Random unsplash image"
                    style={{
                        position: 'relative',
                    }}
                />
            </Modal>

            <Group position="apart">
                <Image
                    src={'/logo1'}
                    alt="company logo"
                    width={60}
                    height={60}
                    style={{ marginBottom: '10px' }}
                />
                <CloseButton
                    variant="outline"
                    color={'blue'}
                    onClick={() => closeTransition()}
                />
            </Group>
            {listingData ? (
                <Grid columns={!isMobile ? 10 : 20}>
                    {isMobile ? (
                        <Grid.Col
                            span={10}
                            style={{
                                overflowY: 'scroll',
                                height: '85vh',
                                minHeight: '800px',
                            }}
                        >
                            <Grid gutter="xs">
                                {!isLoading && listingData.image.length > 0 ? (
                                    <Grid.Col lg={12}>
                                        <Image
                                            radius="md"
                                            src={`${listingData.image[0]}`}
                                            alt="Random unsplash image"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() =>
                                                openImageModal(
                                                    listingData.image[0]
                                                )
                                            }
                                        />
                                    </Grid.Col>
                                ) : (
                                    <h1>No Previews</h1>
                                )}
                                {!isLoading &&
                                    listingData.image.map((img, i) => {
                                        return (
                                            i > 0 && (
                                                <Grid.Col
                                                    xs={12}
                                                    lg={6}
                                                    key={i}
                                                >
                                                    <Image
                                                        radius="md"
                                                        src={`${img}`}
                                                        alt="Random unsplash image"
                                                        height={200}
                                                        style={{
                                                            cursor: 'pointer',
                                                        }}
                                                        onClick={() =>
                                                            openImageModal(img)
                                                        }
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
                                            style={{ cursor: 'pointer' }}
                                            alt="home picture"
                                            onClick={() => openImageModal(img)}
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

                    <Grid.Col className="listingDetails" span={10} style={{}}>
                        <Container className={classes.container}>
                            <div className={classes.inner}>
                                <div className={classes.content}>
                                    <Title className={classes.title}>
                                        <Badge
                                            style={{
                                                fontWeight: '600',
                                                marginBottom: '5px',
                                            }}
                                        >
                                            {listingData.status}
                                        </Badge>
                                        <br />
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
                                            {listingData.city},{' '}
                                            {listingData.state}{' '}
                                            {listingData.zipcode}
                                        </span>
                                    </Title>
                                    <div style={{ marginTop: '20px' }}>
                                        <Text mt="md" color={'#3c3a3a'}>
                                            <Text
                                                weight={600}
                                                color={'#228be6'}
                                                size={14}
                                            >
                                                Listing Price:
                                            </Text>
                                            {`$${listingData.price}`}
                                        </Text>
                                    </div>
                                    <div>
                                        <Text mt="md" color={'#3c3a3a'}>
                                            <Text
                                                weight={600}
                                                color={'#228be6'}
                                                size={14}
                                            >
                                                Home Description:
                                            </Text>
                                            {listingData.description}
                                        </Text>
                                    </div>
                                    <Divider my="sm" />
                                    <div
                                        style={{
                                            marginTop: '15px',
                                        }}
                                    >
                                        <Text
                                            weight={600}
                                            color={'#228be6'}
                                            size={14}
                                        >
                                            Home Information:
                                        </Text>

                                        <Grid
                                            columns={24}
                                            style={{
                                                color: '#3c3a3a',
                                                fontSize: '13px',
                                            }}
                                            gutter={5}
                                        >
                                            <Grid.Col lg={12} md={24}>
                                                <b> Status</b> –{' '}
                                                {listingData?.status}
                                            </Grid.Col>
                                            <Grid.Col lg={12} md={24}>
                                                <b> Property Type</b> –{' '}
                                                {listingData?.propertyType.join(
                                                    ', '
                                                )}
                                            </Grid.Col>
                                            <Grid.Col lg={12} md={24}>
                                                <b>Beds </b> –{' '}
                                                {listingData?.bedRooms}
                                            </Grid.Col>
                                            <Grid.Col lg={12} md={24}>
                                                <b>Baths </b> –{' '}
                                                {listingData?.baths}
                                            </Grid.Col>
                                            <Grid.Col lg={12} md={24}>
                                                <b>Parking </b> –{' '}
                                                {listingData?.parking}
                                            </Grid.Col>
                                            <Grid.Col lg={12} md={24}>
                                                <b>Bath Features </b> –{' '}
                                                {listingData?.bathFeatures ===
                                                ''
                                                    ? 'None'
                                                    : listingData.bathFeatures}{' '}
                                            </Grid.Col>
                                            <Grid.Col lg={12} md={24}>
                                                <b>Basement</b> –{' '}
                                                {listingData?.basement}
                                            </Grid.Col>
                                            <Grid.Col lg={12} md={24}>
                                                <b>Cooling</b> –{' '}
                                                {listingData?.cooling
                                                    .charAt(0)
                                                    .toUpperCase()}
                                                {listingData?.cooling.slice(1)}
                                            </Grid.Col>
                                            <Grid.Col lg={12} md={24}>
                                                <b>Appliances </b> –{' '}
                                                {listingData?.appliances === ''
                                                    ? 'None'
                                                    : listingData.appliances}
                                            </Grid.Col>
                                            <Grid.Col lg={12} md={24}>
                                                <b>Year Built </b> –{' '}
                                                {listingData?.yearBuilt}
                                            </Grid.Col>
                                            <Grid.Col lg={12} md={24}>
                                                <b>HOA Fees: </b> –{' '}
                                                {listingData?.hoaFee === ''
                                                    ? 'None'
                                                    : listingData.hoaFee}
                                            </Grid.Col>
                                            <Grid.Col lg={12} md={24}>
                                                <b>Lot Size </b> –{' '}
                                                {listingData?.squareFootage}{' '}
                                                Sq.Ft.
                                            </Grid.Col>
                                        </Grid>
                                    </div>
                                </div>
                            </div>
                        </Container>
                        <Divider my="sm" />
                        <Group position="center" style={{ marginTop: '15px' }}>
                            <a
                                href="tel:4019435800"
                                style={{ textDecoration: 'none' }}
                            >
                                <Button
                                    style={{ width: '150px' }}
                                    variant="outline"
                                >
                                    Give us a Call
                                </Button>
                            </a>
                            <a href="mailto:wendygarcia72@yahoo.com">
                                <Button
                                    style={{ width: '150px' }}
                                    variant="outline"
                                >
                                    Email us
                                </Button>
                            </a>
                        </Group>
                    </Grid.Col>
                </Grid>
            ) : (
                <h1>loading</h1>
            )}
        </Modal>
    );
}
