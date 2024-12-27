import React, { useState } from 'react';
import './ChatWindow.css';

export const ChatWindow = ({ contactId, messages, onSendMessage, contactDetails }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(contactId, newMessage.trim());
      setNewMessage('');
    }
  };

  if (!contactId) {
    return <div className="chat-window">Select a contact to start chatting.</div>;
  }

  return (
    <div className="chat-window">
     
      <div className="chat-header">
        {contactDetails.image ? (
          <img src={contactDetails.image} alt="Profile" className="chat-header-dp" />
        ) : (
          <div className="chat-header-dp-placeholder">?</div>
        )}
        <span className="chat-header-name">{contactDetails.name}</span>
      </div>

      
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${message.sentByUser ? 'sent' : 'received'}`}
          >
            {message.text}
          </div>
        ))}
      </div>

     
      <div className="chat-input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="chat-input"
        />
        <button onClick={handleSendMessage} className="chat-send-button">
          Send
        </button>
      </div>
    </div>
  );
};
