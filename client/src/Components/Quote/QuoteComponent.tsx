import { Blockquote, Center } from '@mantine/core';

export default function QuoteComponent() {
    return (
        <Center
            style={{
                width: '100%',
                height: 'auto',
                backgroundColor: '#33404c',
                padding: '50px 0 50px 0',
            }}
        >
            <Blockquote
                color="indigo"
                cite="-Sovanna Bun"
                sx={{ width: '926px', fontSize: '20px', color: 'white' }}
            >
                Best service I've received!!! Very professional and courteous,
                would absolutely recommend to my family and friends!
            </Blockquote>
        </Center>
    );
}
