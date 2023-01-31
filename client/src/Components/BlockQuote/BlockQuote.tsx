import { Blockquote, Center } from '@mantine/core';
import {
    useIntersection,
    useMediaQuery,
    useWindowScroll,
} from '@mantine/hooks';
import { useRef, useState, useEffect } from 'react';
import background from '../../assets/images/bg-houses.jpg';
import './quoteComponent.scss';

export default function BlockQuote() {
    const containerRef = useRef();
    const { ref, entry } = useIntersection({
        root: containerRef.current,
        threshold: 1,
    });
    const [viewed, setViewed] = useState(false);
    const [scroll, scrollTo] = useWindowScroll();
    const isMobile = useMediaQuery('(min-width: 480px)');

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
                padding: '0 10px 0 10px',
                marginTop: '30px',
            }}
            ref={ref}
        >
            <div
                style={{
                    width: '100%',
                    height: '250px',
                    zIndex: '-1',
                    backgroundImage: `url(${background})`,
                    WebkitBackgroundSize: '600px',
                    backgroundPositionY: isMobile
                        ? `${scroll.y / 40}%`
                        : `${scroll.y / 40}%`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    filter: 'blur(2px)',
                }}
            />
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
