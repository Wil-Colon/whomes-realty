import {
    Title,
    Text,
    Overlay,
    createStyles,
    AspectRatio,
    Button,
    GroupedTransition,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';
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
    button: {
        margin: '10px 0px 0px 16px',
        width: '180px',
        backgroundImage: 'linear-gradient(45deg, #4c6ef5 0%, #15aabf 100%)',
        '&:hover': {
            backgroundImage: 'linear-gradient(45deg, #4c6ef5 0%, #81aabf 100%)',
        },
    },
}));

export default function Hero() {
    const { classes } = useStyles();
    const isMobile = useMediaQuery('(min-width: 480px)');
    const element = document.getElementById('listings');
    const [playAnimation, setPlayAnimation] = useState(false);

    useEffect(() => {
        const onPageLoad = () => {
            setPlayAnimation(true);
        };

        if (document.readyState === 'complete') {
            onPageLoad();
        } else {
            window.addEventListener('load', onPageLoad);
            // Remove the event listener when component unmounts
            return () => window.removeEventListener('load', onPageLoad);
        }
    }, []);

    return (
        <AspectRatio
            ratio={!isMobile ? 6 / 9 : 6 / 2.6}
            sx={!isMobile ? { minHeight: '650px' } : { minHeight: '800px' }}
        >
            <HeroVideoSlider />
            <div id="home" className={classes.wrapper}>
                <Overlay color="#000" opacity={0.65} zIndex={1} />

                <div className={classes.inner}>
                    <GroupedTransition
                        mounted={playAnimation}
                        transitions={{
                            title: { duration: 500, transition: 'slide-down' },
                            description: {
                                duration: 500,
                                transition: 'slide-left',
                                timingFunction: 'ease',
                            },
                        }}
                    >
                        {(styles) => (
                            <>
                                <Title className={classes.title}>
                                    <Text
                                        style={styles.title}
                                        sx={{ lineHeight: 1 }}
                                    >
                                        Welcome to <br />{' '}
                                        <Text
                                            component="span"
                                            variant="gradient"
                                            gradient={{
                                                from: 'indigo',
                                                to: 'cyan',
                                                deg: 45,
                                            }}
                                            style={{ lineHeight: '0' }}
                                        >
                                            WHomes Realty{' '}
                                        </Text>
                                        of Rhode Island!
                                    </Text>
                                </Title>
                                <div style={styles.description}>
                                    <Text
                                        size="lg"
                                        className={classes.description}
                                    >
                                        Find your future home in Rhode Island
                                        today!
                                    </Text>
                                    <Button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            element?.scrollIntoView({
                                                block: 'center',
                                                behavior: 'smooth',
                                            });
                                        }}
                                        className={classes.button}
                                        size="lg"
                                    >
                                        View Listings
                                    </Button>
                                </div>
                            </>
                        )}
                    </GroupedTransition>
                </div>
            </div>
        </AspectRatio>
    );
}
