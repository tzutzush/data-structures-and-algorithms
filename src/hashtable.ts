type Bucket<K, V> = [K, V][];

export class HashTable<K, V> {
  private table: Bucket<K, V>[];
  public size;
  constructor(size: number, private hashFunction: (item: K) => number) {
    this.table = new Array(size);
    this.size = size;
  }

  private hash(key: K) {
    const hash = this.hashFunction(key);
    return hash;
  }

  set(key: K, value: V) {
    const index = this.hash(key);
    const bucket = this.table[index];

    if (!bucket) {
      this.table[index] = [[key, value]];
    } else {
      const sameKeyItem = bucket.find((item: [K, V]) => item[0] === key);
      if (sameKeyItem) {
        sameKeyItem[1] = value;
      } else {
        bucket.push([key, value]);
      }
    }
  }

  get(key: K) {
    const index = this.hash(key);
    const bucket = this.table[index];

    if (bucket) {
      const sameKeyItem = bucket.find((item: [K, V]) => item[0] === key);
      if (sameKeyItem) {
        return sameKeyItem[1];
      }
    }
    return undefined;
  }

  remove(key: K): boolean {
    const index = this.hash(key);
    const bucket = this.table[index];

    if (bucket) {
      const sameKeyItem = bucket.find((item: [K, V]) => item[0] === key);
      if (sameKeyItem) {
        bucket.splice(bucket.indexOf(sameKeyItem), 1);
        return true;
      }
    }
    return false;
  }
}
