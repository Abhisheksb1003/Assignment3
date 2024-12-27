// components/MessageInput.js
import React, { useState } from 'react';
import { useAppContext } from '../App';

export const MessageInput = () => {
  const [message, setMessage] = useState('');
  const { state, dispatch } = useAppContext();

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = { text: message, sentByUser: true };
      const updatedMessages = [
        ...(state.messages[state.selectedContact] || []),
        newMessage,
      ];

      dispatch({
        type: 'SET_MESSAGES',
        payload: { [state.selectedContact]: updatedMessages },
      });

      setMessage('');
    }
  };

  return (
    <div className="message-input">
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};
