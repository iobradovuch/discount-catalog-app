import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag, Copy, Check, ArrowRight } from 'lucide-react';

const DiscountCard = ({ discount }) => {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const copyToClipboard = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(discount.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cardImageUrl = discount.imageUrl || 
    `https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2070&auto=format&fit=crop`;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('uk-UA', options);
  };

  return (
    <div 
      className="group bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-0 bg-blue-600 text-white px-3 py-1 rounded-br-lg z-10 font-medium">
          {discount.percentOff}% знижка
        </div>
        <div className="h-48 overflow-hidden">
          <img 
            src={cardImageUrl}
            alt={discount.title} 
            className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-80' : 'opacity-50'}`}></div>
        </div>
        <div className="absolute bottom-0 left-0 w-full p-4 text-white">
          <div className="flex items-center text-sm mb-1">
            <Tag size={14} className="mr-1" />
            <span className="bg-blue-500/70 px-2 py-0.5 rounded-full text-xs">
              {discount.category}
            </span>
          </div>
          <h2 className="text-xl font-bold line-clamp-1">{discount.title}</h2>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar size={14} className="mr-1" />
            <span>до {formatDate(discount.validUntil)}</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2 h-10 text-sm">{discount.description}</p>
        
        <div className="flex flex-col space-y-3">
          <div className="relative bg-gray-100 rounded-lg overflow-hidden">
            <div className="flex justify-between items-center">
              <span className="pl-3 py-2 text-gray-700 font-mono font-medium">
                {discount.code}
              </span>
              <button 
                onClick={copyToClipboard}
                className="bg-gray-200 px-3 py-2 text-gray-700 hover:bg-gray-300 transition-colors"
              >
                {copied ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
              </button>
            </div>
            <div className={`absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-500 ${copied ? 'w-full' : 'w-0'}`}></div>
          </div>
          
          <Link 
            to={`/discount/${discount._id}`} 
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-center transition-all duration-300 flex items-center justify-center group-hover:shadow-md"
          >
            Деталі
            <ArrowRight size={16} className="ml-2 transform transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DiscountCard;