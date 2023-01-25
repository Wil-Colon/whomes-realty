import { Grid, Loader, Text } from '@mantine/core';
import { getListings } from '../../context/ListingContext/apiCalls';
import { ListingContext } from '../../context/ListingContext/ListingContext';
import { useContext, useEffect, useState } from 'react';
import Listing from '../Listing/Listing';
import { useMediaQuery } from '@mantine/hooks';

export default function FeatureListings() {
    const { dispatch, isFetching } = useContext(ListingContext);
    const [list, setList] = useState() as any;
    const isMobile = useMediaQuery('(min-width: 480px)');

    useEffect(() => {
        const getList = async () => {
            const res = (await getListings(
                dispatch,
                '?featuredListing=true'
            )) as any;

            setList(res.data);
        };
        getList();
    }, [dispatch]);

    return (
        <div id="listings" style={{ padding: '20px 10px 40px 10px' }}>
            <Text sx={{ fontSize: '30px', textAlign: 'center' }}>
                FEATURE LISTINGS
            </Text>
            <Grid justify="center">
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
                    list?.map(
                        (list, i) =>
                            i < 4 && (
                                <Listing key={list._id} list={list} index={i} />
                            )
                    )
                )}
            </Grid>
        </div>
    );
}
