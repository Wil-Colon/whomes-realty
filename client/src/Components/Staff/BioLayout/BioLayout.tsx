import './biolayout.scss';
import { Avatar, Text, Paper, ScrollArea } from '@mantine/core';

interface UserInfoActionProps {
    avatar: string;
    name: string;
    email: string;
    job: string;
    bio: string;
}

export default function BioLayout({
    avatar,
    name,
    email,
    job,
    bio,
}: UserInfoActionProps) {
    return (
        <Paper
            radius="md"
            withBorder
            p="lg"
            sx={{ backgroundColor: '#ececec' }}
        >
            <Avatar
                // src={require(`../../../assets/images/${avatar}`)}
                src={avatar}
                size={120}
                radius={120}
                mx="auto"
            />
            <Text align="center" size="lg" weight={500} mt="md">
                {name}
            </Text>
            <Text align="center" color="dimmed" size="sm">
                {email} • {job}
            </Text>

            <Text className="bioText" align="center">
                {bio}
            </Text>
        </Paper>
    );
}
