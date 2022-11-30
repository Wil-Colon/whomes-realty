import NavBar from '../../../../Components/AdminNavBar/AdminNavBar';
import { ListingContext } from '../../../../context/ListingContext/ListingContext';
import { useContext, useEffect, useState } from 'react';
import { getListings } from '../../../../context/ListingContext/apiCalls';
import { Button, Highlight, Loader, Text } from '@mantine/core';
import ListingTable from '../../../../Components/ListingTable/ListingTable';

export default function CreateListing() {
    const { listings, dispatch, isFetching } = useContext(ListingContext);
    const [listData, setListData] = useState([] as any);

    //filterData requires all data to be strings, convertListToString will convert featuredListing to a String.

    useEffect(() => {
        let filteredList = [] as any;
        getListings(dispatch, '?noimage=true');

        !isFetching &&
            listings?.forEach((item) => {
                filteredList.push({
                    ...item,
                    featuredListing: item.featuredListing.toString(),
                });
            });

        setListData(filteredList);
    }, [dispatch, isFetching]);

    return (
        <NavBar>
            {isFetching ? (
                <Loader />
            ) : (
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

                    {listData.length > 0 ? (
                        <ListingTable data={listData} />
                    ) : (
                        <Loader />
                    )}
                </div>
            )}
        </NavBar>
    );
}
