'use client';

import { useState } from 'react';
import { Plus, Search, Edit, Trash2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

// Mock Data Profil Supplier sesuai spesifikasi dokumen
const mockSuppliers = [
  {
    id: 1,
    namaPerusahaan: 'PT. Gas Bumi Nusantara',
    alamat: 'Jl. Industri Raya No. 15, Jakarta',
    noTelp: '021-5551234',
    pic: 'Budi Santoso',
    noHpPic: '081234567890',
  },
  {
    id: 2,
    namaPerusahaan: 'CV. Energi Prima',
    alamat: 'Kawasan Industri Cikarang Blok B',
    noTelp: '021-8889991',
    pic: 'Siti Aminah',
    noHpPic: '081987654321',
  },
];

export default function SupplierPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='space-y-6'>
      {/* Header Halaman */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight text-slate-800'>
            Data Supplier
          </h2>
          <p className='text-sm text-slate-500'>
            Kelola data profil supplier dan pantau riwayat transaksinya.
          </p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className='bg-primary hover:bg-primary/90'>
              <Plus className='w-4 h-4 mr-2' />
              Tambah Supplier
            </Button>
          </DialogTrigger>

          {/* Modal Form Tambah Supplier */}
          <DialogContent className='sm:max-w-[500px]'>
            <DialogHeader>
              <DialogTitle>Tambah Supplier Baru</DialogTitle>
              <DialogDescription>
                Masukkan detail profil supplier di bawah ini. Pastikan kontak
                PIC valid.
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='nama'
                  className='text-right text-sm font-medium'
                >
                  Nama Perusahaan
                </Label>
                <Input
                  id='nama'
                  placeholder='PT. / CV. ...'
                  className='col-span-3'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='alamat'
                  className='text-right text-sm font-medium'
                >
                  Alamat
                </Label>
                <Input
                  id='alamat'
                  placeholder='Alamat lengkap'
                  className='col-span-3'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='telp'
                  className='text-right text-sm font-medium'
                >
                  No. Telp
                </Label>
                <Input id='telp' placeholder='021-...' className='col-span-3' />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='pic' className='text-right text-sm font-medium'>
                  Nama PIC
                </Label>
                <Input
                  id='pic'
                  placeholder='Nama penanggung jawab'
                  className='col-span-3'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='hppic'
                  className='text-right text-sm font-medium'
                >
                  No. HP PIC
                </Label>
                <Input id='hppic' placeholder='08...' className='col-span-3' />
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
                Simpan Data
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Action Bar (Search & Filter) */}
      <div className='flex items-center gap-2'>
        <div className='relative flex-1 max-w-sm'>
          <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-slate-500' />
          <Input
            type='search'
            placeholder='Cari nama perusahaan atau PIC...'
            className='pl-8 bg-white'
          />
        </div>
      </div>

      {/* Tabel Data Supplier */}
      <div className='border rounded-lg bg-white overflow-hidden'>
        <Table>
          <TableHeader className='bg-slate-50'>
            <TableRow>
              <TableHead className='font-semibold text-slate-700'>
                Nama Perusahaan
              </TableHead>
              <TableHead className='font-semibold text-slate-700'>
                Alamat
              </TableHead>
              <TableHead className='font-semibold text-slate-700'>
                No. Telp
              </TableHead>
              <TableHead className='font-semibold text-slate-700'>
                PIC
              </TableHead>
              <TableHead className='font-semibold text-slate-700'>
                No. HP PIC
              </TableHead>
              <TableHead className='text-right font-semibold text-slate-700'>
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockSuppliers.map((supplier) => (
              <TableRow key={supplier.id} className='hover:bg-slate-50/50'>
                <TableCell className='font-medium text-slate-800'>
                  {supplier.namaPerusahaan}
                </TableCell>
                <TableCell className='text-slate-600'>
                  {supplier.alamat}
                </TableCell>
                <TableCell className='text-slate-600'>
                  {supplier.noTelp}
                </TableCell>
                <TableCell className='text-slate-600'>{supplier.pic}</TableCell>
                <TableCell className='text-slate-600'>
                  {supplier.noHpPic}
                </TableCell>
                <TableCell className='text-right'>
                  <div className='flex justify-end gap-2'>
                    <Button
                      variant='ghost'
                      size='icon'
                      title='Lihat Riwayat Transaksi'
                    >
                      <FileText className='w-4 h-4 text-blue-500' />
                    </Button>
                    <Button variant='ghost' size='icon' title='Edit'>
                      <Edit className='w-4 h-4 text-orange-500' />
                    </Button>
                    <Button variant='ghost' size='icon' title='Hapus'>
                      <Trash2 className='w-4 h-4 text-red-500' />
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
