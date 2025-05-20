import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { getDiscountDetails, updateDiscount } from '../actions/discountActions';
import { DISCOUNT_UPDATE_RESET } from '../constants/discountConstants';

const DiscountEditScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [percentOff, setPercentOff] = useState(0);
  const [validUntil, setValidUntil] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const discountDetails = useSelector((state) => state.discountDetails);
  const { loading, error, discount } = discountDetails;

  const discountUpdate = useSelector((state) => state.discountUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = discountUpdate;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    }
    
    if (successUpdate) {
      dispatch({ type: DISCOUNT_UPDATE_RESET });
      navigate('/admin/discounts');
    } else {
      if (!discount || discount._id !== id) {
        dispatch(getDiscountDetails(id));
      } else {
        setTitle(discount.title);
        setDescription(discount.description);
        setCode(discount.code);
        setPercentOff(discount.percentOff);
        // Format date to YYYY-MM-DD for input type date
        setValidUntil(discount.validUntil.substring(0, 10));
        setCategory(discount.category);
        setImageUrl(discount.imageUrl || '');
      }
    }
  }, [dispatch, id, discount, navigate, successUpdate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateDiscount({
        _id: id,
        title,
        description,
        code,
        percentOff,
        validUntil,
        category,
        imageUrl,
      })
    );
  };

  return (
    <>
      <Link
        to="/admin/discounts"
        className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded inline-block mb-6"
      >
        Назад
      </Link>
      <FormContainer>
        <h1 className="text-2xl font-bold mb-6">Редагувати знижку</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="error">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="error">{error}</Message>
        ) : (
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block mb-2 font-medium" htmlFor="title">
                Назва
              </label>
              <input
                type="text"
                id="title"
                placeholder="Введіть назву"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium" htmlFor="description">
                Опис
              </label>
              <textarea
                id="description"
                placeholder="Введіть опис"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium" htmlFor="code">
                Код знижки
              </label>
              <input
                type="text"
                id="code"
                placeholder="Введіть код знижки"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium" htmlFor="percentOff">
                Відсоток знижки
              </label>
              <input
                type="number"
                id="percentOff"
                placeholder="Введіть відсоток знижки"
                value={percentOff}
                onChange={(e) => setPercentOff(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
                max="99"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium" htmlFor="validUntil">
                Дійсно до
              </label>
              <input
                type="date"
                id="validUntil"
                value={validUntil}
                onChange={(e) => setValidUntil(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium" htmlFor="category">
                Категорія
              </label>
              <input
                type="text"
                id="category"
                placeholder="Введіть категорію"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium" htmlFor="imageUrl">
                URL зображення
              </label>
              <input
                type="text"
                id="imageUrl"
                placeholder="Введіть URL зображення"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Оновити
            </button>
          </form>
        )}
      </FormContainer>
    </>
  );
};

export default DiscountEditScreen;