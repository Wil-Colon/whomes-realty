import { Container, Divider, Grid, Loader, Text } from '@mantine/core';
import { useMediaQuery, usePagination } from '@mantine/hooks';
import React, { Suspense, useContext, useEffect, useState } from 'react';
// import Listing from '../../Components/Listing/Listing';
import { getListings } from '../../context/ListingContext/apiCalls';
import { ListingContext } from '../../context/ListingContext/ListingContext';
import ViewAllListingHeader from './ViewallListingsHeader/ViewAllListingHeader';
import { Pagination } from '@mantine/core';

const Listing = React.lazy(() => import('../../Components/Listing/Listing'));

export default function ViewAllListings() {
    const { dispatch, isFetching } = useContext(ListingContext);
    const [list, setList] = useState() as any;
    const [isLoading, setIsloading] = useState(true);
    const isMobile = useMediaQuery('(max-width: 769px)');
    const [filterValue, setFilterValue] = useState('');

    const [activePage, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [startIndex, setStartIndex] = useState(0);

    const [page, onChange] = useState(1);
    const pagination = usePagination({ total: totalPages, page, onChange });

    // const pagination = usePagination({
    //     total: totalPages,
    //     initialPage: activePage,
    // });

    useEffect(() => {
        const getList = async () => {
            const res = (await getListings(dispatch, filterValue)) as any;

            setList(res.data);
            setIsloading(false);
        };
        getList();
    }, [dispatch, filterValue]);

    useEffect(() => {
        list && setTotalPages(Math.ceil(list.length / 6));
        setStartIndex(pagination.active * 6 - 6);
    }, [list, pagination.active]);

    const selectedFilter = (value) => {
        pagination.setPage(1);
        setFilterValue(value);
    };

    return isLoading ? (
        <Loader />
    ) : (
        <div>
            <ViewAllListingHeader setFilter={selectedFilter} />

            <Divider />

            <Container
                id="listings"
                size={isMobile ? 800 : 1200}
                style={{ marginTop: '15px', marginBottom: '15px' }}
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
                    {list.length === 0 && <Text>No Listings Available</Text>}
                </Grid>
                <Pagination
                    style={{ marginTop: '20px' }}
                    onChange={onChange}
                    onClick={() => {
                        setStartIndex(pagination.active * 6 - 6);
                    }}
                    total={totalPages}
                />
            </Container>
        </div>
    );
}
