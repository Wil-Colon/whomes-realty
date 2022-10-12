import { Center, Text, Grid, Card, Image, Button } from '@mantine/core';
import { useState } from 'react';
import StaffBio from '../StaffBio/StaffBio';
import './staff.scss';
import 'imagehover.css/scss/imagehover.scss';

export default function Staff() {
    const [open, setOpened] = useState(false);
    const [staffInfo, setStaffInfo] = useState({
        avatar: '',
        name: '',
        email: '',
        job: '',
        bio: '',
    });

    return (
        <>
            <StaffBio
                open={open}
                onClose={() => setOpened(false)}
                avatar={staffInfo.avatar}
                name={staffInfo.name}
                email={staffInfo.email}
                job={staffInfo.job}
                bio={staffInfo.bio}
            />

            <div
                style={{
                    width: '100%',
                    height: 'auto',
                    backgroundColor: '#33404c',
                    padding: '20px 10px 40px 10px',
                }}
            >
                <Center>
                    <Text className="center-text">OUR REALSTATE AGENTS</Text>
                </Center>
                <Grid justify="center">
                    <Grid.Col lg={24} style={{ maxWidth: '335px' }}>
                        <Card
                            shadow="sm"
                            p="xl"
                            component="a"
                            onClick={() => {
                                setStaffInfo({
                                    avatar: 'wendySolid.jpg',
                                    name: 'Wendy Garcia',
                                    email: 'wendygarcia72@yahoo.com',
                                    job: 'Owner/Broker',
                                    bio: 'derp derp depr depramdsada',
                                });
                                setOpened(true);
                            }}
                        >
                            <Card.Section>
                                <figure className="imghvr-blur">
                                    <img
                                        src={require('../../../assets/images/wendy.png')}
                                        style={{
                                            width: '319px',
                                            height: '160px',
                                            objectFit: 'cover',
                                            backgroundColor: '',
                                        }}
                                        alt="Wendy Garcia"
                                    />
                                    <figcaption>
                                        <p>Wendy Garcia</p>
                                        <Button>Bio</Button>
                                    </figcaption>
                                </figure>
                            </Card.Section>
                        </Card>
                    </Grid.Col>
                    <Grid.Col
                        lg={24}
                        style={{ maxWidth: '335px' }}
                        onClick={() => {
                            setStaffInfo({
                                avatar: 'https://t3.ftcdn.net/jpg/02/08/78/06/360_F_208780674_YfDPw1EjVok0o3eCJcYb0o6s6VwKUzTt.jpg',
                                name: 'Glendy Colon',
                                email: 'glendycolon@yahoo.com',
                                job: 'Realtor',
                                bio: 'derp derp depr depramdsada',
                            });
                            setOpened(true);
                        }}
                    >
                        <Card shadow="sm" p="xl" component="a">
                            <Card.Section>
                                <figure className="imghvr-blur">
                                    <img
                                        src="https://t3.ftcdn.net/jpg/02/08/78/06/360_F_208780674_YfDPw1EjVok0o3eCJcYb0o6s6VwKUzTt.jpg"
                                        style={{
                                            width: '319px',
                                            height: '160px',
                                            objectFit: 'cover',
                                        }}
                                        alt="Glendy Colon"
                                    />
                                    <figcaption>
                                        <p>Glendy Colon</p>
                                        <Button>Bio</Button>
                                    </figcaption>
                                </figure>
                            </Card.Section>
                        </Card>
                    </Grid.Col>
                    <Grid.Col
                        lg={24}
                        style={{ maxWidth: '335px' }}
                        onClick={() => {
                            setStaffInfo({
                                avatar: 'https://t3.ftcdn.net/jpg/02/08/78/06/360_F_208780674_YfDPw1EjVok0o3eCJcYb0o6s6VwKUzTt.jpg',
                                name: 'Micael Carrasco',
                                email: 'Michael@yahoo.com',
                                job: 'Realtor',
                                bio: 'derp derp depr depramdsada',
                            });
                            setOpened(true);
                        }}
                    >
                        <Card shadow="sm" p="xl" component="a">
                            <Card.Section>
                                <figure className="imghvr-blur">
                                    <img
                                        src="https://t3.ftcdn.net/jpg/02/08/78/06/360_F_208780674_YfDPw1EjVok0o3eCJcYb0o6s6VwKUzTt.jpg"
                                        style={{
                                            width: '319px',
                                            height: '160px',
                                            objectFit: 'cover',
                                        }}
                                        alt="Michael Carrasco"
                                    />
                                    <figcaption>
                                        <p>Michael Carrasco</p>
                                        <Button>Bio</Button>
                                    </figcaption>
                                </figure>
                            </Card.Section>
                        </Card>
                    </Grid.Col>
                </Grid>
            </div>
        </>
    );
}
