import {
    createStyles,
    Text,
    Title,
    SimpleGrid,
    TextInput,
    Textarea,
    Button,
    Group,
    Container,
} from '@mantine/core';
import { useForm, isEmail } from '@mantine/form';
import { useState } from 'react';
import { newMessage } from '../../context/MessagesContext/apiCalls';
import { ContactIconsList } from '../ContactIcons/ContactIcons';

const useStyles = createStyles((theme) => ({
    wrapper: {
        minHeight: 400,
        boxSizing: 'border-box',
        backgroundImage: 'linear-gradient(45deg, #4c6ef5 0%, #15aabf 100%)',
        borderRadius: theme.radius.md,
        padding: theme.spacing.xl * 2.5,

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            padding: theme.spacing.xl * 1.5,
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        color: theme.white,
        lineHeight: 1,
    },

    description: {
        color: theme.colors[theme.primaryColor][0],
        maxWidth: 300,

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            maxWidth: '100%',
        },
    },

    form: {
        backgroundColor: theme.white,
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        boxShadow: theme.shadows.lg,
    },

    social: {
        color: theme.white,

        '&:hover': {
            color: theme.colors[theme.primaryColor][1],
        },
    },

    input: {
        backgroundColor: theme.white,
        borderColor: theme.colors.gray[4],
        color: theme.black,

        '&::placeholder': {
            color: theme.colors.gray[5],
        },
    },

    inputLabel: {
        color: theme.black,
    },

    control: {
        backgroundColor: theme.colors[theme.primaryColor][6],
    },
}));

export default function ContactUs() {
    const { classes } = useStyles();
    const [submitted, setSubmitted] = useState(false);

    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            message: '',
            phoneNumber: '',
        },

        validate: {
            email: isEmail('Invalid email'),
            name: (value) =>
                /\d/.test(value) === true
                    ? 'Name should contain no numbers.'
                    : value.length <= 1
                    ? 'Name should not be empty'
                    : null,
            message: (value) => value.length < 5 && 'Invalid message',
        },
    });

    return (
        <Container size={1900}>
            <div className={classes.wrapper}>
                <SimpleGrid
                    cols={2}
                    spacing={50}
                    breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
                >
                    <div>
                        <Title className={classes.title}>Contact us</Title>
                        <Text className={classes.description} mt="sm" mb={30}>
                            Leave your email and we will get back to you as soon
                            as possible.
                        </Text>

                        <ContactIconsList variant="white" />
                    </div>

                    <form
                        onSubmit={form.onSubmit((values) => newMessage(values))}
                    >
                        <div className={classes.form}>
                            <TextInput
                                withAsterisk
                                name="email"
                                label="Email"
                                placeholder="your@email.com"
                                classNames={{
                                    input: classes.input,
                                    label: classes.inputLabel,
                                }}
                                {...form.getInputProps('email')}
                            />
                            <TextInput
                                withAsterisk
                                label="Name"
                                placeholder="John Doe"
                                mt="md"
                                classNames={{
                                    input: classes.input,
                                    label: classes.inputLabel,
                                }}
                                {...form.getInputProps('name')}
                            />
                            <TextInput
                                name="phone"
                                label="Phone Number"
                                placeholder="Phone Number"
                                mt="md"
                                classNames={{
                                    input: classes.input,
                                    label: classes.inputLabel,
                                }}
                                {...form.getInputProps('phoneNumber')}
                            />
                            <Textarea
                                withAsterisk
                                name="message"
                                label="Your message"
                                placeholder=""
                                minRows={4}
                                mt="md"
                                classNames={{
                                    input: classes.input,
                                    label: classes.inputLabel,
                                }}
                                {...form.getInputProps('message')}
                            />
                            <Group position="right" mt="md">
                                <Button
                                    type="submit"
                                    className={classes.control}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        form.validate().hasErrors === false &&
                                            setSubmitted(true);
                                    }}
                                    disabled={submitted}
                                >
                                    {!submitted ? 'Send Message' : 'Sent!'}
                                </Button>
                            </Group>
                        </div>
                    </form>
                </SimpleGrid>
            </div>
        </Container>
    );
}
