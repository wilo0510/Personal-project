import React from 'react';

const Login: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex w-10/12 min-h-[600px] overflow-hidden bg-white rounded-lg shadow-lg">
        {/* Left Section: Logo */}
        <div className="w-1/2 flex items-center justify-center background-specific">
          <img
            src="/images/logo.png" // Replace with your logo path
            alt="Logo"
            className="w-2/3 h-auto"
          />
        </div>

        {/* Right Section: Form */}
        <div className="w-1/2 p-8 flex flex-col justify-center items-center">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">Login to your account</h2>
          <form className="w-full max-w-md">
            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600 ">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 mt-2 border rounded-lg bg-stone-100"
                placeholder="Please enter your email"
              />
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 mt-2 border rounded-lg bg-stone-100"
                placeholder="Enter password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mainButton w-full px-4 py-2 text-white rounded-lg "
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;