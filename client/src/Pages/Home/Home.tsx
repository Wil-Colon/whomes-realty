import FeatureListings from '../../Components/FeatureListings/FeatureListings';
import HeaderSimple from '../../Components/Header/Header';
import HeroTextOverlay from '../../Components/Hero/HeroTextOverlay';
import BlockQuote from '../../Components/BlockQuote/BlockQuote';
import Staff from '../../Components/Staff/Staff/Staff';
import Footer from '../../Components/Footer/Footer';
import ContactUs from '../../Components/ContactUs/ContactUs';

export default function Home() {
    const links = [
        {
            link: 'home',
            label: 'Home',
        },
        {
            link: 'listings',
            label: 'Featured Listings',
        },
        {
            link: 'realtors',
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
            <ContactUs />
            <Footer links={links} />
        </>
    );
}
