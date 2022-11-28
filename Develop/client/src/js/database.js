import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  console.log('PUT to the database');

  //Create a connection to the database and version to use
  const textDb=await openDB('text', 1);

  //Create a new transaction and specify the database and data privileges
  const tx = textDb.transaction('text', 'readwrite');

  //Open up the desired object store
  const store = tx.objectStore('text');

  //Use the .add() method on the store and pass in the content
  const request = store.put({ id: 1, value: content });

  //Get confirmation of the request
  const result = await request;
  console.log('Data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

initdb();
