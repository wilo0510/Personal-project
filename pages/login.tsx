import React, {useState} from 'react';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [error,setError]=useState<string |null>(null);
  const [loading, setLoading]= useState(false);

  //Handle input change 
  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const {id, value} = e.target;
    if(id=== 'email'){
      setEmail(value);
    }else if(id === 'password'){
      setPassword(value);
    }
  };
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      // Handle the response, such as redirecting or storing tokens in state
      console.log('Login successful', data);
      localStorage.setItem('authToken', data.token);
      router.push('/dashboard');
      // Reset form
      setEmail('');
      setPassword('');
    } catch (err) {
      const errorMessage= err instanceof Error ? err.message: 'Unknown error ocurred';
      console.log(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex w-10/12 min-h-[600px] overflow-hidden bg-white rounded-lg shadow-lg ">
        {/* Left Section: Logo */}
        <div className="w-1/3 flex items-center justify-center background-specific">
          <img
            src="/images/logo.png" // Replace with your logo path
            alt="Logo"
            className="w-6/12 h-auto"
          />
        </div>

        {/* Right Section: Form */}
        <div className="w-2/3 p-8 flex flex-col justify-center items-center">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">Login to your account</h2>
          <form className="w-full max-w-md " onSubmit={handleSubmit}>
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
                value={email}
                onChange={handleChange}
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
                value={password}
                onChange={handleChange}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {/* Submit Button */}
            <button
              type="submit"
              className="mainButton w-full px-4 py-2 text-white rounded-lg "
              disabled={loading || email ==='' || password===''}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;