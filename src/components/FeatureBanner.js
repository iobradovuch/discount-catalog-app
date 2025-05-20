import React, { useState, useEffect } from 'react';
import { ArrowRight, PercentIcon, Gift, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeatureBanner = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  
  const banners = [
    {
      title: "Ексклюзивні знижки",
      description: "Економте до 70% на покупках з нашими ексклюзивними знижками від партнерів",
      icon: <PercentIcon size={24} className="text-yellow-400" />,
      color: "bg-gradient-to-r from-blue-600 to-blue-800",
      imageUrl: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=2115&auto=format&fit=crop"
    },
    {
      title: "Подарунки при кожній покупці",
      description: "Отримуйте подарунки та бонуси при покупці за ексклюзивними купонами",
      icon: <Gift size={24} className="text-pink-400" />,
      color: "bg-gradient-to-r from-purple-600 to-purple-800",
      imageUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2040&auto=format&fit=crop"
    },
    {
      title: "Обмежені пропозиції",
      description: "Не пропустіть спеціальні пропозиції з обмеженим терміном дії",
      icon: <Clock size={24} className="text-green-400" />,
      color: "bg-gradient-to-r from-green-600 to-green-800",
      imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Перевірена якість",
      description: "Всі знижки та промокоди перевірені нашою командою щодня",
      icon: <Award size={24} className="text-orange-400" />,
      color: "bg-gradient-to-r from-red-600 to-red-800",
      imageUrl: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg mb-8 group h-64">
      {banners.map((banner, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentBanner ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div className="absolute inset-0 z-0">
            <img 
              src={banner.imageUrl} 
              alt={banner.title} 
              className="w-full h-full object-cover transition-transform duration-5000 ease-in-out group-hover:scale-110"
            />
            <div className={`absolute inset-0 ${banner.color} opacity-75`}></div>
          </div>
          
          <div className="relative z-10 flex flex-col h-full justify-center px-6 md:px-12 lg:w-2/3">
            <div className="flex items-center mb-3">
              {banner.icon}
              <span className="ml-2 text-white font-bold tracking-wider uppercase text-sm">Спеціальна пропозиція</span>
            </div>
            <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">{banner.title}</h3>
            <p className="text-white opacity-90 mb-4 md:w-3/4">{banner.description}</p>
            <Link 
              to="/" 
              className="inline-flex items-center bg-white text-blue-700 hover:bg-yellow-300 transition-colors py-2 px-4 rounded-full font-medium self-start"
            >
              Переглянути
              <ArrowRight size={16} className="ml-1 animate-pulse" />
            </Link>
          </div>
        </div>
      ))}
      
      {/* Banner navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentBanner ? 'bg-white w-6' : 'bg-white/50'
            }`}
            onClick={() => setCurrentBanner(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureBanner;