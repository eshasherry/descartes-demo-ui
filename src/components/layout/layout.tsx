import { Sidebar } from "./sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Sidebar />
      
      {/* Main content */}
      <div className="md:ml-64">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}