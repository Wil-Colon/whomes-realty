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
import { IconBath, IconBed, IconDimensions } from '@tabler/icons';

export default function Listing({ list }) {
    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + '...' : str;
    };
    return (
        <Grid.Col
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
                        {list.image.length > 0 ? (
                            list?.image?.map((img, i) => (
                                <Carousel.Slide key={i}>
                                    <Image
                                        src={img}
                                        height={160}
                                        alt="home picture"
                                    />
                                </Carousel.Slide>
                            ))
                        ) : (
                            <Center
                                style={{
                                    backgroundColor: 'grey',
                                    width: '100%',
                                    position: 'relative',
                                    color: 'lightgray',
                                    fontSize: '30px',
                                    fontFamily: 'Andale Mono',
                                }}
                            >
                                No Preview
                            </Center>
                        )}
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

                <Text
                    size="sm"
                    color="dimmed"
                    sx={{ width: '280px', height: '60px' }}
                >
                    {truncate(list?.description, 100)}
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
    );
}
