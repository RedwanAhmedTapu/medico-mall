// src/components/CategoryManagement.js
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from "../../api/axiosInstance";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const { register, handleSubmit, reset, setValue } = useForm();
  const formRef = useRef(null);

  useEffect(() => {
    // Fetch categories from the backend
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/admin/categories');
        setCategories(response.data);
      } catch (error) {
        toast.error('Failed to fetch categories');
      }
    };

    fetchCategories();
  }, []);

  const addCategory = async (data) => {
    try {
      const response = await axios.post('http://localhost:8080/admin/categories', data);
      setCategories([...categories, { ...data, _id: response.data.insertedId }]);
      toast.success('Category added successfully');
      reset();
    } catch (error) {
      toast.error('Failed to add category');
    }
  };

  const updateCategory = async (id, data) => {
    try {
      await axios.put(`http://localhost:8080/admin/categories/${id}`, data);
      setCategories(categories.map(cat => (cat._id === id ? { ...cat, ...data } : cat)));
      toast.success('Category updated successfully');
      setEditCategoryId(null);
      reset();
    } catch (error) {
      toast.error('Failed to update category');
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/admin/categories/${id}`);
      setCategories(categories.filter(cat => cat._id !== id));
      toast.success('Category deleted successfully');
    } catch (error) {
      toast.error('Failed to delete category');
    }
  };

  const handleFormSubmit = (data) => {
    if (editCategoryId) {
      updateCategory(editCategoryId, data);
    } else {
      addCategory(data);
    }
  };

  const handleEdit = (category) => {
    setEditCategoryId(category._id);
    // setValue('name', category.name);
    // setValue('image', category.image);

    // Scroll to form and focus on input field
    formRef.current.scrollIntoView({ behavior: 'smooth' });
    document.getElementById('name').focus();
  };

  return (
    <div className="p-6 ml-64">
      <h2 className="text-3xl font-bold mb-6">Manage Category</h2>
      <table className="min-w-full bg-white mb-6">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Name</th>
            <th className="py-2">Image</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category._id}>
              <td className="py-2">{category._id}</td>
              <td className="py-2">
              
                  {category.name}
               
              </td>
              <td className="py-2">
               
                  <img src={category.image} alt={category.name} width="50" />
                
              </td>
              <td className="py-2">
               
                    <button
                      className="bg-yellow-500 text-white px-4 py-1 rounded"
                      onClick={() => handleEdit(category)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-1 rounded ml-2"
                      onClick={() => deleteCategory(category._id)}
                    >
                      Delete
                    </button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form ref={formRef} onSubmit={handleSubmit(handleFormSubmit)} className="bg-white p-4 rounded shadow">
        <h3 className="text-xl mb-4">{editCategoryId ? 'Update Category' : 'Add New Category'}</h3>
        {editCategoryId && (
          <>
            <div className="mb-4">
              <label className="block mb-1">Category Name</label>
              <input
                {...register('name', { required: true })}
                defaultValue=""
                id="name"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Category Image URL</label>
              <input
                {...register('image', { required: true })}
                defaultValue=""
                className="w-full p-2 border rounded"
              />
            </div>
          </>
        )}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editCategoryId ? 'Save' : 'Add Category'}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CategoryManagement;
