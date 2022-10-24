import {
    MantineProvider,
    ColorSchemeProvider,
    ColorScheme,
} from '@mantine/core';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Home from './Pages/Home/Home';
import Login from './Pages/Admin/Login/Login';
import PageNotFound from './Pages/PageNotFound/PageNotFound';
import CreateListing from './Pages/Admin/CreateListing/CreateListing';
import AdminHome from './Pages/Admin/AdminHome/AdminHome';

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
                        <Route path="/" element={<Home />} />

                        {/* admin paths */}

                        <Route path="/admin/login" element={<Login />} />
                        <Route path="/admin" element={<AdminHome />} />
                        <Route
                            path="/admin/createlisting"
                            element={<CreateListing />}
                        />

                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </Router>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}

export default App;
