import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import axiosInstance from "../../api/axiosInstance";


const AskForAdvertisement = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [medicineName, setMedicineName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  const fetchAdvertisements = async () => {
    try {
      const response = await axiosInstance.get('/seller/advertisements');
      setAdvertisements(response.data);
    } catch (error) {
      console.error('Failed to fetch advertisements:', error);
    }
  };

  const handleAddAdvertisement = async () => {
    try {
      const newAdvertisement = {
        medicineName,
        image,
        description,
      };
      const response = await axiosInstance.post('/seller/advertisements', newAdvertisement);
      if (response.status === 201) {
        fetchAdvertisements(); // Refresh advertisements list
        clearFormFields();
        setModalIsOpen(false); // Close modal
        alert('Advertisement added successfully!');
      } else {
        console.error('Failed to add advertisement');
      }
    } catch (error) {
      console.error('Failed to add advertisement:', error);
    }
  };

  const clearFormFields = () => {
    setMedicineName('');
    setImage('');
    setDescription('');
  };

  return (
    <div className="p-6 ml-64">
      <h2 className="text-3xl font-bold mb-6">Ask For Advertisement</h2>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4" onClick={() => setModalIsOpen(true)}>Add Advertisement</button>

      {/* Modal for adding new advertisement */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Add Advertisement"
        className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
          <h2 className="text-2xl mb-4">Add Advertisement</h2>
          <form>
            <input 
              type="text" 
              className="border p-2 rounded mb-4 w-full" 
              placeholder="Medicine Name" 
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
            />
            <input 
              type="text" 
              className="border p-2 rounded mb-4 w-full" 
              placeholder="Image URL" 
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <textarea
              className="border p-2 rounded mb-4 w-full"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
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
              onClick={handleAddAdvertisement}
            >
              Add Advertisement
            </button>
          </div>
        </div>
      </Modal>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Medicine Name</th>
            <th className="py-2">Image</th>
            <th className="py-2">Description</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {advertisements.map(advertisement => (
            <tr key={advertisement._id}>
              <td className="py-2">{advertisement._id}</td>
              <td className="py-2">{advertisement.medicineName}</td>
              <td className="py-2"><img src={advertisement.image} alt={advertisement.medicineName} width="50" /></td>
              <td className="py-2">{advertisement.description}</td>
              <td className="py-2">{advertisement.status ? 'Active' : 'Inactive'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AskForAdvertisement;
