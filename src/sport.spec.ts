import { describe, test, expect } from "vitest";
import { bubbleSort } from "./sort";

describe("Sort", () => {
  test("Should bubble sort", () => {
    const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
    expect(bubbleSort(unsortedArray)).toStrictEqual([
      11, 12, 22, 25, 34, 64, 90,
    ]);
  });
});
