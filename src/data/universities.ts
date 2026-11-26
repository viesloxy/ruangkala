import type { Campus } from '../types';

export interface University {
  id: string;
  name: string;      // nama populer / singkatan
  full: string;      // nama lengkap
  city: string;      // kota domisili kampus
  province: string;
  cluster: string;   // klaster wilayah untuk "klaster terdekat"
}

// Data kurasi PTN utama Indonesia (nama populer + kota + provinsi + klaster wilayah).
// Sumber nama: Daftar PTN Indonesia (json-data-ptn-universitas-indonesia), dirapikan.
export const UNIVERSITIES: University[] = [
  // ==== SURABAYA & SEKITARNYA ====
  { id: 'unair', name: 'UNAIR', full: 'Universitas Airlangga', city: 'Surabaya', province: 'Jawa Timur', cluster: 'Surabaya & Sekitarnya' },
  { id: 'its', name: 'ITS', full: 'Institut Teknologi Sepuluh Nopember', city: 'Surabaya', province: 'Jawa Timur', cluster: 'Surabaya & Sekitarnya' },
  { id: 'pens', name: 'PENS', full: 'Politeknik Elektronika Negeri Surabaya', city: 'Surabaya', province: 'Jawa Timur', cluster: 'Surabaya & Sekitarnya' },
  { id: 'ppns', name: 'PPNS', full: 'Politeknik Perkapalan Negeri Surabaya', city: 'Surabaya', province: 'Jawa Timur', cluster: 'Surabaya & Sekitarnya' },
  { id: 'upnjatim', name: 'UPN Veteran Jatim', full: 'UPN "Veteran" Jawa Timur', city: 'Surabaya', province: 'Jawa Timur', cluster: 'Surabaya & Sekitarnya' },
  { id: 'unesa', name: 'UNESA', full: 'Universitas Negeri Surabaya', city: 'Surabaya', province: 'Jawa Timur', cluster: 'Surabaya & Sekitarnya' },
  { id: 'uinsa', name: 'UIN Sunan Ampel', full: 'UIN Sunan Ampel Surabaya', city: 'Surabaya', province: 'Jawa Timur', cluster: 'Surabaya & Sekitarnya' },
  // ==== MALANG ====
  { id: 'ub', name: 'UB', full: 'Universitas Brawijaya', city: 'Malang', province: 'Jawa Timur', cluster: 'Malang' },
  { id: 'um', name: 'UM', full: 'Universitas Negeri Malang', city: 'Malang', province: 'Jawa Timur', cluster: 'Malang' },
  { id: 'polinema', name: 'Polinema', full: 'Politeknik Negeri Malang', city: 'Malang', province: 'Jawa Timur', cluster: 'Malang' },
  { id: 'uinmalang', name: 'UIN Malang', full: 'UIN Maulana Malik Ibrahim Malang', city: 'Malang', province: 'Jawa Timur', cluster: 'Malang' },
  // ==== JAWA TIMUR LAIN ====
  { id: 'unej', name: 'UNEJ', full: 'Universitas Jember', city: 'Jember', province: 'Jawa Timur', cluster: 'Jawa Timur Timur' },
  { id: 'utm', name: 'UTM', full: 'Universitas Trunojoyo Madura', city: 'Bangkalan', province: 'Jawa Timur', cluster: 'Jawa Timur Timur' },
  { id: 'unipdu', name: 'Unipdu', full: 'Universitas Pesantren Tinggi Darul Ulum', city: 'Jombang', province: 'Jawa Timur', cluster: 'Jawa Timur Timur' },
  // ==== YOGYAKARTA ====
  { id: 'ugm', name: 'UGM', full: 'Universitas Gadjah Mada', city: 'Yogyakarta', province: 'DI Yogyakarta', cluster: 'Yogyakarta' },
  { id: 'uny', name: 'UNY', full: 'Universitas Negeri Yogyakarta', city: 'Yogyakarta', province: 'DI Yogyakarta', cluster: 'Yogyakarta' },
  { id: 'uinsuka', name: 'UIN Sunan Kalijaga', full: 'UIN Sunan Kalijaga Yogyakarta', city: 'Yogyakarta', province: 'DI Yogyakarta', cluster: 'Yogyakarta' },
  { id: 'upnyk', name: 'UPN Veteran YK', full: 'UPN "Veteran" Yogyakarta', city: 'Yogyakarta', province: 'DI Yogyakarta', cluster: 'Yogyakarta' },
  { id: 'isi', name: 'ISI Yogyakarta', full: 'Institut Seni Indonesia Yogyakarta', city: 'Yogyakarta', province: 'DI Yogyakarta', cluster: 'Yogyakarta' },
  // ==== BANDUNG ====
  { id: 'itb', name: 'ITB', full: 'Institut Teknologi Bandung', city: 'Bandung', province: 'Jawa Barat', cluster: 'Bandung' },
  { id: 'upi', name: 'UPI', full: 'Universitas Pendidikan Indonesia', city: 'Bandung', province: 'Jawa Barat', cluster: 'Bandung' },
  { id: 'unpad', name: 'UNPAD', full: 'Universitas Padjadjaran', city: 'Sumedang', province: 'Jawa Barat', cluster: 'Bandung' },
  { id: 'uinsgd', name: 'UIN Sunan Gunung Djati', full: 'UIN Sunan Gunung Djati Bandung', city: 'Bandung', province: 'Jawa Barat', cluster: 'Bandung' },
  { id: 'polban', name: 'Polban', full: 'Politeknik Negeri Bandung', city: 'Bandung', province: 'Jawa Barat', cluster: 'Bandung' },
  // ==== JAKARTA & BANTEN ====
  { id: 'ui', name: 'UI', full: 'Universitas Indonesia', city: 'Depok', province: 'Jawa Barat', cluster: 'Jakarta & Banten' },
  { id: 'unj', name: 'UNJ', full: 'Universitas Negeri Jakarta', city: 'Jakarta', province: 'DKI Jakarta', cluster: 'Jakarta & Banten' },
  { id: 'uinjkt', name: 'UIN Syarif Hidayatullah', full: 'UIN Syarif Hidayatullah Jakarta', city: 'Jakarta', province: 'DKI Jakarta', cluster: 'Jakarta & Banten' },
  { id: 'upnjkt', name: 'UPN Veteran Jakarta', full: 'UPN "Veteran" Jakarta', city: 'Depok', province: 'Jawa Barat', cluster: 'Jakarta & Banten' },
  { id: 'pnj', name: 'PNJ', full: 'Politeknik Negeri Jakarta', city: 'Depok', province: 'Jawa Barat', cluster: 'Jakarta & Banten' },
  { id: 'untirta', name: 'UNTIRTA', full: 'Universitas Sultan Ageng Tirtayasa', city: 'Serang', province: 'Banten', cluster: 'Jakarta & Banten' },
  { id: 'uinbanten', name: 'UIN Banten', full: 'UIN Sultan Maulana Hasanuddin Banten', city: 'Serang', province: 'Banten', cluster: 'Jakarta & Banten' },
  // ==== SEMARANG & SOLO ====
  { id: 'undip', name: 'UNDIP', full: 'Universitas Diponegoro', city: 'Semarang', province: 'Jawa Tengah', cluster: 'Semarang & Solo' },
  { id: 'unnes', name: 'UNNES', full: 'Universitas Negeri Semarang', city: 'Semarang', province: 'Jawa Tengah', cluster: 'Semarang & Solo' },
  { id: 'uinsemarang', name: 'UIN Walisongo', full: 'UIN Walisongo Semarang', city: 'Semarang', province: 'Jawa Tengah', cluster: 'Semarang & Solo' },
  { id: 'polines', name: 'Polines', full: 'Politeknik Negeri Semarang', city: 'Semarang', province: 'Jawa Tengah', cluster: 'Semarang & Solo' },
  { id: 'uns', name: 'UNS', full: 'Universitas Sebelas Maret', city: 'Surakarta', province: 'Jawa Tengah', cluster: 'Semarang & Solo' },
  { id: 'iainsolo', name: 'UIN Raden Mas Said', full: 'UIN Raden Mas Said Surakarta', city: 'Surakarta', province: 'Jawa Tengah', cluster: 'Semarang & Solo' },
  { id: 'unsoed', name: 'UNSOED', full: 'Universitas Jenderal Soedirman', city: 'Purwokerto', province: 'Jawa Tengah', cluster: 'Semarang & Solo' },
  // ==== SUMATERA UTARA & ACEH ====
  { id: 'usu', name: 'USU', full: 'Universitas Sumatera Utara', city: 'Medan', province: 'Sumatera Utara', cluster: 'Sumatera Utara & Aceh' },
  { id: 'unimed', name: 'UNIMED', full: 'Universitas Negeri Medan', city: 'Medan', province: 'Sumatera Utara', cluster: 'Sumatera Utara & Aceh' },
  { id: 'uinsu', name: 'UIN Sumatera Utara', full: 'UIN Sumatera Utara', city: 'Medan', province: 'Sumatera Utara', cluster: 'Sumatera Utara & Aceh' },
  { id: 'usk', name: 'USK', full: 'Universitas Syiah Kuala', city: 'Banda Aceh', province: 'Aceh', cluster: 'Sumatera Utara & Aceh' },
  { id: 'uinaceh', name: 'UIN Ar-Raniry', full: 'UIN Ar-Raniry Banda Aceh', city: 'Banda Aceh', province: 'Aceh', cluster: 'Sumatera Utara & Aceh' },
  // ==== SUMATERA BARAT & RIAU ====
  { id: 'unand', name: 'UNAND', full: 'Universitas Andalas', city: 'Padang', province: 'Sumatera Barat', cluster: 'Sumatera Barat & Riau' },
  { id: 'unp', name: 'UNP', full: 'Universitas Negeri Padang', city: 'Padang', province: 'Sumatera Barat', cluster: 'Sumatera Barat & Riau' },
  { id: 'uinbukittinggi', name: 'UIN Imam Bonjol', full: 'UIN Imam Bonjol Padang', city: 'Padang', province: 'Sumatera Barat', cluster: 'Sumatera Barat & Riau' },
  { id: 'unri', name: 'UNRI', full: 'Universitas Riau', city: 'Pekanbaru', province: 'Riau', cluster: 'Sumatera Barat & Riau' },
  { id: 'uinsuska', name: 'UIN Suska Riau', full: 'UIN Sultan Syarif Kasim Riau', city: 'Pekanbaru', province: 'Riau', cluster: 'Sumatera Barat & Riau' },
  { id: 'umrah', name: 'UMRAH', full: 'Universitas Maritim Raja Ali Haji', city: 'Tanjungpinang', province: 'Kepulauan Riau', cluster: 'Sumatera Barat & Riau' },
  // ==== SUMATERA SELATAN & LAMPUNG ====
  { id: 'unsri', name: 'UNSRI', full: 'Universitas Sriwijaya', city: 'Palembang', province: 'Sumatera Selatan', cluster: 'Sumatera Selatan & Lampung' },
  { id: 'uinradenfatah', name: 'UIN Raden Fatah', full: 'UIN Raden Fatah Palembang', city: 'Palembang', province: 'Sumatera Selatan', cluster: 'Sumatera Selatan & Lampung' },
  { id: 'unila', name: 'UNILA', full: 'Universitas Lampung', city: 'Bandar Lampung', province: 'Lampung', cluster: 'Sumatera Selatan & Lampung' },
  { id: 'uinradenintan', name: 'UIN Raden Intan', full: 'UIN Raden Intan Lampung', city: 'Bandar Lampung', province: 'Lampung', cluster: 'Sumatera Selatan & Lampung' },
  { id: 'unib', name: 'UNIB', full: 'Universitas Bengkulu', city: 'Bengkulu', province: 'Bengkulu', cluster: 'Sumatera Selatan & Lampung' },
  { id: 'unjambi', name: 'UNJA', full: 'Universitas Jambi', city: 'Jambi', province: 'Jambi', cluster: 'Sumatera Selatan & Lampung' },
  // ==== BALI & NUSA TENGGARA ====
  { id: 'unud', name: 'UNUD', full: 'Universitas Udayana', city: 'Denpasar', province: 'Bali', cluster: 'Bali & Nusa Tenggara' },
  { id: 'undiksha', name: 'UNDIKSHA', full: 'Universitas Pendidikan Ganesha', city: 'Singaraja', province: 'Bali', cluster: 'Bali & Nusa Tenggara' },
  { id: 'unram', name: 'UNRAM', full: 'Universitas Mataram', city: 'Mataram', province: 'Nusa Tenggara Barat', cluster: 'Bali & Nusa Tenggara' },
  { id: 'uinmataram', name: 'UIN Mataram', full: 'UIN Mataram', city: 'Mataram', province: 'Nusa Tenggara Barat', cluster: 'Bali & Nusa Tenggara' },
  { id: 'undana', name: 'UNDANA', full: 'Universitas Nusa Cendana', city: 'Kupang', province: 'Nusa Tenggara Timur', cluster: 'Bali & Nusa Tenggara' },
  // ==== KALIMANTAN ====
  { id: 'untan', name: 'UNTAN', full: 'Universitas Tanjungpura', city: 'Pontianak', province: 'Kalimantan Barat', cluster: 'Kalimantan' },
  { id: 'ulm', name: 'ULM', full: 'Universitas Lambung Mangkurat', city: 'Banjarbaru', province: 'Kalimantan Selatan', cluster: 'Kalimantan' },
  { id: 'unmul', name: 'UNMUL', full: 'Universitas Mulawarman', city: 'Samarinda', province: 'Kalimantan Timur', cluster: 'Kalimantan' },
  { id: 'upr', name: 'UPR', full: 'Universitas Palangka Raya', city: 'Palangka Raya', province: 'Kalimantan Tengah', cluster: 'Kalimantan' },
  { id: 'untar', name: 'UNTAR', full: 'Universitas Tarumanagara', city: 'Jakarta', province: 'DKI Jakarta', cluster: 'Jakarta & Banten' },
  // ==== SULAWESI ====
  { id: 'unhas', name: 'UNHAS', full: 'Universitas Hasanuddin', city: 'Makassar', province: 'Sulawesi Selatan', cluster: 'Sulawesi' },
  { id: 'unm', name: 'UNM', full: 'Universitas Negeri Makassar', city: 'Makassar', province: 'Sulawesi Selatan', cluster: 'Sulawesi' },
  { id: 'uinalauddin', name: 'UIN Alauddin', full: 'UIN Alauddin Makassar', city: 'Makassar', province: 'Sulawesi Selatan', cluster: 'Sulawesi' },
  { id: 'unsrat', name: 'UNSRAT', full: 'Universitas Sam Ratulangi', city: 'Manado', province: 'Sulawesi Utara', cluster: 'Sulawesi' },
  { id: 'unima', name: 'UNIMA', full: 'Universitas Negeri Manado', city: 'Tondano', province: 'Sulawesi Utara', cluster: 'Sulawesi' },
  { id: 'untad', name: 'UNTAD', full: 'Universitas Tadulako', city: 'Palu', province: 'Sulawesi Tengah', cluster: 'Sulawesi' },
  { id: 'unhalu', name: 'UHO', full: 'Universitas Halu Oleo', city: 'Kendari', province: 'Sulawesi Tenggara', cluster: 'Sulawesi' },
  { id: 'ung', name: 'UNG', full: 'Universitas Negeri Gorontalo', city: 'Gorontalo', province: 'Gorontalo', cluster: 'Sulawesi' },
  // ==== MALUKU & PAPUA ====
  { id: 'unpatti', name: 'UNPATTI', full: 'Universitas Pattimura', city: 'Ambon', province: 'Maluku', cluster: 'Maluku & Papua' },
  { id: 'unkhair', name: 'UNKHAIR', full: 'Universitas Khairun', city: 'Ternate', province: 'Maluku Utara', cluster: 'Maluku & Papua' },
  { id: 'uncen', name: 'UNCEN', full: 'Universitas Cenderawasih', city: 'Jayapura', province: 'Papua', cluster: 'Maluku & Papua' },
  { id: 'unipa', name: 'UNIPA', full: 'Universitas Papua', city: 'Manokwari', province: 'Papua Barat', cluster: 'Maluku & Papua' },
  { id: 'musamus', name: 'Musamus', full: 'Universitas Musamus Merauke', city: 'Merauke', province: 'Papua', cluster: 'Maluku & Papua' },
];

export const CITIES = Array.from(new Set(UNIVERSITIES.map(u => u.city))).sort();
export const CLUSTERS = Array.from(new Set(UNIVERSITIES.map(u => u.cluster)));

// Master kampus untuk aplikasi (id, nama populer, klaster) — dipakai topbar, admin, landing.
export const CAMPUSES: Campus[] = UNIVERSITIES.map(u => ({ id: u.id, name: u.name, cluster: u.cluster }));

export function findUniversity(nameOrId: string): University | undefined {
  const q = nameOrId.trim().toLowerCase();
  return UNIVERSITIES.find(u => u.id === q || u.name.toLowerCase() === q || u.full.toLowerCase() === q);
}
export function univLabel(u: University): string { return `${u.name} · ${u.city}`; }
