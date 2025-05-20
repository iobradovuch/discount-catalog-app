import React from 'react';

const Message = ({ variant, children }) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-100 text-green-700';
      case 'error':
        return 'bg-red-100 text-red-700';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700';
      case 'info':
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className={`p-4 mb-4 rounded-lg ${getVariantClass()}`}>
      {children}
    </div>
  );
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;