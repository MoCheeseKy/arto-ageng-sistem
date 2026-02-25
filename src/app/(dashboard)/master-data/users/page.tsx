'use client';

import { useState } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ShieldAlert,
  KeyRound,
  UserCog,
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

// Mock Data Users
const mockUsers = [
  {
    id: 1,
    nama: 'Budi Administrator',
    username: 'budi.admin',
    jabatan: 'Super Admin',
  },
  {
    id: 2,
    nama: 'Siti Keuangan',
    username: 'siti.finance',
    jabatan: 'Finance',
  },
  {
    id: 3,
    nama: 'Agus Operasional',
    username: 'agus.ops',
    jabatan: 'Operasional',
  },
];

export default function UserManagementPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='space-y-6'>
      {/* Header Halaman */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight text-slate-800 flex items-center gap-2'>
            <UserCog className='w-6 h-6 text-primary' />
            User Management
          </h2>
          <p className='text-sm text-slate-500'>
            Kelola hak akses, username, dan jabatan pengguna sistem.
          </p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className='bg-primary hover:bg-primary/90'>
              <Plus className='w-4 h-4 mr-2' />
              Tambah User
            </Button>
          </DialogTrigger>

          {/* Modal Form Tambah User */}
          <DialogContent className='sm:max-w-[450px]'>
            <DialogHeader>
              <DialogTitle>Tambah Pengguna Baru</DialogTitle>
              <DialogDescription>
                Buat kredensial login untuk staf baru.
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='space-y-2'>
                <Label htmlFor='nama'>Nama Lengkap</Label>
                <Input id='nama' placeholder='Contoh: John Doe' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='username'>Username</Label>
                <Input id='username' placeholder='john.doe' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='password'>Password</Label>
                <div className='relative'>
                  <KeyRound className='absolute left-2.5 top-2.5 h-4 w-4 text-slate-500' />
                  <Input
                    id='password'
                    type='password'
                    placeholder='••••••••'
                    className='pl-8'
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <Label>Jabatan / Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder='Pilih Jabatan...' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='admin'>Super Admin</SelectItem>
                    <SelectItem value='finance'>Finance / Keuangan</SelectItem>
                    <SelectItem value='operasional'>Operasional</SelectItem>
                    <SelectItem value='owner'>Owner</SelectItem>
                  </SelectContent>
                </Select>
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
                Simpan Akun
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
            placeholder='Cari nama atau username...'
            className='pl-8 bg-white'
          />
        </div>
      </div>

      {/* Tabel Data Users */}
      <div className='border rounded-lg bg-white overflow-hidden'>
        <Table>
          <TableHeader className='bg-slate-50'>
            <TableRow>
              <TableHead className='font-semibold text-slate-700'>
                Nama Lengkap
              </TableHead>
              <TableHead className='font-semibold text-slate-700'>
                Username
              </TableHead>
              <TableHead className='font-semibold text-slate-700'>
                Jabatan
              </TableHead>
              <TableHead className='text-right font-semibold text-slate-700'>
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUsers.map((user) => (
              <TableRow key={user.id} className='hover:bg-slate-50/50'>
                <TableCell className='font-medium text-slate-800'>
                  {user.nama}
                </TableCell>
                <TableCell className='text-slate-600'>
                  {user.username}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.jabatan === 'Super Admin'
                        ? 'bg-purple-100 text-purple-700'
                        : user.jabatan === 'Finance'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {user.jabatan}
                  </span>
                </TableCell>
                <TableCell className='text-right'>
                  <div className='flex justify-end gap-2'>
                    <Button variant='ghost' size='icon' title='Reset Password'>
                      <ShieldAlert className='w-4 h-4 text-orange-500' />
                    </Button>
                    <Button variant='ghost' size='icon' title='Edit Data'>
                      <Edit className='w-4 h-4 text-blue-500' />
                    </Button>
                    <Button variant='ghost' size='icon' title='Hapus Akun'>
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
