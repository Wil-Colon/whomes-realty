import FeatureListings from '../../Components/FeatureListings/FeatureListings';
import Header from '../../Components/Header/Header';
import Hero from '../../Components/Hero/Hero';
import BlockQuote from '../../Components/BlockQuote/BlockQuote';
import Staff from '../../Components/Staff/Staff/Staff';
import Footer from '../../Components/Footer/Footer';
import ContactUs from '../../Components/ContactUs/ContactUs';
import Staff2 from '../../Components/Staff2/Staff2';

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
            <Header links={links} />
            <Hero />
            <FeatureListings />
            <BlockQuote />
            {<Staff2 />}
            {/* <Staff /> */}
            <ContactUs />
            <Footer links={links} />
        </>
    );
}
