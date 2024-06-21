import { useContext, useEffect } from "react";
import { AuthContext } from "../AuthProvider";
import axios from "axios";
import { TiDelete } from "react-icons/ti";
import Swal from "sweetalert2";
import axiosInstance from "../api/axiosInstance";

const Cart = () => {
  const { cartItems, setCartItems, user, loading, setLoading } = useContext(AuthContext);

  // Fetching data
  useEffect(() => {
    if (user) {
      axiosInstance.get(`/users?email=${user.email}`)
        .then(res => res.data)
        .then(user => setCartItems(user.cartItems));
    }
  }, [user, setCartItems]);

  // Delete element
  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        axiosInstance.patch(`/user/${user.email}`, { _id, operation: "remove" })
          .then(res => res.data)
          .then(data => {
            console.log(data);

            // Update local state after successful deletion
            const newCartItems = cartItems.filter(item => item._id !== _id); // <-- Update local state
            setCartItems(newCartItems); // <-- Set the new state

            Swal.fire({
              position: 'top-end',
              title: "Deleted!",
              text: "Medicine has been removed from your cart.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });
          })
          .catch(err => console.log(err.message))
          .finally(() => {
            setLoading(false);
          });
      }
    });
  };

  return (
    <div>
      <h1>This is the cart page</h1>
      <h1>Total items in cart: {cartItems.length}</h1>
      <div className="overflow-x-auto bg-white border border-black">
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-700 bg-opacity-50">
            <div className="loader" />
            <div className="lds-ellipsis"><div /><div /><div /><div /></div>
          </div>
        )}
        <table className="table max-w-[1080px] mx-auto border border-black">
          {/* head */}
          <thead>
            <tr className="text-center">
              <th></th>
              <th>Sl</th>
              <th>Name</th>
              <th>Company</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Checkout</th>
            </tr>
          </thead>
          <tbody>
            {cartItems &&
              cartItems.map((cart, index) => (
                <tr key={index} className="text-center">
                  <th><button onClick={() => handleDelete(cart._id)} className="ml-auto"><TiDelete className="scale-[2] text-red-500" /></button></th>
                  <th>{index + 1}</th>
                  <td>{cart.name}</td>
                  <td>{cart.company}</td>
                  <td>${cart.price}</td>
                  <td>{cart.quantity}</td>
                  <td><button className="btn btn-sm my-auto bg-[#A6D71C]">Buy Now</button></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
