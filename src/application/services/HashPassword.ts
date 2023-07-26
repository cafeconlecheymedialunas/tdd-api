import { HashPasswordable } from '../../domain/interfaces/services/HashPasswordable';
import { ClientException } from '../../domain/types/errors';

export class HashPassword implements HashPasswordable {
  readonly hashing;
  readonly saltRounds;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(hashing: any, saltRounds = 10) {
    this.hashing = hashing;

    this.saltRounds = saltRounds;
  }

  /**
   * Hashes a password using a salt and returns the hashed password.
   * @param {string} password - The password to hash.
   * @returns {Promise<string | false>} - A promise that resolves to the hashed password or false if an error occurs.
   * @throws {ClientException} - If an error occurs during the hashing process.
   */
  hash = async (password: string): Promise<string | false> => {
    const salt = await this.hashing.genSalt(this.saltRounds);

    const hash = await this.hashing.hash(password, salt);

    if (!hash) throw new ClientException();

    return hash;
  };

  /**
   * Verifies if a given password matches a hashed password.
   * @param {string} password - The password to verify.
   * @param {string} hashedPassword - The hashed password to compare against.
   * @returns {Promise<boolean>} - A promise that resolves to true if the password matches the hashed password, false otherwise.
   */
  verify = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await this.hashing.compare(password, hashedPassword);
  };
}
