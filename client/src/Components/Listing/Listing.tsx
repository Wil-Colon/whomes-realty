import './listing.scss';
import {
    Grid,
    Card,
    Image,
    Text,
    Badge,
    Button,
    Group,
    Center,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useEffect, useState } from 'react';
import axios from 'axios';

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

    return (
        <>
            {!isLoading ? (
                listings?.map((list) => (
                    <Grid.Col
                        key={list._id}
                        sm={4}
                        xs={4}
                        style={{ maxWidth: '335px' }}
                    >
                        <Card shadow="sm" p="lg" radius="md" withBorder>
                            <Card.Section>
                                <Carousel
                                    sx={{ maxWidth: 320 }}
                                    mx="auto"
                                    withIndicators
                                    height={200}
                                >
                                    {list.image.map((img) => (
                                        <Carousel.Slide>
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
                                <Text weight={700}>{list.city}</Text>
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
                            <Center>
                                <Text weight={700} color={'darkgreen'}>
                                    ${list.price}
                                </Text>
                            </Center>

                            <Text size="sm" color="dimmed">
                                {list.description}
                            </Text>

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
                <p>Loading...</p>
            )}
        </>
    );
}
