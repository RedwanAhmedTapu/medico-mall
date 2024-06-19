import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { LuEye } from "react-icons/lu";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Shop = () => {
  const { user, medicines, setCartItems, cartItems, setLoading, loading } = useContext(AuthContext);
  console.log(medicines);
  const navigate = useNavigate();

  // add item to cart
  const addToCart = (medicine) => {
    if (!user) {
      Swal.fire({
        icon: "info",
        title: "Login first",
        text: "login first to add item to cart.",
        footer: '<p>Ready to Explore?</p>'
      });
      navigate('/login');
      return;
    }
    setLoading(true);
    axios.patch(`https://medico-mall-server.vercel.app/user/${user.email}`, { medicine, operation: "add" })
      .then(res => res.data)
      .then(data => {
        console.log(data)
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Medicine added to cart.",
          showConfirmButton: false,
          timer: 1500
        });
        setCartItems([...cartItems, { medicine }]);
        console.log(data);
      })
      .catch(err => console.log(err.message))
      .finally(() => {
        setLoading(false);
      })
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="overflow-x-auto">
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-700 bg-opacity-50">
            <div className="loader"/>
            <div className="lds-ellipsis"><div/><div/><div/><div/></div>
          </div>
        )}
        <table className="table">
          {/* head */}
          <thead>
            <tr className="border-b border-slate-300">
              <th>serial</th>
              <th>Name</th>
              <th>Company</th>
              <th>Price</th>
              <th>Add to Cart</th>
              <th>view</th>
            </tr>
          </thead>
          <tbody>
            {
              medicines &&
              medicines.map((medicine, index) =>
                <tr key={medicine.name} className="border-b border-gray-300">
                  <td>
                    {index + 1}
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">{medicine.name}</div>
                        <div className="text-sm opacity-50">{medicine.generic}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {medicine.company}
                    <br />
                    <span className="badge badge-ghost badge-sm">{medicine.category}</span>
                  </td>
                  <td>${medicine.price}</td>
                  <th>
                    <button onClick={() => addToCart(medicine)} className="btn bg-blue-800 btn-sm rounded-full text-white font-normal">select</button>
                  </th>
                  <th>
                    <label htmlFor={`modal_${medicine.id}`} className="btn bg-[#A6D71C] btn-sm rounded-full"><LuEye /></label>
                  </th>

                  {/* modal start */}
                  <td>

                    <input type="checkbox" id={`modal_${medicine.id}`} className="modal-toggle hidden" />
                    <div className="modal fixed inset-0 z-50 flex items-center justify-center p-4">
                      <label className="modal-backdrop fixed inset-0 bg-black opacity-50" htmlFor={`modal_${medicine.id}`}></label>
                      <div className="modal-box w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg overflow-y-auto relative">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                          <div className="w-full md:w-1/2 p-4">
                            <img src={medicine.img} alt="Medicine" className="rounded-lg shadow-md hover:shadow-lg transition duration-300 w-full" />
                          </div>
                          <div className="w-2/3 p-4">
                            <h3 className="text-3xl font-bold mb-4 text-blue-700">{medicine.name}</h3>
                            <p className="mb-2 text-gray-600"><span className="font-bold">Generic:</span>{medicine.generic}</p>
                            <p className="mb-2 text-gray-600"><span className="font-bold">Company:</span> {medicine.company}</p>
                            <p className="mb-2 text-gray-600"><span className="font-bold">ID:</span> {medicine.id}</p>
                            <p className="mb-2 text-gray-600"><span className="font-bold">Category:</span> {medicine.category}</p>
                            <p className="mb-2 text-gray-600"><span className="font-bold">Price:</span> ${medicine.price}</p>
                            <p className="text-gray-600"><span className="font-bold">Registered: </span>{medicine.isRegistered ? "Registered" : "Not Registered"}</p>
                          </div>
                        </div>
                        <div className="p-4 mt-4 border-t border-gray-300">
                          <h4 className="text-xl font-bold text-blue-700 mb-2">Safety Advice</h4>
                          <ul className="list-disc list-inside text-gray-600">
                            {
                              medicine.safetyAdvice.map((safetyAdv, index) =>
                                <li key={index} className="list-none">
                                  <div className="py-3">
                                    <h1 className="font-bold text-lg">{safetyAdv.status}</h1>
                                    <h1>{safetyAdv.advice}</h1>
                                  </div>
                                </li>)
                            }
                            {/* Add more safety advices dynamically */}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </td>


                </tr>

              )}



          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </tfoot>

        </table>
      </div>
    </div>
  );
};

export default Shop;