'use client';

import { useState } from 'react';
import { Plus, Upload, Calculator, FileText, UserCircle } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
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

export default function KasBankPage() {
  // State untuk form Pengeluaran
  const [isPengeluaranOpen, setIsPengeluaranOpen] = useState(false);
  const [jenisBiaya, setJenisBiaya] = useState<string>('operasional');
  const [jenisPembayaran, setJenisPembayaran] = useState<string>('bank');
  const [jumlahQty, setJumlahQty] = useState<number>(1);
  const [hargaSatuan, setHargaSatuan] = useState<number>(0);

  // State untuk form Gaji
  const [isGajiOpen, setIsGajiOpen] = useState(false);
  const [gajiPokok, setGajiPokok] = useState<number>(0);
  const [tunjangan, setTunjangan] = useState<number>(0);
  const [lembur, setLembur] = useState<number>(0);
  const [pph21, setPph21] = useState<number>(0);
  const [bpjs, setBpjs] = useState<number>(0);
  const [potonganKasbon, setPotonganKasbon] = useState<number>(0);

  // Kalkulasi Otomatis
  const totalPengeluaran = jumlahQty * hargaSatuan;
  const takeHomePay =
    gajiPokok + tunjangan + lembur - (pph21 + bpjs + potonganKasbon);

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-bold tracking-tight text-slate-800'>
          Kas & Bank
        </h2>
        <p className='text-sm text-slate-500'>
          Kelola arus kas keluar, petty cash, kasbon, dan penggajian karyawan.
        </p>
      </div>

      <Tabs defaultValue='pengeluaran' className='w-full'>
        <TabsList className='grid w-full max-w-md grid-cols-2 mb-4'>
          <TabsTrigger value='pengeluaran'>
            Pengeluaran & Petty Cash
          </TabsTrigger>
          <TabsTrigger value='hr'>Payroll & Kasbon</TabsTrigger>
        </TabsList>

        {/* --- TAB: PENGELUARAN & PETTY CASH --- */}
        <TabsContent value='pengeluaran' className='space-y-4'>
          <div className='flex justify-end gap-2'>
            <Dialog
              open={isPengeluaranOpen}
              onOpenChange={setIsPengeluaranOpen}
            >
              <DialogTrigger asChild>
                <Button className='bg-primary hover:bg-primary/90'>
                  <Plus className='w-4 h-4 mr-2' /> Input Pengeluaran
                </Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[600px] max-h-[90vh] overflow-y-auto'>
                <DialogHeader>
                  <DialogTitle>Form Input Pengeluaran</DialogTitle>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label>Tanggal</Label>
                      <Input type='date' />
                    </div>
                    <div className='space-y-2'>
                      <Label>Jenis Biaya</Label>
                      <Select value={jenisBiaya} onValueChange={setJenisBiaya}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='operasional'>
                            Biaya Operasional
                          </SelectItem>
                          <SelectItem value='customer'>
                            Biaya Customer
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {/* Muncul hanya jika jenis biaya customer */}
                    {jenisBiaya === 'customer' && (
                      <div className='space-y-2 col-span-2 bg-blue-50 p-3 rounded-md border border-blue-100'>
                        <Label className='text-blue-700'>Pilih Customer</Label>
                        <Select>
                          <SelectTrigger className='bg-white'>
                            <SelectValue placeholder='Pilih Customer...' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='cust1'>
                              PT. Maju Mundur
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    <div className='space-y-2 col-span-2'>
                      <Label>Deskripsi Pengeluaran</Label>
                      <Input placeholder='Contoh: Pembelian sparepart GTM...' />
                    </div>
                    <div className='space-y-2'>
                      <Label>Jumlah (Qty)</Label>
                      <Input
                        type='number'
                        value={jumlahQty}
                        onChange={(e) => setJumlahQty(Number(e.target.value))}
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label>Harga Satuan</Label>
                      <Input
                        type='number'
                        value={hargaSatuan}
                        onChange={(e) => setHargaSatuan(Number(e.target.value))}
                      />
                    </div>
                    <div className='space-y-2 col-span-2 bg-slate-50 p-3 rounded border flex justify-between items-center'>
                      <Label className='text-slate-500'>
                        Total Pengeluaran (Otomatis)
                      </Label>
                      <span className='text-lg font-bold text-slate-800'>
                        {formatRupiah(totalPengeluaran)}
                      </span>
                    </div>
                    <div className='space-y-2'>
                      <Label>Jenis Pembayaran</Label>
                      <Select
                        value={jenisPembayaran}
                        onValueChange={setJenisPembayaran}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='cash'>
                            Petty Cash / Tunai
                          </SelectItem>
                          <SelectItem value='bank'>Transfer Bank</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {/* Muncul jika pilih Bank */}
                    {jenisPembayaran === 'bank' && (
                      <div className='space-y-2'>
                        <Label>Pilih Rekening</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder='Rekening...' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='bca'>BCA - 123456789</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    <div className='space-y-2 col-span-2 mt-2'>
                      <Label>Upload Bukti Transaksi (Struk/Nota)</Label>
                      <div className='border-2 border-dashed border-slate-200 rounded-lg p-4 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 cursor-pointer'>
                        <Upload className='w-6 h-6 mb-2 text-slate-400' />
                        <span className='text-xs'>
                          Klik untuk upload file gambar/PDF
                        </span>
                        <Input type='file' className='hidden' />
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => setIsPengeluaranOpen(false)}
                  >
                    Batal
                  </Button>
                  <Button
                    type='submit'
                    onClick={() => setIsPengeluaranOpen(false)}
                  >
                    Simpan Pengeluaran
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-lg'>
                Riwayat Pengeluaran Terakhir
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Deskripsi</TableHead>
                    <TableHead>Jenis</TableHead>
                    <TableHead>Pembayaran</TableHead>
                    <TableHead className='text-right'>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>25 Feb 2026</TableCell>
                    <TableCell>Beli ATK Kantor</TableCell>
                    <TableCell>
                      <span className='text-xs bg-slate-100 px-2 py-1 rounded'>
                        Operasional
                      </span>
                    </TableCell>
                    <TableCell>Petty Cash</TableCell>
                    <TableCell className='text-right font-medium'>
                      Rp 350.000
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- TAB: PAYROLL & KASBON --- */}
        <TabsContent value='hr' className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Seksi KASBON */}
            <Card className='border-t-4 border-t-orange-500'>
              <CardHeader className='pb-2 flex flex-row items-center justify-between'>
                <div>
                  <CardTitle className='text-lg'>
                    Data Kasbon Karyawan
                  </CardTitle>
                  <CardDescription>
                    Pencatatan pinjaman dan potongan.
                  </CardDescription>
                </div>
                <Button size='sm' variant='outline'>
                  <Plus className='w-4 h-4 mr-1' /> Kasbon Baru
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Karyawan</TableHead>
                      <TableHead className='text-right'>
                        Total Pinjaman
                      </TableHead>
                      <TableHead className='text-right'>Potongan/Bln</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className='font-medium'>
                        Ahmad Driver
                      </TableCell>
                      <TableCell className='text-right text-orange-600'>
                        Rp 2.000.000
                      </TableCell>
                      <TableCell className='text-right'>Rp 500.000</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Seksi GAJI */}
            <Card className='border-t-4 border-t-emerald-500'>
              <CardHeader className='pb-2 flex flex-row items-center justify-between'>
                <div>
                  <CardTitle className='text-lg'>Slip Gaji Karyawan</CardTitle>
                  <CardDescription>
                    Generate komponen gaji bulanan.
                  </CardDescription>
                </div>
                <Dialog open={isGajiOpen} onOpenChange={setIsGajiOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size='sm'
                      className='bg-emerald-600 hover:bg-emerald-700'
                    >
                      <Calculator className='w-4 h-4 mr-1' /> Hitung Gaji
                    </Button>
                  </DialogTrigger>
                  <DialogContent className='sm:max-w-[700px]'>
                    <DialogHeader>
                      <DialogTitle>Kalkulator Gaji Karyawan</DialogTitle>
                    </DialogHeader>
                    <div className='grid grid-cols-2 gap-6 py-4'>
                      {/* Kolom Kiri: Pemasukan */}
                      <div className='space-y-3'>
                        <h4 className='font-semibold text-sm text-emerald-700 border-b pb-1'>
                          Komponen Pemasukan
                        </h4>
                        <div className='space-y-1'>
                          <Label>Pilih Karyawan</Label>
                          <Input placeholder='Nama / NIK...' />
                        </div>
                        <div className='space-y-1'>
                          <Label>Periode</Label>
                          <Input type='month' />
                        </div>
                        <div className='space-y-1'>
                          <Label>Gaji Pokok</Label>
                          <Input
                            type='number'
                            value={gajiPokok}
                            onChange={(e) =>
                              setGajiPokok(Number(e.target.value))
                            }
                          />
                        </div>
                        <div className='space-y-1'>
                          <Label>Tunjangan</Label>
                          <Input
                            type='number'
                            value={tunjangan}
                            onChange={(e) =>
                              setTunjangan(Number(e.target.value))
                            }
                          />
                        </div>
                        <div className='space-y-1'>
                          <Label>Lembur</Label>
                          <Input
                            type='number'
                            value={lembur}
                            onChange={(e) => setLembur(Number(e.target.value))}
                          />
                        </div>
                      </div>

                      {/* Kolom Kanan: Potongan */}
                      <div className='space-y-3'>
                        <h4 className='font-semibold text-sm text-red-700 border-b pb-1'>
                          Komponen Potongan
                        </h4>
                        <div className='space-y-1'>
                          <Label>PPH 21</Label>
                          <Input
                            type='number'
                            value={pph21}
                            onChange={(e) => setPph21(Number(e.target.value))}
                          />
                        </div>
                        <div className='space-y-1'>
                          <Label>BPJS</Label>
                          <Input
                            type='number'
                            value={bpjs}
                            onChange={(e) => setBpjs(Number(e.target.value))}
                          />
                        </div>
                        <div className='space-y-1'>
                          <Label>Potongan Kasbon / Hutang</Label>
                          <Input
                            type='number'
                            value={potonganKasbon}
                            onChange={(e) =>
                              setPotonganKasbon(Number(e.target.value))
                            }
                          />
                        </div>
                      </div>

                      {/* Baris Bawah: Total */}
                      <div className='col-span-2 bg-slate-800 text-white p-4 rounded-lg flex justify-between items-center mt-2'>
                        <span className='font-medium'>
                          Take Home Pay (Net Gaji)
                        </span>
                        <span className='text-2xl font-bold text-emerald-400'>
                          {formatRupiah(takeHomePay)}
                        </span>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant='outline'
                        onClick={() => setIsGajiOpen(false)}
                      >
                        Batal
                      </Button>
                      <Button onClick={() => setIsGajiOpen(false)}>
                        Simpan & Cetak Slip
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className='h-32 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed rounded-lg bg-slate-50'>
                  <UserCircle className='w-8 h-8 mb-2 opacity-50' />
                  <span className='text-sm'>
                    Belum ada slip gaji di-generate bulan ini.
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
