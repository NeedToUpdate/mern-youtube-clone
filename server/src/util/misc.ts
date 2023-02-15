/**
 * Miscellaneous shared functions go here.
 */

/**
 * Get a random number between 1 and 1,000,000,000,000
 */
export function getRandomInt(): number {
  return Math.floor(Math.random() * 1_000_000_000_000);
}

/**
 * Wait for a certain number of milliseconds.
 */
export function tick(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}

/**
 * Omits specific keys in an object
 */
export function omit<T extends object>(obj: T, property: keyof T | (keyof T)[]) {
  if (property instanceof Array) {
    const entries = Object.entries(obj).filter((entry) => {
      const [key] = entry;
      return !property.includes(key as keyof T);
    });
    return Object.fromEntries(entries);
  }
  const { [property]: unused, ...properties } = obj;
  return properties;
}
