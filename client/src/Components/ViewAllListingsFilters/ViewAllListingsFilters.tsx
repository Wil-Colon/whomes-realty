import './ViewAllListingsFilters.scss';
import {
    Button,
    Drawer,
    Flex,
    Group,
    Menu,
    MultiSelect,
    NativeSelect,
    Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';

interface ViewAllListingsFilerProps {
    setFilter;
}

export default function ViewAllListingsFilter({
    setFilter,
}: ViewAllListingsFilerProps) {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(true);
    const isMobile = useMediaQuery('(max-width: 769px)');

    const form = useForm({
        validateInputOnChange: true,
        initialValues: {
            minPrice: '0' as any,
            maxPrice: '0' as any,
            propertyType: [] as any,
            bedRooms: '-' as any,
            baths: '-' as any,
            city: '-' as any,
        },
        validate: {
            minPrice: (value, values) =>
                Number(value) > Number(values.maxPrice)
                    ? form.setFieldValue('minPrice', values.maxPrice)
                    : null,
        },
    });

    const defaultFormvalues = {
        propertyType: [],
        bedRooms: '-',
        baths: '-',
        city: '-',
    } as any;

    useEffect(() => {
        form.isDirty('city')
            ? setDisableSubmit(false)
            : form.isDirty('bedRooms')
            ? setDisableSubmit(false)
            : form.isDirty('baths')
            ? setDisableSubmit(false)
            : form.isDirty('propertyType')
            ? setDisableSubmit(false)
            : setDisableSubmit(true);
    }, [form]);

    useEffect(() => {
        !isMobile && setOpenDrawer(false);
    }, [isMobile]);

    const minPriceData = [
        { label: 'No Min', value: '0' },
        { label: '$100,000', value: '100000' },
        { label: '$200,000', value: '200000' },
        { label: '$300,000', value: '300000' },
        { label: '$400,000', value: '400000' },
        { label: '$500,000', value: '500000' },
        { label: '$600,000', value: '600000' },
        { label: '$700,000', value: '700000' },
        { label: '$800,000', value: '800000' },
        { label: '$900,000', value: '900000' },
    ];
    const maxPriceData = [
        { label: 'No Min', value: '0' },
        { label: '$100,000', value: '100000' },
        { label: '$200,000', value: '200000' },
        { label: '$300,000', value: '300000' },
        { label: '$400,000', value: '400000' },
        { label: '$500,000', value: '500000' },
        { label: '$600,000', value: '600000' },
        { label: '$700,000', value: '700000' },
        { label: '$800,000', value: '800000' },
        { label: '$900,000', value: '900000' },
    ];

    const propertyTypeData = [
        'Single Family Home',
        'Multi family',
        'Town Home',
        'Condo',
        'Ranch',
        'Residential',
        'Commercial',
        'Industrial',
        'Raw land',
    ];

    const cityData = [
        { label: '-', value: '-' },
        { value: 'Providence', label: 'Providence' },
        { value: 'North Providence', label: 'North Providence' },
        { value: 'East Providence', label: 'East Providence' },
        { value: 'Cranston', label: 'Cranston' },
        { value: 'Johnston', label: 'Johnston' },
        { value: 'Lincoln', label: 'Lincoln' },
        { value: 'Warwick', label: 'Warwick' },
        { value: 'Smithfield', label: 'Smithfield' },
        { value: 'West Warwick', label: 'West Warwick' },
        { value: 'Pawtucket', label: 'Pawtucket' },
        { value: 'Central Falls', label: 'Central Falls' },
        { value: 'Woonsocket', label: 'Woonsocket' },
        { value: 'Cumberland', label: 'Cumberland' },
    ];

    const PriceSelectMenuDesktop = (
        <Flex direction="column">
            <Text size={14} align="left">
                Price
            </Text>
            <Menu shadow="md" width={300}>
                <Menu.Target>
                    <Button
                        variant="default"
                        style={{ marginTop: '3px', fontWeight: '500' }}
                    >
                        {' '}
                        {form.values.minPrice === '0' &&
                        form.values.maxPrice === '0'
                            ? 'No min'
                            : `$${form.values.minPrice.replace(
                                  /.{3}/,
                                  '$&,'
                              )} - $${form.values.maxPrice.replace(
                                  /.{3}/,
                                  '$&,'
                              )}`}
                    </Button>
                </Menu.Target>
                <Menu.Dropdown>
                    <Text
                        color={!isMobile ? 'grey' : 'white'}
                        style={{
                            margin: '5px 0 5px 7px',
                            fontSize: '14px',
                        }}
                    >
                        Price Range
                    </Text>
                    <Flex direction="row" justify="space-evenly">
                        <NativeSelect
                            data={minPriceData}
                            label=""
                            name="minPrice"
                            style={{
                                width: '50%',
                            }}
                            {...form.getInputProps('minPrice')}
                        />
                        -
                        <NativeSelect
                            label=""
                            name="maxPrice"
                            style={{ width: '50%' }}
                            data={maxPriceData}
                            {...form.getInputProps('maxPrice')}
                        />
                    </Flex>
                </Menu.Dropdown>
            </Menu>
        </Flex>
    );

    const filterSelectForm = (
        <form
            onSubmit={form.onSubmit((values) => {
                if (values.propertyType.length === 0) {
                    Object.keys(values).forEach((key) => {
                        delete values.propertyType;
                        form.setValues((prev) => ({
                            propertyType: [],
                            ...prev,
                        }));
                    });
                }
                Object.keys(values).forEach((key) => {
                    if (values[key] === null || values[key] === '-') {
                        delete values[key];
                    }
                });
                setFilter(values);
                form.setValues({ ...defaultFormvalues, ...values });
                form.resetDirty({ ...defaultFormvalues, ...values });
                setOpenDrawer(false);
            })}
        >
            <Group>
                {!isMobile && PriceSelectMenuDesktop}
                {isMobile && (
                    <div style={{ marginTop: '-15px', width: '100%' }}>
                        <Text
                            color={!isMobile ? 'grey' : 'white'}
                            style={{
                                margin: '5px auto 5px 0px',
                                fontSize: '14px',
                            }}
                        >
                            Price Range
                        </Text>
                        <Flex direction="row" justify="space-evenly">
                            <NativeSelect
                                label=""
                                name="price1"
                                style={{
                                    width: '50%',
                                }}
                                data={minPriceData}
                                {...form.getInputProps('minPrice')}
                            />
                            {'-'}
                            <NativeSelect
                                label=""
                                name="price2"
                                style={{ width: '50%' }}
                                data={maxPriceData}
                                {...form.getInputProps('maxPrice')}
                            />
                        </Flex>
                    </div>
                )}

                <MultiSelect
                    clearable
                    label="Property Type"
                    name="propertyType"
                    maxSelectedValues={3}
                    data={propertyTypeData}
                    style={isMobile ? { width: '300px' } : { width: '300px' }}
                    {...form.getInputProps('propertyType')}
                />
                <NativeSelect
                    label="Rooms"
                    name="bedRooms"
                    data={['-', '1', '2', '3', '4', '5', '6', '7', '8']}
                    {...form.getInputProps('bedRooms')}
                />
                <NativeSelect
                    label="Baths"
                    name="baths"
                    data={['-', '1', '2', '3', '4', '5', '6', '7', '8']}
                    {...form.getInputProps('baths')}
                />
                <NativeSelect
                    label="City"
                    name="city"
                    data={cityData}
                    {...form.getInputProps('city')}
                />
                <Button
                    size="xs"
                    variant="outline"
                    color="red"
                    radius="lg"
                    type="submit"
                    style={{ width: '70px', marginTop: '23px' }}
                    disabled={disableSubmit}
                >
                    Submit
                </Button>
            </Group>
        </form>
    );

    return (
        <>
            <Drawer
                opened={openDrawer}
                onClose={() => setOpenDrawer(false)}
                title="WHomes Realty"
                position={'right'}
                padding="xl"
                overlayBlur={1}
                overlayOpacity={0.5}
                zIndex={999}
                styles={(theme) => ({
                    drawer: {
                        fontSize: '25px',
                        backgroundColor: '#1a1919f2',
                    },
                    header: {
                        marginTop: '55px',
                        color: 'white',
                        textDecoration: 'underline',
                    },
                })}
            >
                {filterSelectForm}
            </Drawer>
            {!isMobile ? (
                filterSelectForm
            ) : (
                <Button
                    variant="outline"
                    color="red"
                    radius={'lg'}
                    size={'sm'}
                    onClick={() => setOpenDrawer(true)}
                >
                    Filter
                </Button>
            )}
        </>
    );
}
