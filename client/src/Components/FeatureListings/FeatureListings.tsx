import { Grid, Loader, Text } from '@mantine/core';
import { getListings } from '../../context/ListingContext/apiCalls';
import { ListingContext } from '../../context/ListingContext/ListingContext';
import { useContext, useEffect } from 'react';
import Listing from '../Listing/Listing';

export default function FeatureListings() {
    const { listings, dispatch, isFetching } = useContext(ListingContext);

    useEffect(() => {
        getListings(dispatch, '?featuredListing=true');
    }, [dispatch]);

    return (
        <div id="listings" style={{ padding: '20px 10px 40px 10px' }}>
            <Text sx={{ fontSize: '30px', textAlign: 'center' }}>
                FEATURE LISTINGS
            </Text>
            <Grid justify="center">
                {isFetching ? (
                    <Loader />
                ) : (
                    listings.map((list) => (
                        <Listing key={list._id} list={list} />
                    ))
                )}
            </Grid>
        </div>
    );
}
