import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { TopNavbar } from '@/components/layout/TopNavbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className='flex min-h-screen w-full bg-slate-50 font-sans'>
        <AppSidebar />

        <main className='flex-1 flex flex-col min-w-0'>
          {/* Header Mewah yang baru kita buat */}
          <TopNavbar />

          {/* Area Konten dengan animasi fade-in sederhana */}
          <div className='p-6 md:p-8 overflow-auto animate-in fade-in duration-500'>
            <div className='max-w-7xl mx-auto'>{children}</div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
