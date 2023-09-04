import { assert } from "./linked-list";

export interface InterfaceNode<TYPE> {
  readonly value?: TYPE;
  add(node: Node<TYPE>): boolean;
  remove(node: Node<TYPE>): boolean;
}

abstract class AbstractNode<TYPE> implements InterfaceNode<TYPE> {
  readonly value?: TYPE = undefined;
  private children: Node<TYPE>[];
  private parent: Node<TYPE> | null;

  constructor(value?: TYPE, ...children: AbstractNode<TYPE>[]) {
    this.value = value;
    this.parent = null;
    this.children = [];
    children.forEach((node) => this.add(node));
  }

  add(node: AbstractNode<TYPE>): boolean {
    this.children.push(node);
    node.adopt(this);
    return true;
  }

  remove(node: AbstractNode<TYPE>): boolean {
    const beforeRemove = this.children.length;
    this.children = this.children.filter((child) => {
      return child != node;
    });
    const afterRemove = this.children.length;
    if (beforeRemove > afterRemove) {
      node.orphan();
      return true;
    }
    return false;
  }

  private orphan() {
    this.parent = null;
  }

  private adopt(parent: Node<TYPE>): void {
    this.parent = parent;
  }

  *depthFirstIterator(preOrder: boolean): Iterable<InterfaceNode<TYPE>> {
    if (preOrder) {
      yield this;
    }
    for (const child of this.children) {
      for (const grandChild of child.depthFirstIterator(preOrder)) {
        yield grandChild;
      }
    }
    if (!preOrder) {
      yield this;
    }
  }

  *breadthFirstIterator(): Iterable<InterfaceNode<TYPE>> {
    const queue: AbstractNode<TYPE>[] = [];
    const visited = new Set<AbstractNode<TYPE>>();

    queue.push(this);
    visited.add(this);

    while (queue.length > 0) {
      const node = queue.shift();
      assert(node != null, "Node has to be set at this point");

      for (const child of node.children) {
        if (!visited.has(child)) {
          yield child;
          queue.push(child);
          visited.add(child);
        }
      }
    }
  }
}

export class Node<TYPE> extends AbstractNode<TYPE> {
  constructor(value: TYPE, ...children: Node<TYPE>[]) {
    super(value, ...children);
  }
}

export class Tree<TYPE> extends AbstractNode<TYPE> {
  constructor(...children: Node<TYPE>[]) {
    super(undefined, ...children);
  }

  *depthFirstIterator(preOrder: boolean): Iterable<InterfaceNode<TYPE>> {
    for (const item of super.depthFirstIterator(preOrder)) {
      if (item != this) {
        yield item;
      }
    }
  }

  *breadthFirstIterator(): Iterable<InterfaceNode<TYPE>> {
    for (const item of super.breadthFirstIterator()) {
      if (item != this) {
        yield item;
      }
    }
  }
}
