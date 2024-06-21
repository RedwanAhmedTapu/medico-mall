import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axiosInstance.get('/seller/payments');
      setPayments(response.data);
    } catch (error) {
      console.error('Failed to fetch payments:', error);
    }
  };

  return (
    <div className="p-6 ml-64">
      <h2 className="text-3xl font-bold mb-6">Payment History</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Medicine Name</th>
            <th className="py-2">Buyer Email</th>
            <th className="py-2">Total Price</th>
            <th className="py-2">Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment._id}>
              <td className="py-2">{payment._id}</td>
              <td className="py-2">{payment.medicineName}</td>
              <td className="py-2">{payment.buyerEmail}</td>
              <td className="py-2">{payment.totalPrice}</td>
              <td className="py-2">{payment.paymentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
