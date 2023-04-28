import './footer.scss';
import { createStyles, Group, ActionIcon, Image } from '@mantine/core';
import {
    IconBrandTwitter,
    IconBrandYoutube,
    IconBrandInstagram,
} from '@tabler/icons';
import { HashLink as Link } from 'react-router-hash-link';

const useStyles = createStyles((theme) => ({
    footer: {
        // marginTop: 120,
        borderTop: `1px solid ${
            theme.colorScheme === 'dark'
                ? theme.colors.dark[5]
                : theme.colors.gray[2]
        }`,
    },

    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: `${theme.spacing.md}px ${theme.spacing.md}px`,

        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column',
        },
    },

    links: {
        [theme.fn.smallerThan('sm')]: {
            marginTop: theme.spacing.lg,
            marginBottom: theme.spacing.sm,
        },
    },
}));

interface FooterCenteredProps {
    links: { link: string; label: string }[];
}

export default function Footer({ links }: FooterCenteredProps) {
    let element;
    const { classes } = useStyles();
    const items = links.map((link) => (
        <Link
            className="linkText"
            key={link.label}
            to={`#${link.link}`}
            onClick={(event) => {
                event.preventDefault();
                element = document.getElementById(link.link);
                element.scrollIntoView({
                    block: 'center',
                    behavior: 'smooth',
                });
            }}
            scroll={(e) =>
                e.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                })
            }
        >
            {link.label}
        </Link>
    ));

    return (
        <div className={classes.footer}>
            <div className={classes.inner}>
                <Group className={classes.links}>{items}</Group>
                <Group position="center" style={{ paddingBottom: '10px' }}>
                    <Image width={34} height={34} src={'/equalhousing.png'} />
                    <Image
                        width={34}
                        height={34}
                        src={require('../../assets/images/MLS.png')}
                    />
                    <Image
                        width={34}
                        height={34}
                        src={require('../../assets/images/realtor.png')}
                    />
                </Group>

                <Group spacing="xs" position="right" noWrap>
                    <ActionIcon size="lg" variant="default" radius="xl">
                        <IconBrandTwitter size={18} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg" variant="default" radius="xl">
                        <IconBrandYoutube size={18} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg" variant="default" radius="xl">
                        <IconBrandInstagram size={18} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </div>
        </div>
    );
}
