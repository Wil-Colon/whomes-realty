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
    Text,
    useMantineTheme,
    Image,
    LoadingOverlay,
    UnstyledButton,
} from '@mantine/core';
import {
    Dropzone,
    DropzoneProps,
    IMAGE_MIME_TYPE,
    FileWithPath,
} from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { IconEraser, IconPhoto, IconUpload, IconX } from '@tabler/icons';
import { useContext, useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { showNotification } from '@mantine/notifications';
import { createListing } from '../../context/ListingContext/apiCalls';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { ListingContext } from '../../context/ListingContext/ListingContext';
import storage from '../../firebase';

interface CreateListingModalProps {
    open: boolean;
    onClose: any;
    setOpened: any;
}

const useStyles = createStyles((theme) => ({
    comment: {
        padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
        position: 'relative',
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

export default function CreateListingModal(
    { open, onClose, setOpened }: CreateListingModalProps,
    props: Partial<DropzoneProps>
) {
    const isMobile = useMediaQuery('(max-width: 600px)');
    const theme = useMantineTheme();
    const { classes } = useStyles();
    const { user } = useContext(AuthContext);
    const { dispatch } = useContext(ListingContext);
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [formData, setFormData] = useState({ featuredListing: false }) as any;
    const [files, setFiles] = useState<FileWithPath[]>([]) as any;

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
                    : /^[0-9,.]*$/.test(value) === false
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
                    ? 'Please enter a valid number of bedrooms'
                    : null,
            baths: (value) =>
                /[a-z]/i.test(value) === true
                    ? 'Baths should contain only numbers'
                    : value.length < 1
                    ? 'Please enter bathroom amount'
                    : null,
            squareFootage: (value) =>
                /[a-z]/i.test(value) === true
                    ? 'State should contain no letters'
                    : null,
        },
    });

    const previews = files.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);

        return (
            <div key={index} style={{ position: 'relative' }}>
                <span
                    style={{
                        color: 'red',
                        position: 'absolute',
                        top: '0',
                        left: '15px',
                        zIndex: 1,
                        fontSize: '35px',
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        setFiles(
                            files.filter(
                                (item) => files.indexOf(item) !== index
                            )
                        );
                    }}
                >
                    x
                </span>
                <Image
                    src={imageUrl}
                    imageProps={{
                        onLoad: () => URL.revokeObjectURL(imageUrl),
                    }}
                />
            </div>
        );
    });

    const handleChange = (e) => {
        let target = e.target.name;
        let value = e.target.value;
        setFormData({ ...formData, [target]: value });
    };

    const closeModal = () => {
        setTimeout(() => {
            setOverlayVisible(false);
            showNotification({
                title: 'Success!',
                message: 'New Listing has been Created!',
            });
            form.reset();
            setFiles([]);
            setFormData({ featuredListing: false });
            setOpened(false);
        }, 400);
    };

    const uploadToDB = (listingData) => {
        createListing(dispatch, user.accessToken, listingData);
    };

    const firebaseUpload = (values) => {
        let imageUrl = [] as any;
        let progress;
        setOverlayVisible(true);

        if (files.length === 0) {
            uploadToDB({
                ...values,
                image: [],
            });
            closeModal();
        } else {
            files.forEach((file, i) => {
                const fileName = file.name;
                const itemsRef = ref(
                    storage,
                    `images/${values.address}/${fileName}`
                );
                const uploadTask = uploadBytesResumable(itemsRef, file);
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100;
                    },
                    (err) => {
                        setOverlayVisible(false);
                        showNotification({
                            color: 'red',
                            title: 'Error!',
                            message: 'There appears to be an error somewhere.',
                        });
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                            imageUrl.push(url);

                            if (
                                imageUrl.length === files.length &&
                                progress >= 100
                            ) {
                                uploadToDB({
                                    ...values,
                                    image: imageUrl,
                                });
                                closeModal();
                            }
                        });
                    }
                );
            });
        }
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
            title="Create New Listing"
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
                    height: isMobile ? '100%' : '90vh',
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
            <UnstyledButton
                title="Erase and Start over?"
                onClick={() => {
                    form.reset();
                    setFiles([]);
                    setFormData({ featuredListing: false });
                }}
            >
                <IconEraser size={28} /> <Text size={15}>Erase</Text>
            </UnstyledButton>
            <Paper withBorder radius="md" className={classes.comment}>
                <LoadingOverlay
                    visible={overlayVisible}
                    transitionDuration={500}
                />
                <form
                    onSubmit={form.onSubmit(
                        (values) => {
                            firebaseUpload(values);
                        },
                        (validationErrors, _values, _event) => {
                            showNotification({
                                color: 'red',
                                title: 'Form error:',
                                message: Object.keys(validationErrors)
                                    .join(', ')
                                    .toLowerCase(),
                            });
                        }
                    )}
                >
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

                    <Dropzone
                        onDrop={(item) => {
                            setFiles([...files, ...item]);
                        }}
                        onReject={(files) =>
                            showNotification({
                                color: 'red',
                                title: 'Error!',
                                message: 'Some files could not be added.',
                            })
                        }
                        maxFiles={10}
                        maxSize={3 * 1024 ** 2}
                        accept={IMAGE_MIME_TYPE}
                        {...props}
                    >
                        <Group
                            position="center"
                            spacing="xl"
                            style={{
                                minHeight: 220,
                                pointerEvents: 'none',
                            }}
                        >
                            <Dropzone.Accept>
                                <IconUpload
                                    size={50}
                                    stroke={1.5}
                                    color={
                                        theme.colors[theme.primaryColor][
                                            theme.colorScheme === 'dark' ? 4 : 6
                                        ]
                                    }
                                />
                            </Dropzone.Accept>
                            <Dropzone.Reject>
                                <IconX
                                    size={50}
                                    stroke={1.5}
                                    color={
                                        theme.colors.red[
                                            theme.colorScheme === 'dark' ? 4 : 6
                                        ]
                                    }
                                />
                            </Dropzone.Reject>
                            <Dropzone.Idle>
                                <IconPhoto size={50} stroke={1.5} />
                            </Dropzone.Idle>

                            <div>
                                <Text size="xl" inline>
                                    Drag images here or click to select files
                                </Text>
                                <Text size="sm" color="dimmed" inline mt={7}>
                                    Attach up to 10 files, each file should not
                                    exceed 5mb
                                </Text>
                            </div>
                        </Group>
                    </Dropzone>
                    <SimpleGrid
                        cols={4}
                        breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
                        mt={previews.length > 0 ? 'xl' : 0}
                    >
                        {previews}
                    </SimpleGrid>

                    <Group position="right" mt="md">
                        <Button type="submit">Submit</Button>
                    </Group>
                </form>
            </Paper>
        </Drawer>
    );
}
