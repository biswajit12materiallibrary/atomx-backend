import {
  findLongestSubstring,
  findUniqueSubstrings,
} from "../src/utils/substring";

describe("Longest Substring Logic", () => {
  test("findLongestSubstring returns correct length", () => {
    expect(findLongestSubstring("abcabcbb")).toBe(3);
    expect(findLongestSubstring("bbbbb")).toBe(1);
  });

  test("findUniqueSubstrings returns all unique substrings", () => {
    const result = findUniqueSubstrings("abc");
    expect(result).toEqual(
      expect.arrayContaining(["a", "b", "c", "ab", "bc", "abc"])
    );
  });
});
