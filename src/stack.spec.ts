import { beforeAll, describe, expect, test } from "vitest";
import { Stack } from "./stack";

describe("Stack", () => {
  let stack: Stack<string>;

  beforeAll(() => {
    stack = new Stack<string>();
    stack.push("apple");
    stack.push("banana");
    stack.push("carrot");
    stack.push("plum");
    stack.push("pear");
  });

  test("Should push new item into the stack", () => {
    stack.push("lingonberry");
    expect(stack.getStack()).toStrictEqual([
      "apple",
      "banana",
      "carrot",
      "plum",
      "pear",
      "lingonberry",
    ]);
  });

  test("Should peek on lastly added element", () => {
    expect(stack.peek()).toStrictEqual("lingonberry");
  });

  test("Should throw error when trying to peek on empty stack", () => {
    const newStack = new Stack<string>();
    expect(() => newStack.peek()).toThrowError("Stack is empty");
  });

  test("Should pop lastly added element", () => {
    stack.pop();
    expect(stack.getStack()).toStrictEqual([
      "apple",
      "banana",
      "carrot",
      "plum",
      "pear",
    ]);
  });

  test("Should return stack size correctly", () => {
    expect(stack.getSize()).toStrictEqual(5);
  });

  test("Should return stack elements in an array", () => {
    expect(stack.getStack()).toStrictEqual([
      "apple",
      "banana",
      "carrot",
      "plum",
      "pear",
    ]);
  });

  test("Should return false if list is propagated", () => {
    expect(stack.isEmpty()).toBe(false);
  });

  test("Should return true if list is empty", () => {
    const newStack = new Stack<string>();
    expect(newStack.isEmpty()).toBe(true);
  });
});
