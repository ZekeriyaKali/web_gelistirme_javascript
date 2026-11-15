export interface Customer {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  status: 'Aktif' | 'Potansiyel' | 'Pasif';
  annualRevenue: number;
  createdAt: string;
}