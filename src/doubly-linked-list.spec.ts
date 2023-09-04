import { beforeEach, describe, expect, test } from "vitest";
import { DoublyLinkedList } from "./doubly-linked-list";

describe("Doubly linked list", () => {
  let doublyLinkedList: DoublyLinkedList<string>;

  beforeEach(() => {
    doublyLinkedList = new DoublyLinkedList<string>();
  });

  // APPENDING

  test("Should correctly initialize list from array", () => {
    doublyLinkedList = new DoublyLinkedList<string>([
      "apple",
      "banana",
      "carrot",
    ]);
    expect(doublyLinkedList.getList()).toStrictEqual([
      "apple",
      "banana",
      "carrot",
    ]);
    expect(doublyLinkedList.getSize()).toStrictEqual(3);
  });

  test("Should append at the end of the list", () => {
    doublyLinkedList = new DoublyLinkedList<string>(["apple", "banana"]);
    doublyLinkedList.append("carrot");
    expect(doublyLinkedList.getList()).toStrictEqual([
      "apple",
      "banana",
      "carrot",
    ]);
    expect(doublyLinkedList.getSize()).toStrictEqual(3);
  });

  // RETURN SIZE

  test("Should return correct size", () => {
    doublyLinkedList = new DoublyLinkedList<string>(["apple", "banana"]);
    expect(doublyLinkedList.getList()).toStrictEqual(["apple", "banana"]);
    expect(doublyLinkedList.getSize()).toStrictEqual(2);
  });

  // INSERTING ELEMENTS AT GIVEN INDEX

  test("Should insert element at index 0 into empty list", () => {
    doublyLinkedList.insertAtIndex("apple", 0);
    expect(doublyLinkedList.getList()).toStrictEqual(["apple"]);
    expect(doublyLinkedList.getSize()).toStrictEqual(1);
  });

  test("Should insert element at index 0 into existing list", () => {
    doublyLinkedList = new DoublyLinkedList<string>(["banana"]);
    doublyLinkedList.insertAtIndex("apple", 0);
    expect(doublyLinkedList.getList()).toStrictEqual(["apple", "banana"]);
    expect(doublyLinkedList.getSize()).toStrictEqual(2);
  });

  test("Should throw error when inserting element at invalid index n+1 into empty list", () => {
    expect(() => doublyLinkedList.insertAtIndex("apple", 3)).toThrowError(
      "Invalid index"
    );
  });

  test("Should insert element at n+1 index (0) into existing list", () => {
    doublyLinkedList = new DoublyLinkedList<string>([
      "apple",
      "banana",
      "cherry",
    ]);
    doublyLinkedList.insertAtIndex("carrot", 0);
    expect(doublyLinkedList.getList()).toStrictEqual([
      "carrot",
      "apple",
      "banana",
      "cherry",
    ]);
    expect(doublyLinkedList.getSize()).toStrictEqual(4);
  });

  test("Should insert element at n+1 index (2) into existing list", () => {
    doublyLinkedList = new DoublyLinkedList<string>([
      "apple",
      "banana",
      "cherry",
    ]);
    doublyLinkedList.insertAtIndex("carrot", 2);
    expect(doublyLinkedList.getList()).toStrictEqual([
      "apple",
      "banana",
      "carrot",
      "cherry",
    ]);
    expect(doublyLinkedList.getSize()).toStrictEqual(4);
  });

  test("Should insert element at n+1 index (last) into existing list", () => {
    doublyLinkedList = new DoublyLinkedList<string>([
      "apple",
      "banana",
      "cherry",
    ]);
    doublyLinkedList.insertAtIndex("carrot", 3);
    expect(doublyLinkedList.getList()).toStrictEqual([
      "apple",
      "banana",
      "cherry",
      "carrot",
    ]);
    expect(doublyLinkedList.getSize()).toStrictEqual(4);
  });

  // EXTRACTING VALUES

  test("Should return value at given index", () => {
    doublyLinkedList = new DoublyLinkedList<string>(["apple", "banana"]);
    expect(doublyLinkedList.getItemAtIndex(1)).toStrictEqual("banana");
  });

  test("Should return null when extracting a value if list is empty", () => {
    expect(() => doublyLinkedList.getItemAtIndex(0)).toThrowError(
      "List is empty"
    );
  });

  // REMOVING ELEMENTS

  test("Should throw error when deleting if index is invalid", () => {
    doublyLinkedList = new DoublyLinkedList<string>(["apple", "banana"]);
    expect(() => doublyLinkedList.removeItemAtIndex(5)).toThrowError(
      "Invalid index"
    );
  });

  test("Should throw error when deleting if list is empty", () => {
    expect(() => doublyLinkedList.removeItemAtIndex(0)).toThrowError(
      "Invalid index"
    );
  });

  test("Should delete head element", () => {
    doublyLinkedList = new DoublyLinkedList<string>(["apple", "banana"]);
    doublyLinkedList.removeItemAtIndex(0);
    expect(doublyLinkedList.getList()).toStrictEqual(["banana"]);
  });

  test("Should delete element at given index", () => {
    doublyLinkedList = new DoublyLinkedList<string>([
      "apple",
      "banana",
      "carrot",
    ]);
    doublyLinkedList.removeItemAtIndex(2);
    expect(doublyLinkedList.getList()).toStrictEqual(["apple", "banana"]);
  });

  test("Should delete element at given index in middle position", () => {
    doublyLinkedList = new DoublyLinkedList<string>([
      "apple",
      "banana",
      "carrot",
    ]);
    doublyLinkedList.removeItemAtIndex(1);
    expect(doublyLinkedList.getList()).toStrictEqual(["apple", "carrot"]);
  });

  test("Should delete head element and return with empty list if size is 1", () => {
    doublyLinkedList = new DoublyLinkedList<string>(["apple"]);
    doublyLinkedList.removeItemAtIndex(0);
    expect(doublyLinkedList.getList()).toStrictEqual([]);
  });

  test("Should start iteration from behind if index can be reached faster", () => {
    //prettier-ignore
    doublyLinkedList = new DoublyLinkedList<string>([
      "apple", "banana", "cherry", 'lingonberry','watermelon','peach', 'tomato',
    ]);
    doublyLinkedList.removeItemAtIndex(4);
    //prettier-ignore
    expect(doublyLinkedList.getList()).toStrictEqual([
      "apple", "banana", "cherry", 'lingonberry','peach', 'tomato',
    ]);
  });

  // CHECK EMPTINESS

  test("Should return true if list is empty", () => {
    expect(doublyLinkedList.isEmpty()).toBe(true);
  });

  test("Should return false if list is propagated", () => {
    doublyLinkedList = new DoublyLinkedList<string>(["apple", "banana"]);
    expect(doublyLinkedList.isEmpty()).toBe(false);
  });

  // RETURNING THE LIST

  test("Should return empty array when getting the list if list is empty", () => {
    expect(doublyLinkedList.getList()).toStrictEqual([]);
  });

  test("Should throw error when removing head element with poll from empty list", () => {
    expect(() => doublyLinkedList.poll()).toThrowError("Invalid index");
  });

  // POLLING

  test("Should delete head element when polling", () => {
    doublyLinkedList = new DoublyLinkedList<string>(["apple", "banana"]);
    doublyLinkedList.poll();
    expect(doublyLinkedList.getList()).toStrictEqual(["banana"]);
  });

  test("Should delete head element when polling and return with empty array if size is 1", () => {
    doublyLinkedList = new DoublyLinkedList<string>(["apple"]);
    doublyLinkedList.poll();
    expect(doublyLinkedList.getList()).toStrictEqual([]);
  });

  test("Should throw error when popping element from empty list", () => {
    expect(() => doublyLinkedList.pop()).toThrowError("Invalid index");
  });

  // POPPING

  test("Should delete only element when popping", () => {
    doublyLinkedList = new DoublyLinkedList<string>(["apple"]);
    doublyLinkedList.pop();
    expect(doublyLinkedList.getList()).toStrictEqual([]);
  });

  test("Should delete last element when popping", () => {
    doublyLinkedList = new DoublyLinkedList<string>([
      "apple",
      "banana",
      "carrot",
    ]);
    doublyLinkedList.pop();
    expect(doublyLinkedList.getList()).toStrictEqual(["apple", "banana"]);
  });

  // PEEKING

  test("Should throw error when trying to peek on empty list", () => {
    expect(() => doublyLinkedList.peek()).toThrowError("List is empty");
  });

  test("Should return head value when list consists of one element", () => {
    doublyLinkedList = new DoublyLinkedList<string>(["apple"]);
    expect(doublyLinkedList.peek()).toStrictEqual("apple");
  });

  test("Should return last value when list consists of multiple elements", () => {
    doublyLinkedList = new DoublyLinkedList<string>(["apple", "banana"]);
    expect(doublyLinkedList.peek()).toStrictEqual("banana");
  });

  test("Should iterate efficiently", () => {
    const doublyLinkedList = new DoublyLinkedList<number>(
      new Array(10000).fill(1).map((p, i) => i)
    );
    let itemsToTake = 10;
    const items = [];
    for (const item of doublyLinkedList) {
      if (itemsToTake-- == 0) {
        break;
      }
      items.push(item);
    }
    expect(items).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  test("Should iterate in reverse efficiently", () => {
    const doublyLinkedList = new DoublyLinkedList<number>(
      new Array(10000).fill(1).map((p, i) => i)
    );
    const reversed = doublyLinkedList.reverse();

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

    doublyLinkedList.append(10000);

    itemsToTake = 10;
    items.length = 0;

    for (const item of reversed) {
      if (itemsToTake-- == 0) {
        break;
      }
      items.push(item);
    }
    expect(items).toEqual([
      10000, 9999, 9998, 9997, 9996, 9995, 9994, 9993, 9992, 9991,
    ]);
  });
});
