import React, { useState } from 'react';

const MessageButton = () => {
  const [message, setMessage] = useState('');

  const generateMessage = async () => {
    try {
      const response = await fetch('http://localhost/api/v1/catalog')
      const data = await response.json();
      setMessage(data.message);
      console.log(data);

    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <div className="message-button-container">
      <button onClick={generateMessage} className="generate-button">
        Get Message
      </button>
      <div className="message">{message}</div>
    </div>
  );
};

export default MessageButton;