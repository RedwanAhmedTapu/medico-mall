// src/components/HomePage.js

const HomePage = () => {
  // Mock data
  const totalRevenue = 10000;
  const paidTotal = 8000;
  const pendingTotal = 2000;

  return (
    <div className="p-6 ml-64">
      <h2 className="text-3xl font-bold mb-6">Admin Home</h2>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl">Total Sales Revenue</h3>
          <p className="text-2xl">${totalRevenue}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl">Paid Total</h3>
          <p className="text-2xl">${paidTotal}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl">Pending Total</h3>
          <p className="text-2xl">${pendingTotal}</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
