import {
    Burger,
    Button,
    Container,
    Divider,
    Drawer,
    Grid,
    Group,
    Image,
    Loader,
    Text,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconPhone } from '@tabler/icons';
import { useContext, useEffect, useState } from 'react';
import Listing from '../../Components/Listing/Listing';
import { getListings } from '../../context/ListingContext/apiCalls';
import { ListingContext } from '../../context/ListingContext/ListingContext';

export default function ViewAllListings() {
    const { dispatch, isFetching } = useContext(ListingContext);
    const [opened, { toggle }] = useDisclosure(false);
    const [list, setList] = useState() as any;
    const isMobile = useMediaQuery('(max-width: 769px)');

    useEffect(() => {
        const getList = async () => {
            const res = (await getListings(dispatch, '/')) as any;

            setList(res.data);
        };
        getList();
    }, [dispatch]);

    const items = {};

    return (
        <div>
            <div
                style={{ position: 'relative', height: '85px', zIndex: '9999' }}
            >
                <div
                    style={{
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        borderBottom: '1px solid #b9b9b9',
                        padding: '5px 0 5px 0',
                        marginBottom: '25px',
                        backgroundColor: '#228be6',
                        width: '100vw',
                    }}
                >
                    <Group
                        position="apart"
                        style={{ maxWidth: '90%', margin: 'auto' }}
                    >
                        <Image
                            src={require('../../assets/images/logo2.png')}
                            alt="company logo"
                            width={60}
                            height={60}
                        />
                        <Group spacing={5}>
                            <IconPhone style={{ color: 'white' }} />
                            <a
                                href="4019435800"
                                style={{ textDecoration: 'none' }}
                            >
                                <Text sx={{ color: 'white' }}>
                                    401-943-5800
                                </Text>{' '}
                            </a>
                        </Group>
                    </Group>
                </div>
            </div>
            <Drawer
                opened={!isMobile ? false : opened}
                onClose={toggle}
                position={'right'}
                padding="xl"
                overlayBlur={1}
                overlayOpacity={0.2}
            >
                <Button>Home Type</Button>
                <Button>All Beds</Button>{' '}
            </Drawer>

            <Group
                position="right"
                style={{
                    maxWidth: '95%',
                    margin: 'auto',
                    marginBottom: '15px',
                }}
            >
                {!isMobile ? (
                    <>
                        {' '}
                        <Button>Home Type</Button>
                        <Button>All Beds</Button>{' '}
                    </>
                ) : (
                    <Burger size={'sm'} opened={opened} onClick={toggle} />
                )}
            </Group>

            <Divider />

            <Container
                id="listings"
                size={isMobile ? 800 : 1200}
                style={{ marginTop: '15px' }}
            >
                <Grid justify={isMobile ? 'center' : 'space-between'}>
                    {isFetching ? (
                        <div
                            style={
                                !isMobile
                                    ? { minHeight: '1000px' }
                                    : { minHeight: '1500px' }
                            }
                        >
                            <Loader />
                        </div>
                    ) : (
                        list?.map((list, i) => (
                            <Listing key={list._id} list={list} index={i} />
                        ))
                    )}
                </Grid>
            </Container>
        </div>
    );
}
