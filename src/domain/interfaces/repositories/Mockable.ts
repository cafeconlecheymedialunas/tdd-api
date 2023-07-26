export interface Mockable {
  generateId(list: any[]): number;
  readFile(fileName: string): Promise<any[]>;
  fileExists(path: string): Promise<boolean>;
  writeFile(fileName: string, data: any[]): Promise<void>;
}
