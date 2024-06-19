// src/components/BannerManagement.js
import { useState, useEffect } from "react";
import axios from 'axios';

const BannerManagement = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    // Fetch banners from the backend
    const fetchBanners = async () => {
      try {
        const response = await axios.get('http://localhost:8080/admin/banners');
        setBanners(response.data);
      } catch (error) {
        console.error('Failed to fetch banners:', error);
      }
    };

    fetchBanners();
  }, []);

  const toggleSlide = async (id, addToSlider) => {
    try {
      const response = await axios.put(`http://localhost:8080/admin/banners/${id}/${addToSlider ? 'add-to-slider' : 'remove-from-slider'}`);
      if (response.data.modifiedCount === 1) {
        setBanners(banners.map(banner => (banner._id === id ? { ...banner, addToSlider } : banner)));
      } else {
        console.error(`Failed to ${addToSlider ? 'add' : 'remove'} banner from slider`);
      }
    } catch (error) {
      console.error(`Failed to ${addToSlider ? 'add' : 'remove'} banner from slider:`, error);
    }
  };

  return (
    <div className="p-6 ml-64">
      <h2 className="text-3xl font-bold mb-6">Manage Banner Advertise</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Name</th>
            <th className="py-2">Description</th>
            <th className="py-2">Seller Email</th>
            <th className="py-2">Image</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {banners.map(banner => (
            <tr key={banner._id}>
              <td className="py-2">{banner._id}</td>
              <td className="py-2">{banner.name}</td>
              <td className="py-2">{banner.description}</td>
              <td className="py-2">{banner.sellerEmail}</td>
              <td className="py-2"><img src={banner.image} alt={banner.name} width="50" /></td>
              <td className="py-2">
                <button
                  className={`px-4 py-1 rounded ${banner.addToSlider ? 'bg-red-500' : 'bg-green-500'} text-white`}
                  onClick={() => toggleSlide(banner._id, !banner.addToSlider)}
                >
                  {banner.addToSlider ? 'Remove from Slide' : 'Add to Slide'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BannerManagement;
