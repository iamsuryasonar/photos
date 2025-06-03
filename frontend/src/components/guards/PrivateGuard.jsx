import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Navigate } from "react-router"

function PrivateGuard({ children }) {
    const { isAuthenticated } = useContext(AuthContext)

    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

export default PrivateGuard