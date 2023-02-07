import { useDisclosure, useCounter } from '@mantine/hooks';
import { Modal, Button, Group, Text, Badge } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export default function ListingDetailsModal() {
    const [opened, { close, open }] = useDisclosure(false);
    const [count, { increment, decrement }] = useCounter(3, { min: 0 });
    const navigate = useNavigate();

    const badges = Array(count)
        .fill(0)
        .map((_, index) => <Badge key={index}>Badge {index}</Badge>);

    return (
        <>
            <Modal
                opened={true}
                onClose={() => navigate(-1)}
                size="auto"
                title="Modal size auto"
            >
                <Text>Modal with size auto will fits its content</Text>

                <Group noWrap mt="md">
                    {badges}
                </Group>

                <Group mt="xl">
                    <Button variant="outline" onClick={increment}>
                        Add badge
                    </Button>
                    <Button variant="outline" onClick={decrement}>
                        Remove badge
                    </Button>
                </Group>
            </Modal>
            <Group position="center">
                <Button onClick={open}>Open modal</Button>
            </Group>
        </>
    );
}
