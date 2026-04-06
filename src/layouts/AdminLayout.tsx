import { ReactNode } from 'react';
import { AdminSidebar } from '@/components/AdminSidebar';

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="pt-16 md:pt-0 md:ml-64">
        {children}
      </main>
    </div>
  );
};
