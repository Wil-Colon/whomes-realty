import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext/AuthContext';

export default function PrivateRoute() {
    const { user } = useContext(AuthContext);

    return user?.accessToken ? <Outlet /> : <Navigate to="/admin/login" />;
}
