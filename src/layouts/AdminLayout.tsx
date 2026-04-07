import { ReactNode } from 'react';
import { AdminSidebar } from '@/components/AdminSidebar';
import { useSidebar } from '@/lib/sidebarContext';

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { isOpen } = useSidebar();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content - adjusts based on sidebar state */}
      <main className={`flex-1 w-full transition-all duration-300 ${isOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        {children}
      </main>
    </div>
  );
};
