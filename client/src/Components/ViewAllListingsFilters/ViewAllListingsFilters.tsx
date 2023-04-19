import './ViewAllListingsFilters.scss';
import {
    Button,
    Drawer,
    Group,
    MultiSelect,
    NativeSelect,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';

interface ViewAllListingsFilerProps {
    setFilter;
}
export default function ViewAllListingsFilter({
    setFilter,
}: ViewAllListingsFilerProps) {
    const [openDrawer, { toggle }] = useDisclosure(false);
    const [disableSubmit, setDisableSubmit] = useState(true);
    const isMobile = useMediaQuery('(max-width: 769px)');
    const form = useForm({
        initialValues: {
            propertyType: [] as any,
            bedRooms: '-' as any,
            baths: '-' as any,
            city: '-' as any,
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
                toggle();
            })}
        >
            <Group>
                <MultiSelect
                    clearable
                    label="Property Type"
                    name="propertyType"
                    maxSelectedValues={3}
                    data={propertyTypeData}
                    style={{ maxWidth: '300px' }}
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
                opened={isMobile ? openDrawer : false}
                onClose={toggle}
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
                    size={'xs'}
                    onClick={toggle}
                >
                    Filter
                </Button>
            )}
        </>
    );
}
