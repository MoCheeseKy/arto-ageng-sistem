'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Droplet, Activity, DollarSign, CreditCard } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

// Mock Data untuk Grafik Tren Bulanan
const monthlyData = [
  { name: 'Jan', pendapatan: 40000000, pengeluaran: 24000000 },
  { name: 'Feb', pendapatan: 30000000, pengeluaran: 13980000 },
  { name: 'Mar', pendapatan: 20000000, pengeluaran: 9800000 },
  { name: 'Apr', pendapatan: 27800000, pengeluaran: 39080000 },
  { name: 'Mei', pendapatan: 18900000, pengeluaran: 4800000 },
  { name: 'Jun', pendapatan: 23900000, pengeluaran: 3800000 },
  { name: 'Jul', pendapatan: 34900000, pengeluaran: 4300000 },
];

// Fungsi formatter rupiah sederhana
const formatRupiah = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
};

export default function DashboardOwnerPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-bold tracking-tight text-slate-800'>
          Overview Dashboard
        </h2>
        <p className='text-sm text-slate-500'>
          Ringkasan operasional dan keuangan PT. Arto Ageng Abadi periode ini.
        </p>
      </div>

      {/* Grid untuk Card Metrik Utama */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
            <CardTitle className='text-sm font-medium text-slate-600'>
              Total Pengisian (Sm3)
            </CardTitle>
            <Droplet className='w-4 h-4 text-blue-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-slate-800'>12,450</div>
            <p className='text-xs text-slate-500'>+15% dari bulan lalu</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
            <CardTitle className='text-sm font-medium text-slate-600'>
              Total Pemakaian (Sm3)
            </CardTitle>
            <Activity className='w-4 h-4 text-orange-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-slate-800'>10,230</div>
            <p className='text-xs text-slate-500'>+8% dari bulan lalu</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
            <CardTitle className='text-sm font-medium text-slate-600'>
              Total Pendapatan
            </CardTitle>
            <DollarSign className='w-4 h-4 text-emerald-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-slate-800'>Rp 450.2M</div>
            <p className='text-xs text-slate-500'>+22% dari bulan lalu</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
            <CardTitle className='text-sm font-medium text-slate-600'>
              Total Pengeluaran
            </CardTitle>
            <CreditCard className='w-4 h-4 text-red-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-slate-800'>Rp 120.5M</div>
            <p className='text-xs text-slate-500'>-4% dari bulan lalu</p>
          </CardContent>
        </Card>
      </div>

      {/* Area Grafik Tren Bulanan */}
      <Card className='col-span-4'>
        <CardHeader>
          <CardTitle className='text-lg text-slate-800'>
            Grafik Tren Bulanan (Pendapatan vs Pengeluaran)
          </CardTitle>
        </CardHeader>
        <CardContent className='pl-2'>
          <div className='h-[350px] w-full'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray='3 3'
                  vertical={false}
                  stroke='#e2e8f0'
                />
                <XAxis
                  dataKey='name'
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  tickFormatter={(value) => `Rp ${value / 1000000}M`}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <Tooltip
                  formatter={(value) =>
                    formatRupiah(typeof value === 'number' ? value : 0)
                  }
                  cursor={{ fill: '#f1f5f9' }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar
                  dataKey='pendapatan'
                  name='Pendapatan'
                  fill='#10b981'
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey='pengeluaran'
                  name='Pengeluaran'
                  fill='#ef4444'
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
