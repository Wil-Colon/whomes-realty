import {
    createStyles,
    Header,
    Container,
    Group,
    Burger,
    Image,
    Drawer,
    Text,
} from '@mantine/core';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { IconPhone } from '@tabler/icons';
import { HashLink as Link } from 'react-router-hash-link';
// import logo from '../../assets/images/logo2.png';

const useStyles = createStyles((theme) => ({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        maxWidth: '95%',
        paddingLeft: '0px',
    },

    links: {
        [theme.fn.smallerThan('xs')]: {
            // display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('xs')]: {
            // display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        color:
            theme.colorScheme === 'light'
                ? theme.colors.dark[0]
                : theme.colors.gray[7],
        fontSize: theme.fontSizes.lg,
        fontWeight: 700,
        textDecoration: 'underline 0.13em rgba(0, 0, 0, 0)',
        transition: 'text-decoration-color 500ms',

        '&:hover': {
            backgroundColor: '#454559',
            textDecoration: 'underline 0.13em rgba(120, 112, 145, 0.95)',
        },
    },

    linkActive: {
        '&, &:hover': {
            textDecoration: 'underline 0.13em',
            backgroundColor: '#4c6ef5 ',
            color: '#084275',
        },
    },
}));

interface HeaderSimpleProps {
    links: { link: string; label: string }[];
}

export default function HeaderSimple({ links }: HeaderSimpleProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [opened, { toggle }] = useDisclosure(false);
    const [active, setActive] = useState(links[0].link);
    const { classes, cx } = useStyles();

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    const items = links.map((link) => (
        <Link
            key={link.label}
            to={`${link.link !== '/viewlistings' ? '#' : ''}${link.link}`}
            className={cx(classes.link, {
                [classes.linkActive]: active === link.link,
            })}
            onClick={() => {
                setActive(link.link);
                toggle();
            }}
            scroll={(e) =>
                e.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                })
            }
        >
            {link.label}
        </Link>
    ));

    return (
        <Header
            height={70}
            mb={0}
            fixed
            withBorder={false}
            style={{ width: '100%', height: '100%' }}
            sx={
                isScrolled
                    ? { transition: 'all 1s', backgroundColor: '#1f1f1ff2' }
                    : { transition: 'all 1s', backgroundColor: '#fff0' }
            }
        >
            <Container className={classes.header}>
                <Image
                    src={'/logo2.png'}
                    alt="company logo"
                    width={60}
                    height={60}
                />

                <Group spacing={5} className={classes.links}>
                    <IconPhone style={{ color: 'white' }} />
                    <a href="tel:4019435800" style={{ textDecoration: 'none' }}>
                        <Text sx={{ color: 'white' }}>401-943-5800</Text>{' '}
                    </a>
                </Group>

                <Burger
                    opened={opened}
                    onClick={toggle}
                    className={classes.burger}
                    size="sm"
                    color="white"
                />
            </Container>
            <Drawer
                opened={opened}
                onClose={toggle}
                title="WHomes Realty"
                padding="xl"
                size="xl"
                overlayBlur={1}
                position="right"
                zIndex={1002}
                overlayOpacity={0.2}
                styles={(theme) => ({
                    drawer: {
                        fontSize: '25px',
                        backgroundColor: '#1a1919f2',
                    },
                    header: {
                        color: 'white',
                        textDecoration: 'underline',
                    },
                })}
            >
                {items}
                <Link
                    style={{
                        position: 'absolute',
                        fontSize: '15px',
                        bottom: '10px',
                        right: '10px',
                    }}
                    to="/admin/login"
                >
                    login
                </Link>
            </Drawer>
        </Header>
    );
}
