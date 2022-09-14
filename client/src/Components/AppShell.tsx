import { useState } from 'react';
import Home from '../Pages/Home';
import NavBarContent from './NavBarContent';
import {
    AppShell,
    Header,
    Footer,
    Navbar,
    MediaQuery,
    Burger,
    useMantineTheme,
} from '@mantine/core';

import HeaderContent from './HeaderContent';

export default function AppShellDemo() {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const [delayedOpened, setDelayedOpened] = useState(false);

    return (
        <AppShell
            navbar={
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                    <Navbar
                        p="md"
                        hiddenBreakpoint="lg"
                        hidden={!opened}
                        // width={{ sm: 200, lg: 300 }}
                    >
                        <NavBarContent open={delayedOpened} />
                    </Navbar>
                </MediaQuery>
            }
            header={
                <Header height={70} p="md" withBorder={false}>
                    <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                        <Burger
                            opened={opened}
                            onClick={() => {
                                setDelayedOpened(!delayedOpened);
                                !opened
                                    ? setOpened((o) => !o)
                                    : setTimeout(() => {
                                          setOpened((o) => !o);
                                      }, 200);
                            }}
                            size="sm"
                            color={theme.colors.gray[6]}
                            mr="xl"
                        />
                    </MediaQuery>
                    <HeaderContent />
                </Header>
            }
        >
            <Home />
            <Footer height={60} p="md">
                Application footer
            </Footer>
        </AppShell>
    );
}
