import {
    Title,
    Text,
    Button,
    Overlay,
    createStyles,
    AspectRatio,
} from '@mantine/core';
import HeroVideoSlider from './HeroVideoSlider';
import { useMediaQuery } from '@mantine/hooks';

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

    controls: {
        marginTop: theme.spacing.xl * 1.5,
        display: 'flex',
        justifyContent: 'left',
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,

        '@media (max-width: 520px)': {
            flexDirection: 'column',
        },
    },

    control: {
        height: 42,
        fontSize: theme.fontSizes.md,

        '&:not(:first-of-type)': {
            marginLeft: theme.spacing.md,
        },

        '@media (max-width: 520px)': {
            '&:not(:first-of-type)': {
                marginTop: theme.spacing.md,
                marginLeft: 0,
            },
        },
    },

    secondaryControl: {
        color: theme.white,
        backgroundColor: 'rgba(255, 255, 255, .4)',

        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, .45) !important',
        },
    },
}));

export function HeroTextOverlay() {
    const { classes, cx } = useStyles();
    const isMobile = useMediaQuery('(min-width: 520px)');

    return (
        <AspectRatio
            ratio={!isMobile ? 6 / 10 : 6 / 2}
            sx={{ minHeight: '475px' }}
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
                        Build more reliable software with AI companion. AI is
                        also trained to detect lazy developers who do nothing
                        and just complain on Twitter.
                    </Text>

                    <div className={classes.controls}>
                        <Button
                            className={classes.control}
                            variant="white"
                            size="lg"
                            radius="lg"
                        >
                            Get started
                        </Button>
                        <Button
                            className={cx(
                                classes.control,
                                classes.secondaryControl
                            )}
                            size="lg"
                            radius="lg"
                        >
                            Live demo
                        </Button>
                    </div>
                </div>
            </div>
        </AspectRatio>
    );
}
