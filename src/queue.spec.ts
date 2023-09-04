import { beforeEach, describe, expect, test } from "vitest";
import { Queue } from "./queue";

describe("Queue", () => {
  let queue: Queue<string>;
  beforeEach(() => {
    queue = new Queue<string>();
    queue.enqueue("apple");
    queue.enqueue("banana");
    queue.enqueue("carrot");
    queue.enqueue("pear");
  });

  test("Should enqueue element at the end of the queue", () => {
    queue.enqueue("lingonberry");
    expect(queue.getList()).toStrictEqual([
      "apple",
      "banana",
      "carrot",
      "pear",
      "lingonberry",
    ]);
  });

  test("Should dequeue element at the start of the queue", () => {
    expect(queue.dequeue()).toStrictEqual("apple");
  });

  test("Should return false if queue is propagated", () => {
    expect(queue.isEmpty()).toBe(false);
  });

  test("Should return true if queue is empty", () => {
    const newQueue = new Queue<string>();
    expect(newQueue.isEmpty()).toBe(true);
  });

  test("Should throw error when trying to peek on empty queue", () => {
    const newQueue = new Queue<string>();
    expect(() => newQueue.peek()).toThrowError();
  });

  test("Should return first element when peeking", () => {
    expect(queue.peek()).toStrictEqual("apple");
  });

  test("Should return queue", () => {
    expect(queue.getList()).toStrictEqual([
      "apple",
      "banana",
      "carrot",
      "pear",
    ]);
  });
});
