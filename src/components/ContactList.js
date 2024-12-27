import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import './ContactList.css';

export const ContactList = ({ contacts, onSelectContact }) => {
  return (
    <div className="contact-list">
      {contacts.map((contact) => (
        <div key={contact.id} className="contact" onClick={() => onSelectContact(contact.id)}>
          {contact.image ? (
            <img src={contact.image} alt="Profile" className="contact-dp" />
          ) : (
            <FaUserCircle className="contact-dp-icon" />
          )}
          <span>{contact.name}</span>
        </div>
      ))}
    </div>
  );
};
