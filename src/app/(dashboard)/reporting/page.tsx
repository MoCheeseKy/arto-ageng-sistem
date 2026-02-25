'use client';

import { useState } from 'react';
import {
  FileText,
  Download,
  Calendar as CalendarIcon,
  Filter,
  Activity,
  Droplet,
  Wallet,
  PieChart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';

export default function ReportingPage() {
  // State sederhana untuk simulasi filter (opsional, bisa dikembangkan)
  const [periodeStart, setPeriodeStart] = useState<string>('');
  const [periodeEnd, setPeriodeEnd] = useState<string>('');

  return (
    <div className='space-y-6'>
      {/* Header Halaman */}
      <div>
        <h2 className='text-2xl font-bold tracking-tight text-slate-800 flex items-center gap-2'>
          <FileText className='w-6 h-6 text-primary' />
          Pusat Pelaporan (Reporting)
        </h2>
        <p className='text-sm text-slate-500'>
          Generate dan unduh laporan operasional serta keuangan secara periodik.
        </p>
      </div>

      {/* Filter Global (Periode) */}
      <Card className='bg-slate-50 border-dashed'>
        <CardContent className='p-4 flex flex-col sm:flex-row items-end gap-4'>
          <div className='space-y-2 flex-1'>
            <Label className='flex items-center gap-1'>
              <CalendarIcon className='w-4 h-4 text-slate-500' /> Tanggal Mulai
            </Label>
            <Input
              type='date'
              value={periodeStart}
              onChange={(e) => setPeriodeStart(e.target.value)}
            />
          </div>
          <div className='space-y-2 flex-1'>
            <Label className='flex items-center gap-1'>
              <CalendarIcon className='w-4 h-4 text-slate-500' /> Tanggal Akhir
            </Label>
            <Input
              type='date'
              value={periodeEnd}
              onChange={(e) => setPeriodeEnd(e.target.value)}
            />
          </div>
          <Button variant='outline' className='w-full sm:w-auto bg-white'>
            <Filter className='w-4 h-4 mr-2' />
            Terapkan Filter
          </Button>
        </CardContent>
      </Card>

      {/* Grid Menu Laporan */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* 1. Laporan Pemakaian per Client */}
        <Card className='border-t-4 border-t-orange-500 hover:shadow-md transition-shadow'>
          <CardHeader className='pb-2'>
            <div className='flex items-center justify-between'>
              <CardTitle className='text-lg'>Laporan Pemakaian</CardTitle>
              <Activity className='w-5 h-5 text-orange-500' />
            </div>
            <CardDescription>
              Rekapitulasi volume gas yang digunakan oleh setiap client.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4 pt-2'>
            <div className='space-y-2'>
              <Label>Filter Client Spesifik (Opsional)</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder='Semua Client' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>Semua Client</SelectItem>
                  <SelectItem value='cust1'>PT. Maju Mundur</SelectItem>
                  <SelectItem value='cust2'>CV. Sejahtera</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className='pt-0 flex gap-2'>
            <Button className='flex-1 bg-orange-600 hover:bg-orange-700'>
              Lihat Laporan
            </Button>
            <Button variant='outline' size='icon' title='Download Excel'>
              <Download className='w-4 h-4' />
            </Button>
          </CardFooter>
        </Card>

        {/* 2. Laporan Pengisian per Supplier */}
        <Card className='border-t-4 border-t-blue-500 hover:shadow-md transition-shadow'>
          <CardHeader className='pb-2'>
            <div className='flex items-center justify-between'>
              <CardTitle className='text-lg'>Laporan Pengisian</CardTitle>
              <Droplet className='w-5 h-5 text-blue-500' />
            </div>
            <CardDescription>
              Riwayat pembelian / pengisian gas GTM dari supplier.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4 pt-2'>
            <div className='space-y-2'>
              <Label>Filter Supplier Spesifik (Opsional)</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder='Semua Supplier' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>Semua Supplier</SelectItem>
                  <SelectItem value='sup1'>PT. Gas Bumi Nusantara</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className='pt-0 flex gap-2'>
            <Button className='flex-1 bg-blue-600 hover:bg-blue-700'>
              Lihat Laporan
            </Button>
            <Button variant='outline' size='icon' title='Download PDF'>
              <Download className='w-4 h-4' />
            </Button>
          </CardFooter>
        </Card>

        {/* 3. Rekap Deposit */}
        <Card className='border-t-4 border-t-emerald-500 hover:shadow-md transition-shadow'>
          <CardHeader className='pb-2'>
            <div className='flex items-center justify-between'>
              <CardTitle className='text-lg'>Rekap Deposit</CardTitle>
              <Wallet className='w-5 h-5 text-emerald-500' />
            </div>
            <CardDescription>
              Mutasi penambahan dan pemotongan saldo deposit customer.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4 pt-2'>
            <div className='space-y-2'>
              <Label>Status Saldo</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder='Semua Status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>Semua Status</SelectItem>
                  <SelectItem value='warning'>Di Bawah Minimum</SelectItem>
                  <SelectItem value='safe'>Aman</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className='pt-0 flex gap-2'>
            <Button className='flex-1 bg-emerald-600 hover:bg-emerald-700'>
              Lihat Laporan
            </Button>
            <Button variant='outline' size='icon' title='Download Excel'>
              <Download className='w-4 h-4' />
            </Button>
          </CardFooter>
        </Card>

        {/* 4. Laporan Keuangan Terpadu */}
        <Card className='border-t-4 border-t-purple-500 hover:shadow-md transition-shadow'>
          <CardHeader className='pb-2'>
            <div className='flex items-center justify-between'>
              <CardTitle className='text-lg'>Laporan Keuangan</CardTitle>
              <PieChart className='w-5 h-5 text-purple-500' />
            </div>
            <CardDescription>
              Rangkuman neraca, laba rugi, dan arus kas perusahaan.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4 pt-2'>
            <div className='space-y-2'>
              <Label>Jenis Dokumen</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder='Pilih Jenis Laporan...' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='lr'>Laba Rugi (Profit & Loss)</SelectItem>
                  <SelectItem value='neraca'>Neraca (Balance Sheet)</SelectItem>
                  <SelectItem value='arus_kas'>Arus Kas (Cash Flow)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className='pt-0 flex gap-2'>
            <Button className='flex-1 bg-purple-600 hover:bg-purple-700'>
              Generate Laporan
            </Button>
            <Button variant='outline' size='icon' title='Cetak PDF'>
              <Download className='w-4 h-4' />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
