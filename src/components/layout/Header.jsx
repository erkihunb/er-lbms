import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="fixed w-full bg-white shadow-sm z-10">
      <div className="flex items-center justify-between h-16 px-6">
        <h1 className="text-xl font-semibold text-gray-800">
          Library Management System
        </h1>
        {user && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                {user.name.charAt(0)}
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700">
                {user.name}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-1" />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
