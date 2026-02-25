'use client';

import { useState } from 'react';
import {
  Plus,
  Search,
  FileText,
  Download,
  CheckCircle2,
  Clock,
} from 'lucide-react';
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
import { Checkbox } from '@/components/ui/checkbox';
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

// Helper untuk format Rupiah
const formatRupiah = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
};

// Mock Data Pemakaian yang Belum Di-invoice (Untuk form tambah)
const mockPemakaianPending = [
  {
    id: 1,
    tanggal: '2026-02-20',
    nopol: 'B 1234 XYZ',
    sm3: 500,
    total: 2500000,
  },
  {
    id: 2,
    tanggal: '2026-02-22',
    nopol: 'B 1234 XYZ',
    sm3: 450,
    total: 2250000,
  },
];

// Mock Data History Invoice (Untuk tabel utama)
const mockInvoices = [
  {
    id: 'INV-2026-001',
    customer: 'PT. Maju Mundur',
    tanggal: '2026-02-25',
    periode: '20 Feb - 22 Feb 2026',
    totalTagihan: 4750000,
    status: 'Lunas (Potong Deposit)',
  },
  {
    id: 'INV-2026-002',
    customer: 'CV. Sejahtera',
    tanggal: '2026-02-24',
    periode: '15 Feb - 20 Feb 2026',
    totalTagihan: 12500000,
    status: 'Menunggu Pembayaran',
  },
];

export default function InvoicePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<string>('');

  // State untuk checklist pemakaian
  const [selectedPemakaian, setSelectedPemakaian] = useState<number[]>([]);

  // Simulasi kalkulasi otomatis
  const saldoDeposit = selectedCustomer === 'cust1' ? 10000000 : 0;
  const isTopUp = selectedCustomer === 'cust1'; // Asumsi cust1 pakai sistem top-up

  const subtotal = mockPemakaianPending
    .filter((p) => selectedPemakaian.includes(p.id))
    .reduce((acc, curr) => acc + curr.total, 0);

  // Jika sistem top-up, tagihan dikurangi deposit
  const sisaTagihan = isTopUp ? Math.max(0, subtotal - saldoDeposit) : subtotal;

  const togglePemakaian = (id: number) => {
    setSelectedPemakaian((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div className='space-y-6'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight text-slate-800'>
            Invoice Tagihan
          </h2>
          <p className='text-sm text-slate-500'>
            Generate invoice dari data pemakaian dan pantau status
            pembayarannya.
          </p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className='bg-primary hover:bg-primary/90'>
              <Plus className='w-4 h-4 mr-2' />
              Buat Invoice Baru
            </Button>
          </DialogTrigger>

          <DialogContent className='sm:max-w-[700px] max-h-[90vh] overflow-y-auto'>
            <DialogHeader>
              <DialogTitle>Generate Invoice Baru</DialogTitle>
            </DialogHeader>

            <div className='grid gap-6 py-4'>
              {/* Info Dasar Invoice */}
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label>Customer</Label>
                  <Select
                    value={selectedCustomer}
                    onValueChange={setSelectedCustomer}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Pilih Customer...' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='cust1'>
                        PT. Maju Mundur (Sistem Top-Up)
                      </SelectItem>
                      <SelectItem value='cust2'>
                        CV. Sejahtera (Jaminan Deposit)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label>Nomor PO (Opsional)</Label>
                  <Input placeholder='PO/2026/...' />
                </div>
                <div className='space-y-2'>
                  <Label>Tanggal Invoice</Label>
                  <Input type='date' />
                </div>
                <div className='space-y-2'>
                  <Label>Periode Pemakaian (Start - End)</Label>
                  <Input placeholder='Contoh: 01 Feb - 28 Feb 2026' />
                </div>
              </div>

              {/* List Pemakaian untuk dipilih  */}
              {selectedCustomer && (
                <div className='space-y-3 border rounded-lg p-4 bg-slate-50'>
                  <Label className='font-semibold text-slate-700'>
                    Pilih Data Pemakaian
                  </Label>
                  <div className='space-y-2'>
                    {mockPemakaianPending.map((item) => (
                      <div
                        key={item.id}
                        className='flex items-center space-x-3 bg-white p-3 rounded border'
                      >
                        <Checkbox
                          id={`pemakaian-${item.id}`}
                          checked={selectedPemakaian.includes(item.id)}
                          onCheckedChange={() => togglePemakaian(item.id)}
                        />
                        <div className='flex-1 flex justify-between'>
                          <Label
                            htmlFor={`pemakaian-${item.id}`}
                            className='cursor-pointer'
                          >
                            {item.tanggal} - Plat: {item.nopol} ({item.sm3} Sm3)
                          </Label>
                          <span className='font-medium'>
                            {formatRupiah(item.total)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ringkasan Kalkulasi  */}
              <div className='bg-slate-800 text-white rounded-lg p-5 space-y-3'>
                <div className='flex justify-between text-slate-300 text-sm'>
                  <span>Subtotal Pemakaian:</span>
                  <span>{formatRupiah(subtotal)}</span>
                </div>
                {isTopUp && (
                  <div className='flex justify-between text-orange-300 text-sm border-b border-slate-600 pb-2'>
                    <span>Potongan Saldo Deposit:</span>
                    <span>
                      - {formatRupiah(Math.min(subtotal, saldoDeposit))}
                    </span>
                  </div>
                )}
                <div className='flex justify-between items-center pt-2'>
                  <span className='font-bold text-lg'>
                    Total Tagihan Akhir:
                  </span>
                  <span className='font-bold text-2xl text-emerald-400'>
                    {formatRupiah(sisaTagihan)}
                  </span>
                </div>
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
              <Button
                type='submit'
                onClick={() => setIsOpen(false)}
                disabled={selectedPemakaian.length === 0}
              >
                Generate & Simpan Invoice
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabel Data Invoice */}
      <div className='border rounded-lg bg-white overflow-hidden'>
        <Table>
          <TableHeader className='bg-slate-50'>
            <TableRow>
              <TableHead className='font-semibold text-slate-700'>
                No. Invoice
              </TableHead>
              <TableHead className='font-semibold text-slate-700'>
                Customer
              </TableHead>
              <TableHead className='font-semibold text-slate-700'>
                Tanggal
              </TableHead>
              <TableHead className='font-semibold text-slate-700'>
                Periode
              </TableHead>
              <TableHead className='font-semibold text-slate-700 text-right'>
                Total Tagihan
              </TableHead>
              <TableHead className='font-semibold text-slate-700 text-center'>
                Status
              </TableHead>
              <TableHead className='font-semibold text-slate-700 text-right'>
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockInvoices.map((inv) => (
              <TableRow key={inv.id} className='hover:bg-slate-50/50'>
                <TableCell className='font-medium text-slate-800'>
                  {inv.id}
                </TableCell>
                <TableCell className='text-slate-600'>{inv.customer}</TableCell>
                <TableCell className='text-slate-600'>{inv.tanggal}</TableCell>
                <TableCell className='text-slate-600'>{inv.periode}</TableCell>
                <TableCell className='text-right font-bold text-slate-700'>
                  {formatRupiah(inv.totalTagihan)}
                </TableCell>
                <TableCell className='text-center'>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      inv.status.includes('Lunas')
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}
                  >
                    {inv.status.includes('Lunas') ? (
                      <CheckCircle2 className='w-3 h-3' />
                    ) : (
                      <Clock className='w-3 h-3' />
                    )}
                    {inv.status}
                  </span>
                </TableCell>
                <TableCell className='text-right'>
                  <div className='flex justify-end gap-2'>
                    <Button variant='ghost' size='icon' title='Lihat Detail'>
                      <FileText className='w-4 h-4 text-blue-500' />
                    </Button>
                    <Button variant='ghost' size='icon' title='Download PDF'>
                      <Download className='w-4 h-4 text-slate-500' />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
