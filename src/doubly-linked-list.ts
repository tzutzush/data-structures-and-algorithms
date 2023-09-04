import { SinglyLinkedList, assert } from "./linked-list";

class ListNode<LIST_TYPE> {
  public value: LIST_TYPE;
  public next: ListNode<LIST_TYPE> | null;
  public previous: ListNode<LIST_TYPE> | null;
  constructor(
    value: LIST_TYPE,
    next: ListNode<LIST_TYPE> | null = null,
    previous: ListNode<LIST_TYPE> | null = null
  ) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }
}

export class DoublyLinkedList<LIST_TYPE>
  implements SinglyLinkedList<LIST_TYPE>
{
  private head: ListNode<LIST_TYPE> | null;
  private tail: ListNode<LIST_TYPE> | null;
  private size: number;

  // O(n)
  constructor(initialList?: LIST_TYPE[]) {
    this.head = null;
    this.tail = null;
    this.size = 0;

    initialList?.forEach((element: LIST_TYPE) => {
      this.append(element);
    });
  }

  // O(1)
  prepend(newItem: LIST_TYPE) {
    const newNode = new ListNode(newItem);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.previous = newNode;
      this.head = newNode;
    }

    this.size++;
    return true;
  }

  // O(1)
  append(newItem: LIST_TYPE) {
    const newNode = new ListNode(newItem);

    if (!this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.previous = this.tail;
      this.tail = newNode;
    }

    this.size++;
    return true;
  }

  // O(n)
  getNodeAtIndex(index: number) {
    let currentNode: ListNode<LIST_TYPE> | null;
    let currentIndex: number;
    if (index > this.size / 2) {
      currentNode = this.tail;
      currentIndex = this.size - 1;

      while (currentNode) {
        if (currentIndex === index) break;
        currentNode = currentNode.previous;
        currentIndex--;
      }
    } else {
      currentNode = this.head;
      currentIndex = 0;

      while (currentNode) {
        if (currentIndex === index) break;
        currentNode = currentNode.next;
        currentIndex++;
      }
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
    assert(this.head != null, "At this point the head reference must be set!");

    let oldNode: ListNode<LIST_TYPE>;
    if (index === 0) {
      oldNode = this.head;
      this.head = this.head.next;
      if (!this.head) {
        this.size--;
        return oldNode.value;
      }
      this.head.previous = null;

      return oldNode.value;
    }

    const nodeToRemove = this.getNodeAtIndex(index);
    const previousNode = nodeToRemove.previous;
    const nextNode = nodeToRemove.next;
    oldNode = nodeToRemove;

    if (!nextNode) {
      assert(
        previousNode != null,
        "At this point there must be a previous node!"
      );
      previousNode.next = null;
      this.tail = previousNode;
      this.size--;
      return oldNode.value;
    } else {
      assert(
        previousNode != null,
        "At this point there must be a previous node!"
      );
      previousNode.next = nextNode;
      nextNode.previous = previousNode;
    }

    this.size--;
    return oldNode.value;
  }

  // O(n)
  insertAtIndex(newItem: LIST_TYPE, index: number) {
    if (index < 0 || index > this.size) throw new Error("Invalid index");
    const newNode = new ListNode(newItem);
    if (index === 0) {
      this.prepend(newItem);
      return true;
    }

    if (index > 0) {
      assert(
        this.head != null,
        "At this point the head reference must be set!"
      );
      let count = 0;
      let currentNode: ListNode<LIST_TYPE> | null = this.head;

      while (currentNode && count < index - 1) {
        currentNode = currentNode.next;
        count++;
      }

      assert(
        currentNode != null,
        '"At this point there must be a  currentNode"'
      );

      newNode.next = currentNode.next;
      newNode.previous = currentNode;
      currentNode.next = newNode;

      if (newNode.next) {
        newNode.next.previous = newNode;
      } else {
        this.tail = newNode;
      }
    }
    this.size++;
    return true;
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

  reverse(): Iterable<LIST_TYPE> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    return {
      [Symbol.iterator]: function* () {
        let currentNode = self.tail;
        while (currentNode) {
          yield currentNode.value;
          currentNode = currentNode.previous;
        }
      },
    };
  }

  *[Symbol.iterator]() {
    let currentNode = this.head;

    while (currentNode) {
      yield currentNode.value;
      currentNode = currentNode.next;
    }
  }
}
