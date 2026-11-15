import React from 'react';
import type { Customer } from '../interfaces/customer';

interface CustomerListProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
}

export const CustomerList: React.FC<CustomerListProps> = ({ customers, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
        <h3 className="font-semibold text-gray-700">Müşteri ve Cari Kayıtları</h3>
        <span className="text-sm bg-blue-100 text-blue-800 py-1 px-3 rounded-full font-medium">
          Toplam: {customers.length} Kayıt
        </span>
      </div>

      {customers.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          Henüz kayıtlı bir müşteri bulunmamaktadır. Yukarıdaki formdan yeni bir kayıt ekleyebilirsiniz.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider border-b border-gray-100">
                <th className="p-4">Firma Adı</th>
                <th className="p-4">Kontak</th>
                <th className="p-4">E-posta</th>
                <th className="p-4">Durum</th>
                <th className="p-4">Yıllık Hacim</th>
                <th className="p-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-medium text-gray-900">{c.companyName}</td>
                  <td className="p-4 text-gray-600">{c.contactName}</td>
                  <td className="p-4 text-gray-600">{c.email}</td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        c.status === 'Aktif'
                          ? 'bg-green-100 text-green-800'
                          : c.status === 'Potansiyel'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">
                    {c.annualRevenue.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => onEdit(c)}
                      className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded transition-colors"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => onDelete(c.id)}
                      className="px-3 py-1 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded transition-colors"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};