export type Role = 'GUEST' | 'MAHASISWA' | 'ORMAWA' | 'ADMIN';
export type Scope = 'SCOPE_INTERNAL' | 'SCOPE_CAMPUS' | 'SCOPE_CLUSTER';
export type BookingStatus = 'PENDING_OWNER' | 'LOCKED_AWAITING_PAY' | 'CONFIRMED_READY' | 'ON_LOAN' | 'COMPLETED' | 'DISPUTED';
export type ApprovalStatus = 'PENDING' | 'APPROVED' | 'REVISION';
export type FulfillmentSource = 'PERSONAL_PANITIA' | 'ORMAWA_FREE' | 'CATALOG_RENT' | 'BUY_NEW';

export interface User {
  id: string; nim: string; name: string; role: Role; roleLabel: string;
  kampus: string; prodi: string; avatar: string; reputation: number; quota: number;
}

export interface Equipment {
  id: string; name: string; category: string; ownerName: string; ownerNim: string;
  ownerOrg: string; scope: Scope; dailyRate: number; replacementValue: number;
  condition: number; location: string; img: string; lockedDates: string[];
  completeness: string[];
}

export interface BookingApproval {
  role: string; status: ApprovalStatus; name?: string; time?: string; notes?: string;
}

export interface Booking {
  id: string; code: string; equipmentId: string; borrowerId: string;
  startDate: string; endDate: string; days: number;
  rentalCost: number; platformFee: number; total: number;
  status: BookingStatus; approvals: BookingApproval[]; createdAt: string;
}

export interface SpsItem {
  id: string; division: string; item: string; qty: number; term: 1 | 2;
  source: FulfillmentSource; cost: number; fulfilled: boolean;
  buyPrice?: number; futureUses?: number;
}

export interface Handover {
  id: string; bookingId: string; checkoutPhoto: boolean; checkinPhoto: boolean;
  completenessOk: boolean; rating: number; disputed: boolean;
}

export interface Campus { id: string; name: string; cluster: string; }

export interface LedgerEntry {
  id: string; date: string; source: 'TRANSACTION_FEE' | 'ORMAWA_SUBSCRIPTION' | 'PROKER_PACKAGE';
  label: string; amount: number; status: 'PAID' | 'PENDING';
}

export interface Expense {
  id: string; date: string; label: string; category: string; amount: number;
}