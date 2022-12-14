import './staffBioModal.scss';
import { Drawer } from '@mantine/core';
import BioLayout from '../BioLayout/BioLayout';

interface BioProps {
    open: boolean;
    onClose: any;
    avatar: string;
    name: string;
    email: string;
    job: string;
    bio: string;
}
export default function StaffBioModal({
    open,
    onClose,
    avatar,
    name,
    email,
    job,
    bio,
}: BioProps) {
    return (
        <Drawer
            opened={open}
            onClose={() => onClose(false)}
            title={name}
            padding="xl"
            position="right"
            size="120vh"
            overlayColor="#151414"
            transition="pop"
            styles={(theme) => ({
                title: {
                    color: 'white',
                    fontWeight: 600,
                },
                closeButton: {
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'grey',
                    },
                },
                drawer: {
                    position: 'relative',
                    margin: 'auto',
                    maxWidth: '800px',
                    msOverflowStyle: 'none',
                    scrollbarwidth: 'none',
                    overflow: 'scroll',
                    background:
                        'linear-gradient(to bottom, #2c5364, #203a43, #0f2027)',
                    scrollbarWidth: 'none',

                    '@media (max-width: 520px)': {
                        width: '87%',
                    },
                },
            })}
        >
            <BioLayout
                name={name}
                email={email}
                job={job}
                avatar={avatar}
                bio={bio}
            />
        </Drawer>
    );
}
