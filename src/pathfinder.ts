export type Position = { x: number; y: number };

export function findPath(
  maze: number[][],
  startPos: Position,
  endPos: Position,
  lookup: Map<string, Position>,
  path: Position[]
): Position[] | undefined {
  const key = `${startPos.x}-${startPos.y}`;
  const mazeWidth = maze[0].length - 1;
  const mazeHeight = maze.length - 1;

  if (
    startPos.x > mazeWidth ||
    startPos.x < 0 ||
    startPos.y > mazeHeight ||
    startPos.y < 0
  )
    return;

  if (maze[startPos.y][startPos.x] === 1) return;
  if (lookup.has(key)) return;

  lookup.set(key, startPos);
  path.push(startPos);

  if (startPos.x === endPos.x && startPos.y === endPos.y) {
    return path;
  }

  const newPath1 = findPath(
    maze,
    { x: startPos.x + 1, y: startPos.y },
    endPos,
    lookup,
    path
  );
  if (newPath1) return newPath1;

  const newPath2 = findPath(
    maze,
    { x: startPos.x, y: startPos.y + 1 },
    endPos,
    lookup,
    path
  );
  if (newPath2) return newPath2;

  const newPath3 = findPath(
    maze,
    { x: startPos.x - 1, y: startPos.y },
    endPos,
    lookup,
    path
  );
  if (newPath3) return newPath3;

  const newPath4 = findPath(
    maze,
    { x: startPos.x, y: startPos.y - 1 },
    endPos,
    lookup,
    path
  );
  if (newPath4) return newPath4;

  return undefined;
}
