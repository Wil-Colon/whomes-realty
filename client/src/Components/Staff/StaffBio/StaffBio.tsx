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
export default function StaffBio({
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
