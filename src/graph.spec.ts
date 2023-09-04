import { beforeEach, describe, expect, test } from "vitest";
import { Graph } from "./graph";

describe("Undirected graph", () => {
  //prettier-ignore
  const airports = ['PHX', 'BKK', 'OKC', 'JFK', 'LAX', 'MEX', 'EZE']
  const routes = [
    ["PHX", "LAX"],
    ["PHX", "JFK"],
    ["JFK", "OKC"],
    ["MEX", "LAX"],
    ["MEX", "BKK"],
    ["MEX", "EZE"],
  ];

  let graph: Graph<string>;

  beforeEach(() => {
    graph = new Graph(false);
    airports.forEach((airport) => graph.addNode(airport));
    routes.forEach((route) => graph.addEdge(route[0], route[1]));
  });
  test("Should have added nodes correctly", () => {
    //prettier-ignore
    expect(graph.getNodes()).toStrictEqual(['PHX', 'BKK', 'OKC', 'JFK', 'LAX', 'MEX', 'EZE'])
  });

  test("Should have created edges correctly", () => {
    expect(
      Array.from(graph.getNodes()).map((node) => {
        return [node, graph.getEdges(node)];
      })
    ).toStrictEqual([
      ["PHX", ["LAX", "JFK"]],
      ["BKK", ["MEX"]],
      ["OKC", ["JFK"]],
      ["JFK", ["PHX", "OKC"]],
      ["LAX", ["PHX", "MEX"]],
      ["MEX", ["LAX", "BKK", "EZE"]],
      ["EZE", ["MEX"]],
    ]);
  });

  test("Should insert new node", () => {
    graph.addNode("BUD");
    //prettier-ignore
    expect(graph.getNodes()).toStrictEqual(['PHX', 'BKK', 'OKC', 'JFK', 'LAX', 'MEX', 'EZE', 'BUD'])
  });

  test("Should create new connection correctly", () => {
    graph.addNode("BUD");
    graph.addEdge("BUD", "EZE");
  });

  test("Should return correct element with BFS", () => {
    expect(Array.from(graph.breadthFirstIterator())).toEqual([
      "LAX",
      "JFK",
      "PHX",
      "MEX",
      "OKC",
      "BKK",
      "EZE",
    ]);
  });

  test("Should return elements in correct order with DFS", () => {
    expect(Array.from(graph.depthFirstIterator())).toEqual([
      "PHX",
      "LAX",
      "MEX",
      "BKK",
      "EZE",
      "JFK",
      "OKC",
    ]);
  });

  // test("Should return elements correctly after deletion", () => {
  //   graph.removeNode("MEX");
  //   expect(graph.getNodes()).toStrictEqual([
  //     "PHX",
  //     "BKK",
  //     "OKC",
  //     "JFK",
  //     "LAX",
  //     "EZE",
  //   ]);
  //   expect(graph.getEdges("BKK")).toStrictEqual([]);
  // });
});

describe("Directed graph", () => {
  //prettier-ignore
  const users = ['Osman', 'Ahmed', 'John', 'Esteban', 'Hans']
  const followings = [
    ["Osman", "Ahmed"],
    ["Osman", "John"],
    ["Ahmed", "Osman"],
    ["John", "Esteban"],
    ["John", "Ahmed"],
    ["Esteban", "Osman"],
  ];
  let graph: Graph<string>;

  beforeEach(() => {
    graph = new Graph(true);
    users.forEach((user) => graph.addNode(user));
    followings.forEach((following) =>
      graph.addEdge(following[0], following[1])
    );
  });

  test("Should have added nodes correctly", () => {
    //prettier-ignore
    expect(graph.getNodes()).toStrictEqual(['Osman', 'Ahmed', 'John', 'Esteban', 'Hans'])
  });

  test("Should create edges correctly", () => {
    expect(
      Array.from(graph.getNodes()).map((node) => {
        return [node, graph.getEdges(node)];
      })
    ).toStrictEqual([
      ["Osman", ["Ahmed", "John"]],
      ["Ahmed", ["Osman"]],
      ["John", ["Esteban", "Ahmed"]],
      ["Esteban", ["Osman"]],
      ["Hans", []],
    ]);
  });

  test("Should insert new node", () => {
    graph.addNode("Tomas");
    //prettier-ignore
    expect(graph.getNodes()).toStrictEqual(['Osman', 'Ahmed', 'John', 'Esteban', 'Hans', 'Tomas'])
  });

  test("Should create new connection correctly", () => {
    graph.addNode("Tomas");
    graph.addEdge("Tomas", "Osman");
    expect(graph.getEdges("Tomas")).toStrictEqual(["Osman"]);
  });

  test("Should return correct element with BFS", () => {
    expect(Array.from(graph.breadthFirstIterator())).toEqual([
      "Ahmed",
      "John",
      "Osman",
      "Esteban",
    ]);
  });

  test("Should return elements in correct order with DFS", () => {
    expect(Array.from(graph.depthFirstIterator())).toEqual([
      "Osman",
      "Ahmed",
      "John",
      "Esteban",
    ]);
  });

  test("Should return elements correctly after deletion (unconnected node)", () => {
    graph.removeNode("Hans");
    expect(graph.getNodes()).toStrictEqual([
      "Osman",
      "Ahmed",
      "John",
      "Esteban",
    ]);
  });

  test("Should return elements correctly after deletion (connected node)", () => {
    graph.removeNode("Osman");
    expect(graph.getNodes()).toStrictEqual([
      "Ahmed",
      "John",
      "Esteban",
      "Hans",
    ]);
    expect(() => graph.getEdges("Osman")).toThrowError();
  });

  // test("Should return elements correctly after deletion (connected node)", () => {
  //   graph.removeNode("Osman");
  //   expect(graph.getNodes()).toStrictEqual([
  //     "Ahmed",
  //     "John",
  //     "Esteban",
  //     "Hans",
  //   ]);
  //   expect(graph.getEdges("Ahmed")).toStrictEqual([]);
  // });
});
