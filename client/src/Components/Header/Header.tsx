import './header.scss';
import { useState } from 'react';
import {
    createStyles,
    Header,
    Container,
    Group,
    Burger,
    Text,
    Drawer,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
    },

    links: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('xs')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color:
            theme.colorScheme === 'light'
                ? theme.colors.dark[0]
                : theme.colors.gray[7],
        fontSize: theme.fontSizes.lg,
        fontWeight: 700,

        '&:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
        },
    },

    linkActive: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({
                variant: 'light',
                color: theme.primaryColor,
            }).background,
            color: theme.fn.variant({
                variant: 'light',
                color: theme.primaryColor,
            }).color,
        },
    },
}));

interface HeaderSimpleProps {
    links: { link: string; label: string }[];
}

export function HeaderSimple({ links }: HeaderSimpleProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [opened, { toggle }] = useDisclosure(false);
    const [active, setActive] = useState(links[0].link);
    const { classes, cx } = useStyles();

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    const items = links.map((link) => (
        <a
            key={link.label}
            href={link.link}
            className={cx(classes.link, {
                [classes.linkActive]: active === link.link,
            })}
            onClick={(event) => {
                event.preventDefault();
                setActive(link.link);
            }}
        >
            {link.label}
        </a>
    ));

    return (
        <Header
            height={60}
            mb={0}
            fixed
            withBorder={false}
            sx={
                isScrolled
                    ? { transition: 'all 0.5s', backgroundColor: '#1f1f1ff2' }
                    : { transition: 'all 0.5s', backgroundColor: '#fff0' }
            }
        >
            <Container className={classes.header}>
                <Text>WHomes</Text>
                <Group spacing={5} className={classes.links}>
                    {items}
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
                title="WHomes"
                padding="xl"
                size="xl"
                overlayBlur={1}
                position="right"
                overlayOpacity={0.2}
            >
                {items}
            </Drawer>
        </Header>
    );
}
