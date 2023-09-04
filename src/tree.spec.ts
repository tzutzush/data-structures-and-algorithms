import { beforeAll, describe, expect, test } from "vitest";
import { Tree, Node } from "./tree";

describe("Tree", () => {
  let tree: Tree<string>;
  beforeAll(() => {
    tree = new Tree(
      new Node(
        "A",
        new Node("B", new Node("D")),
        new Node("C", new Node("E"), new Node("F"))
      )
    );
  });
  //    A
  // B     C
  // D    E F

  test("Should do DFS pre-order", () => {
    expect(
      Array.from(tree.depthFirstIterator(true)).map((p) => p.value)
    ).toEqual(["A", "B", "D", "C", "E", "F"]);
  });

  test("Should do DFS post-order", () => {
    expect(
      Array.from(tree.depthFirstIterator(false)).map((p) => p.value)
    ).toEqual(["D", "B", "E", "F", "C", "A"]);
  });

  test("Should do BFS pre-order", () => {
    expect(Array.from(tree.breadthFirstIterator()).map((p) => p.value)).toEqual(
      ["A", "B", "C", "D", "E", "F"]
    );
  });
});
