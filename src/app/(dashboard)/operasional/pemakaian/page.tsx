'use client';

import { useState } from 'react';
import { Calculator, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function PemakaianClientPage() {
  const [tekananAwal, setTekananAwal] = useState<number>(0);
  const [tekananAkhir, setTekananAkhir] = useState<number>(0);
  const selisihTekanan = tekananAwal - tekananAkhir;

  const [mataUang, setMataUang] = useState<string>('Rupiah');
  const [hargaSm3, setHargaSm3] = useState<number>(0);
  const [totalSm3, setTotalSm3] = useState<number>(1000);
  const totalPenjualan = mataUang === 'Rupiah' ? totalSm3 * hargaSm3 : 0;

  return (
    <div className='space-y-6'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight text-slate-800'>
            Input Pemakaian Client
          </h2>
          <p className='text-sm text-slate-500'>
            Catat pemakaian gas harian client. Pilih metode kalkulasi yang
            sesuai.
          </p>
        </div>
        <Button className='bg-primary hover:bg-primary/90'>
          <Save className='w-4 h-4 mr-2' />
          Simpan Data Pemakaian
        </Button>
      </div>

      <Tabs defaultValue='delta-pressure' className='w-full'>
        {/* Navigasi Pilihan Metode  */}
        <TabsList className='grid w-full max-w-md grid-cols-3 mb-4'>
          <TabsTrigger value='delta-pressure'>Delta Pressure</TabsTrigger>
          <TabsTrigger value='evc'>EVC</TabsTrigger>
          <TabsTrigger value='turbin'>Turbin</TabsTrigger>
        </TabsList>

        {/* --- TAB: DELTA PRESSURE --- */}
        <TabsContent value='delta-pressure'>
          <Card className='border-t-4 border-t-blue-500'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Calculator className='w-5 h-5 text-blue-500' />
                Metode Delta Pressure
              </CardTitle>
              <CardDescription>
                Masukkan parameter tekanan untuk menghitung total pemakaian
                secara otomatis.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-4 border-b'>
                <div className='space-y-2'>
                  <Label>Tanggal </Label>
                  <Input type='date' />
                </div>
                <div className='space-y-2'>
                  <Label>Customer </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder='Pilih Customer' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='cust1'>PT. Maju Mundur</SelectItem>
                      <SelectItem value='cust2'>CV. Sejahtera</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label>Plat Nomor [cite: 40]</Label>
                  <Input placeholder='B 1234 XYZ' />
                </div>
                <div className='space-y-2'>
                  <Label>Jenis GTM [cite: 41]</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder='Pilih Jenis' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='10ft'>10 FT</SelectItem>
                      <SelectItem value='20ft'>20 FT</SelectItem>
                      <SelectItem value='40ft'>40 FT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 pb-4 border-b'>
                <div className='space-y-2'>
                  <Label className='text-blue-600 font-semibold'>
                    Tekanan Awal (Bar)
                  </Label>
                  <Input
                    type='number'
                    value={tekananAwal}
                    onChange={(e) => setTekananAwal(Number(e.target.value))}
                    className='border-blue-200 focus-visible:ring-blue-500'
                  />
                </div>
                <div className='space-y-2'>
                  <Label className='text-orange-600 font-semibold'>
                    Tekanan Akhir (Bar)
                  </Label>
                  <Input
                    type='number'
                    value={tekananAkhir}
                    onChange={(e) => setTekananAkhir(Number(e.target.value))}
                    className='border-orange-200 focus-visible:ring-orange-500'
                  />
                </div>
                <div className='space-y-2 bg-slate-50 p-3 rounded-lg border'>
                  <Label className='text-slate-500'>
                    Selisih Tekanan (Otomatis){' '}
                  </Label>
                  <div className='text-2xl font-bold text-slate-800'>
                    {selisihTekanan}{' '}
                    <span className='text-sm font-normal text-slate-500'>
                      Bar
                    </span>
                  </div>
                </div>
              </div>

              {/* Seksi 3: Keuangan */}
              <div className='grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-lg'>
                <div className='space-y-2'>
                  <Label>Mata Uang </Label>
                  <Select value={mataUang} onValueChange={setMataUang}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='Rupiah'>Rupiah (IDR)</SelectItem>
                      <SelectItem value='Dolar'>Dolar (USD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {mataUang === 'Dolar' && (
                  <div className='space-y-2'>
                    <Label>Kurs USD </Label>
                    <Input type='number' placeholder='Contoh: 15500' />
                  </div>
                )}
                <div className='space-y-2'>
                  <Label>Harga Satuan / Sm3 </Label>
                  <Input
                    type='number'
                    value={hargaSm3}
                    onChange={(e) => setHargaSm3(Number(e.target.value))}
                  />
                </div>
                <div className='space-y-2 flex flex-col justify-end'>
                  <Label className='text-slate-500 mb-1'>
                    Total Penjualan (Otomatis){' '}
                  </Label>
                  <div className='text-xl font-bold text-emerald-600'>
                    Rp {totalPenjualan.toLocaleString('id-ID')}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- TAB: EVC --- */}
        <TabsContent value='evc'>
          <Card className='border-t-4 border-t-emerald-500'>
            <CardHeader>
              <CardTitle>Metode EVC </CardTitle>
              <CardDescription>
                Form input menggunakan parameter EVC Awal dan EVC Akhir.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='h-32 flex items-center justify-center text-slate-400 border-2 border-dashed rounded-lg'>
                Form EVC (Konsep UI serupa dengan Delta Pressure)
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- TAB: TURBIN --- */}
        <TabsContent value='turbin'>
          <Card className='border-t-4 border-t-orange-500'>
            <CardHeader>
              <CardTitle>Metode Turbin </CardTitle>
              <CardDescription>
                Memerlukan input faktor kompresi, temperature base, dan pressure
                standar.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='h-32 flex items-center justify-center text-slate-400 border-2 border-dashed rounded-lg'>
                Form Turbin (Konsep UI serupa dengan Delta Pressure)
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
