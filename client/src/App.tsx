import { useState } from 'react';
import Home from './Pages/Home/Home';

import {
    MantineProvider,
    ColorSchemeProvider,
    ColorScheme,
} from '@mantine/core';

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
                <Home />
            </MantineProvider>
        </ColorSchemeProvider>
    );
}

export default App;
