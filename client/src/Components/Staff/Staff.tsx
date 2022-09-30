import { Center, Text, Grid, Image, Card } from '@mantine/core';

export default function Staff() {
    return (
        <div
            style={{
                width: '100%',
                height: 'auto',
                backgroundColor: '#33404c',
                padding: '20px 10px 40px 10px',
            }}
        >
            <Center>
                <Text sx={{ fontSize: '30px' }}>OUR REALSTATE AGENTS</Text>
            </Center>
            <Grid justify="center">
                <Grid.Col lg={24} style={{ maxWidth: '335px' }}>
                    <Card
                        shadow="sm"
                        p="xl"
                        component="a"
                        href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                        target="_blank"
                    >
                        <Card.Section>
                            <Image
                                src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                                height={160}
                                alt="No way!"
                            />
                        </Card.Section>

                        <Text weight={500} size="lg" mt="md">
                            You&apos;ve won a million dollars in cash!
                        </Text>

                        <Text mt="xs" color="dimmed" size="sm">
                            Please click anywhere on this card to claim your
                            reward, this is not a fraud, trust us
                        </Text>
                    </Card>
                </Grid.Col>
                <Grid.Col lg={24} style={{ maxWidth: '335px' }}>
                    <Card
                        shadow="sm"
                        p="xl"
                        component="a"
                        href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                        target="_blank"
                    >
                        <Card.Section>
                            <Image
                                src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                                height={160}
                                alt="No way!"
                            />
                        </Card.Section>

                        <Text weight={500} size="lg" mt="md">
                            You&apos;ve won a million dollars in cash!
                        </Text>

                        <Text mt="xs" color="dimmed" size="sm">
                            Please click anywhere on this card to claim your
                            reward, this is not a fraud, trust us
                        </Text>
                    </Card>
                </Grid.Col>
                <Grid.Col lg={24} style={{ maxWidth: '335px' }}>
                    <Card
                        shadow="sm"
                        p="xl"
                        component="a"
                        href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                        target="_blank"
                    >
                        <Card.Section>
                            <Image
                                src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                                height={160}
                                alt="No way!"
                            />
                        </Card.Section>

                        <Text weight={500} size="lg" mt="md">
                            You&apos;ve won a million dollars in cash!
                        </Text>

                        <Text mt="xs" color="dimmed" size="sm">
                            Please click anywhere on this card to claim your
                            reward, this is not a fraud, trust us
                        </Text>
                    </Card>
                </Grid.Col>
            </Grid>
        </div>
    );
}
