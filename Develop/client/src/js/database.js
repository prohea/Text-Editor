import { openDB } from "idb";

const initdb = async () =>
	openDB("text", 1, {
		upgrade(db) {
			if (db.objectStoreNames.contains("text")) {
				console.log("Text database already exists");
				return;
			}
			db.createObjectStore("text", { keyPath: "id", autoIncrement: true });
			console.log("Text database created");
		},
	});

export const putDb = async (content) => {
	console.log("PUT to the database");

	//Create a connection to the database and version to use
	const textDb = await openDB("text", 1);

	//Create a new transaction and specify the database and data privileges
	const tx = textDb.transaction("text", "readwrite");

	//Open up the desired object store
	const store = tx.objectStore("text");

	//Use the .add() method on the store and pass in the content
	const request = store.put({ id: 1, value: content });

	//Get confirmation of the request
	const result = await request;
	console.log("Data saved to the database", result);
};

export const getDb = async () => {
	console.log("GET from the database");

	//Create a connection to the database and version to use
	const textDb = await openDB("text", 1);

	//Create a new transaction and specify the database and data privileges
	const tx = textDb.transaction("text", "readonly");

	//Open up the desired object store
	const store = tx.objectStore("text");

	//Use the .getAll() method to get all data in the database
	const request = store.getAll();

	//Get confirmation of the request
	const result = await request;
	console.log("result.value", result);
	return result?.value;
};

initdb();
