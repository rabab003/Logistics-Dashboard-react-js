
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthState } from "@/lib/auth";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const { isAuthenticated } = getAuthState();
    
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);
  
  return <>{children}</>;
};

export default ProtectedLayout;
