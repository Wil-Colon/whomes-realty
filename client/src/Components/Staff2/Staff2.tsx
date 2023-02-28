import { createStyles, Text, Title, Container, Image } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing.xl * 2,
        marginBottom: '20px',
        borderRadius: theme.radius.md,
        backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        border: `1px solid ${
            theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[3]
        }`,

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            flexDirection: 'column-reverse',
            padding: theme.spacing.xl,
        },
    },

    image: {
        minWidth: '30%',
        // width: '70%',

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            maxWidth: '70%',
        },
    },

    body: {
        paddingRight: theme.spacing.xl * 4,

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            paddingRight: 0,
            marginTop: theme.spacing.xl,
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        lineHeight: 1,
        marginBottom: theme.spacing.md,
    },

    controls: {
        display: 'flex',
        marginTop: theme.spacing.xl,
    },

    inputWrapper: {
        width: '100%',
        flex: '1',
    },

    input: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRight: 0,
    },

    control: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },
}));

export default function Staff2() {
    const { classes } = useStyles();
    const isMobile = useMediaQuery('(max-width: 768px)');
    return (
        <Container id="realtors" size={1200} style={{ margin: '50px auto' }}>
            <div className={classes.wrapper}>
                <div className={classes.body}>
                    <Title className={classes.title}>
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
                            Wendy Garcia{' '}
                        </Text>
                    </Title>
                    <Text weight={500} size="lg" mb={5}>
                        Owner/Broker
                    </Text>
                    <Text size="sm" color="dimmed">
                        Wendy Garcia is broker/Owner of W Homes realty, she’s
                        licensed and been doing real estate since 1997.
                        Dedication, integrity, honest, true passion for her
                        business and her clients have helped Wendy’s reputation
                        for more than 20 years helping the community to purchase
                        and sell their properties in the state of Rhode Island.
                        Wendy specialized in Residential properties sales
                        including first time homes, second homes and income
                        properties. Thanks to her high ethical standard and
                        clients success Wendy has loyal clientele, personal
                        referrals and respect for others real estate agents in
                        the business Multi millions sales volume award winner,
                        GRI is a nationally recognized professional which stands
                        for Graduate Realtors Institute. ABR is a designation
                        Accredited buyer’s representative by the national
                        association of Realtors.
                    </Text>
                </div>
                <Image
                    src={require('../../assets/images/wendySolid-min.jpg')}
                    className={classes.image}
                />
            </div>
            <div className={classes.wrapper}>
                <Image
                    src={require('../../assets/images/glendy.jpg')}
                    className={classes.image}
                />
                <div
                    className={classes.body}
                    style={
                        !isMobile
                            ? {
                                  paddingLeft: '96px',
                                  paddingRight: '0px',
                              }
                            : { paddingLeft: '0px' }
                    }
                >
                    <Title className={classes.title}>
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
                            Glendy Colon{' '}
                        </Text>
                    </Title>
                    <Text weight={500} size="lg" mb={5}>
                        Realtor
                    </Text>
                    <Text
                        size="sm"
                        color="dimmed"
                        style={{ marginBottom: '20px' }}
                    >
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum
                    </Text>
                </div>
            </div>
        </Container>
    );
}
