import { describe, expect, test } from "vitest";
import { Position, findPath } from "./pathfinder";

const notOptimalResult = [
  {
    x: 4,
    y: 0,
  },
  {
    x: 4,
    y: 1,
  },
  {
    x: 4,
    y: 2,
  },
  {
    x: 4,
    y: 3,
  },
  {
    x: 4,
    y: 4,
  },
  {
    x: 3,
    y: 3,
  },
  {
    x: 2,
    y: 3,
  },
  {
    x: 2,
    y: 4,
  },
  {
    x: 1,
    y: 4,
  },
  {
    x: 0,
    y: 4,
  },
  {
    x: 2,
    y: 2,
  },
  {
    x: 1,
    y: 2,
  },
  {
    x: 0,
    y: 2,
  },
  {
    x: 0,
    y: 1,
  },
  {
    x: 0,
    y: 0,
  },
  {
    x: 3,
    y: 0,
  },
  {
    x: 2,
    y: 0,
  },
];

const slightlyBetterResult = [
  {
    x: 4,
    y: 0,
  },
  {
    x: 4,
    y: 1,
  },
  {
    x: 4,
    y: 2,
  },
  {
    x: 4,
    y: 3,
  },
  {
    x: 4,
    y: 4,
  },
  {
    x: 3,
    y: 3,
  },
  {
    x: 2,
    y: 3,
  },
  {
    x: 2,
    y: 4,
  },
  {
    x: 1,
    y: 4,
  },
  {
    x: 0,
    y: 4,
  },
];

describe("Pathfinder", () => {
  const maze = [
    [0, 1, 0, 0, 0], //0 Y
    [0, 1, 1, 1, 0], //1
    [0, 0, 0, 1, 0], //2
    [1, 1, 0, 0, 0], //3
    [0, 0, 0, 1, 0], //4
    // 0  1  2  3  4
    // X
  ];

  test("Should find correct (but not optimal) path", () => {
    expect(
      findPath(
        maze,
        { x: 4, y: 0 },
        { x: 2, y: 0 },
        new Map<string, Position>(),
        []
      )
    ).toStrictEqual(notOptimalResult);
  });

  test("Should find correct path with slightly better result", () => {
    expect(
      findPath(
        maze,
        { x: 4, y: 0 },
        { x: 0, y: 4 },
        new Map<string, Position>(),
        []
      )
    ).toStrictEqual(slightlyBetterResult);
  });

  test("Should return undefined if coordinates are incorrect", () => {
    expect(
      findPath(
        maze,
        { x: -4, y: 0 },
        { x: 0, y: 4 },
        new Map<string, Position>(),
        []
      )
    ).toStrictEqual(undefined);
  });
});
