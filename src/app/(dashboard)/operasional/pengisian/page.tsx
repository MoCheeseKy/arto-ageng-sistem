'use client';

import { useState } from 'react';
import { Plus, Calculator, Truck } from 'lucide-react';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

export default function PengisianPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [mataUang, setMataUang] = useState<string>('Rupiah');

  // State Kalkulasi (Simulasi)
  const [meterAwal, setMeterAwal] = useState<number>(0);
  const [meterAkhir, setMeterAkhir] = useState<number>(0);
  const [harga, setHarga] = useState<number>(0);
  const [kurs, setKurs] = useState<number>(15000);

  // Rumus Dummy sesuai spesifikasi list modul (Matering Fill Post, dll)
  const meteringFillPost = Math.abs(meterAkhir - meterAwal);
  const volumeMmbtu = meteringFillPost * 1.5; // Simulasi rumus MMBTU

  const totalPenjualan =
    mataUang === 'Dolar' ? volumeMmbtu * harga * kurs : volumeMmbtu * harga; // Jika rupiah

  return (
    <div className='space-y-6'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight text-slate-800'>
            Data Pengisian / Pembelian
          </h2>
          <p className='text-sm text-slate-500'>
            Catat detail pembelian gas dari supplier beserta parameter
            meterannya.
          </p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className='bg-primary hover:bg-primary/90'>
              <Plus className='w-4 h-4 mr-2' />
              Input Pengisian Baru
            </Button>
          </DialogTrigger>

          <DialogContent className='sm:max-w-[800px] max-h-[90vh] overflow-y-auto'>
            <DialogHeader>
              <DialogTitle className='flex items-center gap-2'>
                <Truck className='w-5 h-5 text-blue-500' />
                Form Data Pengisian GTM
              </DialogTitle>
            </DialogHeader>

            <div className='grid gap-6 py-4'>
              {/* Info Dasar Kendaraan & Dokumen */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4 border-b pb-4'>
                <div className='space-y-2'>
                  <Label>Tanggal</Label>
                  <Input type='date' />
                </div>
                <div className='space-y-2'>
                  <Label>Supplier</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder='Pilih Supplier...' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='sup1'>
                        PT. Gas Bumi Nusantara
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label>Nomor DO</Label>
                  <Input placeholder='DO/2026/...' />
                </div>
                <div className='space-y-2'>
                  <Label>Plat Nomor</Label>
                  <Input placeholder='B 1234 XYZ' />
                </div>
                <div className='space-y-2'>
                  <Label>Jenis GTM</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder='10FT/20FT/40FT' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='10ft'>10 FT</SelectItem>
                      <SelectItem value='20ft'>20 FT</SelectItem>
                      <SelectItem value='40ft'>40 FT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label>Nama Driver</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder='Pilih Driver...' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='drv1'>Ahmad</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Parameter Tekanan & Meteran */}
              <div className='grid grid-cols-1 md:grid-cols-4 gap-4 border-b pb-4'>
                <div className='space-y-2'>
                  <Label>GHC</Label>
                  <Input type='number' placeholder='0' />
                </div>
                <div className='space-y-2'>
                  <Label className='text-blue-600'>Pressure Start</Label>
                  <Input type='number' placeholder='Bar...' />
                </div>
                <div className='space-y-2'>
                  <Label className='text-orange-600'>Pressure Finish</Label>
                  <Input type='number' placeholder='Bar...' />
                </div>
                <div className='space-y-2 col-span-1 md:col-span-4'></div>
                <div className='space-y-2'>
                  <Label>Meter Awal</Label>
                  <Input
                    type='number'
                    value={meterAwal}
                    onChange={(e) => setMeterAwal(Number(e.target.value))}
                  />
                </div>
                <div className='space-y-2'>
                  <Label>Meter Akhir</Label>
                  <Input
                    type='number'
                    value={meterAkhir}
                    onChange={(e) => setMeterAkhir(Number(e.target.value))}
                  />
                </div>

                {/* Kalkulasi Rumus */}
                <div className='space-y-2 col-span-2 bg-slate-50 p-3 rounded-lg border flex flex-col justify-center'>
                  <Label className='text-slate-500 flex items-center gap-1'>
                    <Calculator className='w-3 h-3' /> Matering Fill Post (M3)
                  </Label>
                  <span className='text-lg font-bold text-slate-800'>
                    {meteringFillPost} M3
                  </span>
                </div>
                <div className='space-y-2 col-span-2 bg-slate-50 p-3 rounded-lg border flex flex-col justify-center'>
                  <Label className='text-slate-500 flex items-center gap-1'>
                    <Calculator className='w-3 h-3' /> Volume MMBTU (Rumus)
                  </Label>
                  <span className='text-lg font-bold text-slate-800'>
                    {volumeMmbtu}
                  </span>
                </div>
              </div>

              {/* Nilai Penjualan */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4 bg-emerald-50/50 p-4 rounded-lg border border-emerald-100'>
                <div className='space-y-2'>
                  <Label>Mata Uang</Label>
                  <Select value={mataUang} onValueChange={setMataUang}>
                    <SelectTrigger className='bg-white'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='Rupiah'>Rupiah</SelectItem>
                      <SelectItem value='Dolar'>Dolar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {mataUang === 'Dolar' && (
                  <div className='space-y-2'>
                    <Label>Kurs (Opsional)</Label>
                    <Input
                      type='number'
                      value={kurs}
                      onChange={(e) => setKurs(Number(e.target.value))}
                      className='bg-white'
                    />
                  </div>
                )}
                <div className='space-y-2'>
                  <Label>Price / Sm3</Label>
                  <Input
                    type='number'
                    value={harga}
                    onChange={(e) => setHarga(Number(e.target.value))}
                    className='bg-white'
                  />
                </div>
                <div className='space-y-2 md:col-span-3 pt-2'>
                  <Label className='text-emerald-700'>
                    Total Penjualan (Otomatis)
                  </Label>
                  <div className='text-2xl font-bold text-emerald-600'>
                    {formatRupiah(totalPenjualan)}
                  </div>
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
              <Button type='submit' onClick={() => setIsOpen(false)}>
                Simpan Data Pengisian
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader className='bg-slate-50'>
          <TableRow>
            <TableHead>Tanggal</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>No. DO</TableHead>
            <TableHead>GTM / Nopol</TableHead>
            <TableHead className='text-right'>Vol MMBTU</TableHead>
            <TableHead className='text-right'>Total Penjualan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className='hover:bg-slate-50/50'>
            <TableCell>25 Feb 2026</TableCell>
            <TableCell>PT. Gas Bumi Nusantara</TableCell>
            <TableCell>DO/2026/001</TableCell>
            <TableCell>B 1234 XYZ (20FT)</TableCell>
            <TableCell className='text-right font-medium text-slate-700'>
              750
            </TableCell>
            <TableCell className='text-right font-bold text-emerald-600'>
              Rp 11.250.000
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
