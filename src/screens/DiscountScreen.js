import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import AnimatedLoader from '../components/AnimatedLoader';
import Message from '../components/Message';
import { getDiscountDetails } from '../actions/discountActions';
import { ArrowLeft, Calendar, Tag, Share2, Copy, Check, ShoppingBag, Clock } from 'lucide-react';

const DiscountScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [copied, setCopied] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const discountDetails = useSelector((state) => state.discountDetails);
  const { loading, error, discount } = discountDetails;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      dispatch(getDiscountDetails(id));
    }
  }, [dispatch, id, navigate, userInfo]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(discount.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareDiscount = () => {
    if (navigator.share) {
      navigator.share({
        title: `Знижка ${discount.percentOff}% - ${discount.title}`,
        text: `Використай знижку ${discount.percentOff}% на ${discount.title} з кодом: ${discount.code}`,
        url: window.location.href,
      });
    } else {
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 2000);
    }
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('uk-UA', options);
  };

  const daysRemaining = (dateString) => {
    const today = new Date();
    const validUntil = new Date(dateString);
    const diff = validUntil - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <>
      {/* Page spacing for fixed header */}
      <div className="pt-20 pb-4"></div>
      
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg mb-6 transition-colors"
      >
        <ArrowLeft size={16} className="mr-1" />
        Назад
      </button>

      {loading ? (
        <AnimatedLoader />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : discount ? (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all animate-fadeIn">
          <div className="md:flex">
            {/* Discount Image Section */}
            <div className="md:w-1/2 relative overflow-hidden bg-gray-100 flex items-center justify-center" style={{minHeight: '300px'}}>
              {!isImageLoaded && <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
              </div>}
              {discount.imageUrl ? (
                <img
                  src={discount.imageUrl}
                  alt={discount.title}
                  onLoad={handleImageLoad}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
              ) : (
                <img
                  src="https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2070&auto=format&fit=crop"
                  alt={discount.title}
                  onLoad={handleImageLoad}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
              )}
              <div className="absolute top-0 left-0 m-4">
                <div className="bg-blue-600 text-white px-3 py-1 rounded-lg font-bold shadow-md animate-pulse">
                  {discount.percentOff}% знижка
                </div>
              </div>
            </div>
            
            {/* Discount Details Section */}
            <div className="p-6 md:w-1/2">
              <div className="flex items-center text-sm mb-3">
                <Tag size={16} className="mr-2 text-blue-500" />
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  {discount.category}
                </span>
                <button 
                  onClick={shareDiscount}
                  className="ml-auto bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors relative"
                >
                  <Share2 size={18} className="text-gray-600" />
                  {showShareTooltip && (
                    <div className="absolute right-0 top-full mt-2 bg-gray-800 text-white text-xs py-1 px-2 rounded">
                      Посилання скопійовано!
                    </div>
                  )}
                </button>
              </div>
              
              <h1 className="text-3xl font-bold mb-4">{discount.title}</h1>
              
              <div className="mb-6">
                <div className="flex items-center mb-2 text-gray-600">
                  <Calendar size={16} className="mr-2" />
                  <span>Дійсна до: <span className="font-medium">{formatDate(discount.validUntil)}</span></span>
                </div>
                
                {daysRemaining(discount.validUntil) <= 7 && (
                  <div className="flex items-center text-red-600">
                    <Clock size={16} className="mr-2" />
                    <span>
                      {daysRemaining(discount.validUntil) <= 0
                        ? 'Термін дії знижки закінчився'
                        : `Залишилось ${daysRemaining(discount.validUntil)} днів`}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Опис:</h2>
                <p className="text-gray-700">{discount.description}</p>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Код знижки:</h2>
                <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                  <div className="flex justify-between items-center">
                    <span className="pl-4 py-3 text-gray-800 font-mono font-medium text-lg">
                      {discount.code}
                    </span>
                    <button 
                      onClick={copyToClipboard}
                      className="bg-gray-200 px-4 py-3 text-gray-700 hover:bg-gray-300 transition-colors"
                    >
                      {copied ? <Check size={20} className="text-green-600" /> : <Copy size={20} />}
                    </button>
                  </div>
                  <div className={`absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-500 ${copied ? 'w-full' : 'w-0'}`}></div>
                </div>
              </div>
              
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-center transition-all duration-300 flex items-center justify-center"
              >
                <ShoppingBag size={18} className="mr-2" />
                Перейти до магазину
              </a>
            </div>
          </div>
          
          {/* Additional information section */}
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Як використати знижку</h3>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li>Скопіюйте код знижки, натиснувши на кнопку поруч з кодом</li>
              <li>Перейдіть на сайт продавця, натиснувши кнопку «Перейти до магазину»</li>
              <li>Додайте бажані товари у кошик</li>
              <li>Вставте код знижки у відповідне поле при оформленні замовлення</li>
              <li>Насолоджуйтесь своєю знижкою!</li>
            </ol>
          </div>
        </div>
      ) : (
        <Message variant="error">Знижку не знайдено</Message>
      )}
    </>
  );
};

export default DiscountScreen;