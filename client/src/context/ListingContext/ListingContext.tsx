import ListingReducer from './ListingReducer';
import { type Dispatch } from 'react';
import { createContext, useReducer } from 'react';

const INITIAL_STATE = {
    listings: [] as any,
    isFetching: false,
    error: false,
    dispatch: (() => undefined) as Dispatch<any>,
};

export const ListingContext = createContext(INITIAL_STATE);

export const ListingContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ListingReducer, INITIAL_STATE);

    return (
        <ListingContext.Provider
            value={{
                listings: state.listings,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </ListingContext.Provider>
    );
};
