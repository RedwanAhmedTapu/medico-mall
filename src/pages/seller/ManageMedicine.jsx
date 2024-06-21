import React, { useState, useEffect } from "react";
import axios from 'axios';
import Modal from 'react-modal';

const ManageMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [sellerId, setSellerId] = useState('');
  const [name, setName] = useState('');
  const [generic, setGeneric] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [img, setImg] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const [massUnit, setMassUnit] = useState('Mg');
  const [perUnitPrice, setPerUnitPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');

  // Categories and Companies options
  const categories = ['Tablet', 'Syrup', 'Suspension', 'Inhaler', 'Capsule', 'Cream'];
  const companies = [
    'Square', 'Beximco', 'Popular', 'IBN Sina', 'AllerGen Inc.', 'Medico Pharma',
    'HealthCare Pharmaceuticals Ltd.', 'RespiraCare Ltd.', 'Global Pharmaceuticals',
    'VitaHealth Corp.', 'Diabetes Care Co.', 'GastroHealth Ltd.', 'DermCare Ltd.',
    'CoughRelief Pharma'
  ];

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await axios.get('http://localhost:8080/seller/medicines');
      setMedicines(response.data);
    } catch (error) {
      console.error('Failed to fetch medicines:', error);
    }
  };

  const handleAddMedicine = async () => {
    try {
      const newMedicine = {
        sellerId,
        name,
        generic,
        shortDescription,
        img,
        category,
        company,
        massUnit,
        perUnitPrice,
        discountPercentage
      };
      const response = await axios.post('http://localhost:8080/seller/medicines', newMedicine);
      if (response.status === 201) {
        fetchMedicines(); // Refresh medicines list
        clearFormFields();
        setModalIsOpen(false); // Close modal
      } else {
        console.error('Failed to add medicine');
      }
    } catch (error) {
      console.error('Failed to add medicine:', error);
    }
  };

  const clearFormFields = () => {
    setSellerId('');
    setName('');
    setGeneric('');
    setShortDescription('');
    setImg('');
    setCategory('');
    setCompany('');
    setMassUnit('Mg');
    setPerUnitPrice('');
    setDiscountPercentage('');
  };

  return (
    <div className="flex flex-col p-6">
      <h2 className="text-3xl font-bold mb-6">Manage Medicines</h2>
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setModalIsOpen(true)}
      >
        Add Medicine
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Add Medicine"
        className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
          <h2 className="text-2xl mb-4">Add Medicine</h2>
          <form className="grid grid-cols-2 gap-4">
            <input 
              type="text" 
              className="border p-2 rounded" 
              placeholder="Seller ID" 
              value={sellerId}
              onChange={(e) => setSellerId(e.target.value)}
            />
            <input 
              type="text" 
              className="border p-2 rounded" 
              placeholder="Item Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input 
              type="text" 
              className="border p-2 rounded" 
              placeholder="Item Generic Name" 
              value={generic}
              onChange={(e) => setGeneric(e.target.value)}
            />
            <input 
              type="text" 
              className="border p-2 rounded" 
              placeholder="Short Description" 
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
            />
            <input 
              type="text" 
              className="border p-2 rounded" 
              placeholder="Image URL" 
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />
            <select 
              className="border p-2 rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select 
              className="border p-2 rounded"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            >
              <option value="">Select Company</option>
              {companies.map((company) => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>
            <select 
              className="border p-2 rounded"
              value={massUnit}
              onChange={(e) => setMassUnit(e.target.value)}
            >
              <option value="Mg">Mg</option>
              <option value="ML">ML</option>
            </select>
            <input 
              type="number" 
              className="border p-2 rounded" 
              placeholder="Per Unit Price" 
              value={perUnitPrice}
              onChange={(e) => setPerUnitPrice(e.target.value)}
            />
            <input 
              type="number" 
              className="border p-2 rounded" 
              placeholder="Discount Percentage" 
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(e.target.value)}
            />
          </form>
          <div className="flex justify-end mt-4">
            <button 
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              onClick={() => setModalIsOpen(false)}
            >
              Cancel
            </button>
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleAddMedicine}
            >
              Add Medicine
            </button>
          </div>
        </div>
      </Modal>

      <div className="mt-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-2">Current Medicines</h3>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Item Name</th>
              <th className="py-2 px-4">Item Generic Name</th>
              <th className="py-2 px-4">Image</th>
              <th className="py-2 px-4">Short Description</th>
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Company</th>
              <th className="py-2 px-4">Mass Unit</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Discount (%)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {medicines.map((medicine, index) => (
              <tr key={index}>
                <td className="py-2 px-4 whitespace-nowrap">{medicine.id}</td>
                <td className="py-2 px-4">{medicine.name}</td>
                <td className="py-2 px-4">{medicine.generic}</td>
                <td className="py-2 px-4 flex justify-center items-center">
                  <img src={medicine.img} className="w-24 h-24 object-contain" alt={medicine.name} />
                </td>
                <td className="py-2 px-4">{medicine.shortDescription}</td>
                <td className="py-2 px-4">{medicine.category}</td>
                <td className="py-2 px-4">{medicine.company}</td>
                <td className="py-2 px-4">{medicine.massUnit}</td>
                <td className="py-2 px-4">{medicine.price}</td>
                <td className="py-2 px-4">{medicine.discountPercentage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMedicines;
