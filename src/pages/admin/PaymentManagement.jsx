// src/components/PaymentManagement.js

const PaymentManagement = () => {
  // Mock data
  const payments = [
    { id: 1, amount: 100, status: 'paid' },
    { id: 2, amount: 200, status: 'pending' },
  ];

  const handlePaymentStatusChange = (id) => {
    // Change payment status logic
    console.log(`Payment ${id} status changed to paid`);
  };

  return (
    <div className="p-6 ml-64">
      <h2 className="text-3xl font-bold mb-6">Payment Management</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Amount</th>
            <th className="py-2">Status</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment.id}>
              <td className="py-2">{payment.id}</td>
              <td className="py-2">${payment.amount}</td>
              <td className="py-2">{payment.status}</td>
              <td className="py-2">
                {payment.status === 'pending' && (
                  <button
                    className="bg-green-500 text-white px-4 py-1 rounded"
                    onClick={() => handlePaymentStatusChange(payment.id)}
                  >
                    Accept Payment
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentManagement;
