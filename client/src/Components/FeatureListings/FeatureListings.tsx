import React, { Suspense, useContext, useEffect, useState } from 'react';
import { Container, Grid, Loader, Text } from '@mantine/core';
import { getListings } from '../../context/ListingContext/apiCalls';
import { ListingContext } from '../../context/ListingContext/ListingContext';
import { useMediaQuery } from '@mantine/hooks';
const Listing = React.lazy(() => import('../Listing/Listing'));

export default function FeatureListings() {
    const { dispatch, isFetching } = useContext(ListingContext);
    const [list, setList] = useState() as any;
    const isMobile = useMediaQuery('(max-width: 769px)');

    let listSize = isMobile ? 4 : 6;
    useEffect(() => {
        const getList = async () => {
            const res = (await getListings(dispatch, 'featuredListing')) as any;

            setList(res.data);
        };
        getList();
    }, [dispatch]);

    return (
        <Container id="listings" size={isMobile ? 800 : 1200}>
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
                            i < listSize && (
                                <Suspense fallback={<Loader />} key={list._id}>
                                    <Listing list={list} index={i} />
                                </Suspense>
                            )
                    )
                )}
            </Grid>
        </Container>
    );
}
