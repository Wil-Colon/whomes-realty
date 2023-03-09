import {
    Burger,
    Button,
    Container,
    Divider,
    Drawer,
    Grid,
    Group,
    Loader,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useContext, useEffect, useState } from 'react';
import Listing from '../../Components/Listing/Listing';
import { getListings } from '../../context/ListingContext/apiCalls';
import { ListingContext } from '../../context/ListingContext/ListingContext';
import ViewListingHeader from './ViewListingsHeader/ViewListingHeader';

export default function ViewAllListings() {
    const { dispatch, isFetching } = useContext(ListingContext);
    const [list, setList] = useState() as any;
    const isMobile = useMediaQuery('(max-width: 769px)');
    const [value, setValue] = useState('');

    useEffect(() => {
        const getList = async () => {
            const res = (await getListings(dispatch, '/')) as any;

            setList(res.data);
        };
        getList();
    }, [dispatch]);

    const selectedFilter = (value) => setValue(value);

    console.log(value);

    return (
        <div>
            <ViewListingHeader setFilter={selectedFilter} />

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
