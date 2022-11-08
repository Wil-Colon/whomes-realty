import MailReducer from './MessagesReducer';
import { type Dispatch } from 'react';
import { createContext, useReducer } from 'react';

const INITIAL_STATE = {
    messages: [] as any,
    isFetching: false,
    error: false,
    dispatch: (() => undefined) as Dispatch<any>,
};

export const MessagesContext = createContext(INITIAL_STATE);

export const MessagesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(MailReducer, INITIAL_STATE);

    return (
        <MessagesContext.Provider
            value={{
                messages: state.messages,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </MessagesContext.Provider>
    );
};
