import { useContext, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProvider";
import Swal from "sweetalert2";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const Navbar = () => {
  const { user, setUser, logOut, cartItems } = useContext(AuthContext);
  const [isEnglish, setIsEnglish] = useState(true);

  console.log(user);

  const navLinks = (
    <>
      <NavLink className="navLinks" to={'/'}>Home</NavLink>
      <NavLink className="navLinks" to={'/shop'}>Shop</NavLink>
      <NavLink className="navLinks" to={'/cart'}>Cart</NavLink>
    </>
  );

  const handleLogOut = () => {
    logOut()
      .then(() => {
        localStorage.removeItem('user');
        setUser(null);
        Swal.fire({
          icon: "success",
          title: "",
          text: "You've successfully logged out.",
          footer: '<p>Ready to Explore?</p>'
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Something is not right.",
          text: error.message,
          footer: '<p>Ready to Explore?</p>'
        });
      });
  };

  return (
    <div className="navbar bg-base-100 md:mt-4 px-5 md:px-12 lg:px-28 sticky top-0 border-b z-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          </ul>
        </div>
        <a href="https://medico-mall.web.app/">
          <img
            src="https://i.ibb.co/1mnbK2P/medico-mall-rect-removebg-preview.png"
            className="h-10 md:h-24 rounded-md"
            alt="medico-mall-rect-removebg-preview" border="0" />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal">
          {navLinks}
        </ul>
      </div>
      <div className="navbar-end flex gap-2 md:gap-5">
        {
          user &&
          <div className="relative cursor-pointer">
            <Link to={'/cart'}><FaCartPlus className="size-4 md:size-6" /></Link>
            <div className="px-1 py-0 rounded-full bg-[#93b142e8] text-center text-xs text-white absolute -top-2 -right-2">{cartItems && cartItems.length}</div>
          </div>
        }

        <div className="dropdown dropdown-bottom dropdown-end">
          <div tabIndex={0} role="button" className="m-1 border px-2 py-2 rounded-md min-w-24 flex justify-between">
            <span>{isEnglish ? 'English' : 'বাংলা'}</span>
            <span>▼</span>
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a onClick={() => setIsEnglish(!isEnglish)}>{!isEnglish ? 'English' : 'বাংলা'}</a></li>
          </ul>
        </div>

        {
          (user) ? (
            <div className="dropdown dropdown-bottom dropdown-end">
              <button>
                <a
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={user.displayName}
                  data-tooltip-place="top"
                >
                  <img src={user?.photoURL} tabIndex={0} className="size-12 rounded-full bg-green-300 dropdown dropdown-bottom dropdown-end" />
                </a>
              </button>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><Link className="bg-blue-900 text-white">{user.displayName}</Link></li>
                <li><Link>Update Profile</Link></li>
                <li><Link>Dashboard</Link></li>
                <li><button className="bg-red-700 text-white" onClick={handleLogOut}>Logout</button></li>
              </ul>
            </div>
          ) : (
            <Link to={'/register'} className="btn rounded-full bg-[#A6D71C] text-white">JOIN US</Link>
          )
        }
        <Tooltip id="my-tooltip" />
      </div>
    </div>
  );
};

export default Navbar;