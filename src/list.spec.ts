import { beforeEach, describe, expect, test } from "vitest";
import { List, simpleList } from "./list";

describe("List", () => {
  let numberList: List<number>;
  let stringList: List<string>;

  beforeEach(() => {
    numberList = new simpleList([1, 2, 3, 4]);
    stringList = new simpleList([]);
  });

  test("Should create list", () => {
    expect(numberList).toBeDefined();
    expect(stringList).toBeDefined();
  });

  test("Should add items only with corresponding types", () => {
    expect(numberList.append(3)).toBe(true);
    expect(stringList.append("three")).toBe(true);
  });

  test("Should remove item at given index", () => {
    expect(numberList.removeItemAtIndex(0)).toStrictEqual(1);
  });

  test("Should throw error if given index is non-existent(remove)", () => {
    expect(() => numberList.removeItemAtIndex(6)).toThrowError(
      "Index is out of bounds"
    );
  });

  test("Should return item at given index", () => {
    expect(numberList.getItemAtIndex(0)).toStrictEqual(1);
  });

  test("Should throw error if given index is non-existent(return)", () => {
    expect(() => numberList.getItemAtIndex(6)).toThrowError(
      "Index is out of bounds"
    );
  });

  test("Should return true if empty", () => {
    numberList = new simpleList([]);
    expect(numberList.isEmpty()).toBe(true);
  });

  test("Should return false if not empty", () => {
    expect(numberList.isEmpty()).toBe(false);
  });

  test("Should return number of items", () => {
    expect(numberList.getSize()).toStrictEqual(4);
  });

  test("Should return items", () => {
    expect(numberList.getList()).toStrictEqual([1, 2, 3, 4]);
  });

  test("Should reverse correctly", () => {
    expect(numberList.reverse()).toStrictEqual([4, 3, 2, 1]);
  });

  test("Should iterate correctly", () => {
    const list = new simpleList<number>(
      new Array(10000).fill(1).map((p, i) => i)
    );

    let itemsToTake = 10;
    const items = [];
    for (const item of list) {
      if (itemsToTake-- == 0) break;
      items.push(item);
    }
    expect(items).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});
