import { Hashable } from '../../domain/interfaces/services/Hashable';
import { ClientException } from '../../domain/types/errors';

export class Hash implements Hashable {
  private readonly hashLibrary;
  saltRounds;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(hashLibrary: any, saltRounds = 10) {
    this.hashLibrary = hashLibrary;

    this.saltRounds = saltRounds;
  }

  /**
   * Hashes a password using a salt and returns the hashed password.
   * @param {string} password - The password to hash.
   * @returns {Promise<string | false>} - A promise that resolves to the hashed password or false if an error occurs.
   * @throws {ClientException} - If an error occurs during the hashing process.
   */
  hash = async (password: string): Promise<string | false> => {
    const salt = await this.hashLibrary.genSalt(this.saltRounds);

    const hash = await this.hashLibrary.hash(password, salt);

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
    return await this.hashLibrary.compare(password, hashedPassword);
  };
}
