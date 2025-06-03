import { useContext } from 'react'
import { Navigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';

function PublicGuard({ children }) {
    const { isAuthenticated} = useContext(AuthContext);

    return isAuthenticated ? <Navigate to="/" /> : <>{children}</>;
}

export default PublicGuard