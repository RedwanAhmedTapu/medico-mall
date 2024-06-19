import { useContext, useEffect, useState } from "react";
import { LuEye } from "react-icons/lu";
import { AuthContext } from "./AuthProvider";
import { useLoaderData } from "react-router-dom";

const CategoryDetails = () => {
  const { medicines } = useContext(AuthContext);
  const category = useLoaderData();
  const [categorisedMedicines, setCategorisedMedicines] = useState([]); 
  // console.log("The Category we get from params: " + category);
  useEffect(()=>{
    medicines && setCategorisedMedicines(medicines.filter(medicine=>medicine.category.toLowerCase()===category));
    console.log(medicines);
  }, [medicines]);


  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-6xl text-center font-semibold">{category.toUpperCase()}</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>serial</th>
              <th>Name</th>
              <th>Company</th>
              <th>Price</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              categorisedMedicines.map((medicine, index) =>
                <tr key={medicine.name} className="">
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
                    <button className="btn btn-secondary btn-xs rounded-full">select</button>
                  </th>
                  <th>
                    <label htmlFor={`modal_${medicine.id}`} className="btn bg-green-400 btn-sm rounded-full"><LuEye /></label>
                  </th>

                  {/* modal start */}
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

export default CategoryDetails;