const {createRecord} = require("../src/createRecord");
const httpMocks = require("node-mocks-http");

// Mock Firestore
jest.mock("firebase-admin", () => {
  const firestore = {
    collection: jest.fn().mockReturnThis(),
    add: jest.fn().mockResolvedValue({id: "12345"}),
  };
  return {
    initializeApp: jest.fn(),
    firestore: jest.fn(() => firestore),
  };
});

describe("createRecord Function", () => {
  test("should successfully create a record", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      body: {name: "Test"},
    });
    const res = httpMocks.createResponse();

    await createRecord(req, res);

    expect(res.statusCode).toBe(201);
    const data = res._getJSONData();
    expect(data).toHaveProperty("id", "12345");
  });

  test("should return error if 'name' is missing", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      body: {},
    });
    const res = httpMocks.createResponse();

    await createRecord(req, res);

    expect(res.statusCode).toBe(400);
    expect(res._getData()).toBe("The \"name\" attribute is required.");
  });

  test("should return error for non-POST methods", async () => {
    const req = httpMocks.createRequest({
      method: "GET",
      body: {name: "Test"},
    });
    const res = httpMocks.createResponse();

    await createRecord(req, res);

    expect(res.statusCode).toBe(405);
    expect(res._getData()).toBe("Method not allowed. Use POST.");
  });
});
