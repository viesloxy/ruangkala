import type { User, Equipment, Booking, SpsItem, Handover, Campus, LedgerEntry, Expense } from '../types';

export const campuses: Campus[] = [
  { id: 'unair', name: 'UNAIR', cluster: 'Surabaya Timur' },
  { id: 'its', name: 'ITS', cluster: 'Surabaya Timur' },
  { id: 'pens', name: 'PENS', cluster: 'Surabaya Timur' },
  { id: 'ppns', name: 'PPNS', cluster: 'Surabaya Timur' },
  { id: 'upn', name: 'UPN Veteran Jatim', cluster: 'Surabaya Timur' },
  { id: 'ub', name: 'UB', cluster: 'Malang' },
  { id: 'ugm', name: 'UGM', cluster: 'Yogyakarta' },
];

export const users: User[] = [
  { id: 'u-vito', nim: '434241084', name: 'Vito Aditya', role: 'MAHASISWA', roleLabel: 'Mahasiswa D4 TI', kampus: 'UNAIR', prodi: 'D4 Teknik Informatika', avatar: 'https://i.pravatar.cc/100?img=12', reputation: 4.9, quota: 2 },
  { id: 'u-ocha', nim: '434241070', name: 'Ocha Della', role: 'ORMAWA', roleLabel: 'Bendahara Hima D4 TI', kampus: 'UNAIR', prodi: 'D4 Teknik Informatika', avatar: 'https://i.pravatar.cc/100?img=44', reputation: 4.8, quota: 0 },
  { id: 'u-rizki', nim: '434241085', name: 'Rizki Ibrahim', role: 'ORMAWA', roleLabel: 'Pengelola Aset BEM Vokasi', kampus: 'UNAIR', prodi: 'D4 Teknik Informatika', avatar: 'https://i.pravatar.cc/100?img=11', reputation: 4.9, quota: 0 },
  { id: 'u-admin', nim: 'admin', name: 'Admin RuangKala', role: 'ADMIN', roleLabel: 'Admin Platform', kampus: 'UNAIR', prodi: '-', avatar: 'https://i.pravatar.cc/100?img=5', reputation: 5.0, quota: 0 },
];

export const equipment: Equipment[] = [
  { id: 'e-pompa', name: 'Pompa Balon Elektrik 600W Dual Nozzle', category: 'Dekorasi & Pompa', ownerName: 'Vito Aditya', ownerNim: '434241084', ownerOrg: 'Pribadi', scope: 'SCOPE_CLUSTER', dailyRate: 25000, replacementValue: 350000, condition: 98, location: 'Gedung A Vokasi UNAIR', img: 'https://picsum.photos/seed/e-pompa/600/400', lockedDates: ['2026-11-14', '2026-11-15', '2026-11-16'], completeness: ['Dual Nozzle', 'Kabel 1.5m', 'Manual Book'] },
  { id: 'e-ht', name: 'Paket 10 HT WLN KD-C1 + Charger', category: 'HT & Komunikasi', ownerName: 'Hima D4 TI', ownerNim: '-', ownerOrg: 'Hima D4 TI', scope: 'SCOPE_CAMPUS', dailyRate: 0, replacementValue: 2400000, condition: 95, location: 'Sekretariat Hima D4 TI', img: 'https://picsum.photos/seed/e-ht/600/400', lockedDates: ['2026-11-14', '2026-11-15', '2026-11-16'], completeness: ['10 Unit HT', '2 Charger', 'Clip Cadangan'] },
  { id: 'e-proyektor', name: 'Proyektor Epson HDMI 3600 Lumens', category: 'Proyektor', ownerName: 'Raka Pratama', ownerNim: '434241012', ownerOrg: 'Pribadi', scope: 'SCOPE_CLUSTER', dailyRate: 50000, replacementValue: 4500000, condition: 96, location: 'Gedung A Vokasi UNAIR', img: 'https://picsum.photos/seed/e-proyektor/600/400', lockedDates: [], completeness: ['Kabel HDMI', 'Remote', 'Tas Softcase'] },
  { id: 'e-sound', name: 'Sound Portable 15" + 2 Mic Wireless', category: 'Sound & Mic', ownerName: 'UKM Musik Vokasi', ownerNim: '-', ownerOrg: 'UKM Musik', scope: 'SCOPE_CAMPUS', dailyRate: 120000, replacementValue: 5200000, condition: 94, location: 'Gudang UKM Vokasi', img: 'https://picsum.photos/seed/e-sound/600/400', lockedDates: ['2026-11-14', '2026-11-15'], completeness: ['2 Mic Wireless', 'Kabel XLR', 'Adaptor Daya'] },
  { id: 'e-kamera', name: 'Kamera Sony A6400 + Lensa Kit', category: 'Kamera', ownerName: 'Aulia Rahman', ownerNim: '434241055', ownerOrg: 'Pribadi', scope: 'SCOPE_CLUSTER', dailyRate: 150000, replacementValue: 12000000, condition: 97, location: 'Lobby Gd. B Vokasi', img: 'https://picsum.photos/seed/e-kamera/600/400', lockedDates: ['2026-11-15', '2026-11-16'], completeness: ['Baterai 2x', 'Charger', 'Tas Kamera'] },
  { id: 'e-kabel', name: '4x Kabel Roll 25m Heavy Duty', category: 'Listrik', ownerName: 'Hima D4 TI', ownerNim: '-', ownerOrg: 'Hima D4 TI', scope: 'SCOPE_CAMPUS', dailyRate: 0, replacementValue: 800000, condition: 99, location: 'Sekretariat Hima D4 TI', img: 'https://picsum.photos/seed/e-kabel/600/400', lockedDates: ['2026-11-14', '2026-11-15', '2026-11-16'], completeness: ['4 Gulung', 'Stop Kontak Aman'] },
  { id: 'e-medinfo', name: 'Inventaris Kamera Medinfo BEM', category: 'Kamera', ownerName: 'BEM UNAIR', ownerNim: '-', ownerOrg: 'BEM UNAIR', scope: 'SCOPE_INTERNAL', dailyRate: 0, replacementValue: 8000000, condition: 96, location: 'Sekretariat BEM UNAIR', img: 'https://picsum.photos/seed/e-medinfo/600/400', lockedDates: [], completeness: ['Body', 'Lensa Kit 16-50mm', 'SD Card 64GB'] },
];

export const initialBookings: Booking[] = [
  { id: 'b-1', code: 'RK-2026-089', equipmentId: 'e-pompa', borrowerId: 'u-vito', startDate: '2026-11-14', endDate: '2026-11-16', days: 3, rentalCost: 75000, platformFee: 0, total: 75000, status: 'CONFIRMED_READY', approvals: [
    { role: 'Ketua Pelaksana', status: 'APPROVED', name: 'Naisya Gina', time: '10 Nov 10:05' },
    { role: 'Bendahara', status: 'APPROVED', name: 'Ocha Della', time: '10 Nov 10:30' },
    { role: 'BPI', status: 'APPROVED', name: 'BPI D4 TI', time: '10 Nov 13:40' },
    { role: 'SC', status: 'APPROVED', name: 'SC Vokasi', time: '10 Nov 15:00' },
  ], createdAt: '2026-11-09' },
  { id: 'b-2', code: 'RK-2026-092', equipmentId: 'e-sound', borrowerId: 'u-vito', startDate: '2026-11-14', endDate: '2026-11-15', days: 2, rentalCost: 240000, platformFee: 0, total: 240000, status: 'LOCKED_AWAITING_PAY', approvals: [
    { role: 'Ketua Pelaksana', status: 'APPROVED', name: 'Naisya Gina', time: '11 Nov 08:30' },
    { role: 'Bendahara', status: 'PENDING' },
    { role: 'BPI', status: 'PENDING' },
    { role: 'SC', status: 'PENDING' },
  ], createdAt: '2026-11-10' },
  { id: 'b-3', code: 'RK-2026-095', equipmentId: 'e-kamera', borrowerId: 'u-vito', startDate: '2026-11-15', endDate: '2026-11-16', days: 2, rentalCost: 300000, platformFee: 1000, total: 301000, status: 'PENDING_OWNER', approvals: [
    { role: 'Ketua Pelaksana', status: 'PENDING' },
    { role: 'Bendahara', status: 'PENDING' },
    { role: 'BPI', status: 'PENDING' },
    { role: 'SC', status: 'PENDING' },
  ], createdAt: '2026-11-12' },
];

export const initialSps: SpsItem[] = [
  { id: 's-1', division: 'Dekorasi', item: 'Pompa Balon Elektrik 600W', qty: 1, term: 1, source: 'CATALOG_RENT', cost: 75000, fulfilled: true, buyPrice: 320000, futureUses: 4 },
  { id: 's-2', division: 'Acara', item: '10 HT WLN', qty: 1, term: 1, source: 'ORMAWA_FREE', cost: 0, fulfilled: true },
  { id: 's-3', division: 'Humas', item: 'Sound Portable 15"', qty: 1, term: 2, source: 'CATALOG_RENT', cost: 240000, fulfilled: true, buyPrice: 3800000, futureUses: 6 },
  { id: 's-4', division: 'Medinfo', item: 'Proyektor Epson HDMI', qty: 1, term: 2, source: 'CATALOG_RENT', cost: 50000, fulfilled: false, buyPrice: 4200000, futureUses: 8 },
  { id: 's-5', division: 'Keamanan', item: '4x Kabel Roll 25m', qty: 1, term: 2, source: 'ORMAWA_FREE', cost: 0, fulfilled: true },
];

export const initialHandovers: Handover[] = [
  { id: 'h-1', bookingId: 'b-1', checkoutPhoto: true, checkinPhoto: false, completenessOk: true, rating: 0, disputed: false },
];

export const initialLedger: LedgerEntry[] = [
  { id: 'l-1', date: '2026-09-02', source: 'ORMAWA_SUBSCRIPTION', label: 'Langganan Hima D4 TI (Semester Ganjil)', amount: 99000, status: 'PAID' },
  { id: 'l-2', date: '2026-09-05', source: 'ORMAWA_SUBSCRIPTION', label: 'Langganan BEM Vokasi (Semester Ganjil)', amount: 99000, status: 'PAID' },
  { id: 'l-3', date: '2026-09-10', source: 'PROKER_PACKAGE', label: 'Paket Proker Dekan Cup D4 TI', amount: 25000, status: 'PAID' },
  { id: 'l-4', date: '2026-09-18', source: 'TRANSACTION_FEE', label: 'Biaya layanan RK-2026-071', amount: 1000, status: 'PAID' },
  { id: 'l-5', date: '2026-10-01', source: 'TRANSACTION_FEE', label: 'Biaya layanan RK-2026-078', amount: 1000, status: 'PAID' },
  { id: 'l-6', date: '2026-10-12', source: 'ORMAWA_SUBSCRIPTION', label: 'Langganan UKM Musik Vokasi (Semester Ganjil)', amount: 99000, status: 'PAID' },
  { id: 'l-7', date: '2026-10-20', source: 'PROKER_PACKAGE', label: 'Paket Proker Dies Natalis Vokasi', amount: 25000, status: 'PAID' },
  { id: 'l-8', date: '2026-11-02', source: 'TRANSACTION_FEE', label: 'Biaya layanan RK-2026-084', amount: 1000, status: 'PAID' },
  { id: 'l-9', date: '2026-11-12', source: 'TRANSACTION_FEE', label: 'Biaya layanan RK-2026-095', amount: 1000, status: 'PENDING' },
  { id: 'l-10', date: '2026-11-15', source: 'ORMAWA_SUBSCRIPTION', label: 'Langganan Hima D3 TI (Semester Ganjil)', amount: 99000, status: 'PENDING' },
];

export const initialExpenses: Expense[] = [
  { id: 'x-1', date: '2026-09-01', label: 'Domain ruangkala.id (tahun 1)', category: 'Domain', amount: 180000 },
  { id: 'x-2', date: '2026-09-01', label: 'Hosting Vercel Pro (bulanan)', category: 'Hosting', amount: 50000 },
  { id: 'x-3', date: '2026-09-01', label: 'Notifikasi WA Fonnte 1.000 pesan', category: 'Notifikasi', amount: 50000 },
  { id: 'x-4', date: '2026-10-01', label: 'Hosting Vercel Pro (bulanan)', category: 'Hosting', amount: 50000 },
  { id: 'x-5', date: '2026-10-01', label: 'Notifikasi WA Fonnte 1.000 pesan', category: 'Notifikasi', amount: 50000 },
  { id: 'x-6', date: '2026-11-01', label: 'Hosting Vercel Pro (bulanan)', category: 'Hosting', amount: 50000 },
  { id: 'x-7', date: '2026-11-01', label: 'Notifikasi WA Fonnte 1.000 pesan', category: 'Notifikasi', amount: 50000 },
];