import {
    createStyles,
    Drawer,
    Paper,
    SimpleGrid,
    TextInput,
    MultiSelect,
    Textarea,
    Switch,
    Group,
    Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { useState } from 'react';

interface CreateListingModalProps {
    open: boolean;
    onClose: any;
    setOpened: any;
}

const useStyles = createStyles((theme) => ({
    comment: {
        padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
    },

    body: {
        paddingTop: theme.spacing.sm,
        fontSize: theme.fontSizes.sm,
    },

    content: {
        '& > p:last-child': {
            marginBottom: 0,
        },
    },
}));

const data = [
    { value: 'Single Family Home', label: 'Single Family Home' },
    { value: 'Town Home', label: 'Town Home' },
    { value: 'Condo', label: 'Condo' },
    { value: 'Ranch', label: 'Ranch' },
    { value: 'Residential', label: 'Residential' },
    { value: 'Commercial', label: 'Commercial' },
    { value: 'Industrial', label: 'Industrial' },
    { value: 'Raw land', label: 'Raw land' },
];

export default function CreateListingModal({
    open,
    onClose,
}: CreateListingModalProps) {
    const isMobile = useMediaQuery('(max-width: 600px)');
    const { classes } = useStyles();
    const [formData, setFormData] = useState({ featuredListing: false }) as any;

    const form = useForm({
        initialValues: {
            price: '',
            neighborhood: '',
            address: '',
            city: '',
            state: '',
            zipcode: '',
            county: '',
            bedRooms: '',
            baths: '',
            squareFootage: '',
            yearBuilt: '',
            cooling: '',
            propertyType: [],
            description: '',
            featuredListing: false,
        },
        validate: {
            price: (value) =>
                value.length < 6
                    ? 'Invalid Price'
                    : /^[0-9]+$/.test(value) === false
                    ? 'Price should contain only numbers'
                    : null,
            address: (value) =>
                /\d/.test(value) === false
                    ? 'Missing Address Number'
                    : /[a-z]/i.test(value) === false
                    ? 'Missing Street name'
                    : null,
            city: (value) =>
                /\d/.test(value) === true
                    ? 'City should contain no numbers'
                    : value.length < 3
                    ? 'Please enter valid City'
                    : null,
            state: (value) =>
                /\d/.test(value) === true
                    ? 'State should contain no numbers'
                    : value.length < 2 || value.length > 2
                    ? 'Please enter valid State'
                    : null,
            zipcode: (value) =>
                /[a-z]/i.test(value) === true
                    ? 'Zipcode should contain no letters'
                    : value.length < 5
                    ? 'Please enter a valid Zipcode'
                    : null,
            bedRooms: (value) =>
                /[a-z]/i.test(value) === true
                    ? 'Bedrooms should contain only numbers'
                    : value.length < 1
                    ? 'Please Enter bedrooms amount'
                    : null,
            baths: (value) =>
                /[a-z]/i.test(value) === true
                    ? 'Baths should contain only numbers'
                    : value.length < 1
                    ? 'Please Enter bathroom amount'
                    : null,
            squareFootage: (value) =>
                /[a-z]/i.test(value) === true
                    ? 'State should contain no letters'
                    : null,
        },
    });

    const handleChange = (e) => {
        let target = e.target.name;
        let value = e.target.value;
        setFormData({ ...formData, [target]: value });
    };

    return (
        <Drawer
            closeOnClickOutside={false}
            opened={open}
            onClose={() => onClose(false)}
            padding="xl"
            position="top"
            overlayColor="#151414"
            transition="slide-up"
            overlayOpacity={0.2}
            title="New Listing"
            styles={(theme) => ({
                title: {
                    color: 'rgba(17,65,97,0.81)',
                    fontWeight: 600,
                    fontSize: '20px',
                },
                closeButton: {
                    color: 'red',
                    '&:hover': {
                        backgroundColor: 'grey',
                    },
                },
                drawer: {
                    borderRadius: '5px',
                    margin: 'auto',
                    height: 'auto',
                    marginBottom: '10px',
                    width: isMobile ? '100%' : '75%',
                    msOverflowStyle: 'none',
                    scrollbarwidth: 'none',
                    overflow: 'scroll',
                    scrollbarWidth: 'none',
                    top: isMobile ? '0px' : '50px',
                    borderTop: '6px solid rgba(17,65,97,0.81)',
                },
            })}
        >
            <Paper withBorder radius="md" className={classes.comment}>
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <SimpleGrid cols={1} style={{ marginBottom: '20px' }}>
                        <Switch
                            onLabel="Yes"
                            offLabel="No"
                            size="lg"
                            label="Feature listing on home page?"
                            color="indigo"
                            checked={formData.featuredListing}
                            onClick={() =>
                                setFormData({
                                    ...formData,
                                    featuredListing: !formData.featuredListing,
                                })
                            }
                            {...form.getInputProps('featuredListing')}
                        />
                    </SimpleGrid>
                    <SimpleGrid
                        cols={3}
                        breakpoints={[
                            { maxWidth: 1150, cols: 2, spacing: 'sm' },
                            { maxWidth: 850, cols: 1, spacing: 'sm' },
                        ]}
                    >
                        <TextInput
                            name="price"
                            placeholder="$"
                            label="Price"
                            withAsterisk
                            size="md"
                            min={7}
                            max={12}
                            value={formData.price}
                            onChange={(e) => handleChange(e)}
                            {...form.getInputProps('price')}
                        />

                        <TextInput
                            name="address"
                            placeholder="Street Address"
                            label="Address"
                            withAsterisk
                            size="md"
                            value={formData.address}
                            onChange={(e) => handleChange(e)}
                            {...form.getInputProps('address')}
                        />
                        <TextInput
                            name="city"
                            size="md"
                            placeholder="City"
                            label="City"
                            value={formData.city}
                            withAsterisk
                            onChange={(e) => handleChange(e)}
                            {...form.getInputProps('city')}
                        />
                        <TextInput
                            name="state"
                            size="md"
                            placeholder="RI"
                            label="State"
                            value={formData.state}
                            withAsterisk
                            onChange={(e) => handleChange(e)}
                            {...form.getInputProps('state')}
                        />
                        <TextInput
                            name="zipcode"
                            size="md"
                            placeholder="Zipcode"
                            label="Zipcode"
                            value={formData.zipcode}
                            withAsterisk
                            onChange={(e) => handleChange(e)}
                            {...form.getInputProps('zipcode')}
                        />

                        <TextInput
                            name="bedRooms"
                            size="md"
                            placeholder="Bedrooms"
                            label="Bedrooms"
                            withAsterisk
                            value={formData.bedRooms}
                            onChange={(e) => handleChange(e)}
                            {...form.getInputProps('bedRooms')}
                        />
                        <TextInput
                            name="baths"
                            size="md"
                            placeholder="Baths"
                            label="Baths"
                            withAsterisk
                            value={formData.baths}
                            onChange={(e) => handleChange(e)}
                            {...form.getInputProps('baths')}
                        />
                        <TextInput
                            name="squareFootage"
                            size="md"
                            placeholder="Square Footage"
                            label="Square Footage"
                            value={formData.squareFootage}
                            onChange={(e) => handleChange(e)}
                            {...form.getInputProps('squareFootage')}
                        />
                        <TextInput
                            name="yearBuilt"
                            size="md"
                            placeholder="Year Built"
                            label="Year Built"
                            value={formData.yearBuilt}
                            onChange={(e) => handleChange(e)}
                            {...form.getInputProps('yearBuilt')}
                        />
                        <TextInput
                            name="county"
                            size="md"
                            placeholder="County"
                            label="County"
                            value={formData.county}
                            onChange={(e) => handleChange(e)}
                            {...form.getInputProps('county')}
                        />
                        <TextInput
                            name="neighborhood"
                            placeholder="Neighborhood"
                            label="Neighborhood"
                            size="md"
                            value={formData.neighborhood}
                            onChange={(e) => handleChange(e)}
                            {...form.getInputProps('neighborhood')}
                        />
                        <TextInput
                            name="cooling"
                            size="md"
                            placeholder="cooling"
                            label="Cooling"
                            value={formData.cooling}
                            onChange={(e) => handleChange(e)}
                            {...form.getInputProps('cooling')}
                        />
                        <MultiSelect
                            name="propertyType"
                            data={data}
                            label="Propery Type"
                            placeholder="Pick all that apply"
                            transition="scale-y"
                            transitionDuration={150}
                            size="md"
                            {...form.getInputProps('propertyType')}
                            clearable
                        />
                    </SimpleGrid>
                    <SimpleGrid
                        cols={1}
                        style={{ margin: '10px 0px 10px 0px' }}
                    >
                        <Textarea
                            name="description"
                            placeholder="Description of Home"
                            label="Description"
                            radius="md"
                            size="md"
                            minRows={4}
                            value={formData.description}
                            onChange={(e) => handleChange(e)}
                            {...form.getInputProps('description')}
                        />
                    </SimpleGrid>
                    <Group position="right" mt="md">
                        <Button type="submit">Submit</Button>
                    </Group>
                </form>
            </Paper>
        </Drawer>
    );
}

// Start adding images, firebase start
