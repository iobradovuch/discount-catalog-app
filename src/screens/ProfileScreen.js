import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { User, Mail, Lock, Edit, AlertCircle, CheckCircle, ShieldAlert } from 'lucide-react';
import AnimatedLoader from '../components/AnimatedLoader';
import Message from '../components/Message';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Паролі не співпадають');
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          password: password ? password : undefined,
        })
      );
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
      // Clear password fields after update
      setPassword('');
      setConfirmPassword('');
      setMessage(null);
    }
  };

  return (
    <>
      {/* Page spacing for fixed header */}
      <div className="pt-20 pb-4"></div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-fadeIn">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="md:w-1/4 bg-blue-600 p-6 text-white">
            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 bg-blue-700 rounded-full flex items-center justify-center mb-4 border-4 border-blue-200">
                <span className="text-3xl font-bold">{name.charAt(0).toUpperCase()}</span>
              </div>
              <h2 className="text-xl font-bold">{name}</h2>
              <p className="text-blue-200">{email}</p>
              {userInfo && userInfo.isAdmin && (
                <div className="mt-2 bg-yellow-500 text-blue-800 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                  <ShieldAlert size={12} className="mr-1" />
                  Адміністратор
                </div>
              )}
            </div>

            <nav>
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left mb-2 flex items-center p-3 rounded-lg transition-colors ${
                  activeTab === 'profile' ? 'bg-blue-700' : 'hover:bg-blue-700/50'
                }`}
              >
                <User size={18} className="mr-3" />
                Мій профіль
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`w-full text-left mb-2 flex items-center p-3 rounded-lg transition-colors ${
                  activeTab === 'security' ? 'bg-blue-700' : 'hover:bg-blue-700/50'
                }`}
              >
                <Lock size={18} className="mr-3" />
                Безпека
              </button>
            </nav>
          </div>

          {/* Main content */}
          <div className="md:w-3/4 p-6">
            <div className={`${activeTab === 'profile' ? 'block' : 'hidden'}`}>
              <div className="border-b border-gray-200 pb-4 mb-6">
                <h3 className="text-2xl font-bold flex items-center">
                  <Edit size={24} className="mr-2 text-blue-500" />
                  Редагувати профіль
                </h3>
                <p className="text-gray-600">Оновіть особисту інформацію вашого профілю</p>
              </div>

              {message && (
                <Message variant="error" className="mb-4">
                  {message}
                </Message>
              )}
              {error && (
                <Message variant="error" className="mb-4">
                  {error}
                </Message>
              )}
              {showSuccessMessage && (
                <div className="bg-green-100 text-green-700 p-4 mb-4 rounded-lg flex items-start animate-fadeInDown">
                  <CheckCircle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
                  <span>Профіль успішно оновлено!</span>
                </div>
              )}

              {loading ? (
                <AnimatedLoader />
              ) : (
                <form onSubmit={submitHandler}>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium" htmlFor="name">
                      Ім'я
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        placeholder="Введіть ім'я"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                      <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2 font-medium" htmlFor="email">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        placeholder="Введіть email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                      <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center"
                  >
                    Оновити профіль
                  </button>
                </form>
              )}
            </div>

            <div className={`${activeTab === 'security' ? 'block' : 'hidden'}`}>
              <div className="border-b border-gray-200 pb-4 mb-6">
                <h3 className="text-2xl font-bold flex items-center">
                  <Lock size={24} className="mr-2 text-blue-500" />
                  Змінити пароль
                </h3>
                <p className="text-gray-600">Оновіть пароль для підвищення безпеки вашого облікового запису</p>
              </div>

              {message && (
                <div className="bg-red-100 text-red-700 p-4 mb-4 rounded-lg flex items-start">
                  <AlertCircle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
                  <span>{message}</span>
                </div>
              )}
              {error && (
                <Message variant="error" className="mb-4">
                  {error}
                </Message>
              )}
              {showSuccessMessage && (
                <div className="bg-green-100 text-green-700 p-4 mb-4 rounded-lg flex items-start animate-fadeInDown">
                  <CheckCircle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
                  <span>Пароль успішно оновлено!</span>
                </div>
              )}

              {loading ? (
                <AnimatedLoader />
              ) : (
                <form onSubmit={submitHandler}>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium" htmlFor="password">
                      Новий пароль
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        id="password"
                        placeholder="Введіть новий пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    </div>
                    <p className="text-gray-500 text-sm mt-1">
                      Залиште поле порожнім, якщо не бажаєте змінювати пароль
                    </p>
                  </div>

                  <div className="mb-6">
                    <label className="block mb-2 font-medium" htmlFor="confirmPassword">
                      Підтвердження паролю
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Підтвердіть новий пароль"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center"
                  >
                    Оновити пароль
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;