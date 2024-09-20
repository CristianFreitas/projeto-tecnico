const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

/**
 * Function to create a new record in the 'records' collection.
 * @param {Object} req - HTTP request object.
 * @param {Object} res - HTTP response object.
 */
exports.createRecord = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed. Use POST.");
  }

  const {name} = req.body;

  if (!name) {
    return res.status(400).send("The \"name\" attribute is required.");
  }

  try {
    const docRef = await db.collection("records").add({name});
    return res.status(201).json({id: docRef.id});
  } catch (error) {
    console.error("Error creating record:", error);
    return res.status(500).send("Internal server error.");
  }
};
