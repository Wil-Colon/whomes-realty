import { Grid, Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import Listing from '../Listing/Listing';

export default function FeatureListings() {
    return (
        <div className="App" style={{ padding: '20px 10px 40px 10px' }}>
            <Text sx={{ fontSize: '30px', textAlign:'center' }}>FEATURE LISTINGS</Text>
            <Grid justify="center">
                <Listing />
            </Grid>
        </div>
    );
}
