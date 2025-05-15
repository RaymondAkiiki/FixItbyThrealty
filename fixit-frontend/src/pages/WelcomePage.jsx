import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-green-500">
      <div className="bg-white p-10 rounded-md shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome to Fixit by Threalty!</h1>
        <p className="text-gray-600 mb-8">
          Streamline your property management with our powerful, easy-to-use solution. Track maintenance, manage tenants, and handle vendors seamlessly.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link to="/login">
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
