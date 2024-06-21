import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider";

const Login = () => {
  const { signInUser, signInGoogle, signInGitHub } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;

    try {
      await signInUser(email.value, password.value);
      navigateUser();
    } catch (error) {
      Swal.fire({
        position: "center center",
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInGoogle();
      navigateUser();
    } catch (error) {
      Swal.fire({
        position: "center-center",
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await signInGitHub();
      navigateUser();
    } catch (error) {
      Swal.fire({
        position: "center-center",
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  const navigateUser = () => {
    const userEmail = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).reloadUserInfo.email : null; // Assuming you store user role in localStorage after authentication
    if (userEmail === "admin@gmail.com") {
      navigate("/admin");
    } else if (userEmail === "seller@gmail.com") {
      navigate("/seller");
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      <div className="font-[sans-serif] text-[#333]">
        <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
          <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
            <div className="max-md:text-center">
              <h2 className="lg:text-5xl text-4xl font-extrabold lg:leading-[55px]">
                Seamless Login for Exclusive Access
              </h2>
              <p className="text-sm mt-6">Immerse yourself in a hassle-free login journey with our intuitively designed login form. Effortlessly access your account.</p>
              <p className="text-sm mt-10">Don&apos;t have an account <Link to='/register' className="text-blue-600 font-semibold hover:underline ml-1">Register here</Link></p>
            </div>

            <div className="max-w-md md:ml-auto max-md:mx-auto w-full">
              <form onSubmit={handleSignIn} className="space-y-6">
                <h3 className="text-3xl font-extrabold mb-8 max-md:text-center">
                  Log in
                </h3>
                <div>
                  <input name="email" type="email" autoComplete="email" required className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-600" placeholder="Email address" />
                </div>
                <div>
                  <input name="password" type="password" autoComplete="current-password" required className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-600" placeholder="Password" />
                </div>
                <div className="!mt-10">
                  <button className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                    Log in
                  </button>
                </div>
              </form>

              <p className="my-10 text-sm text-gray-400 text-center">or continue with</p>
              <div className="space-x-6 flex justify-center">
                {/* continue with google */}
                <button onClick={handleGoogleSignIn} className="border-none outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30px" className="inline" viewBox="0 0 512 512">
                    <path fill="#fbbd00"
                      d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                      data-original="#fbbd00" />
                    <path fill="#0f9d58"
                      d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                      data-original="#0f9d58" />
                    <path fill="#31aa52"
                      d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                      data-original="#31aa52" />
                    <path fill="#3c79e6"
                      d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                      data-original="#3c79e6" />
                    <path fill="#cf2d48"
                      d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                      data-original="#cf2d48" />
                    <path fill="#eb4132"
                      d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                      data-original="#eb4132" />
                  </svg>
                </button>

                {/* continue with github */}
                <button onClick={handleGithubSignIn} className="border-none outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30px"
                    fill="#000"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.744.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.998.108-.775.418-1.305.76-1.605-2.665-.305-5.467-1.332-5.467-5.931 0-1.31.469-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.007-.323 3.3 1.23.957-.266 1.984-.399 3.005-.404 1.02.005 2.048.138 3.006.404 2.292-1.553 3.297-1.23 3.297-1.23.653 1.653.241 2.873.118 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.807 5.623-5.479 5.921.429.37.813 1.103.813 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.217.694.824.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Login;