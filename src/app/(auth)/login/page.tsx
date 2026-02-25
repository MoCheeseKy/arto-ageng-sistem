'use client';

import { useState } from 'react';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

import Image from 'next/image';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
  };

  return (
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50'>
      <div className='hidden lg:flex flex-col justify-between bg-primary p-12 text-white relative overflow-hidden'>
        {/* Dekorasi Background */}
        <div className='absolute top-[-10%] left-[-10%] w-96 h-96 bg-white/10 rounded-full blur-3xl' />
        <div className='absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-blue-600/50 rounded-full blur-3xl' />

        <div className='relative z-10 flex items-center gap-4'>
          <div className='bg-white p-1.5 rounded-lg shadow-sm'>
            <Image
              src='/logo.png'
              alt='Logo PT AAA'
              width={32}
              height={32}
              className='object-contain'
            />
          </div>
          <span className='text-2xl font-bold tracking-tight'>
            PT. Arto Ageng Abadi
          </span>
        </div>

        <div className='relative z-10 space-y-6 max-w-lg'>
          <h1 className='text-4xl font-extrabold leading-tight'>
            Sistem Informasi Manajemen Operasional
          </h1>
          <p className='text-blue-100 text-lg'>
            Kelola data supplier, transaksi pengisian GTM, hingga laporan
            keuangan yang terintegrasi.
          </p>
        </div>

        <div className='relative z-10 text-sm text-blue-200'>
          © 2026 PT. Arto Ageng Abadi. All rights reserved.
        </div>
      </div>

      {/* Sisi Kanan: Form Login */}
      <div className='flex items-center justify-center p-8 lg:p-12 relative'>
        <div className='w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100'>
          <div className='space-y-2 text-center lg:text-left'>
            <h2 className='text-3xl font-bold text-slate-900'>
              Selamat Datang
            </h2>
            <p className='text-slate-500'>
              Silakan masukkan kredensial Anda untuk masuk.
            </p>
          </div>

          <form onSubmit={handleLogin} className='space-y-6 mt-8'>
            <div className='space-y-2'>
              <Label htmlFor='username'>Username / Email</Label>
              <div className='relative'>
                <Mail className='absolute left-3 top-3 h-5 w-5 text-slate-400' />
                <Input
                  id='username'
                  placeholder='admin@pt-aaa.com'
                  className='pl-10 h-12 bg-slate-50 border-slate-200 focus-visible:ring-primary/50'
                  required
                />
              </div>
            </div>

            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <Label htmlFor='password'>Password</Label>
                <a
                  href='#'
                  className='text-sm font-medium text-primary hover:underline'
                >
                  Lupa password?
                </a>
              </div>
              <div className='relative'>
                <Lock className='absolute left-3 top-3 h-5 w-5 text-slate-400' />
                <Input
                  id='password'
                  type='password'
                  placeholder='••••••••'
                  className='pl-10 h-12 bg-slate-50 border-slate-200 focus-visible:ring-primary/50'
                  required
                />
              </div>
            </div>

            <div className='flex items-center space-x-2'>
              <Checkbox id='remember' />
              <Label
                htmlFor='remember'
                className='text-sm font-normal text-slate-600 cursor-pointer'
              >
                Ingat saya di perangkat ini
              </Label>
            </div>

            <Button
              type='submit'
              className='w-full h-12 text-md font-semibold transition-all hover:shadow-lg hover:shadow-primary/25'
              disabled={isLoading}
            >
              {isLoading ? (
                'Memverifikasi...'
              ) : (
                <>
                  Masuk ke Dashboard <ArrowRight className='w-5 h-5 ml-2' />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
