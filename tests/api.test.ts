import request from "supertest";
import { app } from "../src/app"; // Importing Express app
import UserSchema from "../src/model/userModel";
let authToken: string;
let userId: string;

describe("User Signup, Login, and API Tests", () => {
  // Sign Up Test: Create a user and store the token
  it("should sign up a new user and return a token", async () => {
    const response = await request(app).post("/api/user/signup").send({
      email: "testuser@example.com",
      password: "Password123",
      role: "user", // optional if defaults to "user"
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Sign Up Successfully");

    // Store the user ID and token from the response
    // userId = response.body.data._id;
    // authToken = response.body.data.token;
    // expect(authToken).toBeDefined();
  });

  // Login Test: Log in with the created user and get the token
  it("should log in with valid credentials and return a token", async () => {
    const response = await request(app).post("/api/user/login").send({
      email: "testuser@example.com",
      password: "Password123",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Login Successfully");

    // Store the token from the response
    authToken = response.body.data.token;
    expect(authToken).toBeDefined();
  });

  // Substring API Test: Use token to test substring endpoint
  it("should return longest substring and unique substrings", async () => {
    const response = await request(app)
      .post("/api/user/output/substring")
      .set("Authorization", `Bearer ${authToken}`) // Use dynamic token here
      .send({ input: "abcabcbb" });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.longestSubstring).toBe(3);
    expect(response.body.data.uniqueSubstrings).toContain("abc");
  });

  // Binary Tree API Test: Use token to test binary tree endpoint
  it("should return max sum paths for binary tree", async () => {
    const tree = [10, 5, -3, 3, 2, null, 11, 3, -2, null, 1];
    const response = await request(app)
      .post("/api/user/output/binarytree")
      .set("Authorization", `Bearer ${authToken}`) // Use dynamic token here
      .send({ tree: tree });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.maxLeafPath).toBe(23); // example expected value
  });

  // Delete User Test: Delete the user after tests
  it("should delete the user after tests", async () => {
    await UserSchema.deleteOne({ email: "testuser@example.com" });
  });
});
