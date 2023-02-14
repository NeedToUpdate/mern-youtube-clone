import bcrypt from "bcrypt";

//Better to keep this in a wrapper if something better comes along, i.e argon

// **** Variables **** //

const SALT_ROUNDS = 12;

// **** Functions **** //

/**
 * Get a hash from the password.
 */
export function getHash(pwd: string): Promise<string> {
  return bcrypt.hash(pwd, SALT_ROUNDS);
}

/**
 * Useful for testing.
 */
export function hashSync(pwd: string): string {
  return bcrypt.hashSync(pwd, SALT_ROUNDS);
}

/**
 * See if a password passes the hash.
 */
export function compare(pwd: string, hash: string): Promise<boolean> {
  return bcrypt.compare(pwd, hash);
}
