import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DiscountCard from '../components/DiscountCard';
import AnimatedLoader from '../components/AnimatedLoader';
import Message from '../components/Message';
import FeatureBanner from '../components/FeatureBanner';
import { listDiscounts } from '../actions/discountActions';
import { Search, PercentIcon, Tag, ChevronDown, Filter } from 'lucide-react';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCategories, setShowCategories] = useState(false);
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'discount', 'expiring'
  const [fadeIn, setFadeIn] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const discountList = useSelector((state) => state.discountList);
  const { loading, error, discounts } = discountList;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
      return;
    }
    
    // Get category from URL query params if available
    const urlCategory = searchParams.get('category') || '';
    if (urlCategory) {
      setCategory(urlCategory);
    }
    
    dispatch(listDiscounts());
  }, [dispatch, navigate, userInfo, searchParams]);

  useEffect(() => {
    // Add fade-in animation after component mounts
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Get unique categories
  const categories = discounts 
    ? [...new Set(discounts.map((discount) => discount.category))]
    : [];

  // Filter discounts by category and search term
  const filteredDiscounts = discounts 
    ? discounts
        .filter(d => category ? d.category === category : true)
        .filter(d => searchTerm 
          ? d.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            d.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.code.toLowerCase().includes(searchTerm.toLowerCase())
          : true)
    : [];

  // Sort discounts
  const sortedDiscounts = [...filteredDiscounts];
  
  if (sortBy === 'discount') {
    sortedDiscounts.sort((a, b) => b.percentOff - a.percentOff);
  } else if (sortBy === 'expiring') {
    sortedDiscounts.sort((a, b) => new Date(a.validUntil) - new Date(b.validUntil));
  } else { // 'newest' is default
    sortedDiscounts.sort((a, b) => new Date(b.createdAt || b._id) - new Date(a.createdAt || a._id));
  }

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setShowCategories(false);
    
    // Update URL with category parameter
    if (cat) {
      setSearchParams({ category: cat });
    } else {
      setSearchParams({});
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      {/* Page spacing for fixed header */}
      <div className="pt-20 pb-4"></div>
      
      <div className={`transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-lg p-6 mb-8 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10">
            <svg width="400" height="400" viewBox="0 0 200 200">
              <path fill="currentColor" d="M40,120 L80,80 L120,120 L160,80 L160,160 L40,160 Z"></path>
              <circle cx="60" cy="60" r="20" fill="currentColor"></circle>
              <circle cx="140" cy="60" r="20" fill="currentColor"></circle>
            </svg>
          </div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 flex items-center">
              <PercentIcon className="inline-block mr-2 text-yellow-300" size={32} />
              Каталог Знижок
            </h1>
            <p className="text-blue-100 text-lg mb-6 md:w-3/4 lg:w-2/3">
              Знаходьте найкращі промокоди та знижки від провідних брендів України. 
              Зберігайте ваші улюблені купони та діліться ними з друзями.
            </p>
            
            {/* Search bar */}
            <div className="relative max-w-xl">
              <input
                type="text"
                placeholder="Пошук знижок за назвою, описом або кодом..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full bg-white bg-opacity-20 border border-blue-300 rounded-lg pl-10 pr-4 py-3 text-white placeholder-blue-200 focus:bg-opacity-25 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all"
              />
              <Search className="absolute left-3 top-3.5 text-blue-300" size={18} />
            </div>
          </div>
        </div>
        
        {/* Featured Banner */}
        <FeatureBanner />
        
        {/* Filters section */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="relative">
            <button 
              onClick={() => setShowCategories(!showCategories)}
              className="flex items-center bg-white shadow-md rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Tag size={16} className="mr-2 text-blue-500" />
              <span>{category || 'Усі категорії'}</span>
              <ChevronDown size={16} className={`ml-2 transition-transform ${showCategories ? 'rotate-180' : ''}`} />
            </button>
            
            {showCategories && (
              <div className="absolute z-20 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 animate-fadeIn">
                <button 
                  onClick={() => handleCategoryChange('')}
                  className={`w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors ${!category ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'}`}
                >
                  Усі категорії
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors ${category === cat ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex items-center">
            <span className="mr-2 text-gray-600 font-medium flex items-center">
              <Filter size={16} className="mr-1" />
              Сортувати:
            </span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white shadow-md rounded-lg px-3 py-2 text-gray-700 border-0 focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Найновіші</option>
              <option value="discount">Найбільша знижка</option>
              <option value="expiring">Спливають скоро</option>
            </select>
          </div>
        </div>
        
        {loading ? (
          <AnimatedLoader />
        ) : error ? (
          <Message variant="error">{error}</Message>
        ) : (
          <>
            {/* Results count */}
            <div className="mb-6 text-gray-600">
              {filteredDiscounts.length === 0 ? (
                <p>Знижок не знайдено</p>
              ) : (
                <p>Знайдено знижок: <span className="font-semibold">{filteredDiscounts.length}</span></p>
              )}
            </div>
            
            {/* Discounts grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedDiscounts.map((discount, index) => (
                <div 
                  key={discount._id} 
                  className="opacity-0 animate-fadeInUp" 
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                >
                  <DiscountCard discount={discount} />
                </div>
              ))}
            </div>
            
            {/* No results message */}
            {filteredDiscounts.length === 0 && !loading && (
              <div className="text-center py-12">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png" 
                  alt="No discounts found" 
                  className="w-24 h-24 mx-auto mb-4 opacity-50"
                />
                <h3 className="text-xl font-bold text-gray-600 mb-2">Знижок не знайдено</h3>
                <p className="text-gray-500">
                  Спробуйте змінити параметри пошуку або вибрати іншу категорію
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default HomeScreen;