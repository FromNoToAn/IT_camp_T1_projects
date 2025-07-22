import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import type { RootState } from "@/app/store";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuth, loading } = useSelector(
    (state: RootState) => (state as any).auth,
  );
  const location = useLocation();

  if (loading) return <div>Загрузка...</div>;
  if (!isAuth)
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  return <>{children}</>;
}
