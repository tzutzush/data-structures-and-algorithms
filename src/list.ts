export interface List<LIST_TYPE> extends Iterable<LIST_TYPE> {
  append(newItem: LIST_TYPE): boolean;
  removeItemAtIndex(index: number): LIST_TYPE;
  getItemAtIndex(index: number): LIST_TYPE;
  isEmpty(): boolean;
  getSize(): number;
  getList(): LIST_TYPE[];
  reverse(): Iterable<LIST_TYPE>;
}

export class simpleList<LIST_TYPE> implements List<LIST_TYPE> {
  private list: LIST_TYPE[] = [];

  constructor(initialList: LIST_TYPE[]) {
    this.list = initialList;
  }

  append(newItem: LIST_TYPE) {
    this.list.push(newItem);
    return true;
  }

  removeItemAtIndex(index: number) {
    if (index < 0 || index >= this.list.length) {
      throw new Error("Index is out of bounds");
    }

    const result = this.list.splice(index, 1);
    return result[0];
  }

  getItemAtIndex(index: number) {
    if (index < 0 || index >= this.list.length) {
      throw new Error("Index is out of bounds");
    }

    return this.list[index];
  }

  isEmpty(): boolean {
    return this.list.length === 0;
  }

  getSize(): number {
    return this.list.length;
  }

  getList(): LIST_TYPE[] {
    return [...this.list];
  }

  reverse(): Iterable<LIST_TYPE> {
    return this.list.reverse();
  }

  *[Symbol.iterator]() {
    for (const listItem of this.list) {
      yield listItem;
    }
  }
}
