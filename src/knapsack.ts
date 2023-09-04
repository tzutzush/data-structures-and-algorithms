export function getKnapSack(
  capacity: number,
  currentItem: number,
  values: number[],
  weights: number[],
  lookup: Map<string, number>
): number {
  if (!checkValidity(values, weights))
    throw new Error("Weight or value is invalid (negative)");

  // There are no more items, has to be a really low number to avoid interference
  if (capacity < 0) {
    return Number.MIN_SAFE_INTEGER;
  }

  // No more capacity is left
  if (capacity === 0 || currentItem < 0) {
    return 0;
  }

  // Unique key for map for memoization
  const key = `${currentItem}|${capacity}`;

  // If the sub-problem is appearing for the first time, solve it and store its result in the map
  if (!lookup.has(key)) {
    // Pick the current item, and recursively add the preceding item to it
    const include =
      values[currentItem] +
      getKnapSack(
        capacity - weights[currentItem],
        currentItem - 1,
        values,
        weights,
        lookup
      );

    // Based on the above case, current item doesn't fit in the sack, so exclude it
    const exclude = getKnapSack(
      capacity,
      currentItem - 1,
      values,
      weights,
      lookup
    );

    // Pick the bigger number
    lookup.set(key, Math.max(include, exclude));
  }

  // return the value in the sack for recursive functions or as the result
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return lookup.get(key)!;
}

export function checkValidity(values: number[], weights: number[]): boolean {
  if (
    values.some((value) => value <= 0) ||
    weights.some((weight) => weight <= 0)
  ) {
    return false;
  }
  return true;
}
