const admin = require("firebase-admin");
const db = admin.firestore();

/**
 * Trigger Firestore onCreate para definir o 'increment_id' sequencial.
 * @param {Object} snap - Snapshot do documento criado.
 * @param {Object} context - Contexto do evento.
 */
exports.setIncrementId = async (snap, context) => {
  const newRecordRef = snap.ref;

  const recordsRef = db
      .collection("records")
      .orderBy("increment_id", "desc")
      .limit(1);
  const snapshot = await recordsRef.get();

  let nextId = 1;
  if (!snapshot.empty) {
    const lastRecord = snapshot.docs[0].data();
    nextId = lastRecord.increment_id + 1;
  }

  await newRecordRef.update({increment_id: nextId});

  return;
};
