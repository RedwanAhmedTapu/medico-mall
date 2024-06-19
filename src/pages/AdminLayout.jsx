// src/pages/AdminLayout.jsx
import { Outlet } from 'react-router-dom';
import Sidebar from '../pages/components/Sidebar';

const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
