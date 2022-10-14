import './listing.scss';
import axios from 'axios';
import {
    Grid,
    Card,
    Image,
    Text,
    Badge,
    Button,
    Group,
    Loader,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useEffect, useState } from 'react';
import { IconBath, IconBed, IconDimensions } from '@tabler/icons';

export default function Listing() {
    const [listings, setListings] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getListings = async () => {
            try {
                const res = await axios.get(
                    'http://localhost:5000/api/listing'
                );
                setIsLoading(false);
                setListings(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getListings();
    }, []);
    console.log(listings);

    return (
        <>
            {!isLoading ? (
                listings?.map((list) => (
                    <Grid.Col
                        key={list._id}
                        sm={4}
                        xs={4}
                        style={{ maxWidth: '335px', minWidth: '270px' }}
                    >
                        <Card shadow="sm" p="lg" radius="md" withBorder>
                            <Card.Section>
                                <Carousel
                                    sx={{ maxWidth: 320 }}
                                    mx="auto"
                                    withIndicators
                                    height={200}
                                >
                                    {list?.image?.map((img, i) => (
                                        <Carousel.Slide key={i}>
                                            <Image
                                                src={img}
                                                height={160}
                                                alt="home picture"
                                            />
                                        </Carousel.Slide>
                                    ))}
                                </Carousel>
                            </Card.Section>

                            <Group position="apart" mt="md" mb="xs">
                                <Text weight={700}>{list?.city}</Text>
                                <Badge
                                    color="pink"
                                    variant="gradient"
                                    gradient={{
                                        from: 'indigo',
                                        to: 'gray',
                                    }}
                                >
                                    On Sale
                                </Badge>
                            </Group>

                            <Text weight={700} color={'blue'}>
                                ${list?.price}
                            </Text>

                            <Text size="sm" color="dimmed">
                                {list?.description}
                            </Text>
                            <Group spacing="xs" sx={{ marginTop: '10px' }}>
                                <IconBath size={'20px'} />
                                {list?.baths}
                                <IconBed size={'20px'} />
                                {list?.bedRooms}
                                <IconDimensions size={'20px'} />
                                {list?.squareFootage}ft
                                <sup style={{ marginLeft: '-7px' }}>2</sup>
                            </Group>

                            <Button
                                variant="light"
                                color="blue"
                                fullWidth
                                mt="md"
                                radius="md"
                            >
                                More Info
                            </Button>
                        </Card>
                    </Grid.Col>
                ))
            ) : (
                <Loader />
            )}
        </>
    );
}
