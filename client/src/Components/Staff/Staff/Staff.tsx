import { Center, Text, Grid, Card, Button } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useState } from 'react';
import StaffBioModal from '../StaffBioModal/StaffBioModal';
import './staff.scss';
import 'imagehover.css/scss/imagehover.scss';

export default function Staff() {
    const isMobile = useMediaQuery('(max-width: 480px)');

    const [open, setOpened] = useState(false);
    const [staffInfo, setStaffInfo] = useState({
        avatar: '',
        name: '',
        email: '',
        job: '',
        bio: '',
    });

    //OVERLAY DIV

    return (
        <div>
            <StaffBioModal
                open={open}
                onClose={() => setOpened(false)}
                avatar={staffInfo.avatar}
                name={staffInfo.name}
                email={staffInfo.email}
                job={staffInfo.job}
                bio={staffInfo.bio}
            />

            <div
                id="realtors"
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
                    <Grid.Col
                        lg={24}
                        style={{
                            maxWidth: '250px',
                        }}
                    >
                        <Card
                            shadow="sm"
                            p="xl"
                            component="a"
                            style={{
                                borderRadius: '20px',
                            }}
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
                            id="wendy"
                        >
                            <Card.Section>
                                <>
                                    {isMobile && (
                                        <div id="overlay" className="overlay">
                                            <Button
                                                style={{
                                                    backgroundColor:
                                                        '#228be6a1',
                                                }}
                                            >
                                                Bio
                                            </Button>
                                        </div>
                                    )}
                                    <figure className="imghvr-blur">
                                        <img
                                            src={require('../../../assets/images/wendySolid-min.jpg')}
                                            style={{
                                                width: '100%',
                                                height: '285px',
                                                objectFit: 'cover',
                                            }}
                                            alt="Wendy Garcia"
                                        />
                                        <figcaption>
                                            <p>Wendy Garcia</p>
                                            <Button>Bio</Button>
                                        </figcaption>
                                    </figure>
                                </>
                            </Card.Section>
                        </Card>
                    </Grid.Col>
                    <Grid.Col
                        lg={24}
                        style={{ maxWidth: '250px' }}
                        onClick={() => {
                            setStaffInfo({
                                avatar: 'https://t3.ftcdn.net/jpg/02/08/78/06/360_F_208780674_YfDPw1EjVok0o3eCJcYb0o6s6VwKUzTt.jpg',
                                name: 'Glendy Colon',
                                email: 'glendycolon@yahoo.com',
                                job: 'Realtor',
                                bio: 'derp derp depr depramdsa  dsa dasg dsg gads adsads dsa asdad pr depramdsa dsa dasg dsg gads adsads dsa a pr depramdsa dsa dasg dsg gads adsads dsa a pr depramdsa dsa dasg dsg gads adsads dsa a ',
                            });
                            setOpened(true);
                        }}
                    >
                        <Card
                            shadow="sm"
                            p="xl"
                            component="a"
                            style={{
                                borderRadius: '20px',
                                backgroundColor: '#000',
                            }}
                        >
                            <Card.Section>
                                <>
                                    {isMobile && (
                                        <div id="overlay" className="overlay">
                                            <Button
                                                style={{
                                                    backgroundColor:
                                                        '#228be6a1',
                                                }}
                                            >
                                                Bio
                                            </Button>
                                        </div>
                                    )}
                                    <figure className="imghvr-blur">
                                        <img
                                            src="https://t3.ftcdn.net/jpg/02/08/78/06/360_F_208780674_YfDPw1EjVok0o3eCJcYb0o6s6VwKUzTt.jpg"
                                            style={{
                                                width: '100%',
                                                height: '285px',
                                                objectFit: 'cover',
                                            }}
                                            alt="Glendy Colon"
                                        />
                                        <figcaption>
                                            <p>Glendy Colon</p>
                                            <Button>Bio</Button>
                                        </figcaption>
                                    </figure>
                                </>
                            </Card.Section>
                        </Card>
                    </Grid.Col>
                    <Grid.Col
                        lg={24}
                        style={{ maxWidth: '250px' }}
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
                        <Card
                            shadow="sm"
                            p="xl"
                            component="a"
                            style={{
                                borderRadius: '20px',
                                backgroundColor: '#000',
                            }}
                        >
                            <Card.Section>
                                <>
                                    {isMobile && (
                                        <div id="overlay" className="overlay">
                                            <Button
                                                style={{
                                                    backgroundColor:
                                                        '#228be6a1',
                                                }}
                                            >
                                                Bio
                                            </Button>
                                        </div>
                                    )}
                                    <figure className="imghvr-blur">
                                        <img
                                            src="https://t3.ftcdn.net/jpg/02/08/78/06/360_F_208780674_YfDPw1EjVok0o3eCJcYb0o6s6VwKUzTt.jpg"
                                            style={{
                                                width: '100%',
                                                height: '285px',
                                                objectFit: 'cover',
                                            }}
                                            alt="Michael Carrasco"
                                        />
                                        <figcaption>
                                            <p>Michael Carrasco</p>
                                            <Button>Bio</Button>
                                        </figcaption>
                                    </figure>
                                </>
                            </Card.Section>
                        </Card>
                    </Grid.Col>
                </Grid>
            </div>
        </div>
    );
}
