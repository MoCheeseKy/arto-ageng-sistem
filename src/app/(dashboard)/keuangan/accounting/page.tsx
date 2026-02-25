'use client';

import {
  BookOpen,
  FileSpreadsheet,
  FileText,
  PieChart,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Helper Format Rupiah
const formatRupiah = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
};

// Mock Data Chart of Account (CoA)
const mockCoA = [
  { kode: '1110', nama: 'Kas di Tangan', tipe: 'Asset' },
  { kode: '1120', nama: 'Rekening Bank BCA', tipe: 'Asset' },
  { kode: '1130', nama: 'Piutang Usaha (Invoice)', tipe: 'Asset' },
  { kode: '2110', nama: 'Deposit Customer', tipe: 'Kewajiban' },
  { kode: '4110', nama: 'Pendapatan Penjualan Gas', tipe: 'Pendapatan' },
  { kode: '5110', nama: 'Biaya Operasional GTM', tipe: 'Beban' },
];

// Mock Data Auto Jurnal
const mockJurnal = [
  {
    tanggal: '2026-02-25',
    referensi: 'INV-2026-001',
    deskripsi: 'Pendapatan Penjualan Gas PT. Maju Mundur',
    akun: '1130 - Piutang Usaha',
    debit: 4750000,
    kredit: 0,
  },
  {
    tanggal: '2026-02-25',
    referensi: 'INV-2026-001',
    deskripsi: 'Pendapatan Penjualan Gas PT. Maju Mundur',
    akun: '4110 - Pendapatan Penjualan Gas',
    debit: 0,
    kredit: 4750000,
  },
  {
    tanggal: '2026-02-24',
    referensi: 'DEP-001',
    deskripsi: 'Penerimaan Deposit CV. Sejahtera',
    akun: '1120 - Rekening Bank BCA',
    debit: 10000000,
    kredit: 0,
  },
  {
    tanggal: '2026-02-24',
    referensi: 'DEP-001',
    deskripsi: 'Penerimaan Deposit CV. Sejahtera',
    akun: '2110 - Deposit Customer',
    debit: 0,
    kredit: 10000000,
  },
];

export default function AccountingPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-bold tracking-tight text-slate-800'>
          Accounting & Laporan
        </h2>
        <p className='text-sm text-slate-500'>
          Pusat data jurnal otomatis, Chart of Account (CoA), dan pencetakan
          laporan keuangan.
        </p>
      </div>

      <Tabs defaultValue='jurnal' className='w-full'>
        <TabsList className='grid w-full max-w-2xl grid-cols-3 mb-4'>
          <TabsTrigger value='jurnal'>Auto Jurnal</TabsTrigger>
          <TabsTrigger value='coa'>Chart of Account (CoA)</TabsTrigger>
          <TabsTrigger value='laporan'>Laporan Keuangan</TabsTrigger>
        </TabsList>

        {/* --- TAB: AUTO JURNAL --- */}
        <TabsContent value='jurnal' className='space-y-4'>
          <Card>
            <CardHeader className='pb-4'>
              <div className='flex justify-between items-center'>
                <div>
                  <CardTitle className='text-lg'>
                    Buku Jurnal Umum (Auto Jurnal)
                  </CardTitle>
                  <CardDescription>
                    Jurnal ini ter-generate otomatis dari modul Invoice, Kas,
                    dan Deposit.
                  </CardDescription>
                </div>
                <div className='flex gap-2'>
                  <Input type='month' className='w-40' />
                  <Button variant='outline'>
                    <FileSpreadsheet className='w-4 h-4 mr-2' /> Export Excel
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>No. Referensi</TableHead>
                    <TableHead>Akun CoA</TableHead>
                    <TableHead>Deskripsi</TableHead>
                    <TableHead className='text-right'>Debit</TableHead>
                    <TableHead className='text-right'>Kredit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockJurnal.map((item, idx) => (
                    <TableRow
                      key={idx}
                      className={item.kredit > 0 ? 'bg-slate-50/50' : ''}
                    >
                      <TableCell>{item.tanggal}</TableCell>
                      <TableCell className='font-medium'>
                        {item.referensi}
                      </TableCell>
                      <TableCell
                        className={
                          item.kredit > 0
                            ? 'pl-8'
                            : 'font-semibold text-slate-700'
                        }
                      >
                        {item.akun}
                      </TableCell>
                      <TableCell className='text-slate-600'>
                        {item.deskripsi}
                      </TableCell>
                      <TableCell className='text-right text-emerald-600 font-medium'>
                        {item.debit > 0 ? formatRupiah(item.debit) : '-'}
                      </TableCell>
                      <TableCell className='text-right text-orange-600 font-medium'>
                        {item.kredit > 0 ? formatRupiah(item.kredit) : '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- TAB: CHART OF ACCOUNT --- */}
        <TabsContent value='coa'>
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>
                Daftar Chart of Account (CoA)
              </CardTitle>
              <CardDescription>
                Kode akun yang digunakan dalam sistem sesuai dengan excel
                LK[cite: 144].
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kode Akun</TableHead>
                    <TableHead>Nama Akun</TableHead>
                    <TableHead>Tipe Akun</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCoA.map((coa, idx) => (
                    <TableRow key={idx}>
                      <TableCell className='font-bold text-slate-700'>
                        {coa.kode}
                      </TableCell>
                      <TableCell>{coa.nama}</TableCell>
                      <TableCell>
                        <span className='bg-slate-100 px-2 py-1 rounded text-xs font-medium'>
                          {coa.tipe}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- TAB: LAPORAN KEUANGAN --- */}
        <TabsContent value='laporan' className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <Card className='hover:border-primary cursor-pointer transition-colors border-t-4 border-t-blue-500'>
              <CardHeader className='pb-2'>
                <BookOpen className='w-8 h-8 text-blue-500 mb-2' />
                <CardTitle className='text-md'>Buku Besar</CardTitle>
                <CardDescription className='text-xs'>
                  Rincian mutasi per akun.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className='w-full mt-2' variant='secondary'>
                  Generate Laporan
                </Button>
              </CardContent>
            </Card>

            <Card className='hover:border-primary cursor-pointer transition-colors border-t-4 border-t-emerald-500'>
              <CardHeader className='pb-2'>
                <PieChart className='w-8 h-8 text-emerald-500 mb-2' />
                <CardTitle className='text-md'>
                  Neraca (Balance Sheet)
                </CardTitle>
                <CardDescription className='text-xs'>
                  Posisi aset, kewajiban, modal.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className='w-full mt-2' variant='secondary'>
                  Generate Laporan
                </Button>
              </CardContent>
            </Card>

            <Card className='hover:border-primary cursor-pointer transition-colors border-t-4 border-t-orange-500'>
              <CardHeader className='pb-2'>
                <TrendingUp className='w-8 h-8 text-orange-500 mb-2' />
                <CardTitle className='text-md'>Laba Rugi</CardTitle>
                <CardDescription className='text-xs'>
                  Laporan profitabilitas (P&L).
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className='w-full mt-2' variant='secondary'>
                  Generate Laporan
                </Button>
              </CardContent>
            </Card>

            <Card className='hover:border-primary cursor-pointer transition-colors border-t-4 border-t-purple-500'>
              <CardHeader className='pb-2'>
                <FileText className='w-8 h-8 text-purple-500 mb-2' />
                <CardTitle className='text-md'>Arus Kas</CardTitle>
                <CardDescription className='text-xs'>
                  Laporan Cash Flow.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className='w-full mt-2' variant='secondary'>
                  Generate Laporan
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
