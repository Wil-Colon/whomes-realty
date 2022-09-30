import { Blockquote, Center } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import { useRef, useState, useEffect } from 'react';
import './quoteComponent.scss';

export default function BlockQuote() {
    const containerRef = useRef();
    const { ref, entry } = useIntersection({
        root: containerRef.current,
        threshold: 1,
    });
    const [viewed, setViewed] = useState(false);

    useEffect(() => {
        if (viewed === false && entry?.isIntersecting) {
            setViewed(true);
        }
    }, [entry?.isIntersecting, viewed]);

    return (
        <Center
            style={{
                width: '100%',
                height: '230px',
                backgroundColor: '#33404c',
                padding: '50px 0 50px 0',
            }}
            ref={ref}
        >
            {viewed && (
                <Blockquote
                    color="indigo"
                    cite="-Sovanna Bun"
                    className="block-quote"
                >
                    Best service I've received!!! Very professional and
                    courteous, would absolutely recommend to my family and
                    friends!
                </Blockquote>
            )}
        </Center>
    );
}
