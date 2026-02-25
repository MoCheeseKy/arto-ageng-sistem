'use client';

import { useState } from 'react';
import {
  Plus,
  Search,
  Edit,
  FileText,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

// Mock Data Customer
const mockCustomers = [
  {
    id: 1,
    namaPerusahaan: 'PT. Maju Mundur',
    pic: 'Andi Wijaya',
    jenisKontrak: 'Key Term',
    status: 'Aktif',
    saldoDeposit: 50000000,
  },
  {
    id: 2,
    namaPerusahaan: 'CV. Sejahtera',
    pic: 'Budi Santoso',
    jenisKontrak: 'PJBG',
    status: 'Nonaktif',
    saldoDeposit: 0,
  },
];

export default function CustomerPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [jenisKontrak, setJenisKontrak] = useState<string>('key_term');
  const [jenisHarga, setJenisHarga] = useState<string>('flat');

  return (
    <div className='space-y-6'>
      {/* Header Halaman */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight text-slate-800'>
            Data Customer & Kontrak
          </h2>
          <p className='text-sm text-slate-500'>
            Kelola profil customer, status aktif, deposit, serta detail kontrak
            (Key Term / PJBG).
          </p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className='bg-primary hover:bg-primary/90'>
              <Plus className='w-4 h-4 mr-2' />
              Tambah Customer
            </Button>
          </DialogTrigger>

          {/* Modal Form Tambah Customer (Ukuran Besar karena form banyak) */}
          <DialogContent className='sm:max-w-[700px] max-h-[90vh] overflow-y-auto'>
            <DialogHeader>
              <DialogTitle>Form Customer & Kontrak Baru</DialogTitle>
            </DialogHeader>

            <Tabs defaultValue='profil' className='w-full mt-4'>
              <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger value='profil'>Profil Customer</TabsTrigger>
                <TabsTrigger value='kontrak'>Detail Kontrak</TabsTrigger>
              </TabsList>

              {/* --- TAB: PROFIL CUSTOMER --- */}
              <TabsContent value='profil' className='space-y-4 mt-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label>Nama Perusahaan</Label>
                    <Input placeholder='PT. / CV. ...' />
                  </div>
                  <div className='space-y-2'>
                    <Label>NPWP</Label>
                    <Input placeholder='00.000.000.0-000.000' />
                  </div>
                  <div className='space-y-2 col-span-2'>
                    <Label>Alamat Lengkap</Label>
                    <Input placeholder='Jalan...' />
                  </div>
                  <div className='space-y-2'>
                    <Label>No. Telepon Perusahaan</Label>
                    <Input placeholder='021-...' />
                  </div>
                  <div className='space-y-2'>
                    <Label>Status Customer</Label>
                    <Select defaultValue='aktif'>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='aktif'>Aktif</SelectItem>
                        <SelectItem value='nonaktif'>Nonaktif</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='space-y-2 border-t pt-4 mt-2 col-span-2'>
                    <h4 className='text-sm font-semibold text-slate-700'>
                      Kontak Person (PIC)
                    </h4>
                  </div>
                  <div className='space-y-2'>
                    <Label>Nama PIC</Label>
                    <Input placeholder='Nama penanggung jawab' />
                  </div>
                  <div className='space-y-2'>
                    <Label>No. HP PIC</Label>
                    <Input placeholder='08...' />
                  </div>
                </div>
              </TabsContent>

              {/* --- TAB: DETAIL KONTRAK --- */}
              <TabsContent value='kontrak' className='space-y-4 mt-4'>
                <div className='space-y-2 p-3 bg-slate-50 border rounded-md'>
                  <Label className='text-blue-600 font-semibold'>
                    Pilih Jenis Kontrak
                  </Label>
                  <Select value={jenisKontrak} onValueChange={setJenisKontrak}>
                    <SelectTrigger className='bg-white'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='key_term'>Key Term</SelectItem>
                      <SelectItem value='pjbg'>PJBG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Logika Kondisional: Form KEY TERM */}
                {jenisKontrak === 'key_term' && (
                  <div className='grid grid-cols-2 gap-4 animate-in fade-in duration-300'>
                    <div className='space-y-2'>
                      <Label>No. Penawaran</Label>
                      <Input placeholder='KTM/2026/...' />
                    </div>
                    <div className='space-y-2'>
                      <Label>Tanggal Penawaran</Label>
                      <Input type='date' />
                    </div>
                    <div className='space-y-2'>
                      <Label>Sistem Penagihan</Label>
                      <Select defaultValue='topup'>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='topup'>Top Up</SelectItem>
                          <SelectItem value='deposit'>Deposit</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='space-y-2'>
                      <Label>Skema Harga</Label>
                      <Select value={jenisHarga} onValueChange={setJenisHarga}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='flat'>Flat</SelectItem>
                          <SelectItem value='tiering'>Tiering</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {/* Muncul hanya jika harga Flat */}
                    {jenisHarga === 'flat' && (
                      <div className='space-y-2 col-span-2 bg-orange-50 p-3 rounded-md border border-orange-200'>
                        <Label className='text-orange-700'>
                          Minimum Order Quantity (MoQ)
                        </Label>
                        <Input
                          type='number'
                          placeholder='Masukkan angka MoQ...'
                          className='bg-white'
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Logika Kondisional: Form PJBG */}
                {jenisKontrak === 'pjbg' && (
                  <div className='grid grid-cols-2 gap-4 animate-in fade-in duration-300'>
                    <div className='space-y-2'>
                      <Label>Nomor PJBG</Label>
                      <Input placeholder='PJBG/2026/...' />
                    </div>
                    <div className='space-y-2'>
                      <Label>Periode Kontrak</Label>
                      <Input placeholder='Contoh: 1 Tahun' />
                    </div>
                    <div className='space-y-2'>
                      <Label>Volume Pemakaian per Bulan</Label>
                      <Input placeholder='Dalam Sm3...' />
                    </div>
                    <div className='space-y-2'>
                      <Label>Harga Gas CNG per Sm3</Label>
                      <Input type='number' placeholder='Rp...' />
                    </div>
                    <div className='space-y-2 col-span-2'>
                      <Label>Lokasi Mother Station CNG</Label>
                      <Input placeholder='Masukkan lokasi stasiun...' />
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            <DialogFooter className='mt-6 border-t pt-4'>
              <Button
                type='button'
                variant='outline'
                onClick={() => setIsOpen(false)}
              >
                Batal
              </Button>
              <Button type='submit' onClick={() => setIsOpen(false)}>
                Simpan Customer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabel Data Customer */}
      <div className='border rounded-lg bg-white overflow-hidden'>
        <Table>
          <TableHeader className='bg-slate-50'>
            <TableRow>
              <TableHead className='font-semibold text-slate-700'>
                Nama Perusahaan
              </TableHead>
              <TableHead className='font-semibold text-slate-700'>
                PIC
              </TableHead>
              <TableHead className='font-semibold text-slate-700'>
                Jenis Kontrak
              </TableHead>
              <TableHead className='font-semibold text-slate-700 text-right'>
                Saldo Deposit
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
            {mockCustomers.map((cust) => (
              <TableRow key={cust.id} className='hover:bg-slate-50/50'>
                <TableCell className='font-medium text-slate-800'>
                  {cust.namaPerusahaan}
                </TableCell>
                <TableCell className='text-slate-600'>{cust.pic}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      cust.jenisKontrak === 'Key Term'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-purple-100 text-purple-700'
                    }`}
                  >
                    {cust.jenisKontrak}
                  </span>
                </TableCell>
                <TableCell className='text-right font-medium text-slate-700'>
                  Rp {cust.saldoDeposit.toLocaleString('id-ID')}
                </TableCell>
                <TableCell className='text-center'>
                  {cust.status === 'Aktif' ? (
                    <CheckCircle2 className='w-5 h-5 text-emerald-500 mx-auto' />
                  ) : (
                    <XCircle className='w-5 h-5 text-red-500 mx-auto' />
                  )}
                </TableCell>
                <TableCell className='text-right'>
                  <div className='flex justify-end gap-2'>
                    <Button variant='ghost' size='icon' title='Detail Kontrak'>
                      <FileText className='w-4 h-4 text-slate-500' />
                    </Button>
                    <Button variant='ghost' size='icon' title='Edit'>
                      <Edit className='w-4 h-4 text-orange-500' />
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
