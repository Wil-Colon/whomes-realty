import { HeaderSimple } from '../../Components/Header/Header';
import { HeroTextOverlay } from '../../Components/Hero/HeroTextOverlay';

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
            <HeroTextOverlay />
        </>
    );
}
