/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Mockable<T> {
  generateId(list: T[]): number;
  readFile(fileName: string): Promise<T[]>;
  fileExists(path: string): Promise<boolean>;
  writeFile(fileName: string, data: T[]): Promise<void>;
}
