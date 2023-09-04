import { describe, expect, test } from "vitest";
import { towerOfHanoi } from "./hanoi-tower";

describe("Tower of Hanoi", () => {
  test("Function solves problem correctly with 3 disks", () => {
    expect(towerOfHanoi(3, "A", "C", "B")).toStrictEqual(
      "Disk 1 from A to C\n" +
        "Disk 2 from A to B\n" +
        "Disk 1 from C to B\n" +
        "Disk 3 from A to C\n" +
        "Disk 1 from B to A\n" +
        "Disk 2 from B to C\n" +
        "Disk 1 from A to C\n"
    );
  });

  test("Function solves problem correctly with 4 disks", () => {
    expect(towerOfHanoi(4, "A", "C", "B")).toStrictEqual(
      "Disk 1 from A to B\n" +
        "Disk 2 from A to C\n" +
        "Disk 1 from B to C\n" +
        "Disk 3 from A to B\n" +
        "Disk 1 from C to A\n" +
        "Disk 2 from C to B\n" +
        "Disk 1 from A to B\n" +
        "Disk 4 from A to C\n" +
        "Disk 1 from B to C\n" +
        "Disk 2 from B to A\n" +
        "Disk 1 from C to A\n" +
        "Disk 3 from B to C\n" +
        "Disk 1 from A to B\n" +
        "Disk 2 from A to C\n" +
        "Disk 1 from B to C\n"
    );
  });
});
