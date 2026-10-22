import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { canAccessDashboard } from '@/lib/dashboard';

export function DashboardGuard({ children }: { children: (userId: string) => ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <p role="status" className="py-16 text-center text-muted-foreground">Opening your resident portal…</p>;
  if (!canAccessDashboard(user) || !user) return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  return <>{children(user.id)}</>;
}