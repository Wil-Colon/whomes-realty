import React, { Suspense, useContext, useEffect, useState } from 'react';
import { Container, Divider, Grid, Loader, Text } from '@mantine/core';
import { useMediaQuery, usePagination } from '@mantine/hooks';
import { getListings } from '../../context/ListingContext/apiCalls';
import { ListingContext } from '../../context/ListingContext/ListingContext';
import { Pagination } from '@mantine/core';
import ViewAllListingHeader from '../../Components/ViewallListingsHeader/ViewAllListingHeader';
const Listing = React.lazy(() => import('../../Components/Listing/Listing'));

export default function ViewAllListings() {
    const isMobile = useMediaQuery('(max-width: 769px)');
    const { dispatch } = useContext(ListingContext);
    const [list, setList] = useState() as any;
    const [isLoading, setIsloading] = useState(true);
    const [filterValue, setFilterValue] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    const [startIndex, setStartIndex] = useState(0);
    const [page, onChange] = useState(1);
    const pagination = usePagination({ total: totalPages, page, onChange });

    useEffect(() => {
        const getList = async () => {
            const res = (await getListings(dispatch, filterValue)) as any;
            setList(res.data);
            setIsloading(false);
            setStartIndex(0);
        };
        getList();
    }, [dispatch, filterValue]);

    useEffect(() => {
        list && setTotalPages(Math.ceil(list.length / 6));
        setStartIndex(pagination.active * 6 - 6);
    }, [list, pagination.active, totalPages]);

    const selectedFilter = (value) => {
        pagination.setPage(0);
        setFilterValue(value);
        setIsloading(true);
    };

    return (
        <div>
            <ViewAllListingHeader setFilter={selectedFilter} />
            <Divider />
            {isLoading ? (
                <Loader />
            ) : (
                <Container
                    id="listings"
                    size={isMobile ? 800 : 1200}
                    style={{ marginTop: '15px', marginBottom: '15px' }}
                >
                    <Grid justify={'center'}>
                        {isLoading ? (
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
                                    i >= startIndex &&
                                    i < pagination.active * 6 && (
                                        <Suspense
                                            key={list._id}
                                            fallback={<Loader />}
                                        >
                                            <Listing list={list} index={i} />
                                        </Suspense>
                                    )
                            )
                        )}
                        {list.length === 0 && (
                            <Text>No Listings Available</Text>
                        )}
                    </Grid>
                    {totalPages > 1 && (
                        <Pagination
                            style={{ marginTop: '20px' }}
                            onChange={onChange}
                            onClick={() => {
                                setStartIndex(pagination.active * 6 - 6);
                            }}
                            initialPage={1}
                            total={totalPages}
                        />
                    )}
                </Container>
            )}
        </div>
    );
}
