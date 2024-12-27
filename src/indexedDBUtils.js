export const initializeIndexedDB = () => {
    const request = indexedDB.open('MessagingApp', 1);
  
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('messages')) {
        db.createObjectStore('messages', { keyPath: 'contactId' });
      }
    };
  };
  
  export const saveMessagesToIndexedDB = (messages) => {
    const request = indexedDB.open('MessagingApp', 1);
    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction('messages', 'readwrite');
      const store = transaction.objectStore('messages');
  
      for (const [contactId, msgs] of Object.entries(messages)) {
        store.put({ contactId, messages: msgs });
      }
    };
  };
  
  export const getMessagesFromIndexedDB = () => {
    return new Promise((resolve) => {
      const request = indexedDB.open('MessagingApp', 1);
      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction('messages', 'readonly');
        const store = transaction.objectStore('messages');
        const messages = {};
  
        store.openCursor().onsuccess = (cursorEvent) => {
          const cursor = cursorEvent.target.result;
          if (cursor) {
            messages[cursor.value.contactId] = cursor.value.messages;
            cursor.continue();
          } else {
            resolve(messages);
          }
        };
      };
    });
  };
  