import NavBar from '../../../../Components/AdminNavBar/AdminNavBar';
import { ListingContext } from '../../../../context/ListingContext/ListingContext';
import { useContext, useEffect, useState } from 'react';
import { getListings } from '../../../../context/ListingContext/apiCalls';
import { Button, Highlight, Loader, Text } from '@mantine/core';
import ListingTable from '../../../../Components/ListingTable/ListingTable';

export default function CreateListing() {
    //filteredList will hold all data converted to a string. ListTable requires all strings for sorting.
    let filteredList = [] as any;
    const { listings, dispatch, isFetching } = useContext(ListingContext);

    useEffect(() => {
        getListings(dispatch, '?noimage=true');
    }, [dispatch]);

    listings.length > 0 &&
        listings.forEach((item) => {
            filteredList.push({
                ...item,
                featuredListing: item.featuredListing.toString(),
            });
        });

    return (
        <NavBar>
            <div id="listings" style={{ padding: '20px 10px 40px 10px' }}>
                <Text sx={{ fontSize: '30px', textAlign: 'center' }}>
                    Listings
                </Text>
                <Button
                    variant="outline"
                    radius="lg"
                    size="md"
                    sx={{ marginBottom: '10px' }}
                >
                    Create Listing
                </Button>

                {listings.length > 0 && filteredList.length > 0 ? (
                    <ListingTable data={filteredList} />
                ) : (
                    <p>No listings found</p>
                )}
            </div>
        </NavBar>
    );
}
