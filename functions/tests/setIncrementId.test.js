const admin = require("firebase-admin");
const {setIncrementId} = require("../src/setIncrementId");

// Mock Firestore para testes.
jest.mock("firebase-admin", () => {
  const firestore = {
    collection: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    get: jest.fn().mockResolvedValue({
      empty: true,
      docs: [],
    }),
    runTransaction: jest.fn(),
  };
  return {
    initializeApp: jest.fn(),
    firestore: jest.fn(() => firestore),
  };
});

describe("setIncrementId Function", () => {
  test("should set increment_id to 1 when no previous records", async () => {
    const snap = {
      ref: {
        update: jest.fn(),
      },
      data: jest.fn().mockReturnValue({name: "Test"}),
    };
    const context = {};

    await setIncrementId(snap, context);

    expect(snap.ref.update).toHaveBeenCalledWith({increment_id: 1});
  });

  test("should increment increment_id based on the last record", async () => {
    const snap = {
      ref: {
        update: jest.fn(),
      },
      data: jest.fn().mockReturnValue({name: "Test"}),
    };
    const context = {};

    // Mock para simular um registro anterior com increment_id 5
    admin.firestore()
        .collection()
        .orderBy()
        .limit()
        .get.mockResolvedValue({
          empty: false,
          docs: [
            {
              data: () => ({
                increment_id: 5,
              }),
            },
          ],
        });

    await setIncrementId(snap, context);

    expect(snap.ref.update).toHaveBeenCalledWith({increment_id: 6});
  });
});
