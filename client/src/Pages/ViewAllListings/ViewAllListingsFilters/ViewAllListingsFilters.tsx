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

    return (
        <form
            onSubmit={form.onSubmit((values) => {
                Object.keys(values).forEach((key) => {
                    if (
                        values[key] === null ||
                        values[key] === '-' ||
                        (values.propertyType &&
                            values.propertyType.length === 0)
                    ) {
                        form.setValues((prev) => ({
                            propertyType: [],
                            ...prev,
                        }));
                        delete values[key];
                    }
                });
                setFilter(
                    JSON.stringify(values)
                        .replace(/:\s*/g, '=')
                        .replace(/['"]+/g, '')
                        .replace(/[{}]/g, '')
                        .replace(/[[\]']+/g, '')
                        .split(',')
                        .join('&')
                );
            })}
        >
            <Group>
                <MultiSelect
                    onSearchChange={() => console.log(form.values)}
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
