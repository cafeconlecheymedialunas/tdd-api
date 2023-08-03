import { Hashable } from '../../domain/interfaces/services/Hashable';
import { ClientException } from '../../domain/types/errors';
import has
export class Hash implements Hashable {
  private readonly hashLibrary;
  saltRounds;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(hashLibrary: any, saltRounds = 10) {
    this.hashLibrary = hashLibrary;

    this.saltRounds = saltRounds;
  }

  /**
   * Hashes a value using a salt and returns the hashed value.
   * @param {string} value - The value to hash.
   * @returns {Promise<string | false>} - A promise that resolves to the hashed value or false if an error occurs.
   * @throws {ClientException} - If an error occurs during the hashing process.
   */
  hash = async (value: string): Promise<string> => {
    const salt = await this.hashLibrary.genSalt(this.saltRounds);

    const hash = await this.hashLibrary.hash(value, salt);

    if (!hash) throw new ClientException(500, "It's impossible to hash this value.");

    return hash;
  };

  /**
   * Verifies if a given value matches a hashed value stored.
   * @param {string} value - The value to verify.
   * @param {string} hashedvalue - The hashed value to compare against.
   * @returns {Promise<boolean>} - A promise that resolves to true if the value matches the hashed value, false otherwise.
   */
  verify = async (value: string, hashedvalue: string): Promise<boolean> => {
    return await this.hashLibrary.compare(value, hashedvalue);
  };
}
