import React, { useReducer, useEffect, useState } from 'react';
import './App.css';
import { ContactList } from './components/ContactList';
import { ChatWindow } from './components/ChatWindow';
import { initializeIndexedDB, saveMessagesToIndexedDB, getMessagesFromIndexedDB } from './indexedDBUtils';
import { fetchFromInstantDB, saveToInstantDB } from './instantDBUtils';

const initialState = {
  contacts: [],
  messages: {},
  selectedContact: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_CONTACTS':
      return { ...state, contacts: action.payload };
    case 'SET_MESSAGES':
      return { ...state, messages: { ...state.messages, ...action.payload } };
    case 'SET_SELECTED_CONTACT':
      return { ...state, selectedContact: action.payload };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    initializeIndexedDB();

    const loadContacts = async () => {
      try {
        const contacts = [
          { id: 1, name: 'Alice', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
          { id: 2, name: 'Bob', image: 'https://randomuser.me/api/portraits/men/2.jpg' },
          { id: 3, name: 'Charlie', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
        ];
        dispatch({ type: 'SET_CONTACTS', payload: contacts });
      } catch {
        setIsOffline(true);
      }
    };

    const loadMessages = async () => {
      try {
        const messages = await fetchFromInstantDB('/messages'); // Simulate InstantDB API call
        dispatch({ type: 'SET_MESSAGES', payload: messages });
        saveMessagesToIndexedDB(messages); // Save to IndexedDB for offline use
      } catch {
        const messages = await getMessagesFromIndexedDB();
        dispatch({ type: 'SET_MESSAGES', payload: messages });
        setIsOffline(true);
      }
    };

    loadContacts();
    loadMessages();
  }, []);

  const handleSendMessage = async (contactId, message) => {
    const newMessage = { text: message, sentByUser: true, timestamp: new Date() };
    const updatedMessages = [...(state.messages[contactId] || []), newMessage];

    dispatch({ type: 'SET_MESSAGES', payload: { [contactId]: updatedMessages } });
    saveMessagesToIndexedDB({ [contactId]: updatedMessages });

    if (!isOffline) {
      await saveToInstantDB(`/messages/${contactId}`, newMessage);
    }
  };

  return (
    <div className="app">
      <ContactList
        contacts={state.contacts}
        onSelectContact={(id) => dispatch({ type: 'SET_SELECTED_CONTACT', payload: id })}
      />
      <ChatWindow
        contactId={state.selectedContact}
        messages={state.messages[state.selectedContact] || []}
        onSendMessage={handleSendMessage}
        contactDetails={state.contacts.find((c) => c.id === state.selectedContact) || {}}
      />
    </div>
  );
}
