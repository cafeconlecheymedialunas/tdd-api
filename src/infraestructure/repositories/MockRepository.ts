import fs from 'fs';

export class MockRepository {
  generateId = (): number => {
    const timestamp = Date.now();

    const random = Math.floor(Math.random() * 1000000);

    const uniqueNumber = timestamp + random;

    return uniqueNumber;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readFile = async (fileName: string): Promise<any[]> => {
    try {
      const filePath = `${__dirname}/${fileName}.json`;

      const data = await fs.promises.readFile(filePath, 'utf8');

      return JSON.parse(data);
    } catch (error) {
      console.error('Error al leer el archivo de usuarios:', error);
      throw error;
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  writeFile = async (fileName: string, data: any[]): Promise<void> => {
    try {
      const filePath = `${__dirname}/${fileName}.json`;

      await fs.promises.writeFile(filePath, JSON.stringify(data));
    } catch (error) {
      console.error('Error al escribir en el archivo de usuarios:', error);
      throw error;
    }
  };
}
