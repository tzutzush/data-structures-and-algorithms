export function towerOfHanoi(
  n: number,
  fromRod: string,
  toRod: string,
  auxRod: string
): string {
  let solution = "";

  if (n === 1) {
    solution = `Disk 1 from ${fromRod} to ${toRod}\n`;
  } else {
    // Recursive steps
    solution += towerOfHanoi(n - 1, fromRod, auxRod, toRod);
    solution += `Disk ${n} from ${fromRod} to ${toRod}\n`;
    solution += towerOfHanoi(n - 1, auxRod, toRod, fromRod);
  }

  return solution;
}

console.log(towerOfHanoi(4, "A", "C", "B"));
