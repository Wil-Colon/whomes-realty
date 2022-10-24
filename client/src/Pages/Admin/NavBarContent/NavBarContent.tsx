import { useState } from 'react';
import { createStyles, Navbar, Group, MediaQuery, Burger } from '@mantine/core';
import {
    IconSwitchHorizontal,
    IconLogout,
    IconHomePlus,
    IconHomeStar,
} from '@tabler/icons';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme, _params, getRef) => {
    const icon = getRef('icon');
    return {
        navbar: {
            backgroundColor: theme.fn.variant({
                variant: 'filled',
                color: theme.primaryColor,
            }).background,
        },

        header: {
            paddingBottom: '8px',
            marginBottom: theme.spacing.md * 1.5,
            borderBottom: `1px solid ${theme.fn.lighten(
                theme.fn.variant({
                    variant: 'filled',
                    color: theme.primaryColor,
                }).background!,
                0.1
            )}`,
        },

        footer: {
            paddingTop: theme.spacing.md,
            marginTop: theme.spacing.md,
            borderTop: `1px solid ${theme.fn.lighten(
                theme.fn.variant({
                    variant: 'filled',
                    color: theme.primaryColor,
                }).background!,
                0.1
            )}`,
        },

        link: {
            ...theme.fn.focusStyles(),
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            fontSize: theme.fontSizes.sm,
            color: theme.white,
            padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
            borderRadius: theme.radius.sm,
            fontWeight: 500,

            '&:hover': {
                backgroundColor: theme.fn.lighten(
                    theme.fn.variant({
                        variant: 'filled',
                        color: theme.primaryColor,
                    }).background!,
                    0.1
                ),
            },
        },

        linkIcon: {
            ref: icon,
            color: theme.white,
            opacity: 0.75,
            marginRight: theme.spacing.sm,
        },

        buttonStyles: {
            ...theme.fn.focusStyles(),
            border: 'none',
            backgroundColor: '#228be6',
            color: 'white',
            cursor: 'pointer',
            marginBottom: '15px',
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',

            '&:hover': {
                backgroundColor: theme.fn.lighten(
                    theme.fn.variant({
                        variant: 'filled',
                        color: theme.primaryColor,
                    }).background!,
                    0.1
                ),
            },
        },

        linkActive: {
            '&, &:hover': {
                backgroundColor: theme.fn.lighten(
                    theme.fn.variant({
                        variant: 'filled',
                        color: theme.primaryColor,
                    }).background!,
                    0.15
                ),
                [`& .${icon}`]: {
                    opacity: 0.9,
                },
            },
        },
    };
});

const data = [
    { link: '', label: 'Home', icon: IconHomeStar },
    { link: 'createlisting', label: 'Create Listing', icon: IconHomePlus },
];

interface navBarProps {
    selection: (params: any) => any;
    navBarOpened: (params: any) => any;
    hidden: boolean;
}

export default function NavbarContent({
    selection,
    hidden,
    navBarOpened,
}: navBarProps) {
    const { classes, cx } = useStyles();
    const [active, setActive] = useState('Billing');

    const navigate = useNavigate();

    const links = data.map((item) => (
        <button
            key={item.label}
            className={cx(classes.buttonStyles, {
                [classes.linkActive]: item.label === active,
            })}
            onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
                selection(item.link);
                navigate(`/admin/${item.link}`);
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </button>
    ));

    return (
        <Navbar
            width={{ sm: 300 }}
            p="md"
            className={classes.navbar}
            hidden={!hidden}
            hiddenBreakpoint="sm"
        >
            <Navbar.Section grow>
                <Group className={classes.header} position="apart">
                    <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                        <Burger
                            opened={hidden}
                            onClick={() => navBarOpened(false)}
                            size="sm"
                            color={'white'}
                            mr="xl"
                        />
                    </MediaQuery>
                </Group>
                {links}
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
                <button
                    className={classes.buttonStyles}
                    onClick={(event) => event.preventDefault()}
                >
                    <IconSwitchHorizontal
                        className={classes.linkIcon}
                        stroke={1.5}
                    />
                    <span>Change account</span>
                </button>

                <button
                    className={classes.buttonStyles}
                    onClick={(event) => event.preventDefault()}
                >
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Logout</span>
                </button>
            </Navbar.Section>
        </Navbar>
    );
}
