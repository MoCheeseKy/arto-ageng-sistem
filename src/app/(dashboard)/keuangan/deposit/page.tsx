'use client';

import { useState } from 'react';
import { Plus, Wallet, AlertCircle, ArrowUpRight, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';

// Helper format Rupiah
const formatRupiah = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(value);
};

// Mock Data Wallet Customer
const mockWallets = [
  {
    id: 'cust1',
    nama: 'PT. Maju Mundur',
    saldo: 2500000,
    minSaldo: 5000000,
    status: 'Warning',
  },
  {
    id: 'cust2',
    nama: 'CV. Sejahtera',
    saldo: 15000000,
    minSaldo: 5000000,
    status: 'Aman',
  },
];

// Mock Data Histori Top Up
const mockHistory = [
  {
    id: 'TOP-001',
    tanggal: '2026-02-25',
    customer: 'PT. Maju Mundur',
    jumlah: 10000000,
  },
  {
    id: 'TOP-002',
    tanggal: '2026-02-20',
    customer: 'CV. Sejahtera',
    jumlah: 25000000,
  },
];

export default function DepositPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [jumlahTopup, setJumlahTopup] = useState<number>(0);

  // Filter customer yang saldonya di bawah batas minimum
  const warningWallets = mockWallets.filter((w) => w.saldo < w.minSaldo);

  return (
    <div className='space-y-6'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight text-slate-800'>
            Deposit Customer
          </h2>
          <p className='text-sm text-slate-500'>
            Kelola sistem wallet deposit dan pantau histori top-up pelanggan.
          </p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className='bg-primary hover:bg-primary/90'>
              <Plus className='w-4 h-4 mr-2' />
              Input Top-Up Baru
            </Button>
          </DialogTrigger>

          <DialogContent className='sm:max-w-[500px]'>
            <DialogHeader>
              <DialogTitle className='flex items-center gap-2'>
                <Wallet className='w-5 h-5 text-blue-500' />
                Form Top-Up Deposit
              </DialogTitle>
            </DialogHeader>

            <div className='grid gap-4 py-4'>
              <div className='space-y-2'>
                <Label>Tanggal</Label>
                <Input type='date' />
              </div>
              <div className='space-y-2'>
                <Label>Pilih Customer</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder='Pilih Customer...' />
                  </SelectTrigger>
                  <SelectContent>
                    {mockWallets.map((w) => (
                      <SelectItem key={w.id} value={w.id}>
                        {w.nama}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-2'>
                <Label>Jumlah Top-Up (Rp)</Label>
                <Input
                  type='number'
                  value={jumlahTopup}
                  onChange={(e) => setJumlahTopup(Number(e.target.value))}
                  placeholder='Masukkan nominal...'
                />
              </div>

              <div className='bg-slate-50 p-4 rounded-lg border mt-2 flex justify-between items-center'>
                <span className='text-sm text-slate-500'>Total Diterima:</span>
                <span className='text-xl font-bold text-emerald-600'>
                  {formatRupiah(jumlahTopup)}
                </span>
              </div>
            </div>

            <DialogFooter>
              <Button
                type='button'
                variant='outline'
                onClick={() => setIsOpen(false)}
              >
                Batal
              </Button>
              <Button type='submit' onClick={() => setIsOpen(false)}>
                Simpan Deposit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Notifikasi Saldo Minimum */}
      {warningWallets.length > 0 && (
        <Alert
          variant='destructive'
          className='bg-red-50 border-red-200 text-red-800'
        >
          <AlertCircle className='h-4 w-4 stroke-red-600' />
          <AlertTitle className='text-red-800 font-bold'>
            Peringatan Saldo Minimum!
          </AlertTitle>
          <AlertDescription>
            Terdapat {warningWallets.length} customer yang saldonya hampir
            habis. Segera hubungi untuk melakukan top-up.
            <ul className='list-disc ml-5 mt-2 text-sm'>
              {warningWallets.map((w) => (
                <li key={w.id}>
                  <strong>{w.nama}</strong> - Sisa Saldo:{' '}
                  {formatRupiah(w.saldo)} (Min: {formatRupiah(w.minSaldo)})
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Card Saldo Wallet */}
        <Card className='border-t-4 border-t-blue-500'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-lg flex items-center gap-2'>
              <Wallet className='w-5 h-5' /> Saldo Wallet Aktif
            </CardTitle>
            <CardDescription>
              Ringkasan deposit customer saat ini.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className='text-right'>Sisa Saldo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockWallets.map((wallet) => (
                  <TableRow key={wallet.id}>
                    <TableCell className='font-medium'>{wallet.nama}</TableCell>
                    <TableCell
                      className={`text-right font-bold ${wallet.status === 'Warning' ? 'text-red-600' : 'text-emerald-600'}`}
                    >
                      {formatRupiah(wallet.saldo)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Card Histori Top Up */}
        <Card className='border-t-4 border-t-emerald-500'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-lg flex items-center gap-2'>
              <History className='w-5 h-5' /> Rekap Histori Top-Up
            </CardTitle>
            <CardDescription>Riwayat penerimaan dana deposit.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className='text-right'>Jumlah</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockHistory.map((hist) => (
                  <TableRow key={hist.id}>
                    <TableCell className='text-slate-500'>
                      {hist.tanggal}
                    </TableCell>
                    <TableCell className='font-medium'>
                      {hist.customer}
                    </TableCell>
                    <TableCell className='text-right text-emerald-600 font-medium flex items-center justify-end gap-1'>
                      <ArrowUpRight className='w-3 h-3' />
                      {formatRupiah(hist.jumlah)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
