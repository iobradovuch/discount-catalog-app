import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import { ShoppingBag, Menu, X, User, Users, LogOut, Settings, Tag } from 'lucide-react';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileDropdownOpen && !event.target.closest('.profile-dropdown')) {
        setIsProfileDropdownOpen(false);
      }
      if (isAdminDropdownOpen && !event.target.closest('.admin-dropdown')) {
        setIsAdminDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileDropdownOpen, isAdminDropdownOpen]);

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
    setIsMenuOpen(false);
    setIsProfileDropdownOpen(false);
    setIsAdminDropdownOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-blue-600 shadow-lg py-2' : 'bg-blue-600/90 py-4'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <ShoppingBag className="text-white mr-2 transition-transform group-hover:scale-110 duration-300" size={28} />
          <span className="text-2xl font-bold text-white tracking-tight">
            Каталог
            <span className="text-yellow-300 ml-1 relative">
              Знижок
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce">%</span>
            </span>
          </span>
        </Link>
        
        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          {userInfo ? (
            <>
              {/* Admin dropdown */}
              {userInfo.isAdmin && (
                <div className="relative admin-dropdown">
                  <button
                    onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
                    className="text-white font-medium flex items-center group"
                  >
                    <Settings size={18} className="mr-1" />
                    Адмін
                    <span className={`ml-1 transition-transform duration-200 ${isAdminDropdownOpen ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-yellow-300"></span>
                  </button>
                  {isAdminDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 animate-fadeIn">
                      <Link
                        to="/admin/discounts"
                        onClick={() => setIsAdminDropdownOpen(false)}
                        className="block px-4 py-2 text-gray-800 hover:bg-blue-100 flex items-center"
                      >
                        <Tag size={16} className="mr-2 text-blue-600" />
                        Знижки
                      </Link>
                      <Link
                        to="/admin/userlist"
                        onClick={() => setIsAdminDropdownOpen(false)}
                        className="block px-4 py-2 text-gray-800 hover:bg-blue-100 flex items-center"
                      >
                        <Users size={16} className="mr-2 text-blue-600" />
                        Користувачі
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* User profile dropdown */}
              <div className="relative profile-dropdown">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="text-white font-medium flex items-center group"
                >
                  <User size={18} className="mr-1" />
                  {userInfo.name}
                  <span className={`ml-1 transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-yellow-300"></span>
                </button>
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 animate-fadeIn">
                    <Link
                      to="/profile"
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-100 flex items-center"
                    >
                      <User size={16} className="mr-2 text-blue-600" />
                      Мій профіль
                    </Link>
                    <button
                      onClick={logoutHandler}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-100 flex items-center"
                    >
                      <LogOut size={16} className="mr-2 text-red-600" />
                      Вийти
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white font-medium hover:text-yellow-300 transition-colors">
                Увійти
              </Link>
              <Link to="/register" className="bg-yellow-400 hover:bg-yellow-300 text-blue-800 px-4 py-2 rounded-full transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                Зареєструватися
              </Link>
            </>
          )}
        </nav>
        
        {/* Mobile menu button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 invisible'}`}>
        <div className="bg-blue-700 px-4 py-6 space-y-4 shadow-inner">
          {userInfo ? (
            <>
              <div className="px-2 py-3 bg-blue-800/50 rounded-lg">
                <p className="text-white font-medium flex items-center mb-2">
                  <User size={18} className="mr-2" />
                  {userInfo.name}
                </p>
                <div className="ml-7 flex flex-col space-y-2">
                  <Link 
                    to="/profile" 
                    className="text-white/90 hover:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Мій профіль
                  </Link>
                </div>
              </div>
              
              {userInfo.isAdmin && (
                <div className="px-2 py-3 bg-blue-800/50 rounded-lg">
                  <p className="text-white font-medium flex items-center mb-2">
                    <Settings size={18} className="mr-2" />
                    Адміністрування
                  </p>
                  <div className="ml-7 flex flex-col space-y-2">
                    <Link 
                      to="/admin/discounts" 
                      className="text-white/90 hover:text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Знижки
                    </Link>
                    <Link 
                      to="/admin/userlist" 
                      className="text-white/90 hover:text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Користувачі
                    </Link>
                  </div>
                </div>
              )}
              
              <button 
                onClick={logoutHandler} 
                className="w-full bg-red-500 text-white py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-red-600 transition-colors"
              >
                <LogOut size={18} />
                <span>Вийти</span>
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="block w-full bg-blue-600 text-white py-2 rounded-lg text-center hover:bg-blue-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Увійти
              </Link>
              <Link 
                to="/register" 
                className="block w-full bg-yellow-400 text-blue-800 py-2 rounded-lg text-center hover:bg-yellow-300 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Зареєструватися
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;