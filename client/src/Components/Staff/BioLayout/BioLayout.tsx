import { Avatar, Text, Paper } from '@mantine/core';

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
            sx={(theme) => ({
                backgroundColor:
                    theme.colorScheme === 'dark'
                        ? theme.colors.dark[8]
                        : theme.white,
            })}
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

            <Text align="center">{bio}</Text>
        </Paper>
    );
}
