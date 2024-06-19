// src/pages/admin/SalesReport.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SalesReport = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    // Fetch sales data from backend
    const fetchSales = async () => {
      try {
        const response = await axios.get('http://localhost:8080/admin/sales');
        setSales(response.data);
      } catch (error) {
        toast.error('Failed to fetch sales');
      }
    };

    fetchSales();
  }, []);

  const handleExport = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/sales/download', {
        responseType: 'blob', // Important for downloading files
      });

      // Create a blob from the response
      const blob = new Blob([response.data], { type: 'text/csv' });

      // Check for IE or Edge
      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, 'sales_report.csv');
      } else {
        // Create a link element, set its href attribute to blob URL, and trigger download
        const link = document.createElement('a');
        if (link.download !== undefined) {
          const url = URL.createObjectURL(blob);
          link.setAttribute('href', url);
          link.setAttribute('download', 'sales_report.csv');
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }

      toast.success('Sales report exported successfully');
    } catch (error) {
      toast.error('Failed to export sales report');
    }
  };

  return (
    <div className="p-6 ml-64">
      <h2 className="text-3xl font-bold mb-6">Sales Report</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medicine Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller Email</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer Email</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td className="px-6 py-4 whitespace-nowrap">{sale.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{sale.medicineName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{sale.sellerEmail}</td>
              <td className="px-6 py-4 whitespace-nowrap">{sale.buyerEmail}</td>
              <td className="px-6 py-4 whitespace-nowrap">{sale.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleExport}
      >
        Export to CSV
      </button>
      <ToastContainer />
    </div>
  );
};

export default SalesReport;
