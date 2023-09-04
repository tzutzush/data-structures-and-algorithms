export class Stack<TYPE> {
  private items: TYPE[] = [];
  push(newItem: TYPE): Stack<TYPE> {
    this.items.push(newItem);
    return this;
  }
  pop(): Stack<TYPE> {
    this.items.pop();
    return this;
  }
  peek(): TYPE {
    if (this.isEmpty()) throw new Error("Stack is empty");
    return this.items[this.items.length - 1];
  }
  isEmpty(): boolean {
    return this.items.length === 0;
  }
  getSize(): number {
    return this.items.length;
  }
  getStack(): TYPE[] {
    return [...this.items];
  }
}
