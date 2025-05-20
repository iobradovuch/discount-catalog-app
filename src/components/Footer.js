import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-blue-800 to-blue-900 text-white pt-12 pb-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <ShoppingBag className="text-yellow-300 mr-2" size={28} />
              <span className="text-2xl font-bold tracking-tight">
                Каталог<span className="text-yellow-300">Знижок</span>
              </span>
            </Link>
            <p className="text-gray-300 text-sm">
              Найкращі знижки та промокоди від провідних брендів України та світу. 
              Економте з нами на кожній покупці!
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="bg-blue-700 p-2 rounded-full hover:bg-blue-600 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                className="bg-blue-700 p-2 rounded-full hover:bg-blue-600 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                className="bg-blue-700 p-2 rounded-full hover:bg-blue-600 transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-blue-700 pb-2">Швидкі посилання</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-yellow-300 transition-colors">
                  Головна
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-yellow-300 transition-colors">
                  Увійти
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-yellow-300 transition-colors">
                  Зареєструватися
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-blue-700 pb-2">Популярні категорії</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/?category=Одяг" className="text-gray-300 hover:text-yellow-300 transition-colors">
                  Одяг та взуття
                </Link>
              </li>
              <li>
                <Link to="/?category=Електроніка" className="text-gray-300 hover:text-yellow-300 transition-colors">
                  Електроніка
                </Link>
              </li>
              <li>
                <Link to="/?category=Їжа" className="text-gray-300 hover:text-yellow-300 transition-colors">
                  Їжа та ресторани
                </Link>
              </li>
              <li>
                <Link to="/?category=Краса" className="text-gray-300 hover:text-yellow-300 transition-colors">
                  Краса та здоров'я
                </Link>
              </li>
              <li>
                <Link to="/?category=Подорожі" className="text-gray-300 hover:text-yellow-300 transition-colors">
                  Подорожі
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-blue-700 pb-2">Контакти</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 text-yellow-300 mt-1 flex-shrink-0" />
                <span className="text-gray-300"> 58002 м. Чернівці, вул. Коцюбинського, 2 </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-yellow-300 flex-shrink-0" />
                <a href="tel:+380441234567" className="text-gray-300 hover:text-yellow-300 transition-colors">
                  +380372527038
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-yellow-300 flex-shrink-0" />
                <a href="mailto:info@katalog-znizhok.ua" className="text-gray-300 hover:text-yellow-300 transition-colors">
                   profcom@chnu.edu.ua
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-6 border-t border-blue-700 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} Каталог Знижок. Усі права захищено.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-yellow-300 transition-colors">Умови використання</a>
            <a href="#" className="hover:text-yellow-300 transition-colors">Політика конфіденційності</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;