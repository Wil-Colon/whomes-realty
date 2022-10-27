import { AuthContext } from '../../../../context/AuthContext/AuthContext';
import { useContext } from 'react';
import AdminNavBar from '../../../../Components/AdminNavBar/AdminNavBar';

export default function AdminHome() {
    const { user } = useContext(AuthContext);

    return (
        <AdminNavBar>
            <h1>Welcome to the admin panel, {user.firstName}</h1>
        </AdminNavBar>
    );
}
