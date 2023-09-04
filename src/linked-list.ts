import { List } from "./list";

export function assert(condition: unknown, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg);
  }
}

class ListNode<LIST_TYPE> {
  value: LIST_TYPE;
  next: ListNode<LIST_TYPE> | null;
  constructor(value: LIST_TYPE, next: ListNode<LIST_TYPE> | null = null) {
    this.value = value;
    this.next = next;
  }
}

export interface SinglyLinkedList<LIST_TYPE> extends List<LIST_TYPE> {
  prepend(newItem: LIST_TYPE): boolean;
  insertAtIndex(newItem: LIST_TYPE, index: number): boolean;
  getNodeAtIndex(index: number): ListNode<LIST_TYPE>;
  poll(): LIST_TYPE;
  pop(): LIST_TYPE;
  peek(): LIST_TYPE;
}

export class LinkedList<LIST_TYPE> implements List<LIST_TYPE> {
  private head: ListNode<LIST_TYPE> | null;
  private tail: ListNode<LIST_TYPE> | null;
  private size = 0;

  // O(n)
  constructor(initialList?: LIST_TYPE[]) {
    this.head = null;
    this.tail = null;
    initialList?.forEach((element: LIST_TYPE) => {
      this.append(element);
    });
  }

  // O(1)
  prepend(newItem: LIST_TYPE) {
    const newNode = new ListNode(newItem, this.head);
    this.head = newNode;
    if (this.size === 0) this.tail = newNode;
    this.size++;

    return true;
  }

  // O(n)
  append(newItem: LIST_TYPE) {
    const newNode = new ListNode(newItem);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      assert(this.tail != null, "At this point, tail reference must be set");
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size++;
    return true;
  }

  // O(n)
  insertAtIndex(newItem: LIST_TYPE, index: number) {
    if (index < 0 || index > this.size) throw new Error("Invalid index");
    const newNode = new ListNode(newItem);
    if (index === 0) {
      this.prepend(newItem);
      return true;
    }

    if (index === this.size) {
      this.append(newItem);
      return true;
    }

    assert(this.head != null, "At this point the head reference must be set!");

    const previousNode = this.getNodeAtIndex(index - 1);

    newNode.next = previousNode.next;
    previousNode.next = newNode;

    this.size++;
    return true;
  }

  // O(n)
  getNodeAtIndex(index: number) {
    assert(this.tail != null, "List is empty!");
    if (index === this.size - 1) return this.tail;
    let currentNode: ListNode<LIST_TYPE> | null = this.head;
    let currentIndex = 0;

    while (currentNode) {
      if (currentIndex === index) break;
      currentNode = currentNode.next;
      currentIndex++;
    }

    assert(currentNode != null, "List is empty!");

    return currentNode;
  }

  // O(n)
  getItemAtIndex(index: number) {
    return this.getNodeAtIndex(index).value;
  }

  // O(n)
  removeItemAtIndex(index: number) {
    assert(index >= 0 && index < this.size, "Invalid index");

    let oldNode;
    if (index == 0) {
      assert(
        this.head != null,
        "At this point the head reference must be set!"
      );
      oldNode = this.head;
      this.head = this.head.next;
    } else {
      const node = this.getNodeAtIndex(index - 1);
      assert(
        node.next,
        "At this point, node.next must be set, see index check above"
      );
      oldNode = node.next;
      node.next = node.next.next;
      this.tail = node.next;
    }

    this.size--;
    return oldNode.value;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  getSize(): number {
    return this.size;
  }

  // O(n)
  getList(): LIST_TYPE[] {
    return Array.from(this);
  }

  // O(1)
  poll() {
    return this.removeItemAtIndex(0);
  }
  // O(n)
  pop() {
    return this.removeItemAtIndex(this.size - 1);
  }
  // O(n)
  peek() {
    return this.getItemAtIndex(this.size - 1);
  }

  // O(n)
  reverse(): Iterable<LIST_TYPE> {
    return this.getList().reverse();
  }

  *[Symbol.iterator]() {
    let currentNode = this.head;

    while (currentNode) {
      yield currentNode.value;
      currentNode = currentNode.next;
    }
  }
}
