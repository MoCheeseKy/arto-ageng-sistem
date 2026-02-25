'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  Home,
  Database,
  Users,
  Truck,
  Activity,
  Droplet,
  Wallet,
  FileText,
  Receipt,
  Calculator,
} from 'lucide-react';

const menuGroups = [
  {
    title: 'Dashboard',
    items: [
      { title: 'Dashboard Owner', url: '/', icon: Home },
      { title: 'Reporting', url: '/reporting', icon: FileText },
    ],
  },
  {
    title: 'Master Data',
    items: [
      { title: 'User Management', url: '/master-data/users', icon: Users },
      { title: 'Data Supplier', url: '/master-data/supplier', icon: Truck },
      {
        title: 'Data Customer & Kontrak',
        url: '/master-data/customer',
        icon: Database,
      },
      { title: 'Data Driver', url: '/master-data/driver', icon: Users },
    ],
  },
  {
    title: 'Operasional',
    items: [
      {
        title: 'Data Pengisian / Pembelian',
        url: '/operasional/pengisian',
        icon: Droplet,
      },
      {
        title: 'Data Pemakaian Client',
        url: '/operasional/pemakaian',
        icon: Activity,
      },
    ],
  },
  {
    title: 'Keuangan & Accounting',
    items: [
      { title: 'Invoice', url: '/keuangan/invoice', icon: Receipt },
      { title: 'Deposit Customer', url: '/keuangan/deposit', icon: Wallet },
      { title: 'Kas & Bank', url: '/keuangan/kas-bank', icon: Calculator },
      { title: 'Accounting', url: '/keuangan/accounting', icon: FileText },
    ],
  },
];

export function AppSidebar() {
  // Ambil URL yang sedang aktif saat ini
  const pathname = usePathname();

  return (
    <Sidebar className='border-r-0 shadow-xl z-40'>
      <SidebarContent className='bg-[#0f172a] text-slate-300'>
        <div className='p-6 border-b border-slate-800/80 bg-[#0f172a] flex items-center gap-3'>
          <div className='bg-white p-1.5 rounded-lg shadow-sm'>
            <Image
              src='/logo.png'
              alt='Logo PT AAA'
              width={32}
              height={32}
              className='object-contain'
            />
          </div>
          <div className='flex flex-col'>
            <h2 className='text-lg font-extrabold text-white tracking-wide'>
              PT. Arto Ageng Abadi
            </h2>
            <p className='text-[10px] text-slate-400 font-semibold tracking-widest uppercase'>
              Sistem Operasi
            </p>
          </div>
        </div>

        <div className='py-6 overflow-y-auto custom-scrollbar'>
          {menuGroups.map((group) => (
            <SidebarGroup key={group.title} className='mb-4'>
              <SidebarGroupLabel className='text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2 px-6'>
                {group.title}
              </SidebarGroupLabel>
              <SidebarGroupContent className='px-4'>
                <SidebarMenu>
                  {group.items.map((item) => {
                    const isActive = pathname === item.url;

                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild tooltip={item.title}>
                          <a
                            href={item.url}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group h-fit ${
                              isActive
                                ? 'bg-primary text-white shadow-lg shadow-primary/30 font-semibold'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                            }`}
                          >
                            <item.icon
                              className={`w-4 h-4 transition-transform duration-300 ${
                                isActive
                                  ? 'text-white scale-110'
                                  : 'group-hover:text-primary group-hover:scale-110'
                              }`}
                            />
                            <span className='text-sm'>{item.title}</span>

                            {isActive && (
                              <span className='ml-auto w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse'></span>
                            )}
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
