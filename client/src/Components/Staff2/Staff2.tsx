import { Center, Col, Container, Grid } from '@mantine/core';

export default function Staff2() {
    return (
        <Container id="realtors" size={1200} style={{ margin: '60px auto' }}>
            <Grid
                columns={24}
                justify="center"
                style={{ marginBottom: '30px' }}
            >
                <Col span="content">
                    <img
                        src={require('../../assets/images/wendySolid-min.jpg')}
                        style={{
                            width: '300px',
                            height: '285px',
                            objectFit: 'cover',
                        }}
                        alt="Wendy Garcia"
                    />
                </Col>
                <Col span={16}>
                    dsaaaaaaaaaaaaaaaaaaaaaaaaaaafasdasddasdadad
                </Col>
            </Grid>
            <Grid columns={24} justify="center">
                <Col span={16}>
                    dsaaaaaaaaaaaaaaaaaaaaaaaaaaafasdasddasdadad
                </Col>
                <Col span="content">
                    <img
                        src={require('../../assets/images/wendySolid-min.jpg')}
                        style={{
                            width: '300px',
                            height: '285px',
                            objectFit: 'cover',
                        }}
                        alt="Wendy Garcia"
                    />
                </Col>
            </Grid>
        </Container>
    );
}
