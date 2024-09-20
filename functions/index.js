const functions = require("firebase-functions");
const {createRecord} = require("./src/createRecord");
const {setIncrementId} = require("./src/setIncrementId");

exports.createRecord = functions.https.onRequest(createRecord);

exports.setIncrementId = functions.firestore
    .document("records/{recordId}")
    .onCreate(setIncrementId);
