import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const username = form.username.value;
    const email = form.email.value.toLowerCase();
    const photoURL = form.photoURL.value;
    const role = form.role.value;
    const password = form.password.value;
    console.log(username, email, photoURL, role, password);

    createUser(email, password)
      .then(userCredential => userCredential.user)
      .then(currentUser => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Successfully logged in as " + currentUser.email,
          footer: '<p>Ready to Explore?</p>'
        });
        //upload user data to userDB
        console.log(currentUser);
        const updatedUser = { ...currentUser, username, displayName: username, photoURL, role, password, cartItems: []};
        axios.post('https://medico-mall-server.vercel.app/users', updatedUser)
          .then(res => res.data)
          .then(data => {
            console.log(data)
            axios.get(`https://medico-mall-server.vercel.app/users?email=${email}`)
              .then(res => res.data)
              .then(data => {
                localStorage.setItem('user', JSON.stringify(data));
              })
              .catch(err => console.log(err.message))
            // navigate to home page after fetching data
            navigate('/');
          })
          .catch(err => console.log(err.message));
      })

      .catch(error => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
          footer: '<p>Why do I have this issue?</p>'
        });
      })
  }

  return (
    <div>
      <div className="font-[sans-serif] text-[#333]">
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
          <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
            <div className="max-md:text-center py-12 px-6 lg:px-16">
              <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight lg:leading-[55px] mb-6">
                Seamless Login for Exclusive Access
              </h2>
              <p className="text-base lg:text-lg mt-6">
                Immerse yourself in a hassle-free login journey with our intuitively designed login form. Effortlessly access your account.
              </p>
              <p className="text-base lg:text-lg mt-10">
                Already have an account?
                <Link to='/login' className="text-blue-600 font-semibold hover:underline ml-1">
                  Log in
                </Link>
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-6 max-w-md md:ml-auto max-md:mx-auto w-full">
              <h3 className="text-3xl font-extrabold mb-8 max-md:text-center">
                Sign up
              </h3>
              {/* user name input field */}
              <div>
                <input name="username" type="text" autoComplete="username" required className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-600" placeholder="Username" />
              </div>
              {/* email input field */}
              <div>
                <input name="email" type="email" autoComplete="email" required className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-600" placeholder="Email address" />
              </div>
              {/* photo upload input field */}
              <div>
                <input name="photoURL" type="text" autoComplete="photoURL" required className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-600" placeholder="Photo URL" />
              </div>
              {/* role (user or seller) */}
              <div>
                <select
                  defaultValue={'DEFAULT'}
                  name="role"
                  required
                  className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-600 elect select-ghost text-slate-400"
                >
                  <option value="DEFAULT" disabled>Select your role</option>
                  <option value="user" className="text-black">User</option>
                  <option value="seller" className="text-black">Seller</option>
                </select>
              </div>

              {/* password field */}
              <div>
                <input name="password" type="password" autoComplete="current-password" required className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-600" placeholder="Password" />
              </div>
              {/* submit button */}
              <div className="!mt-10">
                <button type="submit" className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;