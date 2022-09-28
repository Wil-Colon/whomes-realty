import { Title, Text, Overlay, createStyles, AspectRatio } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import HeroVideoSlider from './HeroVideoSlider';

const useStyles = createStyles((theme) => ({
    wrapper: {
        position: 'relative',
        paddingTop: 180,
        paddingBottom: 130,

        '@media (max-width: 520px)': {
            paddingTop: 90,
            paddingBottom: 50,
        },
    },

    inner: {
        position: 'relative',
        zIndex: 1,
        width: 926,
    },

    title: {
        fontWeight: 800,
        fontSize: 50,
        letterSpacing: 0,
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        color: theme.white,
        marginBottom: theme.spacing.xs,
        textAlign: 'left',
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,

        '@media (max-width: 980px)': {
            fontSize: 50,
            textAlign: 'left',
        },
        '@media (max-width: 520px)': {
            fontSize: 35,
            textAlign: 'left',
        },
    },

    highlight: {
        color: theme.colors[theme.primaryColor][4],
    },

    description: {
        color: 'lightgray',
        textAlign: 'left',
        paddingLeft: 16,
        '@media (max-width: 980px)': {
            paddingTop: '40px',
        },

        '@media (max-width: 520px)': {
            fontSize: theme.fontSizes.md,
            textAlign: 'left',
            paddingTop: '20px',
        },
    },
}));

export function HeroTextOverlay() {
    const { classes } = useStyles();
    const isMobile = useMediaQuery('(min-width: 480px)');

    return (
        <AspectRatio
            ratio={!isMobile ? 6 / 9 : 6 / 2.6}
            sx={!isMobile ? { minHeight: '650px' } : { minHeight: '800px' }}
        >
            <HeroVideoSlider />
            <div className={classes.wrapper}>
                <Overlay color="#000" opacity={0.65} zIndex={1} />

                <div className={classes.inner}>
                    <Title className={classes.title}>
                        <Text sx={{ lineHeight: 0.6 }}>
                            Welcome to <br />{' '}
                            <Text
                                component="span"
                                variant="gradient"
                                gradient={{
                                    from: 'indigo',
                                    to: 'cyan',
                                    deg: 45,
                                }}
                            >
                                WHomes Realty{' '}
                            </Text>
                            of Rhode Island!
                        </Text>
                    </Title>

                    <Text size="lg" className={classes.description}>
                        Find your future home in Rhode Island today!
                    </Text>
                </div>
            </div>
        </AspectRatio>
    );
}
