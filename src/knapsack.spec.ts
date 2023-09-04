import { describe, expect, test } from "vitest";
import { getKnapSack } from "./knapsack";

describe("Knapsack problem", () => {
  test("Should return correct value", () => {
    const values: number[] = [10, 20, 30, 40];
    const weights: number[] = [30, 10, 40, 20];
    const capacity = 40;
    const lookup: Map<string, number> = new Map();

    expect(
      getKnapSack(capacity, values.length - 1, values, weights, lookup)
    ).toStrictEqual(60);
  });

  test("Should return zero if a weight is invalid", () => {
    const values: number[] = [10, 20, 30, 40];
    const weights: number[] = [30, 10, -40, 20];
    const capacity = 40;
    const lookup: Map<string, number> = new Map();

    expect(() =>
      getKnapSack(capacity, values.length - 1, values, weights, lookup)
    ).toThrowError("Weight or value is invalid (negative)");
  });

  test("Should return zero if a value is invalid", () => {
    const values: number[] = [10, 20, -30, 40];
    const weights: number[] = [30, 10, 40, 20];
    const capacity = 40;
    const lookup: Map<string, number> = new Map();

    expect(() =>
      getKnapSack(capacity, values.length - 1, values, weights, lookup)
    ).toThrowError("Weight or value is invalid (negative)");
  });

  test("Should return minSafeInteger if initial capacity is negative", () => {
    const values: number[] = [10, 20, 30, 40];
    const weights: number[] = [30, 10, 40, 20];
    const capacity = -40;
    const lookup: Map<string, number> = new Map();

    expect(
      getKnapSack(capacity, values.length - 1, values, weights, lookup)
    ).toStrictEqual(Number.MIN_SAFE_INTEGER);
  });
});
