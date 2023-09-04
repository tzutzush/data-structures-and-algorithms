import { beforeEach, describe, expect, test } from "vitest";
import { HashTable } from "./hashtable";

describe("Hash table", () => {
  let hashTable: HashTable<string, string>;
  beforeEach(() => {
    hashTable = new HashTable<string, string>(32, (key) => {
      let total = 0;
      for (let i = 0; i < key.length; i++) {
        total += key.charCodeAt(i);
      }
      return total % 32;
    });
    hashTable.set("name", "Bruce Willis");
    hashTable.set("mane", "Sylvester Stallone");
  });

  test("Should get correct value even if index is identical", () => {
    expect(hashTable.get("name")).toStrictEqual("Bruce Willis");
    expect(hashTable.get("mane")).toStrictEqual("Sylvester Stallone");
  });

  test("Should remove correct element", () => {
    expect(hashTable.remove("name")).toStrictEqual(true);
    expect(hashTable.get("name")).toStrictEqual(undefined);
  });

  test("Should fail to remove element if key does not exist", () => {
    expect(hashTable.remove("nonexistent")).toStrictEqual(false);
  });

  test("Should set element", () => {
    expect(hashTable.set("genre", "action"));
    expect(hashTable.get("genre")).toStrictEqual("action");
  });

  test("Should reset element's value", () => {
    expect(hashTable.set("genre", "action"));
    expect(hashTable.set("genre", "fiction"));
    expect(hashTable.get("genre")).toStrictEqual("fiction");
  });
});
