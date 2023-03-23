import { Button, Drawer, Group, Image, Text } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconPhone } from '@tabler/icons';
import { Link } from 'react-router-dom';
import ViewAllListingsFilter from '../ViewAllListingsFilters/ViewAllListingsFilters';

interface ViewListingHeaderProps {
    setFilter;
}
export default function ViewListingHeader({
    setFilter,
}: ViewListingHeaderProps) {
    const isMobile = useMediaQuery('(max-width: 769px)');
    const [opened, { toggle }] = useDisclosure(false);

    return (
        <>
            <div
                style={{ position: 'relative', height: '80px', zIndex: '1000' }}
            >
                <div
                    style={{
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        borderBottom: '1px solid #b9b9b9',
                        padding: '5px 0 5px 0',
                        marginBottom: '25px',
                        backgroundColor: '#1f1f1ff2',
                        width: '100vw',
                    }}
                >
                    <Group
                        position="apart"
                        style={{
                            maxWidth: '95%',
                            margin: 'auto',
                            paddingRight: '10px',
                        }}
                    >
                        <Link to="/">
                            <Image
                                src={require('../../../assets/images/logo2.png')}
                                alt="company logo"
                                width={60}
                                height={60}
                            />
                        </Link>
                        <Group spacing={5}>
                            <IconPhone style={{ color: 'white' }} />
                            <a
                                href="4019435800"
                                style={{ textDecoration: 'none' }}
                            >
                                <Text sx={{ color: 'white' }}>
                                    401-943-5800
                                </Text>{' '}
                            </a>
                        </Group>
                    </Group>
                </div>
            </div>

            <Drawer
                opened={!isMobile ? false : opened}
                onClose={toggle}
                title="WHomes Realty"
                position={'right'}
                padding="xl"
                overlayBlur={1}
                overlayOpacity={0.5}
                zIndex={999}
                styles={(theme) => ({
                    drawer: {
                        fontSize: '25px',
                        backgroundColor: '#1a1919f2',
                    },
                    header: {
                        marginTop: '55px',
                        color: 'white',
                        textDecoration: 'underline',
                    },
                })}
            >
                <ViewAllListingsFilter setFilter={setFilter} />
            </Drawer>

            <Group
                position="right"
                style={{
                    maxWidth: '95%',
                    margin: 'auto',
                    marginBottom: '15px',
                }}
            >
                {!isMobile ? (
                    <ViewAllListingsFilter setFilter={setFilter} />
                ) : (
                    <Button
                        variant="outline"
                        color="red"
                        radius={'lg'}
                        size={'sm'}
                        onClick={toggle}
                    >
                        Filter
                    </Button>
                )}
            </Group>
        </>
    );
}
