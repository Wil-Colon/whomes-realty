import { Grid, Text, Transition } from '@mantine/core';
import DarkThemeButton from './DarkThemeButton';

interface Props {
    open: boolean;
}

export default function NavBarContent({ open }: Props) {
    return (
        <Transition
            mounted={open}
            transition="scale-x"
            duration={200}
            timingFunction="ease"
            exitDuration={400}
        >
            {(styles) => (
                <div style={styles}>
                    {' '}
                    <Grid>
                        <Grid.Col md={6} lg={3}>
                            <Text>Home</Text>
                        </Grid.Col>
                        <Grid.Col md={6} lg={3}>
                            <Text>Listings</Text>
                        </Grid.Col>
                        <Grid.Col md={6} lg={3}>
                            <Text>Realtors</Text>
                        </Grid.Col>
                        <Grid.Col md={6} lg={3}>
                            <Text>Contacts</Text>
                        </Grid.Col>
                        <Grid.Col md={6} lg={3}>
                            <DarkThemeButton />
                        </Grid.Col>
                    </Grid>{' '}
                </div>
            )}
        </Transition>
    );
}
