import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">

            {/* 🔥 LOGO + NAME */}
            <Link to="/home" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>

              <span className="text-xl font-bold text-textDark tracking-tight">
                SubZero<span className="text-primary-500">-AI</span>
              </span>
            </Link>

            {/* MENU */}
            <div className="hidden md:flex items-center gap-6">
              <Link 
                to="/home" 
                className={`text-sm font-bold transition-smooth ${isActive('/home') ? 'text-primary-500' : 'text-gray-400 hover:text-textDark'}`}
              >
                Home
              </Link>
              <Link 
                to="/dashboard" 
                className={`text-sm font-bold transition-smooth ${isActive('/dashboard') ? 'text-primary-500' : 'text-gray-400 hover:text-textDark'}`}
              >
                Dashboard
              </Link>
              <Link 
                to="/family-plan" 
                className={`text-sm font-bold transition-smooth ${isActive('/family-plan') ? 'text-primary-500' : 'text-gray-400 hover:text-textDark'}`}
              >
                Family Plan
              </Link>
              <Link 
                to="/savings" 
                className={`text-sm font-bold transition-smooth ${isActive('/savings') ? 'text-primary-500' : 'text-gray-400 hover:text-textDark'}`}
              >
                Savings
              </Link>
              <Link 
                to="/alerts" 
                className={`text-sm font-bold transition-smooth flex items-center gap-1.5 ${isActive('/alerts') ? 'text-primary-500' : 'text-gray-400 hover:text-textDark'}`}
              >
                Alerts
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-sm shadow-red-500/50" />
              </Link>
            </div>
          </div>

          {/* USER */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-warmBg px-3 py-1.5 rounded-full border border-gray-100">
              <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center text-white font-semibold">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="text-sm font-medium text-textDark hidden md:block">
                {user?.name || 'User'}
              </span>
            </div>

            <button
              onClick={logout}
              className="text-sm font-semibold text-error hover:bg-red-50 px-4 py-2 rounded-lg transition-smooth"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;