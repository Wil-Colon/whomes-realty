import NavBar from '../../../../Components/AdminNavBar/AdminNavBar';
import { ListingContext } from '../../../../context/ListingContext/ListingContext';
import { useContext, useEffect, useState } from 'react';
import { getListings } from '../../../../context/ListingContext/apiCalls';
import { Button, Text } from '@mantine/core';
import ListingTable from '../../../../Components/ListingTable/ListingTable';
import CreateListingModal from '../../../../Components/CreateListingModal/CreateListingModal';

export default function CreateListing() {
    //filteredList will hold all data converted to a string. ListTable requires all strings for sorting.
    let filteredList = [] as any;
    const { listings, dispatch } = useContext(ListingContext);
    const [opened, setOpened] = useState(false);

    useEffect(() => {
        getListings(dispatch, '');
    }, [dispatch]);

    listings?.length > 0 &&
        listings?.forEach((item) => {
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
                    onClick={() => setOpened(true)}
                >
                    Create Listing
                </Button>
                <CreateListingModal
                    open={opened}
                    onClose={() => setOpened(false)}
                    setOpened={setOpened}
                />

                {listings.length > 0 && filteredList.length > 0 ? (
                    <ListingTable data={filteredList} />
                ) : (
                    <Text style={{ fontSize: '40px' }}>No listings found</Text>
                )}
            </div>
        </NavBar>
    );
}
