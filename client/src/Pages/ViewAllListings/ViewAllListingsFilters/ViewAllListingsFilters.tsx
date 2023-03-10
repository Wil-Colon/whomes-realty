import './ViewAllListingsFilters.scss';
import { Button, Group, NativeSelect } from '@mantine/core';
import { useForm } from '@mantine/form';

interface ViewAllListingsFilerProps {
    setFilter;
}
export default function ViewAllListingsFilter({
    setFilter,
}: ViewAllListingsFilerProps) {
    const form = useForm({
        initialValues: {
            propertyType: null,
            bedRooms: null,
        },
    });

    return (
        <form
            onSubmit={form.onSubmit((values) => {
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
                        .split(',')
                        .join('&')
                );
            })}
        >
            <Group>
                <NativeSelect
                    label="Property Type"
                    name="propertyType"
                    data={[
                        '-',
                        'Single Family Home',
                        'Multi family',
                        'Town Home',
                        'Condo',
                        'Ranch',
                        'Residential',
                        'Commercial',
                        'Industrial',
                        'Raw land',
                    ]}
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
