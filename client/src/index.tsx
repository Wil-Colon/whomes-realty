import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './context/AuthContext/AuthContext';
import { MessagesContextProvider } from './context/MessagesContext/MessageContext';
import { ListingContextProvider } from './context/ListingContext/ListingContext';
import { NotificationsProvider } from '@mantine/notifications';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <AuthContextProvider>
            <MessagesContextProvider>
                <ListingContextProvider>
                    <NotificationsProvider>
                        <App />
                    </NotificationsProvider>
                </ListingContextProvider>
            </MessagesContextProvider>
        </AuthContextProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
