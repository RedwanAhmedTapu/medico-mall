import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider";



const Category = () => {
  const { categories, medicines } = useContext(AuthContext);
  return (
    <div className="px-5 py-10 text-center">
      <h2 className="text-3xl font-bold mb-5 md:mb-10">Categories {categories && categories.length}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-5 md:px-4 lg:px-20">

        {categories && categories.map((category, index) => (
          <div key={index} className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure className="p-2"><img src={category.image} className="h-60 w-full rounded-xl" /></figure>
            <div className="card-body">
              <h2 className="card-title">{category.name}</h2>
              <p className="text-left">Available medicine: {(medicines && (medicines.filter(medicine => medicine.category === category.name)).length)}</p>
              {/* <p className="text-left">Available medicine: {medicines.length}</p> */}
              <div className="card-actions justify-end">
                <Link to={`/category/${category.name.toLowerCase()}`} className="btn btn-primary btn-info">See all</Link>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Category;
