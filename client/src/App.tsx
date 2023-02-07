import {
    MantineProvider,
    ColorSchemeProvider,
    ColorScheme,
} from '@mantine/core';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useLocation,
} from 'react-router-dom';
import { useState } from 'react';
import Home from './Pages/Home/Home';
import Login from './Pages/Admin/Pages/Login/Login';
import PageNotFound from './Pages/PageNotFound/PageNotFound';
import CreateListing from './Pages/Admin/Pages/CreateListing/CreateListing';
import AdminHome from './Pages/Admin/Pages/AdminHome/AdminHome';
import Messages from './Pages/Admin/Pages/Messages/Messages';
import PrivateRoute from './Components/routing/PrivateRoute';
import ListingDetailsModal from './Components/ListingDetailsModal/ListingDetailsModal';

function App() {
    const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    return (
        <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
        >
            <MantineProvider
                theme={{ colorScheme, fontFamily: 'sans-serif' }}
                withGlobalStyles
                withNormalizeCSS
            >
                <Router>
                    <Routes>
                        <Route path="/home" element={<Home />}>
                            <Route
                                path="/home/listing/:id"
                                element={<ListingDetailsModal />}
                            />
                        </Route>
                        <Route path="*" element={<PageNotFound />} />

                        {/* admin paths */}
                        <Route path="/admin/login" element={<Login />} />
                        <Route path="/admin" element={<PrivateRoute />}>
                            <Route path="/admin" element={<AdminHome />} />
                            <Route
                                path="/admin/createlisting"
                                element={<CreateListing />}
                            />
                            <Route
                                path="/admin/messages"
                                element={<Messages />}
                            />
                        </Route>
                    </Routes>
                </Router>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}

export default App;
