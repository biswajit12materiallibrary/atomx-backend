import request from "supertest";
import { app } from "../src/app"; // Your Express app
import { sendResponse } from "../src/utils/statusCodeResponse"; // Assuming this is where sendResponse is located
import {
  createUser,
  login,
  substring,
  binaryTree,
} from "../src/service/userService";
import { CalculatorControllerController } from "../src/controller/calculatorController";

// Mocking the services
jest.mock("../src/service/userService");
jest.mock("../src/utils/statusCodeResponse");

describe("CalculatorControllerController", () => {
  let controller: CalculatorControllerController;

  beforeEach(() => {
    controller = new CalculatorControllerController();
  });

  it("should call createUser and return success response", async () => {
    const mockData = { success: true, data: { id: 1, name: "Test User" } };
    (createUser as jest.Mock).mockResolvedValue(mockData); // Mocking the service

    const req = {
      body: { name: "Test User", email: "test@example.com" },
    } as any; // Mock request
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any; // Mock response

    await controller.createUser(req, res);

    expect(createUser).toHaveBeenCalledWith(req.body);
    expect(sendResponse).toHaveBeenCalledWith(
      req,
      res,
      200,
      expect.objectContaining(mockData)
    );
  });

  it("should handle error when createUser fails", async () => {
    const mockError = new Error("User creation failed");
    (createUser as jest.Mock).mockRejectedValue(mockError);

    const req = {
      body: { name: "Test User", email: "test@example.com" },
    } as any; // Mock request
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any; // Mock response

    await controller.createUser(req, res);

    expect(sendResponse).toHaveBeenCalledWith(
      req,
      res,
      200,
      expect.objectContaining({
        success: false,
        message: mockError.message,
      })
    );
  });

  it("should call login and return success response", async () => {
    const mockData = { success: true, token: "abcd1234" };
    (login as jest.Mock).mockResolvedValue(mockData);

    const req = {
      body: { email: "test@example.com", password: "password" },
    } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await controller.login(req, res);

    expect(login).toHaveBeenCalledWith(req.body);
    expect(sendResponse).toHaveBeenCalledWith(
      req,
      res,
      200,
      expect.objectContaining(mockData)
    );
  });

  it("should handle error when login fails", async () => {
    const mockError = new Error("Invalid credentials");
    (login as jest.Mock).mockRejectedValue(mockError);

    const req = {
      body: { email: "test@example.com", password: "password" },
    } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await controller.login(req, res);

    expect(sendResponse).toHaveBeenCalledWith(
      req,
      res,
      200,
      expect.objectContaining({
        success: false,
        message: mockError.message,
      })
    );
  });

  it("should call substring and return success response", async () => {
    const mockData = {
      success: true,
      longestSubstring: 3,
      uniqueSubstrings: ["a", "b", "c"],
    };
    (substring as jest.Mock).mockResolvedValue(mockData);

    const req = { body: { input: "abcabcbb" } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await controller.substring(req, res);

    expect(substring).toHaveBeenCalledWith(req);
    expect(sendResponse).toHaveBeenCalledWith(
      req,
      res,
      200,
      expect.objectContaining(mockData)
    );
  });

  it("should handle error when substring fails", async () => {
    const mockError = new Error("Substring calculation failed");
    (substring as jest.Mock).mockRejectedValue(mockError);

    const req = { body: { input: "abcabcbb" } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await controller.substring(req, res);

    expect(sendResponse).toHaveBeenCalledWith(
      req,
      res,
      200,
      expect.objectContaining({
        success: false,
        message: mockError.message,
      })
    );
  });

  it("should call binaryTree and return success response", async () => {
    const mockData = { success: true, maxLeafPath: 23 };
    (binaryTree as jest.Mock).mockResolvedValue(mockData);

    const req = { body: { tree: [10, 5, -3, 3, 2, null, 11] } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await controller.binaryTree(req, res);

    expect(binaryTree).toHaveBeenCalledWith(req);
    expect(sendResponse).toHaveBeenCalledWith(
      req,
      res,
      200,
      expect.objectContaining(mockData)
    );
  });

  it("should handle error when binaryTree fails", async () => {
    const mockError = new Error("Binary tree calculation failed");
    (binaryTree as jest.Mock).mockRejectedValue(mockError);

    const req = { body: { tree: [10, 5, -3, 3, 2, null, 11] } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await controller.binaryTree(req, res);

    expect(sendResponse).toHaveBeenCalledWith(
      req,
      res,
      200,
      expect.objectContaining({
        success: false,
        message: mockError.message,
      })
    );
  });
});
