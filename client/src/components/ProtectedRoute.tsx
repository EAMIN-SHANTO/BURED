import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  authRequired?: boolean;
  requiredRole?: string[];
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  authRequired = true,
  requiredRole,
  redirectTo = '/'
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (authRequired && !user) {
    return <Navigate to="/login" />;
  }

  if (!authRequired && user) {
    return <Navigate to={redirectTo} />;
  }

  // Check if user has required role
  if (requiredRole && user && !requiredRole.includes(user.role || '')) {
    console.log('Access denied. User role:', user.role, 'Required roles:', requiredRole);
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 