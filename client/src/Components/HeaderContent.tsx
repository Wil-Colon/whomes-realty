import DarkThemeButton from './DarkThemeButton';
import { useState } from 'react';
import {
    Header,
    Text,
    MediaQuery,
    Burger,
    useMantineTheme,
    Grid,
    Group,
} from '@mantine/core';

export default function HeaderContent() {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);

    return (
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <Grid>
                <Grid.Col offset={1} span={1}>
                    WHomes
                </Grid.Col>
                <Grid.Col span={6} offset={4}>
                    <Group position="center">
                        <Text>Home</Text>
                        <Text>Listings</Text>
                        <Text>Realtors</Text>
                        <Text>Contacts</Text>
                        <DarkThemeButton />
                    </Group>
                </Grid.Col>
            </Grid>
        </MediaQuery>
    );
}
