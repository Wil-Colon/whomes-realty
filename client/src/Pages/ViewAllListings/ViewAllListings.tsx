import { Container, Divider, Grid, Loader } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useContext, useEffect, useState } from 'react';
import Listing from '../../Components/Listing/Listing';
import { getListings } from '../../context/ListingContext/apiCalls';
import { ListingContext } from '../../context/ListingContext/ListingContext';
import ViewAllListingHeader from './ViewallListingsHeader/ViewAllListingHeader';

export default function ViewAllListings() {
    const { dispatch, isFetching } = useContext(ListingContext);
    const [list, setList] = useState() as any;
    const isMobile = useMediaQuery('(max-width: 769px)');
    const [filterValue, setFilterValue] = useState('');

    useEffect(() => {
        const getList = async () => {
            const res = (await getListings(dispatch, `?${filterValue}`)) as any;

            setList(res.data);
        };
        getList();
    }, [dispatch, filterValue]);

    const selectedFilter = (value) => {
        setFilterValue(value);
    };

    return (
        <div>
            <ViewAllListingHeader setFilter={selectedFilter} />

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
