import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Users, Trash2, Edit, CheckCircle, XCircle, Search, Plus, ArrowLeft } from 'lucide-react';
import AnimatedLoader from '../components/AnimatedLoader';
import Message from '../components/Message';
import { listUsers, deleteUser } from '../actions/userActions';

const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [confirmText, setConfirmText] = useState('');

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete, loading: loadingDelete, error: errorDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, userInfo, successDelete]);

  const deleteHandler = (userId) => {
    setUserToDelete(userId);
    setShowDeleteModal(true);
    setConfirmText('');
  };

  const confirmDeleteHandler = () => {
    if (confirmText === 'ВИДАЛИТИ') {
      dispatch(deleteUser(userToDelete));
      setShowDeleteModal(false);
      setUserToDelete(null);
      setConfirmText('');
    }
  };

  // Filter users based on search term
  const filteredUsers = users
    ? users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <>
      {/* Page spacing for fixed header */}
      <div className="pt-20 pb-4"></div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-fadeIn p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Link to="/admin/discounts" className="mr-4">
              <ArrowLeft className="text-gray-500 hover:text-blue-600 transition-colors" />
            </Link>
            <h1 className="text-2xl font-bold flex items-center">
              <Users size={28} className="mr-3 text-blue-600" />
              Керування користувачами
            </h1>
          </div>
          <Link
            to="/admin/user/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
          >
            <Plus size={18} className="mr-2" />
            Новий користувач
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Пошук користувачів..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-100 border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
          </div>
        </div>

        {loadingDelete && <AnimatedLoader />}
        {errorDelete && <Message variant="error">{errorDelete}</Message>}
        {successDelete && (
          <Message variant="success" className="mb-4">
            Користувача успішно видалено
          </Message>
        )}

        {loading ? (
          <AnimatedLoader />
        ) : error ? (
          <Message variant="error">{error}</Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Ім'я
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Адмін
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Дії
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user._id.substring(0, 10)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-bold">{user.name.charAt(0).toUpperCase()}</span>
                        </div>
                        <div className="ml-2">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.isAdmin ? (
                        <span className="flex items-center text-green-600">
                          <CheckCircle size={16} className="mr-1" />
                          Так
                        </span>
                      ) : (
                        <span className="flex items-center text-red-600">
                          <XCircle size={16} className="mr-1" />
                          Ні
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link
                          to={`/admin/user/${user._id}/edit`}
                          className="text-blue-600 hover:text-blue-900 bg-blue-100 p-2 rounded-lg transition-colors"
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          onClick={() => deleteHandler(user._id)}
                          className="text-red-600 hover:text-red-900 bg-red-100 p-2 rounded-lg transition-colors"
                          disabled={user._id === userInfo._id}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/7486/7486754.png"
                  alt="No users found"
                  className="w-24 h-24 mx-auto mb-4 opacity-50"
                />
                <h3 className="text-xl font-bold text-gray-600 mb-2">Користувачів не знайдено</h3>
                <p className="text-gray-500">Спробуйте змінити параметри пошуку</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg w-96 z-10 p-6 animate-fadeInDown">
            <h3 className="text-xl font-bold mb-4 text-red-600 flex items-center">
              <Trash2 size={24} className="mr-2" />
              Підтвердження видалення
            </h3>
            <p className="mb-6 text-gray-700">
              Ви дійсно хочете видалити цього користувача? Ця дія незворотна.
            </p>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Введіть "ВИДАЛИТИ" для підтвердження:
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
              >
                Скасувати
              </button>
              <button
                onClick={confirmDeleteHandler}
                className={`bg-red-600 text-white px-4 py-2 rounded-lg transition-colors ${
                  confirmText === 'ВИДАЛИТИ' ? 'hover:bg-red-700' : 'opacity-50 cursor-not-allowed'
                }`}
                disabled={confirmText !== 'ВИДАЛИТИ'}
              >
                Видалити
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserListScreen;