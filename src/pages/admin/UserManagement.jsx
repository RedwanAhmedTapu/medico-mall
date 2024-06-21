import  { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axiosInstance from "../../api/axiosInstance";

import 'react-toastify/dist/ReactToastify.css';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the backend
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/admin/users'); // Update with the correct endpoint
        console.log(response,"admin")
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          throw new Error('API response is not an array');
        }
      } catch (error) {
        toast.error('Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (id, newRole) => {
    try {
      const endpointMap = {
        seller: `/admin/users/${id}/make-seller`,
        admin: `/admin/users/${id}/make-admin`,
        user: `/admin/users/${id}/downgrade`,
      };

      const response = await axiosInstance.put(endpointMap[newRole]);

      if (response.status === 200) {
        const updatedUsers = users.map(user =>
          user._id === id ? { ...user, role: newRole } : user
        );
        setUsers(updatedUsers);

        const updatedUser = updatedUsers.find(user => user._id === id);
        toast.success(
          <> <span className='text-blue-500 text-xl'>{updatedUser.username}</span> role changed to {newRole}</>
        );
      } else {
        throw new Error('Failed to update role');
      }
    } catch (error) {
      toast.error(`Failed to change role to ${newRole}`);
    }
  };

  return (
    <div className="p-6 ml-64">
      <h2 className="text-3xl font-bold mb-6">Manage Users</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Name</th>
            <th className="py-2">Role</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) && users.map((user,index) => (
            <tr key={index}>
              <td className="py-2">{index}</td>
              <td className="py-2">{user.username}</td>
              <td className="py-2">{user.role}</td>
              <td className="py-2">
                <button
                  className="bg-blue-500 text-white px-4 py-1 rounded"
                  onClick={() => handleRoleChange(user._id, 'seller')}
                >
                  Make Seller
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-1 rounded ml-2"
                  onClick={() => handleRoleChange(user._id, 'admin')}
                >
                  Make Admin
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded ml-2"
                  onClick={() => handleRoleChange(user._id, 'user')}
                >
                  Downgrade
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default UsersManagement;
