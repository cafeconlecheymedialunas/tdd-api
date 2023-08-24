import fs from 'fs';
import { ClientException } from '#root/domain/types/errors';
import { Mockable } from '#root/domain/interfaces/repositories/Mockable';

export class Mock<T> implements Mockable<T> {
  /**
   * Generates a unique ID based on a timestamp and a random number. If the provided list is empty, the generated ID will be based solely on the timestamp and random number, ensuring uniqueness.
   * @param {T[]} list - The list of elements for which the ID is being generated.
   * @returns {number} - A unique ID based on the timestamp and random number, or the length of the list if it's not empty.
   */
  generateId = (list: T[]): number => {
    const timeStamp = Date.now();

    const random = Math.floor(Math.random() * 1000000);

    const uuii = timeStamp + random;

    return list.length || uuii;
  };

  /**
   * Reads the contents of a JSON file asynchronously and returns the parsed data as an array.
   * If the file does not exist, it creates an empty file with the given file name.
   * @param {string} fileName - The name of the JSON file to read.
   * @returns {Promise<T[]>} - A promise that resolves to an array containing the parsed data from the file.
   * @throws {ClientException} - If there is an error reading the file.
   */
  readFile = async (fileName: string): Promise<T[]> => {
    try {
      const filePath = `${__dirname}/${fileName}.json`;

      if (!(await this.fileExists(filePath))) {
        await fs.promises.writeFile(filePath, JSON.stringify([]));
      }
      const data = await fs.promises.readFile(filePath, 'utf8');

      return JSON.parse(data);
    } catch (error) {
      throw new ClientException();
    }
  };

  /**
   * Checks if a file exists at the given path.
   * @param {string} path - The path to the file.
   * @returns {Promise<boolean>} - A promise that resolves to true if the file exists, and false otherwise.
   */
  fileExists = async (path: string): Promise<boolean> => {
    try {
      await fs.promises.access(path, fs.constants.F_OK);
      return true;
    } catch (error) {
      return false;
    }
  };

  /**
   * Writes the given data to a JSON file with the specified file name.
   * @param {string} fileName - The name of the file to write to.
   * @param {T[]} data - The data to write to the file.
   * @returns {Promise<void>} - A promise that resolves when the file is successfully written.
   * @throws {ClientException} - If there is an error while writing the file.
   */
  writeFile = async (fileName: string, data: T[]): Promise<void> => {
    try {
      const filePath = `${__dirname}/${fileName}.json`;

      await fs.promises.writeFile(filePath, JSON.stringify(data));
    } catch (error) {
      throw new ClientException();
    }
  };
}
