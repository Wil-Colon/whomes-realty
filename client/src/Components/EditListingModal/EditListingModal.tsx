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
    NativeSelect,
} from '@mantine/core';
import {
    Dropzone,
    DropzoneProps,
    IMAGE_MIME_TYPE,
    FileWithPath,
} from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons';
import { useContext, useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { showNotification } from '@mantine/notifications';
import {
    getSingleListing,
    updateListing,
} from '../../context/ListingContext/apiCalls';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { ListingContext } from '../../context/ListingContext/ListingContext';
import storage from '../../firebase';

interface EditListingModalProps {
    open: boolean;
    onClose: any;
    setOpened: any;
    listingData: any;
    setListingData: any;
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
    { value: 'Multi family', label: 'Multi family' },
    { value: 'Town Home', label: 'Town Home' },
    { value: 'Condo', label: 'Condo' },
    { value: 'Ranch', label: 'Ranch' },
    { value: 'Residential', label: 'Residential' },
    { value: 'Commercial', label: 'Commercial' },
    { value: 'Industrial', label: 'Industrial' },
    { value: 'Raw land', label: 'Raw land' },
];

export default function EditListingModal(
    {
        open,
        onClose,
        setOpened,
        listingData,
        setListingData,
    }: EditListingModalProps,
    props: Partial<DropzoneProps>
) {
    const isMobile = useMediaQuery('(max-width: 600px)');
    const theme = useMantineTheme();
    const { classes } = useStyles();
    const { user } = useContext(AuthContext);
    const { dispatch } = useContext(ListingContext);
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [formData, setFormData] = useState({
        ...listingData,
        featuredListing: JSON.parse(listingData.featuredListing),
        status: listingData.status,
    }) as any;
    const [files, setFiles] = useState<FileWithPath[]>([]) as any;
    const [currentImages, setCurrentImages] = useState([]);
    const {
        _id,
        address,
        status,
        baths,
        bedRooms,
        city,
        cooling,
        county,
        description,
        featuredListing,
        neighborhood,
        price,
        propertyType,
        squareFootage,
        state,
        yearBuilt,
        zipcode,
        parking,
        appliances,
        bathFeatures,
        basement,
        hoaFee,
    } = formData;

    useEffect(() => {
        const getListing = async () => {
            const res = await getSingleListing(_id);
            setCurrentImages(res.image);
        };
        getListing();
    }, [user.accessToken, _id]);

    const form = useForm({
        initialValues: {
            price: price,
            neighborhood: neighborhood,
            address: address,
            city: city,
            state: state,
            zipcode: zipcode,
            county: county,
            bedRooms: bedRooms,
            baths: baths,
            squareFootage: squareFootage,
            yearBuilt: yearBuilt,
            cooling: cooling,
            propertyType: propertyType,
            description: description,
            status: status,
            featuredListing: featuredListing,
            parking: parking,
            appliances: appliances,
            bathFeatures: bathFeatures,
            basement: basement,
            hoaFee: hoaFee,
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

    const newPreviews = files.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return (
            <div
                key={index}
                style={{ position: 'relative', marginTop: '25px' }}
            >
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

    const currentImagePreviews = currentImages.map((file, i) => {
        return (
            <div key={i} style={{ position: 'relative', marginTop: '25px' }}>
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
                        setCurrentImages(
                            currentImages.filter(
                                (item) => currentImages.indexOf(item) !== i
                            )
                        );
                    }}
                >
                    x
                </span>
                <Image src={file} />
            </div>
        );
    });

    const closeModal = () => {
        setTimeout(() => {
            setOverlayVisible(false);
            showNotification({
                title: 'Success!',
                message: 'Listing has been edited!',
            });
            form.reset();
            setFiles([]);
            setFormData({ featuredListing: false });
            setOpened(false);
        }, 400);
    };

    const uploadToDB = (editedListingData) => {
        updateListing(dispatch, user.accessToken, _id, editedListingData);
        closeModal();
    };

    const firebaseUpload = (values) => {
        let imageUrl = [] as any;
        let progress;
        setOverlayVisible(true);

        if (files.length === 0) {
            uploadToDB({
                ...values,
                image: currentImages,
            });
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

                            if (imageUrl.length === files.length) {
                                currentImages.length > 0 &&
                                    imageUrl.push(...currentImages);
                                setTimeout(() => {
                                    uploadToDB({
                                        ...values,
                                        image: imageUrl,
                                    });
                                }, 200);
                            }
                        });
                    }
                );
            });
        }
    };

    return listingData === null ? (
        <LoadingOverlay visible={true} />
    ) : (
        <Drawer
            closeOnClickOutside={false}
            opened={open}
            onClose={() => {
                onClose(false);
                setTimeout(() => {
                    setListingData(null);
                }, 100);
            }}
            padding="xl"
            position="top"
            overlayColor="#151414"
            transition="slide-up"
            overlayOpacity={0.2}
            title={`Edit: ${address}`}
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
                            {...form.getInputProps('price')}
                        />

                        <TextInput
                            name="address"
                            placeholder="Street Address"
                            label="Address"
                            withAsterisk
                            size="md"
                            {...form.getInputProps('address')}
                        />
                        <TextInput
                            name="city"
                            size="md"
                            placeholder="City"
                            label="City"
                            withAsterisk
                            {...form.getInputProps('city')}
                        />
                        <TextInput
                            name="state"
                            size="md"
                            placeholder="RI"
                            label="State"
                            withAsterisk
                            {...form.getInputProps('state')}
                        />
                        <TextInput
                            name="zipcode"
                            size="md"
                            placeholder="Zipcode"
                            label="Zipcode"
                            withAsterisk
                            {...form.getInputProps('zipcode')}
                        />

                        <TextInput
                            name="bedRooms"
                            size="md"
                            placeholder="Bedrooms"
                            label="Bedrooms"
                            withAsterisk
                            {...form.getInputProps('bedRooms')}
                        />
                        <TextInput
                            name="baths"
                            size="md"
                            placeholder="Baths"
                            label="Baths"
                            withAsterisk
                            {...form.getInputProps('baths')}
                        />
                        <TextInput
                            name="bathFeatures"
                            size="md"
                            placeholder="Bath Features? Jacuzzi, Tub, Shower Stall"
                            label="Bath Features"
                            {...form.getInputProps('bathFeatures')}
                        />
                        <TextInput
                            name="squareFootage"
                            size="md"
                            placeholder="Square Footage"
                            label="Square Footage"
                            {...form.getInputProps('squareFootage')}
                        />
                        <TextInput
                            name="yearBuilt"
                            size="md"
                            placeholder="Year Built"
                            label="Year Built"
                            {...form.getInputProps('yearBuilt')}
                        />
                        <TextInput
                            name="county"
                            size="md"
                            placeholder="County"
                            label="County"
                            {...form.getInputProps('county')}
                        />
                        <TextInput
                            name="neighborhood"
                            placeholder="Neighborhood"
                            label="Neighborhood"
                            size="md"
                            {...form.getInputProps('neighborhood')}
                        />
                        <TextInput
                            name="cooling"
                            size="md"
                            placeholder="Electric, Baseboard, Central?"
                            label="Cooling"
                            {...form.getInputProps('cooling')}
                        />
                        <TextInput
                            name="parking"
                            size="md"
                            placeholder="parking spaces"
                            label="Parking"
                            {...form.getInputProps('parking')}
                        />
                        <TextInput
                            name="appliances"
                            size="md"
                            placeholder="Dishwasher, Washing machine, Dryer, etc"
                            label="Appliance"
                            {...form.getInputProps('appliances')}
                        />
                        <TextInput
                            name="basement"
                            size="md"
                            placeholder="Yes/No, basement built?"
                            label="Basement"
                            {...form.getInputProps('basement')}
                        />
                        <MultiSelect
                            name="propertyType"
                            data={data}
                            label="Property Type"
                            placeholder="Pick all that apply"
                            transition="scale-y"
                            transitionDuration={150}
                            size="md"
                            {...form.getInputProps('propertyType')}
                            clearable
                        />
                        <TextInput
                            name="hoaFee"
                            size="md"
                            placeholder="HOA fee? ex: $200/m"
                            label="Hoa Fee?"
                            {...form.getInputProps('hoaFee')}
                        />
                        <NativeSelect
                            name="status"
                            data={[
                                'Active',
                                'Closed',
                                'Under Contract',
                                'Deal Pending',
                            ]}
                            label="Listing Status"
                            size="md"
                            {...form.getInputProps('status')}
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
                        maxSize={3 * 1024 ** 2}
                        accept={IMAGE_MIME_TYPE}
                        maxFiles={10}
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
                        mt={newPreviews.length > 0 ? 'xl' : 0}
                    >
                        {currentImagePreviews}
                        {newPreviews}
                    </SimpleGrid>

                    <Group position="right" mt="md">
                        <Button type="submit">Submit</Button>
                    </Group>
                </form>
            </Paper>
        </Drawer>
    );
}
