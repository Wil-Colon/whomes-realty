import { useEffect, useState, useContext } from 'react';
import {
    createStyles,
    Navbar,
    Group,
    MediaQuery,
    Burger,
    Image,
} from '@mantine/core';
import {
    IconLogout,
    IconHomePlus,
    IconHomeStar,
    IconMail,
} from '@tabler/icons';
import { Link, useNavigate } from 'react-router-dom';
import { getUnReadMessages } from '../../../context/MessagesContext/apiCalls';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import { logout } from '../../../context/AuthContext/AuthAction';
import { MessagesContext } from '../../../context/MessagesContext/MessageContext';
import DarkThemeButton from '../../DarkThemeButton';

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
    {
        link: 'createlisting',
        label: 'Listings',
        icon: IconHomePlus,
    },
    { link: 'messages', label: 'Mail', icon: IconMail },
];

interface navBarProps {
    navBarOpened: (params: any) => any;
    hidden: boolean;
}

export default function AdminNavbarContent({
    hidden,
    navBarOpened,
}: navBarProps) {
    const [active, setActive] = useState('Home');
    const [unReadMail, setUnReadMail] = useState([]);
    const { classes, cx } = useStyles();
    const { user, dispatch } = useContext(AuthContext);
    const { messages } = useContext(MessagesContext);
    const navigate = useNavigate();

    useEffect(() => {
        async function getUnReadMail() {
            try {
                const res = await getUnReadMessages();
                setUnReadMail(res);
                return await res;
            } catch (err) {
                console.log(err);
            }
        }
        getUnReadMail();
    }, [user?.accessToken, messages]);

    const links = data.map((item) => (
        <button
            key={item.label}
            className={cx(classes.buttonStyles, {
                [classes.linkActive]: item.label === active,
            })}
            onMouseOver={() => setActive(item.label)}
            onClick={(event) => {
                event.preventDefault();
                navigate(`/admin/${item.link}`);
            }}
        >
            {item.label === 'Mail' && unReadMail?.length > 0 ? (
                <div style={{ position: 'relative' }}>
                    <item.icon className={classes.linkIcon} stroke={1.5} />
                    <span
                        style={{
                            fontSize: '12px',
                            position: 'absolute',
                            bottom: 0,
                            right: 10,
                            border: '2px solid red',
                            borderRadius: '10px',
                            width: '15px',
                            backgroundColor: 'red',
                            height: '15px',
                        }}
                    >
                        {unReadMail?.length}
                    </span>
                </div>
            ) : (
                <item.icon className={classes.linkIcon} stroke={1.5} />
            )}

            <span>{item.label}</span>
        </button>
    ));

    return (
        <Navbar
            width={{ sm: 225 }}
            p="md"
            className={classes.navbar}
            hidden={!hidden}
            hiddenBreakpoint="sm"
        >
            <Navbar.Section grow>
                <Link to="/">
                    <Image
                        src={require('../../../assets/images/logo2.png')}
                        alt="company logo"
                        width={60}
                        height={60}
                    />
                </Link>
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
                    onClick={() => {
                        dispatch(logout());
                        navigate(`/admin/login`);
                    }}
                >
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Logout</span>
                </button>
            </Navbar.Section>
        </Navbar>
    );
}
