export const fetchFromInstantDB = async (path) => {
    // Replace with actual InstantDB API call
    return new Promise((resolve) =>
      setTimeout(() => {
        if (path === '/contacts') {
          resolve([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]);
        } else if (path === '/messages') {
          resolve({ 1: [], 2: [] });
        }
      }, 500)
    );
  };
  
  export const saveToInstantDB = async (path, data) => {
    // Replace with actual InstantDB API call
    return Promise.resolve();
  };
  