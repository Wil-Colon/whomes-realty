import axios from 'axios';
import { loginFailure, loginStart, loginSuccess } from './AuthAction';

export const validateAuth = async (accessToken) => {
    try {
        const res = await axios.get('http://localhost:5000/api/auth/', {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });

        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const login = async (userInput, dispatch) => {
    dispatch(loginStart());

    try {
        const res = await axios.post(
            'http://localhost:5000/api/auth/login',
            userInput
        );
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure(err));
    }
};
