import {
    MantineProvider,
    ColorSchemeProvider,
    ColorScheme,
} from '@mantine/core';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Home from './Pages/Home/Home';
import AdminHome from './Pages/Admin/Pages/AdminHome';

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
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/admin" element={<AdminHome />}></Route>
                    </Routes>
                </Router>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}

export default App;
