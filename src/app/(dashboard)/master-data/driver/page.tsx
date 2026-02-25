'use client';

import { useState } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  IdCard,
  Phone,
  UserCircle,
} from 'lucide-react';
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';

// Mock Data Driver
const mockDrivers = [
  {
    id: 1,
    nama: 'Ahmad Santoso',
    noHp: '081234567890',
    nik: '3273012345678901',
    status: 'Aktif',
  },
  {
    id: 2,
    nama: 'Budi Setiawan',
    noHp: '081987654321',
    nik: '3273098765432109',
    status: 'Sedang Jalan',
  },
  {
    id: 3,
    nama: 'Cecep Supriatna',
    noHp: '081555666777',
    nik: '3273055566677788',
    status: 'Cuti',
  },
];

export default function DriverPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='space-y-6'>
      {/* Header Halaman */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight text-slate-800 flex items-center gap-2'>
            <IdCard className='w-6 h-6 text-primary' />
            Data Driver
          </h2>
          <p className='text-sm text-slate-500'>
            Kelola informasi pengemudi armada GTM (Gas Transport Module).
          </p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className='bg-primary hover:bg-primary/90'>
              <Plus className='w-4 h-4 mr-2' />
              Tambah Driver
            </Button>
          </DialogTrigger>

          {/* Modal Form Tambah Driver */}
          <DialogContent className='sm:max-w-[450px]'>
            <DialogHeader>
              <DialogTitle>Tambah Data Driver Baru</DialogTitle>
              <DialogDescription>
                Masukkan data identitas pengemudi yang valid sesuai KTP.
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='space-y-2'>
                <Label htmlFor='nama' className='flex items-center gap-1'>
                  <UserCircle className='w-4 h-4 text-slate-500' />
                  Nama Lengkap
                </Label>
                <Input id='nama' placeholder='Contoh: Ahmad Santoso' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='noHp' className='flex items-center gap-1'>
                  <Phone className='w-4 h-4 text-slate-500' />
                  No. HP (WhatsApp)
                </Label>
                <Input id='noHp' type='tel' placeholder='08...' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='nik' className='flex items-center gap-1'>
                  <IdCard className='w-4 h-4 text-slate-500' />
                  Nomor Induk Kependudukan (NIK)
                </Label>
                <Input
                  id='nik'
                  type='number'
                  placeholder='16 digit angka NIK...'
                />
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

      {/* Action Bar (Search) */}
      <div className='flex items-center gap-2'>
        <div className='relative flex-1 max-w-sm'>
          <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-slate-500' />
          <Input
            type='search'
            placeholder='Cari nama atau NIK driver...'
            className='pl-8 bg-white'
          />
        </div>
      </div>

      {/* Tabel Data Driver */}
      <div className='border rounded-lg bg-white overflow-hidden'>
        <Table>
          <TableHeader className='bg-slate-50'>
            <TableRow>
              <TableHead className='font-semibold text-slate-700'>
                Nama Lengkap
              </TableHead>
              <TableHead className='font-semibold text-slate-700'>
                No. HP
              </TableHead>
              <TableHead className='font-semibold text-slate-700'>
                NIK KTP
              </TableHead>
              <TableHead className='font-semibold text-slate-700 text-center'>
                Status
              </TableHead>
              <TableHead className='text-right font-semibold text-slate-700'>
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockDrivers.map((driver) => (
              <TableRow key={driver.id} className='hover:bg-slate-50/50'>
                <TableCell className='font-medium text-slate-800'>
                  {driver.nama}
                </TableCell>
                <TableCell className='text-slate-600'>{driver.noHp}</TableCell>
                <TableCell className='text-slate-600 font-mono text-sm'>
                  {driver.nik}
                </TableCell>
                <TableCell className='text-center'>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      driver.status === 'Aktif'
                        ? 'bg-emerald-100 text-emerald-800'
                        : driver.status === 'Sedang Jalan'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    {driver.status}
                  </span>
                </TableCell>
                <TableCell className='text-right'>
                  <div className='flex justify-end gap-2'>
                    <Button variant='ghost' size='icon' title='Edit Data'>
                      <Edit className='w-4 h-4 text-orange-500' />
                    </Button>
                    <Button variant='ghost' size='icon' title='Hapus Data'>
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
