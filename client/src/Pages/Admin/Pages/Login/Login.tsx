import './login.scss';
import {
    Paper,
    createStyles,
    TextInput,
    PasswordInput,
    Checkbox,
    Button,
    Title,
    Text,
    Alert,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconAlertCircle } from '@tabler/icons';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../../context/AuthContext/apiCalls';
import { AuthContext } from '../../../../context/AuthContext/AuthContext';

const useStyles = createStyles((theme) => ({
    wrapper: {
        minHeight: 900,
        backgroundSize: 'cover',
        backgroundImage:
            'url(https://images.unsplash.com/photo-1585694813849-abaabaa01ac6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1395&q=80)',
    },

    form: {
        borderRight: `1px solid ${
            theme.colorScheme === 'dark'
                ? theme.colors.dark[7]
                : theme.colors.gray[3]
        }`,
        minHeight: 900,
        maxWidth: 450,
        paddingTop: 80,

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            maxWidth: '100%',
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    logo: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        width: 120,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
}));

export default function Login() {
    const matches = useMediaQuery('(max-width: 480px)');
    const navigate = useNavigate();
    const { classes } = useStyles();
    const { dispatch, user, error } = useContext(AuthContext);
    const [userInput, setUserInput] = useState({
        email: '',
        password: '',
    });

    console.log(matches);

    const onSubmit = (e) => {
        e.preventDefault();
        login(userInput, dispatch);
    };

    useEffect(() => {
        if (user) {
            navigate('/admin');
        }
    }, [user, navigate]);

    return (
        <div className={classes.wrapper}>
            <Paper
                className={classes.form}
                style={{
                    margin: matches ? '0 30px 0 30px' : 0,
                    backgroundColor: matches ? '#ffffffe6' : '#fff',
                }}
                radius={0}
                p={30}
            >
                <Title
                    order={2}
                    className={classes.title}
                    align="center"
                    mt="md"
                    mb={50}
                >
                    WHomes Admin Login
                </Title>

                <TextInput
                    label="Username"
                    placeholder="Please Enter Username"
                    size="md"
                    onChange={(e) =>
                        setUserInput({
                            ...userInput,
                            [e.target.name]: e.target.value,
                        })
                    }
                    name="email"
                />
                <PasswordInput
                    label="Password"
                    placeholder="Your password"
                    mt="md"
                    size="md"
                    name="password"
                    onChange={(e) =>
                        setUserInput({
                            ...userInput,
                            [e.target.name]: e.target.value,
                        })
                    }
                />
                <Checkbox label="Keep me logged in" mt="xl" size="md" />
                <Button
                    fullWidth
                    mt="xl"
                    size="md"
                    onClick={(e) => onSubmit(e)}
                >
                    Login
                </Button>

                <Text align="center" mt="md">
                    Don&apos;t have an account?{' '}
                    <Text>
                        <u>Please ask admin</u>
                    </Text>
                </Text>
                {error && (
                    <Alert
                        icon={<IconAlertCircle size={16} />}
                        title="Please try again"
                        color="red"
                    >
                        Incorrect Username or Password!
                    </Alert>
                )}
            </Paper>
        </div>
    );
}
