import './AdminNavBar.scss';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { AppShell, Loader, MediaQuery, Burger } from '@mantine/core';
import AdminNavbarContent from '../AdminNavBarContent/AdminNavBarContent';
import { checkAuth } from '../../context/AuthContext/apiCalls';
import { logout } from '../../context/AuthContext/AuthAction';

interface navBarProps {
    children: React.ReactNode;
}

export default function AdminNavBar({ children }: navBarProps) {
    const { isFetching, user, dispatch } = useContext(AuthContext);
    const [navBarSelection, setNavBarSelection] = useState('');
    const [opened, setOpened] = useState(false);

    const navSelection = (selection) => {
        setNavBarSelection(selection);
    };
    const navBarOpened = (selection) => {
        setOpened(selection);
    };

    useEffect(() => {
        const authCheck = async () => {
            const res = await checkAuth(user.accessToken);

            if (res.tokenPass === 'Invalid') {
                dispatch(logout());
            }
        };
        authCheck();
    }, [dispatch]);

    return isFetching ? (
        <Loader />
    ) : (
        <AppShell
            padding="md"
            navbar={
                <AdminNavbarContent
                    navBarOpened={navBarOpened}
                    hidden={opened}
                    selection={navSelection}
                />
            }
            header={
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                    <Burger
                        opened={opened}
                        onClick={() => setOpened((o) => !o)}
                        size="sm"
                        color={'white'}
                        mr="xl"
                        sx={{
                            marginLeft: '17px',
                            paddingTop: '30px',
                            paddingBottom: '15px',
                            marginBottom: '10px',
                        }}
                    />
                </MediaQuery>
            }
            styles={(theme) => ({
                main: {
                    backgroundColor:
                        theme.colorScheme === 'dark'
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0],
                },
            })}
        >
            {children}
        </AppShell>
    );
}
