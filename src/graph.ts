import { assert } from "./linked-list";

interface IGraph<T> {
  addNode(node: T): boolean;
  removeNode(node: T): boolean;

  addEdge(originNode: T, destinationNode: T): boolean;
  removeEdge(originNode: T, destinationNode: T): boolean;

  getNodes(): T[];
  getEdges(node: T): T[];
}
// N amount of nodes
// E amount of edges
// N(E) amount of edges at node

export class Graph<TYPE> implements IGraph<TYPE> {
  private adjacencyList;
  private directed: boolean;
  constructor(directed: boolean) {
    this.adjacencyList = new Map();
    this.directed = directed;
  }

  // O(1)
  addNode(node: TYPE) {
    this.adjacencyList.set(node, []);
    return true;
  }

  //O(N(E)) + C
  removeNode(node: TYPE) {
    const origin = this.adjacencyList.get(node);

    origin.forEach((neighbor: TYPE) => {
      console.log(neighbor);

      this.removeEdge(node, neighbor);
      if (this.directed) {
        this.removeEdge(neighbor, node);
      }
    });
    this.adjacencyList.delete(node);

    return true;
  }

  // O(1)
  addEdge(originNode: TYPE, destinationNode: TYPE) {
    try {
      if (!this.directed) {
        this.adjacencyList.get(originNode).push(destinationNode);
        this.adjacencyList.get(destinationNode).push(originNode);
      }

      if (this.directed) {
        this.adjacencyList.get(originNode).push(destinationNode);
      }
    } catch {
      return false;
    }
    return true;
  }

  removeEdge(originNode: TYPE, destinationNode: TYPE): boolean {
    const origin = this.adjacencyList.get(originNode);
    const destination = this.adjacencyList.get(destinationNode);
    if (!origin || !destination) return false;

    const originIndex = destination.indexOf(originNode);
    const destinationIndex = origin.indexOf(destinationNode);
    if (originIndex < 0 || destinationIndex < 0) return false;

    if (!this.directed) {
      origin.splice(destinationIndex, 1);
      destination.splice(originIndex, 1);
    }

    if (this.directed) {
      origin.splice(destinationIndex, 1);
    }

    return true;
  }

  getNodes(): TYPE[] {
    return Array.from(this.adjacencyList.keys());
  }

  getEdges(node: TYPE) {
    const nodeToReturn = this.adjacencyList.get(node);
    assert(nodeToReturn != null, "Node does not exist");
    return nodeToReturn;
  }
  // O(1)
  private get firstNode() {
    return this.adjacencyList.entries().next().value;
  }

  *breadthFirstSearch(): Iterable<TYPE> {
    const visitedNodes = new Set();
    const firstElement = this.firstNode[0];
    const queue = [firstElement];

    while (queue.length > 0) {
      const node = queue.shift();
      const children = this.adjacencyList.get(node);

      for (const child of children) {
        if (!visitedNodes.has(child)) {
          visitedNodes.add(child);
          queue.push(child);
          yield child;
        }
      }
    }
  }

  *depthFirstSearch(
    visitedNodes = new Set(),
    start = this.firstNode[0]
  ): Iterable<TYPE> {
    visitedNodes.add(start);
    yield start;
    const children = this.adjacencyList.get(start);

    for (const child of children) {
      if (!visitedNodes.has(child)) {
        yield* this.depthFirstSearch(visitedNodes, child);
      }
    }
  }

  *breadthFirstIterator(): Iterable<TYPE> {
    for (const item of this.breadthFirstSearch()) {
      yield item;
    }
  }

  *depthFirstIterator(): Iterable<TYPE> {
    for (const item of this.depthFirstSearch()) {
      yield item;
    }
  }
}

// const users = ["Osman", "Ahmed", "John", "Esteban", "Hans"];
// const followings = [
//   ["Osman", "Ahmed"],
//   ["Osman", "John"],
//   ["Ahmed", "Osman"],
//   ["John", "Esteban"],
//   ["John", "Ahmed"],
//   ["Esteban", "Osman"],
// ];

// const graph = new Graph(true);
// users.forEach((user) => graph.addNode(user));
// followings.forEach((following) => graph.addEdge(following[0], following[1]));
// console.log(
//   Array.from(graph.getNodes()).map((node) => {
//     return [node, graph.getEdges(node)];
//   })
// );
