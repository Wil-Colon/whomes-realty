import { useState } from 'react';
import {
    createStyles,
    Table,
    ScrollArea,
    UnstyledButton,
    Group,
    Text,
    Center,
    TextInput,
} from '@mantine/core';
import { keys } from '@mantine/utils';
import {
    IconSelector,
    IconChevronDown,
    IconChevronUp,
    IconSearch,
} from '@tabler/icons';

const useStyles = createStyles((theme) => ({
    th: {
        padding: '0 !important',
    },

    control: {
        width: '100%',
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

        '&:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
        },
    },

    icon: {
        width: 21,
        height: 21,
        borderRadius: 21,
    },
}));

interface RowData {
    _id: string;
    address: string;
    city: string;
    price: string;
    zipcode: string;
    bedRooms: string;
    baths: string;
    propertyType: string;
    squareFootage: string;
    state: string;
}

interface TableSortProps {
    data: RowData[];
}

interface ThProps {
    children: React.ReactNode;
    reversed: boolean;
    sorted: boolean;
    onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
    const { classes } = useStyles();
    const Icon = sorted
        ? reversed
            ? IconChevronUp
            : IconChevronDown
        : IconSelector;
    return (
        <th className={classes.th}>
            <UnstyledButton onClick={onSort} className={classes.control}>
                <Group position="apart">
                    <Text weight={500} size="sm">
                        {children}
                    </Text>
                    <Center className={classes.icon}>
                        <Icon size={14} stroke={1.5} />
                    </Center>
                </Group>
            </UnstyledButton>
        </th>
    );
}

function filterData(data: RowData[], search: string) {
    const query = search.toLowerCase().trim();
    return data.filter((item) =>
        keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
    );
}

function sortData(
    data: RowData[],
    payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
    const { sortBy } = payload;

    if (!sortBy) {
        return filterData(data, payload.search);
    }

    return filterData(
        [...data].sort((a, b) => {
            if (payload.reversed) {
                return b[sortBy].localeCompare(a[sortBy]);
            }

            return a[sortBy].localeCompare(b[sortBy]);
        }),
        payload.search
    );
}

export default function ListingTable({ data }: TableSortProps) {
    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState(data);
    const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);

    const setSorting = (field: keyof RowData) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(data, { sortBy: field, reversed, search }));
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setSortedData(
            sortData(data, {
                sortBy,
                reversed: reverseSortDirection,
                search: value,
            })
        );
    };

    const rows = sortedData.map((row) => (
        <tr key={row._id}>
            <td>{row.address}</td>
            <td>{row.city}</td>
            <td>{row.price}</td>
            <td>{row.zipcode}</td>
            <td>{row.bedRooms}</td>
            <td>{row.baths}</td>
            <td>{row.propertyType}</td>
            <td>{row.squareFootage}</td>
            <td>{row.state}</td>
        </tr>
    ));

    return (
        <ScrollArea>
            <TextInput
                placeholder="Search by any field"
                mb="md"
                icon={<IconSearch size={14} stroke={1.5} />}
                value={search}
                onChange={handleSearchChange}
            />
            <Table
                horizontalSpacing="md"
                verticalSpacing="xs"
                sx={{ tableLayout: 'fixed', minWidth: 700 }}
            >
                <thead>
                    <tr>
                        <Th
                            sorted={sortBy === 'address'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('address')}
                        >
                            Address
                        </Th>
                        <Th
                            sorted={sortBy === 'city'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('city')}
                        >
                            City
                        </Th>
                        <Th
                            sorted={sortBy === 'price'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('price')}
                        >
                            Price
                        </Th>

                        <Th
                            sorted={sortBy === 'zipcode'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('zipcode')}
                        >
                            zipcode
                        </Th>
                        <Th
                            sorted={sortBy === 'bedRooms'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('bedRooms')}
                        >
                            Beds
                        </Th>
                        <Th
                            sorted={sortBy === 'baths'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('baths')}
                        >
                            Baths
                        </Th>
                        <Th
                            sorted={sortBy === 'propertyType'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('propertyType')}
                        >
                            Type
                        </Th>
                        <Th
                            sorted={sortBy === 'squareFootage'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('squareFootage')}
                        >
                            Sq.ft
                        </Th>
                        <Th
                            sorted={sortBy === 'state'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('state')}
                        >
                            State
                        </Th>
                    </tr>
                </thead>
                <tbody>
                    {rows.length > 0 ? (
                        rows
                    ) : (
                        <tr>
                            <td colSpan={Object.keys(data[0]).length}>
                                <Text weight={500} align="center">
                                    Nothing found
                                </Text>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </ScrollArea>
    );
}
