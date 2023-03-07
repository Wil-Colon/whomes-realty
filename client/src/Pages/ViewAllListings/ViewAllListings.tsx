import { Button, Group, Image, Text } from '@mantine/core';
import { IconPhone } from '@tabler/icons';

export default function ViewAllListings() {
    const filters = {};
    return (
        <div>
            <div
                style={{
                    position: 'sticky',
                    borderBottom: '1px solid #b9b9b9',
                }}
            >
                <Group
                    position="apart"
                    style={{ maxWidth: '95%', margin: 'auto' }}
                >
                    <Image
                        src={require('../../assets/images/logo1.png')}
                        alt="company logo"
                        width={60}
                        height={60}
                    />
                    <Group spacing={5}>
                        <IconPhone style={{ color: 'black' }} />
                        <a href="4019435800" style={{ textDecoration: 'none' }}>
                            <Text sx={{ color: 'black' }}>401-943-5800</Text>{' '}
                        </a>
                    </Group>
                </Group>
            </div>
            <Group style={{ maxWidth: '95%', margin: 'auto' }}>
                <Button>Home Type</Button>
                <Button>All Beds</Button>
            </Group>
        </div>
    );
}
