import { HeaderSimple } from '../../Components/Header/Header';
import { HeroImageBackground } from '../../Components/Hero/Hero';

export default function Home() {
    const links = [
        {
            link: 'Home.com',
            label: 'Home',
        },
        {
            link: 'Yahoo.com',
            label: 'yahoo',
        },
        {
            link: 'Realtors',
            label: 'Realtors',
        },
    ];

    return (
        <>
            <HeaderSimple links={links} />
            <HeroImageBackground />
            <HeroImageBackground />
        </>
    );
}
