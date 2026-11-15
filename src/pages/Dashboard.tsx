import React, { useState, useEffect } from 'react';
import type { Customer } from '../interfaces/customer';
import { CustomerForm } from '../components/CustomerForm';
import { CustomerList } from '../components/CustomerList';

const STORAGE_KEY = 'erp_crm_customers';

export const Dashboard: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
  }, [customers]);

  const handleSaveCustomer = (customerData: Customer) => {
    if (editingCustomer) {
      setCustomers((prev) => prev.map((c) => (c.id === customerData.id ? customerData : c)));
      setEditingCustomer(null);
    } else {
      setCustomers((prev) => [customerData, ...prev]);
    }
  };

  const handleDeleteCustomer = (id: string) => {
    if (window.confirm('Bu müşteri kaydını silmek istediğinizden emin misiniz?')) {
      setCustomers((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-slate-900 text-white p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tight">Enterprise CRM & Sales Portal</h1>
          <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-md border border-slate-700">
            v1.0.0
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <CustomerForm
          onSave={handleSaveCustomer}
          editingCustomer={editingCustomer}
          onCancelEdit={() => setEditingCustomer(null)}
        />
        <CustomerList
          customers={customers}
          onEdit={(cust) => setEditingCustomer(cust)}
          onDelete={handleDeleteCustomer}
        />
      </main>
    </div>
  );
};