import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

type ProtectedRouteProps = {
    children: ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated, isLoading } = useAuth0();
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return isAuthenticated ? children : <Navigate to="/" replace />;
}
