import { LinkedList } from "./linked-list";

export class Queue<TYPE> {
  private linkedList: LinkedList<TYPE>;
  constructor() {
    this.linkedList = new LinkedList<TYPE>();
  }

  enqueue(newItem: TYPE): void {
    this.linkedList.append(newItem);
  }

  dequeue(): TYPE {
    const removedHead = this.linkedList.getItemAtIndex(0);
    this.linkedList.poll();
    return removedHead;
  }

  isEmpty(): boolean {
    return this.linkedList.isEmpty();
  }

  peek(): TYPE {
    if (this.isEmpty()) throw new Error("Queue is empty");
    return this.linkedList.getItemAtIndex(0);
  }

  getList(): TYPE[] {
    return this.linkedList.getList();
  }
}
