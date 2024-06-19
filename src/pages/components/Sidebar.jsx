// src/components/Sidebar.js
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-gray-800 text-white h-full fixed">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>
      <nav className="mt-10">
        <ul>
          <li className={`px-4 py-2 hover:bg-gray-700 ${location.pathname === '/admin' ? 'bg-gray-700' : ''}`}>
            <Link to="/admin">Home</Link>
          </li>
          <li className={`px-4 py-2 hover:bg-gray-700 ${location.pathname === '/admin/users' ? 'bg-gray-700' : ''}`}>
            <Link to="/admin/users">Manage Users</Link>
          </li>
          <li className={`px-4 py-2 hover:bg-gray-700 ${location.pathname === '/admin/categories' ? 'bg-gray-700' : ''}`}>
            <Link to="/admin/categories">Manage Category</Link>
          </li>
          <li className={`px-4 py-2 hover:bg-gray-700 ${location.pathname === '/admin/payments' ? 'bg-gray-700' : ''}`}>
            <Link to="/admin/payments">Payment Management</Link>
          </li>
          <li className={`px-4 py-2 hover:bg-gray-700 ${location.pathname === '/admin/sales' ? 'bg-gray-700' : ''}`}>
            <Link to="/admin/sales">Sales Report</Link>
          </li>
          <li className={`px-4 py-2 hover:bg-gray-700 ${location.pathname === '/admin/banners' ? 'bg-gray-700' : ''}`}>
            <Link to="/admin/banners">Manage Banner Advertise</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
