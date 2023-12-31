import { Hashable } from '../interfaces/services/Hashable';
import { ClientException } from '../errors';
import { Password } from '../entities/auth/Password';

export class Hash implements Hashable {
  private readonly hashLibrary;
  saltRounds;

  constructor(hashLibrary: any, saltRounds = 10) {
    this.hashLibrary = hashLibrary;

    this.saltRounds = saltRounds;
  }

  /**
   * Hashes a value using a salt and returns the hashed value.
   * @param {string} value - The value to hash.
   * @returns {Promise<string>} - A promise that resolves to the hashed value or rejects with an error if it occurs.
   * @throws {ClientException} - If an error occurs during the hashing process.
   */
  async hash(value: string): Promise<string> {
    const salt = await this.hashLibrary.genSalt(this.saltRounds);

    const hash = await this.hashLibrary.hash(value, salt);

    if (hash === false) throw new ClientException(500, "It's impossible to hash this value.");

    return hash;
  }

  /**
   * Verifies if a given value matches a hashed value stored.
   * @param {string} value - The value to verify.
   * @param {string} hashedValue - The hashed value to compare against.
   * @returns {Promise<boolean>} - A promise that resolves to true if the value matches the hashed value, false otherwise.
   */
  async verify(value: string, hashedValue: string): Promise<boolean> {
    return await this.hashLibrary.compare(value, hashedValue);
  }
}
