import FeatureListings from '../../Components/FeatureListings/FeatureListings';
import { HeaderSimple } from '../../Components/Header/Header';
import { HeroTextOverlay } from '../../Components/Hero/HeroTextOverlay';
import QuoteComponent from '../../Components/Quote/QuoteComponent';

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
            <QuoteComponent />
            <FeatureListings />
        </>
    );
}
