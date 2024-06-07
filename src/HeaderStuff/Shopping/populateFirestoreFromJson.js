// populateFirestoreFromJson.js

// Import necessary libraries
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); // Path to your service account key JSON file

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Initialize Firestore
const db = admin.firestore();

// Path to your JSON file
const jsonFilePath = "./path/to/your/jsonfile.json"; // Replace with your JSON file path

// Collection name in Firestore
const collectionName = "your-collection"; // Replace with your desired collection name

// Function to read JSON file and upload to Firestore
const populateFirestoreFromJson = async () => {
  try {
    const jsonData = require(jsonFilePath); // Load JSON data

    // Iterate through JSON data and add documents to Firestore
    for (const key in jsonData) {
      if (Object.hasOwnProperty.call(jsonData, key)) {
        const docRef = db.collection(collectionName).doc(key);
        await docRef.set(jsonData[key]);
        console.log(`Document ${key} successfully written to Firestore.`);
      }
    }
    console.log("Data import complete!");
  } catch (error) {
    console.error("Error importing data into Firestore: ", error);
  }
};

// Execute function to populate Firestore
populateFirestoreFromJson();
