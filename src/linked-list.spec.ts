import { beforeEach, describe, expect, test } from "vitest";
import { LinkedList } from "./linked-list";

describe("Singly linked list", () => {
  let linkedListWithString: LinkedList<string>;

  beforeEach(() => {
    linkedListWithString = new LinkedList<string>();
  });

  // APPENDING

  test("Should correctly initialize list from array", () => {
    linkedListWithString = new LinkedList<string>(["apple", "banana"]);
    expect(linkedListWithString.getList()).toStrictEqual(["apple", "banana"]);
  });

  test("Should append at the end of the list", () => {
    linkedListWithString = new LinkedList<string>(["apple", "banana"]);
    linkedListWithString.append("carrot");
    expect(linkedListWithString.getList()).toStrictEqual([
      "apple",
      "banana",
      "carrot",
    ]);
  });

  // RETURN SIZE

  test("Should return correct size", () => {
    linkedListWithString = new LinkedList<string>(["apple", "banana"]);
    expect(linkedListWithString.getSize()).toStrictEqual(2);
  });

  // INSERTING ELEMENTS AT GIVEN INDEX

  test("Should insert element at index 0 into empty list", () => {
    expect(linkedListWithString.insertAtIndex("apple", 0)).toBe(true);
    expect(linkedListWithString.getList()).toStrictEqual(["apple"]);
    expect(linkedListWithString.getSize()).toStrictEqual(1);
  });

  test("Should insert element at index 0 into existing list", () => {
    linkedListWithString = new LinkedList<string>(["banana"]);
    expect(linkedListWithString.insertAtIndex("apple", 0)).toBe(true);
    expect(linkedListWithString.getList()).toStrictEqual(["apple", "banana"]);
    expect(linkedListWithString.getSize()).toStrictEqual(2);
  });

  test("Should insert element at index n+1 into empty list", () => {
    expect(() => linkedListWithString.insertAtIndex("apple", 3)).toThrowError(
      "Invalid index"
    );
  });

  test("Should insert element at n+1 index into existing list", () => {
    linkedListWithString = new LinkedList<string>([
      "apple",
      "banana",
      "cherry",
    ]);
    expect(linkedListWithString.insertAtIndex("carrot", 2)).toBe(true);
    expect(linkedListWithString.getList()).toStrictEqual([
      "apple",
      "banana",
      "carrot",
      "cherry",
    ]);
    expect(linkedListWithString.getSize()).toStrictEqual(4);
  });

  test("Should insert element at n+1 index (last element) into existing list", () => {
    linkedListWithString = new LinkedList<string>([
      "apple",
      "banana",
      "cherry",
    ]);
    expect(linkedListWithString.insertAtIndex("carrot", 3)).toBe(true);
    expect(linkedListWithString.getList()).toStrictEqual([
      "apple",
      "banana",
      "cherry",
      "carrot",
    ]);
    expect(linkedListWithString.getSize()).toStrictEqual(4);
  });

  // EXTRACTING VALUES

  test("Should return value at given index", () => {
    linkedListWithString = new LinkedList<string>(["apple", "banana"]);
    expect(linkedListWithString.getItemAtIndex(1)).toStrictEqual("banana");
  });

  test("Should return value at given index", () => {
    linkedListWithString = new LinkedList<string>(["apple", "banana"]);
    expect(linkedListWithString.getItemAtIndex(0)).toStrictEqual("apple");
  });

  test("Should return null when extracting value if list is empty", () => {
    expect(() => linkedListWithString.getItemAtIndex(0)).toThrowError(
      "List is empty"
    );
  });

  // REMOVING ELEMENTS

  test("Should throw error when deleting if index is invalid", () => {
    linkedListWithString = new LinkedList<string>(["apple", "banana"]);
    expect(() => linkedListWithString.removeItemAtIndex(5)).toThrowError(
      "Invalid index"
    );
  });

  test("Should throw error when deleting if list is empty", () => {
    expect(() => linkedListWithString.removeItemAtIndex(0)).toThrowError(
      "Invalid index"
    );
  });

  test("Should delete head element", () => {
    linkedListWithString = new LinkedList<string>(["apple", "banana"]);
    linkedListWithString.removeItemAtIndex(0);
    expect(linkedListWithString.getList()).toStrictEqual(["banana"]);
  });

  test("Should delete element at given index", () => {
    linkedListWithString = new LinkedList<string>([
      "apple",
      "banana",
      "carrot",
    ]);
    linkedListWithString.removeItemAtIndex(2);
    expect(linkedListWithString.getList()).toStrictEqual(["apple", "banana"]);
  });

  // CHECK EMPTINESS

  test("Should return true if list is empty", () => {
    expect(linkedListWithString.isEmpty()).toBe(true);
  });

  test("Should return false if list is propagated", () => {
    linkedListWithString = new LinkedList<string>(["apple", "banana"]);
    expect(linkedListWithString.isEmpty()).toBe(false);
  });

  // RETURNING THE LIST

  test("Should return empty array when getting the list if list is empty", () => {
    expect(linkedListWithString.getList()).toStrictEqual([]);
  });

  test("Should throw error when removing head element with poll from empty list", () => {
    expect(() => linkedListWithString.poll()).toThrowError("Invalid index");
  });

  // POLLING

  test("Should delete head element when polling", () => {
    linkedListWithString = new LinkedList<string>(["apple", "banana"]);
    linkedListWithString.poll();
    expect(linkedListWithString.getList()).toStrictEqual(["banana"]);
  });

  test("Should throw error when polling element from empty list", () => {
    expect(() => linkedListWithString.poll()).toThrowError("Invalid index");
  });

  // POPPING

  test("Should throw error when popping element from empty list", () => {
    expect(() => linkedListWithString.pop()).toThrowError("Invalid index");
  });

  test("Should delete only element when popping", () => {
    linkedListWithString = new LinkedList<string>(["apple"]);
    linkedListWithString.pop();
    expect(linkedListWithString.getList()).toStrictEqual([]);
  });

  test("Should delete last element when popping", () => {
    linkedListWithString = new LinkedList<string>([
      "apple",
      "banana",
      "carrot",
    ]);
    linkedListWithString.pop();
    expect(linkedListWithString.getList()).toStrictEqual(["apple", "banana"]);
  });

  // PEEKING

  test("Should throw error when trying to peek on empty list", () => {
    expect(() => linkedListWithString.peek()).toThrowError("List is empty");
  });

  test("Should return head value when list consists of one element", () => {
    linkedListWithString = new LinkedList<string>(["apple"]);
    expect(linkedListWithString.peek()).toStrictEqual("apple");
  });

  test("Should return last value when list consists of multiple elements", () => {
    linkedListWithString = new LinkedList<string>(["apple", "banana"]);
    expect(linkedListWithString.peek()).toStrictEqual("banana");
  });

  test("Should reverse", () => {
    linkedListWithString = new LinkedList<string>([
      "apple",
      "banana",
      "carrot",
      "lingonberry",
    ]);
    expect(linkedListWithString.reverse()).toStrictEqual([
      "lingonberry",
      "carrot",
      "banana",
      "apple",
    ]);
  });

  test("Should iterate efficiently", () => {
    const linkedList = new LinkedList<number>(
      new Array(10000).fill(1).map((p, i) => i)
    );
    let itemsToTake = 10;
    const items = [];
    for (const item of linkedList) {
      if (itemsToTake-- == 0) {
        break;
      }
      items.push(item);
    }
    expect(items).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  test("Should iterate in reverse efficiently", () => {
    const linkedList = new LinkedList<number>(
      new Array(10000).fill(1).map((p, i) => i)
    );
    const reversed = linkedList.reverse();

    let itemsToTake = 10;
    const items = [];
    for (const item of reversed) {
      if (itemsToTake-- == 0) {
        break;
      }
      items.push(item);
    }
    expect(items).toEqual([
      9999, 9998, 9997, 9996, 9995, 9994, 9993, 9992, 9991, 9990,
    ]);
  });
});
