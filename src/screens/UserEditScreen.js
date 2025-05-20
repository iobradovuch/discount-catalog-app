import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, User, Mail, ShieldAlert, CheckCircle } from 'lucide-react';
import AnimatedLoader from '../components/AnimatedLoader';
import Message from '../components/Message';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const UserEditScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
      return;
    }

    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } else {
      if (!user || !user.name || user._id !== id) {
        dispatch(getUserDetails(id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, id, user, navigate, successUpdate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        _id: id,
        name,
        email,
        isAdmin,
      })
    );
  };

  return (
    <>
      {/* Page spacing for fixed header */}
      <div className="pt-20 pb-4"></div>

      <Link
        to="/admin/userlist"
        className="inline-flex items-center bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg mb-6 transition-colors"
      >
        <ArrowLeft size={16} className="mr-1" />
        Назад до списку користувачів
      </Link>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-fadeIn">
        <div className="bg-blue-600 text-white p-6">
          <h1 className="text-2xl font-bold flex items-center">
            <User size={28} className="mr-3" />
            Редагування користувача
          </h1>
        </div>

        <div className="p-6">
          {loadingUpdate && <AnimatedLoader />}
          {errorUpdate && <Message variant="error">{errorUpdate}</Message>}
          {showSuccessMessage && (
            <div className="bg-green-100 text-green-700 p-4 mb-4 rounded-lg flex items-start animate-fadeInDown">
              <CheckCircle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
              <span>Інформацію користувача успішно оновлено!</span>
            </div>
          )}

          {loading ? (
            <AnimatedLoader />
          ) : error ? (
            <Message variant="error">{error}</Message>
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

              <div className="mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isAdmin"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isAdmin" className="ml-2 font-medium flex items-center">
                    <ShieldAlert size={18} className="mr-2 text-blue-600" />
                    Адміністратор
                  </label>
                </div>
                <p className="text-sm text-gray-500 mt-1 ml-7">
                  Адміністратори мають доступ до керування всіма користувачами та знижками
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center"
                >
                  Оновити
                </button>
                <Link
                  to="/admin/userlist"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center"
                >
                  Скасувати
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default UserEditScreen;