import NavBar from '../../../../Components/AdminNavBar/AdminNavBar';
import { ListingContext } from '../../../../context/ListingContext/ListingContext';
import { useContext, useEffect } from 'react';
import { getListings } from '../../../../context/ListingContext/apiCalls';
import { Grid, Loader, Text } from '@mantine/core';

export default function CreateListing() {
    const { listings, dispatch, isFetching } = useContext(ListingContext);

    useEffect(() => {
        getListings(dispatch);
    }, [dispatch]);

    return (
        <NavBar>
            {isFetching ? (
                <Loader />
            ) : (
                <div id="listings" style={{ padding: '20px 10px 40px 10px' }}>
                    <Text sx={{ fontSize: '30px', textAlign: 'center' }}>
                        Look at UI Application Cards
                    </Text>
                    <Grid justify="center">Listings</Grid>
                </div>
            )}
        </NavBar>
    );
}
