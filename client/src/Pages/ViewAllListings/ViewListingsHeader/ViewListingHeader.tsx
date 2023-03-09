import {
    Burger,
    Button,
    Drawer,
    Group,
    Image,
    NativeSelect,
    Text,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconPhone } from '@tabler/icons';
import { useState } from 'react';

interface ViewListingHeaderProps {
    setFilter;
}
export default function ViewListingHeader({
    setFilter,
}: ViewListingHeaderProps) {
    const isMobile = useMediaQuery('(max-width: 769px)');
    const [opened, { toggle }] = useDisclosure(false);

    const [value, setValue] = useState('');

    return (
        <>
            <div
                style={{ position: 'relative', height: '80px', zIndex: '9999' }}
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
                        <Image
                            src={require('../../../assets/images/logo2.png')}
                            alt="company logo"
                            width={60}
                            height={60}
                        />
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
                position={'right'}
                padding="xl"
                overlayBlur={1}
                overlayOpacity={0.2}
            >
                <NativeSelect
                    data={[
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
                    onChange={(event) => setValue(event.currentTarget.value)}
                    label="Property Type"
                    description="This is anonymous"
                    withAsterisk
                    value={value}
                />
                <Button>All Beds</Button>{' '}
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
                    <>
                        {' '}
                        <NativeSelect
                            placeholder="Select Property Type"
                            data={[
                                'None',
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
                            label="Property Type"
                            onChange={(event) =>
                                setFilter(event.currentTarget.value)
                            }
                            value={value}
                        />
                        <Button>All Beds</Button>{' '}
                    </>
                ) : (
                    <Burger size={'sm'} opened={opened} onClick={toggle} />
                )}
            </Group>
        </>
    );
}
