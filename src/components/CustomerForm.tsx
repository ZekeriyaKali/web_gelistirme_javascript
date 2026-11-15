import React, { useState, useEffect } from 'react';
import type { Customer } from '../interfaces/customer';

interface CustomerFormProps {
  onSave: (customer: Customer) => void;
  editingCustomer: Customer | null;
  onCancelEdit: () => void;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({ onSave, editingCustomer, onCancelEdit }) => {
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'Aktif' | 'Potansiyel' | 'Pasif'>('Potansiyel');
  const [annualRevenue, setAnnualRevenue] = useState<number | ''>('');

  useEffect(() => {
    if (editingCustomer) {
      setCompanyName(editingCustomer.companyName);
      setContactName(editingCustomer.contactName);
      setEmail(editingCustomer.email);
      setStatus(editingCustomer.status);
      setAnnualRevenue(editingCustomer.annualRevenue);
    } else {
      resetForm();
    }
  }, [editingCustomer]);

  const resetForm = () => {
    setCompanyName('');
    setContactName('');
    setEmail('');
    setStatus('Potansiyel');
    setAnnualRevenue('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !email) return;

    const payload: Customer = {
      id: editingCustomer ? editingCustomer.id : crypto.randomUUID(),
      companyName,
      contactName,
      email,
      status,
      annualRevenue: Number(annualRevenue) || 0,
      createdAt: editingCustomer ? editingCustomer.createdAt : new Date().toISOString().split('T')[0],
    };

    onSave(payload);
    resetForm();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        {editingCustomer ? 'Müşteri Kaydını Güncelle' : 'Yeni Müşteri/Cari Ekle'}
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Firma Adı</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:ring-blue-500 focus:border-blue-500"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="ör. ABC Lojistik A.Ş."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">İletişim Kişisi</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:ring-blue-500 focus:border-blue-500"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            placeholder="ör. Ahmet Yılmaz"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">E-posta</label>
          <input
            type="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:ring-blue-500 focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ahmet@abclojistik.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Durum</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:ring-blue-500 focus:border-blue-500"
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
          >
            <option value="Potansiyel">Potansiyel</option>
            <option value="Aktif">Aktif</option>
            <option value="Pasif">Pasif</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Tahmini Yıllık Hacim (₺)</label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:ring-blue-500 focus:border-blue-500"
            value={annualRevenue}
            onChange={(e) => setAnnualRevenue(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="250000"
          />
        </div>

        <div className="md:col-span-2 flex gap-2 justify-end mt-2">
          {editingCustomer && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Vazgeç
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 shadow-sm"
          >
            {editingCustomer ? 'Güncelle' : 'Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
};