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
        { label: 'Single Family Home', value: 'Single Family Home' },
        { label: 'Multi family', value: 'Multi family' },
        { label: 'Town Home', value: 'Town Home' },
        { label: 'Condo', value: 'Condo' },
        { label: 'Ranch', value: 'Ranch' },
        { label: 'Residential', value: 'Residential' },
        { label: 'Commercial', value: 'Commercial' },
        { label: 'Industrial', value: 'Industrial' },
        { label: 'Raw land', value: 'Raw land' },
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
                setFilter(
                    JSON.stringify(values)
                        .replace(/:\s*/g, '=')
                        .replace(/['"]+/g, '')
                        .replace(/[{}]/g, '')
                        .replace(/[[\]']+/g, '')
                        .replace(/:/g, '')
                        .split(',')
                        .join('&')
                );
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
                    label="Bed Rooms"
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
                    style={{ width: '70px' }}
                >
                    Submit
                </Button>
            </Group>
        </form>
    );
}
