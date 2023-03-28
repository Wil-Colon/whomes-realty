import './ViewAllListingsFilters.scss';
import { Button, Group, MultiSelect, NativeSelect } from '@mantine/core';
import { useForm } from '@mantine/form';

interface ViewAllListingsFilerProps {
    setFilter;
}
export default function ViewAllListingsFilter({
    setFilter,
}: ViewAllListingsFilerProps) {
    const form = useForm({
        initialValues: {
            propertyType: [] as any,
            bedRooms: null,
            baths: null,
            city: null,
        },
    });

    const data = [
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

    return (
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
            })}
        >
            <Group>
                <MultiSelect
                    clearable
                    label="Property Type"
                    name="propertyType"
                    maxSelectedValues={3}
                    data={data}
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
                >
                    Submit
                </Button>
            </Group>
        </form>
    );
}
