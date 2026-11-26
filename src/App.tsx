import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { LandingView } from './views/LandingView';
import { LoginView } from './views/LoginView';
import { CatalogView } from './views/CatalogView';
import { DetailView } from './views/DetailView';
import { CheckoutView } from './views/CheckoutView';
import { DashboardMhs } from './views/DashboardMhs';
import { SerahTerimaView } from './views/SerahTerimaView';
import { DashboardOrmawa } from './views/DashboardOrmawa';
import { SpsView } from './views/SpsView';
import { ApprovalView } from './views/ApprovalView';
import { InventarisView } from './views/InventarisView';
import { AdminView } from './views/AdminView';
import { PinjamanSayaView } from './views/PinjamanSayaView';
import { BarangSayaView } from './views/BarangProfilView';
import { KeuanganView } from './views/KeuanganView';
import { PricingView } from './views/PricingView';
import { LanggananView } from './views/LanggananView';
import { PanduanView } from './views/PanduanView';
import { ProfilView } from './views/ProfilView';

function GuestGuard({ children }: { children: React.ReactNode }) {
  const { role } = useApp();
  if (role !== 'GUEST') return <Navigate to="/dashboard-home" replace />;
  return <>{children}</>;
}

function RoleGuard({ roles, children }: { roles: string[]; children: React.ReactNode }) {
  const { role } = useApp();
  if (role === 'GUEST') return <Navigate to="/masuk" replace />;
  if (!roles.includes(role)) return <Navigate to={role === 'ORMAWA' ? '/ormawa' : role === 'ADMIN' ? '/admin' : '/dashboard'} replace />;
  return <>{children}</>;
}

export default function App() {
  return <AppProvider>
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingView />} />
        <Route path="/masuk" element={<GuestGuard><LoginView /></GuestGuard>} />
        <Route path="/paket" element={<PricingView />} />
        <Route path="/panduan" element={<PanduanView />} />
        <Route path="/langganan" element={<RoleGuard roles={['ORMAWA']}><LanggananView /></RoleGuard>} />
        <Route path="/katalog" element={<RoleGuard roles={['MAHASISWA', 'ORMAWA', 'ADMIN']}><CatalogView /></RoleGuard>} />
        <Route path="/katalog/:id" element={<RoleGuard roles={['MAHASISWA', 'ORMAWA', 'ADMIN']}><DetailView /></RoleGuard>} />
        <Route path="/checkout/:id" element={<RoleGuard roles={['MAHASISWA', 'ORMAWA']}><CheckoutView /></RoleGuard>} />
        <Route path="/dashboard" element={<RoleGuard roles={['MAHASISWA']}><DashboardMhs /></RoleGuard>} />
        <Route path="/dashboard-home" element={<DashboardRedirect />} />
        <Route path="/pinjaman-saya" element={<RoleGuard roles={['MAHASISWA']}><PinjamanSayaView /></RoleGuard>} />
        <Route path="/barang-saya" element={<RoleGuard roles={['MAHASISWA', 'ORMAWA']}><BarangSayaView /></RoleGuard>} />
        <Route path="/profil" element={<RoleGuard roles={['MAHASISWA', 'ORMAWA', 'ADMIN']}><ProfilView /></RoleGuard>} />
        <Route path="/serah-terima/:id" element={<RoleGuard roles={['MAHASISWA', 'ORMAWA']}><SerahTerimaView /></RoleGuard>} />
        <Route path="/ormawa" element={<RoleGuard roles={['ORMAWA']}><DashboardOrmawa /></RoleGuard>} />
        <Route path="/sps" element={<RoleGuard roles={['ORMAWA']}><SpsView /></RoleGuard>} />
        <Route path="/approval" element={<RoleGuard roles={['ORMAWA']}><ApprovalView /></RoleGuard>} />
        <Route path="/inventaris" element={<RoleGuard roles={['ORMAWA']}><InventarisView /></RoleGuard>} />
        <Route path="/admin" element={<RoleGuard roles={['ADMIN']}><AdminView /></RoleGuard>} />
        <Route path="/admin/keuangan" element={<RoleGuard roles={['ADMIN']}><KeuanganView /></RoleGuard>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  </AppProvider>;
}

function DashboardRedirect() {
  const { role } = useApp();
  return <Navigate to={role === 'ORMAWA' ? '/ormawa' : role === 'ADMIN' ? '/admin' : '/dashboard'} replace />;
}