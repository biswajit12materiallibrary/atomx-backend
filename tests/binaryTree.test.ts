import {
  buildBinaryTreeFromArray,
  maxSumPathFromLeaf,
  maxSumPathAnyNode,
} from "../src/utils/binarytree"; // Replace 'yourModule' with the path to your code

describe("Binary Tree Functions", () => {
  // Test cases for buildBinaryTreeFromArray
  describe("buildBinaryTreeFromArray", () => {
    it("should build a binary tree from an array representation", () => {
      const array = [10, 5, -3, 3, 2, null, 11, 3, -2, null, 1];
      const tree = buildBinaryTreeFromArray(array);

      expect(tree?.value).toBe(10);
      expect(tree?.left?.value).toBe(5);
      expect(tree?.right?.value).toBe(-3);
      expect(tree?.left?.left?.value).toBe(3);
      expect(tree?.left?.right?.value).toBe(2);
      expect(tree?.right?.right?.value).toBe(11);
    });

    it("should return null for an empty array", () => {
      const array: (number | null)[] = [];
      const tree = buildBinaryTreeFromArray(array);
      expect(tree).toBeNull();
    });

    it("should handle a tree with only one node", () => {
      const array = [5];
      const tree = buildBinaryTreeFromArray(array);
      expect(tree?.value).toBe(5);
      expect(tree?.left).toBeNull();
      expect(tree?.right).toBeNull();
    });
  });

  // Test cases for maxSumPathFromLeaf
  describe("maxSumPathFromLeaf", () => {
    it("should calculate the maximum sum from a leaf to any node", () => {
      const array = [10, 5, -3, 3, 2, null, 11, 3, -2, null, 1];
      const tree = buildBinaryTreeFromArray(array);
      const maxLeafPathSum = maxSumPathFromLeaf(tree);
      expect(maxLeafPathSum).toBe(23); // Expected value based on the given tree
    });

    it("should return 0 for an empty tree", () => {
      const maxLeafPathSum = maxSumPathFromLeaf(null);
      expect(maxLeafPathSum).toBe(0);
    });

    it("should return the value of a single-node tree", () => {
      const array = [5];
      const tree = buildBinaryTreeFromArray(array);
      const maxLeafPathSum = maxSumPathFromLeaf(tree);
      expect(maxLeafPathSum).toBe(5);
    });
  });

  // Test cases for maxSumPathAnyNode
  describe("maxSumPathAnyNode", () => {
    it("should calculate the maximum sum path between any two nodes", () => {
      const array = [10, 5, -3, 3, 2, null, 11, 3, -2, null, 1];
      const tree = buildBinaryTreeFromArray(array);
      const maxAnyNodePathSum = maxSumPathAnyNode(tree);
      expect(maxAnyNodePathSum).toBe(27); // Expected value based on the given tree
    });

    it("should return 0 for an empty tree", () => {
      const maxAnyNodePathSum = maxSumPathAnyNode(null);
      expect(maxAnyNodePathSum).toBe(0);
    });

    it("should return the value of a single-node tree", () => {
      const array = [5];
      const tree = buildBinaryTreeFromArray(array);
      const maxAnyNodePathSum = maxSumPathAnyNode(tree);
      expect(maxAnyNodePathSum).toBe(5);
    });
  });
});
