'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function TopNavbar() {
  return (
    <header className='flex items-center justify-between h-16 px-6 bg-white shadow-sm border-b border-slate-200 sticky top-0 z-30'>
      <div className='flex items-center gap-5'>
        {/* Trigger Sidebar dibalut box elegan */}
        <div className='p-1.5 bg-slate-50 border border-slate-200 rounded-md hover:bg-slate-100 transition-colors cursor-pointer'>
          <SidebarTrigger className='text-slate-600 w-5 h-5' />
        </div>

        {/* Search Bar Global */}
        <div className='hidden md:flex relative w-72 group'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors' />
          <Input
            type='text'
            placeholder='Ketik untuk mencari...'
            className='pl-10 bg-slate-100/70 border-transparent focus-visible:bg-white focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/20 h-10 rounded-full text-sm transition-all shadow-inner'
          />
        </div>
      </div>

      <div className='flex items-center gap-3'>
        {/* Tombol Notifikasi */}
        <Button
          variant='ghost'
          size='icon'
          className='relative text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full h-10 w-10'
        >
          <Bell className='w-5 h-5' />
          <span className='absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white'></span>
        </Button>

        {/* Pemisah Vertikal */}
        <div className='h-6 w-px bg-slate-200 mx-1'></div>

        {/* Dropdown Profil */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='relative h-10 px-2 rounded-full hover:bg-slate-50 flex items-center gap-2'
            >
              <Avatar className='h-8 w-8 border border-slate-200 shadow-sm'>
                <AvatarImage src='https://github.com/shadcn.png' alt='User' />
                <AvatarFallback className='bg-primary/10 text-primary font-bold'>
                  AD
                </AvatarFallback>
              </Avatar>
              <div className='hidden md:flex flex-col items-start text-left'>
                <span className='text-sm font-semibold text-slate-800 leading-none'>
                  Admin Ganteng
                </span>
                <span className='text-[10px] text-slate-500 mt-1 leading-none'>
                  Super Admin
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56 mt-2' align='end' forceMount>
            <DropdownMenuLabel className='font-normal'>
              <div className='flex flex-col space-y-1'>
                <p className='text-sm font-medium leading-none text-slate-800'>
                  Admin Ganteng
                </p>
                <p className='text-xs leading-none text-slate-500'>
                  admin@pt-aaa.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='cursor-pointer'>
              <User className='mr-2 h-4 w-4' /> Profil Saya
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='text-red-600 cursor-pointer font-medium'>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
