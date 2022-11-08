import NavBar from '../../../../Components/AdminNavBar/AdminNavBar';
import { ListingContext } from '../../../../context/ListingContext/ListingContext';
import { useContext, useEffect } from 'react';
import { getListings } from '../../../../context/ListingContext/apiCalls';
import { Loader, Text } from '@mantine/core';
import ListingTable from '../../../../Components/ListingTable/ListingTable';

export default function CreateListing() {
    const { listings, dispatch, isFetching } = useContext(ListingContext);

    useEffect(() => {
        getListings(dispatch, '?noimage=true');
    }, [dispatch]);

    return (
        <NavBar>
            {isFetching ? (
                <Loader />
            ) : (
                <div id="listings" style={{ padding: '20px 10px 40px 10px' }}>
                    <Text sx={{ fontSize: '30px', textAlign: 'center' }}>
                        Listings
                        <ListingTable data={listings} />
                    </Text>
                </div>
            )}
        </NavBar>
    );
}
