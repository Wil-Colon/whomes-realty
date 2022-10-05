import FeatureListings from '../../Components/FeatureListings/FeatureListings';
import { HeaderSimple } from '../../Components/Header/Header';
import { HeroTextOverlay } from '../../Components/Hero/HeroTextOverlay';
import BlockQuote from '../../Components/BlockQuote/BlockQuote';
import Staff from '../../Components/Staff/Staff/Staff';

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
            <BlockQuote />
            <FeatureListings />
            <Staff />
        </>
    );
}
